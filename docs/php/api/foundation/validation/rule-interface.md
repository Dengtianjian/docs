# RuleInterface

`kernel\Foundation\Validation\RuleInterface`  ·  interface

源码：`gstudio_kernel/Foundation/Validation/RuleInterface.php`

> 校验规则契约接口

## 声明

```php
interface RuleInterface
```

## 概述

定义所有校验规则方法的完整契约，`RuleBuilder` 为默认实现。
上层通过 `Rule` 门面类调用，实现与具体构建器的解耦。

## 相关

- `RuleBuilder`
- `Rule`
- `Rules`

## 方法一览

| 方法 | 说明 |
|---|---|
| [`required()`](#required) | 校验值是否为空或者为 null |
| [`type()`](#type) | 校验目标值的数据类型是否等于指定数据类型，或是否存在于指定的数据类型数组中 int 自动转为 integer，bool 自动转为 boolean |
| [`equal()`](#equal) | 校验是否等于指定值（严格比较 ===） |
| [`includes()`](#includes) | 校验字符串是否包含子串，或数组是否包含指定元素 |
| [`hasKeys()`](#haskeys) | 校验数组是否存在指定键或指定键数组 |
| [`min()`](#min) | 校验数值是否 >= 指定值 |
| [`max()`](#max) | 校验数值是否 <= 指定值 |
| [`range()`](#range) | 校验数值是否在 [min, max] 范围内 |
| [`minLength()`](#minlength) | 校验字符串/数组长度是否 >= 指定值 |
| [`maxLength()`](#maxlength) | 校验字符串/数组长度是否 <= 指定值 |
| [`length()`](#length) | 校验字符串/数组长度是否在 [min, max] 范围内 |
| [`pattern()`](#pattern) | 正则表达式校验 |
| [`custom()`](#custom) | 自定义校验 |
| [`useRule()`](#userule) | 复用已有的校验规则实例 |
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

### type()

```php
public function type($value, $message = "")
```

校验目标值的数据类型是否等于指定数据类型，或是否存在于指定的数据类型数组中 int 自动转为 integer，bool 自动转为 boolean

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|string[]` | — | 数据类型或数据类型数组 |
| `$message` | `string` | `""` | 校验失败报错信息 |

### equal()

```php
public function equal($value, $message = "")
```

校验是否等于指定值（严格比较 ===）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `mixed` | — | 指定值 |
| `$message` | `string` | `""` | 校验失败报错信息 |

### includes()

```php
public function includes($value, $message = "")
```

校验字符串是否包含子串，或数组是否包含指定元素

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|array` | — | 任意基本类型值或任意基本类型数组 |
| `$message` | `string` | `""` | 校验失败报错信息 |

### hasKeys()

```php
public function hasKeys($value, $message = "")
```

校验数组是否存在指定键或指定键数组

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|string[]` | — | 键或键数组 |
| `$message` | `string` | `""` | 校验失败报错信息 |

### min()

```php
public function min($value, $message = "")
```

校验数值是否 >= 指定值

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `int` | — | 指定的最小值 |
| `$message` | `string` | `""` | 校验失败报错信息 |

### max()

```php
public function max($value, $message = "")
```

校验数值是否 <= 指定值

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `int` | — | 指定的最大值 |
| `$message` | `string` | `""` | 校验失败报错信息 |

### range()

```php
public function range($min, $max, $message = "")
```

校验数值是否在 [min, max] 范围内

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$min` | `int` | — | 最小值 |
| `$max` | `int` | — | 最大值 |
| `$message` | `string` | `""` | 校验失败报错信息 |

### minLength()

```php
public function minLength($value, $message = "")
```

校验字符串/数组长度是否 >= 指定值

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `int` | — | 指定的最小长度 |
| `$message` | `string` | `""` | 校验失败报错信息 |

### maxLength()

```php
public function maxLength($value, $message = "")
```

校验字符串/数组长度是否 <= 指定值

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `int` | — | 指定的最大长度 |
| `$message` | `string` | `""` | 校验失败报错信息 |

### length()

```php
public function length($min, $max, $message = "")
```

校验字符串/数组长度是否在 [min, max] 范围内

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
| `$callback` | `\Closure|callable` | — | 校验函数，返回值必须是继承自 Response 的实例 |

### useRule()

```php
public function useRule(RuleInterface $validateRule)
```

复用已有的校验规则实例

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
- [RuleBuilder](/php/api/foundation/validation/rule-builder)
- [Rules](/php/api/foundation/validation/rules)
- [Validator](/php/api/foundation/validation/validator)

