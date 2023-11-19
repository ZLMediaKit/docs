import{_ as l,a as c}from"./install_zlmediakit_using_vcpkg_2-aff21ac8.js";import{_ as d}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as r,c as o,a as n,d as e,b as s,e as i}from"./app-db7b86cf.js";const p={},u=n("h1",{id:"简介",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#简介","aria-hidden":"true"},"#"),e(" 简介")],-1),v=n("br",null,null,-1),m=n("br",null,null,-1),b={href:"https://github.com/JackBoosY",target:"_blank",rel:"noopener noreferrer"},k=i(`<h1 id="安装指导" tabindex="-1"><a class="header-anchor" href="#安装指导" aria-hidden="true">#</a> 安装指导</h1><h2 id="_1、安装vcpkg" tabindex="-1"><a class="header-anchor" href="#_1、安装vcpkg" aria-hidden="true">#</a> 1、安装vcpkg</h2><p>以linux平台为例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 下载vcpkg工具</span>
<span class="token function">git</span> clone https://github.com/microsoft/vcpkg
<span class="token comment"># 开始安装;如果提示安装失败,请先安装依赖</span>
./vcpkg/bootstrap-vcpkg.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),g={href:"https://github.com/microsoft/vcpkg/blob/master/README_zh_CN.md",target:"_blank",rel:"noopener noreferrer"},h=i(`<h2 id="_2、安装zlmediakit" tabindex="-1"><a class="header-anchor" href="#_2、安装zlmediakit" aria-hidden="true">#</a> 2、安装zlmediakit</h2><ul><li><p>先安装依赖</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> pkg-config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>默认方式安装zlmediakit</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 默认开启特性: [core,mp4,openssl,webrtc]</span>
./vcpkg/vcpkg <span class="token function">install</span> zlmediakit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>安装全部特性zlmediakit(包括webrtc datachannel)</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>./vcpkg/vcpkg <span class="token function">install</span> zlmediakit<span class="token punctuation">\\</span><span class="token punctuation">[</span>core,mp4,openssl,webrtc,sctp<span class="token punctuation">\\</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>最小安装zlmediakit</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>./vcpkg/vcpkg <span class="token function">install</span> zlmediakit<span class="token punctuation">\\</span><span class="token punctuation">[</span>core<span class="token punctuation">\\</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>卸载zlmediakit</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>./vcpkg/vcpkg remove zlmediakit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>安装路径<br><img src="`+l+`" alt="" loading="lazy"></p></li></ul><blockquote><p>MediaServer进程依赖的config.ini, default.pem, www等相关文件可以从源码拷贝过来</p></blockquote><h2 id="_3、安装不同版本" tabindex="-1"><a class="header-anchor" href="#_3、安装不同版本" aria-hidden="true">#</a> 3、安装不同版本</h2><ul><li>查看vcpkg支持哪些平台</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>./vcpkg/vcpkg <span class="token builtin class-name">help</span> triplet
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><p>以linux为例</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>./vcpkg/vcpkg <span class="token builtin class-name">help</span> triplet <span class="token operator">|</span> <span class="token function">grep</span> linux
  x64-linux
  x86-linux
  ppc64le-linux
  x64-linux-release
  loongarch32-linux
  loongarch64-linux
  arm-linux
  loongarch32-linux-release
  s390x-linux
  riscv64-linux
  x64-linux-dynamic
  riscv64-linux-release
  arm-linux-release
  ppc64le-linux-release
  riscv32-linux
  arm64-linux
  arm64-linux-release
  loongarch64-linux-release
  s390x-linux-release
  riscv32-linux-release
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>安装动态库版本zlmediakit</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 先卸载zlmediakit</span>
./vcpkg/vcpkg remove zlmediakit
<span class="token comment"># 然后安装动态库版本</span>
./vcpkg/vcpkg <span class="token function">install</span> zlmediakit<span class="token punctuation">\\</span><span class="token punctuation">[</span>core,mp4,openssl,webrtc,sctp<span class="token punctuation">\\</span><span class="token punctuation">]</span>:x64-linux-dynamic
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><figure><img src="`+c+'" alt="install_zlmediakit_using_vcpkg_2" tabindex="0" loading="lazy"><figcaption>install_zlmediakit_using_vcpkg_2</figcaption></figure>',8);function _(x,f){const a=t("ExternalLinkIcon");return r(),o("div",null,[u,n("p",null,[e("vcpkg是一个跨平台的sdk包管理工具，类似于linux下的yum/apt，macOS下的homebrew；它同时支持linux/macOS/windows等多个平台，是c/c++开发者解决依赖的利器。"),v,e(" 目前zlmediakit已经于2023-08-08完成vcpkg平台的上线，用户可以通过vcpkg便捷安装zlmediakit c sdk以及MediaServer可执行程序，解决各种编译依赖相关的苦恼。"),m,e(" zlmediakit上架vcpkg得到了"),n("a",b,[e("@JackBoosY"),s(a)]),e("大量的支持，在此表示由衷的感谢！")]),k,n("blockquote",null,[n("p",null,[e("不同平台具体参考"),n("a",g,[e("官方文档"),s(a)])])]),h])}const B=d(p,[["render",_],["__file","install_zlmediakit_using_vcpkg.html.vue"]]);export{B as default};
