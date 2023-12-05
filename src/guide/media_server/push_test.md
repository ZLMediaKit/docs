---
title: Push and Playback Testing
---

## Push Testing

ZLMediaKit supports RTSP/RTMP/RTP push streaming. Typically, OBS/FFmpeg is used for push testing. The FFmpeg push commands are as follows:

1. Pushing via RTSP:

   ```bash
   # H.264 push
   ffmpeg -re -i "/path/to/test.mp4" -vcodec h264 -acodec aac -f rtsp -rtsp_transport tcp rtsp://127.0.0.1/live/test
   # H.265 push
   ffmpeg -re -i "/path/to/test.mp4" -vcodec h265 -acodec aac -f rtsp -rtsp_transport tcp rtsp://127.0.0.1/live/test
   ```

2. Pushing via RTMP:

   ```bash
   # If FFmpeg is not installed, you can also use OBS for push streaming
   ffmpeg -re -i "/path/to/test.mp4" -vcodec h264 -acodec aac -f flv rtmp://127.0.0.1/live/test
   # The RTMP standard does not support H.265, but there are domestic extensions. If you want FFmpeg to support RTMP-H.265, please follow the instructions in this article to compile: https://github.com/ksvc/FFmpeg/wiki/hevcpush
   ```

3. Pushing via RTP:

   ```bash
   # H.264 push
   ffmpeg -re -i "/path/to/test.mp4" -vcodec h264 -acodec aac -f rtp_mpegts rtp://127.0.0.1:10000
   # H.265 push
   ffmpeg -re -i "/path/to/test.mp4" -vcodec h265 -acodec aac -f rtp_mpegts rtp://127.0.0.1:10000
   ```

## Log Observation

If the push is successful, the following log will be printed:

![image](/images/push_test.png)

The relevant strings in the log represent:

```bash
2020-04-10 12:51:52.331 I | regist rtsp __defaultVhost__ rtp 206442D7
                                    ^           ^         ^      ^
                                  schema      vhost      app stream_id
```

## Playback URL

Please refer to the [play URL rules](./play_url_rules.md) to play the aforementioned push stream.
