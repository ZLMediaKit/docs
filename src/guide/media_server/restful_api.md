---
title: RESTful interface
---

## Download postman configuration file (to test RESTful API)

[Postman configuration file](https://github.com/xia-chu/ZLMediaKit/tree/master/postman)

Due to frequent updates in the API, while reading this document, please use Postman to verify and test the API endpoints. It is possible that some endpoints may be missing in this document. You can also refer to the [code](https://github.com/xia-chu/ZLMediaKit/blob/master/server/WebApi.cpp#L261).

## API Preview

MediaServer is the main process of ZLMediaKit and currently supports the following HTTP API endpoints. All these endpoints support both GET and POST methods.

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

For the POST method, parameters can be sent in either urlencoded or JSON format. To authenticate these API operations, the `secret` parameter needs to be provided. However, if the operation is performed from the IP address 127.0.0.1, authentication is not required.



## API Response Conventions

- At the HTTP level, a unified 200 status code is returned, and the response body is always in JSON format.
- The response body generally follows the following format:

```json
{
    "code" : -1,
    "msg" : "Failure message"
}
```

- The `code` field represents the execution result and can have the following values:

```c++
typedef enum {
    Exception = -400, // Exception in the code
    InvalidArgs = -300, // Invalid parameters
    SqlFailed = -200, // SQL execution failed
    AuthFailed = -100, // Authentication failed
    OtherFailed = -1, // Business code execution failed
    Success = 0 // Execution successful
} ApiErr;
```

- If the execution is successful, `code == 0`, and there is usually no `msg` field.

- When `code == -1`, it indicates that the business code execution was unsuccessful. More specific reasons are usually provided in the `result` field, as shown below:


```json
{
    "code" : -1, // Business code execution failed
    "msg" : "can not find the stream", // Failure message
    "result" : -2 // Specific reason for business code execution failure
}
```

- Developers generally only need to pay attention to the `code` and `msg` fields. If `code != 0`, printing the `msg` field is sufficient.

- When `code == 0`, it represents complete success. If data is returned, it is usually provided in the `data` field.

## API Details

### 0、`/index/api/getApiList`

- Function: Get the list of APIs.

- Example：[http://127.0.0.1/index/api/getApiList](http://127.0.0.1/index/api/getApiList)

- Parameters：None

- Response：

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

  - Function: Get the load and delay of each epoll (or select) thread.

  - Example：[http://127.0.0.1/index/api/getThreadsLoad](http://127.0.0.1/index/api/getThreadsLoad)

  - Parameters: None

  - Response: 

    ```json
    {
       "code" : 0,
       "data" : [
          {
             "delay" : 0, // Delay of the thread
             "load" : 0 // Load of the thread, ranging from 0 to 100
          },
          {
             "delay" : 0,
             "load" : 0
          }
       ]
    }
    ```

    

### 2、`/index/api/getWorkThreadsLoad`

  - Function: Get the load and delay of each background epoll (or select) thread.

  - Example：[http://127.0.0.1/index/api/getWorkThreadsLoad](http://127.0.0.1/index/api/getWorkThreadsLoad)

  - Parameters: None

  - Response: 

    ```json
    {
       "code" : 0,
       "data" : [
          {
             "delay" : 0, // Delay of the thread
             "load" : 0 // Load of the thread, ranging from 0 to 100
          },
          {
             "delay" : 0,
             "load" : 0
          }
       ]
    }
    ```

    

### 3、`/index/api/getServerConfig`

  - Function: Get server configuration.

  - Example：[http://127.0.0.1/index/api/getServerConfig](http://127.0.0.1/index/api/getServerConfig)

  - Parameters：

    | Parameter | Required |                 Description                  |
    | :-------: | :------: | :-----------------------------------------: |
    |  secret   |    Y     | API operation key (configured in the file) |

  - Response：

    ```json
    {
       "code" : 0,
       "data" : [
          {
             "api.apiDebug" : "1",
             "api.secret" : "035c73f7-bb6b-4889-a715-d9eb2d1925cc",
             "ffmpeg.bin" : "/usr/local/bin/ffmpeg",
             "ffmpeg.cmd" : "%s -i %s -c:a aac -strict -2 -ar 44100 -ab 48k -c:v libx264 -f flv %s",
             "ffmpeg.log" : "/Users/xzl/git/ZLMediaKit/cmake-build-debug/bin/ffmpeg/ffmpeg.log",
             "general.enableVhost" : "1",
             "general.flowThreshold" : "1024",
             "general.maxStreamWaitMS" : "5000",
             "general.streamNoneReaderDelayMS" : "5000",
             "hls.fileBufSize" : "65536",
             "hls.filePath" : "/Users/xzl/git/ZLMediaKit/cmake-build-debug/bin/httpRoot",
             "hls.segDur" : "3",
             "hls.segNum" : "3",
             "hook.access_file_except_hls" : "1",
             "hook.admin_params" : "secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc",
             "hook.enable" : "1",
             "hook.on_flow_report" : "https://127.0.0.1/index/hook/on_flow_report",
             "hook.on_http_access" : "https://127.0.0.1/index/hook/on_http_access",
             "hook.on_play" : "https://127.0.0.1/index/hook/on_play",
             "hook.on_publish" : "https://127.0.0.1/index/hook/on_publish",
             "hook.on_record_mp4" : "https://127.0.0.1/index/hook/on_record_mp4",
             "hook.on_rtsp_auth" : "https://127.0.0.1/index/hook/on_rtsp_auth",
             "hook.on_rtsp_realm" : "https://127.0.0.1/index/hook/on_rtsp_realm",
             "hook.on_shell_login" : "https://127.0.0.1/index/hook/on_shell_login",
             "hook.on_stream_changed" : "https://127.0.0.1/index/hook/on_stream_changed",
             "hook.on_stream_none_reader" : "https://127.0.0.1/index/hook/on_stream_none_reader",
             "hook.on_stream_not_found" : "https://127.0.0.1/index/hook/on_stream_not_found",
             "hook.timeoutSec" : "10",
             "http.charSet" : "utf-8",
             "http.keepAliveSecond" : "100",
             "http.maxReqCount" : "100",
             "http.maxReqSize" : "4096",
             "http.notFound" : "<html><head><title>404 Not Found</title></head><body bgcolor=\"white\"><center><h1>您访问的资源不存在！</h1></center><hr><center>ZLMediaKit-4.0</center></body></html>",
             "http.port" : "80",
             "http.rootPath" : "/Users/xzl/git/ZLMediaKit/cmake-build-debug/bin/httpRoot",
             "http.sendBufSize" : "65536",
             "http.sslport" : "443",
             "multicast.addrMax" : "239.255.255.255",
             "multicast.addrMin" : "239.0.0.0",
             "multicast.udpTTL" : "64",
             "record.appName" : "record",
             "record.filePath" : "/Users/xzl/git/ZLMediaKit/cmake-build-debug/bin/httpRoot",
             "record.fileSecond" : "3600",
             "record.sampleMS" : "100",
             "rtmp.handshakeSecond" : "15",
             "rtmp.keepAliveSecond" : "15",
             "rtmp.modifyStamp" : "1",
             "rtmp.port" : "1935",
             "rtp.audioMtuSize" : "600",
             "rtp.clearCount" : "10",
             "rtp.cycleMS" : "46800000",
             "rtp.maxRtpCount" : "50",
             "rtp.videoMtuSize" : "1400",
             "rtsp.authBasic" : "0",
             "rtsp.handshakeSecond" : "15",
             "rtsp.keepAliveSecond" : "15",
             "rtsp.port" : "554",
             "rtsp.sslport" : "322",
             "shell.maxReqSize" : "1024",
             "shell.port" : "9000"
          }
       ]
    }
    ```

    

### 4、`/index/api/setServerConfig`

  - Function: Set server configuration.

  - Example：[http://127.0.0.1/index/api/setServerConfig?api.apiDebug=0(例如关闭http api调试)](http://127.0.0.1/index/api/setServerConfig?api.apiDebug=0)

  - Parameters：

     | Parameter | Required |                 Description                  |
    | :-------: | :------: | :-----------------------------------------: |
    |  secret   |    Y     | API operation key (configured in the file) |

  - Response：

    ```json
    {
       "changed" : 0, // Number of configuration items changed
       "code" : 0      // 0 represents success
    }
    ```



### 5、`/index/api/restartServer`

  - Function：Restart the server. Only possible in Daemon mode, otherwise it will be shut down directly!

  - Example：[http://127.0.0.1/index/api/restartServer](http://127.0.0.1/index/api/restartServer)

  - Parameters：

      | Parameter | Required |                     Description                      |
    | :-------: | :------: | :--------------------------------------------------: |
    |  secret   |    Y     |     API operation key (configured in the file)      |

  - Response：

    ```json
    {
       "code" : 0,
       "msg" : "The server will automatically restart in one second."
    }
    ```




### 6、`/index/api/getMediaList`

  - Function：Get the list of streams, with optional filtering parameters.

  - Example：[http://127.0.0.1/index/api/getMediaList](http://127.0.0.1/index/api/getMediaList)

  - Parameters：

   | Parameter | Required |                     Description                      |
    | :-------: | :------: | :--------------------------------------------------: |
    |  secret   |    Y     |     API operation key (configured in the file)      |
    |  schema   |    N     |               Filter by protocol, e.g., rtsp or rtmp              |
    |   vhost   |    N     |               Filter by virtual host, e.g., `__defaultVhost__`             |
    |    app    |    N     |               Filter by application name, e.g., live                     |
    |  stream   |    N     |               Filter by stream ID, e.g., test                     |

  - Response：

    ```json
    {
      "code" : 0,
      "data" : [
      {
         "app" : "live",  # Application name
         "readerCount" : 0, # Number of viewers for this protocol
         "totalReaderCount" : 0, # Total number of viewers, including hls/rtsp/rtmp/http-flv/ws-flv
         "schema" : "rtsp", # Protocol
         "stream" : "obs", # Stream ID
         "originSock": {  # Client and server network information, may be null
                "identifier": "140241931428384",
                "local_ip": "127.0.0.1",
                "local_port": 1935,
                "peer_ip": "127.0.0.1",
                "peer_port": 50097
            },
         "originType": 1, # Source type: unknown = 0, rtmp_push = 1, rtsp_push = 2, rtp_push = 3, pull = 4, ffmpeg_pull = 5, mp4_vod = 6, device_chn = 7
         "originTypeStr": "MediaOriginType::rtmp_push",
         "originUrl": "rtmp://127.0.0.1:1935/live/hks2", # URL of the source
         "createStamp": 1602205811, # GMT Unix system timestamp in seconds
         "aliveSecond": 100, # The time the stream remains alive, in seconds
         "bytesSpeed": 12345, # Data generation speed in bytes/s
         "tracks" : [    # Audio and video tracks
            {
               "channels" : 1, # Number of audio channels
               "codec_id" : 2, # H264 = 0, H265 = 1, AAC = 2, G711A = 3, G711U = 4
               "codec_id_name" : "CodecAAC", # Codec type name  
               "codec_type" : 1, # Video = 0, Audio = 1
               "ready" : true, # Whether the track is ready
               "frames" : 1119, # Accumulated received frames
               "sample_bit" : 16, # Audio sample bit depth
               "sample_rate" : 8000 # Audio sample rate
            },
            {
               "codec_id" : 0, # H264 = 0, H265 = 1, AAC = 2, G711A = 3, G711U = 4
               "codec_id_name" : "CodecH264", #  Codec type name    
               "codec_type" : 0, # Video = 0, Audio = 1
               "fps" : 59,  # Video frames per second
               "frames" : 1119, # Accumulated received frames, excluding sei/aud/sps/pps frames that cannot be decoded
               "gop_interval_ms" : 1993, # GOP interval in milliseconds
               "gop_size" : 60, # gop size, unit number of frames
               "key_frames" : 21, # Accumulated received key frames
               "height" : 720, # video high
               "ready" : true,  # Is the track ready?
               "width" : 1280 # video width
            }
         ],
         "vhost" : "__defaultVhost__" # Virtual host name
       }
      ]
    }
    ```

    

### 7、`/index/api/close_stream`(Deprecated, please use the `close_streams` API instead)

  - Function: Close a stream (supports closing streams of all types).

  - Example：[http://127.0.0.1/index/api/close_stream?schema=rtmp&vhost=`__defaultVhost__`&app=live&stream=0&force=1](http://127.0.0.1/index/api/close_stream?schema=rtmp&vhost=__defaultVhost__&app=live&stream=0&force=1)

  - Parameters:

    | Parameter | Required |                           Description                            |
    | :-------: | :------: | :-------------------------------------------------------------: |
    |  secret   |    Y     |                  API operation secret key (configured in the file)                  |
    |  schema   |    Y     |                       Protocol, e.g., rtsp or rtmp                        |
    |   vhost   |    Y     |                        Virtual host, e.g., `__defaultVhost__`                        |
    |    app    |    Y     |                           Application name, e.g., live                            |
    |  stream   |    Y     |                                Stream ID, e.g., test                                 |
    |   force   |    N     |                 Whether to force close (even if someone is watching)                 |

  - Response:

    ```json
    {
       "code" : 0,
       "result" : 0,  # 0: success, -1: failed to close, -2: stream does not exist
       "msg" : "success"
    }
    ```

### 8、`/index/api/close_streams`

  - Function: Close a stream (supports closing streams of all types).

  - Example：[http://127.0.0.1/index/api/close_streams?schema=rtmp&vhost=`__defaultVhost__`&app=live&stream=0&force=1](http://127.0.0.1/index/api/close_streams?schema=rtmp&vhost=__defaultVhost__&app=live&stream=0&force=1)

  - Parameters：

    | Parameter | Required |                           Description                            |
    | :-------: | :------: | :-------------------------------------------------------------: |
    |  secret   |    Y     |                  API operation secret key (configured in the file)                  |
    |  schema   |    N     |                       Protocol, e.g., rtsp or rtmp                        |
    |   vhost   |    N     |                        Virtual host, e.g., `__defaultVhost__`                        |
    |    app    |    N     |                           Application name, e.g., live                            |
    |  stream   |    N     |                                Stream ID, e.g., test                                 |
    |   force   |    N     |                 Whether to force close (even if someone is watching)                 |

  - Response:

    ```json
    {
       "code" : 0,
       "count_hit" : 1,  # Number of streams hit by the filter
       "count_closed" : 1 # Number of streams closed, which may be less than count_hit
    }
    ```

### 9、`/index/api/getAllSession`

  - Function: Get a list of all TcpSessions (retrieve information about all TCP clients).

  - Example：[http://127.0.0.1/index/api/getAllSession](http://127.0.0.1/index/api/getAllSession)

  - Parameters：

    |   Parameter   | Required |                           Description                            |
    | :-----------: | :------: | :-------------------------------------------------------------: |
    |    secret     |    Y     |                  API operation secret key (configured in the file)                  |
    |  local_port   |    N     |                     Filter by local port, e.g., 554                     |
    |    peer_ip    |    N     |                          Filter by client IP                          |

  - Response:

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
             "id" : "140614440178720",  # Unique ID for this TCP connection
             "local_ip" : "127.0.0.1",  # Local IP address
             "local_port" : 1935,       # Local port number (this is an RTMP player or publisher)
             "peer_ip" : "127.0.0.1",   # Client IP address
             "peer_port" : 51130,       # Client port number
             "typeid" : "N8mediakit11RtmpSessionE"  # Client TCPSession typeid
          }
       ]
    }
    ```

    

### 10、`/index/api/kick_session`

  - 功能：断开tcp连接，比如说可以断开rtsp、rtmp播放器等

  - 范例：[http://127.0.0.1/index/api/kick_session?id=140614440178720](http://127.0.0.1/index/api/kick_session?id=140614440178720)

  - 参数：

    |  参数  | 是否必选 |                             释意                             |
    | :----: | :------: | :----------------------------------------------------------: |
    | secret |    Y     | api操作密钥(配置文件配置) |
    |   Id   |    Y     |         客户端唯一id，可以通过getAllSession接口获取          |

  - 响应：

    ```json
    {
       "code" : 0,
       "msg" : "success"
    }
    ```

    

### 11、`/index/api/kick_sessions`

  - 功能：断开tcp连接，比如说可以断开rtsp、rtmp播放器等

  - 范例：[http://127.0.0.1/index/api/kick_sessions?local_port=554](http://127.0.0.1/index/api/kick_sessions?local_port=554)

  - 参数：

    |    参数    | 是否必选 |                             释意                             |
    | :--------: | :------: | :----------------------------------------------------------: |
    |   secret   |    Y     | api操作密钥(配置文件配置) |
    | local_port |    N     |             筛选本机端口，例如筛选rtsp链接：554              |
    |  peer_ip   |    N     |                         筛选客户端ip                         |

  - 响应：

    ```json
    {
       "code" : 0,
       "count_hit" : 1,# 筛选命中客户端个数
       "msg" : "success"
    }
    ```



### 12、`/index/api/addStreamProxy`

  - 功能：动态添加rtsp/rtmp/hls/http-ts/http-flv拉流代理(只支持H264/H265/aac/G711/opus负载)

  - 范例：[http://127.0.0.1/index/api/addStreamProxy?vhost=`__defaultVhost__`&app=proxy&stream=0&url=rtmp://live.hkstv.hk.lxdns.com/live/hks2](http://127.0.0.1/index/api/addStreamProxy?vhost=__defaultVhost__&app=proxy&stream=0&url=rtmp://live.hkstv.hk.lxdns.com/live/hks2)

  - 参数：

    |       参数        | 参数类型  |                             释意                              | 是否必选  |
    | :--------------: | :------: | :----------------------------------------------------------: | :------: |
    |      secret      | `string` | api操作密钥(配置文件配置) |    Y     |
    |      vhost       | `string` |          添加的流的虚拟主机，例如`__defaultVhost__`          |    Y     |
    |       app        | `string` |                  添加的流的应用名，例如live                  |    Y     |
    |      stream      | `string` |                   添加的流的id名，例如test                   |    Y     |
    |       url        | `string` |    拉流地址，例如rtmp://live.hkstv.hk.lxdns.com/live/hks2    |    Y     |
    |  retry_count     | `int`    |         拉流重试次数，默认为-1无限重试                        |    N     |
    |     rtp_type     |  `int`   |        rtsp拉流时，拉流方式，0：tcp，1：udp，2：组播         |    N     |
    |   timeout_sec    |  `int`   |               拉流超时时间，单位秒，float类型                |    N     |
    |    `enable_hls`    |  `bool`  |                   是否转换成hls-mpegts协议                   |    N     |
    | `enable_hls_fmp4`  |  `bool`  |                    是否转换成hls-fmp4协议                    |    N     |
    |    `enable_mp4`    |  `bool`  |                       是否允许mp4录制                        |    N     |
    |   `enable_rtsp`    |  `bool`  |                        是否转rtsp协议                        |    N     |
    |   `enable_rtmp`    |  `bool`  |                      是否转rtmp/flv协议                      |    N     |
    |    `enable_ts`     |  `bool`  |                   是否转http-ts/ws-ts协议                    |    N     |
    |   `enable_fmp4`    |  `bool`  |                 是否转http-fmp4/ws-fmp4协议                  |    N     |
    |    `hls_demand`    |  `bool`  |                   该协议是否有人观看才生成                   |    N     |
    |   `rtsp_demand`    |  `bool`  |                   该协议是否有人观看才生成                   |    N     |
    |   `rtmp_demand`    |  `bool`  |                   该协议是否有人观看才生成                   |    N     |
    |    `ts_demand`     |  `bool`  |                   该协议是否有人观看才生成                   |    N     |
    |   `fmp4_demand`    |  `bool`  |                   该协议是否有人观看才生成                   |    N     |
    |   `enable_audio`   |  `bool`  |                     转协议时是否开启音频                     |    N     |
    |  `add_mute_audio`  |  `bool`  |             转协议时，无音频是否添加静音aac音频              |    N     |
    |  `mp4_save_path`   | `string` |             mp4录制文件保存根目录，置空使用默认              |    N     |
    |  `mp4_max_second`  |  `int`   |                   mp4录制切片大小，单位秒                    |    N     |
    |  `mp4_as_player`   |  `bool`  |            MP4录制是否当作观看者参与播放人数计数             |    N     |
    |  `hls_save_path`   | `string` |             hls文件保存保存根目录，置空使用默认              |    N     |
    |   `modify_stamp`   |  `int`   | 该流是否开启时间戳覆盖(0:绝对时间戳/1:系统时间戳/2:相对时间戳) |    N     |
    |    `auto_close`    |  `bool`  |          无人观看是否自动关闭流(不触发无人观看hook)          |    N     |

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

    |  参数  | 是否必选 |                             释意                             |
    | :----: | :------: | :----------------------------------------------------------: |
    | secret |    Y     | api操作密钥(配置文件配置) |
    |  key   |    Y     |                 addStreamProxy接口返回的key                  |

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

  - 功能：通过fork FFmpeg进程的方式拉流代理，支持任意协议

  - 范例：[http://127.0.0.1/index/api/addFFmpegSource?src_url=http://live.hkstv.hk.lxdns.com/live/hks2/playlist.m3u8&dst_url=rtmp://127.0.0.1/live/hks2&timeout_ms=10000&ffmpeg_cmd_key=ffmpeg.cmd](http://127.0.0.1/index/api/addFFmpegSource?src_url=http://live.hkstv.hk.lxdns.com/live/hks2/playlist.m3u8&dst_url=rtmp://127.0.0.1/live/hks2&timeout_ms=10000&ffmpeg_cmd_key=ffmpeg.cmd)

  - 参数：

    |    参数    | 是否必选 |                             释意                             |
    | :--------: | :------: | :----------------------------------------------------------: |
    |   secret   |    Y     | api操作密钥(配置文件配置) |
    |  src_url   |    Y     |    FFmpeg拉流地址,支持任意协议或格式(只要FFmpeg支持即可)     |
    |  dst_url   |    Y     | FFmpeg rtmp推流地址，一般都是推给自己，例如rtmp://127.0.0.1/live/stream_form_ffmpeg |
    | timeout_ms |    Y     |                    FFmpeg推流成功超时时间                    |
    | enable_hls |    Y     | 是否开启hls录制 |
    | enable_mp4 |    Y     |                    是否开启mp4录制                   |
    | ffmpeg_cmd_key |  N   |   配置文件中FFmpeg命令参数模板key(非内容)，置空则采用默认模板:`ffmpeg.cmd`                  |

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

  - 功能：关闭ffmpeg拉流代理

  - 范例：[http://127.0.0.1/index/api/delFFmpegSource?key=5f748d2ef9712e4b2f6f970c1d44d93a](http://127.0.0.1/index/api/delFFmpegSource?key=5f748d2ef9712e4b2f6f970c1d44d93a)

  - 参数：

    |  参数  | 是否必选 |                             释意                             |
    | :----: | :------: | :----------------------------------------------------------: |
    | secret |    Y     | api操作密钥(配置文件配置) |
    |  key   |    Y     |                 addFFmpegSource接口返回的key                 |


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

    |  参数  | 是否必选 |                             释意                             |
    | :----: | :------: | :----------------------------------------------------------: |
    | secret |    Y     | api操作密钥(配置文件配置) |
    | schema |    Y     |                    协议，例如 rtsp或rtmp                     |
    | vhost  |    Y     |               虚拟主机，例如`__defaultVhost__`               |
    |  app   |    Y     |                      应用名，例如 live                       |
    | stream |    Y     |                        流id，例如 obs                        |


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

    |  参数  | 是否必选 |                             释意                             |
    | :----: | :------: | :----------------------------------------------------------: |
    | secret |    Y     | api操作密钥(配置文件配置) |
    | schema |    Y     |                    协议，例如 rtsp或rtmp                     |
    | vhost  |    Y     |               虚拟主机，例如`__defaultVhost__`               |
    |  app   |    Y     |                      应用名，例如 live                       |
    | stream |    Y     |                        流id，例如 obs                        |


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

  - 功能：获取rtp代理时的某路ssrc rtp信息

  - 范例：[http://127.0.0.1/index/api/getRtpInfo?stream_id=1A2B3C4D](http://127.0.0.1/index/api/getRtpInfo?ssrc=1A2B3C4D)

  - 参数：

    |   参数    | 是否必选 |                             释意                             |
    | :-------: | :------: | :----------------------------------------------------------: |
    |  secret   |    Y     | api操作密钥(配置文件配置) |
    | stream_id |    Y     |  RTP的ssrc，16进制字符串或者是流的id(openRtpServer接口指定)  |


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

    |  参数  | 是否必选 |                             释意                             |
    | :----: | :------: | :----------------------------------------------------------: |
    | secret |    Y     | api操作密钥(配置文件配置) |
    | vhost  |    Y     |                        流的虚拟主机名                        |
    |  app   |    Y     |                          流的应用名                          |
    | stream |    Y     |                            流的ID                            |
    | period |    Y     | 流的录像日期，格式为2020-02-01,如果不是完整的日期，那么是搜索录像文件夹列表，否则搜索对应日期下的mp4文件列表 |
    | customized_path|    N     | 自定义搜索路径，与startRecord方法中的customized_path一样，默认为配置文件的路径 |


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

  - 功能：开始录制hls或MP4

  - 范例：[http://127.0.0.1/index/api/startRecord?type=1&vhost=`__defaultVhost__`&app=live&stream=obs](http://127.0.0.1/index/api/startRecord?type=1&vhost=__defaultVhost__&app=live&stream=obs)

  - 参数：

    |      参数       | 是否必选 |                             释意                             | 类型   |
    | :-------------: | :------: | :----------------------------------------------------------: | ------ |
    |     secret      |    Y     | api操作密钥(配置文件配置) | string |
    |      type       |    Y     |                        0为hls，1为mp4                        | 0/1    |
    |      vhost      |    Y     |               虚拟主机，例如`__defaultVhost__`               | string |
    |       app       |    Y     |                      应用名，例如 live                       | string |
    |     stream      |    Y     |                        流id，例如 obs                        | string |
    | customized_path |    N     |                         录像保存目录                         | string |
    | max_second      |    N     |                    mp4录像切片时间大小,单位秒，置0则采用配置项      | int |



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

    |  参数  | 是否必选 |                             释意                             |
    | :----: | :------: | :----------------------------------------------------------: |
    | secret |    Y     | api操作密钥(配置文件配置) |
    |  type  |    Y     |                        0为hls，1为mp4                        |
    | vhost  |    Y     |               虚拟主机，例如`__defaultVhost__`               |
    |  app   |    Y     |                      应用名，例如 live                       |
    | stream |    Y     |                        流id，例如 obs                        |


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

    |  参数  | 是否必选 |                             释意                             |
    | :----: | :------: | :----------------------------------------------------------: |
    | secret |    Y     | api操作密钥(配置文件配置) |
    |  type  |    Y     |                        0为hls，1为mp4                        |
    | vhost  |    Y     |               虚拟主机，例如`__defaultVhost__`               |
    |  app   |    Y     |                      应用名，例如 live                       |
    | stream |    Y     |                        流id，例如 obs                        |


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

    |    参数     | 是否必选 |                             释意                             |
    | :---------: | :------: | :----------------------------------------------------------: |
    |   secret    |    Y     | api操作密钥(配置文件配置) |
    |     url     |    Y     |       需要截图的url，可以是本机的，也可以是远程主机的        |
    | timeout_sec |    Y     |           截图失败超时时间，防止FFmpeg一直等待截图           |
    | expire_sec  |    Y     |      截图的过期时间，该时间内产生的截图都会作为缓存返回      |


  - 响应：

    ```json
    jpeg格式的图片，可以在浏览器直接打开
    ```



### 24、`/index/api/openRtpServer`

  - 功能：创建GB28181 RTP接收端口，如果该端口接收数据超时，则会自动被回收(不用调用closeRtpServer接口)

  - 范例：[http://127.0.0.1/index/api/openRtpServer?port=0&tcp_mode=1&stream_id=test](http://127.0.0.1/index/api/openRtpServer?port=0&tcp_mode=1&stream_id=test)

  - 参数：

    |    参数    | 是否必选 |                             释意                             |
    | :--------: | :------: | :----------------------------------------------------------: |
    |   secret   |    Y     | api操作密钥(配置文件配置) |
    |    port    |    Y     |                   接收端口，0则为随机端口                    |
    | tcp_mode   |    Y     |              0 udp 模式，1 tcp 被动模式, 2 tcp 主动模式。 (兼容enable_tcp 为0/1)      |
    | stream_id  |    Y     | 该端口绑定的流ID，该端口只能创建这一个流(而不是根据ssrc创建多个) |


  - 响应：

    ```json
    {
       "code" : 0,
       "port" : 55463 #接收端口，方便获取随机端口号
    }
    ```



### 25、`/index/api/closeRtpServer`

  - 功能：关闭GB28181 RTP接收端口

  - 范例：[http://127.0.0.1/index/api/closeRtpServer?stream_id=test](http://127.0.0.1/index/api/closeRtpServer?stream_id=test)

  - 参数：

    |   参数    | 是否必选 |                             释意                             |
    | :-------: | :------: | :----------------------------------------------------------: |
    |  secret   |    Y     | api操作密钥(配置文件配置) |
    | stream_id |    Y     |              调用openRtpServer接口时提供的流ID               |


  - 响应：

    ```json
    {
       "code": 0,
       "hit": 1 #是否找到记录并关闭
    }
    ```

### 26、`/index/api/listRtpServer`

  - 功能：获取openRtpServer接口创建的所有RTP服务器

  - 范例：[http://127.0.0.1/index/api/listRtpServer](http://127.0.0.1/index/api/listRtpServer)

  - 参数：

    |  参数  | 是否必选 |                             释意                             |
    | :----: | :------: | :----------------------------------------------------------: |
    | secret |    Y     | api操作密钥(配置文件配置) |


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

  - 功能：作为GB28181客户端，启动ps-rtp推流，支持rtp/udp方式；该接口支持rtsp/rtmp等协议转ps-rtp推流。第一次推流失败会直接返回错误，成功一次后，后续失败也将无限重试。
  - 范例：[http://127.0.0.1/index/api/startSendRtp?secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc&vhost=`__defaultVhost__`&app=live&stream=test&ssrc=1&dst_url=127.0.0.1&dst_port=10000&is_udp=0](http://127.0.0.1/index/api/startSendRtp?secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc&vhost=__defaultVhost__&app=live&stream=test&ssrc=1&dst_url=127.0.0.1&dst_port=10000&is_udp=0)

  - 参数：

    |  参数  | 是否必选 |                             释意                             |
    | :----: | :------: | :----------------------------------------------------------: |
    | secret |    Y     | api操作密钥(配置文件配置) |
    | vhost |    Y     | 虚拟主机，例如__defaultVhost__ |
    | app |    Y     | 应用名，例如 live |
    | stream |    Y     | 流id，例如 test |
    | ssrc |    Y     | 推流的rtp的ssrc,指定不同的ssrc可以同时推流到多个服务器 |
    | dst_url |    Y     | 目标ip或域名 |
    | dst_port |    Y     | 目标端口 |
    | is_udp |    Y     | 是否为udp模式,否则为tcp模式 |
    | src_port |    N     | 使用的本机端口，为0或不传时默认为随机端口 |
    | pt |    N     | 发送时，rtp的pt（uint8_t）,不传时默认为96 |
    | use_ps |    N     | 发送时，rtp的负载类型。为1时，负载为ps；为0时，为es；不传时默认为1 |
    | only_audio |    N     | 当use_ps 为0时，有效。为1时，发送音频；为0时，发送视频；不传时默认为0 |

    


  - 响应：

    ```json
    {
       "code": 0, #成功
       "local_port": 57152 #使用的本地端口号 
    }
    ```

#### 27.1 、`/index/api/startSendRtpPassive`

  - 功能：作为GB28181 Passive TCP服务器；该接口支持rtsp/rtmp等协议转ps-rtp被动推流。调用该接口，zlm会启动tcp服务器等待连接请求，连接建立后，zlm会关闭tcp服务器，然后源源不断的往客户端推流。第一次推流失败会直接返回错误，成功一次后，后续失败也将无限重试(不停地建立tcp监听，超时后再关闭)。
  - 范例：[http://127.0.0.1/index/api/startSendRtpPassive?secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc&vhost=`__defaultVhost__`&app=live&stream=test&ssrc=1](http://127.0.0.1/index/api/startSendRtpPassive?secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc&vhost=__defaultVhost__&app=live&stream=test&ssrc=1)

  - 参数：

    |  参数  | 是否必选 |                             释意                             |
    | :----: | :------: | :----------------------------------------------------------: |
    | secret |    Y     | api操作密钥(配置文件配置) |
    | vhost |    Y     | 虚拟主机，例如__defaultVhost__ |
    | app |    Y     | 应用名，例如 live |
    | stream |    Y     | 流id，例如 test |
    | ssrc |    Y     | 推流的rtp的ssrc,指定不同的ssrc可以同时推流到多个服务器 |
    | src_port |    N     | 使用的本机端口，为0或不传时默认为随机端口 |
    | pt |    N     | 发送时，rtp的pt（uint8_t）,不传时默认为96 |
    | use_ps |    N     | 发送时，rtp的负载类型。为1时，负载为ps；为0时，为es；不传时默认为1 |
    | only_audio |    N     | 当use_ps 为0时，有效。为1时，发送音频；为0时，发送视频；不传时默认为0 |

    


  - 响应：

    ```json
    {
       "code": 0, #成功
       "local_port": 57152 #使用的本地端口号 
    }
    ```


### 28、`/index/api/stopSendRtp`

  - 功能：停止GB28181 ps-rtp推流
  - 范例：[http://127.0.0.1/index/api/stopSendRtp?secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc&vhost=`__defaultVhost__`&app=live&stream=test](http://127.0.0.1/index/api/stopSendRtp?secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc&vhost=__defaultVhost__&app=live&stream=test)

  - 参数：

    |  参数  | 是否必选 |                             释意                             |
    | :----: | :------: | :----------------------------------------------------------: |
    | secret |    Y     | api操作密钥(配置文件配置) |
    | vhost |    Y     | 虚拟主机，例如__defaultVhost__ |
    | app |    Y     | 应用名，例如 live |
    | stream |    Y     | 流id，例如 test |
    | ssrc |    N     | 根据ssrc关停某路rtp推流，置空时关闭所有流 |
    


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

    |  参数  | 是否必选 |                             释意                             |
    | :----: | :------: | :----------------------------------------------------------: |
    | secret |    Y     | api操作密钥(配置文件配置) |


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

  - 功能：添加rtsp/rtmp主动推流(把本服务器的直播流推送到其他服务器去)

  - 范例：[http://127.0.0.1/index/api/addStreamPusherProxy?vhost=`__defaultVhost__`&app=proxy&stream=test&dst_url=rtmp://127.0.0.1/live/test2](http://127.0.0.1/index/api/addStreamProxy?vhost=`__defaultVhost__`&app=proxy&stream=test&dst_url=rtmp://127.0.0.1/live/test2)

  - 参数：

    |    参数     | 是否必选 |                             释意                             |
    | :---------: | :------: | :----------------------------------------------------------: |
    |   secret    |    Y     | api操作密钥(配置文件配置) |
    |    vhost    |    Y     |          添加的流的虚拟主机，例如`__defaultVhost__`          |
    |   schema    |    Y     |                    协议，例如 rtsp或rtmp                     |
    |     app     |    Y     |                  添加的流的应用名，例如live                  |
    |   stream    |    Y     |                        需要转推的流id                        |
    |   dst_url   |    Y     |              目标转推url，带参数需要自行url转义              |
    | retry_count |    N     |                转推失败重试次数，默认无限重试                |
    |  rtp_type   |    N     |        rtsp推流时，推流方式，0：tcp，1：udp                 |
    | timeout_sec |    N     |               推流超时时间，单位秒，float类型                |

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

  - 范例：[http://127.0.0.1/index/api/delStreamPusherProxy?key=rtmp/__defaultVhost__/proxy/test/4AB43C9EABEB76AB443BB8260C8B2D12](http://127.0.0.1/index/api/delStreamPusherProxy?key=rtmp/__defaultVhost__/proxy/test/4AB43C9EABEB76AB443BB8260C8B2D12)

  - 参数：

    |  参数  | 是否必选 |                             释意                             |
    | :----: | :------: | :----------------------------------------------------------: |
    | secret |    Y     | api操作密钥(配置文件配置) |
    |  key   |    Y     |              addStreamPusherProxy接口返回的key               |

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

    |  参数  | 是否必选 |                             释意                             |
    | :----: | :------: | :----------------------------------------------------------: |
    | secret |    Y     | api操作密钥(配置文件配置) |

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

  - 范例：[http://127.0.0.1:8080/index/api/getMediaPlayerList?secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc&schema=rtsp&vhost=__defaultVhost__&app=live&stream=test'](http://127.0.0.1:8080/index/api/getMediaPlayerList?secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc&schema=rtsp&vhost=__defaultVhost__&app=live&stream=test')

  - 参数：

    |  参数  | 是否必选 |                             释意                             |
    | :----: | :------: | :----------------------------------------------------------: |
    | secret |    Y     | api操作密钥(配置文件配置) |
    | schema |    Y     |                    协议，例如 rtsp或rtmp                     |
    | vhost  |    Y     |               虚拟主机，例如`__defaultVhost__`               |
    |  app   |    Y     |                      应用名，例如 live                       |
    | stream |    Y     |                        流id，例如 obs                        |
  
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
