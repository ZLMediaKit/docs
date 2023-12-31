---
title: ZLMediakit独家特性介绍
---

## 1、先播放后推流

- 痛点：推流成功前不能提前播放

- 场景介绍:

  有些及时推流的场景，存在推流和播放同时发生的场景，这种场景一般是一对一的，譬如说基于 rtmp 推流的行车记录仪，用户在调阅车载摄像头视频的，下发推流命令给设备时，同时开始播放视频，如果播放请求先于推流到达流媒体服务器，那么流媒体服务器通常会立即返回流未找到的错误，为了解决这个问题，一般的解决方案是，通过设备确认推流成功再开启播放，但是这样往往会增加视频打开延时，拉低用户体验。zlmediakit 针对此场景作出特别优化，可以在流不存在时，先不回复播放器，等推流成功后再返回播放成功，如果超时时间内，推流还不上线，那么再返回播放流不存在错误，通过配置文件可以修改此延时：

  ```ini
  [general]
  #播放最多等待时间，单位毫秒
  #播放在播放某个流时，如果该流不存在，
  #ZLMediaKit会最多让播放器等待maxStreamWaitMS毫秒
  #如果在这个时间内，该流注册成功，那么会立即返回播放器播放成功
  #否则返回播放器未找到该流，该机制的目的是可以先播放再推流
  maxStreamWaitMS=15000
  ```

  > 提示: 此功能同样适用于拉流，通过该功能可以实现按需推拉流。

## 2、无人观看事件

- 痛点: 推流无人观看时白白浪费流量

- 场景介绍:

  在一些物联网应用场景，设备推流给服务端，用户通过 app 查看设备视频，当用户关闭 app 时，设备应该停止推流以节省流量。为了实现该功能，一般的解决方案是播放端通过发送心跳维持设备推流，但是这样往往存在状态的不确定性，以及增加系统复杂度(想想 app、web、小程序端同时维持推流心跳的场景)。针对此种场景，zlmediakit 提供播放用户统计功能，在观看数为 0 时会触发无人观看事件，用户通过接收 zlmediakit 的 hook（http 请求），可以返回是否让 zlmediakit 关闭该推流(或拉流)，hook 地址配置文件为：

  ```ini
  [hook]
  #是否启用hook事件，启用后，推拉流都将进行鉴权
  enable=1
  #无人观看流事件，通过该事件，可以选择是否关闭无人观看的流。配合general.streamNoneReaderDelayMS选项一起使用
  on_stream_none_reader=https://127.0.0.1/index/hook/on_stream_none_reader
  ```

  > 提示: hook 介绍[地址](../../guide/media_server/web_hook_api.md#13onstreamnonereader)

## 3、流未找到事件

- 痛点: 我们只需对外提供播放 url，而不是其他！

- 场景介绍:

  通常而言，我们通过播放 url 来分发视频内容，但是这些视频内容是及时生成的，在无人播放时，它并不存在(不存在推流或拉流代理)。这种场景下，通常的做法是用户需要限制客户端，因为提供的不是播放 url，而是获取 url 的 api，用户先获取播放 url 用于触发设备推流，然后才能播放，这种方式通常而言比较繁琐，需要特定的播放前逻辑，限制了一些应用场景。zlmediakit 提供流未找到事件，可以汇报给你的业务服务器，告知流不存在，这个时候，你可以再从容控制设备开始推流，或者让 zlmediakit 开始拉流代理，hook 地址配置文件为：

  ```ini
  [hook]
  #是否启用hook事件，启用后，推拉流都将进行鉴权
  enable=1
  #播放时，未找到流事件，通过配合hook.on_stream_none_reader事件可以完成按需拉流
  on_stream_not_found=https://127.0.0.1/index/hook/on_stream_not_found
  ```

  > 提示: hook 介绍[地址](../../guide/media_server/web_hook_api.md#14on_stream_not_found)

## 4、断连续推

- 痛点：推流断开，推流器重连了，导致播放器都全部断开了！

- 场景介绍：

  一般推流器断开，服务器处理播放器的逻辑有这几种，一种是立即断开所有播放这个流的播放器，同时销毁推流器、播放器对象以便节省资源，这也是 zlmediakit 的默认做法。另外一种是以 srs 为代表，推流器断开后，基本什么也不做，不回收推流器开辟的资源，也不断开播放器(而是让播放器主动超时断开)。

  srs 这种处理方式有个好处，就是推流器重新推流后，播放器可以接着播放，用户体验比较好。坏处就是资源不能及时回收，如果有恶意链接不主动及时超时断开，可能会消耗服务器大量的文件描述符资源，同时由于推流器创建的媒体源资源无法主动释放，当创建很多个推流时，内存占用不能及时降低。

  zlmediakit 现在针对这种场景，新增支持断连续推功能，解决了推流重连导致播放器断开的问题，也解决了资源无法及时回收的弊端，做法是，在推流器断开时，延时销毁媒体源资源对象(同时延时断开播放器)，当推流器再次推流时，复用该资源对象，播放器可以接着观看视频；如果超时后，推流器未上线，那么再断开播放器并回收所有资源。超时延时配置文件为：

  ```ini
  [general]
  #推流断开后可以在超时时间内重新连接上继续推流，这样播放器会接着播放。
  #置0关闭此特性(推流断开会导致立即断开播放器)
  #此参数不应大于播放器超时时间
  continue_push_ms=15000
  ```

- 实现代码片段：

  ```cpp
  void RtmpSession::onError(const SockException& err) {
      //省略无关代码

      GET_CONFIG(uint32_t, continue_push_ms, General::kContinuePushMS);
      if (_push_src && continue_push_ms) {
          //取消推流对象所有权
          _push_src_ownership = nullptr;
          auto push_src = std::move(_push_src);
          //延时若干秒再销毁对象(注销流, 同时触发断开所有播放器操作)
          getPoller()->doDelayTask(continue_push_ms, [push_src]() { return 0; });
      }
  }

  void RtmpSession::onCmd_publish(AMFDecoder &dec) {
    //省略大量无关代码
    auto src = MediaSource::find(RTMP_SCHEMA, _media_info._vhost, _media_info._app, _media_info._streamid);

    while (src) {
      //尝试断连后继续推流
      auto rtmp_src = dynamic_pointer_cast<RtmpMediaSourceImp>(src);
      if (!rtmp_src) {
        //源不是rtmp推流产生的
        break;
      }
      auto ownership = rtmp_src->getOwnership();
      if (!ownership) {
        //获取推流源所有权失败
        break;
      }
      //复用之前推流资源对象
      _push_src = std::move(rtmp_src);
      //持有对象所有权
      _push_src_ownership = std::move(ownership);
      break;
    }
    //省略大量无关代码
  }
  ```

  > 提示：断连续推功能支持 rtsp/rtmp/webrtc 推流。

## 5、集群部署

- 痛点： 溯源方式单一，边沿服务器不能使用 HLS。

- 场景介绍:

  一般流媒体集群实现方式采用溯源方式实现，服务器分为源站和边沿站。源站一般用于接收推流，它一般不直接承载用户的播放请求，而是通过边沿服务器向其拉流同时分发给播放器，通过该模式可以支持海量的用户播放请求。srs 很早之前已经通过配置文件的方式支持该功能，由于 zlmediakit 比较早也提供按需拉流的功能，本质上也支持溯源模式的集群，不过用户需要对接 hook 和 api，开发门槛比较高，所以最近 zlmediakit 也支持了通过配置文件的方式来实现集群模式，配置文件如下:

  ```ini
  [cluster]
  #设置源站拉流url模板, 格式跟printf类似，第一个%s指定app,第二个%s指定stream_id,
  #开启集群模式后，on_stream_not_found和on_stream_none_reader hook将无效.
  #溯源模式支持以下类型:
  #rtmp方式: rtmp://127.0.0.1:1935/%s/%s
  #rtsp方式: rtsp://127.0.0.1:554/%s/%s
  #hls方式: http://127.0.0.1:80/%s/%s/hls.m3u8
  #http-ts方式: http://127.0.0.1:80/%s/%s.live.ts
  #支持多个源站，不同源站通过分号(;)分隔
  origin_url=
  #溯源总超时时长，单位秒，float型；假如源站有3个，那么单次溯源超时时间为timeout_sec除以3
  #单次溯源超时时间不要超过general.maxStreamWaitMS配置
  timeout_sec=15
  ```

  zlmediakit 的溯源方式支持 rtsp/rtmp/hls/http-ts/http-flv， 方式多样丰富，同时源站不分主备，采用 round robin 方式来实现源站的负载均衡。需要指出的是，由于 zlmediakit 很早就支持 hls 的按需拉流功能，所以 zlmediakit 的边沿站也支持 hls 协议(其实支持 zlmediakit 任意支持的协议)，这点是 srs 不具备的。

  另外需要指出的是，由于 zlmediakit 同时支持 rtsp 和 webrtc，而它们两者都是基于 rtp 的，在 zlmediakit 内部，无须转协议简单处理后就可互联互通，所以使用 zlmediakit 来做大规模的 webrtc 低延时直播已经成为可能；相较于传统的基于 rtmp 的 cdn，rtsp 更适合作为 webrtc 的 cdn 基础传输协议，开发者不需要处理繁琐的解复用复用逻辑，即可平滑的实现 rtsp 与 webrtc 的互转。

## 6、WebRTC 单端口、多线程、支持连接迁移

- 痛点：支持多线程的 webrtc 服务器不支持单端口，支持单端口的不支持多线程(同时可能不支持链接迁移)

- 场景介绍：

  由于 webrtc 传输是基于 udp 协议的，传统的 webrtc 服务器都是多端口模式，譬如 janus/mediasoup。这给部署和管理带来极大痛苦,而且由于端口个数有限(理论上限 6 万多)，每个 webrtc 客户端要占用 1 至 4 个端口，受限于端口数量，一台 webrtc 服务器最多可以承载 1~6 万左右的客户端数。

  而支持单端口的 webrtc 服务器(譬如 srs)，又不支持多线程；由于 webrtc 计算复杂度(加解密)远大于直播，其性能跟直播比有数量级的差距，所以往往单线程在 webrtc 的应用场景已经力不从心。

  zlmediakit 针对这些痛点，提出了最佳解决方案：

  - 支持单 udp 端口部署，一个 udp 端口承载所有客户端。
  - 单 udp 端口支持多线程，单端口多次 bind/connect 方式实现一个客户端对应一个 fd，fd 均匀分配到不同线程。
  - 用户网络迁移时(譬如 wifi 切换为 4G)，通过 stun 包锁定用户，实现无感知的连接迁移，用户体验不中断。

  以上 3 个特性都同时具备的，目前在开源界唯 zlmediakit 一家。

  > 提示: 关于怎么解决 webrtc 单端口连接迁移和多线程连接迁移时线程安全问题的请观看该[视频](https://mp.weixin.qq.com/s?t=pages/video_detail_new&scene=23&vid=wxv_2170272938552328197&__biz=MzkzNjI5ODIyMg==&mid=2247483673&idx=1&sn=14bc138d91292a1c256c138c822d9c40&vidsn=#wechat_redirect)

## 7、HLS 播放的长链接化

zlmediakit 通过 cookie 追踪技术实现 hls 短连接的长链接化，依赖该特性，zlm 的 hls 服务器具备了以下独家特性：

- HLS 播放鉴权，并且播放途中无须再鉴权。
- HLS 播放流量统计，可以统计播放器播放途中所有短连接消耗流量总数。
- HLS 按需拉流，可以先播放 zlmediakit 的 HLS 链接，zlmediakit 再去溯源拉流代理。
- HLS 无人观看时自动停止溯源拉流代理或掐断上游推流。

另外，zlmediakit 的 hls 服务器性能已优化至极致(通过共享 ts mmap 和内存 m3u8 实现)，单进程可以承载 10W 级别 hls 播放器，100Gb/s 级别带宽。
