---
title: How to Enable HTTPS Related Functions
---

### I. Enable OpenSSL Feature during Compilation
The HTTPS feature of zlmediakit (including rtmps/rtsps/webrtc/wss) relies on the OpenSSL library. Before compiling zlmediakit, you should first install the OpenSSL library in the default system environment. On Ubuntu, you can install it using the following command:
```bash
sudo apt-get install libssl-dev
```

If the default version of OpenSSL on your system is too old, you can choose to compile and install OpenSSL to a custom path. In this case, when compiling zlmediakit, you can specify the custom installation path of OpenSSL using the following command:

```bash
cd ZLMediaKit
mkdir build
cd build
cmake .. -DOPENSSL_ROOT_DIR=/path/to/your/new/openssl/install/root/dir
make -j$(nproc)
```

## II. Create Certificates
- If you haven't purchased a domain name yet, you can use a [self-signed certificate](./generate_ssl_self-signed_certificate_and_test.md) or the default certificate `default.pem` provided by zlmediakit for testing.

- If you have already purchased a domain name, using Alibaba Cloud as an example, you can choose to apply for a free certificate for your domain:**

![图片](/images/how_to_enable_https_related_functions_zh_1.png)

- **After obtaining the free certificate quota, click the "Create Certificate" button and enter your domain name in the pop-up page:**

![图片](/images/how_to_enable_https_related_functions_zh_2.png)

- **Click "Next" to submit the application for review:**

![图片](/images/how_to_enable_https_related_functions_zh_3.png)

## III. Download and Merge Certificates into the Supported Format by zlmediakit:
- **Download the certificates:**

![图片](/images/how_to_enable_https_related_functions_zh_4.png)

- **Choose to download either nginx or other methods (both have the same certificate format):**

![图片](/images/how_to_enable_https_related_functions_zh_5.png)

- **After extracting the downloaded compressed file, the files are as follows**：

<img width="760" alt="图片" src="https://user-images.githubusercontent.com/11495632/191884186-3c09f0ed-0042-417c-a8dc-ad87c4c0c1ed.png">


- The files with the ".key" extension are private keys, and the files with the ".pem" extension are public keys. Both can be opened with a text editor. They are base64-encoded strings. After concatenating the two strings together, you will get the certificate file format supported by zlmediakit:

```bash
# Enter the folder
cd 8516590_test.zlmediakit.com_nginx
# Merge the public and private keys
cat 8516590_test.zlmediakit.com.key 8516590_test.zlmediakit.com.pem > default.pem
```

## IV. Load Certificates in zlmediakit

```bash
# Go to the binary directory of zlmediakit after compilation (different paths for different platforms)
cd ~/git/ZLMediaKit/release/darwin/Debug/

# Copy the merged certificate over
cp ~/Downloads/8516590_test.zlmediakit.com_nginx/default.pem ./

# Start the process
./MediaServer -s default.com
```

![图片](/images/how_to_enable_https_related_functions_zh_6.png)



## V. Testing

- If the IP address of your development machine does not map to the IP address bound to the certificate domain, you can modify the host file to perform the test. Here is an example for Linux/Mac：

```bash
# Open the host file
sudo vi /etc/hosts
# Add the following line (your machine's IP + a space + your domain name)
127.0.0.1  test.zlmediakit.com
# Save and exit vi after making the modification
```

- **Open the browser and enter the HTTPS address for testing:**

![图片](/images/how_to_enable_https_related_functions_zh_7.png)

- **View the certificate:**

![图片](/images/how_to_enable_https_related_functions_zh_8.png)


## VI. Deploying in a Production Environment

- After completing all the previous steps and passing the verification, you can proceed to deploy the application in a production environment. To do this, you need to bind the certificate domain name to the real public IP address of your cloud host:

![图片](/images/how_to_enable_https_related_functions_zh_9.png)

![图片](/images/how_to_enable_https_related_functions_zh_10.png)







