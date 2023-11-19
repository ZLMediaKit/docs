---
title: 推流播放测试
---
## 推流测试
ZLMediaKit支持rtsp/rtmp/rtp推流，一般通常使用obs/ffmpeg推流测试，其中FFmpeg推流命令支持以下：

- 1、使用rtsp方式推流
```bash
# h264推流
ffmpeg -re -i "/path/to/test.mp4" -vcodec h264 -acodec aac -f rtsp -rtsp_transport tcp rtsp://127.0.0.1/live/test
# h265推流
ffmpeg -re -i "/path/to/test.mp4" -vcodec h265 -acodec aac -f rtsp -rtsp_transport tcp rtsp://127.0.0.1/live/test
```

- 2、使用rtmp方式推流
```bash
#如果未安装FFmpeg，你也可以用obs推流
ffmpeg -re -i "/path/to/test.mp4" -vcodec h264 -acodec aac -f flv rtmp://127.0.0.1/live/test
# RTMP标准不支持H265,但是国内有自行扩展的，如果你想让FFmpeg支持RTMP-H265,请按照此文章编译：https://github.com/ksvc/FFmpeg/wiki/hevcpush
```

- 3、使用rtp方式推流
```bash
# h264推流
ffmpeg -re -i "/path/to/test.mp4" -vcodec h264 -acodec aac -f rtp_mpegts rtp://127.0.0.1:10000
# h265推流
ffmpeg -re -i "/path/to/test.mp4" -vcodec h265 -acodec aac -f rtp_mpegts rtp://127.0.0.1:10000
```

## 观察日志
如果推流成功，会打印这种日志：
![image](/images/push_test.png)

日志中相关字符串分别代表：
```bash
2020-04-10 12:51:52.331 I | regist rtsp __defaultVhost__ rtp 206442D7
                                    ^           ^         ^      ^
                                  schema      vhost      app stream_id
```

## 播放地址
请按照[播放url规则](./play_url_rules.md)来播放上述的推流。


