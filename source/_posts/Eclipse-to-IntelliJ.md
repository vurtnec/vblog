---
title: Eclipse to IntelliJ IDEA
date: 2016-10-31
categories: programing
---

身边越来越多的人开始使用IntelliJ IDEA，都在向我推荐用了之后工作效率提高了一大截。抱着半信半疑的心态，我也尝试使用这个新的IDE，经过一周的使用，个人体会就是好比玩dota的从dota键位改成了QWER，用智能ABC的换成了搜狗输入法。当然不要认为我是在夸这个IDE，因为到目前为止我还没发现有什么特别的理由让我一定要从Eclipse切换到IDEA。
不过还是分享下摸索一周来的一些小技巧，说说如何减轻IDE过渡之间的不使用。

### 快捷键

开发工具中的重中之重，工作效率提升最直接的体现。IDEA支持直接切换快捷键模版，习惯Eclipse的人可以直接使用Eclipse模版，另外IDEA还提供了Eclipse for MAC OS X和Eclipse两套快捷键，方便习惯MAC键位的人员。

```
Windows:  Files → Setting  → keymap  
Mac:  Preference  → keymap
```
另外要单独推荐的就是find action这个快捷键了，可以方便开发人员搜索IDEA的各种功能，而不需要记住快捷键。
还有代码补全依然和Eclipse一样，要修改成Alt+Slash的可以打开

```
Main Menu  → Code  → Completion  → Basic
```

### 视图
默认的两个试图显示其实不错，不过个人喜欢Sublime，这里推荐下:

1. 下载  Eclectide Monokai   主题的jar包
2. 打开 File → Import Settings → Select the jar file
3. 重启 IntelliJ

作者原文：[monokai-theme-intellij](https://darekkay.com/2014/11/23/monokai-theme-intellij/)

### 优化IDEA

都说IDEA最大的好处是没有了Eclipse的卡顿问题，但是我个人使用来看，Mac上确实比Eclipse流畅，可是在Windows上，编索引的时候占满CPU我也就忍了，可是平时也巨卡无比。经过google之后才知道，原来因为我Windows电脑没有JDK1.8，导致IDEA默认启动是idea32.exe，于是悄悄安装JDK1.8，环境变量配置 IDEA_JDK_64指向JDK1.8即可，这样就不影响开发用的JDK版本。详细可以参考： http://www.tuicool.com/articles/NBRnYn

### 插件

***Check Style***：导入Eclipse的xml即可。

***Code Formatter***：要在IDEA的Plugin Repositories里面搜索一个叫Eclipse Code Formatter的插件，但是貌似不支持IDEA 2016。

***Getter & Setter***：这个不算插件，顶多就是个模版配置，但是也写了我好久，分享给大家：

**Getter**:

```java
/**
* Getter method for property <tt>$field.name</tt>.
*
* @return property value of $field.name
*/

public ##
#if($field.modifierStatic)
static ##
#end
$field.type ##
#if ($StringUtil.startsWith($helper.getPropertyName($field, $project),"_"))
    #set($name = $StringUtil.capitalizeWithJavaBeanConvention($StringUtil.sanitizeJavaIdentifier($StringUtil.substringAfter($helper.getPropertyName($field, $project),"_"))))
#elseif ($StringUtil.startsWith($helper.getPropertyName($field, $project),"m") && $StringUtil.isCapitalized($StringUtil.substringAfter($helper.getPropertyName($field, $project),"m")))
    #set($name = $StringUtil.capitalizeWithJavaBeanConvention($StringUtil.sanitizeJavaIdentifier($StringUtil.substringAfter($helper.getPropertyName($field, $project),"m"))))
#else
    #set($name = $StringUtil.capitalizeWithJavaBeanConvention($StringUtil.sanitizeJavaIdentifier($helper.getPropertyName($field, $project))))
#end
#if ($field.boolean && $field.primitive)
#if ($StringUtil.startsWithIgnoreCase($name, 'is'))
    #set($name = $StringUtil.decapitalize($name))
#else
is##
#end
#else
get##
#end
${name}() {
return $field.name;
}
```

**Setter**:

```
#if ($StringUtil.startsWith($helper.getPropertyName($field, $project),"_"))
    #set($paramName = $StringUtil.substringAfter($helper.getParamName($field, $project),"_"))
#elseif ($StringUtil.startsWith($helper.getPropertyName($field, $project),"m") && $StringUtil.isCapitalized($StringUtil.substringAfter($helper.getPropertyName($field, $project),"m")))
    #set($paramName = $StringUtil.substringAfter($helper.getParamName($field, $project),"m"))
#else
    #set($paramName = $helper.getParamName($field, $project))
#end
/**
* Setter method for property <tt>$field.name</tt>.
*
* @param p$paramName  value to be assigned to property $field.name
*/
#if($field.modifierStatic)
static ##
#end
void set$StringUtil.capitalizeWithJavaBeanConvention($StringUtil.sanitizeJavaIdentifier($paramName))($field.type p$paramName) {
#if ($field.name == $paramName)
    #if (!$field.modifierStatic)
    this.##
    #else
        $classname.##
    #end
#end
$field.name = p$paramName;
}
```
***GIT***: 比Eclipse的git插件使用起来方便很多，但是遇到个小问题就是有时Pull代码会不起作用，老是找不到有些branch，然后使用自身的那个update project却可以了。

***Debugger***：初次配置不是Eclipse的Application，而且搜索一个叫remote的选项，配置IP和端口即可，http://yiminghe.iteye.com/blog/1027707，使用过程也发现一个奇怪问题，在方法上打断点会特别慢，而且有时还不进断点。

总之，找不到特别的理由让人使用IDEA，一切还是看个人习惯。
	
	
	