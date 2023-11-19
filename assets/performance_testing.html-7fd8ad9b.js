import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as a,c as s,a as t,d as e,b as r,e as d}from"./app-5e987558.js";const o={},c=t("h1",{id:"一、最新性能测试",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#一、最新性能测试","aria-hidden":"true"},"#"),e(" 一、最新性能测试：")],-1),h=t("h2",{id:"_1-1、测试环境",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#_1-1、测试环境","aria-hidden":"true"},"#"),e(" 1.1、测试环境")],-1),_=t("li",null,"cpu： Intel(R) Xeon(R) Gold 6148 CPU @ 2.40GHz 4核8线程",-1),g=t("li",null,"操作系统：CentOS release 6.3 (Final)",-1),u=t("li",null,"内存：16GB",-1),x=t("li",null,"网卡：127.0.0.1",-1),p={href:"https://raw.githubusercontent.com/ossrs/srs/develop/trunk/doc/source.200kbps.768x320.flv",target:"_blank",rel:"noopener noreferrer"},y=t("li",null,"编译器：gcc (GCC) 8.2.0",-1),b=t("li",null,"编译类型：Release",-1),f=d('<h2 id="_1-2、测试数据" tabindex="-1"><a class="header-anchor" href="#_1-2、测试数据" aria-hidden="true">#</a> 1.2、测试数据</h2><blockquote><p>推流性能测试内存占用部分存在不准确问题(原因是当时测试时有个多gop缓存bug)</p></blockquote><table><thead><tr><th style="text-align:center;">客户端类型</th><th style="text-align:center;">流个数</th><th style="text-align:center;">cpu</th><th style="text-align:center;">内存</th><th style="text-align:center;">网络io</th><th style="text-align:center;">4物理核cpu理论性能</th></tr></thead><tbody><tr><td style="text-align:center;">rtsp播放</td><td style="text-align:center;">20K</td><td style="text-align:center;">160%</td><td style="text-align:center;">203M</td><td style="text-align:center;">5Gb/s</td><td style="text-align:center;">约100K</td></tr><tr><td style="text-align:center;">rtsp播放</td><td style="text-align:center;">32.2K</td><td style="text-align:center;">235%</td><td style="text-align:center;">220M</td><td style="text-align:center;">7.78Gb/s</td><td style="text-align:center;">约100K</td></tr><tr><td style="text-align:center;">rtsp推流</td><td style="text-align:center;">10K</td><td style="text-align:center;">264%</td><td style="text-align:center;">760M</td><td style="text-align:center;">2.39Gb/s</td><td style="text-align:center;">约30K</td></tr><tr><td style="text-align:center;"></td><td style="text-align:center;"></td><td style="text-align:center;"></td><td style="text-align:center;"></td><td style="text-align:center;"></td><td style="text-align:center;"></td></tr><tr><td style="text-align:center;">rtmp播放</td><td style="text-align:center;">10K</td><td style="text-align:center;">148%</td><td style="text-align:center;">81M</td><td style="text-align:center;">2.33Gb/s</td><td style="text-align:center;">约50K</td></tr><tr><td style="text-align:center;">rtmp播放</td><td style="text-align:center;">30K</td><td style="text-align:center;">450%</td><td style="text-align:center;">246M</td><td style="text-align:center;">7Gb/s</td><td style="text-align:center;">约50K</td></tr><tr><td style="text-align:center;">rtmp推流</td><td style="text-align:center;">10K</td><td style="text-align:center;">224%</td><td style="text-align:center;">1.6G</td><td style="text-align:center;">2.16Gb/s</td><td style="text-align:center;">约30K</td></tr></tbody></table><h2 id="_1-3、测试详细数据" tabindex="-1"><a class="header-anchor" href="#_1-3、测试详细数据" aria-hidden="true">#</a> 1.3、测试详细数据</h2>',4),E={href:"https://github.com/ZLMediaKit/ZLMediaKit/wiki/rtmp%E6%8B%89%E6%B5%81%E6%80%A7%E8%83%BD%E6%B5%8B%E8%AF%95",target:"_blank",rel:"noopener noreferrer"},m={href:"https://github.com/ZLMediaKit/ZLMediaKit/wiki/rtmp%E6%8E%A8%E6%B5%81%E6%80%A7%E8%83%BD%E6%B5%8B%E8%AF%95",target:"_blank",rel:"noopener noreferrer"},K={href:"https://github.com/ZLMediaKit/ZLMediaKit/wiki/rtsp%E6%8B%89%E6%B5%81%E6%80%A7%E8%83%BD%E6%B5%8B%E8%AF%95",target:"_blank",rel:"noopener noreferrer"},k={href:"https://github.com/ZLMediaKit/ZLMediaKit/wiki/rtsp%E6%8E%A8%E6%B5%81%E6%80%A7%E8%83%BD%E6%B5%8B%E8%AF%95",target:"_blank",rel:"noopener noreferrer"},B=t("h1",{id:"二、较早的性能测试记录",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#二、较早的性能测试记录","aria-hidden":"true"},"#"),e(" 二、较早的性能测试记录")],-1),M={href:"https://github.com/ZLMediaKit/ZLMediaKit/issues/406",target:"_blank",rel:"noopener noreferrer"},L={href:"https://github.com/ZLMediaKit/ZLMediaKit/issues/961",target:"_blank",rel:"noopener noreferrer"},Z={href:"https://github.com/ZLMediaKit/ZLMediaKit/issues/1271",target:"_blank",rel:"noopener noreferrer"},A={href:"https://github.com/zlmediakit/ZLMediaKit/wiki/Benchmark",target:"_blank",rel:"noopener noreferrer"},G=t("h1",{id:"三、性能测试与优化",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#三、性能测试与优化","aria-hidden":"true"},"#"),e(" 三、性能测试与优化")],-1),w={href:"https://github.com/ZLMediaKit/ZLMediaKit/wiki/RTSP%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96",target:"_blank",rel:"noopener noreferrer"},C={href:"https://github.com/ZLMediaKit/ZLMediaKit/wiki/zlmediakit%E7%9A%84hls%E9%AB%98%E6%80%A7%E8%83%BD%E4%B9%8B%E6%97%85",target:"_blank",rel:"noopener noreferrer"},v={href:"https://github.com/ZLMediaKit/ZLMediaKit/issues/540",target:"_blank",rel:"noopener noreferrer"};function D(F,N){const n=i("ExternalLinkIcon");return a(),s("div",null,[c,h,t("ul",null,[_,g,u,x,t("li",null,[e("测试码流: "),t("a",p,[e("200kbps.768x320.flv"),r(n)])]),y,b]),f,t("ul",null,[t("li",null,[t("a",E,[e("rtmp拉流"),r(n)])]),t("li",null,[t("a",m,[e("rtmp推流"),r(n)])]),t("li",null,[t("a",K,[e("rtsp拉流"),r(n)])]),t("li",null,[t("a",k,[e("rtsp推流"),r(n)])])]),B,t("ul",null,[t("li",null,[t("a",M,[e("rtmp拉流性能测试"),r(n)])]),t("li",null,[t("a",L,[e("GB28181性能测试"),r(n)])]),t("li",null,[t("a",Z,[e("rtsp音频拉流性能测试"),r(n)])]),t("li",null,[t("a",A,[e("过时的性能测试记录"),r(n)])])]),G,t("ul",null,[t("li",null,[t("a",w,[e("rtsp性能优化与测试"),r(n)])]),t("li",null,[t("a",C,[e("hls性能优化与测试"),r(n)])]),t("li",null,[t("a",v,[e("rtmp性能优化"),r(n)])])])])}const z=l(o,[["render",D],["__file","performance_testing.html.vue"]]);export{z as default};