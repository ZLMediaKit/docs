---
title: 延时测试
---

## 注意

此测试时间比较早，部分内容已失效；其中`ultraLowDelay`配置项已经删除；合并写延时改成 0 时(默认为 0)即为最低延时模式；
大家测试延时时，可以使用 webrtc 播放来测试。

## 网络环境

- `localhost`

## 操作系统

- `macOS`

## 服务器

- `MediaServer`,启动参数 `-t 1` ,单线程启动
- 配置文件打开`ultraLowDelay`模式

## 推流器

- `obs` rtmp 推流到 localhost
- `速率控制`：`CBR`
- `比特率`: 2500
- `自定义缓存大小`: 100
- `关键帧将`：2 秒
- `CPU使用预设`: `ultrafast`
- `profile`: `baseline`
- `Tune`: `zerolatency`
- `分辨率`: 1280x720
- `fps`: 30
  ![image](https://user-images.githubusercontent.com/11495632/64311220-daf53f00-cfd5-11e9-8d1f-c39d95c335c4.png)

## 播放器

- 内置 test_player
- localhost 播放 rtsp(udp、tcp 模式都测试)或 rtmp

## 测试方法

- 打开浏览器，打开在线秒表网页 https://miaobiao.51240.com/
- 设置 OBS，截取浏览器秒表部分图像，开始推流给 MediaServer
- 打开 test_player，播放对应的 rtsp 或 rtmp url
- 使用截图工具，定格画面，并对比网页与 test_player 播放器画面在线秒表时间差

## 测试结果

- 播放 rtmp,延时 200ms ~ 400ms
  ![image](https://user-images.githubusercontent.com/11495632/64311009-0af01280-cfd5-11e9-9117-2f520db0b70f.png)
  ![image](https://user-images.githubusercontent.com/11495632/64311040-2b1fd180-cfd5-11e9-8526-675d5d40d746.png)

- 播放 rtsp(tcp 模式),延时 200ms ~ 400ms
  ![image](https://user-images.githubusercontent.com/11495632/64311126-76d27b00-cfd5-11e9-89e4-59e9cb15b8bc.png)
  ![image](https://user-images.githubusercontent.com/11495632/64311161-9b2e5780-cfd5-11e9-96dd-5ab7eecc83ca.png)

- 播放 rtsp(udp 模式),延时 200ms ~ 400ms
  ![image](https://user-images.githubusercontent.com/11495632/64311179-b600cc00-cfd5-11e9-953f-07e73c377df1.png)
  ![image](https://user-images.githubusercontent.com/11495632/64311187-c022ca80-cfd5-11e9-89b4-a015d614706e.png)

## 测试结论

- 在单线程下，播放器和推流器在同一个线程，没有跨线程切换问题，延时稍微稳定并低点
- 开启 TCP_NODELAY 关闭 MSG_MORE 在本轮测试中对优化延时效果不大
- 多次截图平均下来有 300ms 左右的延时，最低 200ms 左右，最高有 400+ms
- 17 年我自己写推流器(很遗憾没保存下 exe 文件)的情况下，最低延时能达到 120ms 左右，目前根本达不到，怀疑 obs 推流延时还是较高
- 推流时建议关闭音频再测试，像 AAC 这种编码格式，编码延时能达到 100ms 以上
- 本次测试都是再 macOS 下测试的，理想情况下，服务器是 linux，推流器 windows，播放器渲染自己做的话延时可能还能更低
- 感兴趣的朋友们可以在 windows 下测试下，17 年我是在局域网中测试的，推流器、服务器、播放器都不是同一台主机，延时尚且低至 120ms，如果 localhost 应该能更低。
