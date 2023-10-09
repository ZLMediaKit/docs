---
title: Starting and Stopping the Server
icon: circle-info
---

## Program Path
After compiling ZLMediaKit, the MediaServer main program is generated. The relative path of the program is `release/${platform}/${build_type}/MediaServer`.

`${platform}` depends on your operating system, which may be `windows/linux/mac`, and `${build_type}` depends on the compile type you specified when using cmake, which could be `Debug/Release`.

## Start-up and Parameters

- First, please refer to the help for startup parameters:
```bash
xzl-mac-pro:Debug xzl$ ./MediaServer -h
  -h  --help     no argument  default:null                                          optional  print this information
  -d  --daemon   no argument  default:null                                          optional  start in Daemon mode or not
  -l  --level    argument     default:0                                             optional  log level, LTrace~LError(0~4)
  -m  --max_day  argument     default:7                                             optional  maximum days to keep the logs
  -c  --config   argument     default:/Users/xzl/git/ZLMediaKit/release/mac/Debug/config.ini  optional  configuration file path
  -s  --ssl      argument     default:/Users/xzl/git/ZLMediaKit/release/mac/Debug/ssl.p12     optional  path of the SSL certificate file or directory, supports p12/pem types
  -t  --threads  argument     default:8                                             optional  number of threads to launch for event triggering
```
- Explanation:
  - -d(--daemon): Whether to start as a daemon. The daemon does only one thing: monitor whether the child process (the actual working process) has exited, and attempts to restart the child process if it has exited.
  - -l(--level): Specifies the log print level, with values ranging from 0 to 4. The higher the level, the fewer logs are printed.
  - -m(--max_day): The number of days the log files are kept. Logs created during the current run of the program will be deleted if they exceed this number of days.
  - -c(--config): Specifies the configuration file path. The configuration file is in ini format, please refer to the default configuration file of ZLMediaKit.
  - -s(--ssl): Specifies the SSL certificate path. The certificate format supports p12 and pem types, which must include both public and private keys, and the private key must not be password encrypted. If a directory is specified, all certificates under the directory will be loaded.
  - -t(--threads): Specifies the number of event-driven threads (performing major tasks) and background working threads (performing blocking tasks).

- Startup command:

![Image](https://user-images.githubusercontent.com/11495632/93867961-579bae00-fcfc-11ea-843a-dcb473957fb7.png)

- Notes:
  - 1. If you need to close the shell after starting MediaServer, you need to enter `exit` to exit the shell, otherwise closing the shell will also close the MediaServer.
  - 2. If you are going to use FFmpeg related functions, you should start the program like this: `nohup ./MediaServer -d &`. Otherwise, the fork FFmpeg process may cause the MediaServer process to hang.

## Hot Loading of Configuration Files
After modifying and saving the configuration file, enter `killall -1 MediaServer` in the shell to make ZLMediaKit hot load the configuration file. If successful, it will print the following style of logs:
![Image](https://user-images.githubusercontent.com/11495632/93873207-e791

2600-fd03-11ea-83f7-00132f917540.png)

## Stopping the Server
- If you started the server in the background, please enter `killall -2 MediaServer` in the shell to gracefully shut down the server (the program will automatically release resources and exit after receiving the SIGINT signal).
- Otherwise, you can press `Ctr + C` to exit the program.
- The logs when MediaServer exits are as follows:

![Image](https://user-images.githubusercontent.com/11495632/93867941-51a5cd00-fcfc-11ea-8ab7-be5914929c90.png)

