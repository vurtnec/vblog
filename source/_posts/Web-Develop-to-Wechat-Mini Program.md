---
title: Web开发到微信小程序
date: 2018-06-25
categories: programing
tags: [小程序,Favorites]
keywords: [微信,微信小程序,Web,Web开发,小程序]
---
闲来无事，突然想写一个小程序，于是好好的周五的晚上写了一晚上代码，从完全不知道什么情况（我的JavaScript水平很差的），到愣是写好了一个已经发布了的小程序。所以这里只是想分享一下一个Web开发人员半吊子前端水平如何写出一个小程序。

### 准备条件

- 微信开发者工具，去官网下载
- 微信小程序账号注册一个，https://mp.weixin.qq.com/
- ES6，这个我觉得Java程序员应该都是依样画葫芦写出来
- JavaScript，不一定要精通，至少要会写吧
- 官方的微信小程序demo，https://github.com/xwartz/wechat-app-demo
- 官方文档一份，https://developers.weixin.qq.com/miniprogram/dev/index.html

### 小程序和Web开发的相似点
其实小程序和Web开发还是有很多相似之处的，只要知道这些，开发起来也会容易很多。当然开始开始先简单阅读下官方文档的get start。

#### 视图层
**WXML**

这个后缀的文件其实就和JSP或者其他模板一样，里面有些微信自己封装的标签和属性，参照官方文档写就行了。

**WXSS**

这个文件其实就是css文件，所有样式都放在里面就好。

#### 逻辑层

JS文件就是用来处理各种业务逻辑的地方，当计算好的结果要返回给视图层的时候，只需要将数据放入page对象的pageData.data，用setData方法就好。

#### 配置层

app.json，该文件用于配置当前app的常用配置，比如将要所有页面都注册到这个配置文件里面。

### Troubleshooting

- 每次修改了pageData的data内容的时候，一定要调用setData方法，这里就跟flux有点相似，修改了store的内容，需要通知到视图层去更新。
- 每个page的data，和css都相互独立，意思是说pageData这个对象的scope是只是当前page。
- 全局变量建议定义在app.js里面。
- app.wxss是公共的css文件，会被page里面的覆盖。

### 部署
微信小程序分为开发版，体验版和正式版。

#### 开发版
这个只需要点击用手机扫面预览二维码就可以，但是只限于自己绑定的微信账号和给了权限的账号，一般用于开发人员。
#### 体验版
这个需要上传代码到微信服务器，同样也需要授权给部分微信账号，才可以使用，一般用于测试人员（我猜的）。
#### 正式版
这个就是正式发布后的，所有人都可以在手机上面搜索到该版本，但是需要提交给微信审核，审核通过之后方可发布。

### 附录
写好的小程序源码：https://github.com/vurtnec/vPassword

