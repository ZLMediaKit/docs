---
title: 代码篇之onceToken
---

ZLMediaKit 里面大量用到了一个名叫`onceToken`对象, 很多小伙伴对这个工具类不明就里，下面我在此解释下其作用：
onceToken 主要使用 C/C++的 RAII 思想，确保在变量构造和析构时执行自定义代码；主要应用场景有如下：

- 1、作为全局变量用，在程序加载时执行特定代码，例如生成默认配置文件：

```cpp
////////////HLS相关配置///////////
namespace Hls {
#define HLS_FIELD "hls."
//HLS切片时长,单位秒
const string kSegmentDuration = HLS_FIELD"segDur";
//HLS切片个数
const string kSegmentNum = HLS_FIELD"segNum";
//HLS切片从m3u8文件中移除后，继续保留在磁盘上的个数
const string kSegmentRetain = HLS_FIELD"segRetain";
//HLS文件写缓存大小
const string kFileBufSize = HLS_FIELD"fileBufSize";
//录制文件路径
const string kFilePath = HLS_FIELD"filePath";

onceToken token([](){
  mINI::Instance()[kSegmentDuration] = 2;
  mINI::Instance()[kSegmentNum] = 3;
  mINI::Instance()[kSegmentRetain] = 5;
  mINI::Instance()[kFileBufSize] = 64 * 1024;
  mINI::Instance()[kFilePath] = "./www";
},nullptr);
} //namespace Hls
```

- 2、作为 static 变量，确保代码只执行一次：

```cpp
int64_t HttpSession::onRecvHeader(const char *header,uint64_t len) {
  typedef void (HttpSession::*HttpCMDHandle)(int64_t &);
  static unordered_map<string, HttpCMDHandle> s_func_map;
  static onceToken token([]() {
    s_func_map.emplace("GET",&HttpSession::Handle_Req_GET);
    s_func_map.emplace("POST",&HttpSession::Handle_Req_POST);
  }, nullptr);

  //后续代码省略
}
```

- 3、作为局部变量，确保函数退出前做一些清理工作，例如释放锁：

```cpp
    template<typename ...ArgsType>
    bool emitEvent(const string &strEvent,ArgsType &&...args){
    onceToken token([&] {
      //上锁，记录锁定线程id
      _mtxListener.lock();
      if(_lock_depth++ == 0){
        _lock_thread = this_thread::get_id();
      }
    }, [&]() {
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

```

- 4、这个对象取名源自 pthread_once 以及 ios 下的 dispatch_once。
