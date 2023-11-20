import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as i,e as t}from"./app-f76f52a9.js";const s={},l=t(`<p>ZLMediaKit里面大量用到了一个名叫<code>onceToken</code>对象, 很多小伙伴对这个工具类不明就里，下面我在此解释下其作用：<br> onceToken 主要使用C/C++的RAII思想，确保在变量构造和析构时执行自定义代码；主要应用场景有如下：</p><ul><li>1、作为全局变量用，在程序加载时执行特定代码，例如生成默认配置文件：</li></ul><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>////////////HLS相关配置///////////
namespace Hls {
#define HLS_FIELD &quot;hls.&quot;
//HLS切片时长,单位秒
const string kSegmentDuration = HLS_FIELD&quot;segDur&quot;;
//HLS切片个数
const string kSegmentNum = HLS_FIELD&quot;segNum&quot;;
//HLS切片从m3u8文件中移除后，继续保留在磁盘上的个数
const string kSegmentRetain = HLS_FIELD&quot;segRetain&quot;;
//HLS文件写缓存大小
const string kFileBufSize = HLS_FIELD&quot;fileBufSize&quot;;
//录制文件路径
const string kFilePath = HLS_FIELD&quot;filePath&quot;;

onceToken token([](){
	mINI::Instance()[kSegmentDuration] = 2;
	mINI::Instance()[kSegmentNum] = 3;
	mINI::Instance()[kSegmentRetain] = 5;
	mINI::Instance()[kFileBufSize] = 64 * 1024;
	mINI::Instance()[kFilePath] = &quot;./www&quot;;
},nullptr);
} //namespace Hls
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>2、作为static变量，确保代码只执行一次：</li></ul><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>int64_t HttpSession::onRecvHeader(const char *header,uint64_t len) {
	typedef void (HttpSession::*HttpCMDHandle)(int64_t &amp;);
	static unordered_map&lt;string, HttpCMDHandle&gt; s_func_map;
	static onceToken token([]() {
		s_func_map.emplace(&quot;GET&quot;,&amp;HttpSession::Handle_Req_GET);
		s_func_map.emplace(&quot;POST&quot;,&amp;HttpSession::Handle_Req_POST);
	}, nullptr);

	//后续代码省略
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>3、作为局部变量，确保函数退出前做一些清理工作，例如释放锁：</li></ul><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>    template&lt;typename ...ArgsType&gt;
    bool emitEvent(const string &amp;strEvent,ArgsType &amp;&amp;...args){
		onceToken token([&amp;] {
			//上锁，记录锁定线程id
			_mtxListener.lock();
			if(_lock_depth++ == 0){
				_lock_thread = this_thread::get_id();
			}
		}, [&amp;]() {
			//释放锁，取消锁定线程id
			if(--_lock_depth == 0){
				_lock_thread = thread::id();
				if(_map_moved){
					//还原_mapListener
					_map_moved = false;
					_mapListener = std::move(_mapListenerTemp);
				}
			}
			_mtxListener.unlock();
		});

		//后续代码省略
    }

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>4、这个对象取名源自pthread_once以及ios下的dispatch_once。</li></ul>`,8),d=[l];function a(v,c){return n(),i("div",null,d)}const m=e(s,[["render",a],["__file","oncetoken.html.vue"]]);export{m as default};
