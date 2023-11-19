---
title: Installing zlmediakit with vcpkg
---

# Introduction
vcpkg is a cross-platform SDK package management tool, similar to yum/apt on Linux and Homebrew on macOS. It supports multiple platforms such as Linux, macOS, and Windows, making it a powerful tool for C/C++ developers to manage dependencies. 
Currently, zlmediakit has been added to vcpkg on August 8, 2023. Users can conveniently install zlmediakit C SDK and MediaServer executable program using vcpkg, resolving various compilation dependency-related issues. The inclusion of zlmediakit in vcpkg has received extensive support from [@JackBoosY](https://github.com/JackBoosY), and we express our sincere gratitude for that!

# Installation Guide
## 1. Install vcpkg

Taking Linux platform as an example:

```bash
# Download vcpkg tool
git clone https://github.com/microsoft/vcpkg
# Start the installation; if prompted with installation failure, please install the dependencies first
./vcpkg/bootstrap-vcpkg.sh
```

> For specific instructions on different platforms, please refer to the [official documentation](https://github.com/microsoft/vcpkg/blob/master/README.md).



## 2. Install zlmediakit

- Install dependencies first

  ```bash
  sudo apt-get install pkg-config
  ```



- Install zlmediakit with default features

  ```bash
  # Default features enabled: [core,mp4,openssl,webrtc]
  ./vcpkg/vcpkg install zlmediakit
  ```



- Install zlmediakit with all features (including webrtc datachannel)

  ```bash
  ./vcpkg/vcpkg install zlmediakit\[core,mp4,openssl,webrtc,sctp\]
  ```



- Install zlmediakit with minimum features

  ```bash
  ./vcpkg/vcpkg install zlmediakit\[core\]
  ```



- Uninstall zlmediakit

  ```bash
  ./vcpkg/vcpkg remove zlmediakit
  ```

- Installation path
![](/images/install_zlmediakit_using_vcpkg_1.png)
> The MediaServer process depends on config.ini, default.pem, www, and other related files, which can be copied from the source code.

## 3. Install different versions

- Check the platforms supported by vcpkg

```bash
./vcpkg/vcpkg help triplet
```



- Example for Linux

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

- Install the dynamic library version of zlmediakit

  ```bash
  # Uninstall zlmediakit first
  ./vcpkg/vcpkg remove zlmediakit
  # Then install the dynamic library version
  ./vcpkg/vcpkg install zlmediakit\[core,mp4,openssl,webrtc,sctp\]:x64-linux-dynamic
  ```
![install_zlmediakit_using_vcpkg_2](/images/install_zlmediakit_using_vcpkg_2.png)


