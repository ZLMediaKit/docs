---
title: RESTful 接口
---

## 下载 postman 配置文件(可以在线测试 restful api)

[postman 配置文件](https://github.com/xia-chu/ZLMediaKit/tree/master/postman)

由于接口更新频繁，在观看本文档的同时，请大家再使用 postman 核对测试接口，同时本文档可能有些接口有遗漏，你也可以参考[代码](https://github.com/xia-chu/ZLMediaKit/blob/master/server/WebApi.cpp#L261)

## API 预览

MediaServer 是 ZLMediaKit 的主进程，目前支持以下 http api 接口，这些接口全部支持 GET/POST 方式，

```ini
      "/index/api/addFFmpegSource",
      "/index/api/addStreamProxy",
      "/index/api/close_stream",
      "/index/api/close_streams",
      "/index/api/delFFmpegSource",
      "/index/api/delStreamProxy",
      "/index/api/getAllSession",
      "/index/api/getApiList",
      "/index/api/getMediaList",
      "/index/api/getServerConfig",
      "/index/api/getThreadsLoad",
      "/index/api/getWorkThreadsLoad",
      "/index/api/kick_session",
      "/index/api/kick_sessions",
      "/index/api/restartServer",
      "/index/api/setServerConfig",
      "/index/api/isMediaOnline",
      "/index/api/getMediaInfo",
      "/index/api/getRtpInfo",
      "/index/api/getMp4RecordFile",
      "/index/api/startRecord",
      "/index/api/stopRecord",
      "/index/api/getRecordStatus",
      "/index/api/getSnap",
      "/index/api/openRtpServer",
      "/index/api/closeRtpServer",
      "/index/api/listRtpServer",
      "/index/api/startSendRtp",
      "/index/api/stopSendRtp",
      "/index/api/getStatistic",
      "/index/api/addStreamPusherProxy",
      "/index/api/delStreamPusherProxy",
      "/index/api/version",
      "/index/api/getMediaPlayerList"
```

其中 POST 方式，参数既可以使用 urlencoded 方式也可以使用 json 方式。
操作这些 api 一般需要提供 secret 参数以便鉴权，如果操作 ip 是 127.0.0.1，那么可以无需鉴权。

## API 返回结果约定

- HTTP 层面统一返回 200 状态码，body 统一为 json。
- body 一般为以下样式：

```json
{
  "code": -1,
  "msg": "失败提示"
}
```

- code 值代表执行结果，目前包含以下类型：

```cpp
typedef enum {
    Exception = -400,//代码抛异常
    InvalidArgs = -300,//参数不合法
    SqlFailed = -200,//sql执行失败
    AuthFailed = -100,//鉴权失败
    OtherFailed = -1,//业务代码执行失败，
    Success = 0//执行成功
} ApiErr;
```

- 如果执行成功，那么`code == 0`,并且一般无`msg`字段。

- `code == -1`时代表业务代码执行不成功，更细的原因一般提供`result`字段，例如以下：

```json
{
    "code" : -1, # 代表业务代码执行失败
    "msg" : "can not find the stream", # 失败提示
    "result" : -2 # 业务代码执行失败具体原因
}
```

- 开发者一般只要关注`code`字段和`msg`字段，如果`code != 0`时，打印显示`msg`字段即可。

- `code == 0`时代表完全成功，如果有数据返回，一般提供`data`字段返回数据。

## API 详解

### 0、`/index/api/getApiList`

- 功能：获取 API 列表

- 范例：[http://127.0.0.1/index/api/getApiList](http://127.0.0.1/index/api/getApiList)

- 参数：无

- 响应：

  ```json
  {
    "code": 0,
    "data": [
      "/index/",
      "/index/api/addFFmpegSource",
      "/index/api/addStreamProxy",
      "/index/api/addStreamPusherProxy",
      "/index/api/closeRtpServer",
      "/index/api/close_stream",
      "/index/api/delFFmpegSource",
      "/index/api/delStreamProxy",
      "/index/api/delStreamPusherProxy",
      "/index/api/downloadBin",
      "/index/api/getAllSession",
      "/index/api/getApiList",
      "/index/api/getMediaInfo",
      "/index/api/getMediaList",
      "/index/api/getMp4RecordFile",
      "/index/api/getRtpInfo",
      "/index/api/getServerConfig",
      "/index/api/getSnap",
      "/index/api/getStatistic",
      "/index/api/getThreadsLoad",
      "/index/api/getWorkThreadsLoad",
      "/index/api/isMediaOnline",
      "/index/api/isRecording",
      "/index/api/kick_session",
      "/index/api/kick_sessions",
      "/index/api/listRtpServer",
      "/index/api/openRtpServer",
      "/index/api/pauseRtpCheck",
      "/index/api/restartServer",
      "/index/api/resumeRtpCheck",
      "/index/api/setServerConfig",
      "/index/api/startRecord",
      "/index/api/startSendRtp",
      "/index/api/stopRecord",
      "/index/api/stopSendRtp",
      "/index/api/version",
      "/index/api/webrtc",
      "/index/hook/on_flow_report",
      "/index/hook/on_http_access",
      "/index/hook/on_play",
      "/index/hook/on_publish",
      "/index/hook/on_record_hls",
      "/index/hook/on_record_mp4",
      "/index/hook/on_rtsp_auth",
      "/index/hook/on_rtsp_realm",
      "/index/hook/on_server_started",
      "/index/hook/on_shell_login",
      "/index/hook/on_stream_changed",
      "/index/hook/on_stream_none_reader",
      "/index/hook/on_stream_not_found",
      "/index/hook/on_stream_not_found_ffmpeg"
    ]
  }
  ```

### 1、`/index/api/getThreadsLoad`

- 功能：获取各 epoll(或 select)线程负载以及延时

- 范例：[http://127.0.0.1/index/api/getThreadsLoad](http://127.0.0.1/index/api/getThreadsLoad)

- 参数：无

- 响应:

  ```json
  {
     "code" : 0,
     "data" : [
        {
           "delay" : 0, # 该线程延时
           "load" : 0 # 该线程负载，0 ~ 100
        },
        {
           "delay" : 0,
           "load" : 0
        }
     ]
  }
  ```

### 2、`/index/api/getWorkThreadsLoad`

- 功能：获取各后台 epoll(或 select)线程负载以及延时

- 范例：[http://127.0.0.1/index/api/getWorkThreadsLoad](http://127.0.0.1/index/api/getWorkThreadsLoad)

- 参数：无

- 响应:

  ```json
  {
     "code" : 0,
     "data" : [
        {
           "delay" : 0, # 该线程延时
           "load" : 0 # 该线程负载，0 ~ 100
        },
        {
           "delay" : 0,
           "load" : 0
        }
     ]
  }
  ```

### 3、`/index/api/getServerConfig`

- 功能：获取服务器配置

- 范例：[http://127.0.0.1/index/api/getServerConfig](http://127.0.0.1/index/api/getServerConfig)

- 参数：

  |  参数  | 是否必选 |            释意            |
  | :----: | :------: | :------------------------: |
  | secret |    Y     | api 操作密钥(配置文件配置) |

- 响应：

  ```json
  {
    "code": 0,
    "data": [
      {
        "api.apiDebug": "1",
        "api.secret": "035c73f7-bb6b-4889-a715-d9eb2d1925cc",
        "ffmpeg.bin": "/usr/local/bin/ffmpeg",
        "ffmpeg.cmd": "%s -i %s -c:a aac -strict -2 -ar 44100 -ab 48k -c:v libx264 -f flv %s",
        "ffmpeg.log": "/Users/xzl/git/ZLMediaKit/cmake-build-debug/bin/ffmpeg/ffmpeg.log",
        "general.enableVhost": "1",
        "general.flowThreshold": "1024",
        "general.maxStreamWaitMS": "5000",
        "general.streamNoneReaderDelayMS": "5000",
        "hls.fileBufSize": "65536",
        "hls.filePath": "/Users/xzl/git/ZLMediaKit/cmake-build-debug/bin/httpRoot",
        "hls.segDur": "3",
        "hls.segNum": "3",
        "hook.access_file_except_hls": "1",
        "hook.admin_params": "secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc",
        "hook.enable": "1",
        "hook.on_flow_report": "https://127.0.0.1/index/hook/on_flow_report",
        "hook.on_http_access": "https://127.0.0.1/index/hook/on_http_access",
        "hook.on_play": "https://127.0.0.1/index/hook/on_play",
        "hook.on_publish": "https://127.0.0.1/index/hook/on_publish",
        "hook.on_record_mp4": "https://127.0.0.1/index/hook/on_record_mp4",
        "hook.on_rtsp_auth": "https://127.0.0.1/index/hook/on_rtsp_auth",
        "hook.on_rtsp_realm": "https://127.0.0.1/index/hook/on_rtsp_realm",
        "hook.on_shell_login": "https://127.0.0.1/index/hook/on_shell_login",
        "hook.on_stream_changed": "https://127.0.0.1/index/hook/on_stream_changed",
        "hook.on_stream_none_reader": "https://127.0.0.1/index/hook/on_stream_none_reader",
        "hook.on_stream_not_found": "https://127.0.0.1/index/hook/on_stream_not_found",
        "hook.timeoutSec": "10",
        "http.charSet": "utf-8",
        "http.keepAliveSecond": "100",
        "http.maxReqCount": "100",
        "http.maxReqSize": "4096",
        "http.notFound": "<html><head><title>404 Not Found</title></head><body bgcolor=\"white\"><center><h1>您访问的资源不存在！</h1></center><hr><center>ZLMediaKit-4.0</center></body></html>",
        "http.port": "80",
        "http.rootPath": "/Users/xzl/git/ZLMediaKit/cmake-build-debug/bin/httpRoot",
        "http.sendBufSize": "65536",
        "http.sslport": "443",
        "multicast.addrMax": "239.255.255.255",
        "multicast.addrMin": "239.0.0.0",
        "multicast.udpTTL": "64",
        "record.appName": "record",
        "record.filePath": "/Users/xzl/git/ZLMediaKit/cmake-build-debug/bin/httpRoot",
        "record.fileSecond": "3600",
        "record.sampleMS": "100",
        "rtmp.handshakeSecond": "15",
        "rtmp.keepAliveSecond": "15",
        "rtmp.modifyStamp": "1",
        "rtmp.port": "1935",
        "rtp.audioMtuSize": "600",
        "rtp.clearCount": "10",
        "rtp.cycleMS": "46800000",
        "rtp.maxRtpCount": "50",
        "rtp.videoMtuSize": "1400",
        "rtsp.authBasic": "0",
        "rtsp.handshakeSecond": "15",
        "rtsp.keepAliveSecond": "15",
        "rtsp.port": "554",
        "rtsp.sslport": "322",
        "shell.maxReqSize": "1024",
        "shell.port": "9000"
      }
    ]
  }
  ```

### 4、`/index/api/setServerConfig`

- 功能：设置服务器配置

- 范例：[http://127.0.0.1/index/api/setServerConfig?api.apiDebug=0(例如关闭 http api 调试)](http://127.0.0.1/index/api/setServerConfig?api.apiDebug=0)

- 参数：

  |  参数  | 是否必选 |            释意            |
  | :----: | :------: | :------------------------: |
  | secret |    Y     | api 操作密钥(配置文件配置) |

- 响应：

  ```json
  {
     "changed" : 0, # 配置项变更个数
     "code" : 0     # 0代表成功
  }
  ```

### 5、`/index/api/restartServer`

- 功能：重启服务器,只有 Daemon 方式才能重启，否则是直接关闭！

- 范例：[http://127.0.0.1/index/api/restartServer](http://127.0.0.1/index/api/restartServer)

- 参数：

  |  参数  | 是否必选 |            释意            |
  | :----: | :------: | :------------------------: |
  | secret |    Y     | api 操作密钥(配置文件配置) |

- 响应：

  ```json
  {
    "code": 0,
    "msg": "服务器将在一秒后自动重启"
  }
  ```

### 6、`/index/api/getMediaList`

- 功能：获取流列表，可选筛选参数

- 范例：[http://127.0.0.1/index/api/getMediaList](http://127.0.0.1/index/api/getMediaList)

- 参数：

  |  参数  | 是否必选 |                 释意                 |
  | :----: | :------: | :----------------------------------: |
  | secret |    Y     |      api 操作密钥(配置文件配置)      |
  | schema |    N     |     筛选协议，例如 rtsp 或 rtmp      |
  | vhost  |    N     | 筛选虚拟主机，例如`__defaultVhost__` |
  |  app   |    N     |        筛选应用名，例如 live         |
  | stream |    N     |         筛选流 id，例如 test         |

- 响应：

  ```json
  {
    "code" : 0,
    "data" : [
    {
       "app" : "live",  # 应用名
       "readerCount" : 0, # 本协议观看人数
       "totalReaderCount" : 0, # 观看总人数，包括hls/rtsp/rtmp/http-flv/ws-flv
       "schema" : "rtsp", # 协议
       "stream" : "obs", # 流id
       "originSock": {  # 客户端和服务器网络信息，可能为null类型
              "identifier": "140241931428384",
              "local_ip": "127.0.0.1",
              "local_port": 1935,
              "peer_ip": "127.0.0.1",
              "peer_port": 50097
          },
       "originType": 1, # 产生源类型，包括 unknown = 0,rtmp_push=1,rtsp_push=2,rtp_push=3,pull=4,ffmpeg_pull=5,mp4_vod=6,device_chn=7
       "originTypeStr": "MediaOriginType::rtmp_push",
       "originUrl": "rtmp://127.0.0.1:1935/live/hks2", #产生源的url
       "createStamp": 1602205811, #GMT unix系统时间戳，单位秒
       "aliveSecond": 100, #存活时间，单位秒
       "bytesSpeed": 12345, #数据产生速度，单位byte/s
       "tracks" : [    # 音视频轨道
          {
             "channels" : 1, # 音频通道数
             "codec_id" : 2, # H264 = 0, H265 = 1, AAC = 2, G711A = 3, G711U = 4
             "codec_id_name" : "CodecAAC", # 编码类型名称
             "codec_type" : 1, # Video = 0, Audio = 1
             "ready" : true, # 轨道是否准备就绪
             "frames" : 1119, #累计接收帧数
             "sample_bit" : 16, # 音频采样位数
             "sample_rate" : 8000 # 音频采样率
          },
          {
             "codec_id" : 0, # H264 = 0, H265 = 1, AAC = 2, G711A = 3, G711U = 4
             "codec_id_name" : "CodecH264", # 编码类型名称
             "codec_type" : 0, # Video = 0, Audio = 1
             "fps" : 59,  # 视频fps
             "frames" : 1119, #累计接收帧数，不包含sei/aud/sps/pps等不能解码的帧
             "gop_interval_ms" : 1993, #gop间隔时间，单位毫秒
             "gop_size" : 60, #gop大小，单位帧数
             "key_frames" : 21, #累计接收关键帧数
             "height" : 720, # 视频高
             "ready" : true,  # 轨道是否准备就绪
             "width" : 1280 # 视频宽
          }
       ],
       "vhost" : "__defaultVhost__" # 虚拟主机名
     }
    ]
  }
  ```

### 7、`/index/api/close_stream`(已过期，请使用 close_streams 接口替换)

- 功能：关闭流(目前所有类型的流都支持关闭)

- 范例：[http://127.0.0.1/index/api/close_stream?schema=rtmp&vhost=`__defaultVhost__`&app=live&stream=0&force=1](http://127.0.0.1/index/api/close_stream?schema=rtmp&vhost=__defaultVhost__&app=live&stream=0&force=1)

- 参数：

  |  参数  | 是否必选 |                释意                |
  | :----: | :------: | :--------------------------------: |
  | secret |    Y     |     api 操作密钥(配置文件配置)     |
  | schema |    Y     |      协议，例如 rtsp 或 rtmp       |
  | vhost  |    Y     |  虚拟主机，例如`__defaultVhost__`  |
  |  app   |    Y     |         应用名，例如 live          |
  | stream |    Y     |          流 id，例如 test          |
  | force  |    N     | 是否强制关闭(有人在观看是否还关闭) |

- 响应：

  ```json
  {
     "code" : 0,
     "result" : 0,# 0:成功，-1:关闭失败，-2:该流不存在
     "msg" : "success"
  }
  ```

### 8、`/index/api/close_streams`

- 功能：关闭流(目前所有类型的流都支持关闭)

- 范例：[http://127.0.0.1/index/api/close_streams?schema=rtmp&vhost=`__defaultVhost__`&app=live&stream=0&force=1](http://127.0.0.1/index/api/close_streams?schema=rtmp&vhost=__defaultVhost__&app=live&stream=0&force=1)

- 参数：

  |  参数  | 是否必选 |                释意                |
  | :----: | :------: | :--------------------------------: |
  | secret |    Y     |     api 操作密钥(配置文件配置)     |
  | schema |    N     |      协议，例如 rtsp 或 rtmp       |
  | vhost  |    N     |  虚拟主机，例如`__defaultVhost__`  |
  |  app   |    N     |         应用名，例如 live          |
  | stream |    N     |          流 id，例如 test          |
  | force  |    N     | 是否强制关闭(有人在观看是否还关闭) |

- 响应：

  ```json
  {
     "code" : 0,
     "count_hit" : 1,  # 筛选命中的流个数
     "count_closed" : 1 # 被关闭的流个数，可能小于count_hit
  }
  ```

### 9、`/index/api/getAllSession`

- 功能：获取所有 TcpSession 列表(获取所有 tcp 客户端相关信息)

- 范例：[http://127.0.0.1/index/api/getAllSession](http://127.0.0.1/index/api/getAllSession)

- 参数：

  |    参数    | 是否必选 |                 释意                  |
  | :--------: | :------: | :-----------------------------------: |
  |   secret   |    Y     |      api 操作密钥(配置文件配置)       |
  | local_port |    N     | 筛选本机端口，例如筛选 rtsp 链接：554 |
  |  peer_ip   |    N     |             筛选客户端 ip             |

- 响应：

  ```json
  {
     "code" : 0,
     "data" : [
        {
           "id" : "140614477848784",
           "local_ip" : "127.0.0.1",
           "local_port" : 80,
           "peer_ip" : "127.0.0.1",
           "peer_port" : 51136,
           "typeid" : "16WebSocketSessionI11EchoSessionN8mediakit11HttpSessionEE"
        },
        {
           "id" : "140614443300192",
           "local_ip" : "127.0.0.1",
           "local_port" : 80,
           "peer_ip" : "127.0.0.1",
           "peer_port" : 51135,
           "typeid" : "16WebSocketSessionI11EchoSessionN8mediakit11HttpSessionEE"
        },
        {
           "id" : "140614440178720",  # 该tcp链接唯一id
           "local_ip" : "127.0.0.1",  # 本机网卡ip
           "local_port" : 1935, 			# 本机端口号	(这是个rtmp播放器或推流器)
           "peer_ip" : "127.0.0.1",   # 客户端ip
           "peer_port" : 51130,				# 客户端端口号
           "typeid" : "N8mediakit11RtmpSessionE"  # 客户端TCPSession typeid
        }
     ]
  }
  ```

### 10、`/index/api/kick_session`

- 功能：断开 tcp 连接，比如说可以断开 rtsp、rtmp 播放器等

- 范例：[http://127.0.0.1/index/api/kick_session?id=140614440178720](http://127.0.0.1/index/api/kick_session?id=140614440178720)

- 参数：

  |  参数  | 是否必选 |                      释意                      |
  | :----: | :------: | :--------------------------------------------: |
  | secret |    Y     |           api 操作密钥(配置文件配置)           |
  |   Id   |    Y     | 客户端唯一 id，可以通过 getAllSession 接口获取 |

- 响应：

  ```json
  {
    "code": 0,
    "msg": "success"
  }
  ```

### 11、`/index/api/kick_sessions`

- 功能：断开 tcp 连接，比如说可以断开 rtsp、rtmp 播放器等

- 范例：[http://127.0.0.1/index/api/kick_sessions?local_port=554](http://127.0.0.1/index/api/kick_sessions?local_port=554)

- 参数：

  |    参数    | 是否必选 |                 释意                  |
  | :--------: | :------: | :-----------------------------------: |
  |   secret   |    Y     |      api 操作密钥(配置文件配置)       |
  | local_port |    N     | 筛选本机端口，例如筛选 rtsp 链接：554 |
  |  peer_ip   |    N     |             筛选客户端 ip             |

- 响应：

  ```json
  {
     "code" : 0,
     "count_hit" : 1,# 筛选命中客户端个数
     "msg" : "success"
  }
  ```

### 12、`/index/api/addStreamProxy`

- 功能：动态添加 rtsp/rtmp/hls/http-ts/http-flv 拉流代理(只支持 H264/H265/aac/G711/opus 负载)

- 范例：[http://127.0.0.1/index/api/addStreamProxy?vhost=`__defaultVhost__`&app=proxy&stream=0&url=rtmp://live.hkstv.hk.lxdns.com/live/hks2](http://127.0.0.1/index/api/addStreamProxy?vhost=__defaultVhost__&app=proxy&stream=0&url=rtmp://live.hkstv.hk.lxdns.com/live/hks2)

- 参数：

  |       参数        | 参数类型 |                              释意                              | 是否必选 |
  | :---------------: | :------: | :------------------------------------------------------------: | :------: |
  |      secret       | `string` |                   api 操作密钥(配置文件配置)                   |    Y     |
  |       vhost       | `string` |           添加的流的虚拟主机，例如`__defaultVhost__`           |    Y     |
  |        app        | `string` |                  添加的流的应用名，例如 live                   |    Y     |
  |      stream       | `string` |                  添加的流的 id 名，例如 test                   |    Y     |
  |        url        | `string` |    拉流地址，例如 rtmp://live.hkstv.hk.lxdns.com/live/hks2     |    Y     |
  |    retry_count    |  `int`   |                拉流重试次数，默认为-1 无限重试                 |    N     |
  |     rtp_type      |  `int`   |         rtsp 拉流时，拉流方式，0：tcp，1：udp，2：组播         |    N     |
  |    timeout_sec    |  `int`   |                拉流超时时间，单位秒，float 类型                |    N     |
  |   `enable_hls`    |  `bool`  |                   是否转换成 hls-mpegts 协议                   |    N     |
  | `enable_hls_fmp4` |  `bool`  |                    是否转换成 hls-fmp4 协议                    |    N     |
  |   `enable_mp4`    |  `bool`  |                       是否允许 mp4 录制                        |    N     |
  |   `enable_rtsp`   |  `bool`  |                        是否转 rtsp 协议                        |    N     |
  |   `enable_rtmp`   |  `bool`  |                      是否转 rtmp/flv 协议                      |    N     |
  |    `enable_ts`    |  `bool`  |                   是否转 http-ts/ws-ts 协议                    |    N     |
  |   `enable_fmp4`   |  `bool`  |                 是否转 http-fmp4/ws-fmp4 协议                  |    N     |
  |   `hls_demand`    |  `bool`  |                    该协议是否有人观看才生成                    |    N     |
  |   `rtsp_demand`   |  `bool`  |                    该协议是否有人观看才生成                    |    N     |
  |   `rtmp_demand`   |  `bool`  |                    该协议是否有人观看才生成                    |    N     |
  |    `ts_demand`    |  `bool`  |                    该协议是否有人观看才生成                    |    N     |
  |   `fmp4_demand`   |  `bool`  |                    该协议是否有人观看才生成                    |    N     |
  |  `enable_audio`   |  `bool`  |                      转协议时是否开启音频                      |    N     |
  | `add_mute_audio`  |  `bool`  |             转协议时，无音频是否添加静音 aac 音频              |    N     |
  |  `mp4_save_path`  | `string` |              mp4 录制文件保存根目录，置空使用默认              |    N     |
  | `mp4_max_second`  |  `int`   |                    mp4 录制切片大小，单位秒                    |    N     |
  |  `mp4_as_player`  |  `bool`  |             MP4 录制是否当作观看者参与播放人数计数             |    N     |
  |  `hls_save_path`  | `string` |              hls 文件保存保存根目录，置空使用默认              |    N     |
  |  `modify_stamp`   |  `int`   | 该流是否开启时间戳覆盖(0:绝对时间戳/1:系统时间戳/2:相对时间戳) |    N     |
  |   `auto_close`    |  `bool`  |          无人观看是否自动关闭流(不触发无人观看 hook)           |    N     |

- 响应：

  ```json
  {
     "code" : 0,
     "data" : {
        "key" : "__defaultVhost__/proxy/0"  # 流的唯一标识
     }
  }
  ```

### 13、`/index/api/delStreamProxy(流注册成功后，也可以使用close_streams接口替代)`

- 功能：关闭拉流代理

- 范例：[http://127.0.0.1/index/api/delStreamProxy?key=`__defaultVhost__`/proxy/0](http://127.0.0.1/index/api/delStreamProxy?key=__defaultVhost__/proxy/0)

- 参数：

  |  参数  | 是否必选 |             释意              |
  | :----: | :------: | :---------------------------: |
  | secret |    Y     |  api 操作密钥(配置文件配置)   |
  |  key   |    Y     | addStreamProxy 接口返回的 key |

- 响应：

  ```json
  {
     "code" : 0,
     "data" : {
        "flag" : true # 成功与否
     }
  }
  ```

### 14、`/index/api/addFFmpegSource`

- 功能：通过 fork FFmpeg 进程的方式拉流代理，支持任意协议

- 范例：[http://127.0.0.1/index/api/addFFmpegSource?src_url=http://live.hkstv.hk.lxdns.com/live/hks2/playlist.m3u8&dst_url=rtmp://127.0.0.1/live/hks2&timeout_ms=10000&ffmpeg_cmd_key=ffmpeg.cmd](http://127.0.0.1/index/api/addFFmpegSource?src_url=http://live.hkstv.hk.lxdns.com/live/hks2/playlist.m3u8&dst_url=rtmp://127.0.0.1/live/hks2&timeout_ms=10000&ffmpeg_cmd_key=ffmpeg.cmd)

- 参数：

  |      参数      | 是否必选 |                                         释意                                          |
  | :------------: | :------: | :-----------------------------------------------------------------------------------: |
  |     secret     |    Y     |                              api 操作密钥(配置文件配置)                               |
  |    src_url     |    Y     |               FFmpeg 拉流地址,支持任意协议或格式(只要 FFmpeg 支持即可)                |
  |    dst_url     |    Y     | FFmpeg rtmp 推流地址，一般都是推给自己，例如 rtmp://127.0.0.1/live/stream_form_ffmpeg |
  |   timeout_ms   |    Y     |                                FFmpeg 推流成功超时时间                                |
  |   enable_hls   |    Y     |                                   是否开启 hls 录制                                   |
  |   enable_mp4   |    Y     |                                   是否开启 mp4 录制                                   |
  | ffmpeg_cmd_key |    N     |      配置文件中 FFmpeg 命令参数模板 key(非内容)，置空则采用默认模板:`ffmpeg.cmd`      |

- 响应：

  ```json
  {
     "code" : 0,
     "data" : {
        "key" : "5f748d2ef9712e4b2f6f970c1d44d93a"  # 唯一key
     }
  }
  ```

### 15、`/index/api/delFFmpegSource(流注册成功后，也可以使用close_streams接口替代)`

- 功能：关闭 ffmpeg 拉流代理

- 范例：[http://127.0.0.1/index/api/delFFmpegSource?key=5f748d2ef9712e4b2f6f970c1d44d93a](http://127.0.0.1/index/api/delFFmpegSource?key=5f748d2ef9712e4b2f6f970c1d44d93a)

- 参数：

  |  参数  | 是否必选 |              释意              |
  | :----: | :------: | :----------------------------: |
  | secret |    Y     |   api 操作密钥(配置文件配置)   |
  |  key   |    Y     | addFFmpegSource 接口返回的 key |

- 响应：

  ```json
  {
     "code" : 0,
     "data" : {
        "flag" : true # 成功与否
     }
  }
  ```

### 16、`/index/api/isMediaOnline(已过期，请使用getMediaList接口替代)`

- 功能：判断直播流是否在线

- 范例：[http://127.0.0.1/index/api/isMediaOnline?schema=rtsp&vhost=`__defaultVhost__`&app=live&stream=obs](http://127.0.0.1/index/api/isMediaOnline?schema=rtsp&vhost=__defaultVhost__&app=live&stream=obs)

- 参数：

  |  参数  | 是否必选 |               释意               |
  | :----: | :------: | :------------------------------: |
  | secret |    Y     |    api 操作密钥(配置文件配置)    |
  | schema |    Y     |     协议，例如 rtsp 或 rtmp      |
  | vhost  |    Y     | 虚拟主机，例如`__defaultVhost__` |
  |  app   |    Y     |        应用名，例如 live         |
  | stream |    Y     |         流 id，例如 obs          |

- 响应：

  ```json
  {
     "code" : 0,
     "online" : true # 是否在线
  }
  ```

### 17、`/index/api/getMediaInfo(已过期，请使用getMediaList接口替代)`

- 功能：获取流相关信息

- 范例：[http://127.0.0.1/index/api/getMediaInfo?schema=rtsp&vhost=`__defaultVhost__`&app=live&stream=obs](http://127.0.0.1/index/api/getMediaInfo?schema=rtsp&vhost=__defaultVhost__&app=live&stream=obs)

- 参数：

  |  参数  | 是否必选 |               释意               |
  | :----: | :------: | :------------------------------: |
  | secret |    Y     |    api 操作密钥(配置文件配置)    |
  | schema |    Y     |     协议，例如 rtsp 或 rtmp      |
  | vhost  |    Y     | 虚拟主机，例如`__defaultVhost__` |
  |  app   |    Y     |        应用名，例如 live         |
  | stream |    Y     |         流 id，例如 obs          |

- 响应：

  ```json
  {
    "code" : 0,
    "online" : true, # 是否在线
    "readerCount" : 0, # 本协议观看人数
    "totalReaderCount" : 0, # 观看总人数，包括hls/rtsp/rtmp/http-flv/ws-flv
    "tracks" : [ # 轨道列表
          {
             "channels" : 1, # 音频通道数
             "codec_id" : 2, # H264 = 0, H265 = 1, AAC = 2, G711A = 3, G711U = 4
             "codec_id_name" : "CodecAAC", # 编码类型名称
             "codec_type" : 1, # Video = 0, Audio = 1
             "ready" : true, # 轨道是否准备就绪
             "sample_bit" : 16, # 音频采样位数
             "sample_rate" : 8000 # 音频采样率
          },
          {
             "codec_id" : 0, # H264 = 0, H265 = 1, AAC = 2, G711A = 3, G711U = 4
             "codec_id_name" : "CodecH264", # 编码类型名称
             "codec_type" : 0, # Video = 0, Audio = 1
             "fps" : 59,  # 视频fps
             "height" : 720, # 视频高
             "ready" : true,  # 轨道是否准备就绪
             "width" : 1280 # 视频宽
          }
    ]
  }
  ```

### 18、`/index/api/getRtpInfo`

- 功能：获取 rtp 代理时的某路 ssrc rtp 信息

- 范例：[http://127.0.0.1/index/api/getRtpInfo?stream_id=1A2B3C4D](http://127.0.0.1/index/api/getRtpInfo?ssrc=1A2B3C4D)

- 参数：

  |   参数    | 是否必选 |                              释意                               |
  | :-------: | :------: | :-------------------------------------------------------------: |
  |  secret   |    Y     |                   api 操作密钥(配置文件配置)                    |
  | stream_id |    Y     | RTP 的 ssrc，16 进制字符串或者是流的 id(openRtpServer 接口指定) |

- 响应：

  ```json
  {
     "code" : 0,
     "exist" : true, # 是否存在
     "peer_ip" : "192.168.0.23", # 推流客户端ip
     "peer_port" : 54000 # 客户端端口号
     "local_ip" : "0.0.0.0", #本地监听的网卡ip
     "local_port" : 10000
  }
  ```

### 19、`/index/api/getMp4RecordFile`

- 功能：搜索文件系统，获取流对应的录像文件列表或日期文件夹列表

- 范例：[http://127.0.0.1/index/api/getMp4RecordFile?vhost=`__defaultVhost__`&app=live&stream=ss&period=2020-01](http://127.0.0.1/index/api/getMp4RecordFile?vhost=__defaultVhost__&app=live&stream=ss&period=2020-01)

- 参数：

  |      参数       | 是否必选 |                                                      释意                                                       |
  | :-------------: | :------: | :-------------------------------------------------------------------------------------------------------------: |
  |     secret      |    Y     |                                           api 操作密钥(配置文件配置)                                            |
  |      vhost      |    Y     |                                                 流的虚拟主机名                                                  |
  |       app       |    Y     |                                                   流的应用名                                                    |
  |     stream      |    Y     |                                                     流的 ID                                                     |
  |     period      |    Y     | 流的录像日期，格式为 2020-02-01,如果不是完整的日期，那么是搜索录像文件夹列表，否则搜索对应日期下的 mp4 文件列表 |
  | customized_path |    N     |               自定义搜索路径，与 startRecord 方法中的 customized_path 一样，默认为配置文件的路径                |

- 响应：

  ```json
  # 搜索文件夹列表(按照前缀匹配规则)：period = 2020-01
  {
     "code" : 0,
     "data" : {
        "paths" : [ "2020-01-25", "2020-01-24" ],
        "rootPath" : "/www/record/live/ss/"
     }
  }

  # 搜索mp4文件列表：period = 2020-01-24
  {
     "code" : 0,
     "data" : {
        "paths" : [
           "22-20-30.mp4",
           "22-13-12.mp4",
           "21-57-07.mp4",
           "21-19-18.mp4",
           "21-24-21.mp4",
           "21-15-10.mp4",
           "22-14-14.mp4"
        ],
        "rootPath" : "/www/live/ss/2020-01-24/"
     }
  }

  ```

### 20、`/index/api/startRecord`

- 功能：开始录制 hls 或 MP4

- 范例：[http://127.0.0.1/index/api/startRecord?type=1&vhost=`__defaultVhost__`&app=live&stream=obs](http://127.0.0.1/index/api/startRecord?type=1&vhost=__defaultVhost__&app=live&stream=obs)

- 参数：

  |      参数       | 是否必选 |                      释意                      | 类型   |
  | :-------------: | :------: | :--------------------------------------------: | ------ |
  |     secret      |    Y     |           api 操作密钥(配置文件配置)           | string |
  |      type       |    Y     |               0 为 hls，1 为 mp4               | 0/1    |
  |      vhost      |    Y     |        虚拟主机，例如`__defaultVhost__`        | string |
  |       app       |    Y     |               应用名，例如 live                | string |
  |     stream      |    Y     |                流 id，例如 obs                 | string |
  | customized_path |    N     |                  录像保存目录                  | string |
  |   max_second    |    N     | mp4 录像切片时间大小,单位秒，置 0 则采用配置项 | int    |

- 响应：

  ```json
  {
     "code" : 0,
     "result" : true # 成功与否
  }
  ```

### 21、`/index/api/stopRecord`

- 功能：停止录制流

- 范例：[http://127.0.0.1/index/api/stopRecord?type=1&vhost=`__defaultVhost__`&app=live&stream=obs](http://127.0.0.1/index/api/stopRecord?type=1&vhost=__defaultVhost__&app=live&stream=obs)

- 参数：

  |  参数  | 是否必选 |               释意               |
  | :----: | :------: | :------------------------------: |
  | secret |    Y     |    api 操作密钥(配置文件配置)    |
  |  type  |    Y     |        0 为 hls，1 为 mp4        |
  | vhost  |    Y     | 虚拟主机，例如`__defaultVhost__` |
  |  app   |    Y     |        应用名，例如 live         |
  | stream |    Y     |         流 id，例如 obs          |

- 响应：

  ```json
  {
     "code" : 0,
     "result" : true # 成功与否
  }
  ```

### 22、`/index/api/isRecording`

- 功能：获取流录制状态

- 范例：[http://127.0.0.1/index/api/isRecording?type=1&vhost=`__defaultVhost__`&app=live&stream=obs](http://127.0.0.1/index/api/isRecording?type=1&vhost=__defaultVhost__&app=live&stream=obs)

- 参数：

  |  参数  | 是否必选 |               释意               |
  | :----: | :------: | :------------------------------: |
  | secret |    Y     |    api 操作密钥(配置文件配置)    |
  |  type  |    Y     |        0 为 hls，1 为 mp4        |
  | vhost  |    Y     | 虚拟主机，例如`__defaultVhost__` |
  |  app   |    Y     |        应用名，例如 live         |
  | stream |    Y     |         流 id，例如 obs          |

- 响应：

  ```json
  {
     "code" : 0,
     "status" : true # false:未录制,true:正在录制
  }
  ```

### 23、`/index/api/getSnap`

- 功能：获取截图或生成实时截图并返回

- 范例：[http://127.0.0.1/index/api/getSnap?url=rtmp://127.0.0.1/record/robot.mp4&timeout_sec=10&expire_sec=30](http://127.0.0.1/index/api/getSnap?url=rtmp://127.0.0.1/record/robot.mp4&timeout_sec=10&expire_sec=30)

- 参数：

  |    参数     | 是否必选 |                        释意                        |
  | :---------: | :------: | :------------------------------------------------: |
  |   secret    |    Y     |             api 操作密钥(配置文件配置)             |
  |     url     |    Y     |  需要截图的 url，可以是本机的，也可以是远程主机的  |
  | timeout_sec |    Y     |     截图失败超时时间，防止 FFmpeg 一直等待截图     |
  | expire_sec  |    Y     | 截图的过期时间，该时间内产生的截图都会作为缓存返回 |

- 响应：

  ```json
  jpeg格式的图片，可以在浏览器直接打开
  ```

### 24、`/index/api/openRtpServer`

- 功能：创建 GB28181 RTP 接收端口，如果该端口接收数据超时，则会自动被回收(不用调用 closeRtpServer 接口)

- 范例：[http://127.0.0.1/index/api/openRtpServer?port=0&tcp_mode=1&stream_id=test](http://127.0.0.1/index/api/openRtpServer?port=0&tcp_mode=1&stream_id=test)

- 参数：

  |   参数    | 是否必选 |                                 释意                                  |
  | :-------: | :------: | :-------------------------------------------------------------------: |
  |  secret   |    Y     |                      api 操作密钥(配置文件配置)                       |
  |   port    |    Y     |                       接收端口，0 则为随机端口                        |
  | tcp_mode  |    Y     | 0 udp 模式，1 tcp 被动模式, 2 tcp 主动模式。 (兼容 enable_tcp 为 0/1) |
  | stream_id |    Y     |  该端口绑定的流 ID，该端口只能创建这一个流(而不是根据 ssrc 创建多个)  |

- 响应：

  ```json
  {
     "code" : 0,
     "port" : 55463 #接收端口，方便获取随机端口号
  }
  ```

### 25、`/index/api/closeRtpServer`

- 功能：关闭 GB28181 RTP 接收端口

- 范例：[http://127.0.0.1/index/api/closeRtpServer?stream_id=test](http://127.0.0.1/index/api/closeRtpServer?stream_id=test)

- 参数：

  |   参数    | 是否必选 |                 释意                 |
  | :-------: | :------: | :----------------------------------: |
  |  secret   |    Y     |      api 操作密钥(配置文件配置)      |
  | stream_id |    Y     | 调用 openRtpServer 接口时提供的流 ID |

- 响应：

  ```json
  {
     "code": 0,
     "hit": 1 #是否找到记录并关闭
  }
  ```

### 26、`/index/api/listRtpServer`

- 功能：获取 openRtpServer 接口创建的所有 RTP 服务器

- 范例：[http://127.0.0.1/index/api/listRtpServer](http://127.0.0.1/index/api/listRtpServer)

- 参数：

  |  参数  | 是否必选 |            释意            |
  | :----: | :------: | :------------------------: |
  | secret |    Y     | api 操作密钥(配置文件配置) |

- 响应：

  ```json
  {
     "code" : 0,
     "data" : [
        {
           "port" : 52183, #绑定的端口号
           "stream_id" : "test" #绑定的流ID
        }
     ]
  }
  ```

### 27、`/index/api/startSendRtp`

- 功能：作为 GB28181 客户端，启动 ps-rtp 推流，支持 rtp/udp 方式；该接口支持 rtsp/rtmp 等协议转 ps-rtp 推流。第一次推流失败会直接返回错误，成功一次后，后续失败也将无限重试。
- 范例：[http://127.0.0.1/index/api/startSendRtp?secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc&vhost=`__defaultVhost__`&app=live&stream=test&ssrc=1&dst_url=127.0.0.1&dst_port=10000&is_udp=0](http://127.0.0.1/index/api/startSendRtp?secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc&vhost=__defaultVhost__&app=live&stream=test&ssrc=1&dst_url=127.0.0.1&dst_port=10000&is_udp=0)

- 参数：

  |    参数    | 是否必选 |                                     释意                                      |
  | :--------: | :------: | :---------------------------------------------------------------------------: |
  |   secret   |    Y     |                          api 操作密钥(配置文件配置)                           |
  |   vhost    |    Y     |                        虚拟主机，例如**defaultVhost**                         |
  |    app     |    Y     |                               应用名，例如 live                               |
  |   stream   |    Y     |                               流 id，例如 test                                |
  |    ssrc    |    Y     |          推流的 rtp 的 ssrc,指定不同的 ssrc 可以同时推流到多个服务器          |
  |  dst_url   |    Y     |                                目标 ip 或域名                                 |
  |  dst_port  |    Y     |                                   目标端口                                    |
  |   is_udp   |    Y     |                        是否为 udp 模式,否则为 tcp 模式                        |
  |  src_port  |    N     |                  使用的本机端口，为 0 或不传时默认为随机端口                  |
  |     pt     |    N     |                 发送时，rtp 的 pt（uint8_t）,不传时默认为 96                  |
  |   use_ps   |    N     |  发送时，rtp 的负载类型。为 1 时，负载为 ps；为 0 时，为 es；不传时默认为 1   |
  | only_audio |    N     | 当 use_ps 为 0 时，有效。为 1 时，发送音频；为 0 时，发送视频；不传时默认为 0 |

- 响应：

  ```json
  {
     "code": 0, #成功
     "local_port": 57152 #使用的本地端口号
  }
  ```

#### 27.1 、`/index/api/startSendRtpPassive`

- 功能：作为 GB28181 Passive TCP 服务器；该接口支持 rtsp/rtmp 等协议转 ps-rtp 被动推流。调用该接口，zlm 会启动 tcp 服务器等待连接请求，连接建立后，zlm 会关闭 tcp 服务器，然后源源不断的往客户端推流。第一次推流失败会直接返回错误，成功一次后，后续失败也将无限重试(不停地建立 tcp 监听，超时后再关闭)。
- 范例：[http://127.0.0.1/index/api/startSendRtpPassive?secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc&vhost=`__defaultVhost__`&app=live&stream=test&ssrc=1](http://127.0.0.1/index/api/startSendRtpPassive?secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc&vhost=__defaultVhost__&app=live&stream=test&ssrc=1)

- 参数：

  |    参数    | 是否必选 |                                     释意                                      |
  | :--------: | :------: | :---------------------------------------------------------------------------: |
  |   secret   |    Y     |                          api 操作密钥(配置文件配置)                           |
  |   vhost    |    Y     |                        虚拟主机，例如**defaultVhost**                         |
  |    app     |    Y     |                               应用名，例如 live                               |
  |   stream   |    Y     |                               流 id，例如 test                                |
  |    ssrc    |    Y     |          推流的 rtp 的 ssrc,指定不同的 ssrc 可以同时推流到多个服务器          |
  |  src_port  |    N     |                  使用的本机端口，为 0 或不传时默认为随机端口                  |
  |     pt     |    N     |                 发送时，rtp 的 pt（uint8_t）,不传时默认为 96                  |
  |   use_ps   |    N     |  发送时，rtp 的负载类型。为 1 时，负载为 ps；为 0 时，为 es；不传时默认为 1   |
  | only_audio |    N     | 当 use_ps 为 0 时，有效。为 1 时，发送音频；为 0 时，发送视频；不传时默认为 0 |

- 响应：

  ```json
  {
     "code": 0, #成功
     "local_port": 57152 #使用的本地端口号
  }
  ```

### 28、`/index/api/stopSendRtp`

- 功能：停止 GB28181 ps-rtp 推流
- 范例：[http://127.0.0.1/index/api/stopSendRtp?secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc&vhost=`__defaultVhost__`&app=live&stream=test](http://127.0.0.1/index/api/stopSendRtp?secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc&vhost=__defaultVhost__&app=live&stream=test)

- 参数：

  |  参数  | 是否必选 |                     释意                      |
  | :----: | :------: | :-------------------------------------------: |
  | secret |    Y     |          api 操作密钥(配置文件配置)           |
  | vhost  |    Y     |        虚拟主机，例如**defaultVhost**         |
  |  app   |    Y     |               应用名，例如 live               |
  | stream |    Y     |               流 id，例如 test                |
  |  ssrc  |    N     | 根据 ssrc 关停某路 rtp 推流，置空时关闭所有流 |

- 响应：

  ```json
  {
     "code": 0 #成功
  }
  ```

### 29、`/index/api/getStatistic`

- 功能：获取主要对象个数统计，主要用于分析内存性能
- 范例：[http://127.0.0.1/index/api/getStatistic?secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc](http://127.0.0.1/index/api/getStatistic?secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc)

- 参数：

  |  参数  | 是否必选 |            释意            |
  | :----: | :------: | :------------------------: |
  | secret |    Y     | api 操作密钥(配置文件配置) |

- 响应：

  ```json
  {
    "code": 0,
    "data": {
      "Buffer": 2,
      "BufferLikeString": 1,
      "BufferList": 0,
      "BufferRaw": 1,
      "Frame": 0,
      "FrameImp": 0,
      "MediaSource": 0,
      "MultiMediaSourceMuxer": 0,
      "Socket": 66,
      "TcpClient": 0,
      "TcpServer": 64,
      "TcpSession": 1
    }
  }
  ```

### 30、`/index/api/addStreamPusherProxy`

- 功能：添加 rtsp/rtmp 主动推流(把本服务器的直播流推送到其他服务器去)

- 范例：[http://127.0.0.1/index/api/addStreamPusherProxy?vhost=`__defaultVhost__`&app=proxy&stream=test&dst_url=rtmp://127.0.0.1/live/test2](http://127.0.0.1/index/api/addStreamProxy?vhost=`__defaultVhost__`&app=proxy&stream=test&dst_url=rtmp://127.0.0.1/live/test2)

- 参数：

  |    参数     | 是否必选 |                    释意                    |
  | :---------: | :------: | :----------------------------------------: |
  |   secret    |    Y     |         api 操作密钥(配置文件配置)         |
  |    vhost    |    Y     | 添加的流的虚拟主机，例如`__defaultVhost__` |
  |   schema    |    Y     |          协议，例如 rtsp 或 rtmp           |
  |     app     |    Y     |        添加的流的应用名，例如 live         |
  |   stream    |    Y     |              需要转推的流 id               |
  |   dst_url   |    Y     |   目标转推 url，带参数需要自行 url 转义    |
  | retry_count |    N     |       转推失败重试次数，默认无限重试       |
  |  rtp_type   |    N     |   rtsp 推流时，推流方式，0：tcp，1：udp    |
  | timeout_sec |    N     |      推流超时时间，单位秒，float 类型      |

- 响应：

  ```json
  {
     "code" : 0,
     "data" : {
        "key" : "rtmp/__defaultVhost__/proxy/test/4AB43C9EABEB76AB443BB8260C8B2D12"  # 流的唯一标识
     }
  }
  ```

### 31、`/index/api/delStreamPusherProxy(可以使用close_streams接口关闭源直播流也可以停止推流)`

- 功能：关闭推流

- 范例：[http://127.0.0.1/index/api/delStreamPusherProxy?key=rtmp/**defaultVhost**/proxy/test/4AB43C9EABEB76AB443BB8260C8B2D12](http://127.0.0.1/index/api/delStreamPusherProxy?key=rtmp/__defaultVhost__/proxy/test/4AB43C9EABEB76AB443BB8260C8B2D12)

- 参数：

  |  参数  | 是否必选 |                释意                 |
  | :----: | :------: | :---------------------------------: |
  | secret |    Y     |     api 操作密钥(配置文件配置)      |
  |  key   |    Y     | addStreamPusherProxy 接口返回的 key |

- 响应：

  ```json
  {
     "code" : 0,
     "data" : {
        "flag" : true # 成功与否
     }
  }
  ```

### 32、`/index/api/version(获取版本信息)`

- 功能：获取版本信息，如分支，commit id, 编译时间

- 范例：[http://127.0.0.1/index/api/version](http://127.0.0.1/index/api/version)

- 参数：

  |  参数  | 是否必选 |            释意            |
  | :----: | :------: | :------------------------: |
  | secret |    Y     | api 操作密钥(配置文件配置) |

- 响应：

  ```json
  {
    "code": 0,
    "data": {
      "branchName": "master",
      "buildTime": "2023-04-19T10:34:34",
      "commitHash": "f143898"
    }
  }
  ```

### 33、`/index/api/getMediaPlayerList`

- 功能：获取某个流观看者列表

- 范例：[http://127.0.0.1:8080/index/api/getMediaPlayerList?secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc&schema=rtsp&vhost=**defaultVhost**&app=live&stream=test'](http://127.0.0.1:8080/index/api/getMediaPlayerList?secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc&schema=rtsp&vhost=__defaultVhost__&app=live&stream=test')

- 参数：

  |  参数  | 是否必选 |               释意               |
  | :----: | :------: | :------------------------------: |
  | secret |    Y     |    api 操作密钥(配置文件配置)    |
  | schema |    Y     |     协议，例如 rtsp 或 rtmp      |
  | vhost  |    Y     | 虚拟主机，例如`__defaultVhost__` |
  |  app   |    Y     |        应用名，例如 live         |
  | stream |    Y     |         流 id，例如 obs          |

- 响应：

```json
{
  "code": 0,
  "data": [
    {
      "identifier": "3-309",
      "local_ip": "::",
      "local_port": 8000,
      "peer_ip": "172.18.190.159",
      "peer_port": 52996,
      "typeid": "mediakit::WebRtcSession"
    }
  ]
}
```
