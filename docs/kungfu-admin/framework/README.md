# 小二租车新后台前端框架
---
## 需求背景
在传统的后台管理系统中，开发人员需要对页面进行设计、排版、样式调整，然后再拉取和推送数据，根据业务需求，自己再操作DOM，让数据正确的展现。在这个过程中：
+ 页面的设计、排版、样式调整，消耗的时间和人力特别多
+ 每个人都随意的操作DOM，一是性能得不到保障，二是界面风格和代码规范无法统一

## 设计思路
我们针对以上传统开发模式的不足，设计了一套新的方案：
+ 使用`vue`将Dom和数据分离，保证我们的页面渲染性能
+ 使用`vur-route`统一了路由的管理
+ 使用并封装了`iview`，使我们的界面风格简洁，友好，统一
+ 封装常用的组件，让开发人员专注于业务逻辑和数据的处理

## 版本依赖
+ Node版本：`^6.10.3`
+ Npm版本：`^3.10.10`
+ 框架基于`Vue2.x`
+ 发请求用的`axios`
+ 请求数据转换`qs`
+ 样式基于`iview`
+ 路由使用`vue-router`
+ 状态管理使用`vuex`
+ 地图组件使用`vue-amap`
+ 到出插件使用`json2csv`
+ 时间处理使用`momentjs`
+ 相册浏览使用`v-viewer`
+ 上传下载使用`qiniu-js`
+ 富文本使用`vue-quill-editor`
::: warning 注
qiniu-js版本为`1.0.19`,不能升级<br>
:::

具体依赖如下：

```bash
    "axios": "0.18.0",
    "crypto-js": "3.1.9-1",
    "iview": "2.13.1",
    "json2csv": "4.1.2",
    "moment": "2.22.1",
    "normalize.css": "8.0.0",
    "object-assign": "4.1.1",
    "qiniu-js": "1.0.19",
    "qs": "6.5.2",
    "v-viewer": "^1.1.0",
    "vue": "2.5.16",
    "vue-amap": "0.5.6",
    "vue-axios": "2.1.1",
    "vue-momentjs": "0.1.2",
    "vue-quill-editor": "3.0.6",
    "vue-router": "3.0.1",
    "vuex": "3.0.1"
```
## 启动项目
```js
npm run dev
```
## 访问项目
端口可以在`build/envConfig.js`里修改
```js
http://localhost:8080
```
::: warning 注
我们的登录退出使用平台统一的权限接口，项目中未设计登录登出组件<br>
:::