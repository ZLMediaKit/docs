---
title: Benchmark
---

::: note This test is severely outdated and is not indicative.

:::

## Test Environment

- System: Linux core 3.16.0-7-amd64 #1 SMP Debian 3.16.59-1 (2018-10-03) x86_64 GNU/Linux
- Memory: 15GB
- CPU: Intel(R) Xeon(R) CPU E3-1220 v5 @ 3.00GHz; 4 cores
- Network: Gigabit Ethernet
- The test is conducted by accessing the server through a loopback network on the test client.

## Test Tools

ZLMeidaKit comes with a test benchmark program called test_benchmark, which uses a single-process multi-threaded model.

## Test Server

ZLMeidaKit includes a test server called test_server, which supports RTSP/RTMP/HLS protocols and uses a multi-threaded model.

## Test Media Stream

The test_server pulls an RTMP stream `rtmp://live.hkstv.hk.lxdns.com/live/hks1` and then forwards it using the test_server. The approximate bitrate of the stream is around 300-400 Kbit/s.

## Test Results

::: note

When building with CMake, use the command `cmake .. -DCMAKE_BUILD_TYPE=Release` to compile the optimized version.

:::

| Number of Players (RTMP) | CPU (Max 400%) | Memory (VIRT/RES) | Bandwidth (Average) | Packet Loss |
| ------------------------ | -------------- | ----------------- | ------------------- | ----------- |
| 1000                     | 20%            | 702M/13M          | 40 MByte/s          | None        |
| 2000                     | 39%            | 702M/18M          | 80 MByte/s          | None        |
| 5000                     | 92%            | 702M/32M          | 200 MByte/s         | None        |
| 10000                    | 170%           | 702M/59M          | 400 MByte/s         | None        |

| Number of Players (RTSP/TCP) | CPU (Max 400%) | Memory (VIRT/RES) | Bandwidth (Average) | Packet Loss |
| ---------------------------- | -------------- | ----------------- | ------------------- | ----------- |
| 1000                         | 18%            | 702M/13M          | 42 MByte/s          | None        |
| 2000                         | 35%            | 702M/19M          | 82 MByte/s          | None        |
| 5000                         | 80%            | 702M/35M          | 198 MByte/s         | None        |
| 10000                        | 130%           | 702M/62M          | 405 MByte/s         | None        |

## Comparison with SRS Performance

| Number of Players (RTMP) | CPU (Max 400%) | Memory (VIRT/RES) | Bandwidth (Average) | Packet Loss |
| ------------------------ | -------------- | ----------------- | ------------------- | ----------- |
| 1000                     | 10%            | 310M/53M          | 41.17 MByte/s       | None        |
| 2000                     | 18%            | 604M/117M         | 83.86 MByte/s       | None        |
