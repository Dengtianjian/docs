# RuleBuilder

`kernel\Foundation\Validation\RuleBuilder`  ·  class

源码：`gstudio_kernel/Foundation/Validation/RuleBuilder.php`

> 校验规则构建器

## 声明

```php
class RuleBuilder implements RuleInterface
```

实现：`RuleInterface`

## 概述

持有全部校验规则定义方法及规则状态数据，作为 `Rule` 的内部代理。
架构上对应 Database/Model 中的 Builder/Query 角色：
Rule（门面）通过魔术方法委托到本类，本类负责实际的规则存储与链式构建。

实现 `RuleInterface` 契约，所有规则方法返回 $this 以支持链式调用。

规则存储结构：
- `$rule`: 规则名 → 规则值的映射，最终由 `Validator` 消费
- `$errorMessages`: 规则名 → 自定义错误信息

## 相关

- `Rule`
- `Validator`
- `RuleInterface`

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$rule` | `array|null` | — | 校验规则 |
| `$errorMessages` | `array` | `[]` | 规则校验失败的错误信息 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`required()`](#required) | 校验值是否为空或者为 null |
| [`sometimes()`](#sometimes) | 存在性闸门（sometimes） |
| [`type()`](#type) | 校验目标值的数据类型是否等于指定数据类型或者目标值的数据类型是否存在于指定的数据类型数组中 |
| [`equal()`](#equal) | 是否等于指定值 |
| [`includes()`](#includes) | 是否包含指定的值或者指定的数组所有元素 |
| [`hasKeys()`](#haskeys) | 校验数组是否存在指定键或者指定键数组 |
| [`min()`](#min) | 校验数值是否大于指定数值 |
| [`max()`](#max) | 校验数值是否小于指定数值 |
| [`range()`](#range) | 校验数值是否在指定数值范围内 |
| [`minLength()`](#minlength) | 校验字符串长度是否大于指定长度 |
| [`maxLength()`](#maxlength) | 校验字符串长度是否小于指定长度 |
| [`length()`](#length) | 校验字符串长度是否在指定的长度范围内 |
| [`pattern()`](#pattern) | 正则表达式校验 |
| [`custom()`](#custom) | 自定义校验 |
| [`exists()`](#exists) | 校验值对应的记录是否存在于指定模型 |
| [`useRule()`](#userule) | 使用别的校验规则 |
| [`email()`](#email) | 校验值是否为有效的邮箱地址 |
| [`url()`](#url) | 校验值是否为有效的 URL 地址 |
| [`ip()`](#ip) | 校验值是否为有效的 IP 地址（支持 IPv4 和 IPv6） |
| [`date()`](#date) | 校验值是否为有效的日期字符串 |
| [`dateFormat()`](#dateformat) | 校验值是否符合指定的日期格式 |
| [`in()`](#in) | 校验值是否在给定的值列表中 |
| [`notIn()`](#notin) | 校验值是否不在给定的值列表中 |
| [`confirmed()`](#confirmed) | 校验字段的值是否与 字段名_confirmation 的值一致（常用于密码确认） |
| [`same()`](#same) | 校验字段的值是否与另一个指定字段的值相同 |
| [`different()`](#different) | 校验字段的值是否与另一个指定字段的值不同 |
| [`nullable()`](#nullable) | 允许字段值为 null。值为 null 时跳过后续所有校验规则，直接通过 |
| [`present()`](#present) | 允许字段值为空字符串。值为空字符串时跳过后续所有校验规则，直接通过 |
| [`prohibited()`](#prohibited) | 校验字段不能存在于输入数据中 |
| [`requiredIf()`](#requiredif) | 当另一个字段的值等于指定值时，此字段为必填 |
| [`requiredUnless()`](#requiredunless) | 除非另一个字段的值等于指定值，否则此字段为必填 |

### required()

```php
public function required($message = "")
```

校验值是否为空或者为 null

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$message` | `string` | `""` | 校验失败报错信息 |

### sometimes()

```php
public function sometimes()
```

存在性闸门（sometimes）

仅当字段键存在于待校验数据中时才执行后续规则；键不存在则整条规则跳过。
用于「可选字段，但一旦传了就必须校验」场景，等价于 Laravel 的 sometimes 前置语义。

与 `\kernel\Foundation\Validation\Rules::sometimes`（回调式条件规则）区分：
本方法无回调，仅判定字段键是否存在（Arr::has）。

### type()

```php
public function type($value, $message = "")
```

校验目标值的数据类型是否等于指定数据类型或者目标值的数据类型是否存在于指定的数据类型数组中

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|array` | — | 数据类型或者数据类型数组 |
| `$message` | `string` | `""` | 校验失败报错信息 |

### equal()

```php
public function equal($value, $message = "")
```

是否等于指定值

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `mixed` | — | 指定值 |
| `$message` | `string` | `""` | 校验失败报错信息 |

### includes()

```php
public function includes($value, $message = "")
```

是否包含指定的值或者指定的数组所有元素

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|array` | — | 任意基本类型值或者任意基本类型数组 |
| `$message` | `string` | `""` | 校验失败报错信息 |

### hasKeys()

```php
public function hasKeys($value, $message = "")
```

校验数组是否存在指定键或者指定键数组

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|array` | — | 键或者键数组 |
| `$message` | `string` | `""` | 校验失败报错信息 |

### min()

```php
public function min($value, $message = "")
```

校验数值是否大于指定数值

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `int` | — | 大于的指定数值 |
| `$message` | `string` | `""` | 校验失败报错信息 |

### max()

```php
public function max($value, $message = "")
```

校验数值是否小于指定数值

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `int` | — | 小于的指定值 |
| `$message` | `string` | `""` | 校验失败报错信息 |

### range()

```php
public function range($min, $max, $message = "")
```

校验数值是否在指定数值范围内

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$min` | `int` | — | 最小值 |
| `$max` | `int` | — | 最大值 |
| `$message` | `string` | `""` | 校验失败报错信息 |

### minLength()

```php
public function minLength($value, $message = "")
```

校验字符串长度是否大于指定长度

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `int` | — | 大于的指定长度数值 |
| `$message` | `string` | `""` | 校验失败报错信息 |

### maxLength()

```php
public function maxLength($value, $message = "")
```

校验字符串长度是否小于指定长度

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `int` | — | 小于的指定长度数值 |
| `$message` | `string` | `""` | 校验失败报错信息 |

### length()

```php
public function length($min, $max, $message = "")
```

校验字符串长度是否在指定的长度范围内

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$min` | `int` | — | 最小长度 |
| `$max` | `int` | — | 最大长度 |
| `$message` | `string` | `""` | 校验失败报错信息 |

### pattern()

```php
public function pattern($pattern, $message = "")
```

正则表达式校验

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$pattern` | `string` | — | 正则表达式 |
| `$message` | `string` | `""` | 校验失败报错信息 |

### custom()

```php
public function custom($callback)
```

自定义校验

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$callback` | `\Closure|callable` | — | 校验函数，签名 `function($value, $rules, $data): Result|void` |

### exists()

```php
public function exists($model, $message = "", $fieldOrCallback = null, $callback = null)
```

校验值对应的记录是否存在于指定模型

默认按主键对被校验值执行 `where(主键, 值)`，再判断 `exists()`；
可通过第三参数指定查询字段，通过闭包追加额外查询条件（拓展）。

支持多种调用方式重载：
exists($model, $message)                         — 默认按主键查询
exists($model, $message, 'username')             — 按指定字段查询
exists($model, $message, $callback)              — 按主键查询 + 闭包拓展
exists($model, $message, 'username', $callback)  — 按指定字段查询 + 闭包拓展

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$model` | `\kernel\Foundation\Database\RDB\Model` | — | 对应模型实例 |
| `$message` | `string` | `""` | 校验失败报错信息 |
| `$fieldOrCallback` | `string|\Closure|callable|null` | `null` | 第三个参数：字符串=查询字段名，闭包=拓展回调，null=默认主键 |
| `$callback` | `\Closure|callable|null` | `null` | 第四个参数：拓展回调（仅在第三参数为字段名时传入） |

### useRule()

```php
public function useRule(RuleInterface $validateRule)
```

使用别的校验规则

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$validateRule` | `RuleInterface` | — | 校验规则实例 |

### email()

```php
public function email($message = "")
```

校验值是否为有效的邮箱地址

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$message` | `string` | `""` | 校验失败报错信息 |

### url()

```php
public function url($message = "")
```

校验值是否为有效的 URL 地址

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$message` | `string` | `""` | 校验失败报错信息 |

### ip()

```php
public function ip($message = "")
```

校验值是否为有效的 IP 地址（支持 IPv4 和 IPv6）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$message` | `string` | `""` | 校验失败报错信息 |

### date()

```php
public function date($message = "")
```

校验值是否为有效的日期字符串

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$message` | `string` | `""` | 校验失败报错信息 |

### dateFormat()

```php
public function dateFormat($format, $message = "")
```

校验值是否符合指定的日期格式

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$format` | `string` | — | 日期格式，如 Y-m-d、Y-m-d H:i:s |
| `$message` | `string` | `""` | 校验失败报错信息 |

### in()

```php
public function in($values, $message = "")
```

校验值是否在给定的值列表中

可变参数：支持 in('a', 'b', 'c') 或 in(['a', 'b', 'c'], 'message')。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$values` | `array|string` | — | 值列表或数组+消息 |
| `$message` | `mixed` | `""` | — |

### notIn()

```php
public function notIn($values, $message = "")
```

校验值是否不在给定的值列表中

可变参数：支持 notIn('a', 'b', 'c') 或 notIn(['a', 'b', 'c'], 'message')。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$values` | `array|string` | — | 值列表或数组+消息 |
| `$message` | `mixed` | `""` | — |

### confirmed()

```php
public function confirmed($message = "")
```

校验字段的值是否与 字段名_confirmation 的值一致（常用于密码确认）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$message` | `string` | `""` | 校验失败报错信息 |

### same()

```php
public function same($field, $message = "")
```

校验字段的值是否与另一个指定字段的值相同

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$field` | `string` | — | 另一个字段名 |
| `$message` | `string` | `""` | 校验失败报错信息 |

### different()

```php
public function different($field, $message = "")
```

校验字段的值是否与另一个指定字段的值不同

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$field` | `string` | — | 另一个字段名 |
| `$message` | `string` | `""` | 校验失败报错信息 |

### nullable()

```php
public function nullable($message = "")
```

允许字段值为 null。值为 null 时跳过后续所有校验规则，直接通过

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$message` | `string` | `""` | 校验失败报错信息（本规则不产生错误，仅用于兼容接口） |

### present()

```php
public function present($message = "")
```

允许字段值为空字符串。值为空字符串时跳过后续所有校验规则，直接通过

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$message` | `string` | `""` | 校验失败报错信息（本规则不产生错误，仅用于兼容接口） |

### prohibited()

```php
public function prohibited($message = "")
```

校验字段不能存在于输入数据中

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$message` | `string` | `""` | 校验失败报错信息 |

### requiredIf()

```php
public function requiredIf($anotherField, $values, $message = "")
```

当另一个字段的值等于指定值时，此字段为必填

可变参数：支持 requiredIf('status', ['active', 'pending'], 'message') 或 requiredIf('status', 'active', 'pending')。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$anotherField` | `string` | — | 另一个字段名 |
| `$values` | `array|string` | — | 指定值或值列表 |
| `$message` | `string` | `""` | 校验失败报错信息 |

### requiredUnless()

```php
public function requiredUnless($anotherField, $values, $message = "")
```

除非另一个字段的值等于指定值，否则此字段为必填

可变参数：支持 requiredUnless('status', ['draft'], 'message') 或 requiredUnless('status', 'draft')。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$anotherField` | `string` | — | 另一个字段名 |
| `$values` | `array|string` | — | 指定值或值列表 |
| `$message` | `string` | `""` | 校验失败报错信息 |

## 同目录

- [Rule](/php/api/foundation/validation/rule)
- [RuleInterface](/php/api/foundation/validation/rule-interface)
- [Rules](/php/api/foundation/validation/rules)
- [Validator](/php/api/foundation/validation/validator)

