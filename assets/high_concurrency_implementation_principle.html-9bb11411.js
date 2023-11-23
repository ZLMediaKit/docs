import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as n,o as t,c as r,a as e,d as i,b as s,w as v,e as c}from"./app-684fa53c.js";const u={},m=e("h1",{id:"项目介绍",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#项目介绍","aria-hidden":"true"},"#"),i(" 项目介绍")],-1),o={href:"https://github.com/xiongziliang/ZLMediaKit",target:"_blank",rel:"noopener noreferrer"},b=c(`<p>该框架基于C++11开发，避免使用裸指针，减少内存拷贝，代码精简可靠，并发性能优异，在linux平台下，单一进程即可充分利用多核CPU的优势；最大限度的榨干CPU、网卡性能；轻松达到万兆网卡性能极限。同时也能在高性能的同时，做到极低延时，画面秒开。</p><p>目前ZLMediaKit经过多次版本迭代，编程模型多次升级优化；已经趋于成熟稳定，也在各种生产环境得到了验证，本文主要讨论ZLMediaKit高性能实现原理以及项目特点。</p><h1 id="网络模型对比" tabindex="-1"><a class="header-anchor" href="#网络模型对比" aria-hidden="true">#</a> 网络模型对比</h1><p>不同于SRS的单线程多协程、node.js/redis的单线程、NGINX的多进程模型；ZLMediaKit采用的是单进程多线程模型。那么为什么ZLMediaKit要采用这样的编程模型呢？</p><p>作为一个多年的C++服务器后台开发工程师，多年的工作经验告诉我，作为一个服务器程序，对于稳定性要求极高；一个服务器可以性能差点，但是绝不能轻易core dump；服务中断、重启、异常，对于一个线上已运营项目来说结果是灾难性的。那么我们该怎么确保服务器的稳定？目前有以下手段：</p><ul><li>单线程模型</li><li>单线程+协程</li><li>单线程+多进程</li><li>多线程+锁</li><li>弃用C/C++</li></ul><p>采用单线程模型的优点是，服务器简单可靠，不用考虑资源竞争互斥的问题，这样可以比较容易做到高稳定性；采用此模型的典型代表项目有 redis、node.js。但是由于是单线程模型，所以弊端也比较明显；那就是在多核cpu上不能充分利用多核CPU的算力，性能瓶颈主要在于CPU(大家应该有过在redis中执行keys *慢慢等待的经历)。</p><figure><img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3069000473,466332746&amp;fm=26&amp;gp=0.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>单线程+协程的方案本质上与纯单线程模型无区别，它们的区别主要编程风格上。纯单线程模型使用的是非阻塞式处处回调方式实现高并发，这种模型会有所谓的回调地狱的问题，编程起来会比较麻烦。而单线程+协程的方案是简化编程方式，采用自然的阻塞式编程风格，在协程库内部管理任务调度，本质也是非阻塞的。但是协程库涉及的比较底层，跟系统息息相关，所以跨平台不是很好做，而且设计实现一个协程库门槛较高。SRS采用就是这编程模型，由于协程库的限制，SRS不能在windows上运行。</p><p>为了解决上述单线程模型的问题，很多服务器采用单线程多进程的编程模型；在这种模型下，既有单线程模型的简单可靠的特性，又能充分发挥多核CPU的性能，而且某个进程挂了也不会影响其他进程，像NGINX就是这种编程模型；但是这种模型也有其局限性。在这种模型下，会话间是相互隔离的，两个会话可能运行在不同的进程上；这样就导致了会话间通信的困难。比如说A用户连接在服务器A进程上，B用户连接在服务器B进程上；如果两者之间要完成某种数据交互，那么会异常困难，这样必须通过进程间通信来完成。而进程间通信代价和开销比较大，编程起来也比较困难。但是如果会话间无需数据交互(例如http服务器)，那么这种模型是特别适合的，所以NGINX作为http服务器也是非常成功的，但是如果是譬如即时聊天的那种需要会话间通信的服务，那么这种开发模型不是很适合。不过现在越来越多的服务都需要支持分布式集群部署，所以单线程多进程方案的缺陷越来越不明显。</p><p>由于C/C++是种强类型静态语言，异常处理简单粗暴，动不动就core dump。C/C++的设计理念就是发现错误及早暴露，在某种意义上来说，崩溃也是种好事，因为这样会引起你的重视，让你能及早发现定位并解决问题，而不是把问题拖延到无法解决的时候再暴露给你。但是这么做对一般人来说，C/C++就不是很友好了，人类并不像机器那样严谨，有点疏忽在所难免，况且有些小问题也无伤大雅，并不需要毁灭式的core dump来应对。而且C/C++的学习曲线异常艰难困苦，很多人好几年也不得要领，所以很多人表示纷纷弃坑，转投 go / erlang / node.js之类。</p><p>但是C/C++由于其性能优越性，以及历史原因，在某些场景下是不二选择，而且C/C++才是真正的跨平台语言；况且随着智能指针的推出，内存管理不再是难题；而lambda语法的支持，让程序上下文绑定不再困难。随着C++新特性的支持，编译器静态反射机制的完善，现代C++编程愈发简便快捷。ZLMediaKit采用的就是C++11新标准以及相关理念完成的高性能流媒体服务框架。</p><p>与上面其它编程模型不同，ZLMediaKit采用的是多线程开发模型；与传统的多线程模型不同；ZLMediaKit采用了C++11的智能指针来做内存管理，在线程切换时可以完美的管理内存在多线程下共享以及其生命周期。同时互斥锁的粒度消减至极致，几乎可以忽略不计。所以采用多线程模型的ZLMediaKit性能损耗极低，每条线程的性能几乎可以媲美单线程模型，同时也可以充分榨干CPU的每一核心性能。</p><h1 id="网络模型详述" tabindex="-1"><a class="header-anchor" href="#网络模型详述" aria-hidden="true">#</a> 网络模型详述</h1><p>ZLMediaKit在启动时会根据cpu核心数自动创建若干个epoll实例(非linux平台为select)；这些epoll实例都会有一个线程来运行<code>epoll_wait</code>函数来等待事件的触发。</p><p>以ZLMediaKit的RTMP服务为例，在创建一个<code>TcpServer</code>时，ZLMediaKit会把这个Tcp服务的监听套接字加入到每一个epoll实例，这样如果收到新的RTMP播放请求，那么多个epoll实例会在内核的调度下，自动选择负载较轻的线程触发accept事件，以下是代码片段：</p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>template &lt;typename SessionType&gt;
void start(uint16_t port, const std::string&amp; host = &quot;0.0.0.0&quot;, uint32_t backlog = 1024) {
   start_l&lt;SessionType&gt;(port,host,backlog);
   //自动加入到所有epoll线程监听
   EventPollerPool::Instance().for_each([&amp;](const TaskExecutor::Ptr &amp;executor){
      EventPoller::Ptr poller = dynamic_pointer_cast&lt;EventPoller&gt;(executor);
      if(poller == _poller || !poller){
         return;
      }
      auto &amp;serverRef = _clonedServer[poller.get()];
      if(!serverRef){
      	//绑定epoll实例
         serverRef = std::make_shared&lt;TcpServer&gt;(poller);
      }
      serverRef-&gt;cloneFrom(*this);
   });
}


void cloneFrom(const TcpServer &amp;that){
		if(!that._socket){
			throw std::invalid_argument(&quot;TcpServer::cloneFrom other with null socket!&quot;);
		}
		_sessionMaker = that._sessionMaker;
		//克隆一个相同fd的Socket对象
		_socket-&gt;cloneFromListenSocket(*(that._socket));
		_timer = std::make_shared&lt;Timer&gt;(2, [this]()-&gt;bool {
			this-&gt;onManagerSession();
			return true;
		},_poller);
		this-&gt;mINI::operator=(that);
        _cloned = true;
	}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>服务器在收到accept事件后，会创建一个<code>TcpSession</code>对象并绑定到该epoll实例（同时把与之对应的<code>peer fd</code>加入到相关epoll监听）。每一个Tcp连接都会对应一个<code>TcpSession</code>对象，在之后客户端与服务器的数据交互中，该<code>TcpSession</code>对象处理一切与之相关的业务数据，并且该对象之后生命周期内的一切事件都会由该epoll线程触发，这样服务器的每个epoll线程都能均匀的分派到合理的客户端数量。以下是服务器accept事件处理逻辑代码片段：</p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code> // 接收到客户端连接请求
    virtual void onAcceptConnection(const Socket::Ptr &amp; sock) {
		weak_ptr&lt;TcpServer&gt; weakSelf = shared_from_this();
        //创建一个TcpSession;这里实现创建不同的服务会话实例
		auto sessionHelper = _sessionMaker(weakSelf,sock);
		auto &amp;session = sessionHelper-&gt;session();
        //把本服务器的配置传递给TcpSession
        session-&gt;attachServer(*this);

        //TcpSession的唯一识别符，可以是guid之类的
        auto sessionId = session-&gt;getIdentifier();
        //记录该TcpSession
        if(!SessionMap::Instance().add(sessionId,session)){
            //有同名session，说明getIdentifier生成的标识符有问题
            WarnL &lt;&lt; &quot;SessionMap::add failed:&quot; &lt;&lt; sessionId;
            return;
        }
        //SessionMap中没有相关记录，那么_sessionMap更不可能有相关记录了；
        //所以_sessionMap::emplace肯定能成功
        auto success = _sessionMap.emplace(sessionId, sessionHelper).second;
        assert(success == true);

        weak_ptr&lt;TcpSession&gt; weakSession(session);
		//会话接收数据事件
		sock-&gt;setOnRead([weakSession](const Buffer::Ptr &amp;buf, struct sockaddr *addr){
			//获取会话强引用
			auto strongSession=weakSession.lock();
			if(!strongSession) {
				//会话对象已释放
				return;
			}
            //TcpSession处理业务数据
			strongSession-&gt;onRecv(buf);
		});


		//会话接收到错误事件
		sock-&gt;setOnErr([weakSelf,weakSession,sessionId](const SockException &amp;err){
		    //在本函数作用域结束时移除会话对象
            //目的是确保移除会话前执行其onError函数
            //同时避免其onError函数抛异常时没有移除会话对象
		    onceToken token(nullptr,[&amp;](){
                //移除掉会话
                SessionMap::Instance().remove(sessionId);
                auto strongSelf = weakSelf.lock();
                if(!strongSelf) {
                    return;
                }
                //在TcpServer对应线程中移除map相关记录
                strongSelf-&gt;_poller-&gt;async([weakSelf,sessionId](){
                    auto strongSelf = weakSelf.lock();
                    if(!strongSelf){
                        return;
                    }
                    strongSelf-&gt;_sessionMap.erase(sessionId);
                });
		    });
			//获取会话强应用
			auto strongSession=weakSession.lock();
            if(strongSession) {
                //触发onError事件回调
				strongSession-&gt;onError(err);
			}
		});
	}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过上诉描述，我们应该大概了解了ZLMediaKit的网络模型，通过这样的模型基本上能榨干CPU的算力，不过CPU算力如果使用不当 ，也可能白白浪费，使之做一些无用的事务，那么在ZLMediaKit中还有那些技术手段来提高性能呢？我们在下节展开论述。</p><h1 id="关闭互斥锁" tabindex="-1"><a class="header-anchor" href="#关闭互斥锁" aria-hidden="true">#</a> 关闭互斥锁</h1><p>上一节论述中，我们知道<code>TcpSession</code>是ZLMediaKit中的关键元素，服务器大部分计算都在TcpSession内完成。一个<code>TcpSession</code>由一个epoll实例掌管其生命周期，其他线程不得直接操作该<code>TcpSession</code>对象（必须通过线程切换到对应的epoll线程来完成操作）；所以从某种意义上来说<code>TcpSeesion</code>是单线程模型的；所以ZLMediaKit对于<code>TcpSession</code>所对应的网络io操作是无互斥锁保护的，ZLMediaKit作为服务器模式运行，基本上是无锁的；这种情况下，锁对性能的影响几乎可以忽略不计。以下是ZLMediaKit关闭互斥锁的代码片段：</p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>virtual Socket::Ptr onBeforeAcceptConnection(const EventPoller::Ptr &amp;poller){
    	/**
    	 * 服务器模型socket是线程安全的，所以为了提高性能，关闭互斥锁
    	 * Socket构造函数第二个参数即为是否关闭互斥锁
    	 */
		return std::make_shared&lt;Socket&gt;(poller,false);
	}

//Socket对象的构造函数，第二个参数即为是否关闭互斥锁
Socket::Socket(const EventPoller::Ptr &amp;poller,bool enableMutex) :
		_mtx_sockFd(enableMutex),
		_mtx_bufferWaiting(enableMutex),
		_mtx_bufferSending(enableMutex) {
	_poller = poller;
	if(!_poller){
		_poller = EventPollerPool::Instance().getPoller();
	}

    _canSendSock = true;
	_readCB = [](const Buffer::Ptr &amp;buf,struct sockaddr *) {
		WarnL &lt;&lt; &quot;Socket not set readCB&quot;;
	};
	_errCB = [](const SockException &amp;err) {
		WarnL &lt;&lt; &quot;Socket not set errCB:&quot; &lt;&lt; err.what();
	};
	_acceptCB = [](Socket::Ptr &amp;sock) {
		WarnL &lt;&lt; &quot;Socket not set acceptCB&quot;;
	};
	_flushCB = []() {return true;};

	_beforeAcceptCB = [](const EventPoller::Ptr &amp;poller){
		return nullptr;
	};
}

//MutexWrapper对象定义，可以选择是否关闭互斥锁
template &lt;class Mtx = recursive_mutex&gt;
class MutexWrapper {
public:
    MutexWrapper(bool enable){
        _enable = enable;
    }
    ~MutexWrapper(){}

    inline void lock(){
        if(_enable){
            _mtx.lock();
        }
    }
    inline void unlock(){
        if(_enable){
            _mtx.unlock();
        }
    }
private:
    bool _enable;
    Mtx _mtx;
};

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="规避内存拷贝" tabindex="-1"><a class="header-anchor" href="#规避内存拷贝" aria-hidden="true">#</a> 规避内存拷贝</h1><p>传统的多线程模型下，做数据转发会存在线程切换的问题，为了确保线程安全，一般使用内存拷贝来规避该问题；而且对数据进行分包处理也很难做到不使用内存拷贝。但是流媒体这种业务逻辑，可能观看同一个直播的用户是海量的，如果每分发一次就做内存拷贝，那么开销是十分可观的，这将严重拖累服务器性能。</p><p>ZLMediaKit在做媒体数据转发时，是不会做内存拷贝的，常规的C++多线程编程很难做到这一点，但是我们在C++11的加持下，利用引用计数，巧妙的解决了多线程内存生命周期管理的问题，以下是RTMP服务器做媒体数据分发规避内存拷贝的代码片段：</p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>void RtmpProtocol::sendRtmp(uint8_t ui8Type, uint32_t ui32StreamId,
        const Buffer::Ptr &amp;buf, uint32_t ui32TimeStamp, int iChunkId){
    if (iChunkId &lt; 2 || iChunkId &gt; 63) {
        auto strErr = StrPrinter &lt;&lt; &quot;不支持发送该类型的块流 ID:&quot; &lt;&lt; iChunkId &lt;&lt; endl;
        throw std::runtime_error(strErr);
    }
	//是否有扩展时间戳
    bool bExtStamp = ui32TimeStamp &gt;= 0xFFFFFF;

    //rtmp头
	BufferRaw::Ptr bufferHeader = obtainBuffer();
	bufferHeader-&gt;setCapacity(sizeof(RtmpHeader));
	bufferHeader-&gt;setSize(sizeof(RtmpHeader));
	//对rtmp头赋值，如果使用整形赋值，在arm android上可能由于数据对齐导致总线错误的问题
	RtmpHeader *header = (RtmpHeader*) bufferHeader-&gt;data();
    header-&gt;flags = (iChunkId &amp; 0x3f) | (0 &lt;&lt; 6);
    header-&gt;typeId = ui8Type;
    set_be24(header-&gt;timeStamp, bExtStamp ? 0xFFFFFF : ui32TimeStamp);
    set_be24(header-&gt;bodySize, buf-&gt;size());
    set_le32(header-&gt;streamId, ui32StreamId);
    //发送rtmp头
    onSendRawData(bufferHeader);

    //扩展时间戳字段
	BufferRaw::Ptr bufferExtStamp;
    if (bExtStamp) {
        //生成扩展时间戳
		bufferExtStamp = obtainBuffer();
		bufferExtStamp-&gt;setCapacity(4);
		bufferExtStamp-&gt;setSize(4);
		set_be32(bufferExtStamp-&gt;data(), ui32TimeStamp);
	}

	//生成一个字节的flag，标明是什么chunkId
	BufferRaw::Ptr bufferFlags = obtainBuffer();
	bufferFlags-&gt;setCapacity(1);
	bufferFlags-&gt;setSize(1);
	bufferFlags-&gt;data()[0] = (iChunkId &amp; 0x3f) | (3 &lt;&lt; 6);
    
    size_t offset = 0;
	uint32_t totalSize = sizeof(RtmpHeader);
    while (offset &lt; buf-&gt;size()) {
        if (offset) {
            //发送trunkId
            onSendRawData(bufferFlags);
            totalSize += 1;
        }
        if (bExtStamp) {
            //扩展时间戳
            onSendRawData(bufferExtStamp);
            totalSize += 4;
        }
        size_t chunk = min(_iChunkLenOut, buf-&gt;size() - offset);
        //分发流媒体数据包，此处规避了内存拷贝
        onSendRawData(std::make_shared&lt;BufferPartial&gt;(buf,offset,chunk));
        totalSize += chunk;
        offset += chunk;
    }
    _ui32ByteSent += totalSize;
    if (_ui32WinSize &gt; 0 &amp;&amp; _ui32ByteSent - _ui32LastSent &gt;= _ui32WinSize) {
        _ui32LastSent = _ui32ByteSent;
        sendAcknowledgement(_ui32ByteSent);
    }
}

//BufferPartial对象用于rtmp包的chunk大小分片，规避内存拷贝
class BufferPartial : public Buffer {
public:
    BufferPartial(const Buffer::Ptr &amp;buffer,uint32_t offset,uint32_t size){
        _buffer = buffer;
        _data = buffer-&gt;data() + offset;
        _size = size;
    }

    ~BufferPartial(){}

    char *data() const override {
        return _data;
    }
    uint32_t size() const override{
        return _size;
    }
private:
    Buffer::Ptr _buffer;
    char *_data;
    uint32_t _size;
};

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们在发送RTP包时也是采用同样的原理来避免内存拷贝。</p><h1 id="使用对象循环池" tabindex="-1"><a class="header-anchor" href="#使用对象循环池" aria-hidden="true">#</a> 使用对象循环池</h1><p>内存开辟销毁是全局互斥的，过多的new/delete 不仅降低程序性能，还会导致内存碎片。ZLMediaKit尽量使用循环池来避免这些问题，以下代码时RTP包循环池使用代码片段：</p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>RtpPacket::Ptr RtpInfo::makeRtp(TrackType type, const void* data, unsigned int len, bool mark, uint32_t uiStamp) {
    uint16_t ui16RtpLen = len + 12;
    uint32_t ts = htonl((_ui32SampleRate / 1000) * uiStamp);
    uint16_t sq = htons(_ui16Sequence);
    uint32_t sc = htonl(_ui32Ssrc);

   	//采用循环池来获取rtp对象
    auto rtppkt = ResourcePoolHelper&lt;RtpPacket&gt;::obtainObj();
    unsigned char *pucRtp = rtppkt-&gt;payload;
    pucRtp[0] = &#39;$&#39;;
    pucRtp[1] = _ui8Interleaved;
    pucRtp[2] = ui16RtpLen &gt;&gt; 8;
    pucRtp[3] = ui16RtpLen &amp; 0x00FF;
    pucRtp[4] = 0x80;
    pucRtp[5] = (mark &lt;&lt; 7) | _ui8PlayloadType;
    memcpy(&amp;pucRtp[6], &amp;sq, 2);
    memcpy(&amp;pucRtp[8], &amp;ts, 4);
    //ssrc
    memcpy(&amp;pucRtp[12], &amp;sc, 4);
    //playload
    memcpy(&amp;pucRtp[16], data, len);

    rtppkt-&gt;PT = _ui8PlayloadType;
    rtppkt-&gt;interleaved = _ui8Interleaved;
    rtppkt-&gt;mark = mark;
    rtppkt-&gt;length = len + 16;
    rtppkt-&gt;sequence = _ui16Sequence;
    rtppkt-&gt;timeStamp = uiStamp;
    rtppkt-&gt;ssrc = _ui32Ssrc;
    rtppkt-&gt;type = type;
    rtppkt-&gt;offset = 16;
    _ui16Sequence++;
    _ui32TimeStamp = uiStamp;
    return rtppkt;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="设置socket相关标志" tabindex="-1"><a class="header-anchor" href="#设置socket相关标志" aria-hidden="true">#</a> 设置Socket相关标志</h1><p>开启TCP_NODELAY后可以提高服务器响应速度，对于一些对延时要求比较敏感的服务（比如ssh服务），开启TCP_NODELAY标记比较重要。但是对于流媒体服务，由于数据是源源不断并且量也比较大，所以关闭TCP_NODELAY可以减少ACK包数量，充分利用带宽资源。</p><p>MSG_MORE是另外一个提高网络吞吐量的标记；这个标记的作用是在发送数据时，服务器会缓存一定的数据然后再打包一次性发送出去；而像RTSP这种业务场景，MSG_MORE标记就显得格外合适；因为RTP包一般都很小(小于MTU)，通过MSG_MORE标记可以极大减少数据包个数。</p><p>ZLMediaKit在处理播放器时，握手期间是开启TCP_NODELAY并且关闭MSG_MORE的，这样做的目的是提高握手期间数据交互的延时，减少链接建立耗时，提高视频打开速度。在握手成功后，ZLMediaKit会关闭TCP_NODELAY并打开MSG_MORE；这样又能减少数据报文个数，提高网络利用率。</p><h1 id="批量数据发送" tabindex="-1"><a class="header-anchor" href="#批量数据发送" aria-hidden="true">#</a> 批量数据发送</h1><p>网络编程中，大家应该都用过send/sendto/write函数，但是writev/sendmsg函数应该用的不多。ZLMediaKit采用sendmsg函数来做批量数据发送，这样在网络不是很好或者服务器负载比较高时，可以明显减少系统调用(系统调用开销比较大)次数，提高程序性能。以下是代码片段：</p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>int BufferList::send_l(int fd, int flags,bool udp) {
    int n;
    do {
        struct msghdr msg;
        msg.msg_name = NULL;
        msg.msg_namelen = 0;
        msg.msg_iov = &amp;(_iovec[_iovec_off]);
        msg.msg_iovlen = _iovec.size() - _iovec_off;
        if(msg.msg_iovlen &gt; IOV_MAX){
            msg.msg_iovlen = IOV_MAX;
        }
        msg.msg_control = NULL;
        msg.msg_controllen = 0;
        msg.msg_flags = flags;
        n = udp ? send_iovec(fd,&amp;msg,flags) : sendmsg(fd,&amp;msg,flags);
    } while (-1 == n &amp;&amp; UV_EINTR == get_uv_error(true));

    if(n &gt;= _remainSize){
        //全部写完了
        _iovec_off = _iovec.size();
        _remainSize = 0;
        return n;
    }

    if(n &gt; 0){
        //部分发送成功
        reOffset(n);
        return n;
    }

    //一个字节都未发送
    return n;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="批量线程切换" tabindex="-1"><a class="header-anchor" href="#批量线程切换" aria-hidden="true">#</a> 批量线程切换</h1><p>多线程模型下，流媒体服务器在做媒体数据分发时，肯定要做线程切换。线程切换的目的一是确保线程安全，防止多条线程同时操作某个对象或资源；二是可以充分利用多核算力，防止单线程成为转发性能瓶颈。ZLMediaKit在做媒体转发时，也同样使用到线程切换来实现多线程的数据分发。但是线程切换开销也比较大，如果线程切换次数太多，将严重影响服务器性能。</p><p>现在我们假设一个场景：RTMP推流客户端A推送一个直播到服务器，这个直播比较火爆，假设有同时10K个用户正在观看这个直播，那么我们在分发一个RTMP数据包时是否需要最多进行10K次线程切换然后再发送数据？虽然ZLMediaKit的线程切换比较轻量，但是这样频繁的线程切换也是扛不住的。</p><p>ZLMediaKit在处理这类问题时，采用批量线程切换来尽量减少线程切换次数。假如说这10K的用户分布在32个cpu核心上，那么ZLMediaKit最多进行32次线程切换，这样ZLMediaKit将大大减少线程切换次数，同时又能使用多线程来分发数据，大大提高网络吞吐量，以下是批量线程切换代码片段：</p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>void emitRead(const T &amp;in){
        LOCK_GUARD(_mtx_map);
        for (auto &amp;pr : _dispatcherMap) {
            auto second = pr.second;
            //批量线程切换
            pr.first-&gt;async([second,in](){
                second-&gt;emitRead(in);
            },false);
        }
    }

//线程切换后再做遍历
void emitRead(const T &amp;in){
        for (auto it = _readerMap.begin() ; it != _readerMap.end() ;) {
            auto reader = it-&gt;second.lock();
            if(!reader){
                it = _readerMap.erase(it);
                --_readerSize;
                onSizeChanged();
                continue;
            }
            //触发数据分发操作
            reader-&gt;onRead(in);
            ++it;
        }
	}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="采用右值引用拷贝" tabindex="-1"><a class="header-anchor" href="#采用右值引用拷贝" aria-hidden="true">#</a> 采用右值引用拷贝</h1><p>ZLMediaKit中也尽量使用右值引用拷贝来规避内存拷贝，这里就不展开论述。</p><h1 id="其他特性" tabindex="-1"><a class="header-anchor" href="#其他特性" aria-hidden="true">#</a> 其他特性</h1><h2 id="优化及时推流打开率" tabindex="-1"><a class="header-anchor" href="#优化及时推流打开率" aria-hidden="true">#</a> 优化及时推流打开率</h2><p>有些应用场景需要设备端开始推流，然后APP立即观看的应用场景。传统的rtmp服务器对此应用场景是未作任何优化的，如果APP播放请求在推流尚未建立之前到达，那么将导致APP播放失败，这样视频打开成功率就会降低，用户体验很不好。</p><p>ZLMediaKit在针对该应用场景时，做了特别的优化；实现原理如下：</p><p>1、收到播放请求时，立即检查是否已经存在的媒体源，如果存在返回播放成功，否则进入第2步。</p><p>2、监听对应的媒体源注册事件，同时添加播放超时定时器，并且不回复播放器然后返回。逻辑将进入第3步或第4步。</p><p>3、媒体源注册成功，那么立即响应播放器播放成功，同时删除播放超时定时器，并移除媒体注册事件监听。</p><p>4、超时定时器触发，响应播放器播放失败，同时删除播放超时定时器，并移除媒体注册事件监听。</p><p>使用ZLMediaKit作为流媒体服务器，可以APP播放请求和设备端推流同时进行。</p><h1 id="性能测试对比" tabindex="-1"><a class="header-anchor" href="#性能测试对比" aria-hidden="true">#</a> 性能测试对比</h1>`,55),p=e("p",null,"在测试时发现，ZLMediaKit在负载比较低时,其单线程性能大概是SRS的50%，单条线程大概能支撑5K个播放器，导致这个性能差距的主要原因时由于采用本地轮回网络，网络状况为理想，那么sendmsg批量发送将不起优化左右；而SRS使用了合并写特性(就是缓存300毫秒左右的数据后一次性发送)，可以减少系统调用次数；如果负载比较高，以及真实网络环境下，ZLMediaKit单线程性能应该跟SRS差距更小，我们在测试报告中也能发现在客户端比较多时，ZLMediaKit单线程线程性能有比较大的提升。",-1),f=e("p",null,"由于ZLMediaKit支持多线程，可以充分利用多核CPU的性能，在多核服务器上，CPU已经不再是性能瓶颈，为了减少直播延时，目前合并写特性是默认关闭的，可以通过配置文件开启。",-1);function _(g,h){const d=n("ExternalLinkIcon"),l=n("RouterLink");return t(),r("div",null,[m,e("p",null,[e("a",o,[i("ZLMediaKit"),s(d)]),i("是一套高性能的流媒体服务框架，目前支持rtmp/rtsp/hls/http-flv流媒体协议。该项目已支持linux、macos、windows、ios、android平台，支持的编码格式包括H264、AAC、H265（仅rtsp支持H265）;采用的模型是多线程IO多路复用非阻塞式编程(linux下采用epoll、其他平台采用select)。")]),b,e("p",null,[i("目前对ZLMediaKit做了一些性能测试，查看地址："),s(l,{to:"/zh/reference/test/benchmark.html"},{default:v(()=>[i("benchmark")]),_:1})]),p,f])}const M=a(u,[["render",_],["__file","high_concurrency_implementation_principle.html.vue"]]);export{M as default};
