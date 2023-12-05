---
title: 性能测试
---

## 一、最新性能测试

### 1.1、测试环境

- cpu： Intel(R) Xeon(R) Gold 6148 CPU @ 2.40GHz 4 核 8 线程
- 操作系统：CentOS release 6.3 (Final)
- 内存：16GB
- 网卡：127.0.0.1
- 测试码流: [200kbps.768x320.flv](https://raw.githubusercontent.com/ossrs/srs/develop/trunk/doc/source.200kbps.768x320.flv)
- 编译器：gcc (GCC) 8.2.0
- 编译类型：Release

### 1.2、测试数据

> 推流性能测试内存占用部分存在不准确问题(原因是当时测试时有个多 gop 缓存 bug)

| 客户端类型 | 流个数 | cpu  | 内存 | 网络 io  | 4 物理核 cpu 理论性能 |
| :--------: | :----: | :--: | :--: | :------: | :-------------------: |
| rtsp 播放  |  20K   | 160% | 203M |  5Gb/s   |        约 100K        |
| rtsp 播放  | 32.2K  | 235% | 220M | 7.78Gb/s |        约 100K        |
| rtsp 推流  |  10K   | 264% | 760M | 2.39Gb/s |        约 30K         |
|            |        |      |      |          |                       |
| rtmp 播放  |  10K   | 148% | 81M  | 2.33Gb/s |        约 50K         |
| rtmp 播放  |  30K   | 450% | 246M |  7Gb/s   |        约 50K         |
| rtmp 推流  |  10K   | 224% | 1.6G | 2.16Gb/s |        约 30K         |

### 1.3、测试详细数据

- [rtmp 拉流](./rtmp_pull_stream_performance_test.md)
- [rtmp 推流](./rtmp_push_stream_performance_test.md)
- [rtsp 拉流](./rtsp_pull_stream_performance_test.md)
- [rtsp 推流](./rtsp_push_stream_performance_test.md)

## 二、较早的性能测试记录

- [rtmp 拉流性能测试](https://github.com/ZLMediaKit/ZLMediaKit/issues/406)
- [GB28181 性能测试](https://github.com/ZLMediaKit/ZLMediaKit/issues/961)
- [rtsp 音频拉流性能测试](https://github.com/ZLMediaKit/ZLMediaKit/issues/1271)
- [过时的性能测试记录](./benchmark.md)

## 三、性能测试与优化

- [rtsp 性能优化与测试](../development_log/rtsp_performance_optimization.md)
- [hls 性能优化与测试](../development_log/hls_high_performance_journey.md)
- [rtmp 性能优化](https://github.com/ZLMediaKit/ZLMediaKit/issues/540)
