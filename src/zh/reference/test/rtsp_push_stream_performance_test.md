---
title: rtsp推流性能测试
---

## 一、测试环境

- 测试日期：2022/5/18
- 代码版本：git hash: c7d7999f
- cpu： Intel(R) Xeon(R) Gold 6148 CPU @ 2.40GHz
- 操作系统：CentOS release 6.3 (Final)
- 内存：16GB
- 网卡：127.0.0.1
- 测试码流: [200kbps.768x320.flv](https://raw.githubusercontent.com/ossrs/srs/develop/trunk/doc/source.200kbps.768x320.flv)
- 编译器：gcc (GCC) 8.2.0
- zlmediakit 编译类型：Release
- malloc 库：ptmalloc(未开启 jemalloc)
- config.ini 配置文件修改(主要开启合并写、按需转协议)：

```patch
diff --git a/conf/config.ini b/conf/config.ini
index c2d4613f..99ce5c84 100644
--- a/conf/config.ini
+++ b/conf/config.ini
@@ -51,12 +51,12 @@ addMuteAudio=1
 #如果不删除将会接着上一次的数据继续写(录制hls/mp4时会继续在前一个文件后面写)
 resetWhenRePlay=1
 #是否默认推流时转换成hls，hook接口(on_publish)中可以覆盖该设置
-publishToHls=1
+publishToHls=0
 #是否默认推流时mp4录像，hook接口(on_publish)中可以覆盖该设置
 publishToMP4=0
 #合并写缓存大小(单位毫秒)，合并写指服务器缓存一定的数据后才会一次性写入socket，这样能提高性能，但是会提高延时
 #开启后会同时关闭TCP_NODELAY并开启MSG_MORE
-mergeWriteMS=0
+mergeWriteMS=300
 #全局的时间戳覆盖开关，在转协议时，对frame进行时间戳覆盖
 #该开关对rtsp/rtmp/rtp推流、rtsp/rtmp/hls拉流代理转协议时生效
 #会直接影响rtsp/rtmp/hls/mp4/flv等协议的时间戳
@@ -72,15 +72,15 @@ enable_audio=1
 ####### 如果某种协议你想获取最好的用户体验，请置0(第一个播放者可以秒开，且不花屏)

 #hls协议是否按需生成，如果hls.segNum配置为0(意味着hls录制)，那么hls将一直生成(不管此开关)
-hls_demand=0
+hls_demand=1
 #rtsp[s]协议是否按需生成
-rtsp_demand=0
+rtsp_demand=1
 #rtmp[s]、http[s]-flv、ws[s]-flv协议是否按需生成
-rtmp_demand=0
+rtmp_demand=1
 #http[s]-ts协议是否按需生成
-ts_demand=0
+ts_demand=1
 #http[s]-fmp4、ws[s]-fmp4协议是否按需生成
-fmp4_demand=0
+fmp4_demand=1
```

- 推流命令:

```bash
ffmpeg -stream_loop -1 -re -i ~/Downloads/source.200kbps.768x320.flv -acodec copy -vcodec copy -f flv  rtmp://ip:port/live/test
```

## 二、rtsp 推流性能测试(1 万路)

- 推流命令：

```bash
#加大文件描述符个数
ulimit -n 102400
#启动1万个rtmp推流
./test_bench_push -i rtmp://127.0.0.1/live/test -c 10000 -o rtsp://127.0.0.1/live/push
```

- top 信息：

![图片](https://user-images.githubusercontent.com/11495632/169198621-85d3a0f3-ffc4-4e2d-bdb8-8e886130ff2e.png)

- perf top 信息：

![图片](https://user-images.githubusercontent.com/11495632/169198658-7ca9599c-16da-4dd9-8fb5-aa35d35cbe97.png)

- nload 信息(平均 2.39Gb/s)：

![图片](https://user-images.githubusercontent.com/11495632/169198759-7baa33a2-30fe-409b-a0bf-e737be849ad1.png)
