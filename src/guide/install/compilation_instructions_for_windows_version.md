# Building Instructions for Windows

Below are the instructions for building `ZLMediaKit` on Windows using [scoop](https://github.com/lukesampson/scoop) + [vcpkg](https://github.com/microsoft/vcpkg).

- `scoop`: A package installation manager for Windows command-line.
- `vcpkg`: A C++ library manager initiated by Microsoft, which includes many commonly used open-source libraries.

Since these tools can be used from the command line, they enable convenient automation and integration. We recommend giving them a try.

**Please note that the following steps have only been tested on Windows 10 and may not work on other Windows versions.**

**Unless specified otherwise, all operations should be performed in PowerShell command line.**

## Installing Build Dependencies using scoop and vcpkg

### Download and Install scoop, and use scoop to install dependency tools

The following steps are for installing the dependency tools `cmake` and `ninja` (optional but recommended) using scoop. If you already have them installed, you can skip these steps.

For detailed instructions, please refer to the official scoop documentation. Below are the summarized steps:

1. Set the environment variable `SCOOP` to configure the download and installation directory for `scoop` (including the managed software packages). Run the following command:

   ```sh
   $env:SCOOP = 'C:\work\develop\scoop'
   ```

2. Allow the execution of PowerShell scripts for the current user by running the following command:

   ```sh
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

3. Install `scoop` by running the following command:

   ```sh
   iwr -useb get.scoop.sh | iex
   ```

4. Add the `extras` software repository to `scoop` by running the following command:

   ```sh
   scoop bucket add extras
   ```

5. Install `cmake` and `ninja` by running the following command:

   ```sh
   scoop install cmake ninja
   ```

For convenience, you should set `C:\work\develop\scoop` as the value for the `SCOOP` environment variable and append `C:\work\develop\scoop\shims` to the `PATH` environment variable. You can search for the appropriate method to do this.

### Download and Configure vcpkg, and use vcpkg to install library dependencies

The following steps are for installing the required library dependencies, including `openssl` and `libsrtp`. Other optional dependencies (e.g., `ffmpeg`) should also be installable but have not been tested yet.

For detailed usage of `vcpkg`, please refer to the [official documentation](https://github.com/microsoft/vcpkg).

1. Download `vcpkg`, which includes various configuration scripts and build scripts for open-source libraries. Assume the download path is `C:\work\develop`. Run the following command:

   ```sh
   git clone https://github.com/microsoft/vcpkg
   ```

2. Download the precompiled `vcpkg` package manager by running the following command:

   ```sh
   .\vcpkg\bootstrap-vcpkg.bat -disableMetrics
   ```

3. Build `openssl` by running the following command:

   ```sh
   .\vcpkg\vcpkg.exe install --triplet=x64-windows-static openssl
   ```

4. Build `libsrtp` with `ENABLE_OPENSSL` enabled. Edit `C:\work\develop\vcpkg\ports\libsrtp\portfile.cmake` and modify `vcpkg_configure_cmake` as follows:

   ```cmake
   vcpkg_configure_cmake(
     SOURCE_PATH ${SOURCE_PATH}
     PREFER_NINJA
     OPTIONS
       -DENABLE_OPENSSL:BOOL=ON
   )
   ```

   Then, build `libsrtp` by running the following command:

   ```sh
   .\vcpkg\vcpkg.exe install --triplet=x64-windows-static libsrtp
   ```

## Building

Open the developer command prompt for vs2015/2017/2019 from the Start menu. If you can't find the 64-bit version based on `powershell`, you can use the `cmd` version first, and then switch to `powershell` by running the `powershell` command.

1. Build ZLMediaKit by running the following PowerShell commands:

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

To compile a 64-bit program and link `openssl`, you also need to link `Crypt32.lib` and `ws2_32.lib`. Normally, when executing `cmake .. @CMAKE_OPTIONS`, you should see similar output like this:

```
found library:C:/work/develop/vcpkg/installed/x64-windows-static/lib/libssl.lib;C:/work/develop/vcpkg/installed/x64-windows-static/lib/libcrypto.lib;Crypt32.lib;ws2_32.lib,ENABLE_OPENSSL defined
```

If `Crypt32.lib` and `ws2_32.lib` are not present, you can manually modify the `CMakeLists.txt` file to resolve the issue (search for `OPENSSL_LIBRARIES` to find the corresponding location).

```cmake
list(APPEND LINK_LIB_LIST ${OPENSSL_LIBRARIES} Crypt32.lib ws2_32.lib)
```
