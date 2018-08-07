---
sidebarDepth: 1
---
# 表单组件
## 表单分隔条

### type
+ 值：`'spliter'`

### label
分组标题
+ 类型：`string`

## 文本框组件

### label
label名称
+ 类型：`string`

### value
默认值
+ 类型：`string`

### placeholder
placeholder
+ 类型：`string`

### halfColumn
是否占半列宽度
+ 类型：`boolean`

### readonly
是否只读
+ 类型：`boolean`

### disabled
是否启用
+ 类型：`boolean`

### desc
输入提示
+ 类型：`string`

### maxlength
可输入内容的最大字符个数
+ 类型：`int`

### appendHolder
有浮动的placeholder，一般作为计量单位提示使用
+ 类型：`string`

### onChange
值改变时触发此函数
+ 类型：`Function`

## 日期时间组件

### type
控件的类型，此类组件的`type`分一下几种类型：<br>
- `'date'`: 日期控件<br>
- `'time'`: 时间控件<br>
- `'datetime'`: 日期时间控件<br>

### label
label名称
+ 类型：`string`

### value
默认值
+ 类型：`string`

### placeholder
placeholder
+ 类型：`string`

### halfColumn
是否占半列宽度
+ 类型：`boolean`

### onChange
值改变时触发此函数
+ 类型：`Function`
+ 参数：
    * `value` 此控件的值
    
### readonly
是否只读
+ 类型：`boolean`
 
### disabled
是否启用
+ 类型：`boolean`

### desc
输入提示
+ 类型：`string`
 
### config
日期控件的额外配置
+ 类型：`Object`
+ 详细：
    * `{boolean} onlyYear`: 只允许选择年份
    * `{boolean} onlyMonth`: 只允许选择月份
    * `{object} options`: 参考iview控件datepicker的属性配置[ivew DatePicker](https://www.iviewui.com/components/date-picker)
        - 示例：只允许选择当前时间之后的日期
        ```js
        expiration_date: {
              type: 'date',
              label: '有效期',
              halfColumn: true,
              config: {
                options: {
                  disabledDate (date) {
                    return date && date.valueOf() < Date.now()
                  }
                }
              }
            }
        ```

## 日期时间范围组件

### type
控件的类型，此类组件`type`的值有这么几种：<br>
- `'daterange'`: 日期范围控件<br>
- `'timerange'`: 时间范围控件<br>
- `'datetimerange'`: 日期时范围间控件<br>

### label
label名称
+ 类型：`string`

### fieldsName
字段名称数组，第一个值是起始变量名，第二个是结束变量名
+ 类型：`Array`

### fieldsValue
默认值数组，第一个值是起始默认值，第二个是结束默认值
+ 类型：`Array`

### placeholder
placeholder
+ 类型：`string`

### halfColumn
是否占半列宽度
+ 类型：`boolean`

### onChange
值改变时触发此函数
+ 类型：`Function`
+ 参数：
    * `value` 此控件的值
    
### readonly
是否只读
+ 类型：`boolean`
 
### disabled
是否启用
+ 类型：`boolean`

### desc
输入提示
+ 类型：`string`

## 单选组件

### label
label名称
+ 类型：`string`

### value
默认值
+ 类型：`string`

### placeholder
placeholder
+ 类型：`string`

### halfColumn
是否占半列宽度
+ 类型：`boolean`

### desc
输入提示
+ 类型：`string`

### config
单选控件的配置
+ 类型：`Object`
+ 详细：
    * `{Array} data` 选项数组
        - `{Any} value` 选项的值
        - `{string} label` 选项的文本
        - `{boolean} disabled` 是否启用此项
+ 示例
```js
config: {
      data: [
        {value: 'male', label: '男'},
        {value: 'female', label: '女'}
      ]
}
```

### onChange
值改变时触发此函数
+ 类型：`Function`
+ 参数：`value` 此控件的值

## 复选组件

### label
label名称
+ 类型：`string`

### value
默认值
+ 类型：`Array`

### placeholder
placeholder
+ 类型：`string`

### halfColumn
是否占半列宽度
+ 类型：`boolean`

### desc
输入提示
+ 类型：`string`

### config
复选控件的配置
+ 类型：`Object`
+ 详细：
    * `{Array} data` 选项数组
        - `{Any} value` 选项的值
        - `{string} label` 选项的文本
        - `{boolean} disabled` 是否启用此项
+ 示例
```js
config: {
      data: [
        {value: 'eat', label: '吃'},
        {value: 'drink', label: '喝'},
        {value: 'play', label: '玩'},
        {value: 'fun', label: '乐'}
      ]
}
```

### onChange
值改变时触发此函数
+ 类型：`Function`
+ 参数：
    * `value` 此控件的值

## 下拉组件

### label
label名称
+ 类型：`string`

### submitLabelTo
需要同时将label提交到后台对应的字段名
+ 类型：`string`

### value
默认值
+ 类型：`string|Array` 当`config.multiple`为`true`时类型是`Array`,否则为`string`

### placeholder
placeholder
+ 类型：`string`

### halfColumn
是否占半列宽度
+ 类型：`boolean`

### config
下拉控件的配置
+ 类型：`Object`
+ 详细：
    * `{string} url` 通过请求url获取下拉选项数据
    * `{string} actionType` 请求的类型, 默认为`get`
    * `{object} responseConfig` 解析请求过来的数据规则
        * `{string} data`返回数据中哪一个是我们需要的数组
        * `{string} value` 数组每一项中哪一个字段是value
        * `{string} label` 数组每一项中哪一个字段是label
        <br/>若此项缺失则提供默认值
        ```json
        {
            data: 'data',
            value: 'value',
            label: 'label'
        }
        ```
    * `{string|object} cascade`
        * 类型为`string`时，级联查询的下一级表单控件的name **示例** `cascade: 'cityCode'` 请求中附带的变量名为`data`
        * 类型为`object`时，
            * `{string} field`: 级联查询的下一级表单控件的name
            * `{string} sendParam`: 指定发请求时附带的变量名
             <br/>例: 请求中附带的变量名为`province`
             ```json
             cascade: {
                field: 'cityCode',
                sendParam: 'province'
             }
             ```
    * `{Array} data` 选项数组，提供url时，此项可缺失
        - `{Any} value` 选项的值
        - `{string} label` 选项的文本
    * `{boolean} multiple` 是否多选

::: warning 注
级联查询时默认给下一级控件传递的参数为`{data: value}`, 其中`value`是上级控件的`value`值
:::
+ 示例
    * 普通下拉框配置
    ```js
    config: {
          data: [
            {value: 'eat', label: '吃'},
            {value: 'drink', label: '喝'},
            {value: 'play', label: '玩'},
            {value: 'fun', label: '乐'}
          ]
    }
    ```
    * 级联示例
    ```js
        province: {
            type: 'select',
            label: '省份',
            config: {
                url: '/province',
                responseConfig: {
                  data: 'data',
                  value: 'value',
                  label: 'label'
                },
                cascade: 'city'
            },
            halfColumn: true
        },
        city: {
            type: 'select',
            label: '城市',
            config: {
              url: '/cities'
            },
            halfColumn: true
        }
    ```

### disabled
是否启用
+ 类型：`boolean`

### desc
输入提示
+ 类型：`string`

### onChange
值改变时触发此函数
+ 类型：`Function`
+ 参数：
    * `value` 此控件的值

## 文本域组件

### label
label名称
+ 类型：`string`

### value
默认值
+ 类型：`string|Array` 当`config.multiple`为`true`时类型是`Array`,否则为`string`

### placeholder
placeholder
+ 类型：`string`

### config
下拉控件的配置
+ 类型：`Object`
+ 详细：
    * `{boolean} useRichText` 是否使用富文本编辑器
    * `{string} height` 富文本编辑器的高度
    * `{object} quillEditorOptions` 富文编辑器的配置对象, 具体参考[QuillJs](https://quilljs.com/)
+ 示例
    * 普通下拉框配置
    ```js
    address: {
      type: 'textarea',
      config: {
        useRichText: true,
        height: '200px',
        quillEditorOptions: {
          modules: {
            toolbar: [
              [{'size': ['small', false, 'large', 'huge']}],
              [{'color': []}],
              [{'align': []}],
              ['link']
            ]
          },
          placeholder: '请输入限行描述'
        }
      },
      label: '地址'
    }
    ```

### halfColumn
是否占半列宽度
+ 类型：`boolean`


## 文件上传组件

### label
label名称
+ 类型：`string`

### value
默认值
+ 类型：`string|Array` 当`config.multiple`为`true`时类型是`Array`,否则为`string`

### config
上传组件的配置
+ 类型：`Object`
+ 详细：
    * `{boolean} multiple` 是否多选
    * `{object} filters` 上传过滤
    ```js
    // 可以使用该参数来限制上传文件的类型，大小等，该参数以对象的形式传入，它包括三个属性：
    filters : {
        max_file_size : '100mb',
        prevent_duplicates: true,
        // Specify what files to browse for
        mime_types: [
            {title : "flv files", extensions : "flv"} // 限定flv后缀上传格式上传
            {title : "Video files", extensions : "flv,mpg,mpeg,avi,wmv,mov,asf,rm,rmvb,mkv,m4v,mp4"}, // 限定flv,mpg,mpeg,avi,wmv,mov,asf,rm,rmvb,mkv,m4v,mp4后缀格式上传
            {title : "Image files", extensions : "jpg,gif,png"}, // 限定jpg,gif,png后缀上传
            {title : "Zip files", extensions : "zip"} // 限定zip后缀上传
        ]
    },
    ```
    具体请参考:[plupload的filters](http://www.plupload.com/docs/v2/Options#filters)

### desc
输入提示
+ 类型：`string`

## 图片上传组件

### label
label名称
+ 类型：`string`

### value
默认值
+ 类型：`string|Array` 当`config.multiple`为`true`时类型是`Array`,否则为`string`

### config
上传组件的配置
+ 类型：`Object`
+ 详细：
    * `{boolean} multiple` 是否多选
    * `{object} filters` 上传过滤
    ```js
    // 可以使用该参数来限制上传文件的类型，大小等，该参数以对象的形式传入，它包括三个属性：
    filters : {
        max_file_size : '100mb',
        prevent_duplicates: true,
        // Specify what files to browse for
        mime_types: [
            {title : "flv files", extensions : "flv"} // 限定flv后缀上传格式上传
            {title : "Video files", extensions : "flv,mpg,mpeg,avi,wmv,mov,asf,rm,rmvb,mkv,m4v,mp4"}, // 限定flv,mpg,mpeg,avi,wmv,mov,asf,rm,rmvb,mkv,m4v,mp4后缀格式上传
            {title : "Image files", extensions : "jpg,gif,png"}, // 限定jpg,gif,png后缀上传
            {title : "Zip files", extensions : "zip"} // 限定zip后缀上传
        ]
    },
    ```
    具体请参考:[plupload的filters](http://www.plupload.com/docs/v2/Options#filters)

### desc
输入提示
+ 类型：`string`

### halfColumn
是否占半列宽度
+ 类型：`boolean`
    
## 列表选择组件
<img :src="$withBase('/images/ListSelector.png')" alt="列表选择组件示例图">

### type
控件的类型，表示此控件为列表选择控件，值为`listSelector`
+ 类型：`String`

### label
label名称
+ 类型：`String`

### value
默认值
+ 类型：`String`

### desc
输入提示
+ 类型：`String`

### config
控件配置对象
+ 类型：`Object`
+ 详细：
    * `{string} idKey` 唯一标识字段, 默认为`id`
    * `{string|Array} submitFields` 需要提交的字段有哪些
        * `'all'` 所有字段全部提交
        * `['field1', 'field2', ...]` 需要提交的字段
        * `未设置此项` 默认提交字段 `idKey` 的数组
    * `{Array} columns` 列表的列配置, 参考iview组件table
    * `{Array} listData` 列表的数据
    * `{boolean} cleanBtn` 是否需要右上角的清空按钮，此按钮会删除控件所有数据
    * `{boolean} canDelete` 是否需要每一行后面的删除按钮，此按钮会删除当前行数据
    * `{boolean} multiple` 是否可以多选，如果为true, 则每次接收的数据会追加到表格当中，如果为false,则会替换原来的数据
    * `{Array} actions` 控件列表表头需要的操作按钮
::: warning 注
给此控件赋值时需要使用表单的数据接收器方法`form.acceptData()`
:::
+ 示例：<br>
控件定义：
```js
carStyle: {
      type: 'listSelector',   // 类型是列表选择控件
      label: '已选择的车型',
      config: {               // 控件的配置
        idKey: 'brand',       // 区别表格记录的标识字段，默认为id
        submitFields: 'all',  // 需要提交的字段
        columns: [
          {
            title: '品牌',
            key: 'brand'
          },
          {
            title: '车系',
            key: 'series'
          },
          {
            title: '类别',
            key: 'type'
          }
        ],
        listData: [],
        cleanBtn: true,
        canDelete: true,      // 是否配备删除操作
        multiple: true,       // 是否多选
        actions: [            // 列表右上方的操作按钮
          {
            style: 'info',    // 按钮样式
            text: '添加',     // 按钮文本
            handler: () => {
              this.showSelectModal = true // 弹出选择对话框
            }
          }
        ]
      }
}
```
控件赋值：
```js
this.$refs['form'].acceptData('carStyle', data) // data就是要装入控件表格的数据
```
::: warning 注
此控件回填时需要全字段的列表数据
:::

### onChange
值改变时触发此函数
+ 类型：`Function`
+ 参数：
    * `value` 此控件的值    

## 自定义Slot组件
如果已封装的组件不能满足业务的需求，那么可以用slot属性自定义所需要的内容
+ 例：
HTML:
```html
    <FormPage :form-config="formConfig">
        <Form-item slot="diySlot">
            <!-- 这里写你需要的内容 -->
        <Form-item>
    </FormPage>
```
JS:
```js
export default {
    data () {
        return {
            formConfig: {
                formModel:{},
                formItems: {
                    userName: {
                        type: 'text',
                        label: '用户名'
                    },
                    diySlot: {
                        slot: true
                    },
                    phone: {
                        type: 'text',
                        label: '手机号'
                    }
                    ...
                }
            }
        }
    }
}
```
如上所示，会在用户名和手机号之间插入自定义的diySlot部分，只要将数据维护在formConfig.formModel中，在表单校验提交时，就会带上diySlot部分的数据。
    