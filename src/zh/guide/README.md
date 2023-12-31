---
title: 指南
icon: terminal
---

## 一个基于 C++11 的高性能运营级流媒体服务框架

[![badge](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/ZLMediaKit/ZLMediaKit/blob/master/LICENSE)
[![badge](https://img.shields.io/badge/language-c++-red.svg)](https://en.cppreference.com/)
[![badge](https://img.shields.io/badge/platform-linux%20|%20macos%20|%20windows-blue.svg)](https://github.com/ZLMediaKit/ZLMediaKit)
[![badge](https://img.shields.io/badge/PRs-welcome-yellow.svg)](https://github.com/ZLMediaKit/ZLMediaKit/pulls)

[![badge](https://github.com/ZLMediaKit/ZLMediaKit/actions/workflows/android.yml/badge.svg)](https://github.com/ZLMediaKit/ZLMediaKit)
[![badge](https://github.com/ZLMediaKit/ZLMediaKit/actions/workflows/linux.yml/badge.svg)](https://github.com/ZLMediaKit/ZLMediaKit)
[![badge](https://github.com/ZLMediaKit/ZLMediaKit/actions/workflows/macos.yml/badge.svg)](https://github.com/ZLMediaKit/ZLMediaKit)
[![badge](https://github.com/ZLMediaKit/ZLMediaKit/actions/workflows/windows.yml/badge.svg)](https://github.com/ZLMediaKit/ZLMediaKit)

[![badge](https://github.com/ZLMediaKit/ZLMediaKit/actions/workflows/docker.yml/badge.svg)](https://hub.docker.com/r/zlmediakit/zlmediakit/tags)
[![badge](https://img.shields.io/docker/pulls/zlmediakit/zlmediakit)](https://hub.docker.com/r/zlmediakit/zlmediakit/tags)

## 项目特点

- 基于 C++11 开发，避免使用裸指针，代码稳定可靠，性能优越。
- 支持多种协议(RTSP/RTMP/HLS/HTTP-FLV/WebSocket-FLV/GB28181/HTTP-TS/WebSocket-TS/HTTP-fMP4/WebSocket-fMP4/MP4/WebRTC),支持协议互转。
- 使用多路复用/多线程/异步网络 IO 模式开发，并发性能优越，支持海量客户端连接。
- 代码经过长期大量的稳定性、性能测试，已经在线上商用验证已久。
- 支持 linux、macos、ios、android、windows 全平台。
- 支持 x86、arm、risc-v、mips、龙芯、申威等指令集平台。
- 支持画面秒开、极低延时([500 毫秒内，最低可达 100 毫秒](../reference/test/delay_test.md))。
- 提供完善的标准[C API](https://github.com/ZLMediaKit/ZLMediaKit/tree/master/api/include),可以作 SDK 用，或供其他语言调用。
- 提供完整的[MediaServer](https://github.com/ZLMediaKit/ZLMediaKit/tree/master/server)服务器，可以免开发直接部署为商用服务器。
- 提供完善的[restful api](./media_server/restful_api.md)以及[web hook](./media_server/web_hook_api.md)，支持丰富的业务逻辑。
- 打通了视频监控协议栈与直播协议栈，对 RTSP/RTMP 支持都很完善。
- 全面支持 H265/H264/AAC/G711/OPUS。
- 功能完善，支持集群、按需转协议、按需推拉流、先播后推、断连续推等功能。
- 极致性能，单机 10W 级别播放器，100Gb/s 级别 io 带宽能力。
- 极致体验，[独家特性](../reference/documents/exclusive_features.md)
- [谁在使用 zlmediakit?](https://github.com/ZLMediaKit/ZLMediaKit/issues/511)
- 全面支持 ipv6 网络

## 项目定位

- 移动嵌入式跨平台流媒体解决方案。
- 商用级流媒体服务器。
- 网络编程二次开发 SDK。

## 功能清单

### 功能一览

```mermaid
---
title: Features
---
flowchart TD
    A[RTMP] -->|PUSH OR PULL| B(Incoming streaming protocol)
    AA[RTSP] -->|PUSH OR PULL| B
    AAA[HTTP-TS/HTTP-FLV/HLS] -->|PULL| B
    AAAA[HTTP-MP4] -->|PULL| B
    GB28181[GB28181] -->|PUSH| B
    WEBRTC[WEBRTC] -->|PUSH| B
    SRT[SRT] -->|PUSH| B
    EHOME[EHOME] -->|PUSH| B
    INPUT_OTHER[Other protocol] -->|PULL VIA FFMPEG| B
    B --> C{ZLMediaKit}
    C -->D[Output streaming protocol]
    D --> PUSHSTREAM[fa:fa-car Push streaming]
    D-->MP4RECORD(MP4 recording)
    D-->WEBRTCPLAY(WEBRTC)
    D -->LIVESTREAM[Live stream]
    D-->SRTPLAY(SRT play)
    D-->VOD(VOD)
    LIVESTREAM-->RTSP(RTSP Live)
    LIVESTREAM-->FLV_LIVE(FLV Live)
    LIVESTREAM-->HLS_LIVE(HLS-TS/HLS-FMP4 Live)
    LIVESTREAM-->TS_LIVE(TS Live)
    LIVESTREAM-->FMP4_LIVE(FMP4 Live)
    PUSHSTREAM-->RTSP_PUSH(RTSP)
    PUSHSTREAM-->RTMP_PUSH(RTMP)
    PUSHSTREAM-->GB28181_PUSH(GB28181)
    FLV_LIVE-->RTMP_P(RTMP)
    FLV_LIVE-->HTTP_FLV_P(HTTP-FLV)
    FLV_LIVE-->WEBSOCKET_FLV_P(WEBSOCKET-FLV)
    TS_LIVE-->HTTP_TS_P(HTTP-TS)
    TS_LIVE-->WEBSOCKET_TS_P(WEBSOCKET-TS)
    FMP4_LIVE-->HTTP_FMP4_P(HTTP-FMP4)
    FMP4_LIVE-->WEBSOCKET_FMP4_P(WEBSOCKET-FMP4)
```

- RTSP\[S]

  - RTSP\[S] 服务器，支持 RTMP/MP4/HLS 转 RTSP\[S] ,支持亚马逊 echo show 这样的设备
  - RTSP\[S] 播放器，支持 RTSP 代理，支持生成静音音频
  - RTSP\[S] 推流客户端与服务器
  - 支持 `rtp over udp` `rtp over tcp` `rtp over http` `rtp组播` 四种 RTP 传输方式
  - 服务器/客户端完整支持 Basic/Digest 方式的登录鉴权，全异步可配置化的鉴权接口
  - 支持 H265 编码
  - 服务器支持 RTSP 推流(包括`rtp over udp` `rtp over tcp`方式)
  - 支持 H264/H265/AAC/G711/OPUS/MJPEG 编码，其他编码能转发但不能转协议

- RTMP\[S]

  - RTMP\[S] 播放服务器，支持 RTSP/MP4/HLS 转 RTMP
  - RTMP\[S] 发布服务器，支持录制发布流
  - RTMP\[S] 播放器，支持 RTMP 代理，支持生成静音音频
  - RTMP\[S] 推流客户端
  - 支持 http\[S] -flv 直播服务器
  - 支持 http\[S] -flv 直播播放器
  - 支持 websocket-flv 直播
  - 支持 H264/H265/AAC/G711/OPUS 编码，其他编码能转发但不能转协议
  - 支持[RTMP-H265](https://github.com/ksvc/FFmpeg/wiki)
  - 支持[RTMP-OPUS](../reference/resources/rtmp_support_for_h265_and_opus.md)
  - 支持[enhanced-rtmp(H265)](https://github.com/veovera/enhanced-rtmp)

- HLS
  - 支持 HLS 文件(mpegts/fmp4)生成，自带 HTTP 文件服务器
  - 通过 cookie 追踪技术，可以模拟 HLS 播放为长连接，可以实现 HLS 按需拉流、播放统计等业务
  - 支持 HLS 播发器，支持拉流 HLS 转 rtsp/rtmp/mp4
  - 支持 H264/H265/AAC/G711/OPUS 编码
- TS
  - 支持 http\[S] -ts 直播
  - 支持 ws\[S] -ts 直播
  - 支持 H264/H265/AAC/G711/OPUS 编码
- fMP4

  - 支持 http\[S] -fmp4 直播
  - 支持 ws\[S] -fmp4 直播
  - 支持 H264/H265/AAC/G711/OPUS/MJPEG 编码

- HTTP\[S] 与 WebSocket

  - 服务器支持`目录索引生成`,`文件下载`,`表单提交请求`
  - 客户端提供`文件下载器(支持断点续传)`,`接口请求器`,`文件上传器`
  - 完整 HTTP API 服务器，可以作为 web 后台开发框架
  - 支持跨域访问
  - 支持 http 客户端、服务器 cookie
  - 支持 WebSocket 服务器和客户端
  - 支持 http 文件访问鉴权

- GB28181 与 RTP 推流

  - 支持 UDP/TCP RTP(PS/TS/ES)推流服务器，可以转换成 RTSP/RTMP/HLS 等协议
  - 支持 RTSP/RTMP/HLS 等协议转 rtp 推流客户端，支持 TCP/UDP 模式，提供相应 restful api，支持主动被动方式
  - 支持 H264/H265/AAC/G711/OPUS 编码
  - 支持 es/ps/ts/ehome rtp 推流
  - 支持 es/ps rtp 转推
  - 支持 GB28181 主动拉流模式
  - 支持双向语音对讲

- MP4 点播与录制
  - 支持录制为 FLV/HLS/MP4
  - RTSP/RTMP/HTTP-FLV/WS-FLV 支持 MP4 文件点播，支持 seek
  - 支持 H264/H265/AAC/G711/OPUS 编码
- WebRTC
  - 支持 WebRTC 推流，支持转其他协议
  - 支持 WebRTC 播放，支持其他协议转 WebRTC
  - 支持双向 echo test
  - 支持 simulcast 推流
  - 支持上下行 rtx/nack 丢包重传
  - **支持单端口、多线程、客户端网络连接迁移(开源界唯一)**。
  - 支持 TWCC rtcp 动态调整码率
  - 支持 remb/pli/sr/rr rtcp
  - 支持 rtp 扩展解析
  - 支持 GOP 缓冲，webrtc 播放秒开
  - 支持 datachannel
  - 支持 webrtc over tcp 模式
  - 优秀的 nack、jitter buffer 算法, 抗丢包能力卓越
  - 支持 whip/whep 协议
- [SRT 支持](./protocol/srt/README.md)
- 其他
  - 支持丰富的 restful api 以及 web hook 事件
  - 支持简单的 telnet 调试
  - 支持配置文件热加载
  - 支持流量统计、推拉流鉴权等事件
  - 支持虚拟主机,可以隔离不同域名
  - 支持按需拉流，无人观看自动关断拉流
  - 支持先播放后推流，提高及时推流画面打开率
  - 提供完整强大的 c api sdk
  - 支持 FFmpeg 拉流代理任意格式的流
  - 支持 http api 生成并返回实时截图
  - 支持按需解复用、转协议，当有人观看时才开启转协议，降低 cpu 占用率
  - 支持溯源模式的集群部署，溯源方式支持 rtsp/rtmp/hls/http-ts, 边沿站支持 hls, 源站支持多个(采用 round robin 方式溯源)
  - rtsp/rtmp/webrtc 推流异常断开后，可以在超时时间内重连推流，播放器无感知

## 编译以及测试

**编译前务必仔细参考 wiki:[快速开始](../tutorial/README.md)操作!!!**

## 怎么使用

你有三种方法使用 ZLMediaKit，分别是：

- 1、使用 c api，作为 sdk 使用，请参考[这里](https://github.com/ZLMediaKit/ZLMediaKit/tree/master/api/include).
- 2、作为独立的流媒体服务器使用，不想做 c/c++开发的，可以参考 [restful api](./media_server/restful_api.md) 和 [web hook](./media_server/web_hook_api.md).
- 3、如果想做 c/c++开发，添加业务逻辑增加功能，可以参考这里的[测试程序](https://github.com/ZLMediaKit/ZLMediaKit/tree/master/tests).

## Docker 镜像

你可以从 Docker Hub 下载已经编译好的镜像并启动它：

```bash
#此镜像为github持续集成自动编译推送，跟代码(master分支)保持最新状态
docker run -id -p 1935:1935 -p 8080:80 -p 8443:443 -p 8554:554 -p 10000:10000 -p 10000:10000/udp -p 8000:8000/udp -p 9000:9000/udp zlmediakit/zlmediakit:master
```

你也可以根据 Dockerfile 编译镜像：

```bash
bash build_docker_images.sh
```
