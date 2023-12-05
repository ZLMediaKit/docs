---
title: Compiling and Using WebRTC
---

## Environment

```shell
machine
centos 7.6
gcc version 5.4.0 (GCC)
cmake version 3.20.5
```

## Dependency Preparation

- Install OpenSSL (version 1.1 or above)

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

- Install libsrtp

  Click [here](https://codeload.github.com/cisco/libsrtp/tar.gz/refs/tags/v2.3.0) to download and install.

  ```shell
  $ tar -xvzf libsrtp-2.3.0.tar.gz
  $ cd libsrtp-2.3.0
  $ ./configure --enable-openssl --with-openssl-dir=/usr/local/openssl
  $ make -j8 && make install
  ```

  For some newer compilation environments (such as GCC 10+), there may be issues when compiling libsrtp-2.3.0. You can consider switching to version 2.5.0 as follows:

  ```sh
  $ wget https://github.com/cisco/libsrtp/archive/refs/tags/v2.5.0.tar.gz
  $ tar -xvzf libsrtp-2.5.0.tar.gz
  $ cd libsrtp-2.5.0
  ```

## Compilation

- Download ZLMediaKit source code

  ```shell
  # Chinese users are recommended to download from the mirror site gitee
  git clone --depth 1 https://gitee.com/xia-chu/ZLMediaKit
  cd ZLMediaKit
  # Do not forget to execute this command
  git submodule update --init
  ```

- Compilation

  ```shell
  $ mkdir build
  $ cd build
  $ cmake .. -DENABLE_WEBRTC=true  -DOPENSSL_ROOT_DIR=/usr/local/openssl  -DOPENSSL_LIBRARIES=/usr/local/openssl/lib
  $ cmake --build . --target MediaServer

  # final result
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

## Modify Configuration File

Since WebRTC protocol requires informing the player of the server's IP address, if the IP address is not visible to the player, WebRTC communication will fail. Please modify the `rtc.externIP` configuration item in the configuration file to the visible IP address of the player. If this configuration item is not set, zlmediakit will retrieve the IP address of the network card (usually an internal IP address), which will prevent cross-domain NAT usage of WebRTC.

```ini
[rtc]
# Timeout for RTC streaming and playback
timeoutSec=15
# IP address visible to RTC clients on this machine, generally a public IP address when acting as a server, leave it blank to automatically retrieve the IP address of the network card
externIP=
# UDP server listening port for RTC, all RTC clients will transmit stun/dtls/srtp/srtcp data through this port,
# This port is multithreaded and supports connection migration caused by client network switching
# Note that if the server is behind NAT and requires port mapping, the external mapped port must be consistent with this port
port=8000
# Set remb bitrate, closing twcc and enabling remb when non-zero. This setting is effective during RTC streaming and can control the streaming quality
rembBitRate=1000000
```

## Testing

The latest zlmediakit source code comes with a valid SSL certificate `default.pem`, corresponding to the domain name `default.zlmediakit.com`, which resolves to the IP address `127.0.0.1`. To start testing, open [https://default.zlmediakit.com/webrtc/](https://default.zlmediakit.com/webrtc/) in your browser. Please start streaming first before testing playback. If WebRTC playback is not working, please refer to this [issue](https://github.com/ZLMediaKit/ZLMediaKit/issues/1277).

## Troubleshooting

- Error message: `gmake[3]: *** No rule to make target `/usr/lib64/libssl.so', needed by `../release/linux/Debug/MediaServer'.  Stop.`

  ```sh
  cd /usr/local/openssl/lib
  cp -r ./* /usr/lib64/
  ```

- Compilation on Ubuntu
  You can refer to this [blog post](https://blog.csdn.net/haysonzeng/article/details/116754065) written by a skilled user.

- Compilation on Windows

  You can refer to this [blog post](https://blog.csdn.net/byna11sina11/article/details/119786889) written by a skilled user.

  Also, refer to [this comment](https://github.com/ZLMediaKit/ZLMediaKit/issues/1081#issuecomment-910141630).

## Q&A(Playback Issues) ?

- OBS streaming and RTC playback stuttering?

  WebRTC H.264 does not support B-frames, so B-frames need to be removed when using FFmpeg. You can add the `-bf 0` parameter or specify the H.264 profile as baseline.

- RTSP streaming, unsuccessful RTC playback?

  Set `directProxy` in the zlm configuration file to 0 for RTSP streaming.

- WebRTC video or audio not playing?

  WebRTC in the web client supports encoding formats such as H.264, opus/48000/2, pcma/8000, pcmu/8000. Check if the encoding format is correct. Usually, the audio is not supported, and you need to use the transcode branch for transcoding (video does not require transcoding).
