# 全局约定
### 1. 默认新增成功、编辑成功后返回查询列表
```js
// 新增返回
this.$load('listPageName')
// 修改,详情返回
this.$router.back()
```

### 2. 查询时所有字段全都提交，不管是否为空
### 3. 同一模块内页面跳转使用`this.$load(pageName[, params])`，参考[this.$load](/GlobalInstanceProps?id=load-pagename-params-)
### 4. 调用登录用户信息使用`this.$loginUser`
### 5. 列表操作列统一用框架封装的方法 `this.$getListOperationBtns(h, params, [btns])`, 例:

```js
{
  title: '操作',
  key: 'action',
  align: 'center',
  render: (h, params) => {
    return this.$getListOperationBtns(h, params, [
      {label: '通过', handler: this.passHandler},
      {label: '不通过', type: 'error', handler: this.refuseHandler}
    ])
  },
  width: 150
}
```
### 6. 导出cvs文件, 有两种方式：
1. 用`this.$exportCSV(filename, json2csvOpts)`
```js
self.$exportCSV('要到出的文件名', {
    data: data,
    fields: fields,
    fieldNames: fieldNames,
    quotes: ''
})
```
2. 用QueryListPage组件的`exportCsv()`方法导出，参考[exportCsv()](QueryListPage.html#exportcsv-导出查询数据)
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

### 7. 使用工具库`qs`时，应使用全局变量`this.$qs`


### 8. 图片预览组件统一使用`<album :list="" :options="" height=""></album>`
+   参数：
    - `{Array<string>} list`: 图片的url数组
    - `{Object} options`: `v-viewer`的配置属性（可选）
    - `{string} height`: 相册组件的高度（可选）

### 9. 路由全局拦截时请求自动添加 `header['x-csrf-token']`

### 10. 路由全局拦截时请求自动添加参数`operator`，值为`this.$loginUser.name`
### 11. 列表宽度必须为数字，而且必须有使用`minWidth`的一列，防止列表撑不满页面
