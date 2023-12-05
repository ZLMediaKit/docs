---
title: GB28181 SIP信令抓包
---

## 1、注册

- 注册请求：

```http
REGISTER sip:130909115229300920@10.64.49.44:7100 SIP/2.0
Via: SIP/2.0/UDP 10.64.49.218:7100;rport;branch=z9hG4bK4162288924
From: <sip:130909113319427420@10.64.49.218:7100>;tag=382068091
To: <sip:130909113319427420@10.64.49.218:7100>
Call-ID: 143225205
CSeq: 1 REGISTER
Contact: <sip:130909113319427420@10.64.49.218:7100>
Max-Forwards: 70
User-Agent: Hikvision
Expires: 7200
Content-Length: 0
```

- 回复 401：

```http
SIP/2.0 401 Unauthorized
Via: SIP/2.0/UDP 10.64.49.218:7100;rport=7100;branch=z9hG4bK4162288924
From: <sip:130909113319427420@10.64.49.218:7100>;tag=382068091
To: <sip:130909113319427420@10.64.49.218:7100>;tag=916944766
Call-ID: 143225205
CSeq: 1 REGISTER
WWW-Authenticate: Digest realm="hik", nonce="a8afe6fcbee6331d89d3eb0d3d19ce39", opaque="a853e4f25298413f9bf3a9aa6767857d", algorithm=MD5
User-Agent: Hikvision
Expires: 7200
Content-Length: 0
```

- 再次注册：

```http
REGISTER sip:130909115229300920@10.64.49.44:7100 SIP/2.0
Via: SIP/2.0/UDP 10.64.49.218:7100;rport;branch=z9hG4bK3997518011
From: <sip:130909113319427420@10.64.49.218:7100>;tag=382068091
To: <sip:130909113319427420@10.64.49.218:7100>
Call-ID: 143225205
CSeq: 2 REGISTER
Contact: <sip:130909113319427420@10.64.49.218:7100>
Authorization: Digest username="admin", realm="hik", nonce="a8afe6fcbee6331d89d3eb0d3d19ce39", uri="sip:130909115229300920@10.64.49.44:7100", response="907ddb1bcc25174d7de4a96c947fb066", algorithm=MD5, opaque="a853e4f25298413f9bf3a9aa6767857d"
Max-Forwards: 70
User-Agent: Hikvision
Expires: 7200
Content-Length: 0
```

- 注册成功：

```http
SIP/2.0 200 OK
Via: SIP/2.0/UDP 10.64.49.218:7100;rport=7100;branch=z9hG4bK3997518011
From: <sip:130909113319427420@10.64.49.218:7100>;tag=382068091
To: <sip:130909113319427420@10.64.49.218:7100>;tag=705514612
Call-ID: 143225205
CSeq: 2 REGISTER
Contact: <sip:130909113319427420@10.64.49.218:7100>
User-Agent: Hikvision
Date: 2013-09-10T16:01:51
Content-Length: 0
```

## 2、注销

- 注销请求：

```http
REGISTER sip:130909115229300920@10.64.49.44:7100 SIP/2.0
Via: SIP/2.0/UDP 10.64.49.218:7100;rport;branch=z9hG4bK1670314216
From: <sip:130909113319427420@10.64.49.218:7100>;tag=1928169842
To: <sip:130909113319427420@10.64.49.218:7100>
Call-ID: 3187228566
CSeq: 1 REGISTER
Contact: <sip:130909113319427420@10.64.49.218:7100>
Max-Forwards: 70
User-Agent: Hikvision
Expires: 0
Content-Length: 0
```

- 回复 401：

```http
SIP/2.0 401 Unauthorized
Via: SIP/2.0/UDP 10.64.49.218:7100;rport=7100;branch=z9hG4bK1670314216
From: <sip:130909113319427420@10.64.49.218:7100>;tag=1928169842
To: <sip:130909113319427420@10.64.49.218:7100>;tag=1002632848
Call-ID: 3187228566
CSeq: 1 REGISTER
WWW-Authenticate: Digest realm="hik", nonce="42dc1acbe02b15743942c0af9314768b", opaque="8e3da4136ac9ab537de09a9932c2a9a3", algorithm=MD5
User-Agent: Hikvision
Expires: 0
Content-Length: 0
```

- 再次注销:

```http
REGISTER sip:130909115229300920@10.64.49.44:7100 SIP/2.0
Via: SIP/2.0/UDP 10.64.49.218:7100;rport;branch=z9hG4bK317693249
From: <sip:130909113319427420@10.64.49.218:7100>;tag=1928169842
To: <sip:130909113319427420@10.64.49.218:7100>
Call-ID: 3187228566
CSeq: 2 REGISTER
Contact: <sip:130909113319427420@10.64.49.218:7100>
Authorization: Digest username="admin", realm="hik", nonce="42dc1acbe02b15743942c0af9314768b", uri="sip:130909115229300920@10.64.49.44:7100", response="7328353ed26e3f2edf3ff57e834d5665", algorithm=MD5, opaque="8e3da4136ac9ab537de09a9932c2a9a3"
Max-Forwards: 70
User-Agent: Hikvision
Expires: 0
Content-Length: 0
```

- 注销成功：

```http
SIP/2.0 200 OK
Via: SIP/2.0/UDP 10.64.49.218:7100;rport=7100;branch=z9hG4bK317693249
From: <sip:130909113319427420@10.64.49.218:7100>;tag=1928169842
To: <sip:130909113319427420@10.64.49.218:7100>;tag=409851991
Call-ID: 3187228566
CSeq: 2 REGISTER
Contact: <sip:130909113319427420@10.64.49.218:7100>
User-Agent: Hikvision
Date: 2013-09-10T14:04:41
Content-Length: 0
```

## 3、心跳

- 请求：

```http
MESSAGE sip:130909115229300920@10.64.49.44:7100 SIP/2.0
Via: SIP/2.0/UDP 10.64.49.218:7100;rport;branch=z9hG4bK2672759896
From: <sip:130909113319427420@10.64.49.218:7100>;tag=308835751
To: <sip:130909115229300920@10.64.49.44:7100>
Call-ID: 63810466
CSeq: 20 MESSAGE
Content-Type: Application/MANSCDP+xml
Max-Forwards: 70
User-Agent: Hikvision
Content-Length:   150

<?xml version="1.0"?>
<Notify>
<CmdType>Keepalive</CmdType>
<SN>2749</SN>
<DeviceID>130909113319427420</DeviceID>
<Status>OK</Status>
</Notify>
```

- 回复：

```http
SIP/2.0 200 OK
Via: SIP/2.0/UDP 10.64.49.218:7100;rport=7100;branch=z9hG4bK2672759896
From: <sip:130909113319427420@10.64.49.218:7100>;tag=308835751
To: <sip:130909115229300920@10.64.49.44:7100>;tag=1578583786
Call-ID: 63810466
CSeq: 20 MESSAGE
User-Agent: Hikvision
Content-Length: 0
```

## 4、目录检索

- 请求：

```http
MESSAGE sip:130909113319427420@10.64.49.218:7100 SIP/2.0
Via: SIP/2.0/UDP 10.64.49.44:7100;rport;branch=z9hG4bK32925498
From: <sip:130909115229300920@10.64.49.44:7100>;tag=1307626839
To: <sip:130909113319427420@10.64.49.218:7100>
Call-ID: 2367611040
CSeq: 20 MESSAGE
Content-Type: Application/MANSCDP+xml
Max-Forwards: 70
User-Agent: Hikvision
Content-Length:   124

<?xml version="1.0"?>
<Query>
<CmdType>Catalog</CmdType>
<SN>471</SN>
<DeviceID>130909113319427420</DeviceID>
</Query>
```

- 回复：

```http
SIP/2.0 200 OK
Via: SIP/2.0/UDP 10.64.49.44:7100;rport=7100;branch=z9hG4bK32925498
From: <sip:130909115229300920@10.64.49.44:7100>;tag=1307626839
To: <sip:130909113319427420@10.64.49.218:7100>;tag=1981225076
Call-ID: 2367611040
CSeq: 20 MESSAGE
User-Agent: Hikvision
Content-Length: 0
```
