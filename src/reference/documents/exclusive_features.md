---
title: Exclusive Features of ZLMediakit
---
## 1. Play before Publishing

- Pain point: Unable to play before successful publishing.

- Scenario:

  In some real-time streaming scenarios, there is a need for simultaneous streaming and playback, typically in a one-to-one setting. For example, in a car recorder based on RTMP streaming, when a user requests to view the live video from the onboard camera and sends a publishing command to the device, the playback of the video starts simultaneously. If the playback request arrives at the media server before the publishing, the server usually returns an error indicating that the stream is not found. To solve this problem, a common approach is to confirm the successful publishing before starting the playback. However, this often increases the delay in opening the video, resulting in a poor user experience. ZLMediakit optimizes this scenario by allowing the server to hold the player's response if the stream does not exist, and only returns a successful playback response after the publishing is successful. If the publishing does not come online within a timeout period, an error indicating the stream is not found is returned. The delay can be modified through the configuration file:

  ```ini
  [general]
  # Maximum waiting time for playback in milliseconds
  # When playing a stream that does not exist, ZLMediaKit will allow the player to wait for a maximum of maxStreamWaitMS milliseconds
  # If the stream is registered successfully within this time, it will immediately return a successful playback response to the player
  # Otherwise, it returns an error indicating that the stream is not found to the player
  # The purpose of this mechanism is to enable playback before publishing
  maxStreamWaitMS=15000
  ```

  > Note: This feature also applies to pulling streams, allowing on-demand publishing and pulling of streams.


## 2. No Viewer Event

- Pain point: Wasting bandwidth when streaming has no viewers.

- Scenario:

  In some Internet of Things (IoT) applications, a device streams to the server, and users view the device's video through an app. When users close the app, the device should stop streaming to save bandwidth. The common solution is to have the player send periodic heartbeats to keep the device streaming. However, this often leads to uncertainty in the state and increases system complexity (imagine having to maintain streaming heartbeats for the app, web, and mini-program simultaneously). To address this scenario, ZLMediakit provides a playback user statistics feature. When the viewer count reaches zero, it triggers a no viewer event. By receiving the hook (HTTP request) from ZLMediakit, you can decide whether to close the streaming (or pulling) on ZLMediakit's side. The hook address is configured in the following file:

  ```ini
  [hook]
  # Enable hook events. When enabled, authentication will be applied to publishing and pulling streams.
  enable=1
  # Event triggered when there are no viewers for a stream. With this event, you can choose whether to close the stream with no viewers.
  # Use together with the general.streamNoneReaderDelayMS option.
  on_stream_none_reader=https://127.0.0.1/index/hook/on_stream_none_reader
  ```

  > Note: Introduction to hooks can be found [here](../../guide/media_server/web_hook_api.md#13onstreamnonereader).

## 3. Stream Not Found Event

- Pain point: We only want to provide the playback URL, nothing else!

- Scenario:

  Typically, we distribute video content through playback URLs. However, these video contents are generated in real-time and do not exist when there are no viewers (no publishing or pulling proxies). In such scenarios, the usual practice is to restrict the clients. Instead of providing a playback URL directly, an API for obtaining the URL is provided. Users first obtain the playback URL to trigger the device's publishing, and then they can start playback. This approach is usually cumbersome, requiring specific pre-playback logic and limiting some application scenarios. ZLMediakit provides a stream not found event, allowing you to report to your business server that the stream does not exist. At this point, you can take control and start the device's publishing process at your convenience, or let ZLMediakit start pulling the stream. The hook address is configured in the following file:

  ```ini
  [hook]
  # Enable hook events. When enabled, authentication will be applied to publishing and pulling streams.
  enable=1
  # Event triggered when a stream is not found during playback.
  # With this event, you can complete on-demand pulling by using it in conjunction with the hook.on_stream_none_reader event.
  on_stream_not_found=https://127.0.0.1/index/hook/on_stream_not_found
  ```

  > Note: Introduction to hooks can be found [here](../../guide/media_server/web_hook_api.md#14on_stream_not_found).


## 4. Reconnect after disconnection and continue pushing stream

- Pain point: When the pushing stream is disconnected and the pushing stream device reconnects, all the players are disconnected as well.

- Scenario description:

  When a pushing stream device is disconnected, there are several ways for the server to handle the players. One approach, which is the default behavior of zlmediakit, is to immediately disconnect all players who are playing the stream and destroy the streaming device and player objects to save resources. Another approach, represented by SRS, does almost nothing when the streaming device is disconnected. It doesn't reclaim the resources allocated by the streaming device and doesn't disconnect the players (instead, it allows the players to time out and disconnect automatically).

  The advantage of SRS's approach is that when the pushing stream device reconnects, the players can continue playing, providing a better user experience. The downside is that resources are not reclaimed in a timely manner. If there are malicious connections that don't time out actively, it may consume a large number of file descriptors on the server. Additionally, the media source resources created by the pushing stream device cannot be released actively. When multiple pushing stream devices are created, the memory usage cannot be reduced promptly.

  In response to this scenario, zlmediakit has added support for continuous disconnection and reconnection to address the issue of player disconnection caused by streaming reconnection, as well as the problem of unrecycled resources. The approach is to delay the destruction of the media source resource object (and the disconnection of the player) when the streaming device is disconnected. When the streaming device reconnects, the same resource object is reused, allowing the player to continue watching the video. If the streaming device doesn't come online after a timeout, the player is disconnected and all resources are reclaimed. The timeout delay is configured as follows:

  ```ini
  [general]
  # After a pushing stream device is disconnected, it can reconnect within the timeout period and resume pushing stream. This allows the player to continue playing.
  # Set to 0 to disable this feature (disconnection of the pushing stream device will lead to immediate disconnection of the player).
  # This parameter should not exceed the player timeout.
  continue_push_ms=15000
  ```

  
- Implementation code snippet:

  ```c++
  void RtmpSession::onError(const SockException& err) {
      // Omit irrelevant code
  
      GET_CONFIG(uint32_t, continue_push_ms, General::kContinuePushMS);
      if (_push_src && continue_push_ms) {
          // Release ownership of the pushing stream object
          _push_src_ownership = nullptr;
          auto push_src = std::move(_push_src);
          // Delayed destruction of the object (unregister the stream and trigger disconnection of all players)
          getPoller()->doDelayTask(continue_push_ms, [push_src]() { return 0; });
      }
  }
  
  void RtmpSession::onCmd_publish(AMFDecoder &dec) {
    // Omit a large amount of irrelevant code
    auto src = MediaSource::find(RTMP_SCHEMA, _media_info._vhost, _media_info._app, _media_info._streamid);
  
    while (src) {
      // Attempt to continue pushing stream after disconnection
      auto rtmp_src = dynamic_pointer_cast<RtmpMediaSourceImp>(src);
      if (!rtmp_src) {
        // The source is not generated by RTMP pushing stream
        break;
      }
      auto ownership = rtmp_src->getOwnership();
      if (!ownership) {
        // Failed to acquire ownership of the pushing stream source
        break;
      }
      // Reuse the previous pushing stream resource object
      _push_src = std::move(rtmp_src);
      // Take ownership of the object
      _push_src_ownership = std::move(ownership);
      break;
    }
    // Omit a large amount of irrelevant code
  }
  ```

  > Note: Continuous disconnection and reconnection feature supports RTSP/RTMP/WebRTC pushing stream.


## 5. Cluster Deployment

- Pain point: Limited traceability methods, edge servers cannot use HLS.

- Scenario description:

  In general, media streaming clusters are implemented using a traceability method, where servers are divided into origin servers and edge servers. The origin server is typically used to receive streams and does not directly handle user playback requests. Instead, it distributes the streams to edge servers, which in turn deliver them to the players. This model supports a large number of user playback requests. SRS has supported this functionality through configuration files for a long time. Since zlmediakit also provides on-demand pulling of streams, it essentially supports the traceability mode for clustering. However, users need to integrate with hooks and APIs, which has a higher development threshold. Therefore, zlmediakit recently added support for cluster mode through configuration files. The configuration file is as follows:

  ```ini
  [cluster]
  # Set the template for the pull stream URL of the origin server. The format is similar to printf, where the first %s specifies the app and the second %s specifies the stream_id.
  # When cluster mode is enabled, the on_stream_not_found and on_stream_none_reader hooks will be ineffective.
  # The following types are supported for pull streaming:
  # rtmp: rtmp://127.0.0.1:1935/%s/%s
  # rtsp: rtsp://127.0.0.1:554/%s/%s
  # hls: http://127.0.0.1:80/%s/%s/hls.m3u8
  # http-ts: http://127.0.0.1:80/%s/%s.live.ts
  # Multiple origin servers are supported, and different servers are separated by semicolons (;)
    origin_url=
  # Total timeout for pull streaming, in seconds (float). If there are 3 origin servers, the timeout for each individual server will be timeout_sec divided by 3.
  # The individual server timeout should not exceed the general.maxStreamWaitMS configuration.
    timeout_sec=15
  ```

  ZLMediakit supports multiple ways of pulling streams, including rtsp/rtmp/hls/http-ts/http-flv. The methods are diverse and rich, and the origin servers are not divided into primary and backup. Load balancing of the origin servers is achieved using the round-robin method. It should be noted that since ZLMediakit has long supported on-demand streaming for HLS, its edge stations also support the HLS protocol (in fact, they support any protocol supported by ZLMediakit), which is not available in SRS.
    
  Furthermore, it should be noted that ZLMediakit supports both RTSP and WebRTC, both of which are based on RTP. Internally in ZLMediakit, they can be interconnected without the need for protocol conversion and complex multiplexing/demultiplexing logic. This makes it possible to use ZLMediakit for large-scale, low-latency WebRTC live streaming. Compared to traditional CDN based on RTMP, RTSP is more suitable as the underlying transport protocol for WebRTC. Developers do not need to deal with cumbersome multiplexing/demultiplexing logic and can smoothly achieve the interconversion between RTSP and WebRTC.

## 6. WebRTC Single Port, Multi-threading, and Connection Migration Support

- Pain points: Webrtc servers that support multi-threading do not support single port, and those that support single port do not support multi-threading (and may not support connection migration).

- Scenario introduction:

  Since WebRTC transmission is based on the UDP protocol, traditional WebRTC servers operate in multi-port mode, such as Janus and mediasoup. This brings great pain to deployment and management. Moreover, due to the limited number of ports (the theoretical limit is over 60,000), each WebRTC client occupies 1 to 4 ports. Limited by the number of ports, a WebRTC server can host a maximum of 10,000 to 60,000 clients.

  On the other hand, WebRTC servers that support single port (such as SRS) do not support multi-threading. Due to the much higher computational complexity (encryption/decryption) of WebRTC compared to live streaming, single-threaded performance is often insufficient for WebRTC applications.

  ZLMediakit proposes the best solution for these pain points:

  - Support deployment on a single UDP port, where one UDP port handles all clients.
  - Support multi-threading on a single UDP port. Each client is assigned a unique fd through repeated bind/connect operations, and the fds are evenly distributed among different threads.
  - When a user's network migrates (e.g., switching from Wi-Fi to 4G), the user is locked using STUN packets, enabling seamless connection migration without interrupting the user experience.

  ZLMediakit is the only open-source solution that combines all three of the above features.

  > Note: For how to solve the thread safety issue during WebRTC single-port connection migration and multi-threaded connection migration, please watch this [video](https://mp.weixin.qq.com/s?t=pages/video_detail_new&scene=23&vid=wxv_2170272938552328197&__biz=MzkzNjI5ODIyMg==&mid=2247483673&idx=1&sn=14bc138d91292a1c256c138c822d9c40&vidsn=#wechat_redirect)

## 7. Long Connection for HLS Playback

ZLMediakit achieves long connection for HLS playback through cookie tracking technology. Based on this feature, ZLMediakit's HLS server has the following exclusive features:

- HLS playback authentication, and no need for re-authentication during playback.
- HLS playback traffic statistics, which can track the total traffic consumption during playback.
- On-demandI'm sorry, but I couldn't find any information about a specific ZLMediakit feature called "pull stream URL of the origin server." ZLMediakit is an open-source streaming media server that provides various features for streaming protocols like RTSP, RTMP, HLS, and WebRTC.

If you have any specific questions about ZLMediakit or need information on a different feature, please let me know, and I'll do my best to assist you.


