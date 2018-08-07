# 版本更新与离线访问

+ 每次项目发版升级之后都会自动检测到新版本，并自动完成升级准备
+ 离线访问使用的是`ServiceWorker`，对比现有的离线插件之后，因为需求简单，我们没有使用第三方插件，而是自己开发了离线访问功能

## 版本更新逻辑
<img :src="$withBase('/images/version.svg ')" alt="版本更新策略">

写入测试环境版本号，build/webpack.release.conf.js：
```js
// 如果是测试环境, 则版本号为当前的日期时间，如： 2018-3-11 19:20:35
let d = new Date()
let version = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + '_' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
var fd=fs.openSync('static/version.txt','w');
fs.writeSync(fd, version)
fs.closeSync(fd)
```
写入生产环境版本号，build/webpack.prod.conf.js：
```js
const { spawnSync } = require('child_process')
// 获取 git 版本号, 并将其写入 static/version.txt
const version = spawnSync('git', ['describe']).stdout.toString().trim()
var fd=fs.openSync('static/version.txt','w');
fs.writeSync(fd, version)
fs.closeSync(fd)
```
轮询检测新的版本号，src/components/common/PageHeader.vue：
```js
    ...
    methods: {
      ...
      fetchNewVersion () {
        let self = this
        if (process.env.NODE_ENV === 'development') {
          // 是开发模式不用检查版本更新
          return
        }
        // 获取新的版本号
        this.$http.create().get('static/version.txt?_time=' 
          + new Date().getTime()).then(response => {
          if (response.status === 200) {
            let version = response.data
            // 如果浏览器支持 service-worker 而且 （主机名是localhost 或者请求协议是https）
            if ('serviceWorker' in navigator && 
              (location.hostname === 'localhost' || location.protocol === 'https:')) {
              // 获取最新的sw.js
              navigator.serviceWorker.register('/service-worker.js?v=' + version)
              .then(function (reg) {
                navigator.serviceWorker.addEventListener('message', function (e) {
                  // 这里不用立即刷新，只用于提示
                  if (e.data === 'sw.update') {
                    self.newVersion = version
                  }
                });
              }).catch(function (e) {
                console.error('service worker 注册失败:', e);
              });
            } else {
              this.newVersion = response.data
            }
          }
        })
      }
    },
    mounted () {
      // 页面挂载后5s获取新的版本号
      setTimeout(() => {
        this.fetchNewVersion()
      }, 5000)
      // 之后美分钟检查更新一次
      setInterval(() => {
        this.fetchNewVersion()
      }, 1000 * 60)
    }
    ...

```

## 离线访问
<img :src="$withBase('/images/version&offline.svg')" alt="版本更新策略">
