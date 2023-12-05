---
title: Tutorial
icon: lightbulb
description: This tutorial will guide you through the process of compiling and running ZLMediaKit.
---

## 1. Obtain the Source Code

**Please refrain from downloading the source code in zip package format directly from GitHub**. Instead, you should clone the ZLMediaKit code using git. This is due to ZLMediaKit's reliance on multiple third-party project codes which are not included in the zip package. Follow these steps to do this:

```bash
# It's recommended for users in China to download from the synchronized mirror site, gitee
git clone --depth 1 https://gitee.com/xia-chu/ZLMediaKit
cd ZLMediaKit
# Remember to execute this command
git submodule update --init
```

## 2. Strongly Recommended

If you're a beginner, we highly recommend compiling ZLMediaKit using Ubuntu16 or later versions. macOS is the second recommended platform. The least recommended platforms are CentOS6.\* and Windows.

zlmediakit has been launched on vcpkg, please refer to [install zlmediakit using vcpkg](../guide/install/install_zlmediakit_using_vcpkg.md) for convenient installation.

## 3. Compiler

### 3.1. Compiler Version Requirements

ZLMediaKit utilizes C++11 syntax and libraries, hence, it's required that your compiler fully supports the C++11 standard. This means:

- On Linux, gcc version >= 4.8 (4.7 should also be supported)
- On macOS, clang >= ??? (it's uncertain, but most likely won't encounter any issues)
- On Windows, Visual Studio >= 2015 (some versions of VS2013 can also compile, but for a smoother experience, VS2017 is recommended)

### 3.2. Installing the Compiler

- If you're using a Debian-based operating system (including Ubuntu), the built-in gcc version is usually recent enough. Here's how to install the gcc compiler:

  ```bash
  sudo apt-get install build-essential
  ```

- If you're a CentOS7 or above user, here's how to install the gcc compiler:

  ```cpp
  sudo yum -y install gcc
  sudo yum -y install gcc-c++
  ```

- If you're a CentOS6.\* user, you can install the gcc compiler this way:

  ```bash
  sudo yum install centos-release-scl -y
  sudo yum install devtoolset-4-toolchain -y
  # Switch to a higher version gcc
  scl enable devtoolset-4 bash
  ```

- If you're a macOS user, you can install Xcode directly.

- If you're a Windows user, it's recommended to install VS2017 or later versions.

## 4. CMake

ZLMediaKit uses CMake to build the project. CMake is needed to generate Makefile (or Xcode/VS project), so you must install CMake to complete the subsequent steps.

- If you're using a Debian-based operating system (including Ubuntu), the built-in cmake version is usually recent enough. Here's how to install cmake:

  ```bash
  sudo apt-get install cmake
  ```

- If you're a CentOS7 or above user, you might be able to install cmake this way:

  ```cpp
  sudo yum -y install cmake
  ```

- If you're a CentOS6.\* user, then you need to download the new version of cmake source code and then compile and install cmake:

  ```bash
  wget https://github.com/Kitware/CMake/releases/download/v3.17.0-rc3/cmake-3.17.0-rc3.tar.gz
  tar -xvf cmake-3.17.0-rc3.tar.gz
  cd cmake-3.17.0-rc3
  ./configure
  make -j4
  sudo make install
  ```

- If you're a macOS user, here's how you can install cmake:

  ```bash
  brew install cmake
  ```

- If you're a Windows user and your Visual Studio version is 2017 or later, you don't need to install cmake separately. Otherwise, you need to install cmake-gui:

  ```bash
  # Install win64 version of cmake
  https://github.com/Kitware/CMake/releases/download/v3.17.0-rc3/cmake-3.17.0-rc3-win64-x64.zip

  # Install win32 version of cmake
  https://github.com/Kitware/CMake/releases/download/v3.17.0-rc3/cmake-3.17.0-rc3-win32-x86.zip
  ```

## 5. Dependencies

### 5.1 Dependency List

Most of the third-party libraries that ZLMediaKit depends on are optional. During the building of ZLMediaKit, cmake can search for these libraries in the system path and enable relevant features based on their installation status. You may choose to install these dependencies to activate associated features:

- openssl

  - Flash player uses complex handshake mode when playing rtmp, and if this library is not installed, flash player will not be able to play rtmp url provided by zlmediakit.

  - At the same time, features such as https/rtsps/webrtc of ZLMediaKit also require openssl to be activated.

- ffmpeg

  - ZLMediaKit can support multiple protocols for pulling streams by forking ffmpeg as a subprocess. FFmpeg does not need to be installed during compilation.

- sdl, avcodec, avutil

  - These three libraries are used by the test_player test program of ZLMediaKit. You usually do not need to install these three libraries.

### 5.2 Installing Dependencies

- On Debian systems (including Ubuntu), use the following commands to install dependencies:

  ```sh
  # Everything but openssl is optional
  sudo apt-get install libssl-dev
  sudo apt-get install libsdl-dev
  sudo apt-get install libavcodec-dev
  sudo apt-get install libavutil-dev
  sudo apt-get install ffmpeg
  ```

- Users of centos6.\* can refer to this [article](https://blog.51cto.com/mengix/2452395).

- To install dependencies on macOS/CentOS:

  The basic installation is similar to Debian. Replace the installation commands with brew/yum. However, some library names may be different from Debian, please search for relevant information.

- To install dependencies on Windows:

  - Installing openssl

    Please download from this [website](http://slproweb.com/products/Win32OpenSSL.html).

## 6. Building and Compiling the Project

The activation of webrtc related features is complex and is not enabled for compilation by default. If you are
interested in the webrtc feature of zlmediakit, you can refer to [here](../guide/protocol/webrtc/webrtc_compilation_and_use.md).

- On Linux or macOS systems, you should operate as follows:

  ```bash
  cd ZLMediaKit
  mkdir build
  cd build
  # You may need to specify the openssl path on macOS as follows: cmake .. -DOPENSSL_ROOT_DIR=/usr/local/Cellar/openssl/1.0.2j/
  cmake ..
  make -j4
  ```

- On Windows system:

  - If you are using VS2017 or above, you can directly open the project folder from the VS menu bar:

    ```bash
    [File] -> [Open] -> [Folder] -> [Select ZLMediaKit code root directory and open]
    ```

    ![image](/images/vs_code_zh.png)

  - If you are using VS2017 or earlier, you need to use cmake-gui to generate the VS project and then compile:

    1 Enter the ZLMediaKit directory and execute git submodule update --init to download the code of ZLToolKit
    2 Use cmake-gui to open the project and generate the vs project file.
    3 Locate the project file (ZLMediaKit.sln), double-click to open with vs2017.
    4 Choose to compile the Release version.
    5 Locate the target file and run the test case.

  - Also, you can refer to [here](../guide/install/compilation_instructions_for_windows_version.md) for Windows compilation.

- If you want to compile the Android version, you can open the Android directory in Android Studio.

- If you want to compile the iOS version, you can generate the Xcode project and then compile the C API static library. In addition, you can refer to this [document](https://www.jianshu.com/p/44c21296add5).

  ```sh
  cd ZLMediaKit
  mkdir -p build
  cd build
  # Generate the Xcode project, the project file is in the build directory
  cmake .. -G Xcode -DCMAKE_TOOLCHAIN_FILE=../cmake/ios.toolchain.cmake  -DPLATFORM=OS64COMBINED
  ```

## 7. Execution

The ZLMediaKit project mainly generates three types of binary target files, which are generated in the release directory. These target files mainly include:

- MediaServer Process

  This is the main process of ZLMediaKit as a server. This process can be used directly as a streaming media server for testing without any development. If you need more complex business logic, you can implement it through [Web HOOK](../guide/media_server/web_hook_api.md) and [RESTful API](../guide/media_server/restful_api.md). At the same time, you can control its parameters through the [configuration file](../guide/media_server/config_file.md).

  - Start on Linux:

    ```sh
    cd ZLMediaKit/release/linux/Debug
    # You can learn about the startup parameters with -h
    ./MediaServer -h
    # Start in daemon mode
    ./MediaServer -d &
    ```

  - Start on macOS:

    The target file directory is in ZLMediaKit/mac/Debug, and all other operations are the same.

  - Start on Windows:

    ```sh
    1 Go to the ZLMediaKit/release/windows/Debug directory
    2 Double-click MediaServer to start
    3 You can also start in cmd or powershell, and learn about startup parameters through MediaServer -h
    ```

- C API SDK

  ZLMediaKit also provides a C language-based API for secondary development of the SDK library. The header file is in `ZLMediaKit/api/include`. The library files are:

  - On Linux:

    ```sh
    ZLMediaKit/release/linux/Debug/libmk_api.so
    ```

  - On macOS:

    ```sh
    ZLMediaKit/release/linux/mac/libmk_api.dylib
    ```

  - On Windows:

    ```sh
    ZLMediaKit/release/windows/Debug/mk_api.dll
    ZLMediaKit/release/windows/Debug/mk_api.lib
    ```

  The SDK header file has detailed comments, which are generally sufficient for secondary development.

- Test programs starting with `test_`

  The related code is in the `ZLMediaKit/tests` directory, and you can refer to the code to start the test process.

## 8. Testing

Please refer to [this article](../guide/media_server/push_test.md) to complete the stream push and play test.
