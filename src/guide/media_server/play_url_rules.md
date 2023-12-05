---
title: Playing URL Rules
icon: circle-info
---

## 1. Components of a URL

Taking `rtsp://somedomain.com:554/live/0?token=abcdefg&field=value` as an example, this URL is divided into the following parts:

- `Protocol(scheam)`: RTSP protocol, default port 554
- `Virtual Host(vhost)`: somedomain.com. This field can be either a domain name or an IP. If it is an IP, the corresponding virtual host is `__defaultVhost__`
- `Server Port(port)`: 554. If the port number is not specified, the protocol's default port number is used
- `Application Name(app)`: live
- `Stream ID(streamid)`: 0
- `Parameters(args)`: token=abcdefg&field=value

## 2. Stream Media Source in ZLMediaKit

In ZLMediaKit, a stream media source is a data object that can be used for functions such as live broadcasting and stream forwarding, and is referred to as `MediaSource` in this project. Currently, it supports five types of stream media sources, namely `RtspMediaSource`, `RtmpMediaSource`, `HlsMediaSource`, `TSMediaSource`, `FMP4MediaSource`.

Identifying a stream media source is mainly based on four elements (referred to as 4-tuples hereafter), which are:

- `Protocol(scheam)`
- `Virtual Host(vhost)`
- `Application Name(app)`
- `Stream ID(streamid)`

`RtspMediaSource` supports RTSP playback, RTSP streaming, WebRTC playback, and WebRTC streaming.

`RtmpMediaSource` supports RTMP streaming/playback, HTTP-FLV playback, and WS-FLV playback.

`HlsMediaSource` supports HLS playback.

`TSMediaSource` supports HTTP-TS playback and WS-TS playback.

`FMP4MediaSource` supports HTTP-FMP4 playback and WS-FMP4 playback.

## 3. Playback URLs Corresponding to the Stream Media Source

Suppose there is a `RtspMediaSource`, and its 4-tuple are `rtsp (RtspMediaSource is always rtsp)`, `somedomain.com`, `live`, and `0`
Then the URLs for playing this stream media source correspond to:

- `rtsp://somedomain.com/live/0`
- `rtsps://somedomain.com/live/0`
- `rtsp://127.0.0.1/live/0?vhost=somedomain.com`
- `rtsps://127.0.0.1/live/0?vhost=somedomain.com`

If there is a `RtmpMediaSource`, and its 4-tuple are `rtmp (RtmpMediaSource is always rtmp)`, `somedomain.com`, `live`, and `0`
Then the URLs for playing this stream media source correspond to:

- `rtmp://somedomain.com/live/0`
- `rtmps://somedomain.com/live/0`
- `rtmp://127.0.0.1/live/0?vhost=somedomain.com`
- `rtmps://127.0.0.1/live/0?vhost=somedomain.com`

RTMP types of stream media sources also support live streaming through `http-flv`, `websocket`, and other protocols. The corresponding URLs are as follows:

**Note: Old code live broadcast suffix is .flv, and it has been changed to .live.flv in the new code**

- `http://somedomain.com/live/0.live.flv`
- `https://somedomain.com/live/0.live.flv`
- `http://127.0.0.1/live/0.live.flv?vhost=somedomain.com`
- `https://127.0.0.1/live/0.live.flv?vhost=somedomain.com`
- `ws://somedomain.com/live/0.live.flv`
- `wss://somedomain.com/live/0.live.flv`
- `ws://127.0.0.1/live/0.live.flv?vhost=somedomain.com`
- `wss://127.0.0.1/live/0.live.flv?vhost=somedomain.com`

Sure, ZLMediaKit typically converts RTSP and RTMP media streams to each other and also transforms them into HLS/HTTP-TS/WS-TS/HTTP-fMP4/WS-fMP4. The playback URLs are as follows:

- HLS

  - `http://somedomain.com/live/0/hls.m3u8`
  - `https://somedomain.com/live/0/hls.m3u8`
  - `http://127.0.0.1/live/0/hls.m3u8?vhost=somedomain.com`
  - `https://127.0.0.1/live/0/hls.m3u8?vhost=somedomain.com`

- HTTP-TS/WS-TS (with the suffix .live.ts, to resolve the conflict with HLS)

  - `http://somedomain.com/live/0.live.ts`
  - `https://somedomain.com/live/0.live.ts`
  - `http://127.0.0.1/live/0.live.ts?vhost=somedomain.com`
  - `https://127.0.0.1/live/0.live.ts?vhost=somedomain.com`
  - `ws://somedomain.com/live/0.live.ts`
  - `wss://somedomain.com/live/0.live.ts`
  - `ws://127.0.0.1/live/0.live.ts?vhost=somedomain.com`
  - `wss://127.0.0.1/live/0.live.ts?vhost=somedomain.com`

- HTTP-fMP4/WS-fMP4 (with the suffix .live.mp4, to resolve the conflict with MP4 on-demand)
  - `http://somedomain.com/live/0.live.mp4`
  - `https://somedomain.com/live/0.live.mp4`
  - `http://127.0.0.1/live/0.live.mp4?vhost=somedomain.com`
  - `https://127.0.0.1/live/0.live.mp4?vhost=somedomain.com`
  - `ws://somedomain.com/live/0.live.mp4`
  - `wss://somedomain.com/live/0.live.mp4`
  - `ws://127.0.0.1/live/0.live.mp4?vhost=somedomain.com`
  - `wss://127.0.0.1/live/0.live.mp4?vhost=somedomain.com`

Generally speaking, all the above URLs are valid in ZLMediaKit, as ZLMediaKit converts media sources by default.

## 4. Video-on-Demand URL

ZLMediaKit typically implements video-on-demand via MP4 files, and we recommend using HTTP MP4 on-demand as it is the simplest method and the server does not need to demultiplex the MP4 files. ZLMediaKit currently also supports RTSP, RTMP, HTTP-FLV, and WebSocket-FLV MP4 on-demand. The corresponding URLs are similar to live broadcast URLs and will not be elaborated here; only the differences are discussed.

- ZLMediaKit restricts the application name for on-demand to the default `record`.
- Suppose an MP4 file is placed in the HTTP root directory record folder (`www/record`). Its relative path is `www/record/0.mp4`, then the on-demand URL would be:
  - `rtsp://somedomain.com/record/0.mp4`
  - `rtmp://somedomain.com/record/0.mp4`
  - `http://somedomain.com/record/0.mp4` (This is a generic HTTP file on-demand; the server does not need to demultiplex the file)
  - `http://somedomain.com/record/0.mp4.live.flv` (This is HTTP-FLV live streaming, not HTTP on-demand; the server needs to demultiplex the file)
  - `ws://somedomain.com/record/0.mp4.live.flv`
  - `http://somedomain.com/record/0.mp4.live.ts` (This is HTTP-TS live streaming, not HTTP on-demand; the server needs to demultiplex the file)
  - `ws://somedomain.com/record/0.mp4.live.ts`
  - `http://somedomain.com/record/0.mp4.live.mp4` (This is HTTP-fMP4 live streaming, not HTTP on-demand; the server needs to demultiplex the file)
  - `ws://somedomain.com/record/0.mp4.live.mp4`
- If virtual hosting is enabled, then the on-demand files should be placed in `www/somedomain.com/record/0.mp4`.

## 5. WebRTC Push/Pull

WebRTC playback is slightly different from the methods mentioned above. The WebRTC protocol itself does not define a signaling interaction protocol, and users need to implement the `sdp+icecandidate` exchange logic themselves. So, WebRTC does not have a standard player, and you need to use JS or a native SDK to implement playback.

ZLMediaKit implements the `WebRTC SDP+icecandidate` exchange method via `HTTP POST`. The interface name is `/index/api/webrtc`. This interface uses POST content to pass the `offer sdp` while passing the media source's four-tuple `app` `stream_id` in the URL query parameters. Since HTTP inherently supports `vhost`, there's no need to specify `vhost` separately. WebRTC in ZLMediaKit can be considered another representation of the RTSP protocol. Their push and playback use the same data source, which is `RtspMediaSource`.

When pushing WebRTC, the HTTP POST interface for exchanging `WebRTC SDP+icecandidate` is similar to: `http://127.0.0.1/index/api/webrtc?app=live&stream=test&type=push`

When playing WebRTC, the HTTP POST interface for exchanging `WebRTC SDP+icecandidate` is similar to: `http://127.0.0.1/index/api/webrtc?app=live&stream=test&type=play`.

ZLMediaKit comes with a WebRTC test player/pusher. After starting ZLMediaKit, you can access it by visiting `http://127.0.0.1/webrtc/` in your browser.

Additionally, ZLMediaKit also supports playing MP4 files via WebRTC. The HTTP POST interface is similar to: `http://127.0.0.1/index/api/webrtc?app=record&stream=test.mp4&type=play`.

## 6. URL Parameters

ZLMediaKit recognizes the string after the question mark in the URL as parameters, which are consistent with HTTP formats. Among them, `vhost` is a built-in parameter supported by ZLMediaKit, which allows specifying a virtual host. URL parameters are mainly used for streaming and playback authentication. When triggering the hook API, these parameters will be submitted to the third-party business server.
