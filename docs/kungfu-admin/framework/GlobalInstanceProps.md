# 全局实例属性和方法
为了代码简洁，易懂，可复用，框架提供了一些全局的实例方法，辅助我们的业务开发。

## $load( pageName[, params] )
此方法用于简化路由跳转，在这个后台系统中，我们跳转页面一般只会去当前菜单下去跳转，比如从列表页面跳到新增页面。详情参考[页面跳转](/menuAndRouter/LoadPage)
+ `{string} pageName` 需要跳转到的目标页面文件名
+ `{Object} params` 需要传递到目标页面的参数

```js
// 跳转新增页面
this.$load('CreditAdd')
```

## $utils
参考[全局工具对象 `this.$utils`](/GlobalUtils)

## $qs
参考[最佳`URL`解析工具](https://github.com/ljharb/qs)

## $SysCode
字典表对象，参考[`SysCode`状态码配置](/GlobalConfig?id=constconfig%E5%B8%B8%E9%87%8F%E9%85%8D%E7%BD%AE)

## $Patterns
全局正则对象，参考[`Patterns`校验正则配置](/GlobalConfig?id=constconfig%E5%B8%B8%E9%87%8F%E9%85%8D%E7%BD%AE)

## $openPhotoSwiper( imgUrls, index )
打开全局的图片预览组件
+ `{Array<string>} imgUrls` 图片url列表
+ `{int} index` 要显示第一个图片在列表中的下表

```js
// 打开全局相册组件，并显示第0个图片
this.$openPhotoSwiper(['a.jpg', 'b.png'], 0) 
```

## $getListOperationBtns( h, params, btns )
生成列表操作按钮，这个方法是基于`iview`的基础上的，请先了解[iview](https://www.iviewui.com/)
+ `{Function} h` render函数
+ `{Object} params` 行记录对象
+ `{Array<Object>} btns` 行记录对象
  + `{string} type` 按钮的样式类型，参考[`iview` `Table`组件的`type`属性](https://www.iviewui.com/components/button)
  + `{string} label` 按钮上显示的文字
  + `{function} handler` 按钮点击时触发的事件方法
  
```js
...
{
  title: '操作',
  key: 'action',
  align: 'center',
  render: (h, params) => {
    return this.$getListOperationBtns(h, params, [
      {label: '取消', handler: this.openCancelModal},
      {label: '线下支付', type: 'error', handler: this.openPayModal},
      {label: '追缴备注', type: 'info', handler: this.openRemarkModal}
    ])
  },
  width: 250
}
...
methods: {
  openPayModal (params) {
    // params是列表当前行的记录对象，框架自动传过来的
    ...
  }
}
...
``` 

## $exportCSV( fileName, opts )
简化导出操作，查询列表页面的导出请使用QueryListPage组件的[exportCsv()](/queryListPage/README?id=exportcsv)方法导出






