---
title: GB28181怎么用设备ID作为流ID
---

为了支持 RTP 流的识别(与摄像头 ID 产生关联), 必须通过 `源地址` 或 `ssrc` 或 `本地端口号` 来区分.

但是在 issue #338 里面有开发者反馈，有些设备不支持设置 ssrc，ssrc 一直为 0.

而源地址端口也会一直变，RTP 推流前 SIP 服务器也不知道摄像头推流端口(甚至 IP 都不知道) 那么区分流只通过源地址也不现实,
因为一个局域网内也可能多个设备, 如果 ZLMediaKit 在公网,那么这些流的 IP 是一致的,而端口是随机的,根本没法跟摄像头 ID 对应起来.

所以为了实现 RTP 推流参数的流 ID 与摄像头 ID 产生关联，就基本只剩下`本地端口号`这条路了，这就意味着一个端口只能接受一个流。

在不指定流 ID 时，ZLMediaKit 的行为跟之前完全一样，单端口支持多流，ssrc 作为 stream id。

如果指定了该端口绑定的流 ID，那么该端口只能接收一路流。

以下是关键代码：

![image](/images/how_to_use_device_id_as_stream_id_1.png)

![image](/images/how_to_use_device_id_as_stream_id_2.png)

![image](/images/how_to_use_device_id_as_stream_id_3.png)

![image](/images/how_to_use_device_id_as_stream_id_4.png)

![image](/images/how_to_use_device_id_as_stream_id_5.png)

![image](/images/how_to_use_device_id_as_stream_id_6.png)
