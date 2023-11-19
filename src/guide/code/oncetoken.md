---
title: onceToken
---

Within ZLMediaKit, there is extensive use of an object called `onceToken`. Many developers are unfamiliar with this utility class, so I will explain its purpose below:
The `onceToken` primarily applies the RAII (Resource Acquisition Is Initialization) concept from C/C++, ensuring the execution of custom code during variable construction and destruction. It is mainly used in the following scenarios:

1. Used as a global variable to execute specific code during program loading, such as generating default configuration files:

    ```C++
    ////////////HLS-related configurations///////////
    namespace Hls {
    #define HLS_FIELD "hls."
    //HLS segment duration in seconds
    const string kSegmentDuration = HLS_FIELD"segDur";
    //Number of HLS segments
    const string kSegmentNum = HLS_FIELD"segNum";
    //Number of HLS segments retained on disk after removal from m3u8 file
    const string kSegmentRetain = HLS_FIELD"segRetain";
    //HLS file write buffer size
    const string kFileBufSize = HLS_FIELD"fileBufSize";
    //Recording file path
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

2. Used as a static variable to ensure code execution only once:
    ```C++
    int64_t HttpSession::onRecvHeader(const char *header,uint64_t len) {
        typedef void (HttpSession::*HttpCMDHandle)(int64_t &);
        static unordered_map<string, HttpCMDHandle> s_func_map;
        static onceToken token([]() {
            s_func_map.emplace("GET",&HttpSession::Handle_Req_GET);
            s_func_map.emplace("POST",&HttpSession::Handle_Req_POST);
        }, nullptr);
    
        //Omitted subsequent code
    }
    ```

3. Used as a local variable to ensure some cleanup work before a function exits, such as releasing a lock:
    ```C++
        template<typename ...ArgsType>
        bool emitEvent(const string &strEvent,ArgsType &&...args){
            onceToken token([&] {
                //Lock and record the locked thread ID
                _mtxListener.lock();
                if(_lock_depth++ == 0){
                    _lock_thread = this_thread::get_id();
                }
            }, [&]() {
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
    ```

4. The name of this object is derived from `pthread_once` and `dispatch_once` in iOS.
