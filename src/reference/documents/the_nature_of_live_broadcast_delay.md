---
title: The Essence of Live Streaming Delay
---

1. Live streaming is the representation of ongoing events, generating data as time passes.

2. So why is there a delay in live streaming? The essence lies in the fact that, in order to enhance the user experience, live streaming caches a portion of historical data (such as using GOP caching to improve video loading speed).

3. Does this mean that without GOP caching, there would be no delay? The answer is incorrect because not only does your server have a cache, but the player also has its own cache. There is a time difference between when the player clicks "Play" and when the video appears. Why does the player do this? The reason is to improve the smoothness of playback by implementing caching. We can consider the transmission of live streaming data to the player as a pipeline. Just like a pipeline can have varying water flow rates and even interruptions, if we don't use a "bucket" to buffer it, the video may stutter.

4. Let's assume we remove all the caches from both the server and the player. Does that mean there would be no delay? Too young, too simple! Remember, **caches can never be completely eliminated**. Let's say the network is a water pipe, and we block it for 5 seconds before releasing it. Will the data from those 5 seconds disappear? No! Live streaming is an ongoing event, continuously generating "water flow." It will cause the pipe to expand. During those 5 seconds, the player has to wait for the data, and once the network is restored, the player will receive a surge of data from those 5 seconds. Then, the continuous flow of live streaming data resumes. As a result, the player ends up with an extra 5 seconds of data, which can either be discarded or played back at an accelerated speed. Otherwise, it will never magically disappear.

5. Unfortunately, I have to tell you that almost all standard players do not directly discard data or accelerate playback speed.

6. Now, an observant friend may ask, why does UDP live streaming have lower latency? The reason is that UDP, as a "pipe," has many holes, allowing excessive water to leak out. The result is direct data loss, causing the player to experience screen glitches.

7. The expansion of the TCP pipeline can be understood as an increase in network link buffering (router buffering). What if there is too much water accumulation? First, it fills up the network link buffer, then the sending-side socket buffer, and then the sending-side application logic buffer. If there is still not enough space, I'm sorry, but the server has no choice but to sever the TCP connection.
