---
sidebarDepth: 2
---
# 表单提交页面 FormPage
## 配置
我们对表单页面进行了封装，使用统一的组件`<FormPage></FormPage>`，为其定义了属性`formConfig`, 示例：
```html
  <FormPage :form-config="formConfig"></FormPage>
```
```js 
  ...
    data () {
      return {
        formConfig: {
          formModel:{},
          formItems:[...]
          ...
        }
      }
    }
    ...
```
它有以下子属性需配置：

### formTitle
表单的标题
+ 类型：`string`

### justFormItems
是否只显示表单的表单项，将标题和表单操作按钮隐藏掉，一般用在对话框中
+ 类型：`Boolean`
::: warning 注意：
如果将此项设置为true，表单配置项`formUrl`和提交的钩子函数`beforeSubmit`、`afterSubmit`将失效，提交操作需自己手动处理
:::

### formUrl
表单提交的url
+ 类型：`string`

### actionType
请求类型, 默认是`get`
+ 类型：`string`

### formActions
表单底部操作按钮列表
+ 类型：`Array`
+ 详细：每个按钮有4个属性
    * `{string} text` 按钮上的文本
    * `{Function} handler` 按钮的处理事件
    * `{string} type` 按钮的类型 `submit`|`cancel`|`空`
    * `{string} style` 按钮的样式类型，参考 [iview-button-type](https://www.iviewui.com/components/button)
+ 示例：
```js
actions: [
    {text: '确定', type: 'submit', style: 'primary'},
    {text: '取消', type: 'cancel'},
    {text: '其它', style: 'warning', handler: this.warning}
]
```
::: warning 注
只有确定按钮有`type:'submit'`属性，其它自定义按钮不需要`type`属性，确定按钮只能自定义按钮的文本
:::

### formRules
表单的校验规则
+ 类型：`Array`
+ 详细：底层用的是async-validator，请参考[async-validator官方文档](https://github.com/yiminghe/async-validator)，如果不喜欢英文版的，可以参考我直译过来的[async-validator直译文档](/plugins/AsyncValidator.html)
+ 异步校验：我们在`async-validator`的基础上简单封装了异步校验，
  * `{string} remote`: 远程校验需要发送的请求url
  * `{Array} [postData]`: 校验时需要传到后台的参数，数组的每一项都是formModel中的field，如果不写此属性，则默认给后台传的数据是`{field:value}`,其中`field`是当前字段，`value`是当前字段的值
  * `{string} message`: 当校验失败时，需要提示的错误信息
  * 示例如下（输入用户名时检查名称是否可用）：
```js
  // ...
  formRules: {
    username: [
        {required: true, message: '名称不能为空', trigger: 'blur'},
        {remote: '/isAvailableName', message: '名称不可用', trigger: 'blur'}
    ]
  }
  // ...
```
::: warning 注
+ 上传组件的校验规则中`type`应为`array`,因为上传组件的值是一个数组。
+ 日期组件的校验规则中`type`应为`date`
::: 

### formModel
表单数据model
+ 类型：`Object`
+ 详细：此对象用来存储表单各控件的v-model属性，通常我们初始化为空对象`{}`即可


### collapseRules
表单数据合并规则，为了对接后端springMVC的实体类封装，简化后端操作，特意增加此配置项
+ 类型：`Object`
+ 示例：我们给表单数据`formData`添加一个属性`detail`,将表单的`sex`,`birth`提取到`detail`,再给`detail`添加一个属性`info`,将表单的`city`,`bobby`,`time`提取到`info`
```js
collapseRules: {
    detail: [
      'sex',
      'birth',
      {
        info: [
          'city',
          'hobby',
          'time'
        ]
      }
    ]
}
```
最终我们的提交的表单数据将会从：
```js
{
      name:'',
      sex:'',
      birth:'',
      city: '',
      hobby: '',
      time:''
}
```
转变为：
```js
{
      name: '',
      ditail: {
            sex: '',
            birth: '',
            info: {
                  city: '',
                  hobby: '',
                  time: ''
            }
      }
}
```

### formItems
表单的各个控件
+ 类型：`Object`
+ 详细：form-items中每个属性名都对应着一个表单控件的变量名，除范围控件外，每种控件都对应着不同的type:
    * `text` [文本控件](FormWidgets.html#文本框组件)
    * `textarea` [文本域控件](FormWidgets.html#文本域组件)
    * `date|time|datetime` [日期时间控件](FormWidgets.html#日期时间组件)
    * `daterange|timeragne|datetimerange` [日期时间范围控件](FormWidgets.html#日期时间范围组件)
    * `radio` [单选控件](FormWidgets.html#单选组件)
    * `checkbox` [复选控件](FormWidgets.html#复选组件)
    * `select` [下拉控件](FormWidgets.html#下拉组件)
    * `listSelector` [列表选择控件](FormWidgets.html#列表选择组件)
+ 示例：
```js
formItems: {
      name: {
        type: 'text',
        value: 'sdf',
        label: '用户名'
      },
      birth: {
        type: 'date',
        label: '出生年月',
        halfColumn: true,
        onChange: this.changeBirth
      },
      dateTime: {
        type: 'datetime',
        value: '',
        label: '日期时间',
        halfColumn: true,
        onChange: this.changeDateTime
      },
      time: {
        type: 'time',
        value: '',
        label: '时间',
        halfColumn: true
      },
      sex: {
        type: 'radio',
        label: '性别',
        value: 'male',
        halfColumn: true,
        config: {
          data: [
            {value: 'male', label: '男'},
            {value: 'female', label: '女'}
          ]
        }
      },
      hobby: {
        type: 'checkbox',
        label: '爱好',
        value: ['eat', 'fun'],
        halfColumn: true,
        config: {
          data: [
            {value: 'eat', label: '吃'},
            {value: 'drink', label: '喝'},
            {value: 'play', label: '玩'},
            {value: 'fun', label: '乐'}
          ]
        }
      },
      dateRange: {
        type: 'daterange',
        fieldsName: ['dateFrom', 'dateEnd'],
        label: '日期范围'
      },
      timeRange: {
        type: 'timerange',
        fieldsName: ['timeFrom', 'timeEnd'],
        fieldsValue: ['12:23:23', '11:11:11'],
        label: '时间范围'
      },
      dateTimeRange: {
        type: 'datetimerange',
        fieldsName: ['dateTimeFrom', 'dateTimeEnd'],
        fieldsValue: ['2017-03-06 12:32:11', ''],
        label: '日期时间范围'
      },
      alias: {
        slot: true
      },
      city: {
        type: 'select',
        label: '城市',
        value: [],
        config: {
          multiple: true
        },
        halfColumn: true
      }
}
```

### beforeSubmit
表单提交前会触发此函数，开发者可以在这里处理需要提交的数据，并将数据return出来，框架将自动提交表单，此方法可选，不是必须的
+ 类型：`Function`
+ 参数：`{object} data` 框架自动处理过表单提交需要的数据
+ 返回： `{object} data | false`: 用户在框架自动处理过的基础上，再加工的数据, 如果为`false`, 可终止表单提交

### afterSubmit
表单提交后调用此方法，接收服务端返回的响应信息，用来处理提交后的操作，此方法可选，不是必须的， 如果不提供此方法，框架会自动判断如果`response.status`是`200`的话，弹出操作成功的提示，且使用`$router.back()`返回上一个页面, 如果不是`200`，则弹出操作失败的提示，不做任何跳转
+ 类型：`Function`
+ 参数：`{object} response` 服务端返回的响应信息 `response`
+ 返回：`{object} data` 将要去填充查询列表的数据
    - `{Array} data`: 数据列表数组
    - `{int} total`: 数据的总记录数

## 方法

### validate
手动验证表单的方法，
+ 类型：`Function`
+ 参数：`Function` 表单验证后的回掉函数
    * 参数
        * `{boolean} valid` 表单验证是否成功
        * `{object} formData` 表单的数据（如果验证成功的话，否则为null）
+ 示例：
```html
<template>
    <Modal
        v-model="showModal"
        title="对话框表单"
        :loading="loading"
        :mask-closable="false"
        @on-ok="this.okModal">
        <FormPage ref="modalForm"
                :form-config="modalFormConfig">
        </FormPage>
    </Modal>
</template>
```
```js
export default {
  data () {
    return {
      showModal: false,
      loading: true,
      modalFormConfig: {
        justFormItems: true, // 不显示标题和操作按钮
        formModel: {},
        formItems: {
        name: {
          type: 'text',
          label: '姓名'
        },
        birthDay: {
          type: 'date',
          label: '出生年月'
        }
        },
        formRules: {
          name: [
            {required: true, message: '姓名不能为空'}
          ]
        }
      }
    }
  },
  methods: {
    okModal () {
      // 对话框的确定按钮不要loading样式
      this.loading = false 
      // 手动触发校验表单
      this.$refs['modalForm'].validate((valid, formData) => {
        if (valid) {
          // 如果表单验证成功，获取表单数据，进行自定义操作
          console.log(formData)
          // 最后关闭对话框
          this.showModal = false
        } else {
          // 如果验证失败，则不关闭对话框，继续操作表单
          this.$nextTick(function () {
            // 保持对话框确定按钮不会自动关闭对话框
            this.loading = true
          })
        }
      })
    }
  }
}
```

### hideItems
隐藏表单控件的方法
+ 类型：`Function`
+ 参数：`items` | `Array` 需要隐藏表单控件名称的数组
+ 示例: 隐藏用户名和性别两个表单控件
```js
this.$refs['form'].hideItems(['userName', 'sex'])
```
::: warning 注
暂时不支持的控件类型有`timerange`
:::

### showItems
显示表单控件的方法
+ 类型：`Function`
+ 参数：`{Array} items` 需要显示表单控件名称的数组
+ 示例: 显示用户名和性别两个表单控件
```js
this.$refs['form'].hideItems(['userName', 'sex'])
```
::: warning 注
暂时不支持的控件类型有`timerange`
:::

### acceptData
数据接收器方法,用来给表单控件填充数据
+ 类型：`Function`
+ 参数：
    * `{string} fieldName` 控件对应的字段名称
    * `{Array} data` 需要填充的数据
::: warning 注
支持填充的控件类型有:<br>
+ `select`: 下拉框，`data` 用来填充`<option>`
+ `checkbox`: 复选框， `data` 用来填充复选框选项
+ `checkbox`: 单选框， `data` 用来填充单选框选项
+ `listSelector`: 列表选择控件， `data` 用来填充列表
:::    
+ 示例：<br>
下拉框:
```js
this.$refs['form'].acceptData('city', [
    {value: 'beijing', label: '北京'},
    {value: 'shanghai', label: '上海'},
    {value: 'shenzhen', label: '深圳'}
])
```
复选框:
```js
this.$refs['form'].acceptData('hobby', [
    {value: 'eat', label: '吃'},
    {value: 'drink', label: '喝'},
    {value: 'play', label: '玩'},
    {value: 'fun', label: '乐'}
])
```
单选框:
```js
this.$refs['form'].acceptData('sex', [
    {value: 'male', label: '男'},
    {value: 'female', label: '女'}
])
```
列表选择控件:
```js
this.$refs['form'].acceptData('carStyle', [
    {
      brand: '宝马',
      series: 'X5',
      type: 'SUV',
      controlType: '手动',
      energyType: '电动',
      // ...
    }
])
```
        
### initFormData
我们为表单回填提供了一个统一的简洁方式，调用initFormData函数即可，具体步骤如下：

1. 给表单页面控件添加ref属性：
```js
<FormPage ref="form" ...
```

2. 在组件的mounted()中调用：
```js
this.$refs.form.initFormData(data)
```
::: warning 注
  参数data为表单数据对象，例：
  ```js
  {
      time: '12:00:33',
      city: ['shanghai'],
      dateFrom: '2011-11-12',
      dateEnd: '2011-11-13',
      dateTimeFrom: '2017-03-06 12:32:11',
      dateTimeEnd: '2017-03-06 12:32:12'
    }
  ```
:::

### resetFields
重置表单

## 表单页面具体流程
<img :src="$withBase('/images/FormPage.png')" alt="foo">
