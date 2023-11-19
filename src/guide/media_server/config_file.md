---
title: Configuration File Explanation
---
```ini
#!!!! This configuration file is an example configuration file intended to inform the reader about the specific meanings and functions of each configuration item.
#!!!! When executing cmake, this configuration file will be copied to the release/${operating_system_type}/${build_type} (e.g., release/linux/Debug) folder.
#!!!! This folder (release/${operating_system_type}/${build_type}) is also the target path for generating executable programs. When executing the MediaServer process, it will default to load the config.ini file in the same directory as the configuration file.
#!!!! If you modify this example configuration file (conf/config.ini), it will not be loaded by the MediaServer process because the MediaServer process defaults to loading release/${operating_system_type}/${build_type}/config.ini.
#!!!! Of course, every time you execute cmake, this file will indeed be copied to release/${operating_system_type}/${build_type}/config.ini,
#!!!! but it is generally recommended that you directly modify the release/${operating_system_type}/${build_type}/config.ini file. Modifying this file generally does not take effect unless you use the -c parameter to specify this file when running MediaServer.

[api]
# Whether to debug the HTTP API. When enabled, it will print the content and response of each HTTP request.
apiDebug=1
# Some sensitive HTTP APIs require a secret for access. If accessing through 127.0.0.1, the secret can be omitted.
secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc
# Root directory for saving screenshots generated and obtained through the HTTP API (/index/api/getSnap).
snapRoot=./www/snap/
# Default snapshot image. When FFmpeg is started for screenshotting but the screenshot has not been generated yet, the default preset image can be returned.
defaultSnap=./www/logo.png

[ffmpeg]
# Path to the FFmpeg executable program, supports relative or absolute paths.
bin=/usr/bin/ffmpeg
# Command template for pulling and pushing streams with FFmpeg. This template allows setting some parameters for re-encoding.
cmd=%s -re -i %s -c:a aac -strict -2 -ar 44100 -ab 48k -c:v libx264 -f flv %s
# Command for generating snapshots with FFmpeg. The configuration can be modified to change the resolution or quality of the snapshots.
snap=%s -i %s -y -f mjpeg -frames:v 1 %s
# Path for FFmpeg logs. Leaving it empty will disable FFmpeg logging.
# It can be a relative path (relative to the executable program directory) or an absolute path.
log=./ffmpeg/ffmpeg.log
# Automatic restart time (in seconds), default is 0, which means no automatic restart. It is mainly used to avoid synchronization issues caused by long-term FFmpeg pulling of streams.
restart_sec=0

# Switches related to protocol conversion; if the addStreamProxy API and on_publish hook response do not specify the protocol conversion parameters, these configuration items will be used.
[protocol]
# When converting protocols, whether to enable frame-level timestamp overlay.
# 0: Use the absolute timestamp of the source video stream without any changes.
# 1: Use the system timestamp when receiving data in ZLMediaKit (smoothed processing).
# 2: Use the relative timestamp (increment) of the source video stream, with timestamp jump and rollback correction.
modify_stamp=2
# Whether to enable audio during protocol conversion.
enable_audio=1
# Add silent audio (ACC) when audio is disabled. This switch is invalid when audio is closed.
add_mute_audio=1
# Whether to directly close when there are no viewers (instead of returning close through the on_none_reader hook).
# When this configuration is set to 1, if there are no viewers for this stream, the on_none_reader hook callback will not be triggered,
# but the stream will be closed directly.
auto_close=0

# After a push is disconnected, it can reconnect and continue pushing within the timeout period, so that the player can continue playing.
# Set it to 0 to disable this feature (disconnection of the push will immediately disconnect the player).
# This parameter should not exceed the player's timeout period; unit: milliseconds.
continue_push_ms=15000

# Whether to enable conversion to HLS (MPEG-TS).
enable_hls=1
# Whether to enable conversion to HLS (fMP4).
enable_hls_fmp4=0
# Whether to enable MP4 recording.
enable_mp4=0
# Whether to enable conversion to RTSP/WebRTC.
enable_rtsp=1
# Whether to enable conversion to RTMP/FLV.
enable_rtmp=1
# Whether to enable conversion to HTTP-TS/WS-TS.
enable_ts=1
# Whether to enable conversion to HTTP-fMP4/WS-fMP4
enable_fmp4=1

# Whether to treat mp4 recording as a player
mp4_as_player=0
# Maximum duration of mp4 segments in seconds
mp4_max_second=3600
# Path to save mp4 recordings
mp4_save_path=./www

# Path to save hls recordings
hls_save_path=./www

###### The following are protocol conversion switches. When testing the receiving and streaming performance of ZLMediaKit, please set the switches below to 1.
###### If you don't need a certain protocol, you can set the corresponding switch to 1 to save resources (but it can still be played, although the experience for the first player may be slightly worse),
###### If you want the best user experience for a certain protocol, please set the switch to 0 (the first player can start instantly without screen flickering).
# Whether to generate hls protocol on-demand. If hls.segNum is configured as 0 (meaning hls recording), hls will always be generated regardless of this switch.
hls_demand=0
# Whether to generate rtsp[s] protocol on-demand
rtsp_demand=0
# Whether to generate rtmp[s], http[s]-flv, ws[s]-flv protocols on-demand
rtmp_demand=0
# Whether to generate http[s]-ts protocol on-demand
ts_demand=0
# Whether to generate http[s]-fmp4, ws[s]-fmp4 protocols on-demand
fmp4_demand=0

[general]
# Whether to enable virtual hosting
enableVhost=0
# The hook.on_flow_report event will be triggered when a player or pusher is disconnected, indicating the amount of traffic used.
# The flowThreshold parameter controls the threshold for triggering the hook.on_flow_report event. It will only be triggered when the traffic usage exceeds this threshold, in kilobytes.
flowThreshold=1024
# Maximum waiting time for playback, in milliseconds.
# When playing a stream, if the stream does not exist,
# ZLMediaKit will allow the player to wait for a maximum of maxStreamWaitMS milliseconds.
# If the stream is successfully registered within this time, playback will start immediately.
# Otherwise, the player will receive a response indicating that the stream was not found. This mechanism allows playback before pushing the stream.
maxStreamWaitMS=15000
# Maximum waiting time for triggering the hook.on_stream_none_reader event when a stream has no viewers, in milliseconds.
# In conjunction with the hook.on_stream_none_reader event, it can automatically stop pulling or receiving streams when there are no viewers.
streamNoneReaderDelayMS=20000
# When replaying a stream agent, whether to delete the previous media stream data after successful reconnection.
# If deleted, the playback will start from the beginning;
# if not deleted, it will continue writing from where it left off (for HLS/MP4 recording, it will continue writing at the end of the previous file).
resetWhenRePlay=1
# Merge write buffer size in milliseconds. Merging write means that the server caches a certain amount of data before writing it to the socket at once, which can improve performance but increases latency.
# When enabled, TCP_NODELAY will be disabled and MSG_MORE will be enabled.
mergeWriteMS=0
# Unique ID of the server, used to differentiate which server triggers the hook event.
mediaServerId=your_server_id

# Maximum waiting time for uninitialized tracks, in milliseconds. After the timeout, uninitialized tracks will be ignored.
wait_track_ready_ms=10000
# If a stream has only one track, maximum waiting time in milliseconds. If no data from other tracks is received after the timeout, it will be considered a single-track stream.
# This waiting time is not applicable if the protocol metadata declares a specific number of tracks.
wait_add_track_ms=3000
# If a track is not ready, we cache frame data, but with a maximum number of frames to prevent memory overflow.
unready_frame_cache=100

[hls]
# Buffer size for writing HLS files, adjusting this parameter can improve file I/O performance
fileBufSize=65536
# Maximum duration of HLS segments
segDur=2
# Number of retained segments in the m3u8 index (typically 2-3 segments more than actually retained)
# If set to 0, segments will not be deleted and will be saved for on-demand playback
segNum=3
# Number of segments retained on disk after being removed from the m3u8 file
segRetain=5
# Whether to broadcast a notification when HLS segments (ts/fmp4) are completed (on_record_ts)
broadcastRecordTs=0
# Delay for deleting live HLS files, in seconds, issue: #913
deleteDelaySec=10
# Whether to retain HLS files. This function is partially equivalent to segNum=0,
# but the retained files will not be reflected in the m3u8 file.
# 0 means not retaining, not effective
# 1 means retaining, HLS files will not be deleted. If this function is enabled, be aware of disk size or manually clean up HLS files regularly.
segKeep=0

[hook]
# Whether to enable hook events, when enabled, both pulling and pushing streams require authentication
enable=0
# Traffic event used by player or streamer, leave blank to disable
on_flow_report=https://127.0.0.1/index/hook/on_flow_report
# HTTP file access authentication event, leave blank to disable authentication
on_http_access=https://127.0.0.1/index/hook/on_http_access
# Playback authentication event, leave blank to disable authentication
on_play=https://127.0.0.1/index/hook/on_play
# Publishing authentication event, leave blank to disable authentication
on_publish=https://127.0.0.1/index/hook/on_publish
# Recording of mp4 segments completed event
on_record_mp4=https://127.0.0.1/index/hook/on_record_mp4
# Recording of hls ts (or fmp4) segments completed event
on_record_ts=https://127.0.0.1/index/hook/on_record_ts
# RTSP playback authentication event, in this event, RTSP username and password are compared
on_rtsp_auth=https://127.0.0.1/index/hook/on_rtsp_auth
# Whether to enable exclusive RTSP authentication event, leave blank to disable RTSP authentication.
# RTSP playback authentication also supports authentication through URL.
# It is recommended to use URL parameter authentication uniformly.
# After enabling exclusive RTSP authentication, on_play authentication event will no longer be triggered.
on_rtsp_realm=https://127.0.0.1/index/hook/on_rtsp_realm
# Remote telnet debugging authentication event
on_shell_login=https://127.0.0.1/index/hook/on_shell_login
# Live stream registration or deregistration event
on_stream_changed=https://127.0.0.1/index/hook/on_stream_changed
# Filter the protocol types of on_stream_changed hook, you can choose to only listen to certain interested protocols; leave blank to not filter protocols
stream_changed_schemas=rtsp/rtmp/fmp4/ts/hls/hls.fmp4
# Event for streams with no viewers, through this event, you can choose to close streams with no viewers. Use together with general.streamNoneReaderDelayMS option.
on_stream_none_reader=https://127.0.0.1/index/hook/on_stream_none_reader
# Event for stream not found during playback, by combining with hook.on_stream_none_reader event, on-demand streaming can be achieved
on_stream_not_found=https://127.0.0.1/index/hook/on_stream_not_found
# Server startup report, can be used to listen for server crash and restart events
on_server_started=https://127.0.0.1/index/hook/on_server_started
# Server exit report, triggered when the server exits normally
on_server_exited=https://127.0.0.1/index/hook/on_server_exited
# Server keep-alive report
on_server_keepalive=https://127.0.0.1/index/hook/on_server_keepalive
# Callback when sending rtp (startSendRtp) is stopped passively
on_send_rtp_stopped=https://127.0.0.1/index/hook/on_send_rtp_stopped
# RTP server timeout, no data received
on_rtp_server_timeout=https://127.0.0.1/index/hook/on_rtp_server_timeout

# Maximum waiting time for hook API response, in seconds
timeoutSec=10
# Interval for keepalive hook triggering, in seconds, float type
alive_interval=10.0
# Number of retries for failed hook notifications, positive integer. 0 means no retries, 1 means retry once, and so on
retry=1
# Hook notification failure retry delay, in seconds, float type
retry_delay=3.0

[cluster]
# Set the template for the source stream URL, similar to printf format. The first %s specifies the app, and the second %s specifies the stream_id.
# The on_stream_not_found and on_stream_none_reader hooks will be invalid when the cluster mode is enabled.
# The following types are supported for source tracing:
# rtmp: rtmp://127.0.0.1:1935/%s/%s
# rtsp: rtsp://127.0.0.1:554/%s/%s
# hls: http://127.0.0.1:80/%s/%s/hls.m3u8
# http-ts: http://127.0.0.1:80/%s/%s.live.ts
# Multiple source URLs are supported, and different URLs are separated by semicolons (;)
origin_url=
# Total timeout duration for source tracing, in seconds, float type. If there are 3 source URLs, the timeout for each trace will be timeout_sec divided by 3.
# The timeout for each trace should not exceed the general.maxStreamWaitMS configuration.
timeout_sec=15
# Number of retries for source tracing failure. Set to -1 for unlimited retries.
retry_count=3

[http]
# HTTP server character encoding. Default is gb2312 on Windows.
charSet=utf-8
# HTTP connection timeout
keepAliveSecond=30
# Maximum number of bytes for the HTTP request body. If the POST body is too large, it is not suitable to cache the body in memory.
maxReqSize=40960
# 404 page content. Users can customize the 404 page.
# notFound = <html><head><title>404 Not Found</title></head><body bgcolor="white"><center><h1>The resource you requested does not exist!</h1></center><hr><center>ZLMediaKit-4.0</center></body></html>
# HTTP server listening port
port=80
# Root directory for the HTTP file server.
# It can be a relative path (relative to the executable program directory) or an absolute path.
rootPath=./www
# Read file cache size for the HTTP file server, in bytes. Adjusting this parameter can optimize file I/O performance.
sendBufSize=65536
# HTTPS server listening port
sslport=443
# Whether to display the folder menu. Enabling this allows browsing of folders.
dirMenu=1
# Virtual directories. Separate virtual directory names and file paths with commas (,). Separate multiple configurations with semicolons (;).
# For example, if assigned as app_a,/path/to/a;app_b,/path/to/b, then
# accessing http://127.0.0.1/app_a/file_a corresponds to the file path /path/to/a/file_a
# accessing http://127.0.0.1/app_b/file_b corresponds to the file path /path/to/b/file_b
# Accessing other HTTP paths will correspond to file paths within rootPath.
virtualPath=
# Disable mmap caching for files with specified file extensions. Separate extensions with commas (,).
# For example, if assigned as .mp4,.flv, then files with .mp4 and .flv extensions will not be cached.
forbidCacheSuffix=
# You can put the real client IP before the HTTP proxy in the HTTP header: https://github.com/ZLMediaKit/ZLMediaKit/issues/1388
# Do not expose this key, as it may cause client IP forgery.
forwarded_ip_header=
# Allow all cross-origin requests by default
allow_cross_domains=1
# IP address whitelist for accessing HTTP API and HTTP file indexing. Leave it empty for no restrictions.
allow_ip_range=::1,127.0.0.1,172.16.0.0-172.31.255.255,192.168.0.0-192.168.255.255,10.0.0.0-10.255.255.255

[multicast]
# The maximum multicast IP address for RTP multicast
addrMax=239.255.255.255
# The minimum multicast IP address for RTP multicast
addrMin=239.0.0.0
# Multicast UDP TTL
udpTTL=64

[record]
# Application name for MP4 recording or MP4 on-demand. Restricting the application name can prevent arbitrary on-demand requests.
# On-demand files must be placed in this folder.
appName=record
# MP4 recording file write buffer size in bytes. Adjusting this parameter can improve file I/O performance.
fileBufSize=65536
# Amount of data streamed per request for MP4 on-demand, in milliseconds.
# Reducing this value can make the streaming data smoother, while increasing it conserves CPU resources.
sampleMS=500
# Whether to write a secondary keyframe index into the header after MP4 recording is completed.
fastStart=0
# Whether to loop play the MP4 file for MP4 on-demand (rtsp/rtmp/http-flv/ws-flv).
fileRepeat=0

[rtmp]
# The RTMP handshake must be completed within this time, otherwise the server will disconnect the connection. Measured in seconds.
handshakeSecond=15
# RTMP timeout. If no data is received from the client within this time,
# or if the TCP send buffer exceeds this time, the connection will be disconnected. Measured in seconds.
keepAliveSecond=15
# RTMP server listening port.
port=1935
# RTMPS server listening address.
sslport=0

[rtp]
# Audio Maximum Transmission Unit (MTU) size. This parameter limits the maximum number of bytes in RTP packets. It is recommended not to exceed 1400.
# Increasing this value will significantly increase the latency of the live stream.
audioMtuSize=600
# Video Maximum Transmission Unit (MTU) size. This parameter limits the maximum number of bytes in RTP packets. It is recommended not to exceed 1400.
videoMtuSize=1400
# Maximum length limit of RTP packets, in kilobytes. It is mainly used to identify incorrect RTP packets when TCP context is disrupted.
rtpMaxSize=10
# When packaging RTP, the low-latency switch. It is disabled by default (set to 0). In the case of H.264 where one frame contains multiple slices (NAL units), enabling this may cause screen flickering.
lowLatency=0
# Whether to use the stap-a mode for H.264 RTP packetization (for compatibility with older versions of browsers) or to use the Single NAL unit packet per H.264 mode.
# Some older RTSP devices do not support stap-a RTP. Setting this configuration to 0 can improve compatibility.
h264_stap_a=1

[rtp_proxy]
# Export debug data (including rtp/ps/h264) to this directory, leave blank to disable data export
dumpDir=
# UDP and TCP proxy servers, support rtp (must be ts or ps type) proxy
port=10000
# rtp timeout in seconds
timeoutSec=15
# Random port range, ensuring a minimum of 36 ports
# This range also limits the udp port range of the rtsp server
port_range=30000-35000
# pt for rtp h264 payload
h264_pt=98
# pt for rtp h265 payload
h265_pt=99
# pt for rtp ps payload
ps_pt=96
# pt for rtp opus payload
opus_pt=100
# Whether to enable RtpSender's gop cache optimization for instant play experience, enabled by default
# Set to 0 to save memory if startSendRtp related interfaces are not called
gop_cache=1

[rtc]
# rtc play and publish timeout in seconds
timeoutSec=15
# The visible IP of this machine to rtc clients, usually the public IP when acting as a server, can have multiple IPs separated by ','
# Also supports environment variables starting with '$', such as "$EXTERN_IP"; please refer to: https://github.com/ZLMediaKit/ZLMediaKit/pull/1786
externIP=
# rtc udp server listening port, all rtc clients will transmit stun/dtls/srtp/srtcp data through this port
# This port is multi-threaded and supports connection migration due to client network switching
# Note that if the server is inside NAT and needs port mapping, the external mapped port must be consistent with this port
port=8000
# rtc tcp server listening port, in case udp is not available, tcp will be used to transmit data
# This port is multi-threaded and supports connection migration due to client network switching
# Note that if the server is inside NAT and needs port mapping, the external mapped port must be consistent with this port
tcpPort = 8000
# Set the remb bit rate, when non-zero, twcc is turned off and remb is turned on. This setting is effective for rtc publishing and can control the streaming quality
# Currently, twcc automatic bitrate adjustment has been implemented and remb is closed to adjust the bitrate according to the real network conditions
rembBitRate=0
# Supported audio codec types for rtc, higher priority in front
# The following example includes all supported audio codecs
preferredCodecA=PCMU,PCMA,opus,mpeg4-generic
# Supported video codec types for rtc, higher priority in front
# The following example includes all supported video codecs
preferredCodecV=H264,H265,AV1,VP9,VP8

[srt]
# srt play and publish timeout in seconds
timeoutSec=5
# srt udp server listening port, all srt clients will transmit srt data through this port
# This port is multi-threaded and supports connection migration due to client network switching
port=9000
# Estimation parameter for latency cache in srt protocol, estimating rtt in handshake stage, then latencyMul*rtt becomes the maximum cache duration
# The larger this parameter, the longer the waiting time for retransmission
latencyMul=4
# Packet buffer size
pktBufSize=8192


[rtsp]
# Whether to use base64 or md5 for rtsp specific authentication
authBasic=0
# Whether the rtsp pull and push proxy is in direct proxy mode
# When in direct proxy mode, it supports any encoding format, but it will cause the GOP cache unable to locate the I frame, which may cause screen flickering when starting broadcasting
# And if it is pulling with tcp, if rtp is larger than mtu, it will not be able to use udp proxy
# Suppose your pull source address is not 264 or 265 or AAC, then you can use direct proxy mode to support rtsp proxy
# If you are doing rtsp push and pull, but playing with webrtc, it is also recommended to disable direct proxy mode,
# because when in direct proxy mode, there may be no sps pps in rtp, which will prevent webrtc from playing; in addition, webrtc does not support Single NAL Unit Packets type rtp
# Direct proxy mode for rtsp is enabled by default, rtmp is forced to enable direct proxy mode because it doesn't have these issues
directProxy=1
# The rtsp handshake must be completed within this time, otherwise the server will disconnect the connection, in seconds
handshakeSecond=15
# rtsp timeout, if no data is received from the client within this time,
# or if the tcp send buffer exceeds this time, the connection will be disconnected, in seconds
keepAliveSecond=15
# RTSP server listening address
port=554
# RTSPS server listening address
sslport=0
# Whether to use low latency mode for RTSP forwarding. When enabled, RTP packets will not be cached, improving concurrency and reducing the latency of one frame.
lowLatency=0
# Force negotiation of RTP transmission method (0: TCP, 1: UDP, 2: MULTICAST, -1: no restriction)
# When the client initiates an RTSP SETUP and the transport type is inconsistent with this configuration, return 461 Unsupported transport
# Force the client to re-SETUP and switch to the corresponding protocol. Currently supported by FFMPEG and VLC.
rtpTransportType=-1
[shell]
# Maximum buffer size for receiving requests from the telnet server in debug mode
maxReqSize=1024
# Telnet server listening port in debug mode
port=0
```
You can also refer to [HTTP-HOOK-API](web_hook_api.md) Supported by MediaServer for configuration related to hooks.

