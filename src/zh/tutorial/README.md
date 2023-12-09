---
title: 快速开始
icon: lightbulb
---

本教程将指导您完成编译和运行 ZLMediaKit。

<!-- more -->

## 构建环境

::: tip 新手提示

如果你是位新手，强烈建议使用 Ubuntu16 以上版本编译 ZLMediaKit，macOS 是次选推荐平台。不推荐使用 CentOS6.x 或 windows 构建与使用。

:::

::: info vcpkg

ZLMediaKit 已上架 vcpkg，便捷安装请参考 [vcpkg 安装 ZLMediaKit](../guide/install/install_zlmediakit_using_vcpkg.md)。

:::

### 支持 C++11 的编译器

ZLMediaKit 采用了 C++11 的语法和库，要求编译器支持完整的 C++11 标准：

- Linux: gcc >= 4.8 (4.7 应该也能支持)
- macOS: Clang >= ??? (我也不知道，估计大部分不会遇到这个问题)
- Windows: Visual Studio >= 2015 (vs2013 某些版本也能编译通过，如果怕麻烦建议直接 vs2017)

::: tabs#env

@tab Debian 系 (包括 Ubuntu)

```sh
sudo apt install build-essential
```

@tab CentOS7+

```sh
sudo yum -y install gcc
sudo yum -y install gcc-c++
```

@tab CentOS 6.x

需要手动切换到高版本 gcc。

```bash
sudo yum install centos-release-scl -y
sudo yum install devtoolset-4-toolchain -y
# 切换到高版本 gcc
scl enable devtoolset-4 bash
```

@tab macOS

[安装最新的 Xcode](https://developer.apple.com/cn/xcode/)。

@tab Windows

[安装最新的 Visual Studio Community](https://visualstudio.microsoft.com/zh-hans/vs/community/) 并**勾选 C++ 开发环境**。

:::

### CMake

ZLMediaKit 采用 CMake 来构建项目，所以编译需要 CMake。

::: tabs#env

@tab Debian 系 (包括 Ubuntu)

```sh
sudo apt install cmake
```

@tab CentOS7+

```sh
sudo yum -y install cmake
```

@tab CentOS 6.x

需要手动切换到高版本 CMake。

```bash
wget https://github.com/Kitware/CMake/releases/download/v3.17.0-rc3/cmake-3.17.0-rc3.tar.gz
tar -xvf cmake-3.17.0-rc3.tar.gz
cd cmake-3.17.0-rc3
./configure
make -j4
sudo make install
```

@tab macOS

```sh
brew install cmake
```

@tab Windows

- 若使用 vs2017+，vs 已包含 cmake，你只需在安装时勾选。

- 否则你需要 [下载并安装 cmake-gui](https://github.com/Kitware/CMake/releases/download/)。

:::

## 获取代码

使用 Git 克隆 ZLMediaKit 的代码并初始化子模块：

```sh
# 国内用户推荐从 Gitee 下载
git clone --depth 1 https://gitee.com/xia-chu/ZLMediaKit
cd ZLMediaKit
# 初始化子模块 （必须执行）
git submodule update --init
```

::: warning

不能通过下载 zip 包的方式下载源码。因为 ZLMediaKit 依赖于第三方代码并通过 Git 子模块的方式管理。

:::

### 安装依赖库

ZLMediaKit 依赖一些可选的第三方库。构建时，CMake 将在 path 中查找这些库，并根据检测情况决定是否开启相关特性。

- openssl

  你需要在编译前安装 openssl 库以使用相关功能。

  - flash player 播放 rtmp
  - https/rtsps/webrtc 相关功能。

- ffmpeg

  ZLMediaKit 可以通过 fork ffmpeg 进程的方式实现多种协议的拉流，编译时不需要安装 FFmpeg。

- sdl、avcodec、avutil

  这 3 个库供 ZLMediaKit 的 test_player 测试程序使用，你通常不需要安装这 3 个库。

::: tabs#env

@tab Debian 系 (包括 Ubuntu)

除了 openssl，其他都是可选的:

```sh
sudo apt install libssl-dev
sudo apt install libsdl-dev
sudo apt install libavcodec-dev
sudo apt install libavutil-dev
sudo apt install ffmpeg
```

@tab CentOS7+

```sh
sudo yum install libssl-dev
sudo yum install libsdl-dev
sudo yum install libavcodec-dev
sudo yum install libavutil-dev
sudo yum install ffmpeg
```

@tab CentOS 6.x

请 [参考此博文](https://blog.51cto.com/mengix/2452395)。

@tab macOS

```sh
sudo brew install libssl-dev
sudo brew install libsdl-dev
sudo brew install libavcodec-dev
sudo brew install libavutil-dev
sudo brew install ffmpeg
```

@tab Windows

[下载并安装 openssl](https://slproweb.com/products/Win32OpenSSL.html)。

:::

## 构建与编译 ZLMediaKit

::: info webrtc

由于功能复杂，默认情况下不开启编译 webrtc，可参考 [编译与使用 webrtc](../guide/protocol/webrtc/webrtc_compilation_and_use.md)

:::

::: tabs#env

@tab Linux

```sh
cd ZLMediaKit
mkdir build
cd build
cmake ..
make -j4
```

@tab macOS

```sh
cd ZLMediaKit
mkdir build
cd build
# 将 DOPENSSL_ROOT_DIR 指向你的 openssl 路径
cmake .. -DOPENSSL_ROOT_DIR=/usr/local/Cellar/openssl/1.0.2j/
make -j4
```

@tab Windows

- 若使用 vs2017+，可直接在菜单栏中通过 `文件` -> `打开` -> `文件夹` -> `选择 ZLMediaKit 代码根目录并打开` 打开项目文件夹。

  ![image](/images/vs_code_zh.png)

- 否则，你应该:

  1. 使用 cmake-gui 打开工程并生成 vs 工程文件。
  2. 找到工程文件 (ZLMediaKit.sln) 并用使用 Visual Studio 打开。
  3. 选择编译 Release 版本。
  4. 找到目标文件并运行测试用例。

有关 Windows 编译可参考 [Windows 编译说明](../guide/install/compilation_instructions_for_windows_version.md)

@tab Android

在 Android Studio 中打开 Android 目录。

@tab iOS

可参考 [此博文](https://www.jianshu.com/p/44c21296add5) 生成 XCode 工程然后编译 c api 的静态库:

```sh
cd ZLMediaKit
mkdir -p build
cd build
# 生成 XCode 工程，工程文件在 build 目录下
cmake .. -G Xcode -DCMAKE_TOOLCHAIN_FILE=../cmake/ios.toolchain.cmake  -DPLATFORM=OS64COMBINED
```

:::

## 运行 ZLMediaKit

ZLMediaKit 工程主要生成 3 种二进制目标文件，他们的生成的路径在 release 目录下。

### MediaServer 进程

这是 ZLMediaKit 作为服务器的主进程，该进程可以在免去开发的情况下直接作为测试流媒体服务器使用。

如果你需要更复杂的业务逻辑，可以通过 [Web HOOK](../guide/media_server/web_hook_api.md)和 [RESTful API](../guide/media_server/restful_api.md)实现。你可以通过 [配置文件](../guide/media_server/config_file.md) 控制其参数。

::: tabs#env

@tab Linux

```sh
cd ZLMediaKit/release/linux/Debug
# 通过 -h 可以了解启动参数
./MediaServer -h
# 以守护进程模式启动
./MediaServer -d &
```

@tab macOS

```sh
cd ZLMediaKit/release/mac/Debug
# 通过 -h 可以了解启动参数
./MediaServer -h
# 以守护进程模式启动
./MediaServer -d &
```

@tab Windows

```sh
cd ZLMediaKit/release/windows/Debug
# 通过 -h 可以了解启动参数
./MediaServer.exe -h
# 以守护进程模式启动
./MediaServer.exe -d &
```

:::

### C 接口的 SDK

ZLMediaKit 同时提供 C 接口的 SDK 库。

头文件位于 `ZLMediaKit/api/include`，有详细的注释，一般足够二次开发使用。

库文件为:

::: tabs#env

@tab Linux

```sh
ZLMediaKit/release/linux/Debug/libmk_api.so
```

@tab macOS

```sh
ZLMediaKit/release/linux/mac/libmk_api.dylib
```

@tab Windows

```sh
ZLMediaKit/release/windows/Debug/mk_api.dll
ZLMediaKit/release/windows/Debug/mk_api.lib
```

:::

### 以 `test_` 开头的测试程序

相关代码在 `ZLMediaKit/tests` 目录下，你可以对照代码启动测试进程。

## 推流测试

请参考 [推流播放测试](../guide/media_server/push_test.md)。
