import{_ as d}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o,c as r,a as n,d as s,b as a,w as t,e}from"./app-684fa53c.js";const p={},u=e(`<h2 id="_1、先播放后推流" tabindex="-1"><a class="header-anchor" href="#_1、先播放后推流" aria-hidden="true">#</a> 1、先播放后推流</h2><ul><li><p>痛点：推流成功前不能提前播放</p></li><li><p>场景介绍:</p><p>有些及时推流的场景，存在推流和播放同时发生的场景，这种场景一般是一对一的，譬如说基于rtmp推流的行车记录仪，用户在调阅车载摄像头视频的，下发推流命令给设备时，同时开始播放视频，如果播放请求先于推流到达流媒体服务器，那么流媒体服务器通常会立即返回流未找到的错误，为了解决这个问题，一般的解决方案是，通过设备确认推流成功再开启播放，但是这样往往会增加视频打开延时，拉低用户体验。zlmediakit针对此场景作出特别优化，可以在流不存在时，先不回复播放器，等推流成功后再返回播放成功，如果超时时间内，推流还不上线，那么再返回播放流不存在错误，通过配置文件可以修改此延时：</p><div class="language-ini line-numbers-mode" data-ext="ini"><pre class="language-ini"><code><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">general</span><span class="token punctuation">]</span></span>
<span class="token comment">#播放最多等待时间，单位毫秒</span>
<span class="token comment">#播放在播放某个流时，如果该流不存在，</span>
<span class="token comment">#ZLMediaKit会最多让播放器等待maxStreamWaitMS毫秒</span>
<span class="token comment">#如果在这个时间内，该流注册成功，那么会立即返回播放器播放成功</span>
<span class="token comment">#否则返回播放器未找到该流，该机制的目的是可以先播放再推流</span>
<span class="token key attr-name">maxStreamWaitMS</span><span class="token punctuation">=</span><span class="token value attr-value">15000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>提示: 此功能同样适用于拉流，通过该功能可以实现按需推拉流。</p></blockquote></li></ul><h2 id="_2、无人观看事件" tabindex="-1"><a class="header-anchor" href="#_2、无人观看事件" aria-hidden="true">#</a> 2、无人观看事件</h2>`,3),m=n("li",null,[n("p",null,"痛点: 推流无人观看时白白浪费流量")],-1),v=e(`<p>场景介绍:</p><p>在一些物联网应用场景，设备推流给服务端，用户通过app查看设备视频，当用户关闭app时，设备应该停止推流以节省流量。为了实现该功能，一般的解决方案是播放端通过发送心跳维持设备推流，但是这样往往存在状态的不确定性，以及增加系统复杂度(想想app、web、小程序端同时维持推流心跳的场景)。针对此种场景，zlmediakit提供播放用户统计功能，在观看数为0时会触发无人观看事件，用户通过接收zlmediakit的 hook（http请求），可以返回是否让zlmediakit关闭该推流(或拉流)，hook地址配置文件为：</p><div class="language-ini line-numbers-mode" data-ext="ini"><pre class="language-ini"><code><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">hook</span><span class="token punctuation">]</span></span>
<span class="token comment">#是否启用hook事件，启用后，推拉流都将进行鉴权</span>
<span class="token key attr-name">enable</span><span class="token punctuation">=</span><span class="token value attr-value">1</span>
<span class="token comment">#无人观看流事件，通过该事件，可以选择是否关闭无人观看的流。配合general.streamNoneReaderDelayMS选项一起使用</span>
<span class="token key attr-name">on_stream_none_reader</span><span class="token punctuation">=</span><span class="token value attr-value">https://127.0.0.1/index/hook/on_stream_none_reader</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),_=n("h2",{id:"_3、流未找到事件",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_3、流未找到事件","aria-hidden":"true"},"#"),s(" 3、流未找到事件")],-1),k=n("li",null,[n("p",null,"痛点: 我们只需对外提供播放url，而不是其他！")],-1),h=e(`<p>场景介绍:</p><p>通常而言，我们通过播放url来分发视频内容，但是这些视频内容是及时生成的，在无人播放时，它并不存在(不存在推流或拉流代理)。这种场景下，通常的做法是用户需要限制客户端，因为提供的不是播放url，而是获取url的api，用户先获取播放url用于触发设备推流，然后才能播放，这种方式通常而言比较繁琐，需要特定的播放前逻辑，限制了一些应用场景。zlmediakit提供流未找到事件，可以汇报给你的业务服务器，告知流不存在，这个时候，你可以再从容控制设备开始推流，或者让zlmediakit开始拉流代理，hook地址配置文件为：</p><div class="language-ini line-numbers-mode" data-ext="ini"><pre class="language-ini"><code><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">hook</span><span class="token punctuation">]</span></span>
<span class="token comment">#是否启用hook事件，启用后，推拉流都将进行鉴权</span>
<span class="token key attr-name">enable</span><span class="token punctuation">=</span><span class="token value attr-value">1</span>
<span class="token comment">#播放时，未找到流事件，通过配合hook.on_stream_none_reader事件可以完成按需拉流</span>
<span class="token key attr-name">on_stream_not_found</span><span class="token punctuation">=</span><span class="token value attr-value">https://127.0.0.1/index/hook/on_stream_not_found</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),b=e(`<h2 id="_4、断连续推" tabindex="-1"><a class="header-anchor" href="#_4、断连续推" aria-hidden="true">#</a> 4、断连续推</h2><ul><li><p>痛点：推流断开，推流器重连了，导致播放器都全部断开了！</p></li><li><p>场景介绍：</p><p>一般推流器断开，服务器处理播放器的逻辑有这几种，一种是立即断开所有播放这个流的播放器，同时销毁推流器、播放器对象以便节省资源，这也是zlmediakit的默认做法。另外一种是以srs为代表，推流器断开后，基本什么也不做，不回收推流器开辟的资源，也不断开播放器(而是让播放器主动超时断开)。</p><p>srs这种处理方式有个好处，就是推流器重新推流后，播放器可以接着播放，用户体验比较好。坏处就是资源不能及时回收，如果有恶意链接不主动及时超时断开，可能会消耗服务器大量的文件描述符资源，同时由于推流器创建的媒体源资源无法主动释放，当创建很多个推流时，内存占用不能及时降低。</p><p>zlmediakit现在针对这种场景，新增支持断连续推功能，解决了推流重连导致播放器断开的问题，也解决了资源无法及时回收的弊端，做法是，在推流器断开时，延时销毁媒体源资源对象(同时延时断开播放器)，当推流器再次推流时，复用该资源对象，播放器可以接着观看视频；如果超时后，推流器未上线，那么再断开播放器并回收所有资源。超时延时配置文件为：</p><div class="language-ini line-numbers-mode" data-ext="ini"><pre class="language-ini"><code><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">general</span><span class="token punctuation">]</span></span>
<span class="token comment">#推流断开后可以在超时时间内重新连接上继续推流，这样播放器会接着播放。</span>
<span class="token comment">#置0关闭此特性(推流断开会导致立即断开播放器)</span>
<span class="token comment">#此参数不应大于播放器超时时间</span>
<span class="token key attr-name">continue_push_ms</span><span class="token punctuation">=</span><span class="token value attr-value">15000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>实现代码片段：</p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>void RtmpSession::onError(const SockException&amp; err) {
    //省略无关代码

    GET_CONFIG(uint32_t, continue_push_ms, General::kContinuePushMS);
    if (_push_src &amp;&amp; continue_push_ms) {
        //取消推流对象所有权
        _push_src_ownership = nullptr;
        auto push_src = std::move(_push_src);
        //延时若干秒再销毁对象(注销流, 同时触发断开所有播放器操作)
        getPoller()-&gt;doDelayTask(continue_push_ms, [push_src]() { return 0; });
    }
}

void RtmpSession::onCmd_publish(AMFDecoder &amp;dec) {
  //省略大量无关代码
  auto src = MediaSource::find(RTMP_SCHEMA, _media_info._vhost, _media_info._app, _media_info._streamid);

  while (src) {
    //尝试断连后继续推流
    auto rtmp_src = dynamic_pointer_cast&lt;RtmpMediaSourceImp&gt;(src);
    if (!rtmp_src) {
      //源不是rtmp推流产生的
      break;
    }
    auto ownership = rtmp_src-&gt;getOwnership();
    if (!ownership) {
      //获取推流源所有权失败
      break;
    }
    //复用之前推流资源对象
    _push_src = std::move(rtmp_src);
    //持有对象所有权
    _push_src_ownership = std::move(ownership);
    break;
  }
  //省略大量无关代码
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>提示：断连续推功能支持rtsp/rtmp/webrtc推流。</p></blockquote></li></ul><h2 id="_5、集群部署" tabindex="-1"><a class="header-anchor" href="#_5、集群部署" aria-hidden="true">#</a> 5、集群部署</h2><ul><li><p>痛点： 溯源方式单一，边沿服务器不能使用HLS。</p></li><li><p>场景介绍:</p><p>一般流媒体集群实现方式采用溯源方式实现，服务器分为源站和边沿站。源站一般用于接收推流，它一般不直接承载用户的播放请求，而是通过边沿服务器向其拉流同时分发给播放器，通过该模式可以支持海量的用户播放请求。srs很早之前已经通过配置文件的方式支持该功能，由于zlmediakit比较早也提供按需拉流的功能，本质上也支持溯源模式的集群，不过用户需要对接hook和api，开发门槛比较高，所以最近zlmediakit也支持了通过配置文件的方式来实现集群模式，配置文件如下:</p><div class="language-ini line-numbers-mode" data-ext="ini"><pre class="language-ini"><code><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">cluster</span><span class="token punctuation">]</span></span>
<span class="token comment">#设置源站拉流url模板, 格式跟printf类似，第一个%s指定app,第二个%s指定stream_id,</span>
<span class="token comment">#开启集群模式后，on_stream_not_found和on_stream_none_reader hook将无效.</span>
<span class="token comment">#溯源模式支持以下类型:</span>
<span class="token comment">#rtmp方式: rtmp://127.0.0.1:1935/%s/%s</span>
<span class="token comment">#rtsp方式: rtsp://127.0.0.1:554/%s/%s</span>
<span class="token comment">#hls方式: http://127.0.0.1:80/%s/%s/hls.m3u8</span>
<span class="token comment">#http-ts方式: http://127.0.0.1:80/%s/%s.live.ts</span>
<span class="token comment">#支持多个源站，不同源站通过分号(;)分隔</span>
<span class="token key attr-name">origin_url</span><span class="token punctuation">=</span>
<span class="token comment">#溯源总超时时长，单位秒，float型；假如源站有3个，那么单次溯源超时时间为timeout_sec除以3</span>
<span class="token comment">#单次溯源超时时间不要超过general.maxStreamWaitMS配置</span>
<span class="token key attr-name">timeout_sec</span><span class="token punctuation">=</span><span class="token value attr-value">15</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>zlmediakit的溯源方式支持rtsp/rtmp/hls/http-ts/http-flv， 方式多样丰富，同时源站不分主备，采用round robin方式来实现源站的负载均衡。需要指出的是，由于zlmediakit很早就支持hls的按需拉流功能，所以zlmediakit的边沿站也支持hls协议(其实支持zlmediakit任意支持的协议)，这点是srs不具备的。</p><p>另外需要指出的是，由于zlmediakit同时支持rtsp和webrtc，而它们两者都是基于rtp的，在zlmediakit内部，无须转协议简单处理后就可互联互通，所以使用zlmediakit来做大规模的webrtc低延时直播已经成为可能；相较于传统的基于rtmp的cdn，rtsp更适合作为webrtc的cdn基础传输协议，开发者不需要处理繁琐的解复用复用逻辑，即可平滑的实现rtsp与webrtc的互转。</p></li></ul><h2 id="_6、webrtc单端口、多线程、支持连接迁移" tabindex="-1"><a class="header-anchor" href="#_6、webrtc单端口、多线程、支持连接迁移" aria-hidden="true">#</a> 6、WebRTC单端口、多线程、支持连接迁移</h2>`,5),g=n("li",null,[n("p",null,"痛点：支持多线程的webrtc服务器不支持单端口，支持单端口的不支持多线程(同时可能不支持链接迁移)")],-1),f=n("p",null,"场景介绍：",-1),w=n("p",null,"由于webrtc传输是基于udp协议的，传统的webrtc服务器都是多端口模式，譬如janus/mediasoup。这给部署和管理带来极大痛苦,而且由于端口个数有限(理论上限6万多)，每个webrtc客户端要占用1至4个端口，受限于端口数量，一台webrtc服务器最多可以承载1~6万左右的客户端数。",-1),x=n("p",null,"而支持单端口的webrtc服务器(譬如srs)，又不支持多线程；由于webrtc计算复杂度(加解密)远大于直播，其性能跟直播比有数量级的差距，所以往往单线程在webrtc的应用场景已经力不从心。",-1),z=n("p",null,"zlmediakit针对这些痛点，提出了最佳解决方案：",-1),S=n("ul",null,[n("li",null,"支持单udp端口部署，一个udp端口承载所有客户端。"),n("li",null,"单udp端口支持多线程，单端口多次bind/connect方式实现一个客户端对应一个fd，fd均匀分配到不同线程。"),n("li",null,"用户网络迁移时(譬如wifi切换为4G)，通过stun包锁定用户，实现无感知的连接迁移，用户体验不中断。")],-1),M=n("p",null,"以上3个特性都同时具备的，目前在开源界唯zlmediakit一家。",-1),y={href:"https://mp.weixin.qq.com/s?t=pages/video_detail_new&scene=23&vid=wxv_2170272938552328197&__biz=MzkzNjI5ODIyMg==&mid=2247483673&idx=1&sn=14bc138d91292a1c256c138c822d9c40&vidsn=#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},L=n("h2",{id:"_7、hls播放的长链接化",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_7、hls播放的长链接化","aria-hidden":"true"},"#"),s(" 7、HLS播放的长链接化")],-1),q=n("p",null,"zlmediakit通过cookie追踪技术实现hls短连接的长链接化，依赖该特性，zlm的hls服务器具备了以下独家特性：",-1),H=n("ul",null,[n("li",null,"HLS播放鉴权，并且播放途中无须再鉴权。"),n("li",null,"HLS播放流量统计，可以统计播放器播放途中所有短连接消耗流量总数。"),n("li",null,"HLS按需拉流，可以先播放zlmediakit的HLS链接，zlmediakit再去溯源拉流代理。"),n("li",null,"HLS无人观看时自动停止溯源拉流代理或掐断上游推流。")],-1),R=n("p",null,"另外，zlmediakit的hls服务器性能已优化至极致(通过共享ts mmap和内存m3u8实现)，单进程可以承载10W级别hls播放器，100Gb/s级别带宽。",-1);function C(E,N){const i=l("RouterLink"),c=l("ExternalLinkIcon");return o(),r("div",null,[u,n("ul",null,[m,n("li",null,[v,n("blockquote",null,[n("p",null,[s("提示: hook介绍"),a(i,{to:"/zh/guide/media_server/web_hook_api.html#13onstreamnonereader"},{default:t(()=>[s("地址")]),_:1})])])])]),_,n("ul",null,[k,n("li",null,[h,n("blockquote",null,[n("p",null,[s("提示: hook介绍"),a(i,{to:"/zh/guide/media_server/web_hook_api.html#14on_stream_not_found"},{default:t(()=>[s("地址")]),_:1})])])])]),b,n("ul",null,[g,n("li",null,[f,w,x,z,S,M,n("blockquote",null,[n("p",null,[s("提示: 关于怎么解决webrtc单端口连接迁移和多线程连接迁移时线程安全问题的请观看该"),n("a",y,[s("视频"),a(c)])])])])]),L,q,H,R])}const T=d(p,[["render",C],["__file","exclusive_features.html.vue"]]);export{T as default};
