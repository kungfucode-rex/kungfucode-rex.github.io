---
sidebar: auto
---
我们的后台框架使用的表单验证组件是[async-validator](https://github.com/yiminghe/async-validator),官网的文档是英文的，网上中文资料极少，为了方便大家能快速上手开发，我将其翻译成中文(翻译有好多不到位的地方，望好心人指正)，如下所示：

## async-validator
异步的校验框架，是原框架[Async Validate](https://github.com/freeformsystems/async-validate)(下文简称原验证框架)的一个变种。

## API
下面的是较原验证框架改进过的：

## 使用
基本的使用还跟之前一样，先定义一个`验证策略[descriptor]`，将其传递给`验证模板[schema]`,此时我们会得到一个`验证器[validator]`,用这个验证器去验证`待验证对象{key:value}`,之后我们可以拿到验证结果去处理我们的业务，例：
```js
var schema = require('async-validator');//验证模板
var descriptor = {//验证策略
  name: {type: "string", required: true}
}
var validator = new schema(descriptor);//验证器
validator.validate({name: "muji"}, (errors, fields) => {
  if(errors) {
    // validation failed, errors is an array of all errors
    // fields is an object keyed by field name with an array of
    // errors per field
    return handleErrors(errors, fields);
  }
  // validation passed
});
```
## Validate 验证方法
```js
function (source, [options], callback)
```
+ `source`:`必须`待验证的对象
+ `options`:`可选`设置验证的深度
+ `callback`:`必须`验证完成之后触发的回掉函数
## Options
+ `first`: `[Boolean]`有一条验证规则失败后就停止验证，并触发回掉函数。如果你的验证涉及到多个异步验证(例如，查询数据库去验证)，此时就需要使用此参数
+ `firstFields`: `[Boolean|String[]]`被验证对象的值(值为集合，例：数组)遇到第一个错误时就停止校验，

## Rules
我们也会使用函数来作为规则进行校验
```js
function(rule, value, callback, source, options)
```
+ `rule`:
+ `value`:正在校验的值
+ `callback`:校验完成后的回调函数，如果校验有错误的话，错误集合会传给这个函数抛出去
+ `source`:校验的对象
+ `options`:附加的配置
+ `options.messages`:指定需要显示的错误信息，用来覆盖默认的错误提示信息

The options passed to `validate` are passed on to the validation functions so that you may reference transient data (such as model references) in validation functions. However, some option names are reserved; if you use these properties of the options object they are overwritten. The reserved properties are `messages`, `exception` and `error`.

```js
var schema = require('async-validator');
var descriptor = {
  name(rule, value, callback, source, options) {
    var errors = [];
    if(!/^[a-z0-9]+$/.test(value)) {
      errors.push(
        new Error(
          util.format("%s must be lowercase alphanumeric characters",
            rule.field)));
    }
    callback(errors);
  }
}
var validator = new schema(descriptor);
validator.validate({name: "Firstname"}, (errors, fields) => {
  if(errors) {
    return handleErrors(errors, fields);
  }
  // validation passed
});
```
这通常针对单个字段的多规则校验，我们会给其提供一个多种校验规则对象的数组，例如：
```js
var descriptor = {
  email: [
    {type: "string", required: true, pattern: schema.pattern.email},
    {validator(rule, value, callback, source, options) {
      var errors = [];
      // test if email address already exists in a database
      // and add a validation error to the errors array if it does
      callback(errors);
    }}
  ]
}
```
## Type
我们已经内置了一些校验规则，用type来指定，具体如下：
+ `string`:必须为`string`类型，`string`也是默认类型
+ `number`:必须为`number`类型
+ `boolean`:必须为`boolean`类型
+ `function`:必须为`function`类型
+ `RegExp`:必须为`RegExp`类型
+ `integer`:必须为`integer`类型
+ `float`:必须为`float`类型
+ `array`:必须为数组类型,而且`Array.isArray`为true
+ `object`:必须为`object`类型,而且`Array.isArray`为false
+ `enum`:必须为枚举集合`enum`中的一个
+ `date`:必须为有效的日期类型
+ `url`:必须为`url`类型
+ `hex`:必须为`hex`类型
+ `email`:必须为`email`类型

## Required（非空校验）
这个字段必须有值，不能为空
## Pattern（正则校验）
这个字段必须匹配这个正则表达式
## Range（范围校验）
范围规则有最小`min`和最大`max`两个属性，对字符串和数组来说，指的是`length`,对数字来说指的是最小值和最大值
If the `len` property is combined with the min and max range properties, `len` takes precedence
## Enumerable（枚举校验）
判断一个值是否是某几个值中的一个，我们使用`type:'enum'`，而且要提供一个`enum`的数组，例如：
```js
var descriptor = {
  role: {type: "enum", enum: ['admin', 'user', 'guest']}
}
```
## Whitespace（空白校验）
通常，对于必填字段来说，只包含空白字符是会校验错误的，To add an additional test for a string that consists solely of whitespace add a whitespace property to a rule with a value of true. 规则的`type`必须是`string`

替代空白校验的一个方式是对用户的输入进行处理，可以参考`transform`的例子，例子中可以去除空格

## DeepRules（深度校验）
如果被校验的对象的值是一个`object`或`array`类型的，我们可以用内嵌的属性`fields`来定义规则，例如：
```js
var descriptor = {
  address: {
    type: "object", required: true,
    fields: {
      street: {type: "string", required: true},
      city: {type: "string", required: true},
      zip: {type: "string", required: true, len: 8, message: "invalid zip"}
    }
  },
  name: {type: "string", required: true}
}
var validator = new schema(descriptor);
validator.validate({ address: {} }, (errors, fields) => {
  // errors for street, address.city, address.zip and address.name
});
```
注意你不用给父级校验指定`required`,如果没有父字段没有声明的话，深度校验是不会进行的
深度校验为嵌入式规则创建了`schema`模板，所以你可以在`schema.validate()`中指定`options`:
```js
var descriptor = {
  address: {
    type: "object", required: true, options: {single: true, first: true},
    fields: {
      street: {type: "string", required: true},
      city: {type: "string", required: true},
      zip: {type: "string", required: true, len: 8, message: "invalid zip"}
    }
  },
  name: {type: "string", required: true}
}
var validator = new schema(descriptor);
validator.validate({ address: {} }, (errors, fields) => {
  // now only errors for street and name
});
```
父级的校验规则也是会被校验的，如果你设置的规则校验如下：
```js
var descriptor = {
  roles: {
    type: "array", required: true, len: 3,
    fields: {
      0: {type: "string", required: true},
      1: {type: "string", required: true},
      2: {type: "string", required: true}
    }
  }
}
```
而且你提供的校验对象是：`{roles: ["admin", "user"]}`,那么校验后将会有两个错误：
1. 数组的length不是3
2. 下标为2的数组项丢失

## defaultField（默认字段规则）
如果被校验对象是`object`或`array`类型的，那么我们可以用`defaultField`来规定子项的类型规则，如：
```js
var descriptor = {
  urls: {
    type: "array", required: true,
    defaultField: {type: "url"}
  }
}
```
::: warning 注意
`defaultField`会展开到深度校验的`fields`中，请参考深度校验
:::
## Transform
有时候在校验之前将需要校验的值`value`转换一下也是非常必要的，possibly to coerce the value or to sanitize it in some way。为了达到这样的目的我们在规则中添加了一个`transform`的方法。
```js
var schema = require('async-validator');
var sanitize = require('validator').sanitize;
var descriptor = {
  name: {
    type: "string",
    required: true, pattern: /^[a-z]+$/,
    transform(value) {
      return sanitize(value).trim();
    }
  }
}
var validator = new schema(descriptor);
var source = {name: " user  "};
validator.validate(source, (errors, fields) => {
  assert.equal(source.name, "user");
});
```
上面的例子中，如果没有`transform`方法，验证将会失败，因为`vlaue`中包含空白字符，不匹配所提供的正则表达式，但是有`transform`方法后，验证会通过，同时`value`的值也会被去空格处理

## Messages（验证提示）
根据需求的不同，你可能需要国际化或者不同的错误提示信息

最简单的方式就是在规则中提供一个`message`:
```js
{name:{type: "string", required: true, message: "Name is required"}}
```
提示信息可以是任何类型的，比如一个jsx格式的：
```js
{name:{type: "string", required: true, message: <b>Name is required</b>}}
```
有可能你需要对不同的语言提供相同的验证消息模板处理，你就会没有意义的去针对每种语言重复处理。<br>
这种情况下，你只需要对不同的语言在模板里提供其相应的提示模板即可，例如：
```js
var schema = require('async-validator');
var cn = {
  required: '%s 必填',
};
var descriptor = {name:{type: "string", required: true}};
var validator = new schema(descriptor);
// deep merge with defaultMessages
validator.messages(cn);
...
```
如果你定义了自己的验证方法，你可以调用`options.messages`来使用我们定义好的验证提示
## validator（自定义验证）
针对特定的字段，你可以使用自定义函数来验证：
```js
{
  asyncField:{
    validator(rule,value,callback){
      ajax({
        url:'xx',
        value:value
      }).then(function(data){
        callback();
      },function(error){
        callback(new Error(error))
      });
    }
  }
}
```
