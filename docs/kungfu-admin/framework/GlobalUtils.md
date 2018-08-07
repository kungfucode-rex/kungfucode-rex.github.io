# 全局工具
为了方便我们快速开发，简化代码冗余，能更专注于业务编码，我们增加了全局工具库，使用方法是`this.$utils.方法名()`
## merge( from, to, props )
从一个对象合并指定属性到另一个对象
+ `{Object} from` 需要获取属性的对象
+ `{Object} to` 需要将属性合并到的那个对象
+ `{Array<string>} props` 需要合并的属性数组

```js
let a = {name: 'wll'}
let b = {name: 'rex', sex: 'm'}
this.$utils.merge(b, a, ['name', 'sex'])
// a: {name: 'rex', sex: 'm'}
```

## useTimestamp( obj, props )
将对象的指定时间属性(YYYY-MM-DD HH:mm:ss)转为13位的时间戳
+ `{Object} obj` 要处理的对象
+ `{Array<string>} props` 要处理的属性

```js
let obj = {date: '2018-01-26 12:00:00'}
this.$utils.useTimestamp(obj, ['date'])
// obj: {date: 1516939200000}
```
