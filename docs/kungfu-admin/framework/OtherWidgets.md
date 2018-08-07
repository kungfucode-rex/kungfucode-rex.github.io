# 其它组件
## 提示框
请参考iview官方 [Message](https://www.iviewui.com/components/message) API

## 确认框
使用全局方法 `this.$Modal.confirm(config)`
请参考iview官方 [Modal.confirm](https://www.iviewui.com/components/modal) API

## 对话框
请参考iview官方 [Modal](https://www.iviewui.com/components/modal) API

## 图片缩放组件
次组件用来展示图片, 并自带放大预览功能
+ 属性
    * `imgUrl`: 图片的url
    * `imgReadyUrl`: 真实图片加载前可以先给一个缩略图, 以提高页面渲染速度
+ 示例: 在列表中使用此组件
```js
{title: '身份证', key: 'id'},
{
  title: '图片',
  key: 'pic',
  render: (h, params) => {
    return h('ZoomImage', {
      props: {
        imgReadyUrl: 'http://orkkm5654.bkt.clouddn.com/o_1bmqvdonabj31mcvn80d2b1l8l7.png?imageView2/2/h/46',
        imgUrl: 'http://orkkm5654.bkt.clouddn.com/o_1bmqvdonabj31mcvn80d2b1l8l7.png'
      }
    })
  }
},
{title: '手机号', key: 'phone'},
```
<img :src="$withBase('/images/ZoomImage.png')" alt="ZoomImage">

