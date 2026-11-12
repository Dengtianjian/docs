# Error

`kernel\Foundation\Exception\Error`  ·  class

源码：`gstudio_kernel/Foundation/Exception/Error.php`

> 框架业务异常基类

## 声明

```php
class Error extends GlobalException
```

父类：`GlobalException`

## 概述

继承自 PHP 全局 \Exception，并额外携带 HTTP 状态码（statusCode）、
业务错误码（errorCode）与错误详情（errorDetails）三字段。

设计目的：让上层 catch (\Exception) 仍能抓到，但运营侧可通过 statusCode/errorCode
把异常区分成不同的 HTTP 响应。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$statusCode` | `integer` | `500` | HTTP 状态码 |
| `$errorCode` | `integer|string` | `500` | 错误码 |
| `$errorDetails` | `mixed` | `null` | 错误详情 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 抛出异常 |
| [`raise()`](#raise) | 按 ErrorCode name 直接抛出对应错误 |

### __construct()

```php
public function __construct($message = "Server error", $statusCode = 500, $errorCode = 500, $errorDetails = null)
```

抛出异常

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$message` | `string` | `"Server error"` | 错误信息 |
| `$statusCode` | `integer` | `500` | HTTP状态码 |
| `$errorCode` | `integer|string` | `500` | 错误码 |
| `$errorDetails` | `mixed` | `null` | 错误详情 |

### raise()

```php
public static function raise(string $name, $details = null)
```

按 ErrorCode name 直接抛出对应错误

业务方只需告诉框架"抛 USER_NOT_FOUND"，由本方法去 ErrorCode 注册表查
对应的 statusCode/message/errorCode，再构造业务异常抛出。

调用前需先 `ErrorCode::load` 加载错误码配置；name 不存在时抛 500:ErrorCodeNotExist。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string` | — | ErrorCode 注册名（如 "USER_NOT_FOUND"） |
| `$details` | `mixed` | `null` | 业务上下文详情（不入 ErrorCode 注册的，仅 runtime 上下文） |

## 同目录

- [ErrorCode](/php/api/foundation/exception/error-code)
- [ExceptionHandler](/php/api/foundation/exception/exception-handler)

