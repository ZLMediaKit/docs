---
title: Delay Testing
---

::: note

This test was conducted earlier, and some content may have become outdated. The `ultraLowDelay` configuration option has been removed. To achieve the lowest delay mode, set the combined write delay to 0 (default is 0). When testing the delay, you can use WebRTC playback.

:::

## Network Environment

- `localhost`

## Operating System

- `macOS`

## Server

- `MediaServer`, startup parameter `-t 1`, single-threaded startup
- Open the configuration file and enable `ultraLowDelay` mode

## Streaming Software

- `obs`, RTMP streaming to localhost
- `Rate Control`: `CBR`
- `Bitrate`: 2500
- `Custom Buffer Size`: 100
- `Keyframe Interval`: 2 seconds
- `CPU Usage Preset`: `ultrafast`
- `Profile`: `baseline`
- `Tune`: `zerolatency`
- `Resolution`: 1280x720
- `FPS`: 30
  ![image](https://user-images.githubusercontent.com/11495632/64311220-daf53f00-cfd5-11e9-8d1f-c39d95c335c4.png)

## Player

- Built-in `test_player`
- Play RTSP (test both UDP and TCP modes) or RTMP on localhost

## Testing Method

- Open a browser and go to the online stopwatch webpage https://miaobiao.51240.com/
- Configure OBS to capture the stopwatch section of the browser image and start streaming to MediaServer
- Open the test_player and play the corresponding RTSP or RTMP URL
- Use a screenshot tool to capture the frames and compare the time difference between the online stopwatch webpage and the test_player

## Test Results

- RTMP playback, delay of 200ms to 400ms
  ![image](https://user-images.githubusercontent.com/11495632/64311009-0af01280-cfd5-11e9-9117-2f520db0b70f.png)
  ![image](https://user-images.githubusercontent.com/11495632/64311040-2b1fd180-cfd5-11e9-8526-675d5d40d746.png)

- RTSP playback (TCP mode), delay of 200ms to 400ms
  ![image](https://user-images.githubusercontent.com/11495632/64311126-76d27b00-cfd5-11e9-89e4-59e9cb15b8bc.png)
  ![image](https://user-images.githubusercontent.com/11495632/64311161-9b2e5780-cfd5-11e9-96dd-5ab7eecc83ca.png)

- RTSP playback (UDP mode), delay of 200ms to 400ms
  ![image](https://user-images.githubusercontent.com/11495632/64311179-b600cc00-cfd5-11e9-953f-07e73c377df1.png)
  ![image](https://user-images.githubusercontent.com/11495632/64311187-c022ca80-cfd5-11e9-89b4-a015d614706e.png)

## Test Conclusion

- In the single-threaded mode, where the player and streaming software are in the same thread without any thread switching, the delay is slightly more stable and lower.
- Enabling TCP_NODELAY and disabling MSG_MORE did not significantly optimize the delay in this test.
- The average delay from multiple screenshots is around 300ms, with a minimum of around 200ms and a maximum of over 400ms.
- Back in 2017, when I developed my own streaming software (unfortunately, I didn't save the .exe file), I was able to achieve a minimum delay of around 120ms, which is currently not achievable. It is suspected that OBS still has relatively high streaming delay.
- It is recommended to disable audio during streaming tests. For encoding formats like AAC, the encoding delay can exceed 100ms.
- This test was conducted on macOS. Ideally, the server would be Linux, the streaming software would be on Windows, and if the player rendering is done independently, the delay could be even lower.
- Those interested can conduct tests on Windows. In 2017, when I tested it on a local network, with the streaming software, server, and player not on the same host, the delay was as low as 120ms. It should be even lower with localhost.
