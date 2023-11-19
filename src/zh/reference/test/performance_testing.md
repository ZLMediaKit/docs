---
title: 性能测试
---

# 一、最新性能测试：

## 1.1、测试环境

- cpu： Intel(R) Xeon(R) Gold 6148 CPU @ 2.40GHz 4核8线程
- 操作系统：CentOS release 6.3 (Final)
- 内存：16GB
- 网卡：127.0.0.1
- 测试码流: [200kbps.768x320.flv](https://raw.githubusercontent.com/ossrs/srs/develop/trunk/doc/source.200kbps.768x320.flv)
- 编译器：gcc (GCC) 8.2.0
- 编译类型：Release


## 1.2、测试数据

> 推流性能测试内存占用部分存在不准确问题(原因是当时测试时有个多gop缓存bug)

| 客户端类型 | 流个数 | cpu  | 内存 |  网络io  | 4物理核cpu理论性能 |
| :--------: | :----: | :--: | :--: | :------: | :------------: |
|  rtsp播放  |  20K   | 160% | 203M |  5Gb/s   |     约100K      |
|  rtsp播放  | 32.2K  | 235% | 220M | 7.78Gb/s |     约100K      |
|  rtsp推流  |  10K   | 264% | 760M | 2.39Gb/s |     约30K      |
|            |        |      |      |          |                |
|  rtmp播放  |  10K   | 148% | 81M  | 2.33Gb/s |     约50K      |
|  rtmp播放  |  30K   | 450% | 246M |  7Gb/s   |     约50K      |
|  rtmp推流  |  10K   | 224% | 1.6G | 2.16Gb/s |     约30K      |

## 1.3、测试详细数据
- [rtmp拉流](https://github.com/ZLMediaKit/ZLMediaKit/wiki/rtmp%E6%8B%89%E6%B5%81%E6%80%A7%E8%83%BD%E6%B5%8B%E8%AF%95)
- [rtmp推流](https://github.com/ZLMediaKit/ZLMediaKit/wiki/rtmp%E6%8E%A8%E6%B5%81%E6%80%A7%E8%83%BD%E6%B5%8B%E8%AF%95)
- [rtsp拉流](https://github.com/ZLMediaKit/ZLMediaKit/wiki/rtsp%E6%8B%89%E6%B5%81%E6%80%A7%E8%83%BD%E6%B5%8B%E8%AF%95)
- [rtsp推流](https://github.com/ZLMediaKit/ZLMediaKit/wiki/rtsp%E6%8E%A8%E6%B5%81%E6%80%A7%E8%83%BD%E6%B5%8B%E8%AF%95)


# 二、较早的性能测试记录
- [rtmp拉流性能测试](https://github.com/ZLMediaKit/ZLMediaKit/issues/406)
- [GB28181性能测试](https://github.com/ZLMediaKit/ZLMediaKit/issues/961)
- [rtsp音频拉流性能测试](https://github.com/ZLMediaKit/ZLMediaKit/issues/1271)
- [过时的性能测试记录](https://github.com/zlmediakit/ZLMediaKit/wiki/Benchmark)

# 三、性能测试与优化
- [rtsp性能优化与测试](https://github.com/ZLMediaKit/ZLMediaKit/wiki/RTSP%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96)
- [hls性能优化与测试](https://github.com/ZLMediaKit/ZLMediaKit/wiki/zlmediakit%E7%9A%84hls%E9%AB%98%E6%80%A7%E8%83%BD%E4%B9%8B%E6%97%85)
- [rtmp性能优化](https://github.com/ZLMediaKit/ZLMediaKit/issues/540)


