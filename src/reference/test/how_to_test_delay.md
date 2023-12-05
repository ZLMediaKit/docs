---
title: How to test the delay?
---

## Introduction

Some users often ask me in the group why there is a several seconds delay when using ZLMediaKit for stream playback or stream forwarding. Sometimes, the delay can be as long as more than 10 seconds or even half a minute for HLS. The purpose of this article is to clarify the misunderstanding about delay.

## What is Delay

Many users do not fully understand what delay means. They think that the time difference between the displayed frames of any player and the original stream frames is the delay, but this is actually the biggest misconception about delay.
Delay is not superficial. Many people are not professional when testing delay and have insufficient understanding of the professionalism of delay testing. I would like to remind everyone that not every player is qualified to perform delay testing!

In summary, the overall delay consists of the following components:

- **Capture Delay**

  When capturing camera or graphics card frames, there is a certain delay in capturing the frames as YUV/RGB data due to limitations such as fps, CPU performance, and memory copying speed. Generally, the delay is in the millisecond range. Since general encoders have restrictions on input data formats, such as requiring consistent input of YUV420P, there will also be a delay in the conversion calculation when converting RGB to YUV420P (this can be reduced using the libyuv library). In general, the capture delay is about milliseconds. If the fps is 30, the capture delay will generally be more than 30 milliseconds, and there may be additional milliseconds of delay during memory copying and color conversion.

- **Encoding Delay**

  When inputting the original frames into the encoder, the encoded data is not immediately output, especially when B-frames are enabled. Since B-frames require referencing the following P-frames, the delay will be greater. Therefore, in delay-sensitive situations, B-frames are generally not enabled, and in such cases, the encoding delay should be in the millisecond range and not very high.

- **Upstream Network Transmission Delay**

  After the data is encoded, it needs to be packed into a certain protocol before being written to the socket and transmitted to the streaming server or stream proxy server. Protocol packing involves a certain amount of memory copying and computation, which can increase the delay. However, this delay is very small and can be basically ignored. When uploading data to the server, this delay can be large or small, depending on the network quality.

- **Server Protocol Conversion Delay**

  After the server receives the data, it needs to perform operations such as reading socket buffer, protocol parsing, demultiplexing, and repacking. However, overall, this delay is relatively small and has little impact. Sometimes, to improve performance, the server may use a mechanism of batching writes, which means that it will forward the data only after receiving a certain amount of data. This delay is generally a few hundred milliseconds, with ZLMediaKit defaulting to around 300 milliseconds. However, ZLMediaKit has this batching write feature disabled by default, so this delay is also very small.

- **Downstream Network Delay**

  When streaming media forwards video data to the player, there will be a delay caused by network transmission, the size of which depends on the network quality. When low-latency mode is disabled in ZLMediaKit, there will also be additional delay due to the use of MSG_MORE and the disabling of TCP_NODELAY, but low-latency mode is enabled by default in ZLMediaKit.

- **Player Delay**

  Player delay consists of network reception delay, protocol parsing and demultiplexing delay, decoding delay, cache delay, and rendering delay. Among these delays, the **cache delay** is the largest. In order to ensure smooth video playback in case of network jitter, general players increase the delay by adding playback buffers. This way, when the network deteriorates, the playback buffering can prevent video stuttering. Moreover, in order to achieve audio-video synchronization, a certain amount of buffering must be ensured. This type of delay is generally in the seconds range, typically around 5 seconds.

- **Player GOP Cache Delay**

  To display the video immediately, streaming media servers often cache the most recent I-frame, and all subsequent audio-video data after this I-frame is referred to as the GOP (Group of Pictures) cache. If the GOP is not cached, the player has to wait for the next I-frame to successfully decode the video or avoid screen flickering. Obviously, to improve the playback experience, this GOP cache cannot be eliminated. Generally, the GOP duration can be as short as 1-3 seconds or as long as tens of seconds, depending on the settings of the capture-side encoder, which the server cannot change. However, since general players do not discard too many frames after receiving the cache to ensure low latency, and players also want to have a certain amount of buffering to ensure smooth playback, this GOP cache will increase the player's delay.

- **Overall Delay**

  The sum of all the aforementioned delays is the perceived delay you observe. Sowhen you see a delay in stream playback or stream forwarding using ZLMediaKit, it is a combination of all these factors. It's important to understand that some delays are inherent to the streaming process and cannot be completely eliminated. However, there are ways to optimize the delay and minimize its impact.

## How to Test Delay

Testing delay with general players like VLC is unprofessional. The delay in these players is at least in the order of seconds. In order to achieve smooth playback and audio/video synchronization, these players cannot provide you with real-time delay data.

Here, I strongly recommend that you write your own bufferless player to test the delay. However, this is obviously beyond the ability of most people. Therefore, ZLMediaKit provides a simple player for testing delay:
[test_player](https://github.com/ZLMediaKit/ZLMediaKit/blob/master/player/test_player.cpp)

What? You're telling me you don't know how to compile ZLMediaKit? Well, in that case, I suggest you use WebRTC player to test the delay. You can also use ffplay:

```bash
ffplay -i rtmp://xxxxxxx -fflags nobuffer
```

If you don't know how to install ffplay, you can download a precompiled version from [here](http://ffmpeg.org/download.html).

## More Information About Delay

[The Essence of Live Broadcast Delay](../documents/the_nature_of_live_broadcast_delay.md)

[Delay-related Testing](./delay_test.md)
