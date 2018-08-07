---
sidebar: auto
---
# Axios中文文档
我们发请求用的组件是[axios](https://github.com/mzabriskie/axios),官网的文档是英文的，网上中文资料很少有比较完整的，为了方便大家能快速上手开发，我将其翻译成中文(翻译有好多不到位的地方，望好心人指正)，如下所示：

##  Axios
基于`Promise`的`HTTP`请求客户端，可同时在浏览器和node.js中使用

##  功能特性
+ 在浏览器中发送 `XMLHttpRequests` 请求
+ 在NodeJS中发送 `http` 请求
+ 支持`Promise API`
+ 支持请求和响应的拦截器
+ 转换请求和响应数据
+ 取消请求
+ 自动转成JSON格式
+ 客户端支持保护安全免受`XSRF`攻击

##  浏览器支持
+ FireFox`^54`
+ Chrome`^59`
+ IE`^7`
+ Edge`^15`
+ Safari`^9`

##  安装
使用 bower
```js
$ bower install axios
```
使用 npm
```js
$ npm install axios
```
使用 cdn
```js
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```
##  例子
发送一个`GET`请求
```js
// 发送一个请求，并提交一个用户的id
axios.get('/user?ID=2345')
    .then(function(response) {
      console.log(response)
    })
    .catch(function(error) {
      console.log(error)
    })
// 上面的代码也可以写成这样
axios.get('/user?ID=2345', {
      params: {
        ID: 2345
      }
    })
    .then(function(response) {
      console.log(response)
    })
    .catch(function(error) {
      console.log(error)
    })    
```
发送一个`POST`请求
```js
axios.post('/user', {
        firstName: 'zhang',
        lastName: 'san'
    })
    .then(function(response) {
      console.log(response)
    })
    .catch(function(error) {
      console.log(error)
    })
```
处理多个并发请求
```js
function getUserAccount() {
  return axios.get('/user/12345')
}
function getUserPermissions() {
  return axios.get('/user/12345/permissions')
}
axios.all([getUserAccount(), getUserPermissions()])
    .then(axios.spread(function (acct, perms) {
      // 此时，并发请求都完成了
    }))
```
##  axios API
可以通过给`axios`传递对应的参数来定制请求：<br>
axios(config)
```js
// 发送一个`POST`请求
axios({
    methods: 'post',
    url: '/user/2345',
    data: {
      firstName: 'Fred',
      lastName: 'Flintstone'
    }
})
// `GET`请求一个远程图片
axios({
    method: 'get',
    url: 'http://bit.ly/2mTM3nY',
    responseType: 'stream'
})
    .then(function(){
      response.data.pipe(fs.createWriteStream('imgName.jpg'))
    })
```
axios(url[,config])
```js
// 默认会发送一个`GET`请求
axios('/user/2345')
```
##  请求方法的别名
为方便起见，所有的请求都支持别名处理
+ axios.request(config)
+ axios.get(url[,config])
+ axios.delete(url[,config])
+ axios.head(url[,config])
+ axios.options(url[,config])
+ axios.post(url[,data[,config]])
+ axios.put(url[,data[,config]])
+ axios.patch(url[,data[,config]])
::: warning 注
当使用别名方法时，`url`,`method`和`data`属性都不需要在`config`中指定
:::

##  并发
可以帮忙处理并发请求的方法：
axios.all(iterable)
axios.spread(callback)
##  创建一个实例
你可以用自定义配置去创建一个`axios`的实例:
axios.create([config])
```js
var instance = axios.create({
  baseURL:'http://some-domain.com/api',
  timeout: 1000,
  headers: {'X-Custom-Header' : 'foobar'}
})
```
##  实例方法
可用的实例方法如下所列,指定的`config`会合并覆盖实例的`config`
+ axios#request(config)
+ axios#get(url[, config])
+ axios#delete(url[, config])
+ axios#head(url[, config])
+ axios#options(url[, config])
+ axios#post(url[, data[, config]])
+ axios#put(url[, data[, config]])
+ axios#patch(url[, data[, config]])

## 请求配置`config`
下面是发请求的可用配置参数,只有`url`是必须的,请求类型未指定的话,默认是`GET`类型的<br>
难点属性(`withCredentials`,`adapter`,`onUploadProgress`)
```js
{
  // url 是发往后台的请求地址,
  url: '/user',
  // 请求方法的类型
  method: 'get', // 默认为GET
  // 请求发送时,baseURL会拼接到url前面, 除非url是绝对路劲
  // baseURL简化了我们的url
  baseURL: 'https://some-domain.com/api/',
  // 在数据发送到服务端之前我们可以改变数据
  // 这个参数只适用于POST,PUT,PATCH类型的请求
  // 最后一个函数必须返回一个字符串,或Buffer或ArrayBuffer或FormData或Stream
  transformRequest: [function(data){
    // 自定义处理数据
    return data
  }],
  // 在使用响应的数据之前,对其做一些处理
  transformResponse: [function(data){
    // 自定义处理数据
    return data
  }],
  // 自定义发送到后台的header
  headers: {'X-Requested-Width': 'XMLHttpRequest'},
  // params是要和url一起发送出去的参数,必须为纯对象或者URLSearchParams object
  params: {
    ID: 2345
  },
  // 用来序列化params的可选的函数,
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function(params){
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },
  // data 作为请求的 body 一起发送
  // 适用的请求类型有PUT,POST,PATCH
  // 当transformRequest没有设置时, data 必须是以下类型之一
  // 字符串,纯对象,ArrayBuffer,ArrayBufferView, URLSearchParams
  // 浏览器环境下只能是: FormData, File, Blob
  // Node环境下只能是: Stream, Buffer
  data: {
    firstName: 'Fred'
  },
  // 指定请求超时的毫秒数,如果响应时间超过此值,则请求失败
  timeout: 1000,
  // 是否跨站点访问请求
  withCredentials: false, // 默认为false
  // 允许自定义请求, 这使得测试更加容易
  // 返回一个promise并提供一个有效的响应(参考[response docs])(#response-api)
  adapter: functtion(config) {
    /*...*/
  },
  // 表示使用HTTP基本认证,并且提供凭据
  // 这会在header里加一项`Authorization`,覆盖掉原来header选项里的`Authorization`
  auth: {
    username: 'janedoe',
    password: 's00pers3cret
  },
  // 后台返回的数据类型('arraybuffer', 'blob', 'document', 'json', 'text', 'stream')
  responseType: 'json', // 默认响应类型为JSON
  // 要用做 xsrf 令牌的值得cookie的名称
  xsrfCookieName: 'XSFR-TOKEN', // 默认值
  // 携带xsrf令牌值得http头的名称
  xsrfHeadName: 'X-XSRF-TOKEN', // 默认值
  //允许处理上传的进度事件
  onUploadProgress: function(progressEvent) {
    // 使用本地progress 事件做任何你想做的事情
  },
  //允许处理下载的进度事件
  onDownloadProgress: function(progressEvent) {
    // 使用本地progress 事件做任何你想做的事情
  },
  // 允许HTML响应数据大小的最大值
  maxContentLength: 200,
  // 通过响应的状态决定解析或者拒绝当前的Promise
  // 如果次函数返回true,或者将此属性设置为null,undefined则会处理,否则将会拒绝
  validateStatus: function(status) {
    return status >= 200 && status < 300 // 默认如此处理   
  },
  // 定义在nodejs中要遵循的重定向的最大数量
  // 如果设置为0, 则不会遵循重定向
  maxRedirect: 5 // 默认为5
  // 在nodejs中分别执行http和https请求是使用的自定义代理
  // 允许配置keepAlive的选项
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true})
  // 定义代理服务器的主机名端口
  // auth使用HTTP基本认证,并提供凭证
  // 这会在header中加一项`Proxy-Authorization`,合并覆盖原先的值
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l/'
    }
  },
  // 指定可用于取消请求的请求令牌
  cancelToken: new CancelToken(function(cancel)){
  }
}
```
## Response模板
一个请求的响应包含以下信息
```json
    // 服务端提供过来的数据
    data: {},
    // 响应的状态码
    status:200,
    // 响应的头部信息
    headers: {}
    // 发请求时提供的配置对象
    config: {},
    // 与响应相对应的请求对象
    // It is the last ClientRequest instance in node.js (in redirects)
    // and an XMLHttpRequest instance the browser
    request: {}
```
使用then方法时,你接收的response如下:
```js
axios.get('/user/2345')
    .then(function(response) {
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
    })
```
使用catch, 或者在then方法的第二个callbac参数时,the response will be available through the error object as explained in the Handling Errors section.

##  默认配置
你可以为所有的请求指定默认的配置, 比如全局`axios`的`defaults`
```js
axios.defaults.baseURL = 'https://api.example.com'
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
```
自定义实例的`defaults`
```js
// 创建实例时指定配置
var instance = axios.create({
  baseURL: 'https://api.example.com'
})
// 或者创建实例后指定配置
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN
```
## 配置优先级的顺序
配置会根据优先级顺序合并,先是lib/defaults.js, 然后是实例的defaults,最后是请求的config对象,如
```js
// 根据lib/defaults.js创建实例
// 此时库里设置的超时为0
var instance = axios.create();
// 覆盖默认配置,将超时改为2.5s
instance.defaults.timeout = 2500;
// 对于已知的长请求,发请求时再次修改为5s
instance.get('/longRequest', {
  timeout: 5000
})
```
##  拦截器
你可以拦截请求, 也可以在then,catch之前拦截响应
```js
// 增加一个请求拦截器
axios.interceptors.request.use(
    function (config) {
      // 在请求发送之前做一些事情
      return config
    },
    function (error) {
      // 请求错误时做一些事情
      return Promise.reject(error)
    }
)
// 增加一个响应拦截器
axios.interceptors.response.use(
    function (response) {
      // 在then之前做一些事情
      return response
    },
    function (error) {
      // 响应错误时做一些事情
      return Promise.reject(error)
    }
)
```
如果稍后要移除拦截器,你可以
```js
var myInterceptor = axios.interceptors.request.use(function() {})
axios.interceptors.request.eject(myInterceptor)
```
你可以给一个自定义的实例增加一个拦截器
```js
var instance = axios.create()
instance.interceptors.request.use(function() {})
```
##  错误处理
```js
axios.get('/user/2345')
    .catch(function(error) {
        if (error.response) {
          // 请求发出了,服务端返回了状态不是2xx的response
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          // 请求发出了但是没有收到响应
          // error.request在浏览器环境中是XMLHttpRequest的实例
          // error.request在NOdeJS环境中是http.ClientRequest的实例
          console.log(error.request)
        } else {
          // 在创建request的时候发生了错误
          console.log('Error', error.message)
        }
        console.log(error.config)
    })
```
你可以使用`validateStatus`定义响应的错误状态范围
```js
axios.get('/user/2345', {
  validateStatus: function(status) {
    return status < 500 // 只有在大于等于500时,reject
  }
})
```
##  取消请求
你可以使用一个cancel token来取消请求
The axios cancel token API is based on the withdrawn cancelable promises proposal.<br>
如下所示,你可以用`CancelToken.source`工厂来创建一个CancelToken
```js
var CancelToken = axios.CancelToken;
var source = CancelToken.source();
axios.get('/user/2345', {
    cancelToken: source.token
}).catch(function(thrown){
  if(axios.isCancel(thrown)) {
    console.log('Request canceld', thrown.message)
  } else {
    // 处理错误
  }
})
// 取消请求, 参数是可选的
source.cancel('Operation canceled by the user')
```
你也可以通过传递一个构造参数来创建一个cancelToken
```js
var CancelToken = axios.CancelToken;
var cancel;
axios.get('/user/2345', {
  cancelToken: new CancelToken(function executor(c) {
    // 一个执行器函数接收一个取消函数作为参数
    cancel = c
  })
})
// 取消请求
cancel()
```
::: warning 注
你可以使用一个取消令牌取消几个请求
:::
##  使用application/x-www-form-urlencoded格式
默认的,axios会序列化js对象成为JSON格式,但是如果使用了`application/x-www-form-urlencoded`,你可以使用下面的选项之一
## Browser
在浏览器中你可以使用`URLSearchParams`API,如下所示:
```js
var params = new URLSearchParams();
params.append('param1', 'value1')
params.append('param2', 'value2')
axios.post('/foo', params)
```
::: warning 注
不是所有的浏览器都支持`URLSearchParams`, 但是有一个`polyfill`可用(确保全局环境中有`polyfill`)
:::

或者你可以用`qs`库转码data:
```js
var qs = require('qs')
axios.post('/foo', qs.stringify({'bar': 123}))
```
## NodeJS
在NodeJS环境中,你可以使用`queryString`模块进行如下操作:
```js
var queryString = require('queryString')
axios.post('http://something.com', queryString.stringify({foo:'bar'}))
```
你也可以使用`qs`库
##  Semver
Until axios reaches a 1.0 release, breaking changes will be released with a new minor version. For example 0.5.1, and 0.5.4 will have the same API, but 0.6.0 will have breaking changes.
## Promises
axios需要本地支持ES6,如果本地环境不支持ES6,你可以使用polyfill
## TypeScript
axios包括TypeScript定义
```js
import axios from 'axios'
axios.get('/user?ID=2345')
```
















