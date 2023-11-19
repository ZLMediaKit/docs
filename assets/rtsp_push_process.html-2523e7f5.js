import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as n,e as a}from"./app-db7b86cf.js";const s={},d=a(`<h1 id="_1、客户端发送announce命令" tabindex="-1"><a class="header-anchor" href="#_1、客户端发送announce命令" aria-hidden="true">#</a> 1、客户端发送ANNOUNCE命令</h1><p>此步骤主要传输SDP，一般而言在这个命令之前还需要OPTIONS命令侦探服务器是否支持推流协议，但是为了减少交互次数，可以直接发送ANNOUNCE命令，如果不支持，服务器自然响应错误代码。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ANNOUNCE rtsp://10.0.9.130:554/live/2.sdp RTSP/1.0
CSeq: 1
User-Agent: EasyPusher v1.2.16.1105
Content-Type: application/sdp
Content-Length: 541

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_2、服务器响应announce命令" tabindex="-1"><a class="header-anchor" href="#_2、服务器响应announce命令" aria-hidden="true">#</a> 2、服务器响应ANNOUNCE命令</h1><p>服务器如果解析SDP成功，那么会返回200代码表明成功</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>RTSP/1.0 200 OK
CSeq: 1
Date: Tue, Mar 26 2019 09:10:10 GMT
Server: ZLMediaKit-4.0(build in Mar 26 2019 17:01:17)
Session: KPUZ49ejotyD
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_3、客户端发送setup命令" tabindex="-1"><a class="header-anchor" href="#_3、客户端发送setup命令" aria-hidden="true">#</a> 3、客户端发送SETUP命令</h1><p>此命令作用是协商rtp传输方式，可选tcp和udp方式，为了简便，建议使用tcp方式推流<br> 需要指出的是，如果sdp中有多个track(例如音视频都有)，那么SETUP命令交互会有多次</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SETUP rtsp://10.0.9.130:554/live/2.sdp/streamid=0 RTSP/1.0
Transport: RTP/AVP/TCP;unicast;mode=record;interleaved=0-1
CSeq: 2
User-Agent: EasyPusher v1.2.16.1105
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_4、服务器响应setup命令" tabindex="-1"><a class="header-anchor" href="#_4、服务器响应setup命令" aria-hidden="true">#</a> 4、服务器响应SETUP命令</h1><p>服务器返回协商好的interleaved，其他自便</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>RTSP/1.0 200 OK
CSeq: 2
Date: Tue, Mar 26 2019 09:10:10 GMT
Server: ZLMediaKit-4.0(build in Mar 26 2019 17:01:17)
Session: KPUZ49ejotyD
Transport: RTP/AVP/TCP;unicast;interleaved=0-1;ssrc=00000000
x-Dynamic-Rate: 1
x-Transport-Options: late-tolerance=1.400000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_5、客户端发送record命令" tabindex="-1"><a class="header-anchor" href="#_5、客户端发送record命令" aria-hidden="true">#</a> 5、客户端发送RECORD命令</h1><p>相当于播放时的play命令，同步命令，让服务器准备好。<br> 请注意,为了节省篇幅,该命令前省略了一次SETUP交互</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>RECORD rtsp://10.0.9.130:554/live/2.sdp RTSP/1.0
Range: npt=0.000-
CSeq: 4
User-Agent: EasyPusher v1.2.16.1105
Session: KPUZ49ejotyD
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_6、服务器响应record命令-可以开始推流" tabindex="-1"><a class="header-anchor" href="#_6、服务器响应record命令-可以开始推流" aria-hidden="true">#</a> 6、服务器响应RECORD命令，可以开始推流！</h1><p>服务器响应RECORD命令后，推流客户端就可以源源不断发送RTP包了</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>RTSP/1.0 200 OK
CSeq: 4
Date: Tue, Mar 26 2019 09:10:10 GMT
RTP-Info: url=rtsp://10.0.9.130:554/live/2.sdp/streamid=0,url=rtsp://10.0.9.130:554/live/2.sdp/streamid=1
Server: ZLMediaKit-4.0(build in Mar 26 2019 17:01:17)
Session: KPUZ49ejotyD
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,18),r=[d];function l(t,v){return i(),n("div",null,r)}const m=e(s,[["render",l],["__file","rtsp_push_process.html.vue"]]);export{m as default};
