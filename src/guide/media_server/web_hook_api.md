---
title: Web Hook Interface
---

## Web Hook Preview
MediaServer can notify certain internal events through HTTP POST to a third-party HTTP server. The following are the relevant default configurations:

```ini
[hook]
enable=1
admin_params=secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc
timeoutSec=10

on_flow_report=https://127.0.0.1/index/hook/on_flow_report
on_http_access=https://127.0.0.1/index/hook/on_http_access
on_play=https://127.0.0.1/index/hook/on_play
on_publish=https://127.0.0.1/index/hook/on_publish
on_record_mp4=https://127.0.0.1/index/hook/on_record_mp4
on_rtsp_auth=https://127.0.0.1/index/hook/on_rtsp_auth
on_rtsp_realm=https://127.0.0.1/index/hook/on_rtsp_realm
on_shell_login=https://127.0.0.1/index/hook/on_shell_login
on_stream_changed=https://127.0.0.1/index/hook/on_stream_changed
on_stream_none_reader=https://127.0.0.1/index/hook/on_stream_none_reader
on_stream_not_found=https://127.0.0.1/index/hook/on_stream_not_found
on_server_started=https://127.0.0.1/index/hook/on_server_started
on_server_keepalive=https://127.0.0.1/index/hook/on_server_keepalive
on_rtp_server_timeout=https://127.0.0.1/index/hook/on_rtp_server_timeout
```

If it is an authentication event and the access IP is `127.0.0.1`, or the authentication URL parameter matches `admin_params`, the authentication will be successful directly (without triggering the authentication web hook).

You can also refer to this [issue](https://github.com/zlmediakit/ZLMediaKit/issues/71).

## Explanation
### 1. enable :

- Explanation:

  Whether to enable HTTP hook. If disabled, ZLMediaKit will take default actions (e.g., no authentication).

### 2. timeoutSec:

- Explanation:

  Timeout for triggering the event and sending the HTTP POST.

### 3. admin_params:

- Explanation:

   URL parameters for the super administrator. If the visitor's URL parameters match this, no authentication will be required for RTSP/RTMP/HLS/HTTP-FLV/WS-FLV playback or publishing. This option is for developer debugging.

### 4. on_flow_report:

- Explanation:

  Traffic statistics event. This event is triggered when a player or publisher disconnects and has consumed traffic exceeding a specific threshold defined in the configuration file `general.flowThreshold`. This event does not require a response.

- Request Trigger：

  ```http
  POST /index/hook/on_flow_report HTTP/1.1
  Accept: */*
  Accept-Language: zh-CN,zh;q=0.8
  Connection: keep-alive
  Content-Length: 298
  Content-Type: application/json
  Host: 127.0.0.1
  Tools: ZLMediaKit
  User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36
  
  {
     "mediaServerId" : "your_server_id",
     "app" : "live",
     "duration" : 6,
     "params" : "token=1677193e-1244-49f2-8868-13b3fcc31b17",
     "player" : false,
     "schema" : "rtmp",
     "stream" : "obs",
     "totalBytes" : 1508161,
     "vhost" : "__defaultVhost__",
     "ip" : "192.168.0.21",
     "port" : 55345,
     "id" : "140259799100960"
  }
  ```
- Request Parameters：

  | Parameter Name | Parameter Type |         Parameter Explanation         |
  | :------------: | :------------: | :----------------------------------: |
  |     `app`      |    `string`    |           Stream application          |
  |  `duration`    |     `int`      |      Duration of TCP connection       |
  |   `params`     |    `string`    |        URL parameters for stream      |
  |   `player`     |    `bool`      |   `true` for player, `false` for publisher  |
  |   `schema`     |    `string`    | Protocol of playback or publishing (e.g., rtsp, rtmp, http) |
  |   `stream`     |    `string`    |               Stream ID               |
  | `totalBytes`   |     `int`      | Total consumed upstream and downstream traffic in bytes |
  |    `vhost`     |    `string`    |           Stream virtual host          |
  |      `ip`      |    `string`    |            Client's IP address         |
  |     `port`     |     `int`      |           Client's port number         |
  |      `id`      |    `string`    |         Unique ID of TCP connection    |
  | `mediaServerId`|    `string`    | Server ID set in the configuration file |

  

- Default Response：

  ```http
  HTTP/1.1 200 OK
  Connection: keep-alive
  Content-Length: 40
  Content-Type: application/json; charset=utf-8
  Date: Fri, Sep 20 2019 07:09:32 GMT
  Keep-Alive: timeout=10, max=100
  Server: ZLMediaKit-4.0
  
  {
     "code" : 0,
     "msg" : "success"
  }
  
  ```



### 5. on_http_access：

- Explanation:

   Triggered when accessing files on the http file server other than HLS.

- Trigger request：

  ```http
  POST /index/hook/on_http_access HTTP/1.1
  Accept: */*
  Accept-Language: zh-CN,zh;q=0.8
  Connection: keep-alive
  Content-Length: 583
  Content-Type: application/json
  Host: 127.0.0.1
  Tools: ZLMediaKit
  User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36
  
  {
     "mediaServerId" : "your_server_id",
     "header.Accept" : "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
     "header.Accept-Encoding" : "gzip, deflate",
     "header.Accept-Language" : "en-US,en;q=0.5",
     "header.Cache-Control" : "max-age=0",
     "header.Connection" : "keep-alive",
     "header.Host" : "10.0.17.132",
     "header.Upgrade-Insecure-Requests" : "1",
     "header.User-Agent" : "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:62.0) Gecko/20100101 Firefox/62.0",
     "id" : "140259799100960",
     "ip" : "10.0.17.132",
     "is_dir" : true,
     "params" : "",
     "path" : "/live/",
     "port" : 65073
  }
  
  ```

- Request parameters：

  |  Parameter Name  |   Parameter Type    |         Parameter Description          |
  | :--------------: | :-----------------: | :------------------------------------: |
  |   `header.*`     |      `string`       |      HTTP client request headers       |
  |      `id`        |      `string`       |          Unique TCP connection ID       |
  |      `ip`        |      `string`       |           HTTP client IP address        |
  |    `is_dir`      |       `bool`        |   Indicates whether the path is a file or directory in the HTTP request |
  |    `params`      |      `string`       |         HTTP URL parameters             |
  |     `path`       |      `string`       |       Requested file or directory       |
  |     `port`       | `unsigned short`    |       HTTP client port number           |
  | `mediaServerId`  |      `string`       |    Server ID set through configuration file |
  
- Default response:

  ```http
  HTTP/1.1 200 OK
  Connection: keep-alive
  Content-Length: 68
  Content-Type: application/json; charset=utf-8
  Date: Fri, Sep 20 2019 07:27:01 GMT
  Keep-Alive: timeout=10, max=100
  Server: ZLMediaKit-4.0
  
  {
     "code" : 0,
     "err" : "",
     "path" : "",
     "second" : 600
  }
  
  ```

- Response parameter details：

   |  Parameter Name  |   Parameter Type    |                Parameter Description                |
  | :--------------: | :-----------------: | :-------------------------------------------------: |
  |     `code`       |      `int`          |                  Always return 0                    |
  |      `err`       |      `string`       |    Error message for disallowed access, leave empty for allowed access |
  |     `path`       |      `string`       |       The top-level directory that the client can access or is forbidden to access. If it's an empty string, it represents the current directory |
  |    `second`      |      `int`          |         Validity period of the authorization result for this request, in seconds |
  | `mediaServerId`  |      `string`       |    Server ID set through configuration file |
  



### 6. on_play：

- Explanation:

  Player authentication event triggered for rtsp/rtmp/http-flv/ws-flv/hls playback. This event is triggered for playback of streams. If the stream does not exist, the on_play event is triggered first, followed by the on_stream_not_found event. When playing an rtsp stream, if the stream has started rtsp-specific authentication (on_rtsp_realm), the on_play event will not be triggered.
  
- Trigger request:

  ```http
  POST /index/hook/on_play HTTP/1.1
  Accept: */*
  Accept-Language: zh-CN,zh;q=0.8
  Connection: keep-alive
  Content-Length: 189
  Content-Type: application/json
  Host: 127.0.0.1
  Tools: ZLMediaKit
  User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36
  
  {
     "mediaServerId" : "your_server_id",
     "app" : "live",
     "id" : "140574554588960",
     "ip" : "10.0.17.132",
     "params" : "",
     "port" : 65217,
     "schema" : "rtmp",
     "stream" : "obs",
     "vhost" : "__defaultVhost__"
  }
  
  ```
  
- Request parameters:

  |  Parameter Name  |   Parameter Type    |                 Parameter Description                 |
  | :--------------: | :-----------------: | :---------------------------------------------------: |
  |      `app`       |      `string`       |                  Stream application name               |
  |      `id`        |      `string`       |              Unique TCP connection ID                  |
  |      `ip`        |      `string`       |                  Player IP address                     |
  |    `params`      |      `string`       |                Playback URL parameters                 |
  |     `port`       | `unsigned short`    |                Player port number                      |
  |    `schema`      |      `string`       | Playback protocol, which can be rtsp, rtmp, or http    |
  |    `stream`      |      `string`       |                      Stream ID                         |
  |    `vhost`       |      `string`       |                   Stream virtual host                  |
  | `mediaServerId`  |      `string`       |    Server ID set through configuration file |
  
- Default response:

  ```http
  HTTP/1.1 200 OK
  Connection: keep-alive
  Content-Length: 40
  Content-Type: application/json; charset=utf-8
  Date: Fri, Sep 20 2019 07:41:21 GMT
  Keep-Alive: timeout=10, max=100
  Server: ZLMediaKit-4.0
  
  {
     "code" : 0,
     "msg" : "success"
  }
  
  ```
  
- Response parameter details:

  |  Parameter Name  |   Parameter Type    |                Parameter Description                |
  | :--------------: | :-----------------: | :-------------------------------------------------: |
  |     `code`       |      `int`          |          Error code, 0 means playback allowed         |
  |      `msg`       |      `string`       |            Error message when playback is not allowed            |
  



### 7. on_publish：

- Explanation:

   RTSP/RTMP/RTP streaming authentication event.
- Trigger request:

  ```http
  POST /index/hook/on_publish HTTP/1.1
  Accept: */*
  Accept-Language: zh-CN,zh;q=0.8
  Connection: keep-alive
  Content-Length: 231
  Content-Type: application/json
  Host: 127.0.0.1
  Tools: ZLMediaKit
  User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36
  
  {
     "mediaServerId" : "your_server_id",
     "app" : "live",
     "id" : "140186529001776",
     "ip" : "10.0.17.132",
     "params" : "token=1677193e-1244-49f2-8868-13b3fcc31b17",
     "port" : 65284,
     "schema" : "rtmp",
     "stream" : "obs",
     "vhost" : "__defaultVhost__"
  }
  
  ```
  
- Request parameters:

  | Parameter Name |   Parameter Type   |               Parameter Description                |
  | :------------: | :----------------: | :-----------------------------------------------: |
  |     `app`      |      `string`      |              Name of the streaming app              |
  |      `id`      |      `string`      |               Unique ID for TCP connection               |
  |      `ip`      |      `string`      |               IP address of the streaming device               |
  |    `params`    |      `string`      |             Parameters for the streaming URL             |
  |     `port`     | `unsigned short` |             Port number of the streaming device             |
  |    `schema`    |      `string`      |      Protocol for streaming, possibly RTSP or RTMP      |
  |    `stream`    |      `string`      |                       Stream ID                       |
  |    `vhost`     |      `string`      |                    Stream virtual host                    |
  | `mediaServerId` |      `string`      | Server ID set through configuration file |
  
- Default response:

  ```http
  HTTP/1.1 200 OK
  Connection: keep-alive
  Content-Length: 89
  Content-Type: application/json; charset=utf-8
  Date: Fri, Sep 20 2019 07:46:43 GMT
  Keep-Alive: timeout=10, max=100
  Server: ZLMediaKit-4.0
  
  {
   "code" : 0,
   "add_mute_audio" : true,
   "continue_push_ms" : 10000,
   "enable_audio" : true,
   "enable_fmp4" : true,
   "enable_hls" : true,
   "enable_hls_fmp4" : false,
   "enable_mp4" : false,
   "enable_rtmp" : true,
   "enable_rtsp" : true,
   "enable_ts" : true,
   "hls_save_path" : "/hls_save_path/",
   "modify_stamp" : false,
   "mp4_as_player" : false,
   "mp4_max_second" : 3600,
   "mp4_save_path" : "/mp4_save_path/",
   "auto_close" : false,
   "stream_replace" : ""
  }
  
  ```
  
- Response parameter details:

   |  Parameter Name   | Parameter Type |                     Parameter Description                      | Required |
  | :---------------: | :------------: | :----------------------------------------------------------: | :------: |
  |     `code`        |    `int`     |                  Error code, 0 means allowed to stream                  |    Y     |
  |     `msg`         |   `string`   |               Error message when streaming is not allowed               |    Y     |
  |  `enable_hls`     |    `bool`    |              Whether to convert to HLS-MPEGTS protocol              |    N     |
  | `enable_hls_fmp4` |    `bool`    |               Whether to convert to HLS-FMP4 protocol               |    N     |
  |   `enable_mp4`    |    `bool`    |                       Whether to allow MP4 recording                        |    N     |
  |   `enable_rtsp`   |    `bool`    |                        Whether to convert to RTSP protocol                        |    N     |
  |   `enable_rtmp`   |    `bool`    |                      Whether to convert to RTMP/FLV protocol                      |    N     |
  |    `enable_ts`    |    `bool`    |                   Whether to convert to HTTP-TS/WS-TS protocol                   |    N     |
  |   `enable_fmp4`   |    `bool`    |                 Whether to convert to HTTP-FMP4/WS-FMP4 protocol                  |    N     |
  |   `hls_demand`    |    `bool`    |                Whether the protocol generates only when someone is watching                |    N     |
  |   `rtsp_demand`   |    `bool`    |                Whether the protocol generates only when someone is watching                |    N     |
  |   `rtmp_demand`   |    `bool`    |                Whether the protocol generates only when someone is watching                |    N     |
  |    `ts_demand`    |    `bool`    |                Whether the protocol generates only when someone is watching                |    N     |
  |   `fmp4_demand`   |    `bool`    |                Whether the protocol generates only when someone is watching                |    N     |
  |  `enable_audio`   |    `bool`    |                 Whether to enable audio when converting protocols                 |    N     |
  | `add_mute_audio`  |    `bool`    |            Whether to add silent AAC audio when converting protocols             |    N     |
  |  `mp4_save_path`  |   `string`   |            Root directory for saving MP4 recording files, use default if empty             |    N     |
  | `mp4_max_second`  |    `int`     |                 MP4 recording segment size in seconds                  |    N     |
  |  `mp4_as_player`  |    `bool`    |            Whether to count MP4 recording as viewers in playback count             |    N     |
  |  `hls_save_path`  |   `string`   |            Root directory for saving HLS files, use default if empty             |    N     |
  |  `modify_stamp`   |    `int`     |    Whether the stream enables timestamp overlay (0: absolute timestamp / 1: system timestamp / 2: relative timestamp)     |    N     |
  | `continue_push_ms` |   `uint32`   |   Delay in milliseconds for continuous reconnection, use default value from configuration file if empty   |    N     |
  |   `auto_close`    |    `bool`    |        Whether to automatically close the stream when no one is watching (without triggering the no-viewer hook)         |    N     |
  | `stream_replace`  |   `string`   |    Whether to modify the stream ID, customizing thestream ID through this parameter (e.g., replacing SSRC)    |    N     |
### 8、on_record_mp4:

- Explanation:

  Notify event after completing the recording of the mp4 file; this event is not sensitive to replies.

- Trigger request:

  ```http
  POST /index/hook/on_record_mp4 HTTP/1.1
  Accept: */*
  Accept-Language: zh-CN,zh;q=0.8
  Connection: keep-alive
  Content-Length: 473
  Content-Type: application/json
  Host: 127.0.0.1
  Tools: ZLMediaKit
  User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36
  
  {
     "mediaServerId" : "your_server_id",
     "app" : "live",
     "file_name" : "15-53-02.mp4",
     "file_path" : "/root/zlmediakit/httpRoot/__defaultVhost__/record/live/obs/2019-09-20/15-53-02.mp4",
     "file_size" : 1913597,
     "folder" : "/root/zlmediakit/httpRoot/__defaultVhost__/record/live/obs/",
     "start_time" : 1568965982,
     "stream" : "obs",
     "time_len" : 11.0,
     "url" : "record/live/obs/2019-09-20/15-53-02.mp4",
     "vhost" : "__defaultVhost__"
  }
  ```
  
- Request parameters:

  | Parameter Name | Parameter Type |      Parameter Description      |
  | :------------: | :------------: | :----------------------------: |
  |     `app`      |    `string`    |        Name of the recorded stream application        |
  |  `file_name`   |    `string`    |               File name               |
  |  `file_path`   |    `string`    |           Absolute file path           |
  |  `file_size`   |     `int`      |         File size in bytes          |
  |    `folder`    |    `string`    |        Directory path of the file         |
  | `start_time`   |     `int`      |         Start time of the recording (timestamp)         |
  |    `stream`    |    `string`    |             Recorded stream ID              |
  |  `time_len`    |    `float`     |        Recording duration in seconds         |
  |     `url`      |    `string`    |   Relative URL path for http/rtsp/rtmp playback    |
  |    `vhost`     |    `string`    |             Stream virtual host              |
  | `mediaServerId`|    `string`    |   Server ID set through the configuration file   |
  
- Default response:

  ```http
  HTTP/1.1 200 OK
  Connection: keep-alive
  Content-Length: 40
  Content-Type: application/json; charset=utf-8
  Date: Fri, Sep 20 2019 07:53:13 GMT
  Keep-Alive: timeout=10, max=100
  Server: ZLMediaKit-4.0
  
  {
     "code" : 0,
     "msg" : "success"
  }
  ```
  



### 9、on_rtsp_realm：

- Explanation:

  Whether the RTSP stream enables authentication using the RTSP-specific method, and only triggers the `on_rtsp_auth` event when enabled. It should be noted that RTSP also supports URL parameter authentication, which supports two authentication methods.

- Trigger request:

  ```http
  POST /index/hook/on_rtsp_realm HTTP/1.1
  Accept: */*
  Accept-Language: zh-CN,zh;q=0.8
  Connection: keep-alive
  Content-Length: 189
  Content-Type: application/json
  Host: 127.0.0.1
  Tools: ZLMediaKit
  User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36
  
  {
     "mediaServerId" : "your_server_id",
     "app" : "live",
     "id" : "140553560034336",
     "ip" : "10.0.17.132",
     "params" : "",
     "port" : 65473,
     "schema" : "rtsp",
     "stream" : "obs",
     "vhost" : "__defaultVhost__"
  }
  ```
  
- Request parameters:

  | Parameter Name |  Parameter Type  |     Parameter Description     |
  | :------------: | :--------------: | :---------------------------: |
  |     `app`      |    `string`      |         Stream application name         |
  |      `id`      |    `string`      |        Unique ID of the TCP connection       |
  |      `ip`      |    `string`      |        RTSP player IP address        |
  |    `params`    |    `string`      |         Parameters of the RTSP URL          |
  |     `port`     | `unsigned short` |       RTSP player port number       |
  |    `schema`    |    `string`      |          RTSP or RTSPS          |
  |    `stream`    |    `string`      |              Stream ID               |
  |    `vhost`     |    `string`      |           Stream virtual host            |
  | `mediaServerId`|    `string`      |   Server ID set through the configuration file   |
  
- Default response:

  ```http
  HTTP/1.1 200 OK
  Connection: keep-alive
  Content-Length: 51
  Content-Type: application/json; charset=utf-8
  Date: Fri, Sep 20 2019 08:05:49 GMT
  Keep-Alive: timeout=10, max=100
  Server: ZLMediaKit-4.0
  
  {
     "code" : 0,
     "realm" : "zlmediakit_reaml"
  }
  
  ```
  
- Response parameter details:

  | Parameter Name | Parameter Type |                  Parameter Description                  |
  | :------------: | :------------: | :----------------------------------------------------: |
  |    `code`      |     `int`      |                   Please return 0                   |
  |    `realm`     |    `string`    | Whether the RTSP stream requires RTSP-specific authentication, an empty string means no authentication is needed |
  



### 10、on_rtsp_auth：

- Explanation:

  The authentication events specific to RTSP are triggered in the following sequence: first, the `on_rtsp_realm` event is triggered, followed by the `on_rtsp_auth` event.

- Trigger request:

  ```http
  POST /index/hook/on_rtsp_auth HTTP/1.1
  Accept: */*
  Accept-Language: zh-CN,zh;q=0.8
  Connection: keep-alive
  Content-Length: 274
  Content-Type: application/json
  Host: 127.0.0.1
  Tools: ZLMediaKit
  User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36
  
  {
     "mediaServerId" : "your_server_id",
     "app" : "live",
     "id" : "140553560034336",
     "ip" : "10.0.17.132",
     "must_no_encrypt" : false,
     "params" : "",
     "port" : 65473,
     "realm" : "zlmediakit_reaml",
     "schema" : "rtsp",
     "stream" : "obs",
     "user_name" : "test",
     "vhost" : "__defaultVhost__"
  }
  
  ```
  
- Request parameters:

  |   Parameter Name   |  Parameter Type  |                  Parameter Explanation                  |
  | :----------------: | :--------------: | :-----------------------------------------------------: |
  |       `app`        |     `string`     |                    Application name                     |
  |        `id`        |     `string`     |                  Unique ID for TCP connection           |
  |        `ip`        |     `string`     |                IP address of the RTSP player             |
  | `must_no_encrypt`  |      `bool`      |     Indicates whether the requested password must be plaintext (Base64 authentication requires plaintext password) |
  |      `params`      |     `string`     |                  RTSP URL parameters                     |
  |       `port`       | `unsigned short` |               Port number of the RTSP player             |
  |      `realm`       |     `string`     |              RTSP authentication encryption realm        |
  |      `schema`      |     `string`     |                   RTSP or RTSPS                          |
  |      `stream`      |     `string`     |                       Stream ID                          |
  |    `user_name`     |     `string`     |                   Playback username                      |
  |      `vhost`       |     `string`     |                   Stream virtual host                    |
  |  `mediaServerId`   |     `string`     |        Server ID, set through the configuration file      |
  
- Default response:

  ```http
  HTTP/1.1 200 OK
  Connection: keep-alive
  Content-Length: 61
  Content-Type: application/json; charset=utf-8
  Date: Fri, Sep 20 2019 08:05:49 GMT
  Keep-Alive: timeout=10, max=100
  Server: ZLMediaKit-4.0
  
  {
     "code" : 0,
     "encrypted" : false,
     "passwd" : "test"
  }
  
  ```
  
- Response parameter details:

  |  Parameter Name  | Parameter Type |             Parameter Explanation             |
  | :-------------: | :------------: | :------------------------------------------: |
  |     `code`      |     `int`      |       Error code, 0 means allowed to play      |
  |     `msg`       |    `string`    |    Error message when playback authentication fails   |
  |   `encrypted`   |     `bool`     |         Indicates whether the user password is plaintext or digest     |
  |    `passwd`     |    `string`    | User password plaintext or digest (md5(username:realm:password)) |
  
  

### 11、on_shell_login：

- Explanation:

    Shell login authentication, ZLMediaKit provides a simple telnet debugging method. Use `telnet 127.0.0.1 9000` to access the shell interface of the MediaServer process.

- Trigger request:

  ```http
  POST /index/hook/on_shell_login HTTP/1.1
  Accept: */*
  Accept-Language: zh-CN,zh;q=0.8
  Connection: keep-alive
  Content-Length: 124
  Content-Type: application/json
  Host: 127.0.0.1
  Tools: ZLMediaKit
  User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36
  
  {
     "mediaServerId" : "your_server_id",
     "id" : "140227419332496",
     "ip" : "10.0.17.132",
     "passwd" : "111111",
     "port" : 49242,
     "user_name" : "xzl"
  }
  ```
  
- Request parameters:

  |  Parameter Name  |  Parameter Type  |     Parameter Explanation      |
  | :-------------: | :--------------: | :----------------------------: |
  |      `id`       |     `string`     |       Unique ID for TCP connection        |
  |      `ip`       |     `string`     |         Telnet terminal IP          |
  |    `passwd`     |      `bool`      |    Telnet terminal login password   |
  |     `port`      | `unsigned short` |      Telnet terminal port number        |
  |  `user_name`    |     `string`     |    Telnet terminal login username  |
  |  `mediaServerId` |     `string` |  Server ID, set through the configuration file  |
  
- Default response:

  ```http
  HTTP/1.1 200 OK
  Connection: keep-alive
  Content-Length: 40
  Content-Type: application/json; charset=utf-8
  Date: Fri, Sep 20 2019 08:23:00 GMT
  Keep-Alive: timeout=10, max=100
  Server: ZLMediaKit-4.0
  
  {
     "code" : 0,
     "msg" : "success"
  }
  ```
  
- Response parameter details:

  | Parameter Name | Parameter Type |           Parameter Explanation           |
  | :-----------: | :------------: | :---------------------------------------: |
  |    `code`     |     `int`      |      Error code, 0 means allowed to login telnet      |
  |    `msg`      |    `string`    | Error message when login telnet is not allowed |
  



### 12、on_stream_changed:

- Explanation:

   This event is triggered when an RTSP/RTMP stream is registered or unregistered. This event does not require a response.

- Trigger request:
  - When unregistering:
  ```http
  POST /index/hook/on_stream_changed HTTP/1.1
  Accept: */*
  Accept-Language: zh-CN,zh;q=0.8
  Connection: keep-alive
  Content-Length: 118
  Content-Type: application/json
  Host: 127.0.0.1
  Tools: ZLMediaKit
  User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36
  
  {
     "mediaServerId" : "your_server_id",
     "app" : "live",
     "regist" : false,
     "schema" : "rtsp",
     "stream" : "obs",
     "vhost" : "__defaultVhost__"
  }
  ```
  - When registering：
    ```http
    POST /index/hook/on_stream_changed HTTP/1.1
    Accept: */*
    Accept-Language: zh-CN,zh;q=0.8
    Connection: keep-alive
    Content-Length: 118
    Content-Type: application/json
    Host: 127.0.0.1
    Tools: ZLMediaKit
    User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36
    
    {
        "regist" : true,
        "aliveSecond": 0, #存活时间，单位秒
        "app": "live", # 应用名
        "bytesSpeed": 0, #数据产生速度，单位byte/s
        "createStamp": 1617956908,  #GMT unix系统时间戳，单位秒
        "mediaServerId": "your_server_id", # 服务器id
        "originSock": {
            "identifier": "000001C257D35E40",
            "local_ip": "172.26.20.112", # 本机ip
            "local_port": 50166, # 本机端口
            "peer_ip": "172.26.20.112", # 对端ip
            "peer_port": 50155 # 对端port
        },
        "originType": 8,  # 产生源类型，包括 unknown = 0,rtmp_push=1,rtsp_push=2,rtp_push=3,pull=4,ffmpeg_pull=5,mp4_vod=6,device_chn=7,rtc_push=8
        "originTypeStr": "rtc_push",
        "originUrl": "", #产生源的url
        "readerCount": 0, # 本协议观看人数
        "schema": "rtsp", # 协议
        "stream": "test",  # 流id
        "totalReaderCount": 0, # 观看总人数，包括hls/rtsp/rtmp/http-flv/ws-flv/rtc
        "tracks": [{
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
        }],
        "vhost": "__defaultVhost__"
    }
    ```
  
- Request parameters:

  |  Parameter Name  | Parameter Type |     Parameter Explanation      |
  | :-------------: | :------------: | :----------------------------: |
  |     `app`      |    `string`    |        Application name         |
  |   `regist`     |     `bool`     |      Stream registration or unregistration    |
  |   `schema`     |    `string`    |          RTSP or RTMP           |
  |   `stream`     |    `string`    |            Stream ID            |
  |    `vhost`     |    `string`    |         Stream virtual host      |
  |  `mediaServerId` |     `string` |  Server ID, set through the configuration file  |
  
- Default response:

  ```http
  HTTP/1.1 200 OK
  Connection: keep-alive
  Content-Length: 40
  Content-Type: application/json; charset=utf-8
  Date: Fri, Sep 20 2019 08:27:35 GMT
  Keep-Alive: timeout=10, max=100
  Server: ZLMediaKit-4.0
  
  {
     "code" : 0,
     "msg" : "success"
  }
  ```
  
  
  

### 13、on_stream_none_reader：

- Explanation:

  When there is no audience watching the stream, users can choose to close the stream without viewership through this event. 

  If a live stream comes online and no one watches it, it will trigger an event of no viewership. The protocol schema triggered during this event is random and based on the latest registered protocol (usually HLS). 

  When transitioning from viewership to no viewership, the protocol schema triggered will be the one used by the last viewer.

  Currently, MP4/HLS recordings are not considered as viewership. The MP4 recording can be controlled through the 
 configuration file parameter "mp4_as_player," but RTSP/RTMP/RTP forwarding is counted as viewership and will also trigger this event.

- Trigger request:

  ```http
  POST /index/hook/on_stream_none_reader HTTP/1.1
  Accept: */*
  Accept-Language: zh-CN,zh;q=0.8
  Connection: keep-alive
  Content-Length: 98
  Content-Type: application/json
  Host: 127.0.0.1
  Tools: ZLMediaKit
  User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36
  
  {
     "mediaServerId" : "your_server_id",
     "app" : "live",
     "schema" : "rtmp",
     "stream" : "obs",
     "vhost" : "__defaultVhost__"
  }
  ```
  
- Request parameters:

  | Parameter Name | Parameter Type | Parameter Explanation |
  | :------------: | :------------: | :-------------------: |
  |     `app`      |    `string`    |     Stream App Name   |
  |   `schema`     |    `string`    |   RTSP or RTMP        |
  |   `stream`     |    `string`    |        Stream ID      |
  |    `vhost`     |    `string`    |     Stream Virtual Host  |
  | `mediaServerId` |    `string`    |  Server ID, set through the configuration file |

- Default response:

  ```http
  HTTP/1.1 200 OK
  Connection: keep-alive
  Content-Length: 37
  Content-Type: application/json; charset=utf-8
  Date: Fri, Sep 20 2019 08:51:23 GMT
  Keep-Alive: timeout=10, max=100
  Server: ZLMediaKit-4.0
  
  {
     "close" : true,
     "code" : 0
  }
  ```
  
- Response parameter details:

  | Parameter Name | Parameter Type | Parameter Explanation |
  | :------------: | :------------: | :-------------------: |
  |    `code`      |     `int`      |     Please return 0   |
  |   `close`      |    `bool`      |  Whether to close the stream or not  |
  



### 14、on_stream_not_found：

- Explanation:

    When a stream is not found, users can immediately pull the stream when this event is triggered, allowing Pulling Streams on Demand. This event is not sensitive to replies.

- Trigger request:

  ```http
  POST /index/hook/on_stream_not_found HTTP/1.1
  Accept: */*
  Accept-Language: zh-CN,zh;q=0.8
  Connection: keep-alive
  Content-Length: 189
  Content-Type: application/json
  Host: 127.0.0.1
  Tools: ZLMediaKit
  User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36
  
  {
     "mediaServerId" : "your_server_id",
     "app" : "live",
     "id" : "140183261486112",
     "ip" : "10.0.17.132",
     "params" : "",
     "port" : 49614,
     "schema" : "rtsp",
     "stream" : "obs",
     "vhost" : "__defaultVhost__"
  }
  ```
  
- Request parameters:

  | Parameter Name | Parameter Type |      Parameter Explanation      |
  | :------------: | :------------: | :-----------------------------: |
  |     `app`      |    `string`    |          Stream App Name         |
  |      `id`      |    `string`    |       Unique TCP Connection ID   |
  |      `ip`      |    `string`    |          Player IP Address       |
  |    `params`    |    `string`    |       Player URL Parameters      |
  |     `port`     | `unsigned short` |         Player Port Number       |
  |    `schema`    |    `string`    |   Protocol for playback, possibly RTSP or RTMP  |
  |    `stream`    |    `string`    |             Stream ID            |
  |    `vhost`     |    `string`    |          Stream Virtual Host     |
  | `mediaServerId`|    `string`    |  Server ID, set through the configuration file |

- Default response:

  ```http
  HTTP/1.1 200 OK
  Connection: keep-alive
  Content-Length: 51
  Content-Type: application/json; charset=utf-8
  Date: Fri, Sep 20 2019 08:55:49 GMT
  Keep-Alive: timeout=10, max=100
  Server: ZLMediaKit-4.0
  
  {
     "code" : 0,
     "msg" : "success
  }
  ```
  



### 15、on_server_started
- Explanation:

    Server startup event, can be used to monitor server crashes and restarts. This event is not sensitive to replies.

- Trigger request:

  ```http
  POST /index/hook/on_server_started HTTP/1.1
  Accept: */*
  Accept-Language: zh-CN,zh;q=0.8
  Connection: keep-alive
  Content-Length: 3096
  Content-Type: application/json
  Host: 127.0.0.1
  Tools: ZLMediaKit
  User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36
  
  {
     "api.apiDebug" : "1",
     "api.secret" : "035c73f7-bb6b-4889-a715-d9eb2d1925cc",
     "ffmpeg.bin" : "/usr/local/bin/ffmpeg",
     "ffmpeg.cmd" : "%s -re -i %s -c:a aac -strict -2 -ar 44100 -ab 48k -c:v libx264 -f flv %s",
     "ffmpeg.log" : "./ffmpeg/ffmpeg.log",
     "general.mediaServerId" : "your_server_id",
     "general.addMuteAudio" : "1",
     "general.enableVhost" : "1",
     "general.flowThreshold" : "1024",
     "general.maxStreamWaitMS" : "5000",
     "general.publishToHls" : "1",
     "general.publishToMP4" : "0",
     "general.publishToRtxp" : "1",
     "general.resetWhenRePlay" : "1",
     "general.streamNoneReaderDelayMS" : "5000",
     "general.ultraLowDelay" : "1",
     "hls.fileBufSize" : "65536",
     "hls.filePath" : "./httpRoot",
     "hls.segDur" : "2",
     "hls.segNum" : "3",
     "hls.segRetain" : "5",
     "hook.admin_params" : "secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc",
     "hook.enable" : "1",
     "hook.on_flow_report" : "https://127.0.0.1/index/hook/on_flow_report",
     "hook.on_http_access" : "https://127.0.0.1/index/hook/on_http_access",
     "hook.on_play" : "https://127.0.0.1/index/hook/on_play",
     "hook.on_publish" : "https://127.0.0.1/index/hook/on_publish",
     "hook.on_record_mp4" : "https://127.0.0.1/index/hook/on_record_mp4",
     "hook.on_rtsp_auth" : "https://127.0.0.1/index/hook/on_rtsp_auth",
     "hook.on_rtsp_realm" : "https://127.0.0.1/index/hook/on_rtsp_realm",
     "hook.on_server_started" : "http://127.0.0.1/index/hook/on_server_started",
     "hook.on_shell_login" : "https://127.0.0.1/index/hook/on_shell_login",
     "hook.on_stream_changed" : "https://127.0.0.1/index/hook/on_stream_changed",
     "hook.on_stream_none_reader" : "https://127.0.0.1/index/hook/on_stream_none_reader",
     "hook.on_stream_not_found" : "https://127.0.0.1/index/hook/on_stream_not_found",
     "hook.timeoutSec" : "10",
     "http.charSet" : "utf-8",
     "http.keepAliveSecond" : "15",
     "http.maxReqCount" : "100",
     "http.maxReqSize" : "4096",
     "http.notFound" : "<html><head><title>404 Not Found</title></head><body bgcolor=\"white\"><center><h1>您访问的资源不存在</h1></center><hr><center>ZLMediaKit-4.0</center></body></html>",
     "http.port" : "80",
     "http.rootPath" : "./httpRoot",
     "http.sendBufSize" : "65536",
     "http.sslport" : "443",
     "multicast.addrMax" : "239.255.255.255",
     "multicast.addrMin" : "239.0.0.0",
     "multicast.udpTTL" : "64",
     "record.appName" : "record",
     "record.fastStart" : "0",
     "record.fileBufSize" : "65536",
     "record.filePath" : "./httpRoot",
     "record.fileRepeat" : "0",
     "record.fileSecond" : "3600",
     "record.sampleMS" : "500",
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
     "rtsp.directProxy" : "1",
     "rtsp.handshakeSecond" : "15",
     "rtsp.keepAliveSecond" : "15",
     "rtsp.modifyStamp" : "0",
     "rtsp.port" : "554",
     "rtsp.sslport" : "322",
     "shell.maxReqSize" : "1024",
     "shell.port" : "9000"
  }
  ```
  
- Request parameters:
  json object of configuration file

- Default response:

  ```http
  HTTP/1.1 200 OK
  Connection: keep-alive
  Content-Length: 51
  Content-Type: application/json; charset=utf-8
  Date: Fri, Sep 20 2019 08:55:49 GMT
  Keep-Alive: timeout=10, max=100
  Server: ZLMediaKit-4.0
  
  {
     "code" : 0,
     "msg" : "success
  }
  ```

### 16、on_server_keepalive

- Explanation:

    The server periodically reports time, which can be configured. The default interval is 10 seconds.

- Trigger request:

    ```http
    POST /index/hook/on_server_keepalive HTTP/1.1
    Accept: */*
    Accept-Language: zh-CN,zh;q=0.8
    Connection: keep-alive
    Content-Length: 189
    Content-Type: application/json
    Host: 127.0.0.1
    Tools: ZLMediaKit
    User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36
    
    {
       "data" : {
          "Buffer" : 12,
          "BufferLikeString" : 0,
          "BufferList" : 0,
          "BufferRaw" : 12,
          "Frame" : 0,
          "FrameImp" : 0,
          "MediaSource" : 0,
          "MultiMediaSourceMuxer" : 0,
          "RtmpPacket" : 0,
          "RtpPacket" : 0,
          "Socket" : 108,
          "TcpClient" : 0,
          "TcpServer" : 96,
          "TcpSession" : 0,
          "UdpServer" : 12,
          "UdpSession" : 0
       },
       "mediaServerId" : "192.168.255.10"
    }
    ```
### 17、on_rtp_server_timeout

- Explanation:

    When calling the `openRtpServer` interface, if the RTP server does not receive data for a long time, this webhook will be executed. It is not sensitive to replies.

- 触发请求

    ```http
    POST /index/hook/on_rtp_server_timeout HTTP/1.1
    Accept: */*
    Accept-Language: zh-CN,zh;q=0.8
    Connection: keep-alive
    Content-Length: 189
    Content-Type: application/json
    Host: 127.0.0.1
    Tools: ZLMediaKit
    User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36
    
    {
       "local_port" : 0,
       "re_use_port" : true,
       "ssrc" : 0,
       "stream_id" : "test",
       "tcp_mode" : 0,
       "mediaServerId" : "192.168.255.10"
    }
- Request parameters:

  | Parameter Name | Parameter Type |      Parameter Explanation      |
  | :------------: | :------------: | :-----------------------------: |
  | `local_port`   |      `int`     |   Parameter input for `openRtpServer` |
  | `re_use_port`  |     `bool`     |   Parameter input for `openRtpServer` |
  |     `ssrc`     |    `uint32`    |   Parameter input for `openRtpServer` |
  |  `stream_id`   |    `string`    |   Parameter input for `openRtpServer` |
  |   `tcp_mode`   |      `int`     |   Parameter input for `openRtpServer` |
  | `mediaServerId`|    `string`    |  Server ID, set through the configuration file |
