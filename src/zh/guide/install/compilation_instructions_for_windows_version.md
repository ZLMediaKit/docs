---
title: Windows 版编译说明
---
# 基于 scoop + vcpkg 的 Windows 版编译说明

以下为基于 [scoop](https://github.com/lukesampson/scoop) + [vcpkg](https://github.com/microsoft/vcpkg) 编译 `ZLMediaKit` 的一种方式.

* `scoop`: Windows 命令行下使用的软件包安装管理工具;
* `vcpkg`: 微软发起的 C++ 库管理器, 其中有大量常用开源库;

由于可以在命令行下使用, 可以非常方便的进行自动化集成. 推荐大家试用.

**以下步骤仅在 Windows 10 下测试, 未使用其他 Windows 版本进行测试, 不保证其他 Windows 版本的可用性.**

**以下所有操作如无特殊说明均需在 PowerShell 命令行下进行.**

## 基于 scoop 及 vcpkg 安装编译依赖

### 下载安装 scoop 并使用 scoop 安装依赖工具

以下是为了安装依赖工具 `cmake` 和 `ninja`(可选, 但建议安装), 如已安装, 可跳过.

具体可参考其官网说明, 以下仅列出相关简要步骤.

1. 设置环境变量 `SCOOP`, 用于配置 `scoop` 的下载安装目录(包括其管理的软件包):
   ```
   $env:SCOOP = 'C:\work\develop\scoop'
   ```
1. 为当前用户设置允许执行 `powershell` 脚本:
   ```
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
1. 安装 `scoop`:
   ```
   iwr -useb get.scoop.sh | iex
   ```
1. 为 `scoop` 添加 `extras` 软件仓库:
   ```
   scoop bucket add extras
   ```
1. 安装 `cmake` 及 `ninja`:
   ```
   scoop install cmake ninja
   ```

为方便后续使用, 需将 `C:\work\develop\scoop` 设置到环境变量 `SCOOP` 中, 将 `C:\work\develop\scoop\shims` 追加到环境变量 `PATH` 中, 方法可自行查询.

### 下载配置 vcpkg 并使用 vcpkg 安装依赖库

以下是为了安装相关依赖库, 具体包括: `openssl` 以及 `libsrtp`, 其他可选依赖(如: `ffmpeg`)也应可安装, 暂未测试.

`vcpkg` 具体使用可参考[官方说明](https://github.com/microsoft/vcpkg), [官方说明中文版](https://github.com/microsoft/vcpkg/blob/master/README_zh_CN.md).

1. 下载 `vcpkg`, 其中包括各种配置脚本以及开源库的编译脚本, 下载路径假设为: `C:\work\develop`, 执行:
   ```
   git clone https://github.com/microsoft/vcpkg
   ```
1. 下载预编译的 `vcpkg` 包管理工具:
   ```
   .\vcpkg\bootstrap-vcpkg.bat -disableMetrics
   ```
1. 编译 `openssl`:
   ```
   .\vcpkg\vcpkg.exe install --triplet=x64-windows-static openssl
   ```
1. 编译 `libsrtp`, 需要 `ENABLE_OPENSSL`, 可编辑 `C:\work\develop\vcpkg\ports\libsrtp\portfile.cmake`, 修改 `vcpkg_configure_cmake` 为如下:
   ```
   vcpkg_configure_cmake(
     SOURCE_PATH ${SOURCE_PATH}
     PREFER_NINJA
     OPTIONS
       -DENABLE_OPENSSL:BOOL=ON
   )
   ```
   然后进行编译:
   ```
   .\vcpkg\vcpkg.exe install --triplet=x64-windows-static libsrtp
   ```

## 编译

从开始菜单中打开 vs2015/2017/2019 的开发者命令行模式, 默认未找到基于 `powershell` 的 x64 位版本, 可先使用 `cmd` 版本, 然后执行 `powershell` 切换到 `powershell`.

1. 编译 ZLMediaKit
   ```powershell
   mkdir build
   cd build
   $VCPKG_CMAKE = 'C:\work\develop\vcpkg\scripts\buildsystems\vcpkg.cmake'
   $VCPKG_INSTALL_PATH = 'C:\work\develop\vcpkg\installed\x64-windows-static'

   $CMAKE_OPTIONS = @(
       "-GCodeBlocks - Ninja"
       "-DCMAKE_BUILD_TYPE:STRING=RelWithDebInfo"
       "-DCMAKE_C_COMPILER:STRING=cl.exe"
       "-DCMAKE_CXX_COMPILER:STRING=cl.exe"
       "-DCMAKE_TOOLCHAIN_FILE:FILEPATH=$VCPKG_CMAKE"
       "-DCMAKE_PREFIX_PATH:FILEPATH=$VCPKG_INSTALL_PATH"
       "-DVCPKG_TARGET_TRIPLET:STRING=x86-windows-static"
       "-DENABLE_WEBRTC:BOOL=ON"
   )
   cmake .. @CMAKE_OPTIONS
   cmake --build . --target all
   ```

编译 64 位程序在链接 `openssl` 时还需要链接 `Crypt32.lib` 和 `ws2_32.lib`, 正常在执行 `cmake .. @CMAKE_OPTIONS` 时有类似输出:
```
found library:C:/work/develop/vcpkg/installed/x64-windows-static/lib/libssl.lib;C:/work/develop/vcpkg/installed/x64-windows-static/lib/libcrypto.lib;Crypt32.lib;ws2_32.lib,ENABLE_OPENSSL defined
```

如果没有 `Crypt32.lib;ws2_32.lib`, 可手动修改 `CMakeLists.txt` 进行解决(可搜索 `OPENSSL_LIBRARIES` 找到对应位置).
```cmake
list(APPEND LINK_LIB_LIST ${OPENSSL_LIBRARIES} Crypt32.lib ws2_32.lib)
```
