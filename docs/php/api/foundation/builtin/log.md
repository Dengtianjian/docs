# Log

`kernel\Foundation\Builtin\Log`  ·  class

源码：`gstudio_kernel/Foundation/Builtin/Log.php`

> 日志服务（应用级）

## 声明

```php
class Log extends AbilityBaseObject
```

父类：[AbilityBaseObject](/php/api/foundation/object/ability-base-object)

## 概述

与应用同属一份：日志目录按归属应用的 `Data/Logs` 计算，级别过滤也是每个应用各自的状态。
归属由容器绑定（`bindApp()`），本类没有构造参数；静态写法用门面 [Log](/php/api/facades/log)，
与 `$app->log()` / `$app->make(LogProvider::class)` 是同一份实例。

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$minLevel` | `string|null` | private | 最小记录级别（null 表示不限制，全部记录） 可选值：debug / info / warning / error |
| `$levels` | `mixed` | private | 级别优先级（数值越大越严重） |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`level()`](#level) | 设置或读取最小记录级别 |
| [`record()`](#record) | 记录日志 |
| [`info()`](#info) | 记录 info 级别日志 |
| [`warning()`](#warning) | 记录 warning 级别日志 |
| [`error()`](#error) | 记录 error 级别日志 |
| [`debug()`](#debug) | 记录 debug 级别日志 |
| [`read()`](#read) | 读取日志 |
| [`page()`](#page) | 分页读取指定日期的日志内容 |
| [`cleanup()`](#cleanup) | 清理指定天数前的日志文件（含空目录回收） |

### level()

```php
public function level($level = null)
```

设置或读取最小记录级别

低于该级别的日志将被忽略（record 返回 false）。
传 null（或不传参数）时读取当前级别；初始为 null 表示不限制。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$level` | `string|null` | `null` | 级别：debug / info / warning / error，null 时读取 |

### record()

```php
public function record($content, $level = "info")
```

记录日志

根据当前年/月创建目录，以日创建 .jsonl 文件，每行一条单行 JSON 日志：
{"time":"Y-m-d H:i:s","level":"info","content":...}

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$content` | `mixed` | — | 记录内容：数组/对象自动转 JSON，Throwable 转 message+file+trace |
| `$level` | `string` | `"info"` | 日志级别：debug / info / warning / error，默认 info |

### info()

```php
public function info($message, $context = [])
```

记录 info 级别日志

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$message` | `mixed` | — | 日志消息 |
| `$context` | `array` | `[]` | 附加上下文，会自动并入日志内容 |

### warning()

```php
public function warning($message, $context = [])
```

记录 warning 级别日志

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$message` | `mixed` | — | 日志消息 |
| `$context` | `array` | `[]` | 附加上下文，会自动并入日志内容 |

### error()

```php
public function error($message, $context = [])
```

记录 error 级别日志

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$message` | `mixed` | — | 日志消息 |
| `$context` | `array` | `[]` | 附加上下文，会自动并入日志内容 |

### debug()

```php
public function debug($message, $context = [])
```

记录 debug 级别日志

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$message` | `mixed` | — | 日志消息 |
| `$context` | `array` | `[]` | 附加上下文，会自动并入日志内容 |

### read()

```php
public function read($day = null, $month = null, $year = null)
```

读取日志

参数组合决定返回结构：
- 三个参数均不传：当年月份目录列表
- 只传 $year：该年月份目录列表
- 传 $year + $month（不传 $day）：该月日志文件列表
- 全部传入：该日逐条解析后的日志（每项含 time/level/content）
兼容读取旧版 .yml 文件（"时间: 内容" 行格式）。非法日期或未来日期返回空数组。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$day` | `int|null` | `null` | 日（1-31），null 表示不指定到日（返回该月日志文件列表） |
| `$month` | `int|null` | `null` | 月（1-12），null 表示不指定到月（返回该年月份目录列表） |
| `$year` | `int|null` | `null` | 年，null 为当年 |

### page()

```php
public function page($page = 1, $pageSize = 20, $day = null, $month = null, $year = null)
```

分页读取指定日期的日志内容

基于 read() 读取当日全部日志后按页码切片，返回包含列表与分页信息的结果数组。
日期行为与 read() 一致：$day 为 null 时取当天，$month 为 null 时取当月，$year 为 null 时取当年。
页码或每页条数小于 1 时按 1 处理；当日无日志时返回空的 list 与 totalPages=0。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$page` | `int` | `1` | 页码，从 1 开始，默认 1 |
| `$pageSize` | `int` | `20` | 每页条数，默认 20 |
| `$day` | `int|null` | `null` | 日（1-31），null 为当天 |
| `$month` | `int|null` | `null` | 月（1-12），null 为当月 |
| `$year` | `int|null` | `null` | 年，null 为当年 |

### cleanup()

```php
public function cleanup($days = 30)
```

清理指定天数前的日志文件（含空目录回收）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$days` | `int` | `30` | 保留天数，默认 30 |

## 非公开方法

**private**

- `private function generateLogPath(...$paths)` —— 生成日志文件路径
- `private function basePath()` —— 日志存储根目录（固定为 Data/Logs，不可修改）
- `private function buildContent($message, $context)` —— 组装消息与上下文
- `private function parseLogFile($file)` —— 解析日志文件（单行 JSON 优先，兼容旧版行格式）

## 同目录

- [Cache](/php/api/foundation/builtin/cache)
- [Config](/php/api/foundation/builtin/config)
- [Deployment](/php/api/foundation/builtin/deployment)
- [Event](/php/api/foundation/builtin/event)
- [Lifecycle](/php/api/foundation/builtin/lifecycle)

