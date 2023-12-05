---
title: 服务器的启动与关闭
icon: circle-info
---

## 程序所在路径

在编译 zlmediakit 后，会生成 MediaServer 主程序，该程序相对路径为`release/${platform}/${build_type}/MediaServer`。

`${platform}`根据您的操作系统，可能为`windows/linux/mac`,`${build_type}`根据您 cmake 时指定的编译类型，可能为`Debug/Release`.

## 启动与参数

- 先参考启动参数帮助：

```bash
xzl-mac-pro:Debug xzl$ ./MediaServer -h
  -h  --help     无参  默认:null                                                    选填  打印此信息
  -d  --daemon   无参  默认:null                                                    选填  是否以Daemon方式启动
  -l  --level    有参  默认:0                                                       选填  日志等级,LTrace~LError(0~4)
  -m  --max_day  有参  默认:7                                                       选填  日志最多保存天数
  -c  --config   有参  默认:/Users/xzl/git/ZLMediaKit/release/mac/Debug/config.ini  选填  配置文件路径
  -s  --ssl      有参  默认:/Users/xzl/git/ZLMediaKit/release/mac/Debug/ssl.p12     选填  ssl证书文件或文件夹,支持p12/pem类型
  -t  --threads  有参  默认:8                                                       选填  启动事件触发线程数
```

- 说明：

  - -d(--daemon): 是否以守护进程的方式启动，守护进程只做一件事，就是判断子进程(这个才是干活的进程)是否已经退出，退出后会不断尝试重启子进程。
  - -l(--level): 指定日志打印等级，赋值范围为 0~4，等级越高，日志越少。
  - -m(--max_day): 日志文件保存天数，程序本次运行期间的日志如果超过这个天数，就会被删除。
  - -c(--config): 指定配置文件路径，配置文件为 ini 格式，请参考 ZLMediaKit 的默认配置文件。
  - -s(--ssl): 指定 ssl 证书路径，证书格式支持 p12 和 pem 类型，里面必须包含公钥和私钥，私钥不能有加密密码。如果指定文件夹，会加载文件夹下所有证书。
  - -t(--threads): 指定事件驱动线程(干重活)和后台工作线程(干阻塞的活)个数。

- 启动命令:

![图片](/images/start_server_1.png)

- 注意事项：
  - 1、如果你启动 MediaServer 后需要关闭 shell，那么好需要输入 `exit`退出 shell,否则关闭 shell 会导致 MediaServer 一起被关闭。
  - 2、如果你会使用到 FFmpeg 相关功能，你应该这样启动程序`nohup ./MediaServer -d &`，否则在 fork FFmpeg 进程时会导致 MediaServer 进程挂起。

## 配置文件的热加载

修改并保存配置文件后，在 shell 里面输入`killall -1 MediaServer`就能使 ZLMediaKit 热加载配置文件，如果生效，会打印下面样式的日志：
![图片](/images/start_server_2.png)

## 关闭服务器

- 如果你是后台启动方式，请在 shell 中输入`killall -2 MediaServer`以便优雅关闭服务器(程序收到 SIGINT 信号后会自动释放资源并退出)。
- 否则你可以同时按下`Ctr + C`退出程序。
- MediaServer 退出时日志如下：

![图片](/images/start_server_3.png)
