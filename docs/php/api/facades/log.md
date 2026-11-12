# Log

`kernel\Facades\Log`  ·  class

源码：`gstudio_kernel/Facades/Log.php`

> 日志门面

## 声明

```php
class Log extends Facade
```

父类：[Facade](/php/api/foundation/facade/facade)

## 概述

转发到当前应用的 `LogProvider` 实例：与 `$app->make(LogProvider::class)`、
`$app->log()` 是同一份，级别过滤与目录归属都跟着那个应用走。

日志目录按归属应用的 `Data/Logs` 计算，因此 DiscuzX 下落到 `gstudio_xxx/Data/Logs`。
使用前无需装配——[App](/php/api/foundation/app) 构造时已登记该服务；
其它应用容器里同样可用，只是写到各自目录。

## 转发方法

门面通过 `__callStatic` 转发到实例，以下为可用的静态方法：

| 签名 | 说明 |
|---|---|
| `level($level = null)` | 设置或读取最小记录级别 |
| `record($content, $level = "info")` | 按指定级别记录 |
| `info($message, $context = [])` | 记录 info |
| `warning($message, $context = [])` | 记录 warning |
| `error($message, $context = [])` | 记录 error |
| `debug($message, $context = [])` | 记录 debug |
| `read($day = null, $month = null, $year = null)` | 读取日志 |
| `page($page = 1, $pageSize = 20, $day = null, $month = null, $year = null)` | 分页读取 |
| `cleanup($days = 30)` | 清理指定天数前的日志 |

## 方法

本类没有公开方法。

## 非公开方法

**protected**

- `protected static function resolve()` —— 容器键：日志服务实例（应用级）

## 同目录

- [Cache](/php/api/facades/cache)
- [Config](/php/api/facades/config)
- [Crons](/php/api/facades/crons)

