---
title: GB28181推流
---
## 介绍
ZLMediaKit支持GB28181的 ps-rtp推流，支持的编码格式分别为 `h264/h265/aac/g711/opus`。
在收到GB28181推流后，ZLMediaKit会依次做以下事情：

- rtp排序去重。
- rtp解析成ps或ts。
- ps或ts解析成`h264/h265/aac/g711/opus`。
- 输入到复用器，生成rtsp/rtmp/ts/fmp4等格式，以便转换成其他协议或容器。

## 简单使用
ZLMediaKit默认开启10000端口用于接收UDP/TCP的GB28181推流，由于国标推流不好测试，ZLMediaKit同时也支持rtp_mpegts推流，代码会自适应判断是否为ps还是ts。
所以如果大家没有摄像头的情况下，可以用FFmpeg简单测试，基本上体验跟国标推流并无二致。

- ffmpeg推流命令:
```bash
 ffmpeg -re -i www/record/robot.mp4 -vcodec h264 -acodec aac -f rtp_mpegts rtp://127.0.0.1:10000
```

- MediaServer收到推流后的日志：
![图片](https://user-images.githubusercontent.com/11495632/93870262-823b3600-fcff-11ea-8656-3d5ce081be87.png)

上图中，这个推流的rtp ssrc为BFC2C622(16进制打印)，这个流的app为`rtp`, stream_id为`BFC2C622`，您可以根据[wiki](https://github.com/xia-chu/ZLMediaKit/wiki/%E6%92%AD%E6%94%BEurl%E8%A7%84%E5%88%99)来组合成url并播放这个流。

需要指出的是，国标推流的app固定为rtp，你只能通过代码来修改它，stream_id为rtp流的ssrc，这个是随机的，在FFmpeg中貌似没法控制。

另外，每次推流时，请更换ssrc，否则ZLMediaKit发现推流端ip和端口变化后，会直接丢弃rtp包(现象如此[issue](https://github.com/xia-chu/ZLMediaKit/issues/267))；这样做的目的是为了防止两个设备使用同一个ssrc推流时互相干扰。


## 高阶使用
在推流给10000端口时，您可能发现有个缺陷，就是stream_id是ssrc，比较抽象，可能还没法控制。

那么我们能否自定义stream_id? 答案是肯定的，ZLMediaKit通过[restful api](https://github.com/xia-chu/ZLMediaKit/wiki/MediaServer%E6%94%AF%E6%8C%81%E7%9A%84HTTP-API#24indexapiopenrtpserver)可以动态开启国标收流端口(同时支持udp/tcp模式)。

在使用openRtpServer接口动态开启国标收流端口后，这个端口只能产生一个流，也就是说，一个摄像头需要一个服务器端口用于接收国标推流。

- 以下是演示范例(postman工具调用openRtpServer接口创建随机端口)：

<img width="1631" alt="图片" src="https://user-images.githubusercontent.com/11495632/93871851-e232dc00-fd01-11ea-8802-b8e91e5f6de1.png">

- 然后启动FFmpeg推流
```bash
 ffmpeg -re -i www/record/robot.mp4 -vcodec h264 -acodec aac -f rtp_mpegts rtp://127.0.0.1:50077
```

- 以下是推流后注册的服务器日志
![图片](https://user-images.githubusercontent.com/11495632/93872178-5d948d80-fd02-11ea-9504-dea582a321d5.png)

- 需要指出的是，如果openRtpServer接口创建的端口一直没收到流（或者解析不出流），那么会自动关闭和释放。


## 调试文件生成
如果你的MediaServer能收到国标推流，但是未出现`媒体注册`相关日志，那么有可能是流有些异常，你可以修改配置文件`rtp_proxy.dumpDir`指定调试文件导出目录，
这样ZLMediaKit会把国标流导出到该文件夹，就像这样：

<img width="611" alt="图片" src="https://user-images.githubusercontent.com/11495632/93872911-6c2f7480-fd03-11ea-85d4-911d6d998c83.png">

你可以直接用ffplay播放`mp2/video后缀的文件`，`rtp`后缀的文件，你可以用测试工具`test_rtp`调试，或者你可以把它分享给其他人帮你分析原因。


## 让ZLMediaKit往其他国标服务器推流
你可以使用[restful api](https://github.com/xia-chu/ZLMediaKit/wiki/MediaServer%E6%94%AF%E6%8C%81%E7%9A%84HTTP-API#27indexapistartsendrtp)让ZLMediaKit生成国标流并往其他服务器推送，支持其他任何已注册的流转国标流。

- postman调用startSendRtp接口推送国标流：

<img width="1551" alt="图片" src="https://user-images.githubusercontent.com/11495632/93873636-a0576500-fd04-11ea-8b0f-98fb3f60c778.png">

![图片](https://user-images.githubusercontent.com/11495632/93874009-44411080-fd05-11ea-9444-0b86cf266252.png)


- 上图中是推送国标流给自己，当然你也可以推送给其他服务器，支持udp/tcp方式推流。

## 性能
GB28181的推流性能测试，请参考：[#961](https://github.com/ZLMediaKit/ZLMediaKit/issues/961)

## 丢包问题调试
如果在测试GB28181 UDP推流时，频繁打印以下日志:

![图片](https://user-images.githubusercontent.com/11495632/138648573-de46c1a8-1f49-4eb8-a187-8cf372fa4e3f.png)

请查看此[issue](https://github.com/ZLMediaKit/ZLMediaKit/issues/1221),特别提示,wifi情况下,由于无线网络干扰严重，丢包问题很可能确实是网络质量差导致的。

## 相关文章推荐阅读
[WVP+ZLMediaKit+MediaServerUI实现摄像头GB28181推流播放录制 ](https://notemi.cn/wvp---zlmedia-kit---mediaserverui-to-realize-streaming-playback-and-recording-of-camera-gb28181.html)

[使用 GB28181.Solution + ZLMediaKit + MediaServerUI 进行摄像头推流和播放](http://dlgcy.com/gb28181-solution-zlmediakit-mediaserverui/)

[GB28181语音对讲](https://github.com/ZLMediaKit/ZLMediaKit/issues/2217)

