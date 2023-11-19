---
title: RTMP supports H265 and OPUS
---
## Background
RTMP/FLV is the de facto standard in the live streaming industry, and they are widely used in the domestic live streaming field. To achieve plugin-free low-latency live streaming playback in web browsers, RTMP/FLV is essential.
Since RTMP/FLV is a proprietary protocol designed by Adobe, it does not natively support H.265 (widely used in video surveillance applications) and Opus (widely used in RTC applications). However, there is a growing demand for live streaming infrastructure in the video surveillance and RTC industries. Therefore, it is important to modify RTMP to add support for H.265 and Opus.

## Implementation Approach
RTMP determines the encoding format through codec ID and distinguishes data types (including audio packets and video packets) through message type. Therefore, the codec_id for audio and video can be the same as long as they are of the same type and do not conflict.
For example, the codec ID for H.264 is 7, and the codec ID for G.711A is also 7.
Currently, the default codec ID for H.265 in China is **12** (implemented and published by [金山云](https://github.com/ksvc/FFmpeg/wiki)).
As for the RTMP extension for Opus, there is currently no widespread consensus. After discussions with relevant individuals, the author has negotiated and defined its codec ID as **13**. The modification has already been implemented for FFmpeg (based on the latest version) to add support for[h265/opus RTMP extension](https://gitee.com/xia-chu/FFmpeg).

## Server Implementation
ZLMediaKit has already implemented comprehensive support for H.265/Opus in RTSP/RTMP/MP4/HLS. Feel free to test and use it.
