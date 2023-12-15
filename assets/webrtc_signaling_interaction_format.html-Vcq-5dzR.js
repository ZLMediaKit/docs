import{_ as a}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as n,c as e,e as s}from"./app-RP31lnfq.js";const t={},r=s(`<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>zlmediakit webrtc 信令格式新增支持 whip/whep 标准，测试地址如下：</p><p>推流：https://zlmediakit.com/index/api/whip?app=live&amp;stream=test</p><p>拉流：https://zlmediakit.com/index/api/whep?app=live&amp;stream=test</p><p>本文后续篇幅为私有信令格式。</p><h2 id="一、webrtc-sdp-交换请求基本格式" tabindex="-1"><a class="header-anchor" href="#一、webrtc-sdp-交换请求基本格式" aria-hidden="true">#</a> 一、webrtc sdp 交换请求基本格式</h2><ul><li>请求地址: /index/api/webrtc?app=live&amp;stream=test&amp;type=[push/play/echo]</li><li>请求方式: http post</li><li>请求 body: webrtc offer sdp</li><li>回复 body:</li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;code&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;zlm_1&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;sdp&quot;</span><span class="token operator">:</span> <span class="token string">&quot;v=0\\r\\no=mozilla...THIS_IS_SDPARTA-99.0 6880954646154322397 0 IN IP4 172.18.190.185\\r\\ns=-\\r\\nt=0 0\\r\\na=group:BUNDLE 0 1\\r\\na=msid-semantic: WMS *\\r\\na=ice-lite\\r\\nm=audio 8000 UDP/TLS/RTP/SAVPF 0\\r\\nc=IN IP4 172.18.190.185\\r\\na=rtcp:8000 IN IP4 172.18.190.185\\r\\na=ice-ufrag:rBK+uR9AAAA=_2\\r\\na=ice-pwd:H4rtFC1xhef0ynU2lk8z22ha\\r\\na=fingerprint:sha-256 6E:EF:E7:75:56:2A:66:DF:6C:9D:72:B6:A5:21:35:73:19:66:D8:00:F4:BC:36:59:61:1B:5D:35:13:99:14:AE\\r\\na=setup:passive\\r\\na=mid:0\\r\\na=ice-lite\\r\\na=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level\\r\\na=extmap:2/sendonly urn:ietf:params:rtp-hdrext:csrc-audio-level\\r\\na=recvonly\\r\\na=rtcp-mux\\r\\na=rtpmap:0 PCMU/8000/1\\r\\na=candidate:udpcandidate 1 udp 120 172.18.190.185 8000 typ host\\r\\nm=video 8000 UDP/TLS/RTP/SAVPF 126 127\\r\\nc=IN IP4 172.18.190.185\\r\\na=rtcp:8000 IN IP4 172.18.190.185\\r\\na=ice-ufrag:rBK+uR9AAAA=_2\\r\\na=ice-pwd:H4rtFC1xhef0ynU2lk8z22ha\\r\\na=fingerprint:sha-256 6E:EF:E7:75:56:2A:66:DF:6C:9D:72:B6:A5:21:35:73:19:66:D8:00:F4:BC:36:59:61:1B:5D:35:13:99:14:AE\\r\\na=setup:passive\\r\\na=mid:1\\r\\na=ice-lite\\r\\na=extmap:4 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\\r\\na=extmap:5 urn:ietf:params:rtp-hdrext:toffset\\r\\na=extmap:6/sendonly http://www.webrtc.org/experiments/rtp-hdrext/playout-delay\\r\\na=extmap:7 http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01\\r\\na=recvonly\\r\\na=rtcp-mux\\r\\na=rtpmap:126 H264/90000\\r\\na=rtcp-fb:126 ccm fir\\r\\na=rtcp-fb:126 goog-remb\\r\\na=rtcp-fb:126 nack\\r\\na=rtcp-fb:126 nack pli\\r\\na=rtcp-fb:126 transport-cc\\r\\na=fmtp:126 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f;x-google-max-bitrate=8000;x-google-min-bitrate=4000;x-google-start-bitrate=6000\\r\\na=rtpmap:127 rtx/90000\\r\\na=fmtp:127 apt=126\\r\\na=candidate:udpcandidate 1 udp 120 172.18.190.185 8000 typ host\\r\\n&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;answer&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、支持的-type-类型" tabindex="-1"><a class="header-anchor" href="#二、支持的-type-类型" aria-hidden="true">#</a> 二、支持的 type 类型</h2><ul><li>push: webrtc 推流</li><li>play: webrtc 播放</li><li>echo: webrtc 镜像回显(仅用于 webrtc 双向测试)</li><li>用户可以二次开发注册更多类型插件。</li></ul><h2 id="三、范例" tabindex="-1"><a class="header-anchor" href="#三、范例" aria-hidden="true">#</a> 三、范例</h2><ul><li>请求：</li></ul><div class="language-http line-numbers-mode" data-ext="http"><pre class="language-http"><code><span class="token request-line"><span class="token method property">POST</span> <span class="token request-target url">/index/api/webrtc?app=live&amp;stream=test&amp;type=push</span> <span class="token http-version property">HTTP/1.1</span></span>
<span class="token header"><span class="token header-name keyword">Host</span><span class="token punctuation">:</span> <span class="token header-value">127.0.0.1:8080</span></span>
<span class="token header"><span class="token header-name keyword">User-Agent</span><span class="token punctuation">:</span> <span class="token header-value">Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/111.0</span></span>
<span class="token header"><span class="token header-name keyword">Accept</span><span class="token punctuation">:</span> <span class="token header-value">application/json, text/plain, */*</span></span>
<span class="token header"><span class="token header-name keyword">Accept-Language</span><span class="token punctuation">:</span> <span class="token header-value">zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2</span></span>
<span class="token header"><span class="token header-name keyword">Accept-Encoding</span><span class="token punctuation">:</span> <span class="token header-value">gzip, deflate, br</span></span>
<span class="token header"><span class="token header-name keyword">Content-Type</span><span class="token punctuation">:</span> <span class="token header-value">text/plain;charset=utf-8</span></span>
<span class="token header"><span class="token header-name keyword">Content-Length</span><span class="token punctuation">:</span> <span class="token header-value">2654</span></span>
<span class="token header"><span class="token header-name keyword">Origin</span><span class="token punctuation">:</span> <span class="token header-value">http://127.0.0.1:8080</span></span>
<span class="token header"><span class="token header-name keyword">Connection</span><span class="token punctuation">:</span> <span class="token header-value">keep-alive</span></span>
<span class="token header"><span class="token header-name keyword">Referer</span><span class="token punctuation">:</span> <span class="token header-value">http://127.0.0.1:8080/webrtc/</span></span>
<span class="token header"><span class="token header-name keyword">Cookie</span><span class="token punctuation">:</span> <span class="token header-value">ZL_COOKIE=45bcd71af9fbfa8fe576d1ef3f42ef69</span></span>
<span class="token header"><span class="token header-name keyword">Sec-Fetch-Dest</span><span class="token punctuation">:</span> <span class="token header-value">empty</span></span>
<span class="token header"><span class="token header-name keyword">Sec-Fetch-Mode</span><span class="token punctuation">:</span> <span class="token header-value">cors</span></span>
<span class="token header"><span class="token header-name keyword">Sec-Fetch-Site</span><span class="token punctuation">:</span> <span class="token header-value">same-origin</span></span>

v=0
o=mozilla...THIS_IS_SDPARTA-99.0 6880954646154322397 0 IN IP4 0.0.0.0
s=-
t=0 0
a=fingerprint:sha-256 10:09:E1:DB:B6:2D:58:ED:B3:7A:7A:B7:77:34:64:06:65:E7:5F:F2:CB:B5:BA:1A:C5:7C:A6:F5:8C:29:45:E0
a=group:BUNDLE 0 1
a=ice-options:trickle
a=msid-semantic:WMS *
m=audio 9 UDP/TLS/RTP/SAVPF 109 9 0 8 101
c=IN IP4 0.0.0.0
a=sendrecv
a=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level
a=extmap:2/recvonly urn:ietf:params:rtp-hdrext:csrc-audio-level
a=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid
a=fmtp:109 maxplaybackrate=48000;stereo=1;useinbandfec=1
a=fmtp:101 0-15
a=ice-pwd:e4efb3b86c1b7e1cb8fd949db7796641
a=ice-ufrag:24ab201c
a=mid:0
a=msid:- {2320d86d-4e2f-4c3f-a378-b9e701dceeae}
a=rtcp-mux
a=rtpmap:109 opus/48000/2
a=rtpmap:9 G722/8000/1
a=rtpmap:0 PCMU/8000
a=rtpmap:8 PCMA/8000
a=rtpmap:101 telephone-event/8000/1
a=setup:actpass
a=ssrc:1347702353 cname:{e94c5049-fb95-4bd6-b2d1-221cd51b713f}
m=video 9 UDP/TLS/RTP/SAVPF 120 124 121 125 126 127 97 98
c=IN IP4 0.0.0.0
a=sendrecv
a=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid
a=extmap:4 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time
a=extmap:5 urn:ietf:params:rtp-hdrext:toffset
a=extmap:6/recvonly http://www.webrtc.org/experiments/rtp-hdrext/playout-delay
a=extmap:7 http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01
a=fmtp:126 profile-level-id=42e01f;level-asymmetry-allowed=1;packetization-mode=1
a=fmtp:97 profile-level-id=42e01f;level-asymmetry-allowed=1
a=fmtp:120 max-fs=12288;max-fr=60
a=fmtp:124 apt=120
a=fmtp:121 max-fs=12288;max-fr=60
a=fmtp:125 apt=121
a=fmtp:127 apt=126
a=fmtp:98 apt=97
a=ice-pwd:e4efb3b86c1b7e1cb8fd949db7796641
a=ice-ufrag:24ab201c
a=mid:1
a=msid:- {270d6bf9-cf47-4e3f-9bb5-e9bf7143ea4a}
a=rtcp-fb:120 nack
a=rtcp-fb:120 nack pli
a=rtcp-fb:120 ccm fir
a=rtcp-fb:120 goog-remb
a=rtcp-fb:120 transport-cc
a=rtcp-fb:121 nack
a=rtcp-fb:121 nack pli
a=rtcp-fb:121 ccm fir
a=rtcp-fb:121 goog-remb
a=rtcp-fb:121 transport-cc
a=rtcp-fb:126 nack
a=rtcp-fb:126 nack pli
a=rtcp-fb:126 ccm fir
a=rtcp-fb:126 goog-remb
a=rtcp-fb:126 transport-cc
a=rtcp-fb:97 nack
a=rtcp-fb:97 nack pli
a=rtcp-fb:97 ccm fir
a=rtcp-fb:97 goog-remb
a=rtcp-fb:97 transport-cc
a=rtcp-mux
a=rtcp-rsize
a=rtpmap:120 VP8/90000
a=rtpmap:124 rtx/90000
a=rtpmap:121 VP9/90000
a=rtpmap:125 rtx/90000
a=rtpmap:126 H264/90000
a=rtpmap:127 rtx/90000
a=rtpmap:97 H264/90000
a=rtpmap:98 rtx/90000
a=setup:actpass
a=ssrc:3676200744 cname:{e94c5049-fb95-4bd6-b2d1-221cd51b713f}
a=ssrc:3937745592 cname:{e94c5049-fb95-4bd6-b2d1-221cd51b713f}
a=ssrc-group:FID 3676200744 3937745592
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>响应：</li></ul><div class="language-http line-numbers-mode" data-ext="http"><pre class="language-http"><code><span class="token response-status"><span class="token http-version property">HTTP/1.1</span> <span class="token status-code number">200</span> <span class="token reason-phrase string">OK</span></span>
<span class="token header"><span class="token header-name keyword">Access-Control-Allow-Credentials</span><span class="token punctuation">:</span> <span class="token header-value">true</span></span>
<span class="token header"><span class="token header-name keyword">Access-Control-Allow-Origin</span><span class="token punctuation">:</span> <span class="token header-value">*</span></span>
<span class="token header"><span class="token header-name keyword">Connection</span><span class="token punctuation">:</span> <span class="token header-value">keep-alive</span></span>
<span class="token header"><span class="token header-name keyword">Content-Length</span><span class="token punctuation">:</span> <span class="token header-value">1923</span></span>
<span class="token header"><span class="token header-name keyword">Content-Type</span><span class="token punctuation">:</span> <span class="token header-value">application/json</span></span>
<span class="token header"><span class="token header-name keyword">Date</span><span class="token punctuation">:</span> <span class="token header-value">Wed, Mar 29 2023 12:43:08 GMT</span></span>
<span class="token header"><span class="token header-name keyword">Keep-Alive</span><span class="token punctuation">:</span> <span class="token header-value">timeout=30, max=100</span></span>
<span class="token header"><span class="token header-name keyword">Server</span><span class="token punctuation">:</span> <span class="token header-value">ZLMediaKit(git hash:500d2c6a/2023-03-14T17:33:46+08:00,branch:master,build time:2023-03-15T15:03:55)</span></span>
<span class="token application-json">
<span class="token punctuation">{</span>
   <span class="token property">&quot;code&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
   <span class="token property">&quot;id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;zlm_1&quot;</span><span class="token punctuation">,</span>
   <span class="token property">&quot;sdp&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;v=0\\r\\no=mozilla...THIS_IS_SDPARTA-99.0 6880954646154322397 0 IN IP4 172.18.190.185\\r\\ns=-\\r\\nt=0 0\\r\\na=group:BUNDLE 0 1\\r\\na=msid-semantic: WMS *\\r\\na=ice-lite\\r\\nm=audio 8000 UDP/TLS/RTP/SAVPF 0\\r\\nc=IN IP4 172.18.190.185\\r\\na=rtcp:8000 IN IP4 172.18.190.185\\r\\na=ice-ufrag:rBK+uR9AAAA=_2\\r\\na=ice-pwd:H4rtFC1xhef0ynU2lk8z22ha\\r\\na=fingerprint:sha-256 6E:EF:E7:75:56:2A:66:DF:6C:9D:72:B6:A5:21:35:73:19:66:D8:00:F4:BC:36:59:61:1B:5D:35:13:99:14:AE\\r\\na=setup:passive\\r\\na=mid:0\\r\\na=ice-lite\\r\\na=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level\\r\\na=extmap:2/sendonly urn:ietf:params:rtp-hdrext:csrc-audio-level\\r\\na=recvonly\\r\\na=rtcp-mux\\r\\na=rtpmap:0 PCMU/8000/1\\r\\na=candidate:udpcandidate 1 udp 120 172.18.190.185 8000 typ host\\r\\nm=video 8000 UDP/TLS/RTP/SAVPF 126 127\\r\\nc=IN IP4 172.18.190.185\\r\\na=rtcp:8000 IN IP4 172.18.190.185\\r\\na=ice-ufrag:rBK+uR9AAAA=_2\\r\\na=ice-pwd:H4rtFC1xhef0ynU2lk8z22ha\\r\\na=fingerprint:sha-256 6E:EF:E7:75:56:2A:66:DF:6C:9D:72:B6:A5:21:35:73:19:66:D8:00:F4:BC:36:59:61:1B:5D:35:13:99:14:AE\\r\\na=setup:passive\\r\\na=mid:1\\r\\na=ice-lite\\r\\na=extmap:4 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\\r\\na=extmap:5 urn:ietf:params:rtp-hdrext:toffset\\r\\na=extmap:6/sendonly http://www.webrtc.org/experiments/rtp-hdrext/playout-delay\\r\\na=extmap:7 http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01\\r\\na=recvonly\\r\\na=rtcp-mux\\r\\na=rtpmap:126 H264/90000\\r\\na=rtcp-fb:126 ccm fir\\r\\na=rtcp-fb:126 goog-remb\\r\\na=rtcp-fb:126 nack\\r\\na=rtcp-fb:126 nack pli\\r\\na=rtcp-fb:126 transport-cc\\r\\na=fmtp:126 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f;x-google-max-bitrate=8000;x-google-min-bitrate=4000;x-google-start-bitrate=6000\\r\\na=rtpmap:127 rtx/90000\\r\\na=fmtp:127 apt=126\\r\\na=candidate:udpcandidate 1 udp 120 172.18.190.185 8000 typ host\\r\\n&quot;</span><span class="token punctuation">,</span>
   <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;answer&quot;</span>
<span class="token punctuation">}</span>

</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15),i=[r];function p(l,c){return n(),e("div",null,i)}const u=a(t,[["render",p],["__file","webrtc_signaling_interaction_format.html.vue"]]);export{u as default};
