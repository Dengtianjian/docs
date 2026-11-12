# Numeric

`kernel\Foundation\Data\Numeric`  ·  class

源码：`gstudio_kernel/Foundation/Data/Numeric.php`

> 数值工具类

## 声明

```php
class Numeric
```

## 概述

提供数值转换、范围判断/钳制、四舍五入、格式化、百分比、字节可读化等
一系列静态工具方法。全部方法无需实例化即可调用。

方法分为以下几组：
- 转换：       val
- 范围判断：   isBetween、clamp
- 精度：       roundTo
- 格式化：     format、percentage、fixedDecimals、padDecimals、bytesToHuman

## 方法一览

| 方法 | 说明 |
|---|---|
| [`val()`](#val) | 将目标变量转为数值（int 或 float） |
| [`isBetween()`](#isbetween) | 判断值是否位于指定范围 [min, max]（闭区间） |
| [`clamp()`](#clamp) | 将值钳制在 [min, max] 区间内 |
| [`roundTo()`](#roundto) | 四舍五入到指定小数位 |
| [`format()`](#format) | 格式化数值（千分位分隔 + 指定小数位） |
| [`percentage()`](#percentage) | 计算百分比 |
| [`fixedDecimals()`](#fixeddecimals) | 截断到指定小数位，不四舍五入，返回数值 |
| [`padDecimals()`](#paddecimals) | 截断到指定小数位，不足补零，返回字符串 |
| [`bytesToHuman()`](#bytestohuman) | 将字节数转换为人类可读格式 |

### val()

```php
public static function val($Target)
```

将目标变量转为数值（int 或 float）

- null → 0
- 数值字符串 "123" → 123、"3.14" → 3.14
- 非数值的标量通过 intval/floatval 兜底转换

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$Target` | `mixed` | — | 目标变量 |

### isBetween()

```php
public static function isBetween($value, $min, $max): bool
```

判断值是否位于指定范围 [min, max]（闭区间）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `int|float` | — | 待判断的值 |
| `$min` | `int|float` | — | 最小值 |
| `$max` | `int|float` | — | 最大值 |

返回：`bool` —— bool

### clamp()

```php
public static function clamp($value, $min, $max)
```

将值钳制在 [min, max] 区间内

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `int|float` | — | 原始值 |
| `$min` | `int|float` | — | 最小值 |
| `$max` | `int|float` | — | 最大值 |

### roundTo()

```php
public static function roundTo($value, $decimals = 0): float
```

四舍五入到指定小数位

PHP 原生 round() 的便捷封装，统一参数命名风格。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `float` | — | 要舍入的值 |
| `$decimals` | `int` | `0` | 小数位数，默认 0 |

返回：`float` —— float

### format()

```php
public static function format($value, $decimals = 2, $decPoint = '.', $thousandsSep = ','): string
```

格式化数值（千分位分隔 + 指定小数位）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `float` | — | 数值 |
| `$decimals` | `int` | `2` | 小数位数，默认 2 |
| `$decPoint` | `string` | `'.'` | 小数点字符，默认 '.' |
| `$thousandsSep` | `string` | `'` | 千分位分隔符，默认 ',' |
| `$'` | `mixed` | — | — |

返回：`string` —— string 格式化后的数字字符串

### percentage()

```php
public static function percentage($value, $total, $decimals = 2): float
```

计算百分比

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `int|float` | — | 分子 |
| `$total` | `int|float` | — | 分母（总额） |
| `$decimals` | `int` | `2` | 小数位数，默认 2 |

返回：`float` —— float 百分比数值，例如 28.57（表示 28.57%）

### fixedDecimals()

```php
public static function fixedDecimals($value, $decimals = 2)
```

截断到指定小数位，不四舍五入，返回数值

直接舍弃超出的位数，不做进位处理。结果为整数时返回 int，否则返回 float。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `float` | — | 原始数值 |
| `$decimals` | `int` | `2` | 保留的小数位数，默认 2 |

### padDecimals()

```php
public static function padDecimals($value, $decimals = 2): string
```

截断到指定小数位，不足补零，返回字符串

与 fixedDecimals 相同的截断逻辑，但保证始终输出 exact N 位小数。
适用于价格展示等需要固定位数的字符串场景。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `float` | — | 原始数值 |
| `$decimals` | `int` | `2` | 小数位数，默认 2 |

返回：`string` —— string 格式化后的数字字符串

### bytesToHuman()

```php
public static function bytesToHuman($bytes, $decimals = 2): string
```

将字节数转换为人类可读格式

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$bytes` | `int|float` | — | 字节数 |
| `$decimals` | `int` | `2` | 小数位数，默认 2 |

返回：`string` —— string 可读字符串，例如 "1.50 MB"

## 同目录

- [Arr](/php/api/foundation/data/arr)
- [Date](/php/api/foundation/data/date)
- [Func](/php/api/foundation/data/func)
- [Money](/php/api/foundation/data/money)
- [Mutator](/php/api/foundation/data/mutator)
- [Serializer](/php/api/foundation/data/serializer)
- [Str](/php/api/foundation/data/str)
- [Transform](/php/api/foundation/data/transform)

