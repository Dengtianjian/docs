# Money

`kernel\Foundation\Data\Money`  ·  class

源码：`gstudio_kernel/Foundation/Data/Money.php`

> 货币工具类

## 声明

```php
class Money
```

## 概述

提供元/分互转、折扣、税费、中文大写等货币相关静态方法。全部方法无需实例化即可调用。

方法分为以下几组：
- 转换：       fenToYuan、yuanToFen、yuan
- 计算：       discount、tax
- 格式化：     toChinese

## 方法一览

| 方法 | 说明 |
|---|---|
| [`fenToYuan()`](#fentoyuan) | 分转元 |
| [`yuanToFen()`](#yuantofen) | 元转分 |
| [`yuan()`](#yuan) | 元转显示字符串 |
| [`discount()`](#discount) | 折扣计算 |
| [`tax()`](#tax) | 税费计算 |
| [`toChinese()`](#tochinese) | 转中文大写金额 |

### fenToYuan()

```php
public static function fenToYuan($fen): float
```

分转元

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$fen` | `int|float` | — | 金额（分） |

返回：`float` —— float 金额（元）

### yuanToFen()

```php
public static function yuanToFen($yuan): int
```

元转分

不四舍五入：截断到分，超出 2 位小数的部分直接舍弃。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$yuan` | `int|float` | — | 金额（元） |

返回：`int` —— int 金额（分）

### yuan()

```php
public static function yuan($yuan): string
```

元转显示字符串

输出带 ¥ 符号、固定 2 位小数的字符串，适合直接渲染到页面。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$yuan` | `int|float` | — | 金额（元） |

返回：`string` —— string 如 "¥1.23"

### discount()

```php
public static function discount($yuan, $percent): float
```

折扣计算

按百分比计算折后金额，截断到分（不四舍五入）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$yuan` | `int|float` | — | 原价（元） |
| `$percent` | `int|float` | — | 折扣，如 8.5 表示 8.5 折 |

返回：`float` —— float 折后价（元）

### tax()

```php
public static function tax($yuan, $rate): float
```

税费计算

按税率计算税费，截断到分（不四舍五入）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$yuan` | `int|float` | — | 金额（元） |
| `$rate` | `int|float` | — | 税率百分比，如 6 表示 6%，13 表示 13% |

返回：`float` —— float 税费（元）

### toChinese()

```php
public static function toChinese($yuan): string
```

转中文大写金额

将元为单位的金额转为财务中文大写，符合发票、合同等正式场景。

规则：
- 元后无角分 → 加"整"
- 有角无分 → 末尾不补
- 角为零分非零 → 角位补"零"

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$yuan` | `int|float` | — | 金额（元） |

返回：`string` —— string 如 "壹拾贰元叁角肆分"

## 非公开方法

**private**

- `private static function _integerToChinese(int $num, array $digits): string` —— 整数部分转中文大写

## 同目录

- [Arr](/php/api/foundation/data/arr)
- [Date](/php/api/foundation/data/date)
- [Func](/php/api/foundation/data/func)
- [Mutator](/php/api/foundation/data/mutator)
- [Numeric](/php/api/foundation/data/numeric)
- [Serializer](/php/api/foundation/data/serializer)
- [Str](/php/api/foundation/data/str)
- [Transform](/php/api/foundation/data/transform)

