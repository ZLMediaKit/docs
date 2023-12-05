---
title: RTMP对H265和OPUS的支持
---

## 背景

rtmp/flv 是直播行业事实上的标准，这两者在国内直播领域应用非常广泛。在浏览器上要实现无插件的低延时直播播放，基本绕不开 rtmp/flv.
由于 rtmp/flv 是 Adobe 设计的私有协议，原生是不支持 H265(视频监控应用广泛)和 opus(RTC 应用广泛)的，而目前视频监控、RTC 相关行业都有使用直播基础设施的需求，所以对 rtmp 进行修改，使其添加对 H265 和 opus 的支持比较重要。

## 实现方式

rtmp 通过 codec id 来判断编码格式，同时通过 message type 来区分数据类型(包括音频包、视频包)，所以音视频的 codec_id 是可以相同的(相同类型不冲突即可)；
例如 H264 的 codec id 为 7，G711A 的 codec id 也为 7。
目前国内默认定义 H265 的 codec id 为**12**(由金山云首先[实现并公布](https://github.com/ksvc/FFmpeg/wiki)).
而对 opus 的 rtmp 扩展目前还未有广泛共识，作者在与相关人士讨论后，协商定义其 codec id 为**13**，目前已经实现了对 FFmpeg(基于最新版本)的修改，添加了对[h265/opus 的 rtmp 扩展](https://gitee.com/xia-chu/FFmpeg).

## 服务器实现

ZLMediaKit 已经实现了 rtsp/rtmp/mp4/hls 对 h265/opus 的全面支持, 欢迎各位测试使用。
