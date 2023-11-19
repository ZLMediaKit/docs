---
title: GB28181怎么用设备ID作为流ID
---
为了支持RTP流的识别(与摄像头ID产生关联), 必须通过 `源地址` 或 `ssrc` 或 `本地端口号` 来区分.

但是在issue #338 里面有开发者反馈，有些设备不支持设置ssrc，ssrc一直为0.

而源地址端口也会一直变，RTP推流前SIP服务器也不知道摄像头推流端口(甚至IP都不知道) 那么区分流只通过源地址也不现实,
因为一个局域网内也可能多个设备, 如果ZLMediaKit在公网,那么这些流的IP是一致的,而端口是随机的,根本没法跟摄像头ID对应起来.

所以为了实现RTP推流参数的流ID与摄像头ID产生关联，就基本只剩下`本地端口号`这条路了，这就意味着一个端口只能接受一个流。

在不指定流ID时，ZLMediaKit的行为跟之前完全一样，单端口支持多流，ssrc作为stream id。

如果指定了该端口绑定的流ID，那么该端口只能接收一路流。

以下是关键代码：
![image](https://user-images.githubusercontent.com/11495632/86908534-3d185680-c149-11ea-816b-a90e64dd89ea.png)
![image](https://user-images.githubusercontent.com/11495632/86908544-41447400-c149-11ea-86d5-96844d095fad.png)
![image](https://user-images.githubusercontent.com/11495632/86908523-3ab5fc80-c149-11ea-92da-c90dc88a298a.png)
![image](https://user-images.githubusercontent.com/11495632/86908550-443f6480-c149-11ea-9924-b3743119031a.png)
![image](https://user-images.githubusercontent.com/11495632/86908559-47d2eb80-c149-11ea-8173-4b2dfb4238d3.png)
![image](https://user-images.githubusercontent.com/11495632/86908653-7650c680-c149-11ea-8783-2be617fdab42.png)

