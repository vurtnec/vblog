---
title: HTTP-方法定义
---

---
上周用一个下午的时候读了图解Http这本书，本来是想好好帮自己回忆并整理Http相关的知识，奈何读完才发现这本书其实更适合初学者阅读，里面大量Http协议讲解也只是点到为止。
不过总的来说还是想从一个Web开发人员的角度写点经常会用又有很人开发人员说不清楚的东西。

这篇先聊聊Http Request的方法定义，到底GET，POST，PUT，DELETE之间有什么区别，都分别代表什么意思。详细文档参阅了Http RFC原文，有兴趣的也可以阅读下原文：[HTTP RFC, Method Definitions](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9).

先说两个概念，**安全方法**和**幂等方法**。
#### **安全方法**
先说两个概念，方法不应具有采取除检索之外的动作的意义。这些方法应该被认为是“安全的”。就是说一个方法应该只能从服务器获取内容，且不会对服务器产生其他任何影响。
同时有一点很重要，我们无法保证服务器不会因为这个请求产生副作用（比如一个浏览用户访问了一个人的博客，只是查看了博文，但是服务器会使这篇博客的访问数加一），所以定义一个方法是否安全在于用户是否有请求副作用，用户不用对这个请求产生任何责任。
#### **幂等方法**
幂等是数学里面的一个概念，具体可参见[百度百科](http://baike.baidu.com/link?url=0bAavXkdOTjl7azRk4X6iHdhDoY2sV3OWrT8tFXM8D2usJSZKqj_AynB81Uu7p2ZfVpYXLF5yrTNoF74uAtgi-e1XenogYR3dof2RfFw3me)，这里指的是一个请求如果访问N次产生的副作用和访问一次的副作用相同，我们可以认为是幂等的。

所以我们可以认为安全方法一定是幂等的，但是幂等不一定是安全的。

---
##### **什么是HTTP Entity？**
我们知道一个Http请求包含了报文首部和主体部分，中间以空行隔开。而通常报文主体等于实体主体，只有当传输中进行编码操作时，实体主体的内容发生变化，才导致它和报文主体产生差异。
![Http Header](http://img.blog.csdn.net/20161211163819657?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvdnVydG5lYw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
##### **GET Method**
GET属于安全方法，代表从指定的URI以实体（Entity）形式获取信息。也就是说，如果请求的资源说文本，则保持原样返回，如果说一段程序，则返回执行后的输出结果，而不是返回源程序。
##### **POST Method**
POST方法允许请求中包含实体作为从属的Request-URI发送给服务器。简而言之就是一个POST的请求包含了报文首部和实体主体传送给服务器，而且POST既不是安全，也不是幂等的方法。
##### **PUT Method**
PUt方法则用于将请求中包含的实体储存在Request-URI下。它和POST的根本区别在于：

1. PUT方法是幂等的，而POST不是。
2. PUT方法该URI不得不处理该实体，如果服务器期望交由其他URI处理，则必须返回30X告知用户，由用户来判断是否跳转。而POST可以由服务器决定是否交给其他网关处理，并最终返回Response。
##### **DELETE Method**
DELETE方法与PUT刚好相反，用于删除由Request-URI标识的资源。同样DELETE是幂等的。

由于HTTP/1.1的PUT和DELETE方自身不带验证机制，任何人都可以删除和创建资源，存在安全问题，因此一般网站都不使用该方法。但是如果配合Web应用自身的验证机制，或采用REST标准的架构，就可能开放这两个方法。（说实话，为此我还专门看了下我们网站所使用的REST API，居然专门移除了对PUT和DELETE方法的支持，有点不大明白为什么）
                                                                                                             
关于Http方法定义就说这么多了，接下来会写写HTTPS。