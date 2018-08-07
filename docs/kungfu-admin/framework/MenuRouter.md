# 菜单路由
为了简化使用，我们路由基于vue-router，将其进行了简单的封装：
## 原理
框架将遍历`src/pages/`下面的所有文件夹和文件，将给所有的Vue文件生成一个路由配置，例如文件`BindList`：<br>
![](menuAndRouter/BindListRoute.png)<br>
生成的路由如下：<br>
```js
{
    name: 'oss_creditcard_bind_BindList',
    path: '/oss/creditcard/bind/BindList',
    component: require('pages/oss/creditcard/bind/BindList')
}
```
三个属性都是通过文件的路劲拼出来的：<br>
其中：
+ `path`可以自定义重写，例：如果当前文件夹下有配置文件`router.json`
```json
{
    "BindList": "/credit/list"
}
```
则生成的路由如下：
```js
{
    name: 'oss_creditcard_bind_BindList',
    path: '/credit/list',
    component: require('pages/oss/creditcard/bind/BindList')
}
```


<!-- ####自定义配置路由。
一些复杂的路由用户可以自定义去配置，配置文件在`src/router/customRoutes.js`，项目会将自动路由和自定义路由在`src/router/index.js`中合并处理, 合并时优先使用自定义配置，如果同样的路由已经自定义过，则不会在自动路由中生成 -->

## 配置

我们将菜单以Json的形式放在菜单文件中：src/vuex/modules/menuData.js，简要格式如下：
```js
export default {
  'oss': [{
    text: '优惠券管理',
    subMenus: [{
        text: '优惠券方案管理'
      }, {
        text: '优惠券发放规则管理'
      }]
    }, {
    text: '信用卡',//一级菜单的标题
    subMenus: [{
      text: '信用卡绑定',//二级菜单的标题
      subMenus: [{
        name: 'oss_creditcard_bind_BindList',//叶子菜单需要跳转的路由名称
        text: '信用卡绑定列表'//三级菜单的标题
      }, {
        link: 'http://www.baidu.com',//叶子菜单需要跳转的链接地址
        text: '信用卡绑定列表'//三级菜单的标题
      }
    }
```

## 跳转
一般在后台管理系统中，我们跳转页面只会去当前菜单下去跳转，比如从列表页面跳到新增页面。所以我们封装了一个全局的跳转方法`this.$load`：

### this.$load:
框架封装的全局页面跳转函数
+ 参数：
    * `page`: 需要跳转到的目标页面文件名
    * `params`: 需要传递到目标页面的参数
+ 示例：<br>
文件结构：<br>
<img :src="$withBase('/images/LoadPage.png')" alt="LoadPage">

BindList.vue:
```js
    ...
    methods: {
      toAddPage () {
        // 跳转新增页面
        this.$load('CreditAdd')
      },
    ...
```
这样，在`$load()`中传入要跳转到的页面文件名(去掉后缀)，就跳转到CreditAdd页面了。
::: warning 注
这里的CreaditAdd.vue文件不用在路由中配置，新建文件之后重启服务器框架可自动完成配置。
:::