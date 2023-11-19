---
title: RTMP对H265和OPUS的支持
---
## 背景
rtmp/flv是直播行业事实上的标准，这两者在国内直播领域应用非常广泛。在浏览器上要实现无插件的低延时直播播放，基本绕不开rtmp/flv.
由于rtmp/flv是Adobe设计的私有协议，原生是不支持H265(视频监控应用广泛)和opus(RTC应用广泛)的，而目前视频监控、RTC相关行业都有使用直播基础设施的需求，所以对rtmp进行修改，使其添加对H265和opus的支持比较重要。

## 实现方式
rtmp通过codec id来判断编码格式，同时通过message type来区分数据类型(包括音频包、视频包)，所以音视频的codec_id是可以相同的(相同类型不冲突即可)；
例如H264的codec id为7，G711A的codec id也为7。
目前国内默认定义H265的codec id为**12**(由金山云首先[实现并公布](https://github.com/ksvc/FFmpeg/wiki)).
而对opus的rtmp扩展目前还未有广泛共识，作者在与相关人士讨论后，协商定义其codec id为**13**，目前已经实现了对FFmpeg(基于最新版本)的修改，添加了对[h265/opus的rtmp扩展](https://gitee.com/xia-chu/FFmpeg).

## 服务器实现
ZLMediaKit已经实现了rtsp/rtmp/mp4/hls对h265/opus的全面支持, 欢迎各位测试使用。



