---
title: webrtc编译与使用
---

## 环境

```shell
编译机器：
centos 7.6
gcc version 5.4.0 (GCC)
cmake version 3.20.5
```

## 依赖准备

- openssl 安装 (openssl 版本要求 1.1 以上)

  ```shell
  $ wget https://www.openssl.org/source/openssl-1.1.1k.tar.gz
  $ tar -xvzf openssl-1.1.1k.tar.gz
  $ yum install -y zlib zlib-devel perl-CPAN
  $ ./config shared --openssldir=/usr/local/openssl --prefix=/usr/local/openssl
  $ make && make install
  $ echo "/usr/local/lib64/" >> /etc/ld.so.conf
  $ echo "/usr/local/openssl/lib" >> /etc/ld.so.conf
  $ ldconfig
  $ ln -s /usr/local/openssl/bin/openssl  /usr/local/bin/openssl # 替换系统openssl，非必须
  $ openssl version -a
  ```

- libsrtp 安装

  点击[这里](https://codeload.github.com/cisco/libsrtp/tar.gz/refs/tags/v2.3.0)下载安装

  ```shell
  $ tar -xvzf libsrtp-2.3.0.tar.gz
  $ cd libsrtp-2.3.0
  $ ./configure --enable-openssl --with-openssl-dir=/usr/local/openssl
  $ make -j8 && make install
  ```

  对于一些比较新的编译环境（如 GCC 10+），编译 libsrtp-2.3.0 可能会存在问题，可以考虑切换到 2.5.0 版本，即

  ```sh
  $ wget https://github.com/cisco/libsrtp/archive/refs/tags/v2.5.0.tar.gz
  $ tar -xvzf libsrtp-2.5.0.tar.gz
  $ cd libsrtp-2.5.0
  ```

## 编译

- 下载 zlm 源码

  ```shell
  #国内用户推荐从同步镜像网站gitee下载
  git clone --depth 1 https://gitee.com/xia-chu/ZLMediaKit
  cd ZLMediaKit
  #千万不要忘记执行这句命令
  git submodule update --init
  ```

- 编译

  ```shell
  $ mkdir build
  $ cd build
  $ cmake .. -DENABLE_WEBRTC=true  -DOPENSSL_ROOT_DIR=/usr/local/openssl  -DOPENSSL_LIBRARIES=/usr/local/openssl/lib
  $ cmake --build . --target MediaServer

  # 最终输出
  [ 96%] Built target test_rtcp_fci
  [ 96%] Building CXX object tests/CMakeFiles/test_rtp.dir/test_rtp.cpp.o
  [ 97%] Linking CXX executable ../../release/linux/Debug/test_rtp
  [ 97%] Built target test_rtp
  [ 97%] Building CXX object tests/CMakeFiles/test_wsServer.dir/test_wsServer.cpp.o
  [ 97%] Linking CXX executable ../../release/linux/Debug/test_wsServer
  [ 97%] Built target test_wsServer
  [ 97%] Building CXX object tests/CMakeFiles/test_server.dir/test_server.cpp.o
  [ 97%] Linking CXX executable ../../release/linux/Debug/test_server
  [ 97%] Built target test_server
  [ 98%] Built target jsoncpp
  [ 98%] Linking CXX executable ../../release/linux/Debug/MediaServer
  [100%] Built target MediaServer
  ```

## 修改配置文件

由于 webrtc 协议需要告知播放器服务器所在 ip，如果该 ip 对播放器不可见，会导致 webrtc 无法联通。请修改配置文件中`rtc.externIP`为播放器可见 ip，如果不设置该配置项，zlmediakit 将获取网卡 ip(一般是内网 ip)，那么将无法跨域 nat 使用 webrtc。

```ini
[rtc]
#rtc播放推流、播放超时时间
timeoutSec=15
#本机对rtc客户端的可见ip，作为服务器时一般为公网ip，置空时，会自动获取网卡ip
externIP=
#rtc udp服务器监听端口号，所有rtc客户端将通过该端口传输stun/dtls/srtp/srtcp数据，
#该端口是多线程的，同时支持客户端网络切换导致的连接迁移
#需要注意的是，如果服务器在nat内，需要做端口映射时，必须确保外网映射端口跟该端口一致
port=8000
#设置remb比特率，非0时关闭twcc并开启remb。该设置在rtc推流时有效，可以控制推流画质
rembBitRate=1000000
```

## 测试

最新的 zlmediakit 源码自带有效的 ssl 证书`default.pem`,对应的域名是`default.zlmediakit.com`,该域名解析到的 ip 为`127.0.0.1`,用户在浏览器中打开 [https://default.zlmediakit.com/webrtc/](https://default.zlmediakit.com/webrtc/)即可开始测试。请先推流后，再测试播放。如果 webrtc 无法播放，
请参考此[issue](https://github.com/ZLMediaKit/ZLMediaKit/issues/1277)

## 问题解决

- 提示 `gmake[3]: *** No rule to make target `/usr/lib64/libssl.so', needed by `../release/linux/Debug/MediaServer'.  Stop.`

  ```sh
  cd /usr/local/openssl/lib
  cp -r ./* /usr/lib64/
  ```

- ubuntu 编译

  可以参考网友大神自制[这里](https://blog.csdn.net/haysonzeng/article/details/116754065)

- windows 编译

  可以参考网友大神自制[这里](https://blog.csdn.net/byna11sina11/article/details/119786889)

  还有[这里](https://github.com/ZLMediaKit/ZLMediaKit/issues/1081#issuecomment-910141630)

## Q And A(播放问题) ?

- obs 推流 rtc 播放一卡一卡？

  web 的 rtc h264 不支持 B 帧，需要去掉 B 帧, 使用 FFmpeg 时需要添加`-bf 0`参数，或者指定 h264 profile 为 baseline

- rtsp 推流，rtc 播放不成功？

  rtsp 推流需要把 zlm 的配置文件中的 directProxy 设置为 0

- webrtc 视频或者音频播放不出来？

  web 客户端的 rtc 支持 h264,opus/48000/2,pcma/8000,pcmu/8000 等编码格式，检查一下编码格式是否正确，一般都是音频不支持，需要使用 transcode 分支来转码（视频不会转码）
