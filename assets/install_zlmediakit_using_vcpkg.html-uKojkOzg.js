import{_ as l,a as c}from"./install_zlmediakit_using_vcpkg_2-1HFW-yNt.js";import{_ as d}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as t,o as r,c as p,a as n,d as e,b as s,e as i}from"./app-RP31lnfq.js";const o={},u=n("h1",{id:"简介",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#简介","aria-hidden":"true"},"#"),e(" 简介")],-1),v={href:"https://github.com/JackBoosY",target:"_blank",rel:"noopener noreferrer"},m=i(`<h1 id="安装指导" tabindex="-1"><a class="header-anchor" href="#安装指导" aria-hidden="true">#</a> 安装指导</h1><h2 id="_1、安装-vcpkg" tabindex="-1"><a class="header-anchor" href="#_1、安装-vcpkg" aria-hidden="true">#</a> 1、安装 vcpkg</h2><p>以 linux 平台为例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 下载vcpkg工具</span>
<span class="token function">git</span> clone https://github.com/microsoft/vcpkg
<span class="token comment"># 开始安装;如果提示安装失败,请先安装依赖</span>
./vcpkg/bootstrap-vcpkg.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),k={href:"https://github.com/microsoft/vcpkg/blob/master/README_zh_CN.md",target:"_blank",rel:"noopener noreferrer"},b=i(`<h2 id="_2、安装-zlmediakit" tabindex="-1"><a class="header-anchor" href="#_2、安装-zlmediakit" aria-hidden="true">#</a> 2、安装 zlmediakit</h2><ul><li><p>先安装依赖</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> pkg-config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>默认方式安装 zlmediakit</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 默认开启特性: [core,mp4,openssl,webrtc]</span>
./vcpkg/vcpkg <span class="token function">install</span> zlmediakit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>安装全部特性 zlmediakit(包括 webrtc datachannel)</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>./vcpkg/vcpkg <span class="token function">install</span> zlmediakit<span class="token punctuation">\\</span><span class="token punctuation">[</span>core,mp4,openssl,webrtc,sctp<span class="token punctuation">\\</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>最小安装 zlmediakit</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>./vcpkg/vcpkg <span class="token function">install</span> zlmediakit<span class="token punctuation">\\</span><span class="token punctuation">[</span>core<span class="token punctuation">\\</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>卸载 zlmediakit</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>./vcpkg/vcpkg remove zlmediakit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>安装路径 <img src="`+l+`" alt="" loading="lazy"></p><blockquote><p>MediaServer 进程依赖的 config.ini, default.pem, www 等相关文件可以从源码拷贝过来</p></blockquote></li></ul><h2 id="_3、安装不同版本" tabindex="-1"><a class="header-anchor" href="#_3、安装不同版本" aria-hidden="true">#</a> 3、安装不同版本</h2><ul><li>查看 vcpkg 支持哪些平台</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>./vcpkg/vcpkg <span class="token builtin class-name">help</span> triplet
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><p>以 linux 为例</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>./vcpkg/vcpkg <span class="token builtin class-name">help</span> triplet <span class="token operator">|</span> <span class="token function">grep</span> linux
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>安装动态库版本 zlmediakit</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 先卸载zlmediakit</span>
./vcpkg/vcpkg remove zlmediakit
<span class="token comment"># 然后安装动态库版本</span>
./vcpkg/vcpkg <span class="token function">install</span> zlmediakit<span class="token punctuation">\\</span><span class="token punctuation">[</span>core,mp4,openssl,webrtc,sctp<span class="token punctuation">\\</span><span class="token punctuation">]</span>:x64-linux-dynamic
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="`+c+'" alt="install_zlmediakit_using_vcpkg_2" tabindex="0" loading="lazy"><figcaption>install_zlmediakit_using_vcpkg_2</figcaption></figure></li></ul>',6);function g(h,x){const a=t("ExternalLinkIcon");return r(),p("div",null,[u,n("p",null,[e("vcpkg 是一个跨平台的 sdk 包管理工具，类似于 linux 下的 yum/apt，macOS 下的 homebrew；它同时支持 linux/macOS/windows 等多个平台，是 c/c++开发者解决依赖的利器。 目前 zlmediakit 已经于 2023-08-08 完成 vcpkg 平台的上线，用户可以通过 vcpkg 便捷安装 zlmediakit c sdk 以及 MediaServer 可执行程序，解决各种编译依赖相关的苦恼。 zlmediakit 上架 vcpkg 得到了"),n("a",v,[e("@JackBoosY"),s(a)]),e("大量的支持，在此表示由衷的感谢！")]),m,n("blockquote",null,[n("p",null,[e("不同平台具体参考"),n("a",k,[e("官方文档"),s(a)])])]),b])}const w=d(o,[["render",g],["__file","install_zlmediakit_using_vcpkg.html.vue"]]);export{w as default};
