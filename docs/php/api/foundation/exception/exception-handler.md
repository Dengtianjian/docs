# ExceptionHandler

`kernel\Foundation\Exception\ExceptionHandler`  ·  class

源码：`gstudio_kernel/Foundation/Exception/ExceptionHandler.php`

> 全局异常 / 错误处理器（静态门面）

## 声明

```php
class ExceptionHandler
```

## 概述

专门用于 `set_exception_handler()` 与 `set_error_handler()` 回调：

set_exception_handler('kernel\Foundation\Exception\ExceptionHandler::receive');
set_error_handler('kernel\Foundation\Exception\ExceptionHandler::handle', E_ALL);

调用链与分流：

PHP 未捕获异常 → receive() ─┐
├→ handle() → 判级 → 写日志 →（致命时）输出响应 → exit(1)
PHP 错误 / 警告 → handle() ─┘

设计要点：
- 静态门面以兼容 PHP SAPI 直接注册；不存储任何实例状态
- 主流程分两步：判级 → 分派（写日志 + 期望 JSON 则输出 JSON 或渲染错误页 → exit）
- 所有内部副作用都包在 try/catch 中，防止 handler 自身抛错被 PHP 钩子再次回调形成死循环
- 不假设运行环境完整：App 未实例化、Config 未装配、Request 不可用时都要能兜底输出

## 相关

- [Error](/php/api/foundation/exception/error) 业务异常（可携带 HTTP 状态码与业务错误码）

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `static $fatalLevels` | `int[]` | `[ E_ERROR, E_CORE_ERROR, E_COMPILE_ERROR`… | 致命错误级别（命中即写日志 + 输出响应 + exit） |
| `static $warningLevels` | `int[]` | `[ E_WARNING, E_CORE_WARNING, E_COMPILE_W`… | 警告 / 通知级别（命中仅写日志，不中断请求） |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`handle()`](#handle) | 处理错误信号（错误处理回调 + 内部统一分派入口） |
| [`receive()`](#receive) | 接受 Throwable，由 set_exception_handler 调用 |

### handle()

```php
public static function handle($code = 0, $message = "", $file = "", $line = 0, $trace = [], $traceString = null, $previous = null, $statusCode = 500, $errorCode = 500, $errorDetails = null, $directlyThrow = false)
```

处理错误信号（错误处理回调 + 内部统一分派入口）

两个调用来源：
1. PHP 的 `set_error_handler()` 直接回调 —— 只会传前 4 个形参（$code/$message/$file/$line），
其余取默认值，此时 $directlyThrow 为 false，按 PHP 错误号判级；
2. `receive()` 内部调用 —— 11 个形参全部由业务显式传入，且 $directlyThrow 为 true（一律按致命处理）。

处理顺序：判级 → 命中日志级别则写日志 → 非致命直接 return → 致命时按客户端期望输出 JSON 或渲染错误页 → exit(1)。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$code` | `int` | `0` | PHP 错误号（如 E_WARNING）；异常路径下为 `Throwable::getCode()` |
| `$message` | `string` | `""` | 错误信息 |
| `$file` | `string` | `""` | 出错源文件 |
| `$line` | `int` | `0` | 出错行号 |
| `$trace` | `array` | `[]` | 调用栈数组。注意：经 set_error_handler 触发时，该位由 PHP 传入的内容在不同 |
| `$traceString` | `string|null` | `null` | 格式化后的调用栈字符串（`Throwable::getTraceAsString()`） |
| `$previous` | `Throwable|null` | `null` | 链式异常的上一个异常（仅 receive 路径有值） |
| `$statusCode` | `int` | `500` | HTTP 状态码，默认 500 |
| `$errorCode` | `int|string` | `500` | 业务错误码，默认 500 |
| `$errorDetails` | `mixed` | `null` | 错误详情（`Error` 取其 errorDetails，其它异常取调用栈） |
| `$directlyThrow` | `bool` | `false` | 是否无视错误级别直接按致命处理（receive 默认 true，set_error_handler 默认 false） |

### receive()

```php
public static function receive($exception)
```

接受 Throwable，由 set_exception_handler 调用

从异常对象提取信息后转交 handle()，并以 `$directlyThrow = true` 强制走致命分支
（能冒到这里说明业务没有处理它，不再区分错误级别）。

状态码 / 业务码的来源：
- `kernel\Foundation\Exception\Error`（同命名空间，无需 use）→ 取其 statusCode / errorCode / errorDetails；
- 其它异常 → 统一 500 / 500，并把调用栈放进 $errorDetails。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$exception` | `Throwable` | — | 未捕获的异常或错误；传入非 Throwable 时直接忽略（防御 PHP 钩子传入意外值） |

## 非公开方法

**private**

- `private static function mode(): string` —— 安全获取运行模式，配置未装配时默认为 development
- `private static function writeLog($code, string $message, string $file, int $line, array $trace, $traceString, $previous, bool $isFatal)` —— 写日志
- `private static function respondJson($statusCode, $errorCode, string $message, $errorDetails, $code, string $file, int $line, array $trace, $traceString, $previous)` —— 输出 JSON 错误响应（客户端期望 JSON 时）
- `private static function renderView($statusCode, $errorCode, string $message, $errorDetails, $code, string $file, int $line, array $trace, $traceString, $previous)` —— 渲染错误视图（客户端不期望 JSON 时）

## 同目录

- [Error](/php/api/foundation/exception/error)
- [ErrorCode](/php/api/foundation/exception/error-code)

