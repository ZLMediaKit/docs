import{_ as a}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as i,o as l,c as t,a as e,d as n,b as r,e as d}from"./app-RP31lnfq.js";const c={},o=e("h2",{id:"一、测试环境",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#一、测试环境","aria-hidden":"true"},"#"),n(" 一、测试环境")],-1),p=e("li",null,"测试日期：2022/5/18",-1),u=e("li",null,"代码版本：git hash: c7d7999f",-1),m=e("li",null,"cpu： Intel(R) Xeon(R) Gold 6148 CPU @ 2.40GHz",-1),v=e("li",null,"操作系统：CentOS release 6.3 (Final)",-1),b=e("li",null,"内存：16GB",-1),h=e("li",null,"网卡：127.0.0.1",-1),g={href:"https://raw.githubusercontent.com/ossrs/srs/develop/trunk/doc/source.200kbps.768x320.flv",target:"_blank",rel:"noopener noreferrer"},f=e("li",null,"编译器：gcc (GCC) 8.2.0",-1),_=e("li",null,"zlmediakit 编译类型：Release",-1),k=e("li",null,"malloc 库：ptmalloc(未开启 jemalloc)",-1),x=e("li",null,"config.ini 配置文件修改(主要开启合并写、按需转协议)：",-1),y=d(`<div class="language-patch line-numbers-mode" data-ext="patch"><pre class="language-patch"><code>diff --git a/conf/config.ini b/conf/config.ini
index c2d4613f..99ce5c84 100644
--- a/conf/config.ini
+++ b/conf/config.ini
@@ -51,12 +51,12 @@ addMuteAudio=1
 #如果不删除将会接着上一次的数据继续写(录制hls/mp4时会继续在前一个文件后面写)
 resetWhenRePlay=1
 #是否默认推流时转换成hls，hook接口(on_publish)中可以覆盖该设置
-publishToHls=1
+publishToHls=0
 #是否默认推流时mp4录像，hook接口(on_publish)中可以覆盖该设置
 publishToMP4=0
 #合并写缓存大小(单位毫秒)，合并写指服务器缓存一定的数据后才会一次性写入socket，这样能提高性能，但是会提高延时
 #开启后会同时关闭TCP_NODELAY并开启MSG_MORE
-mergeWriteMS=0
+mergeWriteMS=300
 #全局的时间戳覆盖开关，在转协议时，对frame进行时间戳覆盖
 #该开关对rtsp/rtmp/rtp推流、rtsp/rtmp/hls拉流代理转协议时生效
 #会直接影响rtsp/rtmp/hls/mp4/flv等协议的时间戳
@@ -72,15 +72,15 @@ enable_audio=1
 ####### 如果某种协议你想获取最好的用户体验，请置0(第一个播放者可以秒开，且不花屏)

 #hls协议是否按需生成，如果hls.segNum配置为0(意味着hls录制)，那么hls将一直生成(不管此开关)
-hls_demand=0
+hls_demand=1
 #rtsp[s]协议是否按需生成
-rtsp_demand=0
+rtsp_demand=1
 #rtmp[s]、http[s]-flv、ws[s]-flv协议是否按需生成
-rtmp_demand=0
+rtmp_demand=1
 #http[s]-ts协议是否按需生成
-ts_demand=0
+ts_demand=1
 #http[s]-fmp4、ws[s]-fmp4协议是否按需生成
-fmp4_demand=0
+fmp4_demand=1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>推流命令:</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ffmpeg <span class="token parameter variable">-stream_loop</span> <span class="token parameter variable">-1</span> <span class="token parameter variable">-re</span> <span class="token parameter variable">-i</span> ~/Downloads/source.200kbps.768x320.flv <span class="token parameter variable">-acodec</span> copy <span class="token parameter variable">-vcodec</span> copy <span class="token parameter variable">-f</span> flv  rtmp://ip:port/live/test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="二、rtsp-拉流性能测试-2-万路" tabindex="-1"><a class="header-anchor" href="#二、rtsp-拉流性能测试-2-万路" aria-hidden="true">#</a> 二、rtsp 拉流性能测试(2 万路)</h2><ul><li>拉流命令：</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#加大文件描述符个数</span>
<span class="token builtin class-name">ulimit</span> <span class="token parameter variable">-n</span> <span class="token number">102400</span>
<span class="token comment">#启动2万个rtsp拉流</span>
./test_bench_pull <span class="token parameter variable">-c</span> <span class="token number">20000</span> <span class="token parameter variable">-i</span> rtsp://127.0.0.1/live/test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>top 信息：</li></ul><figure><img src="https://user-images.githubusercontent.com/11495632/169055524-10ec0ab2-23a2-4103-b2c4-0c5affb61b85.png" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure><ul><li>perf top 信息：</li></ul><figure><img src="https://user-images.githubusercontent.com/11495632/169055647-1c3599a8-63e6-4d08-8179-69e74eed05e4.png" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure><ul><li>nload 信息(平均 5Gb/s)：</li></ul><figure><img src="https://user-images.githubusercontent.com/11495632/169055992-16e0c2a6-58db-4683-912a-6e7f94783350.png" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure><h2 id="三、rtsp-拉流性能测试-4-万路" tabindex="-1"><a class="header-anchor" href="#三、rtsp-拉流性能测试-4-万路" aria-hidden="true">#</a> 三、rtsp 拉流性能测试(4 万路)</h2><ul><li>拉流命令：</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#加大文件描述符个数</span>
<span class="token builtin class-name">ulimit</span> <span class="token parameter variable">-n</span> <span class="token number">102400</span>
<span class="token comment">#启动4万个rtsp拉流</span>
./test_bench_pull <span class="token parameter variable">-c</span> <span class="token number">40000</span> <span class="token parameter variable">-i</span> rtsp://127.0.0.1/live/test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>发现由于随机端口不够，有些播放器掉线(只剩 32244 个)： <img src="https://user-images.githubusercontent.com/11495632/169060039-9bfddd5c-62d3-4ddf-8c20-176e7ab4c8b0.png" alt="图片" loading="lazy"></p></li><li><p>top 信息：</p></li></ul><figure><img src="https://user-images.githubusercontent.com/11495632/169059095-d15b9645-e80e-40ba-a607-31896b90db0c.png" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure><ul><li>perf top 信息：</li></ul><figure><img src="https://user-images.githubusercontent.com/11495632/169059190-f4bcae26-c037-49c5-a4c0-002f4d96847f.png" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure><ul><li>nload 信息(平均 7.78Gb/s)：</li></ul><figure><img src="https://user-images.githubusercontent.com/11495632/169059778-2c525923-75e5-4935-b489-817249941c6a.png" alt="图片" tabindex="0" loading="lazy"><figcaption>图片</figcaption></figure>`,21);function z(G,C){const s=i("ExternalLinkIcon");return l(),t("div",null,[o,e("ul",null,[p,u,m,v,b,h,e("li",null,[n("测试码流: "),e("a",g,[n("200kbps.768x320.flv"),r(s)])]),f,_,k,x]),y])}const E=a(c,[["render",z],["__file","rtsp_pull_stream_performance_test.html.vue"]]);export{E as default};
