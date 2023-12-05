---
title: 快速开始
icon: lightbulb
description: 本教程将指导您完成编译和运行ZLMediaKit.
---

## 1、获取代码

**请不要使用 github 下载 zip 包的方式下载源码**，务必使用 git 克隆 ZLMediaKit 的代码，因为 ZLMediaKit 依赖于第三方代码，zip 包不会下载第三方依赖源码，你可以这样操作：

```bash
#国内用户推荐从同步镜像网站gitee下载
git clone --depth 1 https://gitee.com/xia-chu/ZLMediaKit
cd ZLMediaKit
#千万不要忘记执行这句命令
git submodule update --init
```

## 2、强烈推荐

如果你是位新手，强烈建议使用 ubuntu16 或更新版本编译 ZLMediaKit，macOS 是次选推荐平台，最不推荐的是 centos6.\*或 windows 平台。

zlmediakit 已上架 vcpkg，便捷安装请参考[vcpkg 安装 zlmediakit](../guide/install/install_zlmediakit_using_vcpkg.md)

## 3、编译器

### 3.1、编译器版本要求

ZLMediaKit 采用了 C++11 的语法和库，要求编译器支持完整的 C++11 标准，亦即：

- linux 上要求 gcc 版本 >= 4.8(4.7 应该也能支持)
- macOS 上 clang >= ???（我也不知道，估计大部分不会遇到这个问题）
- windows 上 visual stuido >= 2015(vs2013 某些版本也能编译通过，如果怕麻烦建议直接 vs2017)

### 3.2、安装编译器

- 如果你是 debian 系操作系统(包括 ubuntu 系用户)，一般自带的 gcc 版本够新，你可以这样安装 gcc 编译器：

  ```bash
  sudo apt-get install build-essential
  ```

- 如果你是 centos7 或以上用户，你可以这样安装 gcc 编译器：

  ```cpp
  sudo yum -y install gcc
  sudo yum -y install gcc-c++
  ```

- 如果你是 centos6.\*用户，你可以这样安装 gcc 编译器：

  ```bash
  sudo yum install centos-release-scl -y
  sudo yum install devtoolset-4-toolchain -y
  #切换到高版本gcc
  scl enable devtoolset-4 bash
  ```

- 如果你是 macOS 用户，你直接安装 xcode 即可。

- 如果你是 windows 用户，推荐安装 vs2017 或以上。

## 4、cmake

ZLMediaKit 采用 cmake 来构建项目，通过 cmake 才能生成 Makefile(或 Xcode/VS 工程)，所以必须先安装 cmake 才能完成后续步骤。

- 如果你是 debian 系操作系统(包括 ubuntu 系用户)，一般自带的 cmake 版本够新，你可以这样安装 cmake

  ```bash
  sudo apt-get install cmake
  ```

- 如果你是 centos7 或以上用户，你也许可以这样安装 cmake:

  ```cpp
  sudo yum -y install cmake
  ```

- 如果你是 centos6.\*用户，那么你需要下载新版本的 cmake 源码然后编译安装 cmake

  ```bash
  wget https://github.com/Kitware/CMake/releases/download/v3.17.0-rc3/cmake-3.17.0-rc3.tar.gz
  tar -xvf cmake-3.17.0-rc3.tar.gz
  cd cmake-3.17.0-rc3
  ./configure
  make -j4
  sudo make install
  ```

- 如果你是 macOS 用户，你可以这样安装 cmake:

  ```bash
  brew install cmake
  ```

- 如果你是 windows 用户，并且 vs 版本为 2017 及以上，你不用单独安装 cmake，否则你需要安装 cmake-gui:

  ```bash
  #安装win64版本cmake
  https://github.com/Kitware/CMake/releases/download/v3.17.0-rc3/cmake-3.17.0-rc3-win64-x64.zip

  #安装win32版本cmake
  https://github.com/Kitware/CMake/releases/download/v3.17.0-rc3/cmake-3.17.0-rc3-win32-x86.zip
  ```

## 5、依赖库

### 5.1、依赖库列表

ZLMediaKit 可选依赖一些第三方库，这些库都不是必选的；在构建 ZLMediaKit 时，cmake 能查找系统路径中的这些库，并根据安装情况选择是否开启相关特性，你可以选择安装这些依赖并启用相关特性：

- openssl

  - flash player 在播放 rtmp 时，采用的是复杂握手模式，如果不安装该库，flash player 将播放不了 zlmediakit 提供的 rtmp url.

  - 同时 ZLMediaKit 的 https/rtsps/webrtc 相关功能需要使用 openssl 才能开启。

- ffmpeg

  zlmediakit 可以通过 fork ffmpeg 进程的方式实现多种协议的拉流，编译时不需要安装 FFmpeg。

- sdl、avcodec、avutil

  这 3 个库供 ZLMediaKit 的 test_player 测试程序使用，你通常不需要安装这 3 个库。

### 5.2、安装依赖库

- Debian 系（包括 ubuntu）系统下安装依赖的方法：

  ```sh
  #除了openssl,其他其实都可以不安装
  sudo apt-get install libssl-dev
  sudo apt-get install libsdl-dev
  sudo apt-get install libavcodec-dev
  sudo apt-get install libavutil-dev
  sudo apt-get install ffmpeg
  ```

- centos6.\*的用户可以参考该[文章](https://blog.51cto.com/mengix/2452395)

- macOS/centos 下安装依赖库：

  基本安装方式跟 Debian 系安装差不多，安装命令分别改成 brew / yum 即可。但是有些库名字与 Debian 系不太一样，请自行查找相关资料。

- windows 下安装依赖库

  - 安装 openssl

    请从[网站](http://slproweb.com/products/Win32OpenSSL.html)中下载。

## 6、构建和编译项目

由于开启 webrtc 相关功能比较复杂，默认是不开启编译的，如果你对 zlmediakit 的 webrtc 功能比较感兴趣，可以参考[这里](../guide/protocol/webrtc/webrtc_compilation_and_use.md)

- 在 linux 或 macOS 系统下,你应该这样操作：

  ```bash
  cd ZLMediaKit
  mkdir build
  cd build
  #macOS下可能需要这样指定openss路径：cmake .. -DOPENSSL_ROOT_DIR=/usr/local/Cellar/openssl/1.0.2j/
  cmake ..
  make -j4
  ```

- 在 windows 系统下

  - 如果你是 vs2017 或以上，可以在 vs 菜单栏中直接打开项目文件夹：

    ```bash
    [文件] -> [打开] -> [文件夹] -> [选择ZLMediaKit代码根目录并打开]
    ```

  ![image](/images/vs_code_zh.png)

  - 如果你是 vs2017 以下版本，你需要使用 cmake-gui 生成 vs 工程然后编译：

    ```sh
    1 进入ZLMediaKit目录执行 git submodule update --init 以下载ZLToolKit的代码
    2 使用cmake-gui打开工程并生成vs工程文件.
    3 找到工程文件(ZLMediaKit.sln),双击用vs2017打开.
    4 选择编译Release 版本.
    5 找到目标文件并运行测试用例.
    ```

  - 同时，Windows 编译也可以参考[这里](../guide/install/compilation_instructions_for_windows_version.md)

- 如果你要编译 Android 版本，你可以自己在 Android Studio 中打开 Android 目录。

- 如果你要编译 ios 版本，可以生成 xcode 工程然后编译 c api 的静态库;另外，你可以参考此[文档](https://www.jianshu.com/p/44c21296add5)

  ```sh
  cd ZLMediaKit
  mkdir -p build
  cd build
  # 生成Xcode工程，工程文件在build目录下
  cmake .. -G Xcode -DCMAKE_TOOLCHAIN_FILE=../cmake/ios.toolchain.cmake  -DPLATFORM=OS64COMBINED
  ```

## 7、运行

ZLMediaKit 工程主要生成 3 种二进制目标文件，他们的生成的路径在 release 目录下，这些目标文件主要分为：

- MediaServer 进程

  这是 ZLMediaKit 作为服务器的主进程，该进程可以在免去开发的情况下直接作为测试流媒体服务器使用，如果你需要更复杂的业务逻辑，可以通过[Web HOOK](../guide/media_server/web_hook_api.
  md)和[RESTful API](../guide/media_server/restful_api.md)实现,同时你可以通过[配置文件](../guide/media_server/config_file.md)控制其参数。

  - 在 linux 下启动：

    ```sh
    cd ZLMediaKit/release/linux/Debug
    #通过-h可以了解启动参数
    ./MediaServer -h
    #以守护进程模式启动
    ./MediaServer -d &
    ```

  - 在 macos 下启动：

    目标文件目录在 ZLMediaKit/mac/Debug,其他操作完全一致。

  - 在 window 下启动：

    ```sh
    1 进入ZLMediaKit/release/windows/Debug目录
    2 双击MediaServer启动
    3 你也可以在cmd或powershell中启动，通过MediaServer -h了解启动参数
    ```

- c api 的 SDK

  ZLMediaKit 也提供 c 的 api 二次开发 sdk 库，头文件在`ZLMediaKit/api/include`,库文件为：

  - linux 下：

    ```sh
    ZLMediaKit/release/linux/Debug/libmk_api.so
    ```

  - macOS 下:

    ```sh
    ZLMediaKit/release/linux/mac/libmk_api.dylib
    ```

  - windows 下:

    ```sh
    ZLMediaKit/release/windows/Debug/mk_api.dll
    ZLMediaKit/release/windows/Debug/mk_api.lib
    ```

    SDK 头文件有详细的注释，一般足够二次开发使用。

- 以`test_`开头的测试程序

  相关代码在`ZLMediaKit/tests`目录下，你可以对照代码启动测试进程。

## 8、测试

请参考[此文章](../guide/media_server/push_test.md)完成推流播放测试
