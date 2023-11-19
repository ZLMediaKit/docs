---
title: RTMP Playback Compatibility Issues
---

In general, the specification for RTMP is to first send metadata, followed by config frames, then keyframes, and finally regular frames.

Once the config frames are received, the decoder can be initialized.

However, some streams are different, as they receive other frames before receiving the config frame for the video.

In this case, the video track is not created and initialized.

There is a preliminary suspicion that the compatibility of the Nginx RTMP server is not good.

ZLMediaKit's streaming tool strictly follows the process of sending metadata first, then config frames, followed by keyframes, and finally regular frames.

It also caches all config frames.

FFplay can successfully play due to its determination of playback success based on data volume and time.

As long as the data volume reaches a certain threshold or the time reaches a certain duration, it triggers the event of successful playback.

The advantage of this approach is a high success rate in playback, but the downside is a longer video opening time.
