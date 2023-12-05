---
title: vcpkg方式安装zlmediakit
---

# 简介

vcpkg 是一个跨平台的 sdk 包管理工具，类似于 linux 下的 yum/apt，macOS 下的 homebrew；它同时支持 linux/macOS/windows 等多个平台，是 c/c++开发者解决依赖的利器。
目前 zlmediakit 已经于 2023-08-08 完成 vcpkg 平台的上线，用户可以通过 vcpkg 便捷安装 zlmediakit c sdk 以及 MediaServer 可执行程序，解决各种编译依赖相关的苦恼。
zlmediakit 上架 vcpkg 得到了[@JackBoosY](https://github.com/JackBoosY)大量的支持，在此表示由衷的感谢！

# 安装指导

## 1、安装 vcpkg

以 linux 平台为例：

```bash
# 下载vcpkg工具
git clone https://github.com/microsoft/vcpkg
# 开始安装;如果提示安装失败,请先安装依赖
./vcpkg/bootstrap-vcpkg.sh
```

> 不同平台具体参考[官方文档](https://github.com/microsoft/vcpkg/blob/master/README_zh_CN.md)

## 2、安装 zlmediakit

- 先安装依赖

  ```bash
  sudo apt-get install pkg-config
  ```

- 默认方式安装 zlmediakit

  ```bash
  # 默认开启特性: [core,mp4,openssl,webrtc]
  ./vcpkg/vcpkg install zlmediakit
  ```

- 安装全部特性 zlmediakit(包括 webrtc datachannel)

  ```bash
  ./vcpkg/vcpkg install zlmediakit\[core,mp4,openssl,webrtc,sctp\]
  ```

- 最小安装 zlmediakit

  ```bash
  ./vcpkg/vcpkg install zlmediakit\[core\]
  ```

- 卸载 zlmediakit

  ```bash
  ./vcpkg/vcpkg remove zlmediakit
  ```

- 安装路径
  ![](/images/install_zlmediakit_using_vcpkg_1.png)
  > MediaServer 进程依赖的 config.ini, default.pem, www 等相关文件可以从源码拷贝过来

## 3、安装不同版本

- 查看 vcpkg 支持哪些平台

```bash
./vcpkg/vcpkg help triplet
```

- 以 linux 为例

  ```bash
  ./vcpkg/vcpkg help triplet | grep linux
    x64-linux
    x86-linux
    ppc64le-linux
    x64-linux-release
    loongarch32-linux
    loongarch64-linux
    arm-linux
    loongarch32-linux-release
    s390x-linux
    riscv64-linux
    x64-linux-dynamic
    riscv64-linux-release
    arm-linux-release
    ppc64le-linux-release
    riscv32-linux
    arm64-linux
    arm64-linux-release
    loongarch64-linux-release
    s390x-linux-release
    riscv32-linux-release
  ```

- 安装动态库版本 zlmediakit

  ```bash
  # 先卸载zlmediakit
  ./vcpkg/vcpkg remove zlmediakit
  # 然后安装动态库版本
  ./vcpkg/vcpkg install zlmediakit\[core,mp4,openssl,webrtc,sctp\]:x64-linux-dynamic
  ```

  ![install_zlmediakit_using_vcpkg_2](/images/install_zlmediakit_using_vcpkg_2.png)
