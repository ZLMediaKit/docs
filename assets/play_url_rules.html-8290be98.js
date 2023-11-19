import{_ as c}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as l,c as t,a as e,d as o,b as m,e as s}from"./app-5e987558.js";const p={},a=e("h2",{id:"_1、url的组成部分",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_1、url的组成部分","aria-hidden":"true"},"#"),o(" 1、url的组成部分")],-1),r=e("p",null,[o("以"),e("code",null,"rtsp://somedomain.com:554/live/0?token=abcdefg&field=value"),o("为例,该url分为以下几个部分：")],-1),h=e("li",null,[e("code",null,"协议(scheam)"),o(" : rtsp协议,默认端口554")],-1),n=e("code",null,"虚拟主机(vhost)",-1),v={href:"http://somedomain.com",target:"_blank",rel:"noopener noreferrer"},u=e("code",null,"__defaultVhost__",-1),_=e("li",null,[e("code",null,"服务端口号(port)"),o(" : 554,如果不指定端口号，则使用协议默认端口号")],-1),f=e("li",null,[e("code",null,"应用名(app)"),o(" : live")],-1),w=e("li",null,[e("code",null,"流ID(streamid)"),o(" : 0")],-1),b=e("li",null,[e("code",null,"参数(args)"),o(" : token=abcdefg&field=value")],-1),M=s('<h2 id="_2、zlmediakit中的流媒体源" tabindex="-1"><a class="header-anchor" href="#_2、zlmediakit中的流媒体源" aria-hidden="true">#</a> 2、ZLMediaKit中的流媒体源</h2><p>在ZLMediaKit中，流媒体源是一种可以被用于直播转发、推流转发等功能的数据对象，在本项目中被称作为<code>MediaSource</code>，目前支持5种类型的流媒体源，分别是<code>RtspMediaSource</code>、<code>RtmpMediaSource</code>、<code>HlsMediaSource</code>、<code>TSMediaSource</code>、<code>FMP4MediaSource</code>。</p><p>定位一个流媒体源，主要通过4个元素(我们后续称其为4元组)，分别是:</p><ul><li><code>协议(scheam)</code></li><li><code>虚拟主机(vhost)</code></li><li><code>应用名(app)</code></li><li><code>流ID(streamid) </code></li></ul><p><code>RtspMediaSource</code>支持 rtsp播放、rtsp推流、webrtc播放、webrtc推流。</p><p><code>RtmpMediaSource</code>支持 rtmp推流/播放、http-flv播放、ws-flv播放。</p><p><code>HlsMediaSource</code>支持 hls播放。</p><p><code>TSMediaSource</code> 支持 http-ts播放、ws-ts播放。</p><p><code>FMP4MediaSource</code> 支持 http-fmp4播放、ws-fmp4播放。</p><h2 id="_3、流媒体源对应的播放url" tabindex="-1"><a class="header-anchor" href="#_3、流媒体源对应的播放url" aria-hidden="true">#</a> 3、流媒体源对应的播放url</h2><p>假定有一个<code>RtspMediaSource</code>，它的4元组分别为 <code>rtsp(RtspMediaSource固定为rtsp)</code>、<code>somedomain.com</code>、<code>live</code>、<code>0</code><br> 那么播放这个流媒体源的url对应为:</p><ul><li><code>rtsp://somedomain.com/live/0</code></li><li><code>rtsps://somedomain.com/live/0</code></li><li><code>rtsp://127.0.0.1/live/0?vhost=somedomain.com</code></li><li><code>rtsps://127.0.0.1/live/0?vhost=somedomain.com</code></li></ul><p>如果有一个<code>RtmpMediaSource</code>，它的4元组分别为 <code>rtmp(RtmpMediaSource固定为rtmp)</code>、<code>somedomain.com</code>、<code>live</code>、<code>0</code><br> 那么播放这个流媒体源的url对应为:</p><ul><li><code>rtmp://somedomain.com/live/0</code></li><li><code>rtmps://somedomain.com/live/0</code></li><li><code>rtmp://127.0.0.1/live/0?vhost=somedomain.com</code></li><li><code>rtmps://127.0.0.1/live/0?vhost=somedomain.com</code></li></ul><p>rtmp类型的流媒体源也支持<code>http-flv</code>、<code>websocket</code>直播，对应的url如下：</p><p><strong>注意: 老代码flv直播后缀为.flv,新代码才改成了.live.flv</strong></p><ul><li><code>http://somedomain.com/live/0.live.flv</code></li><li><code>https://somedomain.com/live/0.live.flv</code></li><li><code>http://127.0.0.1/live/0.live.flv?vhost=somedomain.com</code></li><li><code>https://127.0.0.1/live/0.live.flv?vhost=somedomain.com</code></li><li><code>ws://somedomain.com/live/0.live.flv</code></li><li><code>wss://somedomain.com/live/0.live.flv</code></li><li><code>ws://127.0.0.1/live/0.live.flv?vhost=somedomain.com</code></li><li><code>wss://127.0.0.1/live/0.live.flv?vhost=somedomain.com</code></li></ul><p>当然，ZLMediaKit一般会把rtsp、rtmp流媒体源互相转换，也会转换成hls/http-ts/ws-ts/http-fmp4/ws-fmp4，播放的url如下：</p><ul><li><p>HLS(mpegts)</p><ul><li><code>http://somedomain.com/live/0/hls.m3u8</code></li><li><code>https://somedomain.com/live/0/hls.m3u8</code></li><li><code>http://127.0.0.1/live/0/hls.m3u8?vhost=somedomain.com</code></li><li><code>https://127.0.0.1/live/0/hls.m3u8?vhost=somedomain.com</code></li></ul></li><li><p>HLS(fmp4)</p><ul><li><code>http://somedomain.com/live/0/hls.fmp4.m3u8</code></li><li><code>https://somedomain.com/live/0/hls.fmp4.m3u8</code></li><li><code>http://127.0.0.1/live/0/hls.fmp4.m3u8?vhost=somedomain.com</code></li><li><code>https://127.0.0.1/live/0/hls.fmp4.m3u8?vhost=somedomain.com</code></li></ul></li><li><p>HTTP-TS/WS-TS(后缀为.live.ts,目的是为了解决与hls的冲突)</p><ul><li><code>http://somedomain.com/live/0.live.ts</code></li><li><code>https://somedomain.com/live/0.live.ts</code></li><li><code>http://127.0.0.1/live/0.live.ts?vhost=somedomain.com</code></li><li><code>https://127.0.0.1/live/0.live.ts?vhost=somedomain.com</code></li><li><code>ws://somedomain.com/live/0.live.ts</code></li><li><code>wss://somedomain.com/live/0.live.ts</code></li><li><code>ws://127.0.0.1/live/0.live.ts?vhost=somedomain.com</code></li><li><code>wss://127.0.0.1/live/0.live.ts?vhost=somedomain.com</code></li></ul></li><li><p>HTTP-fMP4/WS-fMP4(后缀为.live.mp4,目的是为了解决与mp4点播的冲突)</p><ul><li><code>http://somedomain.com/live/0.live.mp4</code></li><li><code>https://somedomain.com/live/0.live.mp4</code></li><li><code>http://127.0.0.1/live/0.live.mp4?vhost=somedomain.com</code></li><li><code>https://127.0.0.1/live/0.live.mp4?vhost=somedomain.com</code></li><li><code>ws://somedomain.com/live/0.live.mp4</code></li><li><code>wss://somedomain.com/live/0.live.mp4</code></li><li><code>ws://127.0.0.1/live/0.live.mp4?vhost=somedomain.com</code></li><li><code>wss://127.0.0.1/live/0.live.mp4?vhost=somedomain.com</code></li></ul></li></ul><p>一般而言，上述url在ZLMediaKit都有效，因为ZLMediaKit默认转换流媒体源。</p><h2 id="_4、点播url" tabindex="-1"><a class="header-anchor" href="#_4、点播url" aria-hidden="true">#</a> 4、点播url</h2><p>ZLMediaKit的点播一般通过mp4文件来实现，推荐大家使用http mp4点播，这样是最简单，服务器也无需解复用mp4文件，当然ZLMediaKit目前也支持rtsp、rtmp、http-flv、websocket-flv的mp4点播，<br> 对应的url跟直播url类似，不在赘述，这里只介绍区别。</p><ul><li>ZLMediaKit对点播限制应用名，默认为<code>record</code></li><li>假如一个mp4文件放置在http根目录record文件夹(<code>www/record</code>)下，他的相对路径为:<code>www/record/0.mp4</code>,那么点播url则为: <ul><li><code>rtsp://somedomain.com/record/0.mp4</code></li><li><code>rtmp://somedomain.com/record/0.mp4</code></li><li><code>http://somedomain.com/record/0.mp4</code>(这里是通用的http文件点播，服务器不用解复用文件)</li><li><code>http://somedomain.com/record/0.mp4.live.flv</code>（这里是http-flv直播，不是http点播，服务器需要解复用文件）</li><li><code>ws://somedomain.com/record/0.mp4.live.flv</code></li><li><code>http://somedomain.com/record/0.mp4.live.ts</code>（这里是http-ts直播，不是http点播，服务器需要解复用文件）</li><li><code>ws://somedomain.com/record/0.mp4.live.ts</code></li><li><code>http://somedomain.com/record/0.mp4.live.mp4</code>（这里是http-fmp4直播，不是http点播，服务器需要解复用文件）</li><li><code>ws://somedomain.com/record/0.mp4.live.mp4</code></li></ul></li><li>如果开启了虚拟主机，那么点播文件需要放置在 <code>www/somedomain.com/record/0.mp4</code>。</li></ul><h2 id="_5、webrtc推流-播放" tabindex="-1"><a class="header-anchor" href="#_5、webrtc推流-播放" aria-hidden="true">#</a> 5、webrtc推流/播放</h2><p><code>webrtc</code>播放跟上述方式不太一样，webrtc协议本身不定义信令交互协议，用户自己去实现<code>sdp+icecandidate</code>交换逻辑，所以<code>webrtc</code>并没有一个标准的播放器，需要自己使用js或native sdk去实现播放。</p><p><code>zlmediakit</code>实现的<code>webrtc sdp+icecandidate</code>交换方式是<code>http post</code>方式，接口名为<code>/index/api/webrtc</code>, 该接口使用post content传递 <code>offer sdp</code>, 同时url query参数传递媒体源4元组中的<code>app</code> <code>steam_id</code>，由于http协议本身支持<code>vhost</code>，所以不需要另外指定<code>vhost</code>。 <code>webrtc</code>在<code>zlmediakit</code>中可以认为是rtsp协议的另外表现形式，他们推流、播放使用的数据源都相同，都是<code>RtspMediaSource</code>。</p><p>在webrtc推流时，交互<code>webrtc sdp+icecandidate</code>的http post接口类似为：<code>http://127.0.0.1/index/api/webrtc?app=live&amp;stream=test&amp;type=push</code></p><p>在webrtc播放时，交互<code>webrtc sdp+icecandidate</code>的http post接口类似为：<code>http://127.0.0.1/index/api/webrtc?app=live&amp;stream=test&amp;type=play</code>。</p><p>zlmeiakit工程自带webrtc测试播放/推流器，用户启动zlmediakit后，浏览器访问<code>http://127.0.0.1/webrtc/</code>就可以访问之。</p><p>另外，zlmediakit也支持使用webrtc播放mp4文件，http post接口类似为：<code>http://127.0.0.1/index/api/webrtc?app=record&amp;stream=test.mp4&amp;type=play</code>。</p><h2 id="_6、url参数" tabindex="-1"><a class="header-anchor" href="#_6、url参数" aria-hidden="true">#</a> 6、url参数</h2><p>ZLMediaKit会识别url中问号后面的字符串为url参数，其格式跟http一致，其中参数<code>vhost</code>是ZLMediaKit内置支持的参数，支持指定vhost。<br> url参数主要用于播放、推流鉴权，在触发hook api时，会把这些参数提交给第三方业务服务器</p>',32);function S(k,x){const d=i("ExternalLinkIcon");return l(),t("div",null,[a,r,e("ul",null,[h,e("li",null,[n,o(" : "),e("a",v,[o("somedomain.com"),m(d)]),o(",该字段既可以是域名也可以是ip，如果是ip则对应的虚拟主机为"),u]),_,f,w,b]),M])}const Z=c(p,[["render",S],["__file","play_url_rules.html.vue"]]);export{Z as default};
