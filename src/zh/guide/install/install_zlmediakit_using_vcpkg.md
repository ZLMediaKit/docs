---
title: vcpkg方式安装zlmediakit
---

# 简介
vcpkg是一个跨平台的sdk包管理工具，类似于linux下的yum/apt，macOS下的homebrew；它同时支持linux/macOS/windows等多个平台，是c/c++开发者解决依赖的利器。
目前zlmediakit已经于2023-08-08完成vcpkg平台的上线，用户可以通过vcpkg便捷安装zlmediakit c sdk以及MediaServer可执行程序，解决各种编译依赖相关的苦恼。
zlmediakit上架vcpkg得到了[@JackBoosY](https://github.com/JackBoosY)大量的支持，在此表示由衷的感谢！


# 安装指导
## 1、安装vcpkg

以linux平台为例：

```bash
# 下载vcpkg工具
git clone https://github.com/microsoft/vcpkg
# 开始安装;如果提示安装失败,请先安装依赖
./vcpkg/bootstrap-vcpkg.sh
```

> 不同平台具体参考[官方文档](https://github.com/microsoft/vcpkg/blob/master/README_zh_CN.md)



## 2、安装zlmediakit

- 先安装依赖

  ```bash
  sudo apt-get install pkg-config
  ```



- 默认方式安装zlmediakit

  ```bash
  # 默认开启特性: [core,mp4,openssl,webrtc]
  ./vcpkg/vcpkg install zlmediakit
  ```



- 安装全部特性zlmediakit(包括webrtc datachannel)

  ```bash
  ./vcpkg/vcpkg install zlmediakit\[core,mp4,openssl,webrtc,sctp\]
  ```



- 最小安装zlmediakit

  ```bash
  ./vcpkg/vcpkg install zlmediakit\[core\]
  ```



- 卸载zlmediakit

  ```bash
  ./vcpkg/vcpkg remove zlmediakit
  ```

- 安装路径
<img width="639" alt="图片" src="https://github.com/ZLMediaKit/ZLMediaKit/assets/11495632/5474953e-e8b4-4424-bd87-b998a5d11a47">

> MediaServer进程依赖的config.ini, default.pem, www等相关文件可以从源码拷贝过来

## 3、安装不同版本

- 查看vcpkg支持哪些平台

```bash
./vcpkg/vcpkg help triplet
```



- 以linux为例

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

- 安装动态库版本zlmediakit

  ```bash
  # 先卸载zlmediakit
  ./vcpkg/vcpkg remove zlmediakit
  # 然后安装动态库版本
  ./vcpkg/vcpkg install zlmediakit\[core,mp4,openssl,webrtc,sctp\]:x64-linux-dynamic
  ```

<img width="687" alt="图片" src="https://github.com/ZLMediaKit/ZLMediaKit/assets/11495632/9301cef0-c84b-49ea-b173-99149e91a5bb">

