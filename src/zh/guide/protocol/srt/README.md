---
title: SRT
---

## 特性

- NACK(重传)
- listener 支持
- 推流只支持 ts 推流
- 拉流只支持 ts 拉流
- 协议实现 [参考](https://haivision.github.io/srt-rfc/draft-sharabayko-srt.html)
- 版本支持(>=1.3.0)
- fec 与加密没有实现

## 使用

zlm 中的 srt 根据 streamid 来确定是推流还是拉流，来确定 vhost,app,streamid(ZLM 中的)、

srt 中的 streamid 为 `#!::key1=value1,key2=value2,key3=value4......`

h,r 为特殊的 key,来确定 vhost,app,streamid,如果没有 h 则 vhost 为默认值

m 为特殊 key 来确定是推流还是拉流，如果为 publish 则为推流，否则为拉流 ,如果不存在 m,则默认为拉流

其他 key 与 m 会作为 webhook 的鉴权参数

如：

```
#!::h=zlmediakit.com,r=live/test,m=publish

vhost = zlmediakit.com

app = live

streamid = test
```

是推流

- OBS 推流地址

  `srt://192.168.1.105:9000?streamid=#!::r=live/test,m=publish`

- ffmpeg 推流

  `ffmpeg -re -stream_loop -1 -i test.ts -c:v copy -c:a copy -f mpegts srt://192.168.1.105:9000?streamid=#!::r=live/test,m=publish`

- ffplay 拉流

  `ffplay -i srt://192.168.1.105:9000?streamid=#!::r=live/test`

- vlc 拉流
  - vlc 拉流需要在偏好设置->串流输出->访问输出->SRT 中设置 streamid,例如`#!::r=live/test`
  - 拉流时只需填入`srt://192.168.1.105:9000`即可
