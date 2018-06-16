---
title: Https小结
date: 2016-12-24
categories: programing
tags: [http]
keywords: [HTTP,HTTPS,什么是HTTPS,TLS/SSL,HTTPS劫持]
---

最近由于复习了下Http相关的知识，所以写了一些关于Http的文章，算是自己的读书笔记。上次写的是Http方法定义的文章，这次聊聊Https。

#### Https简介

Https全称Http Secure，它并非是一种新协议。只是Http通信接口部分用SSL和TSL协议代替。简言之，Https就是身披SSL协议外壳的Http。

[![Http&Https.png](https://i.loli.net/2018/06/11/5b1e15cfd332f.png)](https://i.loli.net/2018/06/11/5b1e15cfd332f.png)

**TLS/SSL**

TLS/SSL是一个公钥／私钥的结构，它是一个非对称的结构，每个服务器端和客户端都有自己的公私钥。公钥用来加密数据，而私钥用来解密收到的数据。公钥和私钥是配对的，（其实可以理解成是一把锁和对应的钥钥），所以在建立安全传输之前，客户端和服务器端会互换公钥（锁头），客户端发送的数据要通过服务器公钥加密，服务器端发送数据时则需要客户端公钥加密。

[![TSL&SSL.png](https://i.loli.net/2018/06/11/5b1e15cfd4f0f.png)](https://i.loli.net/2018/06/11/5b1e15cfd4f0f.png)

这里还引入了一个第三方：CA（Certificate Authority，数字证书认证中心）。客户端在发起安全连接前会去获取服务器端的证书，并通过CA的帧数验证服务器端证书的真伪。除了验证真伪外，通常还含有对服务器名称，IP地址等进行验证的过程。
简单点说就是在公钥互换的时候，客户端需要验证服务器给过来的公钥是否真的是我们想要的服务器发过来的，而不是其他中间人伪造的。

[![CA.png](https://i.loli.net/2018/06/11/5b1e15d008093.png)](https://i.loli.net/2018/06/11/5b1e15d008093.png)

#### Https的安全通信机制

为了更好的理解Https，来看下Https的通信步骤。

```sequence
客户端-->服务器端: 1. Handshake：Client Hello
服务器端->客户端: 2. Handshake：Server Hello
服务器端->客户端: 3. Handshake：Certificate
服务器端-->客户端: 4. Handshake：Server Hello Done
客户端->服务器端: 5. Handshake：Client Key Exchange
客户端->服务器端: 6. Change Cipher Spec
客户端-->服务器端: 7. Handshake：Finished
服务器端->客户端: 8. Change Cipher Spec
服务器端-->客户端: 9. Handshake：Finished
客户端->服务器端: 10. Transfer Application data（HTTP）
服务器端->客户端: 11. Transfer Application data（HTTP）
客户端-->服务器端: 12. Alert: warning, close notify
```

1. 客户端发送Client Hello开始通信。
2. 服务器以Server Hello作为应答。
3. 之后服务器发送Certificate报文，包含公钥证书（此步将发送服务器端公钥给客户端）。
4. 服务器再次发送Server Hello Done通知客户端。
5. 客户端以Client Key Exchange作为回应（此步将验证服务器证书，并发送客户端公钥给服务器）。
6. 接着客户端继续发送Change Cipher Spec，提示服务器，之后会用之前发送的客户端公钥进行加密通信。
7. 客户端发送finished告知服务器。
8. 服务器同样发送Change Cipher Spec提示客户端。
9. 服务器发送finished给客户端。
10. SSL连接建立完成，之后开始发送加密后的数据通过Http通信。
11. 服务器加密数据响应客户端。
12. 客户端断开连接，发送close_notify，这步之后再发送TCP FIN来关闭与TCP的连接。

#### 两种Https攻击方式

简单介绍完Https，在说说现在Https下常见的两种攻击方式：

**中间人攻击**

客户端和服务器端在交换公钥的过程中，中间人对客户端扮演服务器的角色，对服务器扮演客户端的角色。因为客户端和服务器双方都感觉不到中间人的存在。

```sequence
客户端->中间人: 发起连接
中间人->服务器: 发起连接
服务器->中间人: 响应连接（服务器公钥）
中间人->客户端: 响应连接（伪造的服务器公钥）
note left of 客户端: 验证证书（部分验证失\n败，浏览器弹出警告）
客户端->中间人: 建立连接并发送数据
中间人->服务器: 转发数据
服务器->中间人: 响应数据
中间人->客户端: 转发数据
```

**SSLstrip**

**原理**

SSLstrip使用了社会工程学的原理：许多人为了图方便省事，在输入网址时一般不考虑传输协议，习惯上只是简单输入主机名，浏览器默认在这种情况下会使用HTTP协议。例如用户为了使用Gmail邮箱，直接输入accounts.google.com，浏览器会给谷歌服务器发送一个HTTP 请求，谷歌服务器认为电子邮件属于应加密的重要事务，使用HTTP不恰当，应改为使用HTTPS，于是它返回一个状态码为302的HTTP 响应，给出一个重定向网址https://accounts.google.com/ServiceLogin，浏览器再使用这个重定向网址发出HTTPS 请求。一个原本应该从头到尾使用HTTPS加密会话的过程中混入了使用明文传输的HTTP会话，一旦HTTP会话被劫持，HTTPS会话就可能受到威胁。

```sequence
客户端->SSLstrip: 请求http://www.***.com
SSLstrip->服务器: 请求http://www.***.com
服务器->SSLstrip: 响应302，location=https://www.***.com
SSLstrip->客户端: 响应302，location=http://www.SSLstrip.com:8181
客户端->SSLstrip: 建立http连接，并发送数据
SSLstrip->服务器: 与服务器建立https连接，并转发数据
服务器->SSLstrip: 响应数据
SSLstrip->客户端: 转发数据
```

#### 参考

1. 书籍：图解Http，第七章
2. 书籍：深入浅出Nodejs，第七章
3. 博客：[ 分析两种实现SSL会话劫持的典型技术](http://blog.csdn.net/howeverpf/article/details/19366215)