import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as i,o,c as u,a as e,b as l,d as r,e as g,w as d}from"./app-CRnFokh3.js";const x={},p={href:"https://raw.githubusercontent.com/ossrs/srs/develop/trunk/doc/source.200kbps.768x320.flv",target:"_blank",rel:"noopener noreferrer"},y={href:"https://github.com/ZLMediaKit/ZLMediaKit/issues/406",target:"_blank",rel:"noopener noreferrer"},f={href:"https://github.com/ZLMediaKit/ZLMediaKit/issues/961",target:"_blank",rel:"noopener noreferrer"},m={href:"https://github.com/ZLMediaKit/ZLMediaKit/issues/1271",target:"_blank",rel:"noopener noreferrer"},h={href:"https://github.com/ZLMediaKit/ZLMediaKit/issues/540",target:"_blank",rel:"noopener noreferrer"};function b(c,t){const s=i("ExternalLinkIcon"),n=i("RouterLink");return o(),u("div",null,[t[19]||(t[19]=e("h2",{id:"一、最新性能测试",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#一、最新性能测试","aria-hidden":"true"},"#"),l(" 一、最新性能测试")],-1)),t[20]||(t[20]=e("h3",{id:"_1-1、测试环境",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_1-1、测试环境","aria-hidden":"true"},"#"),l(" 1.1、测试环境")],-1)),e("ul",null,[t[2]||(t[2]=e("li",null,"cpu： Intel(R) Xeon(R) Gold 6148 CPU @ 2.40GHz 4 核 8 线程",-1)),t[3]||(t[3]=e("li",null,"操作系统：CentOS release 6.3 (Final)",-1)),t[4]||(t[4]=e("li",null,"内存：16GB",-1)),t[5]||(t[5]=e("li",null,"网卡：127.0.0.1",-1)),e("li",null,[t[1]||(t[1]=l("测试码流: ")),e("a",p,[t[0]||(t[0]=l("200kbps.768x320.flv")),r(s)])]),t[6]||(t[6]=e("li",null,"编译器：gcc (GCC) 8.2.0",-1)),t[7]||(t[7]=e("li",null,"编译类型：Release",-1))]),t[21]||(t[21]=g('<h3 id="_1-2、测试数据" tabindex="-1"><a class="header-anchor" href="#_1-2、测试数据" aria-hidden="true">#</a> 1.2、测试数据</h3><blockquote><p>推流性能测试内存占用部分存在不准确问题(原因是当时测试时有个多 gop 缓存 bug)</p></blockquote><table><thead><tr><th style="text-align:center;">客户端类型</th><th style="text-align:center;">流个数</th><th style="text-align:center;">cpu</th><th style="text-align:center;">内存</th><th style="text-align:center;">网络 io</th><th style="text-align:center;">4 物理核 cpu 理论性能</th></tr></thead><tbody><tr><td style="text-align:center;">rtsp 播放</td><td style="text-align:center;">20K</td><td style="text-align:center;">160%</td><td style="text-align:center;">203M</td><td style="text-align:center;">5Gb/s</td><td style="text-align:center;">约 100K</td></tr><tr><td style="text-align:center;">rtsp 播放</td><td style="text-align:center;">32.2K</td><td style="text-align:center;">235%</td><td style="text-align:center;">220M</td><td style="text-align:center;">7.78Gb/s</td><td style="text-align:center;">约 100K</td></tr><tr><td style="text-align:center;">rtsp 推流</td><td style="text-align:center;">10K</td><td style="text-align:center;">264%</td><td style="text-align:center;">760M</td><td style="text-align:center;">2.39Gb/s</td><td style="text-align:center;">约 30K</td></tr><tr><td style="text-align:center;"></td><td style="text-align:center;"></td><td style="text-align:center;"></td><td style="text-align:center;"></td><td style="text-align:center;"></td><td style="text-align:center;"></td></tr><tr><td style="text-align:center;">rtmp 播放</td><td style="text-align:center;">10K</td><td style="text-align:center;">148%</td><td style="text-align:center;">81M</td><td style="text-align:center;">2.33Gb/s</td><td style="text-align:center;">约 50K</td></tr><tr><td style="text-align:center;">rtmp 播放</td><td style="text-align:center;">30K</td><td style="text-align:center;">450%</td><td style="text-align:center;">246M</td><td style="text-align:center;">7Gb/s</td><td style="text-align:center;">约 50K</td></tr><tr><td style="text-align:center;">rtmp 推流</td><td style="text-align:center;">10K</td><td style="text-align:center;">224%</td><td style="text-align:center;">1.6G</td><td style="text-align:center;">2.16Gb/s</td><td style="text-align:center;">约 30K</td></tr></tbody></table><h3 id="_1-3、测试详细数据" tabindex="-1"><a class="header-anchor" href="#_1-3、测试详细数据" aria-hidden="true">#</a> 1.3、测试详细数据</h3>',4)),e("ul",null,[e("li",null,[r(n,{to:"/zh/reference/test/rtmp_pull_stream_performance_test.html"},{default:d(()=>t[8]||(t[8]=[l("rtmp 拉流")])),_:1})]),e("li",null,[r(n,{to:"/zh/reference/test/rtmp_push_stream_performance_test.html"},{default:d(()=>t[9]||(t[9]=[l("rtmp 推流")])),_:1})]),e("li",null,[r(n,{to:"/zh/reference/test/rtsp_pull_stream_performance_test.html"},{default:d(()=>t[10]||(t[10]=[l("rtsp 拉流")])),_:1})]),e("li",null,[r(n,{to:"/zh/reference/test/rtsp_push_stream_performance_test.html"},{default:d(()=>t[11]||(t[11]=[l("rtsp 推流")])),_:1})])]),t[22]||(t[22]=e("h2",{id:"二、较早的性能测试记录",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#二、较早的性能测试记录","aria-hidden":"true"},"#"),l(" 二、较早的性能测试记录")],-1)),e("ul",null,[e("li",null,[e("a",y,[t[12]||(t[12]=l("rtmp 拉流性能测试")),r(s)])]),e("li",null,[e("a",f,[t[13]||(t[13]=l("GB28181 性能测试")),r(s)])]),e("li",null,[e("a",m,[t[14]||(t[14]=l("rtsp 音频拉流性能测试")),r(s)])]),e("li",null,[r(n,{to:"/zh/reference/test/benchmark.html"},{default:d(()=>t[15]||(t[15]=[l("过时的性能测试记录")])),_:1})])]),t[23]||(t[23]=e("h2",{id:"三、性能测试与优化",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#三、性能测试与优化","aria-hidden":"true"},"#"),l(" 三、性能测试与优化")],-1)),e("ul",null,[e("li",null,[r(n,{to:"/zh/reference/development_log/rtsp_performance_optimization.html"},{default:d(()=>t[16]||(t[16]=[l("rtsp 性能优化与测试")])),_:1})]),e("li",null,[r(n,{to:"/zh/reference/development_log/hls_high_performance_journey.html"},{default:d(()=>t[17]||(t[17]=[l("hls 性能优化与测试")])),_:1})]),e("li",null,[e("a",h,[t[18]||(t[18]=l("rtmp 性能优化")),r(s)])])])])}const k=a(x,[["render",b],["__file","performance_testing.html.vue"]]);export{k as default};
