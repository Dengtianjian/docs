# Func

`kernel\Foundation\Data\Func`  ·  class

源码：`gstudio_kernel/Foundation/Data/Func.php`

> 可调用值工具类

## 声明

```php
class Func
```

## 概述

处理「一个值能不能当函数/方法调用」这类判断。全部方法无需实例化即可调用。

方法分为以下几组：
- 判定：      isSafeCallable

## 方法一览

| 方法 | 说明 |
|---|---|
| [`isSafeCallable()`](#issafecallable) | 判断值是否为可安全调用的 callable |

### isSafeCallable()

```php
public static function isSafeCallable($value, array $whitelist = []): bool
```

判断值是否为可安全调用的 callable

字符串只在白名单内才算可调用，避免把任意字符串当成函数名。

数组**不能直接交给 is_callable**：它把 `[字符串, 字符串]` 一律当作 `[类名, 方法名]`，
首元素会被送去自动加载。Discuz 的 core::autoload → core::import() 在目标文件不存在时
直接 break() 输出「Oops! System file lost」，于是一句普通的 `where("groupid", ["3", "4"])`
会变成整站 500。这里只认两元结构 `[对象|类名, 方法名]`，且类名只在**已加载**时认可
（`class_exists($name, false)` 不触发自动加载）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `mixed` | — | 待判断的值 |
| `$whitelist` | `array` | `[]` | 允许的字符串函数名白名单 |

返回：`bool` —— bool

## 同目录

- [Arr](/php/api/foundation/data/arr)
- [Date](/php/api/foundation/data/date)
- [Money](/php/api/foundation/data/money)
- [Mutator](/php/api/foundation/data/mutator)
- [Numeric](/php/api/foundation/data/numeric)
- [Serializer](/php/api/foundation/data/serializer)
- [Str](/php/api/foundation/data/str)
- [Transform](/php/api/foundation/data/transform)

