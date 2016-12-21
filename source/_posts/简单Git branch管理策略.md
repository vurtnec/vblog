---
title: 简单Git branch管理策略
date: 2015-05-30
---

最近新项目开始，突然被要求使用git，诚然git是个好东西，但从svn转下git还是出现各种不适应，在这统一做下总结吧。
git的优点就不介绍了，先说说我对teamwork中git branch管理策略的理解吧。 
![Git branch](http://img.blog.csdn.net/20161211114325293?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvdnVydG5lYw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

### master branch
首先，代码库应该有一个、且仅有一个主分支。所有提供给用户使用的正式版本，都在这个主分支上发布。Git主分支的名字，默认叫做Master。它是自动建立的，版本库初始化以后，默认就是在主分支在进行开发。

### hotfix branch
主要用于hot fix生产环境的bug，且只用于hot fix生产环境的bug。

### release branch
预发布分支，它是指发布正式版本之前（即合并到Master分支之前），我们可能需要有一个预发布的版本进行测试，这个版本也是QA会集中测试的环境，一般用此版本来搭建本地测试环境供QA验证。

### develop branch
开发分支，一般来说会在每个sprint或者phrase的时候搭建一个初始develop branch出来。

### feature branch
每个开发在接到一个新的feature task时，就根据此branch搭建一个自己的feature branch出来进行开发。完成之后将本地代码push带远程服务器对应的feature branch上，在创建pull request到develop branch上去，code review就是在此时时进行（一般来说当功能做完并测试之后，该branch将会删除）。

### bugfix branch
跟feature branch相同，主要用于修复做新功能时产生的bug。

这种策略对开发有一个很重要的要求就是，每个开发必须对自己的feature branch负责，从创建新的feature branch开始，编码，单元测试，到最后pull request通过，merge进去develop branch之后任务才算完整。

我的理解难免会有不对的地方，如果有什么建议请提出来共同改进。