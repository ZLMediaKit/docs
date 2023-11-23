import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as i,e as s}from"./app-684fa53c.js";const l={},d=s(`<p>Within ZLMediaKit, there is extensive use of an object called <code>onceToken</code>. Many developers are unfamiliar with this utility class, so I will explain its purpose below:<br> The <code>onceToken</code> primarily applies the RAII (Resource Acquisition Is Initialization) concept from C/C++, ensuring the execution of custom code during variable construction and destruction. It is mainly used in the following scenarios:</p><ol><li><p>Used as a global variable to execute specific code during program loading, such as generating default configuration files:</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>////////////HLS-related configurations///////////
namespace Hls {
#define HLS_FIELD &quot;hls.&quot;
//HLS segment duration in seconds
const string kSegmentDuration = HLS_FIELD&quot;segDur&quot;;
//Number of HLS segments
const string kSegmentNum = HLS_FIELD&quot;segNum&quot;;
//Number of HLS segments retained on disk after removal from m3u8 file
const string kSegmentRetain = HLS_FIELD&quot;segRetain&quot;;
//HLS file write buffer size
const string kFileBufSize = HLS_FIELD&quot;fileBufSize&quot;;
//Recording file path
const string kFilePath = HLS_FIELD&quot;filePath&quot;;

onceToken token([](){
    mINI::Instance()[kSegmentDuration] = 2;
    mINI::Instance()[kSegmentNum] = 3;
    mINI::Instance()[kSegmentRetain] = 5;
    mINI::Instance()[kFileBufSize] = 64 * 1024;
    mINI::Instance()[kFilePath] = &quot;./www&quot;;
},nullptr);
} //namespace Hls
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>Used as a static variable to ensure code execution only once:</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>int64_t HttpSession::onRecvHeader(const char *header,uint64_t len) {
    typedef void (HttpSession::*HttpCMDHandle)(int64_t &amp;);
    static unordered_map&lt;string, HttpCMDHandle&gt; s_func_map;
    static onceToken token([]() {
        s_func_map.emplace(&quot;GET&quot;,&amp;HttpSession::Handle_Req_GET);
        s_func_map.emplace(&quot;POST&quot;,&amp;HttpSession::Handle_Req_POST);
    }, nullptr);

    //Omitted subsequent code
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>Used as a local variable to ensure some cleanup work before a function exits, such as releasing a lock:</p><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>    template&lt;typename ...ArgsType&gt;
    bool emitEvent(const string &amp;strEvent,ArgsType &amp;&amp;...args){
        onceToken token([&amp;] {
            //Lock and record the locked thread ID
            _mtxListener.lock();
            if(_lock_depth++ == 0){
                _lock_thread = this_thread::get_id();
            }
        }, [&amp;]() {
            //Release the lock and clear the locked thread ID
            if(--_lock_depth == 0){
                _lock_thread = thread::id();
                if(_map_moved){
                    //Restore _mapListener
                    _map_moved = false;
                    _mapListener = std::move(_mapListenerTemp);
                }
            }
            _mtxListener.unlock();
        });

        //Omitted subsequent code
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>The name of this object is derived from <code>pthread_once</code> and <code>dispatch_once</code> in iOS.</p></li></ol>`,2),a=[d];function t(c,r){return n(),i("div",null,a)}const v=e(l,[["render",t],["__file","oncetoken.html.vue"]]);export{v as default};
