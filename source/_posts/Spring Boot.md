---
title: Spring Boot
date: 2018-04-21
categories: programing
tags: [Spring,Spring Boot]
keywords: [Spring,Spring Boot,Hello World,Maven,Gradle]
---

## Spring Boot简介

### Spring Boot不是什么
过去一两年的时间里有不少和它相关的言论。原先听到或看到的东西可能给你造成了一些误解，所以首先我们要澄清一下这些误解。

首先，Spring Boot不是应用服务器。这个误解是这样产生的：Spring Boot可以吧Web应用程序变为可执行的JAR文件，不用部署到传统Java应用服务器里就能在命令行里面执行。Spring Boot在应用程序里面内嵌了一个Servlet容器（Tomcat，Jetty或者Undertow），以此来实现这个功能。但这是内嵌的Servlet容器提供的功能，部署Spring Boot实现的。

与此类似，Spring Boot也没有实现诸如JPA或者JMS之类的企业级Java规范。它的确支持了不少企业级Java规范，但是要在Spring里自动配置支持那些特性的Bean。例如，Spring Boot没有实现JPA，但是它的自动配置了某个JPA实现，（比如Hibernate Bean），以此实现JPA。

最后Spring Boot没有引入任何形式的代码生成，而是利用了Spring 4的条件化配置特性，以及Maven和Gradle提供的传递依赖解析，以此实现Srping应用程序上下文的自动配置。


### String Boot是什么
简而言之，本质上来说Spring Boot就是Spring，它走了那些没有它你自己也会去做的Spring Bean配置。它帮你提供了一种更简单的方式来配置Spring Bean，以此来搭建Spring环境。

### String Boot是怎么工作的
这里引用一个网上看到的图,详细讲述了Spring Boot是如何工作的

![how-spring-boot-autoconfigure-works.png](https://i.loli.net/2018/06/16/5b24917295d35.png)

### 我对Spring Boot的理解
Spring Boot作为一个微框架，感觉就是顺应当前微服务流行下的产物。是一个微服务框架的起点，为创建REST服务提供了简便的途径。


## 引用和参考
**书籍:**

Spring Boot in Action

**博客:**

https://afoo.me/posts/2015-07-09-how-spring-boot-works.html
