# 全局配置
## 分页组件配置
在给后台提交分页信息的时候，每页多少条，查询第几页或者查询偏移量的变量名可能有所区别，所以我们在文件`config/config.js`中，如下配置属性`pagerConfig`来指定我们需要给后台传递的变量：
```js
  pagerConfig: {
    pageSize: 'PageSize', // 对应后端每页数据多少的变量名
    // pageIndex: 'index', // 对应后端第几页的变量名
    pageOffset: 'offset' // 对应后端偏移量的变量名
  }
```
::: warning 注意
`pageSize`必须，`pageIndex`和`pageOffset`二选一
:::

## 7牛上传组件的配置
我们选用7牛组件进行上传, 配置文件`config/config.js`如下:
```js
qiniuConfig: {
    accessKey: 'aJLuljqMKHgQz7tPtilUqKACkCAbwGJNomfvlvv7',  // AK
    secretKey: 'pLaBKWSG_uv5Sn50IcPwpZeM3QhCltDVHtaS_Qmq',  // SK
    uptokenUrl: api_UptokenUrl,                             // 获取uptoken的url(apiConfig里的变量)
    domain: api_UpDomain,                                   // 下载文件的域名(apiConfig里的变量)
    uptoken: '',                                            // 直接上传的uptoken
    upPolicy: null                                          // 上传策略
}
```
上传凭证我们分三种, 优先级从高到底为:<br>
1. 使用`uptoken`
2. 使用`uptokenUrl`
3. 使用`accessKey`和`secretKey`<br>

::: warning 注意
上面3项三选一, `domain`为必选项, `upPolicy`为可选项
:::

## apiConfig请求配置
在文件`config/apiConfig.js`中，我们对请求链接统一进行配置，配置环境分三类：
+ 本地环境:`local`
+ 测试环境:`release`
+ 生产环境:`production`
`apiConfig`简要内容如下：

```js
module.exports = function (env) {
      // 本地环境
        let server = '/test'; // 燃油server
        let eServer = '/test'; // 新能源server
          ...
      if (env === 'production') {
        // 生产环境
        server = '';
        eServer = '';
        ...
      } else if (env === 'release') {
        // 测试环境
        server = '';
        eServer = '';
        ...
      }
      return {
        CARSLIST: JSON.stringify(server + '/smalltwo/wep/leasecarV2/searchcar.ihtml') // 车辆列表
        ...
      }
}
```
使用时，直接使用`apiConfig`中的变量名即可，例：
```js
this.$http.get(CARSLIST).then(response => {
    if (Number.parseInt(response.data.code, 10) === 200) {
      this.banks = response.data.data
    } else {
      this.$root.$emit('alert', {
        text: response.data.data
      })
    }
  }, (response) => {
    this.$root.$emit('alert', {
      text: '获取银行列表失败'
    })
  }).then(() => {
    this.ready = true
  })
```
其中请求链接`CARSLIST`就是我们在`apiConfig`中定义的变量

## constConfig常量配置
1. `SysCode`状态码配置:<br/>
    项目中的单复选框，下拉等需要键值对数组的数据都可以使用常量状态码来代替,在文件`config/constConfig.js`中，配置如下：
    ```js
    module.exports = {
          SysCode: {
            __globalConfig: {             // 字典表的全局配置
              actionType: 'get',          // 请求类型是get还是post还是...(不提供默认是get)
              responseConfig: {           // 从后台返回的数据应该怎样去解析
                data: 'data',             // 返回的数据对象的名称
                value: 'value',           // 键的名称
                label: 'label'            // 值的名称
              }
            },
            SEX: [                        // 直接是数组，不处理直接使用
              {value: 'male', label: '男'},
              {value: 'female', label: '女'}
            ],
            CAR_STATUS: '/carStatus',     // 字符串，配合__globalConfig从后台拉取数据
            CAR_STYLES: {                 // 对象，覆盖__globalConfig从后台拉取数据
              url: '/carStyles',
              params: {},                 // 发请求时往后台传递的参数
              responseConfig: {
                data: 'data',
                value: 'value',
                label: 'label'
              }
            },
            HOBBIES: function () {        // 函数，执行并使用其返回值
              return [
                {value: 'eat', label: '吃'},
                {value: 'drink', label: '喝'},
                {value: 'play', label: '玩'},
                {value: 'fun', label: '乐'}
              ]
            },
            ...
          }
    }
    ```
    填充使用：在表单控件中我们可以这样使用：
    ```js
    sex: {
        type: 'radio',
        label: '性别',
        value: 'male',
        config: {
            data: this.$SysCode.SEX
        },
        halfColumn: true
    },
    carStatus: {
        type: 'select',
        label: '车辆状态',
        config: {
            data: this.$SysCode.CAR_STATUS
        },
        halfColumn: true
    },
    carStyles: {
        type: 'select',
        label: '车型',
        config: {
            data: this.$SysCode.CAR_STYLES
        },
        halfColumn: true
    },
    ...
    ```
    转义使用：一般我们在列表的`column`中会使用到,如将性别一列转义成汉字
    ```js
      {title: '性别',
          key: 'sex',
          render: (h, params) => {
            return this._v(this.$SysCode.translate(params.row.sex, 'SEX'))
          }
      }
    ```
2. `Patterns`校验正则配置:<br/>
    同上我们在对项目中表单控件校验时，将具有共性的正则校验提取处理，可供复用，统一配置如下：
    ```js
    module.exports = {
          Patterns: {
              // 大于０，必须保留两位小数
              Money_must_with_2_decimal: /^[0-9]+(.[0-9]{2})+$/,
              // 车牌号
              CarNumber: /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/,
              // 扣分项
              PunishPoint: /^([0-9]|1[0-2])$/
          }
    }
    ```
    校验使用：
    ```js
      ...
      formRules: {
          ...
          punishPoint: [
            {
                required: true,
                pattern: this.$Patterns.PunishPoint,
                message: '格式不正确',
                trigger: 'blur'
            }
          ]
          ...
      }
      ...
    ```