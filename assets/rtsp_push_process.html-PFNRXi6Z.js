import{_ as a}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as e,c as n,e as s}from"./app-RP31lnfq.js";const d={},p=s(`<h1 id="_1、客户端发送-announce-命令" tabindex="-1"><a class="header-anchor" href="#_1、客户端发送-announce-命令" aria-hidden="true">#</a> 1、客户端发送 ANNOUNCE 命令</h1><p>此步骤主要传输 SDP，一般而言在这个命令之前还需要 OPTIONS 命令侦探服务器是否支持推流协议，但是为了减少交互次数，可以直接发送 ANNOUNCE 命令，如果不支持，服务器自然响应错误代码。</p><div class="language-http line-numbers-mode" data-ext="http"><pre class="language-http"><code>ANNOUNCE rtsp://10.0.9.130:554/live/2.sdp RTSP/1.0
<span class="token header"><span class="token header-name keyword">CSeq</span><span class="token punctuation">:</span> <span class="token header-value">1</span></span>
<span class="token header"><span class="token header-name keyword">User-Agent</span><span class="token punctuation">:</span> <span class="token header-value">EasyPusher v1.2.16.1105</span></span>
<span class="token header"><span class="token header-name keyword">Content-Type</span><span class="token punctuation">:</span> <span class="token header-value">application/sdp</span></span>
<span class="token header"><span class="token header-name keyword">Content-Length</span><span class="token punctuation">:</span> <span class="token header-value">541</span></span>

v=0
o=- 0 0 IN IP4 127.0.0.1
s=EasyDarwin
i=EasyDarwin
c=IN IP4 127.0.0.1
t=0 0
a=x-qt-text-nam:EasyDarwin
a=x-qt-text-inf:EasyDarwin
a=x-qt-text-cmt:source application::EasyDarwin
a=x-qt-text-aut:
a=x-qt-text-cpy:
m=video 0 RTP/AVP 96
a=rtpmap:96 H264/90000
a=fmtp:96 packetization-mode=1;sprop-parameter-sets=
a=control:streamid=0
m=audio 0 RTP/AVP 97
a=rtpmap:97 MPEG4-GENERIC/8000/1
a=fmtp:97 streamtype=5;profile-level-id=1;mode=AAC-hbr;sizelength=13;indexlength=3;indexdeltalength=3;config=1588
a=control:streamid=1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_2、服务器响应-announce-命令" tabindex="-1"><a class="header-anchor" href="#_2、服务器响应-announce-命令" aria-hidden="true">#</a> 2、服务器响应 ANNOUNCE 命令</h1><p>服务器如果解析 SDP 成功，那么会返回 200 代码表明成功</p><div class="language-http line-numbers-mode" data-ext="http"><pre class="language-http"><code>RTSP/1.0 200 OK
<span class="token header"><span class="token header-name keyword">CSeq</span><span class="token punctuation">:</span> <span class="token header-value">1</span></span>
<span class="token header"><span class="token header-name keyword">Date</span><span class="token punctuation">:</span> <span class="token header-value">Tue, Mar 26 2019 09:10:10 GMT</span></span>
<span class="token header"><span class="token header-name keyword">Server</span><span class="token punctuation">:</span> <span class="token header-value">ZLMediaKit-4.0(build in Mar 26 2019 17:01:17)</span></span>
<span class="token header"><span class="token header-name keyword">Session</span><span class="token punctuation">:</span> <span class="token header-value">KPUZ49ejotyD</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_3、客户端发送-setup-命令" tabindex="-1"><a class="header-anchor" href="#_3、客户端发送-setup-命令" aria-hidden="true">#</a> 3、客户端发送 SETUP 命令</h1><p>此命令作用是协商 rtp 传输方式，可选 tcp 和 udp 方式，为了简便，建议使用 tcp 方式推流 需要指出的是，如果 sdp 中有多个 track(例如音视频都有)，那么 SETUP 命令交互会有多次</p><div class="language-http line-numbers-mode" data-ext="http"><pre class="language-http"><code>SETUP rtsp://10.0.9.130:554/live/2.sdp/streamid=0 RTSP/1.0
<span class="token header"><span class="token header-name keyword">Transport</span><span class="token punctuation">:</span> <span class="token header-value">RTP/AVP/TCP;unicast;mode=record;interleaved=0-1</span></span>
<span class="token header"><span class="token header-name keyword">CSeq</span><span class="token punctuation">:</span> <span class="token header-value">2</span></span>
<span class="token header"><span class="token header-name keyword">User-Agent</span><span class="token punctuation">:</span> <span class="token header-value">EasyPusher v1.2.16.1105</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_4、服务器响应-setup-命令" tabindex="-1"><a class="header-anchor" href="#_4、服务器响应-setup-命令" aria-hidden="true">#</a> 4、服务器响应 SETUP 命令</h1><p>服务器返回协商好的 interleaved，其他自便</p><div class="language-http line-numbers-mode" data-ext="http"><pre class="language-http"><code>RTSP/1.0 200 OK
<span class="token header"><span class="token header-name keyword">CSeq</span><span class="token punctuation">:</span> <span class="token header-value">2</span></span>
<span class="token header"><span class="token header-name keyword">Date</span><span class="token punctuation">:</span> <span class="token header-value">Tue, Mar 26 2019 09:10:10 GMT</span></span>
<span class="token header"><span class="token header-name keyword">Server</span><span class="token punctuation">:</span> <span class="token header-value">ZLMediaKit-4.0(build in Mar 26 2019 17:01:17)</span></span>
<span class="token header"><span class="token header-name keyword">Session</span><span class="token punctuation">:</span> <span class="token header-value">KPUZ49ejotyD</span></span>
<span class="token header"><span class="token header-name keyword">Transport</span><span class="token punctuation">:</span> <span class="token header-value">RTP/AVP/TCP;unicast;interleaved=0-1;ssrc=00000000</span></span>
<span class="token header"><span class="token header-name keyword">x-Dynamic-Rate</span><span class="token punctuation">:</span> <span class="token header-value">1</span></span>
<span class="token header"><span class="token header-name keyword">x-Transport-Options</span><span class="token punctuation">:</span> <span class="token header-value">late-tolerance=1.400000</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_5、客户端发送-record-命令" tabindex="-1"><a class="header-anchor" href="#_5、客户端发送-record-命令" aria-hidden="true">#</a> 5、客户端发送 RECORD 命令</h1><p>相当于播放时的 play 命令，同步命令，让服务器准备好。 请注意,为了节省篇幅,该命令前省略了一次 SETUP 交互</p><div class="language-http line-numbers-mode" data-ext="http"><pre class="language-http"><code>RECORD rtsp://10.0.9.130:554/live/2.sdp RTSP/1.0
<span class="token header"><span class="token header-name keyword">Range</span><span class="token punctuation">:</span> <span class="token header-value">npt=0.000-</span></span>
<span class="token header"><span class="token header-name keyword">CSeq</span><span class="token punctuation">:</span> <span class="token header-value">4</span></span>
<span class="token header"><span class="token header-name keyword">User-Agent</span><span class="token punctuation">:</span> <span class="token header-value">EasyPusher v1.2.16.1105</span></span>
<span class="token header"><span class="token header-name keyword">Session</span><span class="token punctuation">:</span> <span class="token header-value">KPUZ49ejotyD</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_6、服务器响应-record-命令-可以开始推流" tabindex="-1"><a class="header-anchor" href="#_6、服务器响应-record-命令-可以开始推流" aria-hidden="true">#</a> 6、服务器响应 RECORD 命令，可以开始推流！</h1><p>服务器响应 RECORD 命令后，推流客户端就可以源源不断发送 RTP 包了</p><div class="language-http line-numbers-mode" data-ext="http"><pre class="language-http"><code>RTSP/1.0 200 OK
<span class="token header"><span class="token header-name keyword">CSeq</span><span class="token punctuation">:</span> <span class="token header-value">4</span></span>
<span class="token header"><span class="token header-name keyword">Date</span><span class="token punctuation">:</span> <span class="token header-value">Tue, Mar 26 2019 09:10:10 GMT</span></span>
<span class="token header"><span class="token header-name keyword">RTP-Info</span><span class="token punctuation">:</span> <span class="token header-value">url=rtsp://10.0.9.130:554/live/2.sdp/streamid=0,url=rtsp://10.0.9.130:554/live/2.sdp/streamid=1</span></span>
<span class="token header"><span class="token header-name keyword">Server</span><span class="token punctuation">:</span> <span class="token header-value">ZLMediaKit-4.0(build in Mar 26 2019 17:01:17)</span></span>
<span class="token header"><span class="token header-name keyword">Session</span><span class="token punctuation">:</span> <span class="token header-value">KPUZ49ejotyD</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,18),t=[p];function l(i,r){return e(),n("div",null,t)}const u=a(d,[["render",l],["__file","rtsp_push_process.html.vue"]]);export{u as default};
