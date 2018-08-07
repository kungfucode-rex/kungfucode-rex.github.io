---
sidebarDepth: 2
---
# 查询列表页面 QueryListPage
我们对查询页面进行了封装，所有的查询列表页面都分为三部分，从上往下依次为查询表单，列表展示，分页组件，如下图：<br>
<img :src="$withBase('/images/QueryListPage.png')" alt="QueryListPage">

模板中使用查询列表页面的组件：
```html
<QueryListPage :queryForm="queryForm"
               ref="queryListPage"
               :pager-config="pagerConfig"
               :queryList="queryList">
</QueryListPage>
```

此组件有4个属性：<br>
- ref:  `必须`必须给此组件设置ref,框架会根据这个属性给此组件添加内置查询方法
- pagerConfig: `可选`此属性可覆盖全局的分页配置
- queryFrom: `必须`[查询表单的配置对象](QueryListPage.html#查询表单配置-queryform)
- queryList: `必须`[查询列表的配置对象](QueryListPage.html#查询列表配置-querylist)

页面示例代码如下：
```html
<template>
  <QueryListPage ref="queryListPage"
                 :pager-config="pagerConfig"
                 :query-form="queryForm"
                 :query-list="queryList">
  </QueryListPage>
</template>
<script>
  export default {
    data () {
      return {
        queryListPageRef: 'queryListPage',
        pagerConfig: {
          pageSize: 'backPageSize',
          pageIndex: 'backPageIndex'
        },
        queryForm: {
          queryObject: {
            account: {
              type: 'text',
              label: '用户账号'
            },
            mobile: {
              type: 'text',
              label: '手机号'
            },
            last_four_number: {
              type: 'text',
              label: '信用卡后四位',
              labelWidth: 100
            },
            birth: {
              type: 'date',
              label: '出生日期'
            },
            validDate: {
              type: 'daterange',
              fieldsName: ['validStart', 'validEnd'],
              label: '有效期'
            }
          },
          beforeQuery: this.beforeQuery
        },
        queryList: {
          title: '信用卡账户列表',
          url: '',
          actionType: 'post',
          actions: [
            {text: '新增', handler: this.add},
            {text: '授权', handler: this.grant}
          ],
          columns: [
            {title: '会员账号', key: 'account'},
            ...
          ],
          afterQuery: this.afterQuery
        }
      }
    },
    methods: {
      // 查询方法
      queryHandler (params) {
        console.log(params)
        this.queryData(0, 10, params)
      },
      // 查询前，自定义处理查询条件，返回查询需要提交的数据
      beforeQuery (params) {
        // 例，在查询条件中自定义加入searchTime
        params.searchTime = this.$moment().format('YYYY-MM-DD HH:mm:ss')
        return params
      },
      // 查询后，填充数据到表格里之前，可以处理记录数据,需要返回一个对象
      // 对象中有data[],用来填充表格，total用来告诉分页组件如何展示
      afterQuery (response) {
        return {
          data: response.data.credits,
          total: response.data.totalRecords
        }
      }
    }
  }
</script>
```
::: warning 注意
其中`queryListPageRef`是需要添加内置查询方法的组件ref
:::
页面工作流程图如下：
<img :src="$withBase('/images/QueryListPageFlow.png')" alt="QueryListPageFlow">

## hideQueryItems(隐藏查询条件)
隐藏查询条件控件
+ 类型：`Function`
+ 参数：`{Array<string>} items` 需要隐藏查询条件控件名称的数组
+ 示例: 隐藏用户名和性别两个查询条件
```js
this.$refs['queryListPage'].hideQueryItems(['userName', 'sex'])
```
<p class='warning'>在查询时隐藏的查询条件是不会传递到后台的</p>

## showQueryItems(显示查询条件)
显示查询条件控件
+ 类型：`Function`
+ 参数：`{Array<string>} items` 需要显示查询条件控件名称的数组
+ 示例: 显示用户名和性别两个查询条件
```js
this.$refs['queryListPage'].showQueryItems(['userName', 'sex'])
```

## getLastPostData(最近一次查询请求)
返回最近一次查询请求提交的数据
+ 类型：`Function`
+ 返回：`{object} postData` 最近一次查询请求提交的数据
+ 示例:
```js
this.$refs['queryListPage'].getLastPostData()
```

## exportCsv(导出查询数据)
导出查询数据
+ 类型：`Function`
+ 返回：`null`
+ 参数：`{object} opts` 导出配置
    - `{int} [chunkSize]` 分批导出时，每次请求的数据量
    - `{string} [filename]` 导出文件名，默认为表格名称
    - `{string} [dataPath]` 导出请求返回数据中，要导出的数据在response.data中的具体位置
    - `{Array<string>} [excelStrFields]` 需要在excel中已文本形式显示的字段数组
    - `{Array<string>} [dateStrFields]` 需要将毫秒时间戳转为YYYY-MM-DD的字段数组
    - `{object} [sysCodeConf]` 需要状态码转换的键值对象
    - `{Function} [callback]` 如果上述的配置仍不能满足需求，则可以自定义方法处理每一条记录
+ 示例:
```js
this.$refs['illegalQueryListPage'].exportCsv({
  chunkSize：1000，//分批导出，每 1000 条记录发一次请求，之后会自动合并成一个文件
  excelStrFields: ['orderNo', 'phone'], // 订单号和手机号要在excel里是字符串格式
  dateStrFields: ['createTime', 'payTime'], // 创建时间和支付时间是毫秒数，导出为YYYY-MM-DD HH:mm:ss
  sysCodeConf: {
    // 支付方式字段payTool和状态字段status导出时要将value转为label
    payTool: 'PayTools',
    status: 'IllegalStatus'
  },
  callback: item => {
    // 备注字段是一个数组，每条记录的第０个备注对象里有个remark字段，将其导出
    item.remarks = item.remarks[0] && item.remarks[0].remark
  }
})
```

## 查询表单配置 queryForm
查询表单(queryForm)中定义了表单的属性和样式，其中定义了以下属性：

### queryobject
查询对象
+ 类型： `{[key:string]:object}`
+ 示例： 
```js
queryobject: {
    account: {
      type: 'text',
      label: '用户账号'
    },
    mobile: {
      type: 'text',
      label: '手机号'
    },
    last_four_number: {
      type: 'text',
      label: '信用卡后四位'
    },
    birth: {
      type: 'date',
      label: '出生日期'
    },
    validDate: {
      type: 'daterange',
      fieldsName: ['validStart', 'validEnd'],
      label: '有效期'
    }
}
```
+ 详细：<br>
queryobject的内容为键值对，定义了每个查询条件，键为字段的name,值为该条件在查询表单中对应控件的属性，具体有：
    - `{string} type`:控件的类型
        - `text`
        - `date`
        - `time`
        - `datetime`
        - `daterange`
        - `timerange`
        - `datetimerange`
        - `select`
    - `{string} label`:控件前显示的名称
    - `{Any} value`:默认值
    - `{Array<string>} fieldsName`: 范围控件的起始字段名称，值为两个字符串的数组
    - `{Array<string>} fieldsValue`:范围控件的起始字段的默认值，值为两个字符串的数组
    - `{object} config`:特殊组件的配置（如：select）
        + `{string} url`: 从此地址拉取选项数据
        + `{object} responseConfig`: 拉取数据时如何解析响应数据
        + `{string} cascade`: 关联的级联下拉框名称
        + `{Array} data`: 选项数据

### tabFilter
表单标签过滤器, 用来快速筛选数据
+ `{string} field` 过滤时往后台传递的参数名
+ `{string} value` 过滤时往后台传递的参数值
+ `{Array} items` 过滤项
    * `{string} label` 过滤项的名称
    * `{string} value` 过滤项的值
    * `{object} file` 点击该tab需要加载的列表页面文件
+ 示例:
```js
import WaitRentList from './OnlineList'
import OfflineList from './OfflineList'
import WaitRentList from './WaitRentList'
import RentedList from './RentedList'
...
tabFilter: {
            field: 'status',
            value: 'on',
            items: [
              {label: '已上架', value: 'on', file: OnlineList},
              {label: '已下架', value: 'off', file: OfflineList},
              {label: '待租出', value: 'wait', file: WaitRentList},
              {label: '已租出', value: 'working', file: RentedList}
            ]
          }
```
<img :src="$withBase('/images/tabFilter.png')" alt="tabFilter">

### beforeQuery
在开始查询前有一次机会可以对已经封装好的表单数据进行一次处理，如果不需要处理，`beforeQuery`属性可以不写。
+ 类型： `Function`
+ 参数： `{object} data` 自动处理后的表单数据对象
+ 返回值：`{object | false}` 经过自定义处理要交付到查询方法的数据对象, 如果返回false, 则终止此次查询

### beforeChangeQueryTab
从点击过滤器标签到发送查询请求这段时间内，我们会调用这个钩子函数，如最常用的功能：点击标签后要修改相应的查询表单控件等等。如果不需要处理，`beforeChangeQueryTab`属性可以不写。
+ 类型： `Function`
+ 参数： `{string} value` tab标签所对应的查询字段的值
  
### show
是否显示查询表单, 默认为显示
+ 类型： `Bollean` 设置为`false`可隐藏查询表单


## 查询列表配置 queryList

### title
查询列表的标题
+ 类型： `string`

### actions
表格右上方的操作按钮
+ 类型：`Array`
+ 详细：每个按钮有两个属性
    * `{string} text` 按钮上的文本
    * `{Function} handler` 按钮的处理事件
+ 用法：
```js
actions: [
    {text: '新增', handler: this.add},
    {text: '授权', handler: this.grant}
  ]
```

### columns
表格列配置属性
+ 类型：`Array`
+ 详细：表格控件是基于iview封装的，columns配置请参考官方文档：[iview的表格文档](https://www.iviewui.com/components/table)
+ 注:操作按钮一列的写法请参考[全局约定](GlobalAppoint.html)

### data
表格数据源
+ 类型：`Array`
+ 详细：data中存放的是本页的数据
+ 用法：一般我们在页面加载完毕，在生命周期的 created() 中会发请求去加载第一页的数据

### total
数据的总记录数
+ 类型：`number`
+ 用法：一般我们在查询数据之后需为此变量赋值

### height
表格的高度，如果不定义，表格会默认沾满页面剩余部分
+ 类型：`Number`

### url
获取数据的url
+ 类型：`string`

### exportUrl
导出数据的url
+ 类型：`string`

### actionType
请求类型, 默认是`get`
+ 类型：`string`

### afterQuery
在结果查出来还没有填到表格里这段时间，我们可以对结果记录进行处理，比如：**预先选中**(设置记录的`_checked`属性)、**禁止选择**(设置记录的`_disabled`属性)等等，处理后返回一个有data和total属性的对象即可，如果response返回的结果集中数据变量是data，总数是total的也可以不指定此函数，框架会自动处理
+ 类型： `Function`
+ 参数： 
  * `response`[`object`] 服务端返回的response
+ 返回值：
  * `{object}` 
    - `data`[`Array`]:用来填充表格
    - `total`[`Number`]:用来告诉分页组件如何展示
+ 示例：
```js
afterQuery (response) {
    ...
    return {
      data: response.data.credits,
      total: response.data.total
    }
  }
```

### selectable
是否启用选择
+ 类型：`Boolean`

### selection
表格已选中的数组,如要获取表格已经选中的行数据，可直接使用`this.queryList.selection`
+ 类型：`Array`

### onSelect
在启用选择前提下，当在表格中选中一行时触发此函数
+ 类型： `Function`
+ 参数： 
  * `selection` 表格所有已选中的数据
  * `{object} row` 当前选中行的数据
  
### onSelectAll
在启用选择前提下，当在表格中全选时触发此函数
+ 类型： `Function`
+ 参数： 
  * `{Array} selection` 表格所有已选中的数据

### onSelectChange
在启用选择前提下，当表格中选中部分有变化时触发此函数
+ 类型： `Function`
+ 参数： 
  * `{Array} selection` 表格所有已选中的数据
  
### reload
刷新表格数据，如删除数据后重新加载表格数据内容
+ 类型： `Function`
+ 示例： 
```js
    this.queryList.reload()
```

## 批量删除示例
1. 启用选择`selectable: true`
2. 勾选需要批量处理的记录
3. 获取并删除已选中的记录请使用：`this.queryList.selection`
```html
<template>
  <div style="height: 100%;">
    <QueryListPage ref="queryListPage"
                   :query-form="queryForm"
                   :query-list="queryList">
    </QueryListPage>
  </div>
</template>
```
```js
<script>
  export default {
    data () {
      return {
        queryListPageRef: 'queryListPage',
        queryForm: {
          queryObject: {
            account: {
              type: 'text',
              label: '用户账号',
              value: 'hello'
            },
            ...
        },
        queryList: {
          title: '信用卡账户列表',
          url: '...',
          selectable: true,
          actions: [
            {text: '批量删除', handler: this.batchDel}
          ],
          columns: [
            {title: '会员账号', key: 'account'},
            {title: '姓名', key: 'username'},
            ...
          ]
        }
      }
    },
    methods: {
      batchDel () {
        console.log('删除以下数据')
        console.log(this.queryList.selection)
      }
    }
  }
</script>
```

## Tab列表页面示例
1. 配置`tabFilter`
2. 编写对应的tab页面<br/>
List.vue
```html
<template>
  <div style="height: 100%;">
    <QueryListPage ref="queryListPage"
                   :query-form="queryForm"
                   :query-list="queryList">
    </QueryListPage>
  </div>
</template>
```
```js
<script>
  import TabA from './TabA'
  import TabB from './TabB'

  export default {
    data () {
      return {
        queryListPageRef: 'queryListPage',
        queryForm: {
          queryObject: {
            ...
          },
          tabFilter: {
            field: 'status',
            value: 'on',
            items: [
              {label: 'A列表', value: 'on', file: TabA)},
              {label: 'B列表', value: 'off', file: TabB)}
            ]
          }
        },
        queryList: {
          title: '信用卡账户列表',
          url: '...',
          selectable: true,
          actions: [
            {text: '批量删除', handler: this.batchDel}
          ],
          columns: [
            {title: '会员账号', key: 'account'},
            {title: '姓名', key: 'username'},
            ...
          ]
        }
      }
    },
    methods: {
      batchDel () {
        console.log('删除以下数据')
        console.log(this.queryList.selection)
      }
    }
  }
</script>
```
TabA.vue
```html
<template>
  <div class="query-list-wrapper">
      <QueryList
        :columns="column"
        :queryList="queryList"></QueryList>
  </div>
</template>
```
```js
<script>
  export default {
    props: {
      queryList: {
        type: Object,
        require: true
      }
    },
    data () {
      return {
        columns: [
          ...
        ]
      }
    }
  }
</script>
```
::: warning 注
`TabA.vue`中的`<QueryList>`组件是全局的，属性`queryList`是框架从`listPage.vue`传递过来的，这个页面上只需要自己提供一个表格的columns数组即可
:::