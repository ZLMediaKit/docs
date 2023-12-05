---
title: 代码依赖与版权声明
icon: code
---

## 一、zlmediakit 依赖的库列表

|       依赖组件       |   协议类型   |                                              备注                                               |                                    项目地址                                    |
| :------------------: | :----------: | :---------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------: |
|      ZLToolKit       |     MIT      |                            强依赖，ZLToolKit 也部分依赖某些开源代码                             |                    https://github.com/ZLMediaKit/ZLToolKit                     |
| ireader/media-server |     MIT      |         默认依赖，编译时指定 ENABLE_HLS,ENABLE_MP4,ENABLE_RTPPROXY 为关闭时可以去除依赖         |                    https://github.com/ireader/media-server                     |
|       jsoncpp        |     MIT      |                                        MediaServer 依赖                                         |                 https://github.com/open-source-parsers/jsoncpp                 |
|       openssl        |  Apache-2.0  | 开启 ssl 和 webrtc 相关功能时依赖，编译时指定 ENABLE_OPENSSL,ENABLE_WEBRTC 为关闭时可以去除依赖 |                       https://github.com/openssl/openssl                       |
|         srtp         |    类 MIT    |            开启 webrtc 相关功能时依赖，编译时指定 ENABLE_WEBRTC 为关闭时可以去除依赖            |                        https://github.com/cisco/libsrtp                        |
|       usrsctp        | BSD-3-Clause |       开启 webrtc datachannel 相关功能时依赖，编译时指定 ENABLE_SCTP 为关闭时可以去除依赖       |                       https://github.com/sctplab/usrsctp                       |
|      mediasoup       |     ISC      |         部分 webrtc 源码提取自 mediasoup，编译时指定 ENABLE_WEBRTC 为关闭时可以去除依赖         |                     https://github.com/versatica/mediasoup                     |
|        ffmpeg        |   GPL/LGPL   |      转码分支与 mk_api 有轻微依赖，编译时指定 ENABLE_FFMPEG 为关闭时可以去除依赖，默认关闭      |                        https://github.com/FFmpeg/FFmpeg                        |
|        wepoll        |    类 MIT    |                       Windows 下编译 ENABLE_WPOLL 为开始时依赖，默认关闭                        |                     https://github.com/piscisaureus/wepoll                     |
|      SPSParser       |              |           sps/pps 相关解析代码，来自朋友，经过修改，应该最开始提取自 ffmpeg，版权存疑           | https://github.com/ZLMediaKit/ZLMediaKit/blob/master/src/Extension/SPSParser.h |

## 二、其他依赖

- 开启编译 test_player 测试程序时依赖 sdl。
- 开启 x264/faac 相关功能时依赖 libx264 与 libfacc，默认关闭。
- 开启 jemalloc 时依赖 jemalloc，默认关闭。
- 开始 mysql 连接池功能时依赖 libmysql-clinet，默认关闭。

## 三、ZLToolkit 相关依赖

- [getopt](https://github.com/ZLMediaKit/ZLToolKit/tree/master/src/win32) windows 下命令行解析工具，其他平台不依赖。
- [uv_errno](https://github.com/ZLMediaKit/ZLToolKit/blob/master/src/Util/uv_errno.h) 部分错误处理代码来自 libuv。
- [strptime_win](https://github.com/ZLMediaKit/ZLToolKit/blob/master/src/Util/strptime_win.cpp) windows 下 strptime 移植函数代码，来源网络，出处已不可考。
- [mini](https://github.com/ZLMediaKit/ZLToolKit/blob/master/src/Util/mini.h) 来源于[github](https://github.com/r-lyeh-archived/mINI),经过整理和修改。

- [function_traits](https://github.com/ZLMediaKit/ZLToolKit/blob/master/src/Util/function_traits.h)来源自网络，应该出自祁宇。
- [base64](https://github.com/ZLMediaKit/ZLToolKit/blob/master/src/Util/base64.h) 来源自网络，经过修改，应该出自 ffmpeg。
- [SHA1](https://github.com/ZLMediaKit/ZLToolKit/blob/master/src/Util/SHA1.h) 整理自[GitHub](https://github.com/vog/sha1)
- [MD5](https://github.com/ZLMediaKit/ZLToolKit/blob/master/src/Util/MD5.h) 整理自 GitHub,已无法找到原始出处。
