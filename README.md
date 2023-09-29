# 大事件项目

## 技术栈：

HTML+CSS+Jquery +echarts+ layui + Ajax +cropper+art-template+tinymce插件

## 接口文档：

[点击进入接口文档](https://apifox.com/apidoc/shared-fa9274ac-362e-4905-806b-6135df6aa90e/doc-842135)

## 一、项目准备工作

1.初始化项目结构

2.使用GitHub管理大事件的项目

3.安装VSCode的Liver Server插件

## 1.layui

​	  Layui 是一套免费的开源 Web UI 组件库，采用自身轻量级模块化规范，遵循原生态的 HTML/CSS/JavaScript 开发模式，极易上手，拿来即用。其风格简约轻盈，而内在雅致丰盈，甚至包括文档在内的每一处细节都经过精心雕琢，非常适合网页界面的快速构建。Layui 区别于一众主流的前端框架，却并非逆道而行，而是信奉返璞归真之道。确切地说，它更多是面向于追求简单的务实主义者，即无需涉足各类构建工具，只需面向浏览器本身，便可将页面所需呈现的元素与交互信手拈来。

## 2.jQuery

 	 jQuery是JavaScript的一个工具库，工具库就是指封装好的JavaScript函数，可以直接在程序中进行调用，那jQuery就是一款非常流行的JavaScript库。jQuery设计的宗旨是“写更少的代码，做更多的事情”。jQuery库封装了JavaScript常用的功能代码，提供一种简便的JavaScript设计模式，优化HTML文档操作、事件处理、动画设计和Ajax交互。

## 3.echarts

​		ECharts，一个纯 Javascript 的图表库，可以流畅的运行在 PC 和移动设备上，兼容当前绝大部分浏览器（IE8/9/10/11，Chrome，Firefox，Safari等），底层依赖轻量级的 Canvas 类库 ZRender，提供直观，生动，可交互，可高度个性化定制的数据可视化图表。ECharts 3 中更是加入了更多丰富的交互功能以及更多的可视化效果，并且对移动端做了深度的优化。

## 4.cropper(crooper基本用法.md)

​		cropper是一款使用简单且功能强大的图片剪裁[jQuery](https://so.csdn.net/so/search?q=jQuery&spm=1001.2101.3001.7020)插件。该图片剪裁插件支持图片放大缩小，支持鼠标滚轮操作，支持图片旋转，支持触摸屏设备，支持canvas，并且支持跨浏览器使用。

## 5.art-template

### 介绍

art-template 是一个简约、超快的模板引擎。

它采用作用域预声明的技术来优化模板渲染速度，从而获得接近 JavaScript 极限的运行性能，并且同时支持 NodeJS 和浏览器

### 特性

- 拥有接近 JavaScript 渲染极限的的性能
- 调试友好：语法、运行时错误日志精确到模板所在行；支持在模板文件上打断点（Webpack Loader）
- 支持 Express、Koa、Webpack
- 支持模板继承与子模板
- 浏览器版本仅 6KB 大小



### 模版

#### 标准语法

``` html
{{if user}}
  <h2>{{user.name}}</h2>
{{/if}}
```

#### 原始语法

```html
<% if (user) { %>
  <h2><%= user.name %></h2>
<% } %>
```

### 渲染模版

``` html
var template = require('art-template');
var html = template(__dirname + '/tpl-user.art', {
    user: {
        name: 'aui'
    }
});
```

### 核心方法

``` html
// 基于模板名渲染模板
template(filename, data);

// 将模板源代码编译成函数
template.compile(source, options);

// 将模板源代码编译成函数并立刻执行
template.render(source, data, options);
```





