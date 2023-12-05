---
title: Generate SSL self-signed certificate and test
---

# 1. Generate Private Key

```bash
 openssl genrsa  -out server.key 2048
```

# 2. Create Certificate Signing Request (CSR) File

```bash
 openssl req -new -key server.key -out server.csr
```

Note: You will be prompted to enter the domain name (Common Name (e.g. server FQDN or YOUR name)):

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

# 3. Self-Sign the Certificate and Generate Public Key (Valid for 10 years)

```bash
openssl x509 -req -days 3650 -in server.csr -signkey server.key -out server.crt
```

Executing this command will print the following information:

```bash
Signature ok
subject=/C=cn/ST=gd/L=sz/O=company/OU=section/CN=zlm.com/emailAddress=xiachu@qq.com
Getting Private key
```

# 4. Merge Public Key and Private Key

```bash
cat server.crt server.key > ./ssl.pem
```

# 5. Load the Certificate

```bash
./MediaServer -s ./ssl.pem
```

![图片.png](/images/generate_ssl_self-signed_certificate_and_test.webp)
