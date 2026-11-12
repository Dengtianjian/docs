# ErrorCode

`kernel\Foundation\Exception\ErrorCode`  ·  class

源码：`gstudio_kernel/Foundation/Exception/ErrorCode.php`

> 错误码注册器（门面）

## 声明

```php
class ErrorCode
```

## 概述

提供静态注册表：把业务错误码按 name 注册到进程内静态池，提供 find/exists/register/clear 等
查询与维护方法。所有错误码对象统一为 `ErrorCode` 真类，便于 IDE 提示与类型推断。

典型用法：

ErrorCode::load($appRoot . '/Configs/errorCodes.php');
throw new Error("用户不存在", 404, ErrorCode::find('USER_NOT_FOUND')->errorCode, ErrorCode::find('USER_NOT_FOUND'));

错误码文件要求 `return array＜string, ErrorCode＞`（每个元素都是 ErrorCode 实例）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `static $errorCodes` | `array` | `[]` | 已注册错误码对象池 |
| `$name` | `string` | — | 错误码名称（唯一标识） |
| `$statusCode` | `int` | — | HTTP 状态码 |
| `$errorCode` | `int|string` | — | 业务错误码 |
| `$message` | `string` | — | 错误描述 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`load()`](#load) | 从 PHP 文件批量加载错误码 |
| [`register()`](#register) | 注册一条错误码 |
| [`find()`](#find) | 按 name 取错误码对象 |
| [`exists()`](#exists) | 按 name 探测错误码是否存在 |
| [`remove()`](#remove) | 移除一条错误码 |
| [`all()`](#all) | 取全部已注册错误码 |
| [`clear()`](#clear) | 清空错误码池（主要给单元测试使用） |
| [`create()`](#create) | 工厂方法：构造错误码对象 |
| [`__construct()`](#__construct) | 构造错误码对象 |

### load()

```php
public static function load($filePath)
```

从 PHP 文件批量加载错误码

文件必须 `return array`，元素均为 `ErrorCode` 实例或 [statusCode, errorCode, message] 三元组（向后兼容字段模式）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$filePath` | `string` | — | 错误码注册文件绝对路径 |

可能抛出：

- [Error](/php/api/foundation/exception/error) 文件不存在、文件 return 非数组、注册项格式无效时抛出

### register()

```php
public static function register($nameOrCodeObject, $statusCode = null, $errorCode = null, $message = null)
```

注册一条错误码

支持两种调用：
register(ErrorCode $obj)
register(string $name, int $statusCode, int|string $errorCode, string $message)

重复 name 第二次注册会覆盖第一次并触发 warning（PHP user warning，不阻断流程），便于调试。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$nameOrCodeObject` | `ErrorCode|string` | — | 错误码对象或字符串 name |
| `$statusCode` | `int|null` | `null` | HTTP 状态码（对象模式忽略） |
| `$errorCode` | `int|string|null` | `null` | 业务错误码（对象模式忽略） |
| `$message` | `string|null` | `null` | 错误描述（对象模式忽略） |

### find()

```php
public static function find($name)
```

按 name 取错误码对象

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string` | — | 错误码 name |

可能抛出：

- [Error](/php/api/foundation/exception/error) name 不存在时抛出

### exists()

```php
public static function exists($name)
```

按 name 探测错误码是否存在

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string` | — | 错误码 name |

### remove()

```php
public static function remove($name)
```

移除一条错误码

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string` | — | 错误码 name |

### all()

```php
public static function all()
```

取全部已注册错误码

### clear()

```php
public static function clear()
```

清空错误码池（主要给单元测试使用）

### create()

```php
public static function create($name, $statusCode, $errorCode, $message)
```

工厂方法：构造错误码对象

等价调用 `ErrorCode::__construct`，便于链式写法的语义统一。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string` | — | 错误码 name（必填） |
| `$statusCode` | `int` | — | HTTP 状态码 |
| `$errorCode` | `int|string` | — | 业务错误码 |
| `$message` | `string` | — | 错误描述 |

### __construct()

```php
public function __construct($name, $statusCode, $errorCode, $message)
```

构造错误码对象

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string` | — | 错误码 name（必填） |
| `$statusCode` | `int` | — | HTTP 状态码 |
| `$errorCode` | `int|string` | — | 业务错误码 |
| `$message` | `string` | — | 错误描述 |

## 同目录

- [Error](/php/api/foundation/exception/error)
- [ExceptionHandler](/php/api/foundation/exception/exception-handler)

