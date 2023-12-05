---
title: RTSP性能优化
order: 1
---

## 概述

在最近 ZLMediaKit 的一次提交中，我对 rtsp 服务器的性能做了一次[改进](https://github.com/xiongziliang/ZLMediaKit/commit/b169f94cce1ecbab50248f25ee3b33dd40602fe1),本次改进中，核心的思想是：

- **缓存时间戳相同的 RTP 包(意味着是同一帧数据)，作为一个数据包进行分发**。

理论上，这样做可以大大**减少多线程分发时线程切换次数、多余发送逻辑代码的执行以及系统调用次数**，预期在不增加播放延时的情况下能大幅提高 rtsp 服务器的性能.

## 测试

为了验证本次优化的预期目标，我在 linux 服务器上做了一系列的测试对比，以下是测试环境：

- 操作系统：ubuntu16 desktop 64bit
- cpu： 4 核心的 Intel(R) Core(TM) i7-4790 CPU @ 3.60GHz
- 编译器：gcc 5.4.0，开启 Release 编译(cmake -DCMAKE_BUILD_TYPE=Release)
- malloc 库：连接 jemalloc
- 网络： 127.0.0.1 本地循环网络
- 测试客户端：[test_benchmark](https://github.com/xiongziliang/ZLMediaKit/blob/master/tests/test_benchmark.cpp)
- 测试服务器：[MediaServer](https://github.com/xiongziliang/ZLMediaKit/tree/master/server)
- 测试码流：4K H264 的 RTSP 流，通过 MP4 Rtsp 点播实现，文件 200 秒，190MB,码流大概 8Mb/s
- 测试方法：通过 test_benchmark 播放 500 路 RTSP 4K 点播，总码流大概 4Gb/s，分别测试新老版本的 MediaServer 的进程。

## 测试数据

- 启动的播放器个数：
  ![image](https://user-images.githubusercontent.com/11495632/78686734-f6d31180-7925-11ea-9ba3-864865a910b9.png)
- 实时码流:
  ![image](https://user-images.githubusercontent.com/11495632/78686849-1b2eee00-7926-11ea-9434-a4f943021be5.png)

## 性能对比

### 老版本数据

- cpu 使用率(浮动比较大，最高 200%+)：
  ![image](https://user-images.githubusercontent.com/11495632/78687097-621ce380-7926-11ea-9adb-80ccbbfca1f3.png)
  ![image](https://user-images.githubusercontent.com/11495632/78687391-b031e700-7926-11ea-9b81-0339d8d9dafd.png)

- 性能分析(perf top)：
  ![image](https://user-images.githubusercontent.com/11495632/78687480-c8096b00-7926-11ea-9d72-f21fffa8fd7d.png)

- 总结 ： cpu 占用主要发生在内核态的系统调用(syscall)、tcp_sendmsg、内存拷贝。

### 新版本数据：

- cpu 使用率(浮动比较小，50%以下)：
  ![image](https://user-images.githubusercontent.com/11495632/78688226-9e9d0f00-7927-11ea-8d31-49d487f339b4.png)
  ![image](https://user-images.githubusercontent.com/11495632/78687893-3b12e180-7927-11ea-9e41-653b771405de.png)

- 后面我又测试了 2000 个播放器，掉了一批，最后稳定在 1800 个左右，实时流量 17.5Gb/s(单向)左右,cpu 占用 300%左右:
  ![image](https://user-images.githubusercontent.com/11495632/78741558-39c7d000-798c-11ea-9860-6dc18db1ef0c.png)
  ![image](https://user-images.githubusercontent.com/11495632/78741649-78f62100-798c-11ea-85a9-1810bf1deaf1.png)
  ![image](https://user-images.githubusercontent.com/11495632/78741678-8d3a1e00-798c-11ea-9aec-dff834620781.png)
  ![image](https://user-images.githubusercontent.com/11495632/78741720-ad69dd00-798c-11ea-83c6-1b0b57d79ba2.png)

- 性能分析(perf top)：
  ![image](https://user-images.githubusercontent.com/11495632/78688104-7a413280-7927-11ea-953b-d3b9a4c5ed0c.png)

- 总结 ： cpu 占用主要发生在内核态内存拷贝，系统调用(syscall)、tcp_sendmsg 的开销很小。

## 总结

本次性能测试基本证明了预想，性能提升大概有 4 倍以上。
本机器为 i7-4790 4 核心 8 线程的，所以 cpu 占用率最高为 800%，现在 ZLMediaKit 在上面支撑 500 个 4K RTSP 播放器，实时流量大概 4Gb/s 时 cpu 使用率 50%不到,通过简单换算，该 cpu 可以支撑大概 8000 个 4K RTSP 播放器，实时流量最高能达到 64Gb/s，考虑到性能折损，我们保守估计可以支持 6000 个 4K RTSP 播放器，50Gb/s 的流量。

## 最后

在 ZLMediaKit 流媒体服务器中，通过智能指针引用计数的方式实现了多线程的数据分发，不管分发多少次，数据拷贝次数都是固定的，所以 ZLMediaKit 可以达到如此夸张的性能参数，但是在测试中，我们也能发现，性能占用已经大部分发生在内核态了，应用层的 cpu 占用反而不是瓶颈了。这是因为在内核态，写 socket 缓存需要做内存拷贝，随着播放器个数的增加，内存拷贝会越来越多，此时性能瓶颈不再是应用层，而是由于内存带宽瓶颈导致的内核性能瓶颈。
