---
title: 生成SSL自签名证书并测试
---
# 1、创建私钥
```bash
 openssl genrsa  -out server.key 2048
```

# 2、 创建签名请求文件
```bash
 openssl req -new -key server.key -out server.csr
```
注意，需要输入域名(Common Name (e.g. server FQDN or YOUR name))：
```bash
Country Name (2 letter code) [AU]:cn
State or Province Name (full name) [Some-State]:gd
Locality Name (eg, city) []:sz
Organization Name (eg, company) [Internet Widgits Pty Ltd]:company
Organizational Unit Name (eg, section) []:section
Common Name (e.g. server FQDN or YOUR name) []:zlm.com
Email Address []:xiachu@qq.com

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:
An optional company name []:zlm
```

# 3、自签名，生成公钥（10年有效期）
```bash
openssl x509 -req -days 3650 -in server.csr -signkey server.key -out server.crt
```
执行该命令会打印以下信息：
```bash
Signature ok
subject=/C=cn/ST=gd/L=sz/O=company/OU=section/CN=zlm.com/emailAddress=xiachu@qq.com
Getting Private key
```

# 4、合并公钥私钥
```bash
cat server.crt server.key > ./ssl.pem
```

# 5、加载证书
```bash
./MediaServer -s ./ssl.pem
```
![图片.png](https://upload-images.jianshu.io/upload_images/8409177-a3e64c0c8b642521.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

