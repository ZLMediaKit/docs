import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as a,o as t,c as i,a as l,d as n,b as o,w as c,e as p}from"./app-RP31lnfq.js";const r={},m=p(`<div class="language-ini line-numbers-mode" data-ext="ini"><pre class="language-ini"><code><span class="token comment">#!!!! This configuration file is an example configuration file intended to inform the reader about the specific meanings and functions of each configuration item.</span>
<span class="token comment">#!!!! When executing cmake, this configuration file will be copied to the release/\${operating_system_type}/\${build_type} (e.g., release/linux/Debug) folder.</span>
<span class="token comment">#!!!! This folder (release/\${operating_system_type}/\${build_type}) is also the target path for generating executable programs. When executing the MediaServer process, it will default to load the config.ini file in the same directory as the configuration file.</span>
<span class="token comment">#!!!! If you modify this example configuration file (conf/config.ini), it will not be loaded by the MediaServer process because the MediaServer process defaults to loading release/\${operating_system_type}/\${build_type}/config.ini.</span>
<span class="token comment">#!!!! Of course, every time you execute cmake, this file will indeed be copied to release/\${operating_system_type}/\${build_type}/config.ini,</span>
<span class="token comment">#!!!! but it is generally recommended that you directly modify the release/\${operating_system_type}/\${build_type}/config.ini file. Modifying this file generally does not take effect unless you use the -c parameter to specify this file when running MediaServer.</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">api</span><span class="token punctuation">]</span></span>
<span class="token comment"># Whether to debug the HTTP API. When enabled, it will print the content and response of each HTTP request.</span>
<span class="token key attr-name">apiDebug</span><span class="token punctuation">=</span><span class="token value attr-value">1</span>
<span class="token comment"># Some sensitive HTTP APIs require a secret for access. If accessing through 127.0.0.1, the secret can be omitted.</span>
<span class="token key attr-name">secret</span><span class="token punctuation">=</span><span class="token value attr-value">035c73f7-bb6b-4889-a715-d9eb2d1925cc</span>
<span class="token comment"># Root directory for saving screenshots generated and obtained through the HTTP API (/index/api/getSnap).</span>
<span class="token key attr-name">snapRoot</span><span class="token punctuation">=</span><span class="token value attr-value">./www/snap/</span>
<span class="token comment"># Default snapshot image. When FFmpeg is started for screenshotting but the screenshot has not been generated yet, the default preset image can be returned.</span>
<span class="token key attr-name">defaultSnap</span><span class="token punctuation">=</span><span class="token value attr-value">./www/logo.png</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">ffmpeg</span><span class="token punctuation">]</span></span>
<span class="token comment"># Path to the FFmpeg executable program, supports relative or absolute paths.</span>
<span class="token key attr-name">bin</span><span class="token punctuation">=</span><span class="token value attr-value">/usr/bin/ffmpeg</span>
<span class="token comment"># Command template for pulling and pushing streams with FFmpeg. This template allows setting some parameters for re-encoding.</span>
<span class="token key attr-name">cmd</span><span class="token punctuation">=</span><span class="token value attr-value">%s -re -i %s -c:a aac -strict -2 -ar 44100 -ab 48k -c:v libx264 -f flv %s</span>
<span class="token comment"># Command for generating snapshots with FFmpeg. The configuration can be modified to change the resolution or quality of the snapshots.</span>
<span class="token key attr-name">snap</span><span class="token punctuation">=</span><span class="token value attr-value">%s -i %s -y -f mjpeg -frames:v 1 %s</span>
<span class="token comment"># Path for FFmpeg logs. Leaving it empty will disable FFmpeg logging.</span>
<span class="token comment"># It can be a relative path (relative to the executable program directory) or an absolute path.</span>
<span class="token key attr-name">log</span><span class="token punctuation">=</span><span class="token value attr-value">./ffmpeg/ffmpeg.log</span>
<span class="token comment"># Automatic restart time (in seconds), default is 0, which means no automatic restart. It is mainly used to avoid synchronization issues caused by long-term FFmpeg pulling of streams.</span>
<span class="token key attr-name">restart_sec</span><span class="token punctuation">=</span><span class="token value attr-value">0</span>

<span class="token comment"># Switches related to protocol conversion; if the addStreamProxy API and on_publish hook response do not specify the protocol conversion parameters, these configuration items will be used.</span>
<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">protocol</span><span class="token punctuation">]</span></span>
<span class="token comment"># When converting protocols, whether to enable frame-level timestamp overlay.</span>
<span class="token comment"># 0: Use the absolute timestamp of the source video stream without any changes.</span>
<span class="token comment"># 1: Use the system timestamp when receiving data in ZLMediaKit (smoothed processing).</span>
<span class="token comment"># 2: Use the relative timestamp (increment) of the source video stream, with timestamp jump and rollback correction.</span>
<span class="token key attr-name">modify_stamp</span><span class="token punctuation">=</span><span class="token value attr-value">2</span>
<span class="token comment"># Whether to enable audio during protocol conversion.</span>
<span class="token key attr-name">enable_audio</span><span class="token punctuation">=</span><span class="token value attr-value">1</span>
<span class="token comment"># Add silent audio (ACC) when audio is disabled. This switch is invalid when audio is closed.</span>
<span class="token key attr-name">add_mute_audio</span><span class="token punctuation">=</span><span class="token value attr-value">1</span>
<span class="token comment"># Whether to directly close when there are no viewers (instead of returning close through the on_none_reader hook).</span>
<span class="token comment"># When this configuration is set to 1, if there are no viewers for this stream, the on_none_reader hook callback will not be triggered,</span>
<span class="token comment"># but the stream will be closed directly.</span>
<span class="token key attr-name">auto_close</span><span class="token punctuation">=</span><span class="token value attr-value">0</span>

<span class="token comment"># After a push is disconnected, it can reconnect and continue pushing within the timeout period, so that the player can continue playing.</span>
<span class="token comment"># Set it to 0 to disable this feature (disconnection of the push will immediately disconnect the player).</span>
<span class="token comment"># This parameter should not exceed the player&#39;s timeout period; unit: milliseconds.</span>
<span class="token key attr-name">continue_push_ms</span><span class="token punctuation">=</span><span class="token value attr-value">15000</span>

<span class="token comment"># Whether to enable conversion to HLS (MPEG-TS).</span>
<span class="token key attr-name">enable_hls</span><span class="token punctuation">=</span><span class="token value attr-value">1</span>
<span class="token comment"># Whether to enable conversion to HLS (fMP4).</span>
<span class="token key attr-name">enable_hls_fmp4</span><span class="token punctuation">=</span><span class="token value attr-value">0</span>
<span class="token comment"># Whether to enable MP4 recording.</span>
<span class="token key attr-name">enable_mp4</span><span class="token punctuation">=</span><span class="token value attr-value">0</span>
<span class="token comment"># Whether to enable conversion to RTSP/WebRTC.</span>
<span class="token key attr-name">enable_rtsp</span><span class="token punctuation">=</span><span class="token value attr-value">1</span>
<span class="token comment"># Whether to enable conversion to RTMP/FLV.</span>
<span class="token key attr-name">enable_rtmp</span><span class="token punctuation">=</span><span class="token value attr-value">1</span>
<span class="token comment"># Whether to enable conversion to HTTP-TS/WS-TS.</span>
<span class="token key attr-name">enable_ts</span><span class="token punctuation">=</span><span class="token value attr-value">1</span>
<span class="token comment"># Whether to enable conversion to HTTP-fMP4/WS-fMP4</span>
<span class="token key attr-name">enable_fmp4</span><span class="token punctuation">=</span><span class="token value attr-value">1</span>

<span class="token comment"># Whether to treat mp4 recording as a player</span>
<span class="token key attr-name">mp4_as_player</span><span class="token punctuation">=</span><span class="token value attr-value">0</span>
<span class="token comment"># Maximum duration of mp4 segments in seconds</span>
<span class="token key attr-name">mp4_max_second</span><span class="token punctuation">=</span><span class="token value attr-value">3600</span>
<span class="token comment"># Path to save mp4 recordings</span>
<span class="token key attr-name">mp4_save_path</span><span class="token punctuation">=</span><span class="token value attr-value">./www</span>

<span class="token comment"># Path to save hls recordings</span>
<span class="token key attr-name">hls_save_path</span><span class="token punctuation">=</span><span class="token value attr-value">./www</span>

<span class="token comment">###### The following are protocol conversion switches. When testing the receiving and streaming performance of ZLMediaKit, please set the switches below to 1.</span>
<span class="token comment">###### If you don&#39;t need a certain protocol, you can set the corresponding switch to 1 to save resources (but it can still be played, although the experience for the first player may be slightly worse),</span>
<span class="token comment">###### If you want the best user experience for a certain protocol, please set the switch to 0 (the first player can start instantly without screen flickering).</span>
<span class="token comment"># Whether to generate hls protocol on-demand. If hls.segNum is configured as 0 (meaning hls recording), hls will always be generated regardless of this switch.</span>
<span class="token key attr-name">hls_demand</span><span class="token punctuation">=</span><span class="token value attr-value">0</span>
<span class="token comment"># Whether to generate rtsp[s] protocol on-demand</span>
<span class="token key attr-name">rtsp_demand</span><span class="token punctuation">=</span><span class="token value attr-value">0</span>
<span class="token comment"># Whether to generate rtmp[s], http[s]-flv, ws[s]-flv protocols on-demand</span>
<span class="token key attr-name">rtmp_demand</span><span class="token punctuation">=</span><span class="token value attr-value">0</span>
<span class="token comment"># Whether to generate http[s]-ts protocol on-demand</span>
<span class="token key attr-name">ts_demand</span><span class="token punctuation">=</span><span class="token value attr-value">0</span>
<span class="token comment"># Whether to generate http[s]-fmp4, ws[s]-fmp4 protocols on-demand</span>
<span class="token key attr-name">fmp4_demand</span><span class="token punctuation">=</span><span class="token value attr-value">0</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">general</span><span class="token punctuation">]</span></span>
<span class="token comment"># Whether to enable virtual hosting</span>
<span class="token key attr-name">enableVhost</span><span class="token punctuation">=</span><span class="token value attr-value">0</span>
<span class="token comment"># The hook.on_flow_report event will be triggered when a player or pusher is disconnected, indicating the amount of traffic used.</span>
<span class="token comment"># The flowThreshold parameter controls the threshold for triggering the hook.on_flow_report event. It will only be triggered when the traffic usage exceeds this threshold, in kilobytes.</span>
<span class="token key attr-name">flowThreshold</span><span class="token punctuation">=</span><span class="token value attr-value">1024</span>
<span class="token comment"># Maximum waiting time for playback, in milliseconds.</span>
<span class="token comment"># When playing a stream, if the stream does not exist,</span>
<span class="token comment"># ZLMediaKit will allow the player to wait for a maximum of maxStreamWaitMS milliseconds.</span>
<span class="token comment"># If the stream is successfully registered within this time, playback will start immediately.</span>
<span class="token comment"># Otherwise, the player will receive a response indicating that the stream was not found. This mechanism allows playback before pushing the stream.</span>
<span class="token key attr-name">maxStreamWaitMS</span><span class="token punctuation">=</span><span class="token value attr-value">15000</span>
<span class="token comment"># Maximum waiting time for triggering the hook.on_stream_none_reader event when a stream has no viewers, in milliseconds.</span>
<span class="token comment"># In conjunction with the hook.on_stream_none_reader event, it can automatically stop pulling or receiving streams when there are no viewers.</span>
<span class="token key attr-name">streamNoneReaderDelayMS</span><span class="token punctuation">=</span><span class="token value attr-value">20000</span>
<span class="token comment"># When replaying a stream agent, whether to delete the previous media stream data after successful reconnection.</span>
<span class="token comment"># If deleted, the playback will start from the beginning;</span>
<span class="token comment"># if not deleted, it will continue writing from where it left off (for HLS/MP4 recording, it will continue writing at the end of the previous file).</span>
<span class="token key attr-name">resetWhenRePlay</span><span class="token punctuation">=</span><span class="token value attr-value">1</span>
<span class="token comment"># Merge write buffer size in milliseconds. Merging write means that the server caches a certain amount of data before writing it to the socket at once, which can improve performance but increases latency.</span>
<span class="token comment"># When enabled, TCP_NODELAY will be disabled and MSG_MORE will be enabled.</span>
<span class="token key attr-name">mergeWriteMS</span><span class="token punctuation">=</span><span class="token value attr-value">0</span>
<span class="token comment"># Unique ID of the server, used to differentiate which server triggers the hook event.</span>
<span class="token key attr-name">mediaServerId</span><span class="token punctuation">=</span><span class="token value attr-value">your_server_id</span>

<span class="token comment"># Maximum waiting time for uninitialized tracks, in milliseconds. After the timeout, uninitialized tracks will be ignored.</span>
<span class="token key attr-name">wait_track_ready_ms</span><span class="token punctuation">=</span><span class="token value attr-value">10000</span>
<span class="token comment"># If a stream has only one track, maximum waiting time in milliseconds. If no data from other tracks is received after the timeout, it will be considered a single-track stream.</span>
<span class="token comment"># This waiting time is not applicable if the protocol metadata declares a specific number of tracks.</span>
<span class="token key attr-name">wait_add_track_ms</span><span class="token punctuation">=</span><span class="token value attr-value">3000</span>
<span class="token comment"># If a track is not ready, we cache frame data, but with a maximum number of frames to prevent memory overflow.</span>
<span class="token key attr-name">unready_frame_cache</span><span class="token punctuation">=</span><span class="token value attr-value">100</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">hls</span><span class="token punctuation">]</span></span>
<span class="token comment"># Buffer size for writing HLS files, adjusting this parameter can improve file I/O performance</span>
<span class="token key attr-name">fileBufSize</span><span class="token punctuation">=</span><span class="token value attr-value">65536</span>
<span class="token comment"># Maximum duration of HLS segments</span>
<span class="token key attr-name">segDur</span><span class="token punctuation">=</span><span class="token value attr-value">2</span>
<span class="token comment"># Number of retained segments in the m3u8 index (typically 2-3 segments more than actually retained)</span>
<span class="token comment"># If set to 0, segments will not be deleted and will be saved for on-demand playback</span>
<span class="token key attr-name">segNum</span><span class="token punctuation">=</span><span class="token value attr-value">3</span>
<span class="token comment"># Number of segments retained on disk after being removed from the m3u8 file</span>
<span class="token key attr-name">segRetain</span><span class="token punctuation">=</span><span class="token value attr-value">5</span>
<span class="token comment"># Whether to broadcast a notification when HLS segments (ts/fmp4) are completed (on_record_ts)</span>
<span class="token key attr-name">broadcastRecordTs</span><span class="token punctuation">=</span><span class="token value attr-value">0</span>
<span class="token comment"># Delay for deleting live HLS files, in seconds, issue: #913</span>
<span class="token key attr-name">deleteDelaySec</span><span class="token punctuation">=</span><span class="token value attr-value">10</span>
<span class="token comment"># Whether to retain HLS files. This function is partially equivalent to segNum=0,</span>
<span class="token comment"># but the retained files will not be reflected in the m3u8 file.</span>
<span class="token comment"># 0 means not retaining, not effective</span>
<span class="token comment"># 1 means retaining, HLS files will not be deleted. If this function is enabled, be aware of disk size or manually clean up HLS files regularly.</span>
<span class="token key attr-name">segKeep</span><span class="token punctuation">=</span><span class="token value attr-value">0</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">hook</span><span class="token punctuation">]</span></span>
<span class="token comment"># Whether to enable hook events, when enabled, both pulling and pushing streams require authentication</span>
<span class="token key attr-name">enable</span><span class="token punctuation">=</span><span class="token value attr-value">0</span>
<span class="token comment"># Traffic event used by player or streamer, leave blank to disable</span>
<span class="token key attr-name">on_flow_report</span><span class="token punctuation">=</span><span class="token value attr-value">https://127.0.0.1/index/hook/on_flow_report</span>
<span class="token comment"># HTTP file access authentication event, leave blank to disable authentication</span>
<span class="token key attr-name">on_http_access</span><span class="token punctuation">=</span><span class="token value attr-value">https://127.0.0.1/index/hook/on_http_access</span>
<span class="token comment"># Playback authentication event, leave blank to disable authentication</span>
<span class="token key attr-name">on_play</span><span class="token punctuation">=</span><span class="token value attr-value">https://127.0.0.1/index/hook/on_play</span>
<span class="token comment"># Publishing authentication event, leave blank to disable authentication</span>
<span class="token key attr-name">on_publish</span><span class="token punctuation">=</span><span class="token value attr-value">https://127.0.0.1/index/hook/on_publish</span>
<span class="token comment"># Recording of mp4 segments completed event</span>
<span class="token key attr-name">on_record_mp4</span><span class="token punctuation">=</span><span class="token value attr-value">https://127.0.0.1/index/hook/on_record_mp4</span>
<span class="token comment"># Recording of hls ts (or fmp4) segments completed event</span>
<span class="token key attr-name">on_record_ts</span><span class="token punctuation">=</span><span class="token value attr-value">https://127.0.0.1/index/hook/on_record_ts</span>
<span class="token comment"># RTSP playback authentication event, in this event, RTSP username and password are compared</span>
<span class="token key attr-name">on_rtsp_auth</span><span class="token punctuation">=</span><span class="token value attr-value">https://127.0.0.1/index/hook/on_rtsp_auth</span>
<span class="token comment"># Whether to enable exclusive RTSP authentication event, leave blank to disable RTSP authentication.</span>
<span class="token comment"># RTSP playback authentication also supports authentication through URL.</span>
<span class="token comment"># It is recommended to use URL parameter authentication uniformly.</span>
<span class="token comment"># After enabling exclusive RTSP authentication, on_play authentication event will no longer be triggered.</span>
<span class="token key attr-name">on_rtsp_realm</span><span class="token punctuation">=</span><span class="token value attr-value">https://127.0.0.1/index/hook/on_rtsp_realm</span>
<span class="token comment"># Remote telnet debugging authentication event</span>
<span class="token key attr-name">on_shell_login</span><span class="token punctuation">=</span><span class="token value attr-value">https://127.0.0.1/index/hook/on_shell_login</span>
<span class="token comment"># Live stream registration or deregistration event</span>
<span class="token key attr-name">on_stream_changed</span><span class="token punctuation">=</span><span class="token value attr-value">https://127.0.0.1/index/hook/on_stream_changed</span>
<span class="token comment"># Filter the protocol types of on_stream_changed hook, you can choose to only listen to certain interested protocols; leave blank to not filter protocols</span>
<span class="token key attr-name">stream_changed_schemas</span><span class="token punctuation">=</span><span class="token value attr-value">rtsp/rtmp/fmp4/ts/hls/hls.fmp4</span>
<span class="token comment"># Event for streams with no viewers, through this event, you can choose to close streams with no viewers. Use together with general.streamNoneReaderDelayMS option.</span>
<span class="token key attr-name">on_stream_none_reader</span><span class="token punctuation">=</span><span class="token value attr-value">https://127.0.0.1/index/hook/on_stream_none_reader</span>
<span class="token comment"># Event for stream not found during playback, by combining with hook.on_stream_none_reader event, on-demand streaming can be achieved</span>
<span class="token key attr-name">on_stream_not_found</span><span class="token punctuation">=</span><span class="token value attr-value">https://127.0.0.1/index/hook/on_stream_not_found</span>
<span class="token comment"># Server startup report, can be used to listen for server crash and restart events</span>
<span class="token key attr-name">on_server_started</span><span class="token punctuation">=</span><span class="token value attr-value">https://127.0.0.1/index/hook/on_server_started</span>
<span class="token comment"># Server exit report, triggered when the server exits normally</span>
<span class="token key attr-name">on_server_exited</span><span class="token punctuation">=</span><span class="token value attr-value">https://127.0.0.1/index/hook/on_server_exited</span>
<span class="token comment"># Server keep-alive report</span>
<span class="token key attr-name">on_server_keepalive</span><span class="token punctuation">=</span><span class="token value attr-value">https://127.0.0.1/index/hook/on_server_keepalive</span>
<span class="token comment"># Callback when sending rtp (startSendRtp) is stopped passively</span>
<span class="token key attr-name">on_send_rtp_stopped</span><span class="token punctuation">=</span><span class="token value attr-value">https://127.0.0.1/index/hook/on_send_rtp_stopped</span>
<span class="token comment"># RTP server timeout, no data received</span>
<span class="token key attr-name">on_rtp_server_timeout</span><span class="token punctuation">=</span><span class="token value attr-value">https://127.0.0.1/index/hook/on_rtp_server_timeout</span>

<span class="token comment"># Maximum waiting time for hook API response, in seconds</span>
<span class="token key attr-name">timeoutSec</span><span class="token punctuation">=</span><span class="token value attr-value">10</span>
<span class="token comment"># Interval for keepalive hook triggering, in seconds, float type</span>
<span class="token key attr-name">alive_interval</span><span class="token punctuation">=</span><span class="token value attr-value">10.0</span>
<span class="token comment"># Number of retries for failed hook notifications, positive integer. 0 means no retries, 1 means retry once, and so on</span>
<span class="token key attr-name">retry</span><span class="token punctuation">=</span><span class="token value attr-value">1</span>
<span class="token comment"># Hook notification failure retry delay, in seconds, float type</span>
<span class="token key attr-name">retry_delay</span><span class="token punctuation">=</span><span class="token value attr-value">3.0</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">cluster</span><span class="token punctuation">]</span></span>
<span class="token comment"># Set the template for the source stream URL, similar to printf format. The first %s specifies the app, and the second %s specifies the stream_id.</span>
<span class="token comment"># The on_stream_not_found and on_stream_none_reader hooks will be invalid when the cluster mode is enabled.</span>
<span class="token comment"># The following types are supported for source tracing:</span>
<span class="token comment"># rtmp: rtmp://127.0.0.1:1935/%s/%s</span>
<span class="token comment"># rtsp: rtsp://127.0.0.1:554/%s/%s</span>
<span class="token comment"># hls: http://127.0.0.1:80/%s/%s/hls.m3u8</span>
<span class="token comment"># http-ts: http://127.0.0.1:80/%s/%s.live.ts</span>
<span class="token comment"># Multiple source URLs are supported, and different URLs are separated by semicolons (;)</span>
<span class="token key attr-name">origin_url</span><span class="token punctuation">=</span>
<span class="token comment"># Total timeout duration for source tracing, in seconds, float type. If there are 3 source URLs, the timeout for each trace will be timeout_sec divided by 3.</span>
<span class="token comment"># The timeout for each trace should not exceed the general.maxStreamWaitMS configuration.</span>
<span class="token key attr-name">timeout_sec</span><span class="token punctuation">=</span><span class="token value attr-value">15</span>
<span class="token comment"># Number of retries for source tracing failure. Set to -1 for unlimited retries.</span>
<span class="token key attr-name">retry_count</span><span class="token punctuation">=</span><span class="token value attr-value">3</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">http</span><span class="token punctuation">]</span></span>
<span class="token comment"># HTTP server character encoding. Default is gb2312 on Windows.</span>
<span class="token key attr-name">charSet</span><span class="token punctuation">=</span><span class="token value attr-value">utf-8</span>
<span class="token comment"># HTTP connection timeout</span>
<span class="token key attr-name">keepAliveSecond</span><span class="token punctuation">=</span><span class="token value attr-value">30</span>
<span class="token comment"># Maximum number of bytes for the HTTP request body. If the POST body is too large, it is not suitable to cache the body in memory.</span>
<span class="token key attr-name">maxReqSize</span><span class="token punctuation">=</span><span class="token value attr-value">40960</span>
<span class="token comment"># 404 page content. Users can customize the 404 page.</span>
<span class="token comment"># notFound = &lt;html&gt;&lt;head&gt;&lt;title&gt;404 Not Found&lt;/title&gt;&lt;/head&gt;&lt;body bgcolor=&quot;white&quot;&gt;&lt;center&gt;&lt;h1&gt;The resource you requested does not exist!&lt;/h1&gt;&lt;/center&gt;&lt;hr&gt;&lt;center&gt;ZLMediaKit-4.0&lt;/center&gt;&lt;/body&gt;&lt;/html&gt;</span>
<span class="token comment"># HTTP server listening port</span>
<span class="token key attr-name">port</span><span class="token punctuation">=</span><span class="token value attr-value">80</span>
<span class="token comment"># Root directory for the HTTP file server.</span>
<span class="token comment"># It can be a relative path (relative to the executable program directory) or an absolute path.</span>
<span class="token key attr-name">rootPath</span><span class="token punctuation">=</span><span class="token value attr-value">./www</span>
<span class="token comment"># Read file cache size for the HTTP file server, in bytes. Adjusting this parameter can optimize file I/O performance.</span>
<span class="token key attr-name">sendBufSize</span><span class="token punctuation">=</span><span class="token value attr-value">65536</span>
<span class="token comment"># HTTPS server listening port</span>
<span class="token key attr-name">sslport</span><span class="token punctuation">=</span><span class="token value attr-value">443</span>
<span class="token comment"># Whether to display the folder menu. Enabling this allows browsing of folders.</span>
<span class="token key attr-name">dirMenu</span><span class="token punctuation">=</span><span class="token value attr-value">1</span>
<span class="token comment"># Virtual directories. Separate virtual directory names and file paths with commas (,). Separate multiple configurations with semicolons (;).</span>
<span class="token comment"># For example, if assigned as app_a,/path/to/a;app_b,/path/to/b, then</span>
<span class="token comment"># accessing http://127.0.0.1/app_a/file_a corresponds to the file path /path/to/a/file_a</span>
<span class="token comment"># accessing http://127.0.0.1/app_b/file_b corresponds to the file path /path/to/b/file_b</span>
<span class="token comment"># Accessing other HTTP paths will correspond to file paths within rootPath.</span>
<span class="token key attr-name">virtualPath</span><span class="token punctuation">=</span>
<span class="token comment"># Disable mmap caching for files with specified file extensions. Separate extensions with commas (,).</span>
<span class="token comment"># For example, if assigned as .mp4,.flv, then files with .mp4 and .flv extensions will not be cached.</span>
<span class="token key attr-name">forbidCacheSuffix</span><span class="token punctuation">=</span>
<span class="token comment"># You can put the real client IP before the HTTP proxy in the HTTP header: https://github.com/ZLMediaKit/ZLMediaKit/issues/1388</span>
<span class="token comment"># Do not expose this key, as it may cause client IP forgery.</span>
<span class="token key attr-name">forwarded_ip_header</span><span class="token punctuation">=</span>
<span class="token comment"># Allow all cross-origin requests by default</span>
<span class="token key attr-name">allow_cross_domains</span><span class="token punctuation">=</span><span class="token value attr-value">1</span>
<span class="token comment"># IP address whitelist for accessing HTTP API and HTTP file indexing. Leave it empty for no restrictions.</span>
<span class="token key attr-name">allow_ip_range</span><span class="token punctuation">=</span><span class="token value attr-value">::1,127.0.0.1,172.16.0.0-172.31.255.255,192.168.0.0-192.168.255.255,10.0.0.0-10.255.255.255</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">multicast</span><span class="token punctuation">]</span></span>
<span class="token comment"># The maximum multicast IP address for RTP multicast</span>
<span class="token key attr-name">addrMax</span><span class="token punctuation">=</span><span class="token value attr-value">239.255.255.255</span>
<span class="token comment"># The minimum multicast IP address for RTP multicast</span>
<span class="token key attr-name">addrMin</span><span class="token punctuation">=</span><span class="token value attr-value">239.0.0.0</span>
<span class="token comment"># Multicast UDP TTL</span>
<span class="token key attr-name">udpTTL</span><span class="token punctuation">=</span><span class="token value attr-value">64</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">record</span><span class="token punctuation">]</span></span>
<span class="token comment"># Application name for MP4 recording or MP4 on-demand. Restricting the application name can prevent arbitrary on-demand requests.</span>
<span class="token comment"># On-demand files must be placed in this folder.</span>
<span class="token key attr-name">appName</span><span class="token punctuation">=</span><span class="token value attr-value">record</span>
<span class="token comment"># MP4 recording file write buffer size in bytes. Adjusting this parameter can improve file I/O performance.</span>
<span class="token key attr-name">fileBufSize</span><span class="token punctuation">=</span><span class="token value attr-value">65536</span>
<span class="token comment"># Amount of data streamed per request for MP4 on-demand, in milliseconds.</span>
<span class="token comment"># Reducing this value can make the streaming data smoother, while increasing it conserves CPU resources.</span>
<span class="token key attr-name">sampleMS</span><span class="token punctuation">=</span><span class="token value attr-value">500</span>
<span class="token comment"># Whether to write a secondary keyframe index into the header after MP4 recording is completed.</span>
<span class="token key attr-name">fastStart</span><span class="token punctuation">=</span><span class="token value attr-value">0</span>
<span class="token comment"># Whether to loop play the MP4 file for MP4 on-demand (rtsp/rtmp/http-flv/ws-flv).</span>
<span class="token key attr-name">fileRepeat</span><span class="token punctuation">=</span><span class="token value attr-value">0</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">rtmp</span><span class="token punctuation">]</span></span>
<span class="token comment"># The RTMP handshake must be completed within this time, otherwise the server will disconnect the connection. Measured in seconds.</span>
<span class="token key attr-name">handshakeSecond</span><span class="token punctuation">=</span><span class="token value attr-value">15</span>
<span class="token comment"># RTMP timeout. If no data is received from the client within this time,</span>
<span class="token comment"># or if the TCP send buffer exceeds this time, the connection will be disconnected. Measured in seconds.</span>
<span class="token key attr-name">keepAliveSecond</span><span class="token punctuation">=</span><span class="token value attr-value">15</span>
<span class="token comment"># RTMP server listening port.</span>
<span class="token key attr-name">port</span><span class="token punctuation">=</span><span class="token value attr-value">1935</span>
<span class="token comment"># RTMPS server listening address.</span>
<span class="token key attr-name">sslport</span><span class="token punctuation">=</span><span class="token value attr-value">0</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">rtp</span><span class="token punctuation">]</span></span>
<span class="token comment"># Audio Maximum Transmission Unit (MTU) size. This parameter limits the maximum number of bytes in RTP packets. It is recommended not to exceed 1400.</span>
<span class="token comment"># Increasing this value will significantly increase the latency of the live stream.</span>
<span class="token key attr-name">audioMtuSize</span><span class="token punctuation">=</span><span class="token value attr-value">600</span>
<span class="token comment"># Video Maximum Transmission Unit (MTU) size. This parameter limits the maximum number of bytes in RTP packets. It is recommended not to exceed 1400.</span>
<span class="token key attr-name">videoMtuSize</span><span class="token punctuation">=</span><span class="token value attr-value">1400</span>
<span class="token comment"># Maximum length limit of RTP packets, in kilobytes. It is mainly used to identify incorrect RTP packets when TCP context is disrupted.</span>
<span class="token key attr-name">rtpMaxSize</span><span class="token punctuation">=</span><span class="token value attr-value">10</span>
<span class="token comment"># When packaging RTP, the low-latency switch. It is disabled by default (set to 0). In the case of H.264 where one frame contains multiple slices (NAL units), enabling this may cause screen flickering.</span>
<span class="token key attr-name">lowLatency</span><span class="token punctuation">=</span><span class="token value attr-value">0</span>
<span class="token comment"># Whether to use the stap-a mode for H.264 RTP packetization (for compatibility with older versions of browsers) or to use the Single NAL unit packet per H.264 mode.</span>
<span class="token comment"># Some older RTSP devices do not support stap-a RTP. Setting this configuration to 0 can improve compatibility.</span>
<span class="token key attr-name">h264_stap_a</span><span class="token punctuation">=</span><span class="token value attr-value">1</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">rtp_proxy</span><span class="token punctuation">]</span></span>
<span class="token comment"># Export debug data (including rtp/ps/h264) to this directory, leave blank to disable data export</span>
<span class="token key attr-name">dumpDir</span><span class="token punctuation">=</span>
<span class="token comment"># UDP and TCP proxy servers, support rtp (must be ts or ps type) proxy</span>
<span class="token key attr-name">port</span><span class="token punctuation">=</span><span class="token value attr-value">10000</span>
<span class="token comment"># rtp timeout in seconds</span>
<span class="token key attr-name">timeoutSec</span><span class="token punctuation">=</span><span class="token value attr-value">15</span>
<span class="token comment"># Random port range, ensuring a minimum of 36 ports</span>
<span class="token comment"># This range also limits the udp port range of the rtsp server</span>
<span class="token key attr-name">port_range</span><span class="token punctuation">=</span><span class="token value attr-value">30000-35000</span>
<span class="token comment"># pt for rtp h264 payload</span>
<span class="token key attr-name">h264_pt</span><span class="token punctuation">=</span><span class="token value attr-value">98</span>
<span class="token comment"># pt for rtp h265 payload</span>
<span class="token key attr-name">h265_pt</span><span class="token punctuation">=</span><span class="token value attr-value">99</span>
<span class="token comment"># pt for rtp ps payload</span>
<span class="token key attr-name">ps_pt</span><span class="token punctuation">=</span><span class="token value attr-value">96</span>
<span class="token comment"># pt for rtp opus payload</span>
<span class="token key attr-name">opus_pt</span><span class="token punctuation">=</span><span class="token value attr-value">100</span>
<span class="token comment"># Whether to enable RtpSender&#39;s gop cache optimization for instant play experience, enabled by default</span>
<span class="token comment"># Set to 0 to save memory if startSendRtp related interfaces are not called</span>
<span class="token key attr-name">gop_cache</span><span class="token punctuation">=</span><span class="token value attr-value">1</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">rtc</span><span class="token punctuation">]</span></span>
<span class="token comment"># rtc play and publish timeout in seconds</span>
<span class="token key attr-name">timeoutSec</span><span class="token punctuation">=</span><span class="token value attr-value">15</span>
<span class="token comment"># The visible IP of this machine to rtc clients, usually the public IP when acting as a server, can have multiple IPs separated by &#39;,&#39;</span>
<span class="token comment"># Also supports environment variables starting with &#39;$&#39;, such as &quot;$EXTERN_IP&quot;; please refer to: https://github.com/ZLMediaKit/ZLMediaKit/pull/1786</span>
<span class="token key attr-name">externIP</span><span class="token punctuation">=</span>
<span class="token comment"># rtc udp server listening port, all rtc clients will transmit stun/dtls/srtp/srtcp data through this port</span>
<span class="token comment"># This port is multi-threaded and supports connection migration due to client network switching</span>
<span class="token comment"># Note that if the server is inside NAT and needs port mapping, the external mapped port must be consistent with this port</span>
<span class="token key attr-name">port</span><span class="token punctuation">=</span><span class="token value attr-value">8000</span>
<span class="token comment"># rtc tcp server listening port, in case udp is not available, tcp will be used to transmit data</span>
<span class="token comment"># This port is multi-threaded and supports connection migration due to client network switching</span>
<span class="token comment"># Note that if the server is inside NAT and needs port mapping, the external mapped port must be consistent with this port</span>
<span class="token key attr-name">tcpPort</span> <span class="token punctuation">=</span> <span class="token value attr-value">8000</span>
<span class="token comment"># Set the remb bit rate, when non-zero, twcc is turned off and remb is turned on. This setting is effective for rtc publishing and can control the streaming quality</span>
<span class="token comment"># Currently, twcc automatic bitrate adjustment has been implemented and remb is closed to adjust the bitrate according to the real network conditions</span>
<span class="token key attr-name">rembBitRate</span><span class="token punctuation">=</span><span class="token value attr-value">0</span>
<span class="token comment"># Supported audio codec types for rtc, higher priority in front</span>
<span class="token comment"># The following example includes all supported audio codecs</span>
<span class="token key attr-name">preferredCodecA</span><span class="token punctuation">=</span><span class="token value attr-value">PCMU,PCMA,opus,mpeg4-generic</span>
<span class="token comment"># Supported video codec types for rtc, higher priority in front</span>
<span class="token comment"># The following example includes all supported video codecs</span>
<span class="token key attr-name">preferredCodecV</span><span class="token punctuation">=</span><span class="token value attr-value">H264,H265,AV1,VP9,VP8</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">srt</span><span class="token punctuation">]</span></span>
<span class="token comment"># srt play and publish timeout in seconds</span>
<span class="token key attr-name">timeoutSec</span><span class="token punctuation">=</span><span class="token value attr-value">5</span>
<span class="token comment"># srt udp server listening port, all srt clients will transmit srt data through this port</span>
<span class="token comment"># This port is multi-threaded and supports connection migration due to client network switching</span>
<span class="token key attr-name">port</span><span class="token punctuation">=</span><span class="token value attr-value">9000</span>
<span class="token comment"># Estimation parameter for latency cache in srt protocol, estimating rtt in handshake stage, then latencyMul*rtt becomes the maximum cache duration</span>
<span class="token comment"># The larger this parameter, the longer the waiting time for retransmission</span>
<span class="token key attr-name">latencyMul</span><span class="token punctuation">=</span><span class="token value attr-value">4</span>
<span class="token comment"># Packet buffer size</span>
<span class="token key attr-name">pktBufSize</span><span class="token punctuation">=</span><span class="token value attr-value">8192</span>


<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">rtsp</span><span class="token punctuation">]</span></span>
<span class="token comment"># Whether to use base64 or md5 for rtsp specific authentication</span>
<span class="token key attr-name">authBasic</span><span class="token punctuation">=</span><span class="token value attr-value">0</span>
<span class="token comment"># Whether the rtsp pull and push proxy is in direct proxy mode</span>
<span class="token comment"># When in direct proxy mode, it supports any encoding format, but it will cause the GOP cache unable to locate the I frame, which may cause screen flickering when starting broadcasting</span>
<span class="token comment"># And if it is pulling with tcp, if rtp is larger than mtu, it will not be able to use udp proxy</span>
<span class="token comment"># Suppose your pull source address is not 264 or 265 or AAC, then you can use direct proxy mode to support rtsp proxy</span>
<span class="token comment"># If you are doing rtsp push and pull, but playing with webrtc, it is also recommended to disable direct proxy mode,</span>
<span class="token comment"># because when in direct proxy mode, there may be no sps pps in rtp, which will prevent webrtc from playing; in addition, webrtc does not support Single NAL Unit Packets type rtp</span>
<span class="token comment"># Direct proxy mode for rtsp is enabled by default, rtmp is forced to enable direct proxy mode because it doesn&#39;t have these issues</span>
<span class="token key attr-name">directProxy</span><span class="token punctuation">=</span><span class="token value attr-value">1</span>
<span class="token comment"># The rtsp handshake must be completed within this time, otherwise the server will disconnect the connection, in seconds</span>
<span class="token key attr-name">handshakeSecond</span><span class="token punctuation">=</span><span class="token value attr-value">15</span>
<span class="token comment"># rtsp timeout, if no data is received from the client within this time,</span>
<span class="token comment"># or if the tcp send buffer exceeds this time, the connection will be disconnected, in seconds</span>
<span class="token key attr-name">keepAliveSecond</span><span class="token punctuation">=</span><span class="token value attr-value">15</span>
<span class="token comment"># RTSP server listening address</span>
<span class="token key attr-name">port</span><span class="token punctuation">=</span><span class="token value attr-value">554</span>
<span class="token comment"># RTSPS server listening address</span>
<span class="token key attr-name">sslport</span><span class="token punctuation">=</span><span class="token value attr-value">0</span>
<span class="token comment"># Whether to use low latency mode for RTSP forwarding. When enabled, RTP packets will not be cached, improving concurrency and reducing the latency of one frame.</span>
<span class="token key attr-name">lowLatency</span><span class="token punctuation">=</span><span class="token value attr-value">0</span>
<span class="token comment"># Force negotiation of RTP transmission method (0: TCP, 1: UDP, 2: MULTICAST, -1: no restriction)</span>
<span class="token comment"># When the client initiates an RTSP SETUP and the transport type is inconsistent with this configuration, return 461 Unsupported transport</span>
<span class="token comment"># Force the client to re-SETUP and switch to the corresponding protocol. Currently supported by FFMPEG and VLC.</span>
<span class="token key attr-name">rtpTransportType</span><span class="token punctuation">=</span><span class="token value attr-value">-1</span>
<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">shell</span><span class="token punctuation">]</span></span>
<span class="token comment"># Maximum buffer size for receiving requests from the telnet server in debug mode</span>
<span class="token key attr-name">maxReqSize</span><span class="token punctuation">=</span><span class="token value attr-value">1024</span>
<span class="token comment"># Telnet server listening port in debug mode</span>
<span class="token key attr-name">port</span><span class="token punctuation">=</span><span class="token value attr-value">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function u(d,v){const s=a("RouterLink");return t(),i("div",null,[m,l("p",null,[n("You can also refer to "),o(s,{to:"/guide/media_server/web_hook_api.html"},{default:c(()=>[n("HTTP-HOOK-API")]),_:1}),n(" Supported by MediaServer for configuration related to hooks.")])])}const b=e(r,[["render",u],["__file","config_file.html.vue"]]);export{b as default};
