---
title: RESTful API
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

For the POST method, parameters can be sent in either urlencoded or JSON format. 
To authenticate these API operations, the `secret` parameter needs to be provided. 

## API Response Conventions

- At the HTTP level, a unified 200 status code is returned, and the response body is always in JSON format.
- The response body generally follows the following format:

```json
{
  "code": -1,
  "msg": "Failure message"
}
```

- The `code` field represents the execution result and can have the following values:

```cpp
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
  "code": -1, // Business code execution failed
  "msg": "can not find the stream", // Failure message
  "result": -2 // Specific reason for business code execution failure
}
```

- Developers generally only need to pay attention to the `code` and `msg` fields. If `code != 0`, printing the `msg` field is sufficient.

- When `code == 0`, it represents complete success. If data is returned, it is usually provided in the `data` field.

## API Details

### 0. `/index/api/getApiList`

- Function: Get the list of APIs.

- Example:[http://127.0.0.1/index/api/getApiList](http://127.0.0.1/index/api/getApiList)

- Parameters:
  
  | Parameter | Required |                Description                 |
  | :-------: | :------: | :----------------------------------------: |
  |  secret   |    Y     | API operation key (configured in the file) |
  

- Response:

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

### 1. `/index/api/getThreadsLoad`

- Function: Get the load and delay of each epoll (or select) thread.

- Example:[http://127.0.0.1/index/api/getThreadsLoad](http://127.0.0.1/index/api/getThreadsLoad)

- Parameters:
  
  | Parameter | Required |                Description                 |
  | :-------: | :------: | :----------------------------------------: |
  |  secret   |    Y     | API operation key (configured in the file) |

- Response:

  ```json
  {
    "code": 0,
    "data": [
      {
        "delay": 0, // Delay of the thread
        "load": 0 // Load of the thread, ranging from 0 to 100
      },
      {
        "delay": 0,
        "load": 0
      }
    ]
  }
  ```

### 2. `/index/api/getWorkThreadsLoad`

- Function: Get the load and delay of each background epoll (or select) thread.

- Example:[http://127.0.0.1/index/api/getWorkThreadsLoad](http://127.0.0.1/index/api/getWorkThreadsLoad)

- Parameters:

  | Parameter | Required |                Description                 |
  | :-------: | :------: | :----------------------------------------: |
  |  secret   |    Y     | API operation key (configured in the file) |
  
- Response:

  ```json
  {
    "code": 0,
    "data": [
      {
        "delay": 0, // Delay of the thread
        "load": 0 // Load of the thread, ranging from 0 to 100
      },
      {
        "delay": 0,
        "load": 0
      }
    ]
  }
  ```

### 3. `/index/api/getServerConfig`

- Function: Get server configuration.

- Example:[http://127.0.0.1/index/api/getServerConfig](http://127.0.0.1/index/api/getServerConfig)

- Parameters:

  | Parameter | Required |                Description                 |
  | :-------: | :------: | :----------------------------------------: |
  |  secret   |    Y     | API operation key (configured in the file) |

- Response:

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

### 4. `/index/api/setServerConfig`

- Function: Set server configuration.

- Example:[http://127.0.0.1/index/api/setServerConfig?api.apiDebug=0(例如关闭 http api 调试)](http://127.0.0.1/index/api/setServerConfig?api.apiDebug=0)

- Parameters:

  | Parameter | Required |                Description                 |
  | :-------: | :------: | :----------------------------------------: |
  |  secret   |    Y     | API operation key (configured in the file) |

- Response:

  ```json
  {
    "changed": 0, // Number of configuration items changed
    "code": 0 // 0 represents success
  }
  ```

### 5. `/index/api/restartServer`

- Function:Restart the server. Only possible in Daemon mode, otherwise it will be shut down directly!

- Example:[http://127.0.0.1/index/api/restartServer](http://127.0.0.1/index/api/restartServer)

- Parameters:

  | Parameter | Required |                Description                 |
  | :-------: | :------: | :----------------------------------------: |
  |  secret   |    Y     | API operation key (configured in the file) |

- Response:

  ```json
  {
    "code": 0,
    "msg": "The server will automatically restart in one second."
  }
  ```

### 6. `/index/api/getMediaList`

- Function:Get the list of streams, with optional filtering parameters.

- Example:[http://127.0.0.1/index/api/getMediaList](http://127.0.0.1/index/api/getMediaList)

- Parameters:

  | Parameter | Required |                   Description                    |
  | :-------: | :------: | :----------------------------------------------: |
  |  secret   |    Y     |    API operation key (configured in the file)    |
  |  schema   |    N     |      Filter by protocol, e.g., rtsp or rtmp      |
  |   vhost   |    N     | Filter by virtual host, e.g., `__defaultVhost__` |
  |    app    |    N     |      Filter by application name, e.g., live      |
  |  stream   |    N     |         Filter by stream ID, e.g., test          |

- Response:

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

### 7. `/index/api/close_stream`(Deprecated, please use the `close_streams` API instead)

- Function: Close a stream (supports closing streams of all types).

- Example:[http://127.0.0.1/index/api/close_stream?schema=rtmp&vhost=`__defaultVhost__`&app=live&stream=0&force=1](http://127.0.0.1/index/api/close_stream?schema=rtmp&vhost=__defaultVhost__&app=live&stream=0&force=1)

- Parameters:

  | Parameter | Required |                     Description                      |
  | :-------: | :------: | :--------------------------------------------------: |
  |  secret   |    Y     |  API operation secret key (configured in the file)   |
  |  schema   |    Y     |             Protocol, e.g., rtsp or rtmp             |
  |   vhost   |    Y     |        Virtual host, e.g., `__defaultVhost__`        |
  |    app    |    Y     |             Application name, e.g., live             |
  |  stream   |    Y     |                Stream ID, e.g., test                 |
  |   force   |    N     | Whether to force close (even if someone is watching) |

- Response:

  ```json
  {
     "code" : 0,
     "result" : 0,  # 0: success, -1: failed to close, -2: stream does not exist
     "msg" : "success"
  }
  ```

### 8. `/index/api/close_streams`

- Function: Close a stream (supports closing streams of all types).

- Example:[http://127.0.0.1/index/api/close_streams?schema=rtmp&vhost=`__defaultVhost__`&app=live&stream=0&force=1](http://127.0.0.1/index/api/close_streams?schema=rtmp&vhost=__defaultVhost__&app=live&stream=0&force=1)

- Parameters:

  | Parameter | Required |                     Description                      |
  | :-------: | :------: | :--------------------------------------------------: |
  |  secret   |    Y     |  API operation secret key (configured in the file)   |
  |  schema   |    N     |             Protocol, e.g., rtsp or rtmp             |
  |   vhost   |    N     |        Virtual host, e.g., `__defaultVhost__`        |
  |    app    |    N     |             Application name, e.g., live             |
  |  stream   |    N     |                Stream ID, e.g., test                 |
  |   force   |    N     | Whether to force close (even if someone is watching) |

- Response:

  ```json
  {
     "code" : 0,
     "count_hit" : 1,  # Number of streams hit by the filter
     "count_closed" : 1 # Number of streams closed, which may be less than count_hit
  }
  ```

### 9. `/index/api/getAllSession`

- Function: Get a list of all TcpSessions (retrieve information about all TCP clients).

- Example:[http://127.0.0.1/index/api/getAllSession](http://127.0.0.1/index/api/getAllSession)

- Parameters:

  | Parameter  | Required |                    Description                    |
  | :--------: | :------: | :-----------------------------------------------: |
  |   secret   |    Y     | API operation secret key (configured in the file) |
  | local_port |    N     |          Filter by local port, e.g., 554          |
  |  peer_ip   |    N     |                Filter by client IP                |

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

### 10. `/index/api/kick_session`

- Function: Disconnects a TCP connection, such as an RTSP or RTMP player.

- Example:[http://127.0.0.1/index/api/kick_session?id=140614440178720](http://127.0.0.1/index/api/kick_session?id=140614440178720)

- Parameters:

| Parameter | Required |                                  Description                                  |
| :-------: | :------: | :---------------------------------------------------------------------------: |
|  secret   |    Y     |           API operation key (configured in the configuration file)            |
|    Id     |    Y     | Unique client ID, which can be obtained through the `getAllSession` interface |

- Response:

  ```json
  {
    "code": 0,
    "msg": "success"
  }
  ```

### 11. `/index/api/kick_sessions`

- Function: Disconnects TCP connections, such as RTSP or RTMP players.

- Example:[http://127.0.0.1/index/api/kick_sessions?local_port=554](http://127.0.0.1/index/api/kick_sessions?local_port=554)

- Parameters:

| Parameter  | Required |                            Description                            |
| :--------: | :------: | :---------------------------------------------------------------: |
|   secret   |    Y     |     API operation key (configured in the configuration file)      |
| local_port |    N     | Filters local ports, for example, filtering RTSP connections: 554 |
|  peer_ip   |    N     |                         Filters client IP                         |

- Response:

  ```json
  {
     "code" : 0,
     "count_hit" : 1,# Number of matched clients
     "msg" : "success"
  }
  ```

### 12. `/index/api/addStreamProxy`

Function: Dynamically add RTSP/RTMP/HLS/HTTP-TS/HTTP-FLV pull streaming proxies (only supports H264/H265/AAC/G711/Opus payloads).

- Example:[http://127.0.0.1/index/api/addStreamProxy?vhost=`__defaultVhost__`&app=proxy&stream=0&url=rtmp://live.hkstv.hk.lxdns.com/live/hks2](http://127.0.0.1/index/api/addStreamProxy?vhost=__defaultVhost__&app=proxy&stream=0&url=rtmp://live.hkstv.hk.lxdns.com/live/hks2)

- Parameters:

  |     Parameter     |   Type   |                                                   Description                                                    | Required |
  | :---------------: | :------: | :--------------------------------------------------------------------------------------------------------------: | :------: |
  |      secret       | `string` |                                          API operation key (configured)                                          |    Y     |
  |       vhost       | `string` |                           Virtual host of the added stream (e.g., `__defaultVhost__`)                            |    Y     |
  |        app        | `string` |                                Application name of the added stream (e.g., live)                                 |    Y     |
  |      stream       | `string` |                                       ID of the added stream (e.g., test)                                        |    Y     |
  |        url        | `string` |                     Stream URL for pulling (e.g., rtmp://live.hkstv.hk.lxdns.com/live/hks2)                      |    Y     |
  |    retry_count    |  `int`   |                        Number of pull retry attempts, default is -1 for unlimited retries                        |    N     |
  |     rtp_type      |  `int`   |                         RTP pulling type for RTSP streams: 0: TCP, 1: UDP, 2: Multicast                          |    N     |
  |    timeout_sec    |  `int`   |                                      Pulling timeout in seconds, float type                                      |    N     |
  |   `enable_hls`    |  `bool`  |                                    Whether to convert to HLS-MPEGTS protocol                                     |    N     |
  | `enable_hls_fmp4` |  `bool`  |                                     Whether to convert to HLS-FMP4 protocol                                      |    N     |
  |   `enable_mp4`    |  `bool`  |                                         Whether to enable MP4 recording                                          |    N     |
  |   `enable_rtsp`   |  `bool`  |                                       Whether to convert to RTSP protocol                                        |    N     |
  |   `enable_rtmp`   |  `bool`  |                                     Whether to convert to RTMP/FLV protocol                                      |    N     |
  |    `enable_ts`    |  `bool`  |                                   Whether to convert to HTTP-TS/WS-TS protocol                                   |    N     |
  |   `enable_fmp4`   |  `bool`  |                                 Whether to convert to HTTP-FMP4/WS-FMP4 protocol                                 |    N     |
  |   `hls_demand`    |  `bool`  |                            Whether the protocol generates only if someone is watching                            |    N     |
  |   `rtsp_demand`   |  `bool`  |                            Whether the protocol generates only if someone is watching                            |    N     |
  |   `rtmp_demand`   |  `bool`  |                            Whether the protocol generates only if someone is watching                            |    N     |
  |    `ts_demand`    |  `bool`  |                            Whether the protocol generates only if someone is watching                            |    N     |
  |   `fmp4_demand`   |  `bool`  |                            Whether the protocol generates only if someone is watching                            |    N     |
  |  `enable_audio`   |  `bool`  |                                     Whether to enable audio when converting                                      |    N     |
  | `add_mute_audio`  |  `bool`  |                              Whether to add silent AAC audio when there is no audio                              |    N     |
  |  `mp4_save_path`  | `string` |                       Root directory for saving MP4 recording files, use default if empty                        |    N     |
  | `mp4_max_second`  |  `int`   |                               Maximum duration of MP4 recording slices in seconds                                |    N     |
  |  `mp4_as_player`  |  `bool`  |                   Whether MP4 recording counts as a viewer for counting the number of viewers                    |    N     |
  |  `hls_save_path`  | `string` |                The root directory where the hls file is saved, leave it blank and use the default                |    N     |
  |  `modify_stamp`   |  `int`   | Whether this stream enables timestamp coverage (0: absolute timestamp/1: system timestamp/2: relative timestamp) |    N     |
  |   `auto_close`    |  `bool`  |    Whether to automatically close the stream if no one is watching it (without triggering the unwatched hook)    |    N     |

- Response:

  ```json
  {
     "code" : 0,
     "data" : {
        "key" : "__defaultVhost__/proxy/0"  # The unique identifier of the stream
     }
  }
  ```

### 13. `/index/api/delStreamProxy (Can also be replaced with the close_streams interface after successful stream registration)`

- Function: Close pull streaming proxy.

- Example:[http://127.0.0.1/index/api/delStreamProxy?key=`__defaultVhost__`/proxy/0](http://127.0.0.1/index/api/delStreamProxy?key=__defaultVhost__/proxy/0)

- Parameters:

  | Parameter | Required |                           Description                           |
  | :-------: | :------: | :-------------------------------------------------------------: |
  |  secret   |    Y     | API operation secret key (configured in the configuration file) |
  |    key    |    Y     |        The key returned by the addStreamProxy interface         |

- Response:

  ```json
  {
     "code" : 0,
     "data" : {
        "flag" : true # Success or failure
     }
  }
  ```

### 14. `/index/api/addFFmpegSource`

- Function: Pull stream proxy by forking FFmpeg process, supports any protocol.

- Example:[http://127.0.0.1/index/api/addFFmpegSource?src_url=http://live.hkstv.hk.lxdns.com/live/hks2/playlist.m3u8&dst_url=rtmp://127.0.0.1/live/hks2&timeout_ms=10000&ffmpeg_cmd_key=ffmpeg.cmd](http://127.0.0.1/index/api/addFFmpegSource?src_url=http://live.hkstv.hk.lxdns.com/live/hks2/playlist.m3u8&dst_url=rtmp://127.0.0.1/live/hks2&timeout_ms=10000&ffmpeg_cmd_key=ffmpeg.cmd)

- Parameters:

  |   Parameter    | Required |                                                                   Description                                                                    |
  | :------------: | :------: | :----------------------------------------------------------------------------------------------------------------------------------------------: |
  |     secret     |    Y     |                                         API operation secret key (configured in the configuration file)                                          |
  |    src_url     |    Y     |                          FFmpeg pulling stream address, supports any protocol or format (as long as FFmpeg supports it)                          |
  |    dst_url     |    Y     |                 FFmpeg rtmp push stream address, usually push to oneself, for example, rtmp://127.0.0.1/live/stream_from_ffmpeg                  |
  |   timeout_ms   |    Y     |                                                   Timeout for successful FFmpeg stream pushing                                                   |
  |   enable_hls   |    Y     |                                                         Whether to enable HLS recording                                                          |
  |   enable_mp4   |    Y     |                                                         Whether to enable MP4 recording                                                          |
  | ffmpeg_cmd_key |    N     | Key for FFmpeg command parameter template in the configuration file (not content), if left empty, the default template `ffmpeg.cmd` will be used |

- Response:

  ```json
  {
     "code" : 0,
     "data" : {
        "key" : "5f748d2ef9712e4b2f6f970c1d44d93a"  # Unique key
     }
  }
  ```

### 15. `/index/api/delFFmpegSource (Can also be replaced with the close_streams interface after successful stream registration)`

- Function: Close FFmpeg stream proxy.

- Example: [http://127.0.0.1/index/api/delFFmpegSource?key=5f748d2ef9712e4b2f6f970c1d44d93a](http://127.0.0.1/index/api/delFFmpegSource?key=5f748d2ef9712e4b2f6f970c1d44d93a)

- Parameters:

  | Parameter | Required |                           Description                           |
  | :-------: | :------: | :-------------------------------------------------------------: |
  |  secret   |    Y     | API operation secret key (configured in the configuration file) |
  |    key    |    Y     |        The key returned by the addFFmpegSource interface        |

- Response:

  ```json
  {
     "code" : 0,
     "data" : {
        "flag" : true # Success or failure
     }
  }
  ```

### 16. `/index/api/isMediaOnline (Deprecated, please use getMediaList API instead)`

- Function: Check if the media stream is online.

- Example:[http://127.0.0.1/index/api/isMediaOnline?schema=rtsp&vhost=`__defaultVhost__`&app=live&stream=obs](http://127.0.0.1/index/api/isMediaOnline?schema=rtsp&vhost=__defaultVhost__&app=live&stream=obs)

- Parameters:

  | Parameter | Required |              Description              |
  | :-------: | :------: | :-----------------------------------: |
  |  secret   |    Y     | API operation secret key (configured) |
  |  schema   |    Y     |     Protocol, e.g., rtsp or rtmp      |
  |   vhost   |    Y     | Virtual host, e.g., **defaultVhost**  |
  |    app    |    Y     |     Application name, e.g., live      |
  |  stream   |    Y     |         Stream ID, e.g., obs          |

  - Response:

    ```json
    {
       "code" : 0,
       "online" : true # Whether it's online
    }
    ```

### 17. `/index/api/getMediaInfo (Deprecated, please use getMediaList API instead)`

- Function: Get information about the stream.

- Example:[http://127.0.0.1/index/api/getMediaInfo?schema=rtsp&vhost=`__defaultVhost__`&app=live&stream=obs](http://127.0.0.1/index/api/getMediaInfo?schema=rtsp&vhost=__defaultVhost__&app=live&stream=obs)

- Parameters:

  | Parameter | Required |              Description              |
  | :-------: | :------: | :-----------------------------------: |
  |  secret   |    Y     | API operation secret key (configured) |
  |  schema   |    Y     |     Protocol, e.g., rtsp or rtmp      |
  |   vhost   |    Y     | Virtual host, e.g., **defaultVhost**  |
  |    app    |    Y     |     Application name, e.g., live      |
  |  stream   |    Y     |         Stream ID, e.g., obs          |

  - Response:

    ```json
    {
      "code" : 0,
      "online" : true, # Whether it's online
      "readerCount" : 0, # Number of viewers for this protocol
      "totalReaderCount" : 0, # Total number of viewers, including hls/rtsp/rtmp/http-flv/ws-flv
      "tracks" : [ # Track list
            {
               "channels" : 1, # Number of audio channels
               "codec_id" : 2, # H264 = 0, H265 = 1, AAC = 2, G711A = 3, G711U = 4
               "codec_id_name" : "CodecAAC", # Codec type name
               "codec_type" : 1, # Video = 0, Audio = 1
               "ready" : true, # Whether the track is ready
               "sample_bit" : 16, # Audio sample bit depth
               "sample_rate" : 8000 # Audio sample rate
            },
            {
               "codec_id" : 0, # H264 = 0, H265 = 1, AAC = 2, G711A = 3, G711U = 4
               "codec_id_name" : "CodecH264", #  Codec type name
               "codec_type" : 0, # Video = 0, Audio = 1
               "fps" : 59,  # Video fps
               "height" : 720, #  Video height
               "ready" : true,  # Whether the track is ready
               "width" : 1280 # Video width
            }
      ]
    }
    ```

### 18. `/index/api/getRtpInfo`

- Function: Get the RTP information of a specific SSRC when proxying RTP.

- Example:[http://127.0.0.1/index/api/getRtpInfo?stream_id=1A2B3C4D](http://127.0.0.1/index/api/getRtpInfo?ssrc=1A2B3C4D)

- Parameters:

  | Parameter | Required |                                                Description                                                |
  | :-------: | :------: | :-------------------------------------------------------------------------------------------------------: |
  |  secret   |    Y     |                             API operation secret key (configured in the file)                             |
  | stream_id |    Y     | The SSRC of RTP, in hexadecimal string or the ID of the stream (specified in the openRtpServer interface) |

- Response:

  ```json
  {
     "code" : 0,
     "exist" : true, # Whether it exists
     "peer_ip" : "192.168.0.23", #  Client IP address for streaming
     "peer_port" : 54000 # Client port
     "local_ip" : "0.0.0.0", # Local listening network card IP
     "local_port" : 10000
  }
  ```

### 19. `/index/api/getMp4RecordFile`

- Function: Search the file system to get the list of recorded files or date folders corresponding to a stream.

- Example:[http://127.0.0.1/index/api/getMp4RecordFile?vhost=`__defaultVhost__`&app=live&stream=ss&period=2020-01](http://127.0.0.1/index/api/getMp4RecordFile?vhost=__defaultVhost__&app=live&stream=ss&period=2020-01)

- Parameters:

  |    Parameter    | Required |                                                                                                  Description                                                                                                  |
  | :-------------: | :------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
  |     secret      |    Y     |                                                                               API operation secret key (configured in the file)                                                                               |
  |      vhost      |    Y     |                                                                                        Virtual host name of the stream                                                                                        |
  |       app       |    Y     |                                                                                        Application name of the stream                                                                                         |
  |     stream      |    Y     |                                                                                               ID of the stream                                                                                                |
  |     period      |    Y     | Recording date of the stream in the format "2020-02-01". If it's not a complete date, it searches for the list of recording folders. Otherwise, it searches for the list of MP4 files for the specified date. |
  | customized_path |    N     |                                      Customized search path, same as the `customized_path` in the `startRecord` method. Defaults to the path in the configuration file.                                       |

- Response:

  ```json
  # Search folder list (matching by prefix rule): period = 2020-01
  {
     "code" : 0,
     "data" : {
        "paths" : [ "2020-01-25", "2020-01-24" ],
        "rootPath" : "/www/record/live/ss/"
     }
  }

  # Search MP4 file list: period = 2020-01-24
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

### 20. `/index/api/startRecord`

- Function: Start recording in HLS or MP4 format.

- Example:[http://127.0.0.1/index/api/startRecord?type=1&vhost=`__defaultVhost__`&app=live&stream=obs](http://127.0.0.1/index/api/startRecord?type=1&vhost=__defaultVhost__&app=live&stream=obs)

- Parameters:

|    Parameter    | Required |                                         Description                                          |  Type  |
| :-------------: | :------: | :------------------------------------------------------------------------------------------: | :----: |
|     secret      |    Y     |                             API access key (configured in file)                              | string |
|      type       |    Y     |                                 0 for HLS, 1 for MP4 format                                  |  0/1   |
|      vhost      |    Y     |                            Virtual host, e.g., "**defaultVhost**"                            | string |
|       app       |    Y     |                                Application name, e.g., "live"                                | string |
|     stream      |    Y     |                                    Stream ID, e.g., "obs"                                    | string |
| customized_path |    N     |                             Directory for storing the recordings                             | string |
|   max_second    |    N     | Maximum duration of MP4 recording segments in seconds. Set to 0 to use the configured value. |  int   |

- Response:

  ```json
  {
     "code" : 0,
     "result" : true # success or failure
  }
  ```

### 21. `/index/api/stopRecord`

- Function: Stop recording the stream.

- Example:[http://127.0.0.1/index/api/stopRecord?type=1&vhost=`__defaultVhost__`&app=live&stream=obs](http://127.0.0.1/index/api/stopRecord?type=1&vhost=__defaultVhost__&app=live&stream=obs)

- Parameters:

| Parameter | Required |              Description               |
| :-------: | :------: | :------------------------------------: |
|  secret   |    Y     |  API access key (configured in file)   |
|   type    |    Y     |      0 for HLS, 1 for MP4 format       |
|   vhost   |    Y     | Virtual host, e.g., "**defaultVhost**" |
|    app    |    Y     |     Application name, e.g., "live"     |
|  stream   |    Y     |         Stream ID, e.g., "obs"         |

- Response:

  ```json
  {
     "code" : 0,
     "result" : true # success or failure
  }
  ```

### 22. `/index/api/isRecording`

- Function: Get the recording status of the stream.

- Example:[http://127.0.0.1/index/api/isRecording?type=1&vhost=`__defaultVhost__`&app=live&stream=obs](http://127.0.0.1/index/api/isRecording?type=1&vhost=__defaultVhost__&app=live&stream=obs)

- Parameters:

| Parameter | Required |              Description               |
| :-------: | :------: | :------------------------------------: |
|  secret   |    Y     |  API access key (configured in file)   |
|   type    |    Y     |      0 for HLS, 1 for MP4 format       |
|   vhost   |    Y     | Virtual host, e.g., "**defaultVhost**" |
|    app    |    Y     |     Application name, e.g., "live"     |
|  stream   |    Y     |         Stream ID, e.g., "obs"         |

- Response:

  ```json
  {
     "code" : 0,
     "status" : true # false: not recording, true: currently recording
  }
  ```

### 23. `/index/api/getSnap`

- Function: Get a screenshot or generate a real-time screenshot and return it.

- Example:[http://127.0.0.1/index/api/getSnap?url=rtmp://127.0.0.1/record/robot.mp4&timeout_sec=10&expire_sec=30](http://127.0.0.1/index/api/getSnap?url=rtmp://127.0.0.1/record/robot.mp4&timeout_sec=10&expire_sec=30)

- Parameters:

  |  Parameter  | Required |                                                  Description                                                   |
  | :---------: | :------: | :------------------------------------------------------------------------------------------------------------: |
  |   secret    |    Y     |                                   API operation secret key (configured file)                                   |
  |     url     |    Y     |                         The URL of the image to capture, which can be local or remote.                         |
  | timeout_sec |    Y     |                  Timeout for capturing the image to prevent FFmpeg from waiting indefinitely.                  |
  | expire_sec  |    Y     | Expiration time for the captured image cache. All images generated within this time will be returned as cache. |

- Response:

  ```json
  The image in JPEG format, can be directly opened in a browser.
  ```

### 24. `/index/api/openRtpServer`

- Function: Create a GB28181 RTP receiving port. If the port times out receiving data, it will be automatically released (no need to call the closeRtpServer interface).

- Example:[http://127.0.0.1/index/api/openRtpServer?port=0&tcp_mode=1&stream_id=test](http://127.0.0.1/index/api/openRtpServer?port=0&tcp_mode=1&stream_id=test)

- Parameters:

  | Parameter | Required |                                                     Description                                                      |
  | :-------: | :------: | :------------------------------------------------------------------------------------------------------------------: |
  |  secret   |    Y     |                                      API operation secret key (configured file)                                      |
  |   port    |    Y     |                               Receiving port. If set to 0, a random port will be used.                               |
  | tcp_mode  |    Y     |           0 for UDP mode, 1 for TCP passive mode, 2 for TCP active mode (compatible with enable_tcp: 0/1).           |
  | stream_id |    Y     | The stream ID bound to this port. Only this stream can be created on this port (not multiple streams based on SSRC). |

- Response:

  ```json
  {
     "code" : 0,
     "port" : 55463 # Receiving port for easy reference to the random port number.
  ```

### 25. `/index/api/closeRtpServer`

- Function: Close the GB28181 RTP receiving port.

- Example:[http://127.0.0.1/index/api/closeRtpServer?stream_id=test](http://127.0.0.1/index/api/closeRtpServer?stream_id=test)

- Parameters:

  | Parameter | Required |                         Description                          |
  | :-------: | :------: | :----------------------------------------------------------: |
  |  secret   |    Y     |          API operation secret key (configured file)          |
  | stream_id |    Y     | Stream ID provided when calling the openRtpServer interface. |

- Response:

  ```json
  {
     "code": 0,
     "hit": 1 # Whether the record was found and closed.
  }
  ```

### 26. `/index/api/listRtpServer`

- Function: Get all RTP servers created by the openRtpServer interface.

- Example:[http://127.0.0.1/index/api/listRtpServer](http://127.0.0.1/index/api/listRtpServer)

- Parameters:

  | Parameter | Required |              Description               |
  | :-------: | :------: | :------------------------------------: |
  |  secret   |    Y     | API operation key (configured in file) |

- Response:

  ```json
  {
     "code" : 0,
     "data" : [
        {
           "port" : 52183, # Bound port number
           "stream_id" : "test" # Bound stream ID
        }
     ]
  }
  ```

### 27. `/index/api/startSendRtp`

- Function: Start ps-rtp streaming as a GB28181 client, supporting rtp/udp mode. This interface supports converting protocols such as rtsp/rtmp to ps-rtp streaming. The first streaming attempt failure will return an error directly. After a successful attempt, subsequent failures will be retried indefinitely.
- Example:[http://127.0.0.1/index/api/startSendRtp?secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc&vhost=`__defaultVhost__`&app=live&stream=test&ssrc=1&dst_url=127.0.0.1&dst_port=10000&is_udp=0](http://127.0.0.1/index/api/startSendRtp?secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc&vhost=__defaultVhost__&app=live&stream=test&ssrc=1&dst_url=127.0.0.1&dst_port=10000&is_udp=0)

- Parameters:

  | Parameter  | Required |                                              Description                                               |
  | :--------: | :------: | :----------------------------------------------------------------------------------------------------: |
  |   secret   |    Y     |                                 API operation key (configured in file)                                 |
  |   vhost    |    Y     |                               Virtual host, for example **defaultVhost**                               |
  |    app     |    Y     |                                   Application name, for example live                                   |
  |   stream   |    Y     |                                      Stream ID, for example test                                       |
  |    ssrc    |    Y     |    SSRC of the RTP stream. Specifying different SSRCs can stream to multiple servers simultaneously    |
  |  dst_url   |    Y     |                                        Destination IP or domain                                        |
  |  dst_port  |    Y     |                                        Destination port number                                         |
  |   is_udp   |    Y     |                            Whether it is UDP mode, otherwise it is TCP mode                            |
  |  src_port  |    N     |                 Local port used, default to a random port if set to 0 or not provided                  |
  |     pt     |    N     |                 RTP payload type (uint8_t) when sending, default to 96 if not provided                 |
  |   use_ps   |    N     | RTP payload type when sending. Set to 1 for PS payload, 0 for ES payload. Default to 1 if not provided |
  | only_audio |    N     |   Effective when use_ps is 0. Set to 1 to send audio, 0 to send video. Default to 0 if not provided    |

- Response:

  ```json
  {
     "code": 0, # Success
     "local_port": 57152 # Local port number used
  }
  ```

#### 27.1. `/index/api/startSendRtpPassive`

- Function: Acts as a GB28181 Passive TCP server. This interface supports the conversion of protocols such as RTSP/RTMP to PS-RTP for passive streaming. When calling this interface, zlm will start a TCP server and wait for connection requests. After the connection is established, zlm will close the TCP server and continuously stream to the client. If the first streaming attempt fails, an error will be returned directly. Once successful, subsequent failures will be retried indefinitely (continuously establishing TCP listening and closing after timeout).
- Example: [http://127.0.0.1/index/api/startSendRtpPassive?secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc&vhost=**defaultVhost**&app=live&stream=test&ssrc=1](http://127.0.0.1/index/api/startSendRtpPassive?secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc&vhost=__defaultVhost__&app=live&stream=test&ssrc=1)

- Parameters:

  | Parameters | Required |                                                 Description                                                 |
  | :--------: | :------: | :---------------------------------------------------------------------------------------------------------: |
  |   secret   |    Y     |                              API operation secret key (configured in the file)                              |
  |   vhost    |    Y     |                                 Virtual host, for example, **defaultVhost**                                 |
  |    app     |    Y     |                                     Application name, for example, live                                     |
  |   stream   |    Y     |                                        Stream ID, for example, test                                         |
  |    ssrc    |    Y     |   SSRC of the RTP stream, specifying different SSRCs allows streaming to multiple servers simultaneously    |
  |  src_port  |    N     |                      Local port used; defaults to a random port if 0 or not specified                       |
  |     pt     |    N     |                     PT (uint8_t) for RTP when sending; defaults to 96 if not specified                      |
  |   use_ps   |    N     | Payload type for RTP when sending. If 1, payload is PS; if 0, payload is ES; defaults to 1 if not specified |
  | only_audio |    N     |      Valid when use_ps is 0. If 1, audio is sent; if 0, video is sent; defaults to 0 if not specified       |

- Response:

  ```json
  {
     "code": 0, # Success
     "local_port": 57152 # Local port number used
  }
  ```

### 28. `/index/api/stopSendRtp`

- Function: Stops GB28181 PS-RTP push streaming.
- Example: [http://127.0.0.1/index/api/stopSendRtp?secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc&vhost=**defaultVhost**&app=live&stream=test](http://127.0.0.1/index/api/stopSendRtp?secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc&vhost=__defaultVhost__&app=live&stream=test)

- Parameters:

  | Parameters | Required |                              Description                              |
  | :--------: | :------: | :-------------------------------------------------------------------: |
  |   secret   |    Y     |           API operation secret key (configured in the file)           |
  |   vhost    |    Y     |              Virtual host, for example, **defaultVhost**              |
  |    app     |    Y     |                  Application name, for example, live                  |
  |   stream   |    Y     |                     Stream ID, for example, test                      |
  |    ssrc    |    N     | Stop RTP streaming for a specific SSRC, or close all streams if empty |

- Response:

  ```json
  {
     "code": 0 # Success
  }
  ```

### 29. `/index/api/getStatistic`

- Function: Get statistics on the number of main objects, mainly used for analyzing memory performance.
- Example:[http://127.0.0.1/index/api/getStatistic?secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc](http://127.0.0.1/index/api/getStatistic?secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc)

- Parameters:

| Parameter | Required |                Description                 |
| :-------: | :------: | :----------------------------------------: |
|  secret   |    Y     | API operation key (configured in the file) |

- Response:

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

### 30. `/index/api/addStreamPusherProxy`

- Function: Add active RTSP/RTMP stream pusher (push the live stream from this server to another server).

- Example:[http://127.0.0.1/index/api/addStreamPusherProxy?vhost=`__defaultVhost__`&app=proxy&stream=test&dst_url=rtmp://127.0.0.1/live/test2](http://127.0.0.1/index/api/addStreamProxy?vhost=`__defaultVhost__`&app=proxy&stream=test&dst_url=rtmp://127.0.0.1/live/test2)

- Parameters:

|  Parameter  | Required |                                 Description                                  |
| :---------: | :------: | :--------------------------------------------------------------------------: |
|   secret    |    Y     |                  API operation key (configured in the file)                  |
|    vhost    |    Y     |      Virtual host of the added stream, for example, `__defaultVhost__`       |
|   schema    |    Y     |                         Protocol, e.g., rtsp or rtmp                         |
|     app     |    Y     |               Application name of the added stream, e.g., live               |
|   stream    |    Y     |                            Stream ID to be pushed                            |
|   dst_url   |    Y     | Destination push URL, if it contains parameters, they need to be URL-encoded |
| retry_count |    N     |              Retry count for failed push, unlimited by default               |
|  rtp_type   |    N     |                Pushing method for RTSP stream, 0: TCP, 1: UDP                |
| timeout_sec |    N     |                     Push timeout in seconds, float type                      |

- Response:

  ```json
  {
     "code" : 0,
     "data" : {
        "key" : "rtmp/__defaultVhost__/proxy/test/4AB43C9EABEB76AB443BB8260C8B2D12"  # Unique identifier of the stream
     }
  }
  ```

### 31. `/index/api/delStreamPusherProxy(可以使用close_streams接口关闭源直播流也可以停止推流)`

- Function: Close the stream pushing.

- Example:[http://127.0.0.1/index/api/delStreamPusherProxy?key=rtmp/**defaultVhost**/proxy/test/4AB43C9EABEB76AB443BB8260C8B2D12](http://127.0.0.1/index/api/delStreamPusherProxy?key=rtmp/__defaultVhost__/proxy/test/4AB43C9EABEB76AB443BB8260C8B2D12)

- Parameters:

  | Parameter | Required |                     Explanation                      |
  | :-------: | :------: | :--------------------------------------------------: |
  |  secret   |    Y     |            API operation key (configured)            |
  |    key    |    Y     | Key returned by the 'addStreamPusherProxy' interface |

- Response:

  ```json
  {
     "code" : 0,
     "data" : {
        "flag" : true # Success or failure
     }
  }
  ```

### 32. `/index/api/version(获取版本信息)`

- Function: Get version information, such as branch, commit ID, and build time.

- Example:[http://127.0.0.1/index/api/version](http://127.0.0.1/index/api/version)

- Parameters:

  | Parameter | Required |          Explanation           |
  | :-------: | :------: | :----------------------------: |
  |  secret   |    Y     | API operation key (configured) |

- Response:

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

### 33. `/index/api/getMediaPlayerList`

- Function: Get the list of viewers for a specific stream.

- Example:[http://127.0.0.1:8080/index/api/getMediaPlayerList?secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc&schema=rtsp&vhost=**defaultVhost**&app=live&stream=test'](http://127.0.0.1:8080/index/api/getMediaPlayerList?secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc&schema=rtsp&vhost=__defaultVhost__&app=live&stream=test')

- Parameters:

  | Parameter | Required |              Explanation               |
  | :-------: | :------: | :------------------------------------: |
  |  secret   |    Y     |     API operation key (configured)     |
  |  schema   |    Y     |      Protocol, e.g., rtsp or rtmp      |
  |   vhost   |    Y     | Virtual host, e.g., '**defaultVhost**' |
  |    app    |    Y     |      Application name, e.g., live      |
  |  stream   |    Y     |          Stream ID, e.g., obs          |

- Response:

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
