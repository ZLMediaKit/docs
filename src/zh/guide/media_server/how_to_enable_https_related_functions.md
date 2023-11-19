---
title: 怎么开启https相关功能
---

## 一、编译时开启openssl特性
zlmediakit的https(另外还包括rtmps/rtsps/webrtc/wss)功能依赖openssl库，在编译zlmediakit时，应该先在系统默认环境安装openssl库，ubuntu下通过以下命令安装：
```bash
sudo apt-get install libssl-dev
```

如果您的系统默认openssl版本太老，可以选择自行编译安装openssl到自定义路径；此时，在编译zlmediakit时可以通过以下命令指定openssl自定义安装路径：

```bash
cd ZLMediaKit
mkdir build
cd build
cmake .. -DOPENSSL_ROOT_DIR=/path/to/your/new/openssl/install/root/dir
make -j$(nproc)
```

## 二、创建证书
- 如果你还没购买域名，可以使用[自签名证书](./generate_ssl_self-signed_certificate_and_test.md)或zlmediakit自带默认证书`default.pem`测试。

- **如果你已经购买域名，以阿里云为例，你可以选择为您的域名申请免费证书：**

![图片](/images/how_to_enable_https_related_functions_zh_1.png)

- **申请免费证书额度后，可以点击`创建证书`按钮，在弹出页面输入您的域名：**

![图片](/images/how_to_enable_https_related_functions_zh_2.png)

- **点击下一步后提交审核:**

![图片](/images/how_to_enable_https_related_functions_zh_3.png)

## 三、下载证书并合并为zlmediakit支持的证书类型：
- **下载证书：**

![图片](/images/how_to_enable_https_related_functions_zh_4.png)

- **选择下载nginx或其他方式都可(两者证书类型一样)：**

![图片](/images/how_to_enable_https_related_functions_zh_5.png)

- **解压下载压缩包后文件如下**：

<img width="760" alt="图片" src="https://user-images.githubusercontent.com/11495632/191884186-3c09f0ed-0042-417c-a8dc-ad87c4c0c1ed.png">


- key后缀的文件是私钥，pem后缀的文件为公钥，两者可以使用文本编辑器打开，它们都是base64编码的字符串，两个字符串拼接在一起后就是zlmediakit支持的证书文件类型了：

```bash
#进入文件夹
cd 8516590_test.zlmediakit.com_nginx
#合并公钥私钥
cat 8516590_test.zlmediakit.com.key 8516590_test.zlmediakit.com.pem > default.pem
```

## 四、zlmediakit加载证书

```bash
#进入zlmediakit编译后的二进制目录(不同平台路径有所不同)
cd ~/git/ZLMediaKit/release/darwin/Debug/

#把合并后的证书拷贝过来
cp ~/Downloads/8516590_test.zlmediakit.com_nginx/default.pem ./

#启动进程
./MediaServer -s default.com
```

![图片](/images/how_to_enable_https_related_functions_zh_6.png)



## 五、测试

- 如果你的开发机的ip并不是证书绑定域名映射映射的ip，那么可以通过修改host文件来实现测试, 以linux/mac为例：

```bash
#打开host文件
sudo vi /etc/hosts
#新增内容(本机ip+空格+你的域名)
127.0.0.1  test.zlmediakit.com
#修改后保存退出vi
```

- **打开浏览器输入https地址测试：**

![图片](/images/how_to_enable_https_related_functions_zh_7.png)

- **查看证书：**

![图片](/images/how_to_enable_https_related_functions_zh_8.png)


## 六、部署线上环境

- 以上5步都走完了，验证通过，那么我们接下来可以部署线上环境；部署线上环境只需要把证书绑定的域名解析到您云主机的真实公网ip即可：

![图片](/images/how_to_enable_https_related_functions_zh_9.png)

![图片](/images/how_to_enable_https_related_functions_zh_10.png)







