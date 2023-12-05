---
title: 播放url规则
icon: circle-info
---

## 1、url 的组成部分

以`rtsp://somedomain.com:554/live/0?token=abcdefg&field=value`为例,该 url 分为以下几个部分：

- `协议(scheam)` : rtsp 协议,默认端口 554
- `虚拟主机(vhost)` : somedomain.com,该字段既可以是域名也可以是 ip，如果是 ip 则对应的虚拟主机为`__defaultVhost__`
- `服务端口号(port)` : 554,如果不指定端口号，则使用协议默认端口号
- `应用名(app)` : live
- `流ID(streamid)` : 0
- `参数(args)` : token=abcdefg&field=value

## 2、ZLMediaKit 中的流媒体源

在 ZLMediaKit 中，流媒体源是一种可以被用于直播转发、推流转发等功能的数据对象，在本项目中被称作为`MediaSource`，目前支持 5 种类型的流媒体源，分别是`RtspMediaSource`、`RtmpMediaSource`、`HlsMediaSource`、`TSMediaSource`、`FMP4MediaSource`。

定位一个流媒体源，主要通过 4 个元素(我们后续称其为 4 元组)，分别是:

- `协议(scheam)`
- `虚拟主机(vhost)`
- `应用名(app)`
- `流ID(streamid) `

`RtspMediaSource`支持 rtsp 播放、rtsp 推流、webrtc 播放、webrtc 推流。

`RtmpMediaSource`支持 rtmp 推流/播放、http-flv 播放、ws-flv 播放。

`HlsMediaSource`支持 hls 播放。

`TSMediaSource` 支持 http-ts 播放、ws-ts 播放。

`FMP4MediaSource` 支持 http-fmp4 播放、ws-fmp4 播放。

## 3、流媒体源对应的播放 url

假定有一个`RtspMediaSource`，它的 4 元组分别为 `rtsp(RtspMediaSource固定为rtsp)`、`somedomain.com`、`live`、`0`
那么播放这个流媒体源的 url 对应为:

- `rtsp://somedomain.com/live/0`
- `rtsps://somedomain.com/live/0`
- `rtsp://127.0.0.1/live/0?vhost=somedomain.com`
- `rtsps://127.0.0.1/live/0?vhost=somedomain.com`

如果有一个`RtmpMediaSource`，它的 4 元组分别为 `rtmp(RtmpMediaSource固定为rtmp)`、`somedomain.com`、`live`、`0`
那么播放这个流媒体源的 url 对应为:

- `rtmp://somedomain.com/live/0`
- `rtmps://somedomain.com/live/0`
- `rtmp://127.0.0.1/live/0?vhost=somedomain.com`
- `rtmps://127.0.0.1/live/0?vhost=somedomain.com`

rtmp 类型的流媒体源也支持`http-flv`、`websocket`直播，对应的 url 如下：

::: warning 老代码 flv 直播后缀为.flv，新代码才改成了.live.flv

:::

- `http://somedomain.com/live/0.live.flv`
- `https://somedomain.com/live/0.live.flv`
- `http://127.0.0.1/live/0.live.flv?vhost=somedomain.com`
- `https://127.0.0.1/live/0.live.flv?vhost=somedomain.com`
- `ws://somedomain.com/live/0.live.flv`
- `wss://somedomain.com/live/0.live.flv`
- `ws://127.0.0.1/live/0.live.flv?vhost=somedomain.com`
- `wss://127.0.0.1/live/0.live.flv?vhost=somedomain.com`

当然，ZLMediaKit 一般会把 rtsp、rtmp 流媒体源互相转换，也会转换成 hls/http-ts/ws-ts/http-fmp4/ws-fmp4，播放的 url 如下：

- HLS(mpegts)

  - `http://somedomain.com/live/0/hls.m3u8`
  - `https://somedomain.com/live/0/hls.m3u8`
  - `http://127.0.0.1/live/0/hls.m3u8?vhost=somedomain.com`
  - `https://127.0.0.1/live/0/hls.m3u8?vhost=somedomain.com`

- HLS(fmp4)

  - `http://somedomain.com/live/0/hls.fmp4.m3u8`
  - `https://somedomain.com/live/0/hls.fmp4.m3u8`
  - `http://127.0.0.1/live/0/hls.fmp4.m3u8?vhost=somedomain.com`
  - `https://127.0.0.1/live/0/hls.fmp4.m3u8?vhost=somedomain.com`

- HTTP-TS/WS-TS(后缀为.live.ts,目的是为了解决与 hls 的冲突)

  - `http://somedomain.com/live/0.live.ts`
  - `https://somedomain.com/live/0.live.ts`
  - `http://127.0.0.1/live/0.live.ts?vhost=somedomain.com`
  - `https://127.0.0.1/live/0.live.ts?vhost=somedomain.com`
  - `ws://somedomain.com/live/0.live.ts`
  - `wss://somedomain.com/live/0.live.ts`
  - `ws://127.0.0.1/live/0.live.ts?vhost=somedomain.com`
  - `wss://127.0.0.1/live/0.live.ts?vhost=somedomain.com`

- HTTP-fMP4/WS-fMP4(后缀为.live.mp4,目的是为了解决与 mp4 点播的冲突)
  - `http://somedomain.com/live/0.live.mp4`
  - `https://somedomain.com/live/0.live.mp4`
  - `http://127.0.0.1/live/0.live.mp4?vhost=somedomain.com`
  - `https://127.0.0.1/live/0.live.mp4?vhost=somedomain.com`
  - `ws://somedomain.com/live/0.live.mp4`
  - `wss://somedomain.com/live/0.live.mp4`
  - `ws://127.0.0.1/live/0.live.mp4?vhost=somedomain.com`
  - `wss://127.0.0.1/live/0.live.mp4?vhost=somedomain.com`

一般而言，上述 url 在 ZLMediaKit 都有效，因为 ZLMediaKit 默认转换流媒体源。

## 4、点播 url

ZLMediaKit 的点播一般通过 mp4 文件来实现，推荐大家使用 http mp4 点播，这样是最简单，服务器也无需解复用 mp4 文件，当然 ZLMediaKit 目前也支持 rtsp、rtmp、http-flv、websocket-flv 的 mp4 点播，
对应的 url 跟直播 url 类似，不在赘述，这里只介绍区别。

- ZLMediaKit 对点播限制应用名，默认为`record`
- 假如一个 mp4 文件放置在 http 根目录 record 文件夹(`www/record`)下，他的相对路径为:`www/record/0.mp4`,那么点播 url 则为:
  - `rtsp://somedomain.com/record/0.mp4`
  - `rtmp://somedomain.com/record/0.mp4`
  - `http://somedomain.com/record/0.mp4`(这里是通用的 http 文件点播，服务器不用解复用文件)
  - `http://somedomain.com/record/0.mp4.live.flv`（这里是 http-flv 直播，不是 http 点播，服务器需要解复用文件）
  - `ws://somedomain.com/record/0.mp4.live.flv`
  - `http://somedomain.com/record/0.mp4.live.ts`（这里是 http-ts 直播，不是 http 点播，服务器需要解复用文件）
  - `ws://somedomain.com/record/0.mp4.live.ts`
  - `http://somedomain.com/record/0.mp4.live.mp4`（这里是 http-fmp4 直播，不是 http 点播，服务器需要解复用文件）
  - `ws://somedomain.com/record/0.mp4.live.mp4`
- 如果开启了虚拟主机，那么点播文件需要放置在 `www/somedomain.com/record/0.mp4`。

## 5、webrtc 推流/播放

`webrtc`播放跟上述方式不太一样，webrtc 协议本身不定义信令交互协议，用户自己去实现`sdp+icecandidate`交换逻辑，所以`webrtc`并没有一个标准的播放器，需要自己使用 js 或 native sdk 去实现播放。

`zlmediakit`实现的`webrtc sdp+icecandidate`交换方式是`http post`方式，接口名为`/index/api/webrtc`, 该接口使用 post content 传递 `offer sdp`, 同时 url query 参数传递媒体源 4 元组中的`app` `steam_id`，由于 http 协议本身支持`vhost`，所以不需要另外指定`vhost`。 `webrtc`在`zlmediakit`中可以认为是 rtsp 协议的另外表现形式，他们推流、播放使用的数据源都相同，都是`RtspMediaSource`。

在 webrtc 推流时，交互`webrtc sdp+icecandidate`的 http post 接口类似为：`http://127.0.0.1/index/api/webrtc?app=live&stream=test&type=push`

在 webrtc 播放时，交互`webrtc sdp+icecandidate`的 http post 接口类似为：`http://127.0.0.1/index/api/webrtc?app=live&stream=test&type=play`。

zlmeiakit 工程自带 webrtc 测试播放/推流器，用户启动 zlmediakit 后，浏览器访问`http://127.0.0.1/webrtc/`就可以访问之。

另外，zlmediakit 也支持使用 webrtc 播放 mp4 文件，http post 接口类似为：`http://127.0.0.1/index/api/webrtc?app=record&stream=test.mp4&type=play`。

## 6、url 参数

ZLMediaKit 会识别 url 中问号后面的字符串为 url 参数，其格式跟 http 一致，其中参数`vhost`是 ZLMediaKit 内置支持的参数，支持指定 vhost。
url 参数主要用于播放、推流鉴权，在触发 hook api 时，会把这些参数提交给第三方业务服务器
