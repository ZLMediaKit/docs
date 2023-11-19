---
title: zlmediakit的hls高性能之旅
---

## 事情的起因

北京冬奥会前夕，zlmediakit的一位用户完成了iptv系统的迁移; 由于zlmediakit对hls的支持比较完善，支持包括鉴权、统计、溯源等独家特性，所以他把之前的老系统都迁移到zlmediakit上了。

但是很不幸，在冬奥会开幕式当天，zlmediakit并没有承受起考验，当hls并发数达到3000左右时，zlmediakit线程负载接近100%，延时非常高，整个服务器基本不可用：

![图片.png](https://upload-images.jianshu.io/upload_images/8409177-8d6b45ad1518b2b2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/320)

## 思考
zlmediakit定位是一个通用的流媒体服务器，主要精力聚焦在rtsp/rtmp等协议，对hls的优化并不够重视，hls之前在zlmediakit里面实现方式跟http文件服务器实现方式基本一致，都是通过直接读取文件的方式提供下载。所以当hls播放数比较高时，每个用户播放都需要重新从磁盘读取一遍文件，这时文件io承压，由于磁盘慢速度的特性，不能承载太高的并发数。

有些朋友可能会问，如果用内存虚拟磁盘能不能提高性能？答案是能，但是由于内存拷贝带宽也存在上限，所以就算hls文件都放在内存目录，每次读取文件也会存在多次memcopy，性能并不能有太大的飞跃。前面冬奥会直播事故那个案例，就是把hls文件放在内存目录，但是也就能承载2000+并发而已。


## 歧途： sendfile
为了解决hls并发瓶颈这个问题，我首先思考到的是`sendfile`方案。我们知道，`nginx`作为http服务器的标杆，就支持sendfile这个特性。很早之前，我就听说过`sendfile`多牛逼，它支持直接把文件发送到`socket fd`；而不用通过用户态和内核态的内存互相拷贝，可以大幅提高文件发送的性能。

我们查看sendfile的资料，有如下介绍：

![图片.png](https://upload-images.jianshu.io/upload_images/8409177-74226856ef85a257.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/600)

于是，在事故反馈当日，2022年春节期间的某天深夜，我在严寒之下光着膀子在zlmediakit中把sendfile特性实现了一遍：
![图片.png](https://upload-images.jianshu.io/upload_images/8409177-512ca5a1ebd6c0dc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/600)

实现的代码如下：
```c++
//HttpFileBody.cpp
int HttpFileBody::sendFile(int fd) {
#if  defined(__linux__) || defined(__linux)
    off_t off = _file_offset;
    return sendfile(fd, fileno(_fp.get()), &off, _max_size);
#else
    return -1;
#endif

//HttpSession.cpp
void HttpSession::sendResponse(int code,
                               bool bClose,
                               const char *pcContentType,
                               const HttpSession::KeyValue &header,
                               const HttpBody::Ptr &body,
                               bool no_content_length ){
    //省略大量代码
    if (typeid(*this) == typeid(HttpSession) && !body->sendFile(getSock()->rawFD())) {
        //http支持sendfile优化
        return;
    }
    GET_CONFIG(uint32_t, sendBufSize, Http::kSendBufSize);
    if (body->remainSize() > sendBufSize) {
        //在非https的情况下，通过sendfile优化文件发送性能
        setSocketFlags();
    }

    //发送http body
    AsyncSenderData::Ptr data = std::make_shared<AsyncSenderData>(shared_from_this(), body, bClose);
    getSock()->setOnFlush([data]() {
        return AsyncSender::onSocketFlushed(data);
    });
    AsyncSender::onSocketFlushed(data);
}
```

由于sendfile只能直接发送文件明文内容，所以并不适用于需要文件加密的https场景；这个优化，https是无法开启的；很遗憾，这次hls事故中，用户恰恰用的就是https-hls。所以本次优化并没起到实质作用（https时关闭sendfile特性是在用户反馈tls解析异常才加上的）。

## 优化之旅一：共享mmap

很早之前，zlmediakit已经支持mmap方式发送文件了，但是在本次hls直播事故中，并没有发挥太大的作用，原因有以下几点：

- 1.每个hls播放器访问的ts文件都是独立的，每访问一次都需要建立一次mmap映射，这样导致其实每次都需要内存从文件加载一次文件到内存，并没有减少磁盘io压力。

- 2.mmap映射次数太多，导致内存不足，mmap映射失败，则会回退为fread方式。

- 3.由于hls m3u8索引文件是会一直覆盖重写的，而mmap在文件长度发送变化时，会触发SIGBUS的错误，之前为了修复这个bug，在访问m3u8文件时，zlmediakit会强制采用fread方案。

于是在sendfile优化方案失败时，我想到了共享mmap方案，其优化思路如下：

![图片.png](https://upload-images.jianshu.io/upload_images/8409177-7f703110baa254c5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/600)

共享mmap方案主要解决以下几个问题：

- 防止文件多次mmap时被多次加载到内存，降低文件io压力。

- 防止mmap次数太多，导致mmap失败回退到fread方式。

- mmap映射内存在http明文传输情况下，直接写socket时不用经过内核用户态间的互相拷贝，可以降低内存带宽压力。

于是大概在几天后，我新增了该特性：

![图片.png](https://upload-images.jianshu.io/upload_images/8409177-4c1c70521321a923.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/600)

实现代码逻辑其实比较简单，同时也比较巧妙，通过弱指针全局记录mmap实例，在无任何访问时，mmap自动回收，其代码如下：

```c++
static std::shared_ptr<char> getSharedMmap(const string &file_path, int64_t &file_size) {
    {
        lock_guard<mutex> lck(s_mtx);
        auto it = s_shared_mmap.find(file_path);
        if (it != s_shared_mmap.end()) {
            auto ret = std::get<2>(it->second).lock();
            if (ret) {
                //命中mmap缓存
                file_size = std::get<1>(it->second);
                return ret;
            }
        }
    }

    //打开文件
    std::shared_ptr<FILE> fp(fopen(file_path.data(), "rb"), [](FILE *fp) {
        if (fp) {
            fclose(fp);
        }
    });
    if (!fp) {
        //文件不存在
        file_size = -1;
        return nullptr;
    }
    //获取文件大小
    file_size = File::fileSize(fp.get());

    int fd = fileno(fp.get());
    if (fd < 0) {
        WarnL << "fileno failed:" << get_uv_errmsg(false);
        return nullptr;
    }
    auto ptr = (char *)mmap(NULL, file_size, PROT_READ, MAP_SHARED, fd, 0);
    if (ptr == MAP_FAILED) {
        WarnL << "mmap " << file_path << " failed:" << get_uv_errmsg(false);
        return nullptr;
    }
    std::shared_ptr<char> ret(ptr, [file_size, fp, file_path](char *ptr) {
        munmap(ptr, file_size);
        delSharedMmap(file_path, ptr);
    });
    {
        lock_guard<mutex> lck(s_mtx);
        s_shared_mmap[file_path] = std::make_tuple(ret.get(), file_size, ret);
    }
    return ret;
}
```

通过本次优化，zlmediakit的hls服务有比较大的性能提升，性能上限大概提升到了6K左右(压测途中还发现拉流压测客户端由于mktime函数导致的性能瓶颈问题，在此不展开描述)，但是还是离预期有些差距：

![图片.png](https://upload-images.jianshu.io/upload_images/8409177-9c7e706f317ea4c2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/400)

> 小插曲: mktime函数导致拉流压测工具性能受限

![图片.png](https://upload-images.jianshu.io/upload_images/8409177-d509266a091d97a0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/600)

## 优化之旅二：去除http cookie互斥锁
在开启共享mmap后，发现性能上升到6K并发时，还是上不去；于是我登录服务器使用`gdb -p`调试进程，通过`info threads` 查看线程情况，发现大量线程处于阻塞状态，这也就是为什么zlmediakit占用cpu不高，但是并发却上不去的原因：

![图片.png](https://upload-images.jianshu.io/upload_images/8409177-9b9db29311c8440a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/600)

为什么这么多线程都处于互斥阻塞状态？zlmediakit在使用互斥锁时，还是比较注意缩小临界区的，一些复杂耗时的操作一般都会放在临界区之外；经过一番思索，我才恍然大悟，原因是: 

> **压测客户端由于是单进程，共享同一份hls cookie，在访问zlmediakit时，这些分布在不同线程的请求，其cookie都相同，导致所有线程同时大规模操作同一个cookie，而操作cookie是要加锁的，于是这些线程疯狂的同时进行锁竞争，虽然不会死锁，但是会花费大量的时间用在锁等待上，导致整体性能降低。**

虽然在真实使用场景下，用户cookie并不一致，这种几千用户同时访问同一个cookie的情况并不会存在，但是为了考虑不影响hls性能压测，也为了杜绝一切隐患，针对这个问题，我于是对http/hls的cookie机制进行了修改，在操作cookie时，不再上锁：

![图片.png](https://upload-images.jianshu.io/upload_images/8409177-ee5230a889b3891b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/600)
![图片.png](https://upload-images.jianshu.io/upload_images/8409177-348df864460eaefd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/600)

之前对cookie上锁属于过度设计，当时目的主要是为了实现在cookie上随意挂载数据。

## 优化之旅三：hls m3u8文件内存化
经过上面两次优化，zlmediakit的hls并发能力可以达到8K了，但是当hls播放器个数达到在8K 左右时，zlmediakit的ts切片下载开始超时，可见系统还是存在性能瓶颈，联想到在优化cookie互斥锁时，有线程处于该状态：

![图片.png](https://upload-images.jianshu.io/upload_images/8409177-4c4cb2dd76e913ac.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/700)

所以我严重怀疑原因是m3u8文件不能使用mmap优化(而是采用fread方式)导致的文件io性能瓶颈问题，后面通过查看函数调用栈发现，果然是这个原因。

由于m3u8是易变的，使用mmap映射时，如果文件长度发生变化，会导致触发SIGBUS的信号，查看多方资料，此问题无解。所以最后只剩下通过m3u8文件内存化来解决，于是我修好了m3u8文件的http下载方式，改成直接从内存获取：

![图片.png](https://upload-images.jianshu.io/upload_images/8409177-175e50e0c1dbc104.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/700)

## 结果：性能爆炸
通过上述总共3大优化，我们在压测zlmediakit的hls性能时，随着一点一点增加并发量，发现zlmediakit总是能运行的非常健康，在并发量从10K慢慢增加到30K时，并不会影响ffplay播放的流畅性和效果，以下是压测数据：

> 压测16K http-hls播放器时，流量大概7.5Gb/s：
(大概需要32K端口，由于我测试机端口不足，只能最大压测到这个数据)

![图片.png](https://upload-images.jianshu.io/upload_images/8409177-e4e50b03f39fb67a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/600)
![图片.png](https://upload-images.jianshu.io/upload_images/8409177-ac97bc4b78986289.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/600)
![图片.png](https://upload-images.jianshu.io/upload_images/8409177-2c64d8cd201ecd20.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/600)


> 后面用户再压测了30k https-hls播放器:

![图片.png](https://upload-images.jianshu.io/upload_images/8409177-4f0ca1cb2f5df91c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/600)
![图片.png](https://upload-images.jianshu.io/upload_images/8409177-1569e4c146dd47b8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/400)


## 后记：用户切生产环境
在完成hls性能优化后，该用户把所有北美节点的hls流量切到了zlmediakit，

![图片.png](https://upload-images.jianshu.io/upload_images/8409177-10a6d17e6236fa48.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/400)
![图片.png](https://upload-images.jianshu.io/upload_images/8409177-e6d38eda398a2b16.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/400)

## 状况又起:
今天该用户又反馈给我说zlmediakit的内存占用非常高，在30K hls并发时，内存占用30+GB:

![图片.png](https://upload-images.jianshu.io/upload_images/8409177-577fd6cd88b3f0f3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/700)

但是用zlmediakit的`getThreadsLoad`接口查看，却发现负载很低：

![图片.png](https://upload-images.jianshu.io/upload_images/8409177-9b200e5fb718781b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/300)

同时使用zlmediakit的`getStatistic`接口查看，发现`BufferList`对象个数很高，初步怀疑是由于网络带宽不足导致发送拥塞，内存暴涨，通过询问得知，公网hls访问，确实存在ts文件下载缓慢的问题：

![图片.png](https://upload-images.jianshu.io/upload_images/8409177-0259d17384210378.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/600)

同时让他通过局域网测试ts下载，却发现非常快：

![图片.png](https://upload-images.jianshu.io/upload_images/8409177-368e718cc2870cc8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/600)

后来通过计算，发现确实由于网络带宽瓶颈每个用户积压一个Buffer包，而每个Buffer包用户设置的为1MB，这样算下来，30K用户，确实会积压30GB的发送缓存：

![图片.png](https://upload-images.jianshu.io/upload_images/8409177-10264ff3561e6ddc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/600)

![图片.png](https://upload-images.jianshu.io/upload_images/8409177-ff0d783f7941a9da.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/600)

![图片.png](https://upload-images.jianshu.io/upload_images/8409177-d305041f6b99e04a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/600)


## 结论
通过上面的经历，我们发现zlmediakit已经足以支撑30K/50Gb级别的https-hls并发能力, 理论上，http-hls相比https-hls要少1次内存拷贝，和1次加密，性能应该要好很多；那么zlmediakit的性能上限在哪里？天知道！毕竟，我已经没有这么豪华的配置供我压测了；在此，我们先立一个保守的flag吧：

**单机 100K/100Gb级别 hls并发能力。**

那其他协议呢？ 我觉得应该不输hls。

