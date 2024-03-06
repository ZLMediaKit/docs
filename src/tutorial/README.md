---
title: Tutorial
icon: lightbulb
---

This tutorial will guide you compiling and running ZLMediaKit.

<!-- more -->

## Build Environment

::: tip Beginner Notice

If you're a beginner, we highly recommend compiling ZLMediaKit using Ubuntu16 or later versions. macOS is the second recommended platform. We don't recommend using CentOS6.x or Windows.

:::

::: info vcpkg

ZLMediaKit has been launched on vcpkg, please refer to [install zlmediakit using vcpkg](../guide/install/install_zlmediakit_using_vcpkg.md) for convenient installation.

:::

### Compiler Supporting C++11

ZLMediaKit uses C++11 syntax and libraries, hence, it's required that your compiler fully supports the C++11 standard. This means:

- On Linux, gcc version >= 4.8 (4.7 should also be supported)
- On macOS, clang >= ??? (it's uncertain, but most likely won't encounter any issues)
- On Windows, Visual Studio >= 2015 (some versions of VS2013 can also compile, but for a smoother experience, VS2017 is recommended)

::: tabs#env

@tab Debian-based (including Ubuntu)

```sh
sudo apt install build-essential
```

@tab CentOS7+

```sh
sudo yum -y install gcc
sudo yum -y install gcc-c++
```

@tab CentOS 6.x

You need to manually switch to a higher version of gcc.

```bash
sudo yum install centos-release-scl -y
sudo yum install devtoolset-4-toolchain -y
# Switch to a higher version gcc
scl enable devtoolset-4 bash
```

@tab macOS

[Install the latest Xcode](https://developer.apple.com/xcode/).

@tab Windows

[Install latest Visual Studio Community](https://visualstudio.microsoft.com/vs/community/) and **click C++ env**.

:::

### CMake

ZLMediaKit uses CMake to build the project, so you need CMake to compile.

::: tabs#env

@tab Debian-based (including Ubuntu)

```sh
sudo apt install cmake
```

@tab CentOS7+

```sh
sudo yum -y install cmake
```

@tab CentOS 6.x

You need to manually switch to a higher version of CMake.

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

- If using vs2017+, vs already includes cmake, you just need to tick it during installation.
- Otherwise, you need to [download and install cmake-gui](https://github.com/Kitware/CMake/releases/download/)

:::

## Obtain Source Code

Use git to clone the ZLMediaKit source code and its submodules:

```bash
git clone --depth 1 https://github.com/ZLMediaKit/ZLMediaKit
cd ZLMediaKit
# Init submodules (Required)
git submodule update --init
```

::: warning

Do NOT download the source code with zip directly from GitHub. ZLMediaKit is relaying on multiple third-party project codes and manages them with git submodules.

:::

### 3rd party Dependencies

ZLMediaKit depends on some optional third-party libraries. During the building of ZLMediaKit, cmake can search for these libraries in the system path and enable relevant features based on their installation status.

- openssl

  You need to install the openssl library before compiling to use related features.

  - Playing rtmp with flash player
  - https/rtsps/webrtc related features

- ffmpeg

  ZLMediaKit can support multiple protocols for pulling streams by forking ffmpeg as a subprocess. FFmpeg does not need to be installed during compilation.

- sdl, avcodec, avutil

  These three libraries are used by the test_player test program of ZLMediaKit. You usually do not need to install these three libraries.

::: tabs#env

@tab Debian-based (including Ubuntu)

Except openssl, others are optional:

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

Refer to [blog post](https://blog.51cto.com/mengix/2452395)。

@tab macOS

```sh
sudo brew install libssl-dev
sudo brew install libsdl-dev
sudo brew install libavcodec-dev
sudo brew install libavutil-dev
sudo brew install ffmpeg
```

@tab Windows

[Install and download openssl](https://slproweb.com/products/Win32OpenSSL.html)。

:::

## Building and Compiling ZLMediaKit

::: info webrtc

由于功能复杂，默认情况下不开启编译 webrtc，可参考 [编译与使用 webrtc](../guide/protocol/webrtc/webrtc_compilation_and_use.md)

Because of complex, the webrtc compilation is not enabled by default. Please refer to [compilation and usage of webrtc](../guide/protocol/webrtc/webrtc_compilation_and_use.md).

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
# Point DOPENSSL_ROOT_DIR to your openssl path
cmake .. -DOPENSSL_ROOT_DIR=/usr/local/Cellar/openssl/1.0.2j/
make -j4
```

@tab Windows

- If you are using VS2017 or above, you can directly open the project folder from the VS navbar with `File` -> `Open` -> `Folder` -> `Select ZLMediaKit code root directory and open`.

  ![image](/images/vs_code_zh.png)

- Otherwise, you should:

  1. Use cmake-gui to open the project and generate the vs project file.
  2. Find the project file (ZLMediaKit.sln) and double-click it to open with vs2017.
  3. Choose to compile the Release version.
  4. Locate the target file and run the test case.

For further details, refer to [Windows compilation](../guide/install/compilation_instructions_for_windows_version.md).

@tab Android

Open the Android directory in Android Studio.

@tab iOS

Generate XCode project and then compile the C API static library.

```sh
cd ZLMediaKit
mkdir -p build
cd build
# Generate the Xcode project, the project file is in the build directory
cmake .. -G Xcode -DCMAKE_TOOLCHAIN_FILE=../cmake/ios.toolchain.cmake  -DPLATFORM=OS64COMBINED
```

:::

## Run ZLMediaKit

The ZLMediaKit project mainly generates three types of binary target files, which are located in release directory.

### MediaServer Process

This is the main process of ZLMediaKit as a server. This process can be used directly as a streaming media server for testing without any development.

If you need more complex business logic, you can implement it through [Web HOOK](../guide/media_server/web_hook_api.md) and [RESTful API](../guide/media_server/restful_api.md). At the same time, you can control its parameters through the [configuration file](../guide/media_server/config_file.md).

::: tabs#env

@tab Linux

```sh
cd ZLMediaKit/release/linux/Debug
# Learn startup parameters with -h
./MediaServer -h
# Start in daemon mode
./MediaServer -d &
```

@tab macOS

```sh
cd ZLMediaKit/release/mac/Debug
# Learn startup parameters with -h
./MediaServer -h
# Start in daemon mode
./MediaServer -d &
```

@tab Windows

```sh
cd ZLMediaKit/release/windows/Debug
# Learn startup parameters with -h
./MediaServer -h
# Start in daemon mode
./MediaServer -d &
```

:::

### C API SDK

ZLMediaKit also provides a C language-based API SDK library for further development.

The header file is located at `ZLMediaKit/api/include` with detailed comments, could be generally sufficient for further development.

Lib files:

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

### Test programs starting with `test_`

Related codes are under `ZLMediaKit/tests` directory, and you can start the test process by reading codes.

## Stream Testing

Please refer to [Stream Test](../guide/media_server/push_test.md).
