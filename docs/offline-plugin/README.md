# Offline-plugin 中文文档
这个`webpack`插件是目前支持`PWA`最火的插件，官方没有中文版的文档，着实让人难以上手，于是就有了这篇简陋的中文版

## 安装（Install）
```bash
npm install offline-plugin [--save-dev]
```
## 启动（Setup）
首先，在`webpack.config`中实例化插件：
```js
// webpack.config.js example

var OfflinePlugin = require('offline-plugin');

module.exports = {
  // ...

  plugins: [
    // ... other plugins
    // it's always better if OfflinePlugin is the last plugin added
    new OfflinePlugin()
  ]
  // ...
}
```
然后在你的入口文件里调用`install()`方法:
```js
require('offline-plugin/runtime').install();
```
或者在`ES6/Babel/TypeScript`中：
```js
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
OfflinePluginRuntime.install();
```
## 更新流程（Update process）
用户每次导航到你的网站时，浏览器都会去 fetch `ServiceWorker` 文件。如果新的 `ServiceWorker` 被发现，浏览器会立即运行它，和当前的 SW 一起。这一次新的 SW 只会有 `install` 事件，以允许他为新版本的的 SW 准备缓存资源。新的 SW 不会控制你的网页，除非你把所有是你网站的浏览器　tab　标签全部关闭，这是 `ServiceWorker` 设计的。

AppCache 的更新机制稍微简单一点：每次导航到你的网站，浏览器都会下载 `manifest.appcache`，如果有新的 `AppCache`, 浏览器会安装新的 `AppCache`，删除掉之前旧的版本。这就意味着，下次刷新时，浏览器会从新的 `AppCache` 加载文件。

有时候，`AppCache` 是​​混淆的根源 - 人们可能会期望SW具有与AppCache相同的更新过程。另一个让人困惑的可能是 `Cmd/Ctrl + R` 组合键了。一种错误的想法认为它强制刷新了浏览器而且激活了 SW，其实他不会更新或者从新的 SW 载入，它只是告诉浏览器绕过当前的控制中的 `ServiceWorker`。

如果你仅有一个 tab 标签打开着你的网站，下面的步骤可以更新 SW:
1. `Refresh` 刷新页面(浏览器会下载新的 SW )
2. `Ctrl/Cmd+Refresh` 强制刷新页面（浏览器绕过 SW），现在，当前的 SW 没有控制任何页面，所以它将会被抛弃，新的 SW 会被激活。
3. `Refresh` 刷新页面（新的 SW 已经就位控制着页面）
它就是这样工作的，当然，有一种办法在你想更新 SW/AppCache 时就可以更新，毕竟你是开发者:-)

### 配置
告诉 `OfflinePlugin` 为 `ServiceWorker` 生成事件:
```js
new OfflinePlugin({
	ServiceWorker: {
		events: true
	}
})
```
告诉 `offline-plugin/runtime` 使用生命周期事件并且立即应用任何更新：
```js
const runtime = require('offline-plugin/runtime')
runtime.install({
	onUpdating: () => {
		console.log('SW Event: ', 'onUpdating');
	},
	onUpdateReady: () => {
		console.log('SW Event:', 'onUpdateReady');
		runtime.applyUpdate();
	},
	onUpdated: () => {
		console.log('SW Event:', 'onUpdated');
		window.location.reload();
	},
	onUpdateFailed: () => {
		console.log('SW Event:', 'onUpdateFailed');
	}
})
```
在 `AppCache`　中也有相似的选项：`AppCache: {events: true}`，但是我不推荐你使用它除非你真的需要。`AppCache` 的事件不稳定因为它们在不同的浏览器里面有不同的表现，而且some hacks have been applied to make it work as it does now，这些事件是不稳定的，因为他们可能会 fail to fire, or fire twice。这些原因最可能是因为 `AppCache` 是在 iframe 里面加载的,而且每个浏览器对这种情况的表现不一致（针对事件来说）。

一般来说，AppCache 事件工作是没有问题的，但不要期望他们能有防弹之类的表现，这就是他们为什么被标记为不稳定。

### 确保 `ServiceWorker` updates at all
This meant to be tested without adding any code to control SW's update process
1. 加载你的页面
2. 编译和发布你的新版本，因为一些改动，例如增加一个`alert(1)`
3. 重新加载页面
4. 关闭你的网站页面
5. 打开一个新的tab页面，加载你的网站
6. 检查你是否看到了`alert(1)`


## 运行时API（Runtime API）
  除了插件的配置外，你也要在你的入口文件初始化它。如下所示：
  ```js
  require('offline-plugin/runtime').install();
  ```
  在ES6/Babel/TypeScript中：
  ```js
  import * as OfflinePluginRuntime from 'offline-plugin/runtime'
  ```
更多`TypeScript`的用法，参见[这里](https://github.com/NekR/offline-plugin/blob/21418ea8730151ccfd8f8132a78aa619d1ea1225/docs/typescript.md)

### 方法
运行时有以下方法：
+ `install({Object} options)`
开始`ServiceWorker/AppCache`的安装流程，它是安全的而且必须在你每次加载页面时都要调用。
<p class="warning">注：不要将它放在任何的条件语句里面</p> 
+ `applyUpdate()`
使用存在的installation应用更新，查看下面的`install`选项
+ `update()`
对新的`ServiceWork/AppCache`执行检查更新
+ `install()`
运行时`install`方法提供一个选项参数`options`对象。下面是`options`里面的具体配置项(目前，只有事件 Events，没有其它任何配置属性)：
  + Events:
  <p class="warning">Note: To use events, they must be explicitly enabled for each tool (ServiceWorker/AppCache) in their options</p>
    + `onInstalled`<br/>
      当`ServiceWorker/AppCache`安装后只会被调用一次，一般我们用来显示`App is ready for offline usage`消息。
    + `onUpdating`<br/>
      当浏览器发现有更新并开始更新流程时触发此事件，这时部分资源正在被下载。
    + `onUpdateReady`<br/>
      当`onUpdating`阶段完成后会触发次事件，此时所有的资源已经下载完毕，随时准备更新。调用`runtime.applyUpdate()`来触发更新
    + `onUpdateFailed`<br/>
      在`onUpdating`期间由一些原因失败了会触发此事件，此时没有下载到任何资源而且当前的更新流程会被取消或者被忽略。
    + `onUpdated`<br/>
      当新的更新被成功应用，或者有`runtime.applyUpdate()`调用，或者浏览器自己的其它方式都会触发此事件。

## 配置选项（Configuration）
所有的选项都是可选的，不指定任何参数都可以，默认的选项也可以查看[这里](https://github.com/NekR/offline-plugin/blob/21418ea8730151ccfd8f8132a78aa619d1ea1225/src/default-options.js)
### `appShell`
默认值：`null`，例：`/index.html`<br/>
当我们制作一个单页面应用时，我们一般会为其使用 [AppShell](https://medium.com/google-developers/instant-loading-web-apps-with-an-application-shell-architecture-7c0c2f10c73) 模型。<br/>
为了让`offline-plugin`重定向所有未知请求到一个指定缓存，指定一个`appShell`选项，例：`appShell: '/'`
#### SSR
????当使用服务端渲染和`AppShell`模型时，确保你不会缓存任何服务端渲染的数据。最简单的方式是做一个路由专门服务HTML文件，它里面没有任何服务端渲染的数据，将这个路由缓存，例如：`appShell: '/app-shell.html'`
#### 高级
如上，为了获取相同的功能，必须使用`ServiceWorker.navigateFallbackURL`和`AppCache.FALLBACK`选项。`ServiceWorker.navigateFallbackURL`现在已经丢弃了，不应该再使用了。应该用`appShell`来代替。<br/>
`appShell` is baked by `ServiceWorker` 的 `cacheMaps` 和 `AppCache` 的 `AppCache.FALLBACK`。
### `caches`
#### 定义
##### `caches: 'all' | Object`
用来告诉插件缓存什么，如何缓存，默认是`'all'`
+ `all`:　所有`webpack`打包的资源，和`externals`配置里面的 urls 列表都将在 install 时被缓存起来
+ `Object`: 指定3个缓存资源的数组 `Array<string | RegExp>`:  `main`, `additional`, `optional`, 这3个属性都是可选的，默认值都是空

#### 高级用法
使用一个`Object`来手动的指定`caches`的配置，以说明如何来缓存资源
<p class='tip'>示例：</p> 

```js
caches: {
  main: [':rest:'],
  additional: [':externals:'],
  optional: ['*.chunk.js']
}
```
在这个例子中，以`.chunk.js`结尾的资源会被添加到`optional`缓存里。<br/>
外部的资源会被添加到`additional`缓存里，剩下的资源会被添加到`main`缓存里。<br/>
使用关键字`:rest:`来匹配所有没有使用/没有缓存的资源。<br/>
要匹配多个资源或者动态名称的资源，可以使用正则匹配。<br/>
添加外部资源（非webpack编译的资源），把他们列在`externals`配置里面并且使用关键字`:externals:`放到`caches`里面。<br/>
如果你不想把所有的`externals`放到同一个部分里，你可以手动列出他们（e.g. `additional: ['/external.js']`）来代替使用`:externals:`关键字。<br/>

#### 缓存部分
+ `main`: 在这部分列出来的资源会首先被缓存（在`ServiceWorker`的`install`事件里），如果这部分缓存失败，所有的资源都不会缓存。所以,他应该包含最重要的资源集合（如：[`index.html`, `main.js`]），没有他们，你的网站将无法工作。
+ `additional`:　默认情况下仅在`ServiceWorker`中启用。这部分资源在`main`部分缓存成功后加载（在`ServiceWorker`的`active`事件里），如果这部分资源下载失败，则`additional`部分的所有资源都不会缓存，都会移动到`optional`部分去。如果当前的策略是`changed`，只有下载失败的资源会移动到`optional`部分，其它的都成功缓存。
+ `optional`:　默认情况下仅在`ServiceWorker`中启用。这部分资源只有当他们从服务器下载过来的时候进行缓存。`ServiceWorker`不会在这之前去下载他们。
<p class="warning">注：AppCache不支持按条件或延迟加载资源，而且它默认会忽略`additional`和`optional`部分的资源。要让AppCache缓存所有的部分，可以如下设置：</p> 
```js
AppCache: {
  caches: ['main', 'additional', 'optional']
}
```

### `publicPath`
类似于`webpack`的`output.publicPath`配置。对于指定或覆盖`publicPath`选项是很有用的。当不指定时，`webpack`的`output.publicPath`将被使用。当`output.publicPath`也没有指定时，相对路径将被使用（查看`relativePaths`选项）
> 示例
```js
publicPath: '/project/'
publicPath: 'https://example.com/project'
```

### `responseStrategy`
相应策略，首先使用缓存还是网络来响应。有两种策略可选：
+ `'cache-first'`: 所有的请求先访问缓存，若缓存获取失败，再尝试网络获取
+ `'network-first'`:　所有的请求先访问网络，若网络获取失败，再尝试缓存获取

> 默认值：`'cache-first'`

### `updateStrategy`
缓存的更新策略，默认值：`'changed'`，有两种策略可选：
+ `'all'`: 该策略将`version`传给`options`作为缓存的标签。当版本号更新时旧版本的缓存已移除，新版本的文件将会已下载。当然如果文件名一样没有改变（HTTP 304），浏览器可能不会去下载他们而是仅仅更新一下缓存。
+ `'changed'`: 这个策略比`all`先进，`offline-plugin`会计算文件本身的哈希码，而不是用`webpack`的哈希码。尽管文件名变了，但如果哈希码一致，它将不会再次下载文件，而是仅仅修改一下文件名。启用了这个策略，`index.html`(或者其它没有动态名称的文件)应该放置在`main`缓存模块，否则他们将不会被重新验证。
  + 对`ServiceWorker`来说，它意味着只有新的或改变的文件将会被下载，从缓存中删除的文件将丢失
  + `AppCache`不支持该`changed`，会将其或略仍使用`all`

<p class='warning'>请不要改这个选项，除非你知道你在干什么</p> 

### `externals`
指定需要缓存的非编译资源的url数组
> 默认值：`null`<br/>
示例：['/static/file-on-the-server.json', 'https://fonts.googleapis.com/css?family=Roboto']

### `excludes`
需要排除已经添加到缓存中的资源的`url`或`pattern`，排除发生在`rewrite`之前
> 默认值：['**/.*', '**/*.map', '**/*.gz']<br/>
排除所有的以点开头或以`.map`,`.gz`结尾的文件

### `relativePaths`
当设置为true时，所有在缓存中生成的资源路径将会分别关联到`ServiceWorker`的文件或`AppCache`的文件夹地址。<br/>
当`publicPath`设置了的时候，这个选项将会忽略掉。<br/>
当`explicitly`设置为`true`的时候，`publicPath`选项将会被忽略。
> 默认值：`true`

### `version`
缓存的版本号，可以是一个函数`(plugin: OfflinePlugin) => void`, 当你在监控模式下需要应用动态值的时候他是非常有用的。
+ `function` 被调用时，第一个参数是插件实例
+ `string` 可以使用插值`[hash]`语法

> 默认值：当前日期

### `rewrites`
提供了一种重写服务器上文件的最终表示的方法。当资源在客户端角度以不同方式提供时非常有用，例如：`/index.html`可以替代`/`。此选项的值可以是函数或一个对象。<br/>
这个函数可以遍历插件生成的`service worker`文件中的`assets`，和`externals`数组。这会帮助开发者在多种场景下修改资源，比如多个cdn域等等。
> 示例：<br/>
```js
rewrites: function (asset) {
  if(asset.endsWith('html')) {
    return 'https://www.qq.com/' + asset;
  } else {
    return 'https://s1.url.cn/' + asset;
  }
}
```

### `cacheMaps`
这个配置允许重定向一个请求到缓存或到另一个请求。想象一下你正在使用`App-Shell pattern`开发你的网站，而且你缓存你的 app-shell 为首页`/`。现在当用户访问`/something-else`，我们需要从缓存里给他们提供相同的 app-shell，我可以很容易的使用`cacheMaps`如下实现：
```js
new OfflinePlugin({
  cacheMaps: [
    {
      match: function (requestUrl) {
       return new URL('/', location);
      },
      requestTypes: ['navigate']
    }
  ]
})
```
可用的属性配置如下：
+ `{string|RegExp|function} match`:  匹配一个url将其映射到缓存。如果值为函数，则此函数的声明如下：<br/>
  `Object<URL> function(Object<URL>, Object<Request>)`
+ `{string|function} to`: 如果`match`不是函数才使用此属性，每个URL会匹配`urlString.replace(map.match, map.to)`，所以，`to`选项是`String#replace`函数的第二个参数。
+ `{Array} reqestTypes`: 改map会使用的一个请求的类型数组。可以是这三个值的任意组合，例：`requestTypes: ['navigate', 'same-origin']`：
  + `'navigate'`
  + `'same-origin'`
  + `'cross-origin'`<br/>

### `autoUpdate`
启用自动更新`ServiceWorker`或`AppCache`。如果设置为`true`，它会使用默认的间隔1小时。数值的话则会提供一个自定义的更新间隔时长。
<p class='warning'>注：如果有多个打开的tab标签正在使用你的网站，那更新可能会更频繁，因为每个tab页都会使用这个间隔时间来更新。</p> 
> 默认值：`false`<br/>
示例：`true`<br/>
示例：`1000 * 60 * 60 * 5`(5小时)


### `ServiceWorker` 
`ServiceWorker`的缓存配置。使用`null`或`false`可禁用`ServiceWorker`生成。
#### {string} output
Relative (from the webpack's config output.path) output path for emitted script.默认值为：`'sw.js'`
#### {string} entry
`ServiceWorker`入口或启动文件的相对或绝对路劲的地址。
#### {string} scope
Reflects ServiceWorker.register's scope option.默认值为:`null`
#### {string} cacheName
这个选项非常危险，这个选项不应该被更改在你部署`ServiceWorker`到线上产品之后。改变它可能会中断缓存而且遗留旧版本的缓存在你的设备上。
这个选项当你在一个与上面运行好几个项目时非常有用。
> 默认值：`''` <br/>
示例：`my-project`

#### {boolean} events
启用`ServiceWorker`的运行时事件。默认为`false`

#### {string} publicPath
重写`ServiceWorker`的脚本文件在服务器上的地址。应该是一个精确的文件路径。
> 默认值：`null` <br/>
示例：`'/my/new/path/sw.js'`

#### {boolean | Object | ':auto:'} navigationPreload
`Navigation preload`是一个`ServiceWorker`的特性，它提供一种方式可以让请求先于`ServiceWorker`或页面初始化前就开始。这对于获取数据，提升应用程序的加载速度非常有用。
##### 用法
在插件里，导航预加载对于`cache-first`和`network-first`两种响应策略的表现不一致。<br/>
1. 对于`network-first`，导航预加载默认启用并且允许提前获取导航页面，即使在`ServiceWorker`初始化完成之前。 可以设置`ServiceWorker.navigationPreload`为`false`来禁用它。<br/>
2. 对于`cache-first`，导航预加载必须手动启用而且要在服务端处理。启用导航预加载必须指定下面两个方法：
```js
ServiceWorker: {
      navigationPreload: {
        map: (url) => {
          if (url.pathname === '/') {
            return '/api/feed';
          }
          var post = url.pathname.match(/^\/post\/(\d+)$/);
          if (post) {
            return '/api/post/' + post[1];
          }
        },
        test: (url) => {
          if (url.pathname.indexOf('/api/') === 0) {
            return true;
          }
        }
      }
}
```
  + `map` 映射导航预加载请求到别的请求
  + `test` 用于测试导航预载映射的可能消费者

上述例子中`map`方法将导航预加载请求`/`映射到`/api/feed`。然后当请求`/api/feed`时，`test`方法用来决定这个请求是否可以被导航预加载处理（如果请求的`pathname`以`/api/`开头）
##### 服务端
当导航预加载请求发生时，请求头包含`Service-Worker-Navigation-Preload: true`。服务端应该使用这个请求头检测预加载，并且发送不同的内容给这个请求。
> 示例（在Express.js中）：
```js
function serveIndex (req, res) {
  if (req.headers['service-worker-navigation-preload']) {
    res.set({
      'Cache-Control': 'no-cache',
      'Vary': 'Service-Worker-Navigation-Preload'
    })
    fetchFeeData(req).then(data => {
      res.send(data)
    })
  }
  res.sendFile (path.join(WWW_FOLDER, 'index.html'), {
    cacheControl: false,
    acceptRanges: false,
    header: {
      'Cache-Control': 'no-cache',
      'Vary': 'Service-Worker-Navigation-Preload'
    }
  })
}
```

如果你计划去缓存那些响应，请确保在header里设置了`'Vary':'Service-Worker-Navigation-Preload`。
#### {Object} prefetchRequest
为预加载请求（在`install`事件里的预缓存请求）提供一个配置对象，允许的配置项有`credentials`,`headers`,`mode`,`cache`
> 默认值：`{credentials: 'omit', mode: 'cors'}`<br/>
示例：`{credentials: 'include'}`

#### {boolean} minify
如果设置成`true`或`false`，会决定`ServiceWorker`的输出是否会被压缩。如果设置了其它的值，输出的压缩与否是由你的`webpack`配置有没有使用`webpack.optimize.UglifyJsPlugin`选项。
> 默认值：`null`

### AppCache
`AppCache`的设置，使用`null`或`false`来禁止`AppCache`的生成。
<p class='warning'>官方声明已不建议使用AppCache，取而代之的是ServiceWorker，然而、`ServiceWorker`才正在被各大浏览器厂商实现（你可以点[这里](https://jakearchibald.github.io/isserviceworkerready/)了解实现的进度），所以`AppCache`不会立即就被替代掉。所以当你需要在不支持`ServiceWorker`的浏览器上实现离线功能的时候，你就去使用`AppCache`吧，如何选择完全取决你自己。</p> 
#### {string} directory
`AppCache`的相对（`webpack`的`output.path`）路劲
> 默认值：`'appcache/'`

#### {string} NETWORK
映射`AppCache`的`NETWORK`部分
> 默认值：`*`

#### {Object} FALLBACK
映射`AppCache`的`FALLBACK`部分, 对单页面使用HTML5的路由来显示自定义离线网页的应用程序来说是很有用的。
> 默认值：`null`<br/>
示例１：`{'/blog': '/'}`失败时所有以/blog开头的请求将会匹配到domain roboto<br/>
示例２：`{'/': '/offline-page.html'}`对于所有的请求将返回`/offline-page.html`的内容。<br/>

#### {boolean} events
是否启用AppCache的运行时事件。
> 默认值：`false`

#### {string} publicPath
提供一个重写服务端返回的`AppCache`文件夹的地址。应该是一个生成`AppCache`文件目录的精确字符串。
> 默认值：`null`<br/>
示例：`'my/new/path/appache'`

#### {boolean} disableInstall
在调用`runtime.install()`时禁用`AppCache`的动态安装
> 默认值：`false`

#### {boolean} includeCrossOrigin
在AppCache的manifest文件中输出跨域的urls，在使用HTTPS时，AppCache不支持跨域请求。
> 默认值：`false`


## 常见问答（FAQ）
1. 输出的ServiceWorker可以压缩处理吗？<br/>
是的，该插件可完美的配合官方的`webpack.optimize.UglifyJsPlugin`一起使用，所以生成的`ServiceWorker`文件也是压缩的(默认不需要任何配置)
2. 有没有方法可以匹配动态的文件名，比如哈希码或版本号？<br/>
是的，他可以正则匹配，使用了[minimatch](https://www.npmjs.com/package/minimatch)库
> 示例：`main: ['index.html', 'scripts/main.*.js']`

3. 有没有方法可以阻止或禁用控制台输出？<br/>
可以的，该插件是检测`webpack`的配置决定是否log。
> 示例：
```js
new webpack.optimize.UglifyPlugin({
     compress: {
       drop_console: true
     }
})
```
4. 为什么使用`{mode: 'no-cors'}`时会返回一个错误？<br/>
This is because the opaque request made doesn't give us access to the returned response code. We are therefore unable to determine the asset is valid. In this situation we avoid caching potential erroneous requests. Please ensure anything to be cached responds with valid CORS headers.

5. 我怎么样通知用户一个新的版本可以使用？<br/>
在运行时的`install`方法里，你可以通过配置一个事件钩子函数`onUpdateReady`，在所有资源下载完毕而且准备好更新的时候这个事件被触发。在这个回调函数里，你可以使用`runtime.applyUpdate()`方法直接更新，或者弹出信息让用户决定是否更新。
> 示例：
```js
onUpdateReady: function () {
     OfflinePlugin.applyUpdate()
}
```

## Troubleshooting
+ SW没有更新：请确保`sw.js`没有被服务端缓存而且不是动态文件名。
+ `AppCache`替代了`ServiceWorker`：请确保你使用的是`HTTPS`或者`localhost`
+ 我没有在浏览器里看到任何变更：请确保浏览器缓存了最新的资源，参考更新流程。
+ `ServiceWorker`不自动更新：自动更新不是默认的配置，你必须调用更新方法。
+ 所有的路由资源没有被缓存：默认只缓存`webpack`构建的所有资源，其它的资源可以指定在`external`中以延迟缓存
+ 一些页面资源没有被缓存：参考`ServiceWorker.scope`选项
+ 在一个域里`ServerWorker`被其它的应用给覆盖掉了：指定一个唯一的`ServiceWorker.cacheName`避免被覆盖
+ `cookies`没有被包含在`ServiceWorker`的`pre-fetch`请求中：请确保你正确使用了`prefetchRequest.credentials`以允许`cookie`
+ `ServiceWorker`错误的缓存了api数据：有多种方式可以修复这个问题就看你怎么配置了，一种方式可以设置`cacheMaps.requestTypes: ['navigate']`，仅缓存那些请求
+ CDN上的资源没有被缓存：可以缓存CDN上的资源，你再检查一下











