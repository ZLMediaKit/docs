import{_ as o}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as i,c as d,e as t}from"./app-CRnFokh3.js";const a={};function s(c,e){return i(),d("div",null,e[0]||(e[0]=[t('<h2 id="_1-components-of-a-url" tabindex="-1"><a class="header-anchor" href="#_1-components-of-a-url" aria-hidden="true">#</a> 1. Components of a URL</h2><p>Taking <code>rtsp://somedomain.com:554/live/0?token=abcdefg&amp;field=value</code> as an example, this URL is divided into the following parts:</p><ul><li><code>Protocol(scheam)</code>: RTSP protocol, default port 554</li><li><code>Virtual Host(vhost)</code>: somedomain.com. This field can be either a domain name or an IP. If it is an IP, the corresponding virtual host is <code>__defaultVhost__</code></li><li><code>Server Port(port)</code>: 554. If the port number is not specified, the protocol&#39;s default port number is used</li><li><code>Application Name(app)</code>: live</li><li><code>Stream ID(streamid)</code>: 0</li><li><code>Parameters(args)</code>: token=abcdefg&amp;field=value</li></ul><h2 id="_2-stream-media-source-in-zlmediakit" tabindex="-1"><a class="header-anchor" href="#_2-stream-media-source-in-zlmediakit" aria-hidden="true">#</a> 2. Stream Media Source in ZLMediaKit</h2><p>In ZLMediaKit, a stream media source is a data object that can be used for functions such as live broadcasting and stream forwarding, and is referred to as <code>MediaSource</code> in this project. Currently, it supports five types of stream media sources, namely <code>RtspMediaSource</code>, <code>RtmpMediaSource</code>, <code>HlsMediaSource</code>, <code>TSMediaSource</code>, <code>FMP4MediaSource</code>.</p><p>Identifying a stream media source is mainly based on four elements (referred to as 4-tuples hereafter), which are:</p><ul><li><code>Protocol(scheam)</code></li><li><code>Virtual Host(vhost)</code></li><li><code>Application Name(app)</code></li><li><code>Stream ID(streamid)</code></li></ul><p><code>RtspMediaSource</code> supports RTSP playback, RTSP streaming, WebRTC playback, and WebRTC streaming.</p><p><code>RtmpMediaSource</code> supports RTMP streaming/playback, HTTP-FLV playback, and WS-FLV playback.</p><p><code>HlsMediaSource</code> supports HLS playback.</p><p><code>TSMediaSource</code> supports HTTP-TS playback and WS-TS playback.</p><p><code>FMP4MediaSource</code> supports HTTP-FMP4 playback and WS-FMP4 playback.</p><h2 id="_3-playback-urls-corresponding-to-the-stream-media-source" tabindex="-1"><a class="header-anchor" href="#_3-playback-urls-corresponding-to-the-stream-media-source" aria-hidden="true">#</a> 3. Playback URLs Corresponding to the Stream Media Source</h2><p>Suppose there is a <code>RtspMediaSource</code>, and its 4-tuple are <code>rtsp (RtspMediaSource is always rtsp)</code>, <code>somedomain.com</code>, <code>live</code>, and <code>0</code> Then the URLs for playing this stream media source correspond to:</p><ul><li><code>rtsp://somedomain.com/live/0</code></li><li><code>rtsps://somedomain.com/live/0</code></li><li><code>rtsp://127.0.0.1/live/0?vhost=somedomain.com</code></li><li><code>rtsps://127.0.0.1/live/0?vhost=somedomain.com</code></li></ul><p>If there is a <code>RtmpMediaSource</code>, and its 4-tuple are <code>rtmp (RtmpMediaSource is always rtmp)</code>, <code>somedomain.com</code>, <code>live</code>, and <code>0</code> Then the URLs for playing this stream media source correspond to:</p><ul><li><code>rtmp://somedomain.com/live/0</code></li><li><code>rtmps://somedomain.com/live/0</code></li><li><code>rtmp://127.0.0.1/live/0?vhost=somedomain.com</code></li><li><code>rtmps://127.0.0.1/live/0?vhost=somedomain.com</code></li></ul><p>RTMP types of stream media sources also support live streaming through <code>http-flv</code>, <code>websocket</code>, and other protocols. The corresponding URLs are as follows:</p><p><strong>Note: Old code live broadcast suffix is .flv, and it has been changed to .live.flv in the new code</strong></p><ul><li><code>http://somedomain.com/live/0.live.flv</code></li><li><code>https://somedomain.com/live/0.live.flv</code></li><li><code>http://127.0.0.1/live/0.live.flv?vhost=somedomain.com</code></li><li><code>https://127.0.0.1/live/0.live.flv?vhost=somedomain.com</code></li><li><code>ws://somedomain.com/live/0.live.flv</code></li><li><code>wss://somedomain.com/live/0.live.flv</code></li><li><code>ws://127.0.0.1/live/0.live.flv?vhost=somedomain.com</code></li><li><code>wss://127.0.0.1/live/0.live.flv?vhost=somedomain.com</code></li></ul><p>Sure, ZLMediaKit typically converts RTSP and RTMP media streams to each other and also transforms them into HLS/HTTP-TS/WS-TS/HTTP-fMP4/WS-fMP4. The playback URLs are as follows:</p><ul><li><p>HLS</p><ul><li><code>http://somedomain.com/live/0/hls.m3u8</code></li><li><code>https://somedomain.com/live/0/hls.m3u8</code></li><li><code>http://127.0.0.1/live/0/hls.m3u8?vhost=somedomain.com</code></li><li><code>https://127.0.0.1/live/0/hls.m3u8?vhost=somedomain.com</code></li></ul></li><li><p>HTTP-TS/WS-TS (with the suffix .live.ts, to resolve the conflict with HLS)</p><ul><li><code>http://somedomain.com/live/0.live.ts</code></li><li><code>https://somedomain.com/live/0.live.ts</code></li><li><code>http://127.0.0.1/live/0.live.ts?vhost=somedomain.com</code></li><li><code>https://127.0.0.1/live/0.live.ts?vhost=somedomain.com</code></li><li><code>ws://somedomain.com/live/0.live.ts</code></li><li><code>wss://somedomain.com/live/0.live.ts</code></li><li><code>ws://127.0.0.1/live/0.live.ts?vhost=somedomain.com</code></li><li><code>wss://127.0.0.1/live/0.live.ts?vhost=somedomain.com</code></li></ul></li><li><p>HTTP-fMP4/WS-fMP4 (with the suffix .live.mp4, to resolve the conflict with MP4 on-demand)</p><ul><li><code>http://somedomain.com/live/0.live.mp4</code></li><li><code>https://somedomain.com/live/0.live.mp4</code></li><li><code>http://127.0.0.1/live/0.live.mp4?vhost=somedomain.com</code></li><li><code>https://127.0.0.1/live/0.live.mp4?vhost=somedomain.com</code></li><li><code>ws://somedomain.com/live/0.live.mp4</code></li><li><code>wss://somedomain.com/live/0.live.mp4</code></li><li><code>ws://127.0.0.1/live/0.live.mp4?vhost=somedomain.com</code></li><li><code>wss://127.0.0.1/live/0.live.mp4?vhost=somedomain.com</code></li></ul></li></ul><p>Generally speaking, all the above URLs are valid in ZLMediaKit, as ZLMediaKit converts media sources by default.</p><h2 id="_4-video-on-demand-url" tabindex="-1"><a class="header-anchor" href="#_4-video-on-demand-url" aria-hidden="true">#</a> 4. Video-on-Demand URL</h2><p>ZLMediaKit typically implements video-on-demand via MP4 files, and we recommend using HTTP MP4 on-demand as it is the simplest method and the server does not need to demultiplex the MP4 files. ZLMediaKit currently also supports RTSP, RTMP, HTTP-FLV, and WebSocket-FLV MP4 on-demand. The corresponding URLs are similar to live broadcast URLs and will not be elaborated here; only the differences are discussed.</p><ul><li>ZLMediaKit restricts the application name for on-demand to the default <code>record</code>.</li><li>Suppose an MP4 file is placed in the HTTP root directory record folder (<code>www/record</code>). Its relative path is <code>www/record/0.mp4</code>, then the on-demand URL would be: <ul><li><code>rtsp://somedomain.com/record/0.mp4</code></li><li><code>rtmp://somedomain.com/record/0.mp4</code></li><li><code>http://somedomain.com/record/0.mp4</code> (This is a generic HTTP file on-demand; the server does not need to demultiplex the file)</li><li><code>http://somedomain.com/record/0.mp4.live.flv</code> (This is HTTP-FLV live streaming, not HTTP on-demand; the server needs to demultiplex the file)</li><li><code>ws://somedomain.com/record/0.mp4.live.flv</code></li><li><code>http://somedomain.com/record/0.mp4.live.ts</code> (This is HTTP-TS live streaming, not HTTP on-demand; the server needs to demultiplex the file)</li><li><code>ws://somedomain.com/record/0.mp4.live.ts</code></li><li><code>http://somedomain.com/record/0.mp4.live.mp4</code> (This is HTTP-fMP4 live streaming, not HTTP on-demand; the server needs to demultiplex the file)</li><li><code>ws://somedomain.com/record/0.mp4.live.mp4</code></li></ul></li><li>If virtual hosting is enabled, then the on-demand files should be placed in <code>www/somedomain.com/record/0.mp4</code>.</li></ul><h2 id="_5-webrtc-push-pull" tabindex="-1"><a class="header-anchor" href="#_5-webrtc-push-pull" aria-hidden="true">#</a> 5. WebRTC Push/Pull</h2><p>WebRTC playback is slightly different from the methods mentioned above. The WebRTC protocol itself does not define a signaling interaction protocol, and users need to implement the <code>sdp+icecandidate</code> exchange logic themselves. So, WebRTC does not have a standard player, and you need to use JS or a native SDK to implement playback.</p><p>ZLMediaKit implements the <code>WebRTC SDP+icecandidate</code> exchange method via <code>HTTP POST</code>. The interface name is <code>/index/api/webrtc</code>. This interface uses POST content to pass the <code>offer sdp</code> while passing the media source&#39;s four-tuple <code>app</code> <code>stream_id</code> in the URL query parameters. Since HTTP inherently supports <code>vhost</code>, there&#39;s no need to specify <code>vhost</code> separately. WebRTC in ZLMediaKit can be considered another representation of the RTSP protocol. Their push and playback use the same data source, which is <code>RtspMediaSource</code>.</p><p>When pushing WebRTC, the HTTP POST interface for exchanging <code>WebRTC SDP+icecandidate</code> is similar to: <code>http://127.0.0.1/index/api/webrtc?app=live&amp;stream=test&amp;type=push</code></p><p>When playing WebRTC, the HTTP POST interface for exchanging <code>WebRTC SDP+icecandidate</code> is similar to: <code>http://127.0.0.1/index/api/webrtc?app=live&amp;stream=test&amp;type=play</code>.</p><p>ZLMediaKit comes with a WebRTC test player/pusher. After starting ZLMediaKit, you can access it by visiting <code>http://127.0.0.1/webrtc/</code> in your browser.</p><p>Additionally, ZLMediaKit also supports playing MP4 files via WebRTC. The HTTP POST interface is similar to: <code>http://127.0.0.1/index/api/webrtc?app=record&amp;stream=test.mp4&amp;type=play</code>.</p><h2 id="_6-url-parameters" tabindex="-1"><a class="header-anchor" href="#_6-url-parameters" aria-hidden="true">#</a> 6. URL Parameters</h2><p>ZLMediaKit recognizes the string after the question mark in the URL as parameters, which are consistent with HTTP formats. Among them, <code>vhost</code> is a built-in parameter supported by ZLMediaKit, which allows specifying a virtual host. URL parameters are mainly used for streaming and playback authentication. When triggering the hook API, these parameters will be submitted to the third-party business server.</p>',35)]))}const m=o(a,[["render",s],["__file","play_url_rules.html.vue"]]);export{m as default};
