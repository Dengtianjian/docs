# Date

`kernel\Foundation\Data\Date`  ·  class

源码：`gstudio_kernel/Foundation/Data/Date.php`

> 时间工具类

## 声明

```php
class Date
```

## 概述

提供高精度时间戳获取（微秒/毫秒）、单位转换、时间差与耗时、
字符串解析与格式化等静态工具方法。全部方法无需实例化即可调用。

方法分为以下几组：
- 时间戳获取： microseconds、milliseconds
- 单位转换：   secondsToMilliseconds、millisecondsToSeconds
- 时间差耗时： elapsed、diff、humanize
- 解析格式化： parse、format

## 方法一览

| 方法 | 说明 |
|---|---|
| [`microseconds()`](#microseconds) | 获取当前时间戳（秒，微秒精度） |
| [`milliseconds()`](#milliseconds) | 获取当前时间戳（毫秒，整数） |
| [`secondsToMilliseconds()`](#secondstomilliseconds) | 秒级时间戳转毫秒级 |
| [`millisecondsToSeconds()`](#millisecondstoseconds) | 毫秒级时间戳转秒级 |
| [`elapsed()`](#elapsed) | 获取自某个时间点（毫秒）以来的耗时 |
| [`diff()`](#diff) | 计算两个毫秒时间戳之间的差值 |
| [`humanize()`](#humanize) | 将毫秒耗时格式化为人类可读字符串 |
| [`parse()`](#parse) | 将字符串时间解析为秒级时间戳 |
| [`format()`](#format) | 格式化时间戳为时间字符串 |
| [`now()`](#now) | 当前日期时间 |
| [`today()`](#today) | 当前日期（`Y-m-d`） |

### microseconds()

```php
public static function microseconds(): float
```

获取当前时间戳（秒，微秒精度）

返回：`float` —— float 当前时间戳，例如 1786635816.234411

### milliseconds()

```php
public static function milliseconds(): int
```

获取当前时间戳（毫秒，整数）

返回：`int` —— int 当前时间戳，例如 1786635816234

### secondsToMilliseconds()

```php
public static function secondsToMilliseconds($seconds): int
```

秒级时间戳转毫秒级

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$seconds` | `int|float` | — | 秒级时间戳 |

返回：`int` —— int 毫秒级时间戳

### millisecondsToSeconds()

```php
public static function millisecondsToSeconds($milliseconds): float
```

毫秒级时间戳转秒级

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$milliseconds` | `int|float` | — | 毫秒级时间戳 |

返回：`float` —— float 秒级时间戳（毫秒精度）

### elapsed()

```php
public static function elapsed(int $startMs): int
```

获取自某个时间点（毫秒）以来的耗时

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$startMs` | `int` | — | 起点毫秒时间戳（通常由 Date::milliseconds() 记录） |

返回：`int` —— int 距当前毫秒差

### diff()

```php
public static function diff(int $startMs,$endMs = null): int
```

计算两个毫秒时间戳之间的差值

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$startMs` | `int` | — | 起点毫秒时间戳 |
| `$endMs` | `int|null` | `null` | 终点毫秒时间戳，默认当前毫秒时间戳 |

返回：`int` —— int 毫秒差（负数表示 $endMs 早于 $startMs）

### humanize()

```php
public static function humanize($ms): string
```

将毫秒耗时格式化为人类可读字符串

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$ms` | `int|float` | — | 毫秒数 |

返回：`string` —— string 可读耗时，如 "832ms"、"1.3s"、"2m 5s"、"1h 30m"、"2d 5h"

### parse()

```php
public static function parse($str)
```

将字符串时间解析为秒级时间戳

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$str` | `string` | — | 可被 strtotime 解析的时间字符串，如 "2026-08-13 10:00:00" |

### format()

```php
public static function format($timestamp = null, $format = "Y-m-d H:i:s"): string
```

格式化时间戳为时间字符串

自动识别秒级与毫秒级时间戳（毫秒级约 1e12，秒级约 1e9）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$timestamp` | `int|float|null` | `null` | 时间戳（秒级或毫秒级），默认当前时间 |
| `$format` | `string` | `"Y-m-d H:i:s"` | date() 格式化字符串 |

返回：`string` —— string 格式化后的时间字符串

### now()

```php
public static function now($format = "Y-m-d H:i:s"): string
```

当前日期时间

等价于 `date($format)`——把「当前时间格式化」收进本类，取代原来的全局函数 `now()`。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$format` | `string` | `"Y-m-d H:i:s"` | date() 格式化字符串 |

返回：`string` —— string

### today()

```php
public static function today(): string
```

当前日期（`Y-m-d`）

取代原来的全局函数 `today()`。

返回：`string` —— string

## 同目录

- [Arr](/php/api/foundation/data/arr)
- [Func](/php/api/foundation/data/func)
- [Money](/php/api/foundation/data/money)
- [Mutator](/php/api/foundation/data/mutator)
- [Numeric](/php/api/foundation/data/numeric)
- [Serializer](/php/api/foundation/data/serializer)
- [Str](/php/api/foundation/data/str)
- [Transform](/php/api/foundation/data/transform)

