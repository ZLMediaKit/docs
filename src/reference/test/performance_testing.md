---
title: Performance Testing
---

## 1. Latest Performance Test:

### 1.1 Test Environment

- CPU: Intel(R) Xeon(R) Gold 6148 CPU @ 2.40GHz, 4 cores, 8 threads
- Operating System: CentOS release 6.3 (Final)
- Memory: 16GB
- Network Card: 127.0.0.1
- Test Stream: [200kbps.768x320.flv](https://raw.githubusercontent.com/ossrs/srs/develop/trunk/doc/source.200kbps.768x320.flv)
- Compiler: gcc (GCC) 8.2.0
- Compilation Type: Release

### 1.2 Test Data

> There were inaccuracies in the memory usage during the push streaming performance test (due to a multi-GOP caching bug at the time of testing).

| Client Type | Stream Count | CPU  | Memory | Network IO | Theoretical Performance of 4 Physical Cores |
| :---------: | :----------: | :--: | :----: | :--------: | :-----------------------------------------: |
|  RTSP Play  |     20K      | 160% |  203M  |   5Gb/s    |             Approximately 100K              |
|  RTSP Play  |    32.2K     | 235% |  220M  |  7.78Gb/s  |             Approximately 100K              |
|  RTSP Push  |     10K      | 264% |  760M  |  2.39Gb/s  |              Approximately 30K              |
|             |              |      |        |            |                                             |
|  RTMP Play  |     10K      | 148% |  81M   |  2.33Gb/s  |              Approximately 50K              |
|  RTMP Play  |     30K      | 450% |  246M  |   7Gb/s    |              Approximately 50K              |
|  RTMP Push  |     10K      | 224% |  1.6G  |  2.16Gb/s  |              Approximately 30K              |

### 1.3 Detailed Test Data

- [RTMP Pull Stream](./rtmp_pull_stream_performance_test.md)
- [RTMP Push Stream](./rtmp_push_stream_performance_test.md)
- [RTSP Pull Stream](./rtsp_pull_stream_performance_test.md)
- [RTSP Push Stream](./rtsp_push_stream_performance_test.md)

## 2. Earlier Performance Test Records

- [RTMP Pull Stream Performance Test](https://github.com/ZLMediaKit/ZLMediaKit/issues/406)
- [GB28181 Performance Test](https://github.com/ZLMediaKit/ZLMediaKit/issues/961)
- [RTSP Audio Pull Stream Performance Test](https://github.com/ZLMediaKit/ZLMediaKit/issues/1271)
- [Outdated Performance Test Records](./benchmark.md)

## 3. Performance Testing and Optimization

- [RTSP Performance Optimization and Testing](../development_log/rtsp_performance_optimization.md)
- [HLS Performance Optimization and Testing](../development_log/hls_high_performance_journey.md)
- [RTMP Performance Optimization](https://github.com/ZLMediaKit/ZLMediaKit/issues/540)
