# Result

`kernel\Support\Result`  ·  class

源码：`gstudio_kernel/Support/Result.php`

> 调用结果（Result）

## 声明

```php
class Result extends Response
```

父类：[Response](/php/api/foundation/http/response)

## 概述

用于在服务、方法、类等被调用方返回调用结果时，将「业务结果数据 + HTTP 响应」合二为一：
- 被调用方：返回一个 Result 实例，成功时携带数据，失败时携带错误码、错误信息、错误详情
- 调用方：通过 `isError()`/`isSuccess()` 判断成败；若不再对错误做进一步处理，
可直接将当前实例 `return` 给控制器，因为它继承自 Response，控制器可原样透传输出

相比「返回 false/true/数字标识」的方案，Result 让被调用方负责构建错误响应，
而把「错误要不要抛出」的决定权留给调用方，便于复用。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 构建一个调用结果 |
| [`succeeded()`](#succeeded) | 静态工厂：快速创建成功结果 |
| [`failed()`](#failed) | 静态工厂：快速创建失败结果 |
| [`result()`](#result) | 获取成功态的处理结果（无论成败都返回主体数据，请结合 isError()/isSuccess() 使用） |
| [`isError()`](#iserror) | 判断是否为失败结果 |
| [`isSuccess()`](#issuccess) | 判断是否为成功结果 |
| [`withData()`](#withdata) | 追加数据到主体（链式）。主体为数组时做合并，否则追加 |
| [`withMessage()`](#withmessage) | 设置响应信息（链式） |
| [`errorMessage()`](#errormessage) | 获取失败的错误信息（成功态返回 null） |
| [`errorStatusCode()`](#errorstatuscode) | 获取失败的 HTTP 状态码（成功态返回 null） |
| [`errorCode()`](#errorcode) | 获取失败的错误码（成功态返回 null） |
| [`errorDetails()`](#errordetails) | 获取失败的错误详情（成功态返回 null） 开发模式下若未显式传入详情，会自动附带调用栈，便于定位问题 |
| [`throwError()`](#throwerror) | 抛出错误。会抛出 kernel\Foundation\Exception\Error 并终止程序 若当前不是错误态，则直接返回实例本身，避免误抛假异常 |
| [`throwErrorIf()`](#throwerrorif) | 条件抛出错误：仅当 $condition 为真且当前为错误态时抛出 |
| [`getStatusCode()`](#getstatuscode) | 获取 HTTP 状态码（无论成败，均返回当前值） |
| [`getCode()`](#getcode) | 获取响应码（无论成败，均返回当前值） |
| [`getMessage()`](#getmessage) | 获取响应信息（无论成败，均返回当前值） |
| [`getData()`](#getdata) | 获取响应数据 |
| [`hasData()`](#hasdata) | 判断指定键（支持点号语法）是否存在于主体数据中 |
| [`getResult()`](#getresult) | 获取结果 有错误时返回默认值；否则返回结果数据（指定键时区分「键存在但为 null」与「键不存在」） |
| [`getBody()`](#getbody) | 获取输出的主体（在开发模式下，错误态未显式设置详情时自动补充调用栈） |
| [`toArray()`](#toarray) | 将当前结果序列化为响应体数组结构 |
| [`toJson()`](#tojson) | 将当前结果序列化为 JSON 字符串 |

### __construct()

```php
public function __construct($result, $errorStatusCode = null, $errorCode = 500, $errorMessage = "error", $errorDetails = null)
```

构建一个调用结果

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$result` | `mixed` | — | 结果数据（成功态为业务数据；错误态为错误时的主体数据） |
| `$errorStatusCode` | `integer|null` | `null` | HTTP 状态码，>299 视为失败并自动进入错误态；null 或不传表示成功 |
| `$errorCode` | `integer|string` | `500` | 错误码 |
| `$errorMessage` | `string` | `"error"` | 错误信息 |
| `$errorDetails` | `mixed` | `null` | 错误详情（仅开发模式输出） |

### succeeded()

```php
public static function succeeded($data = null, $statusCode = 200, $code = 200, $message = "ok")
```

静态工厂：快速创建成功结果

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `mixed` | `null` | 返回的数据 |
| `$statusCode` | `int` | `200` | HTTP 状态码 |
| `$code` | `int|string` | `200` | 响应码 |
| `$message` | `string` | `"ok"` | 响应信息 |

### failed()

```php
public static function failed($statusCode = 400, $code = "400:FAIL", $message = "error", $details = null, $result = null)
```

静态工厂：快速创建失败结果

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$statusCode` | `int` | `400` | HTTP 状态码，默认 400 |
| `$code` | `int|string` | `"400:FAIL"` | 错误码 |
| `$message` | `string` | `"error"` | 错误信息 |
| `$details` | `mixed` | `null` | 错误详情 |
| `$result` | `mixed` | `null` | 失败时的主体数据（可选，默认 null） |

### result()

```php
public function result()
```

获取成功态的处理结果（无论成败都返回主体数据，请结合 isError()/isSuccess() 使用）

### isError()

```php
public function isError()
```

判断是否为失败结果

### isSuccess()

```php
public function isSuccess()
```

判断是否为成功结果

### withData()

```php
public function withData($data, $cover = false)
```

追加数据到主体（链式）。主体为数组时做合并，否则追加

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `mixed` | — | 追加的数据 |
| `$cover` | `bool` | `false` | 是否覆盖已有主体数据 |

### withMessage()

```php
public function withMessage($message)
```

设置响应信息（链式）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$message` | `string` | — | 响应信息 |

### errorMessage()

```php
public function errorMessage()
```

获取失败的错误信息（成功态返回 null）

### errorStatusCode()

```php
public function errorStatusCode()
```

获取失败的 HTTP 状态码（成功态返回 null）

### errorCode()

```php
public function errorCode()
```

获取失败的错误码（成功态返回 null）

### errorDetails()

```php
public function errorDetails()
```

获取失败的错误详情（成功态返回 null） 开发模式下若未显式传入详情，会自动附带调用栈，便于定位问题

### throwError()

```php
public function throwError()
```

抛出错误。会抛出 kernel\Foundation\Exception\Error 并终止程序 若当前不是错误态，则直接返回实例本身，避免误抛假异常

### throwErrorIf()

```php
public function throwErrorIf($condition = true)
```

条件抛出错误：仅当 $condition 为真且当前为错误态时抛出

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$condition` | `bool` | `true` | 触发条件，默认 true |

### getStatusCode()

```php
public function getStatusCode()
```

获取 HTTP 状态码（无论成败，均返回当前值）

### getCode()

```php
public function getCode()
```

获取响应码（无论成败，均返回当前值）

### getMessage()

```php
public function getMessage()
```

获取响应信息（无论成败，均返回当前值）

### getData()

```php
public function getData($key = null)
```

获取响应数据

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$key` | `string|null` | `null` | 指定键的数据；不传或传 null 返回全部数据 |

### hasData()

```php
public function hasData($key = null)
```

判断指定键（支持点号语法）是否存在于主体数据中

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$key` | `string|null` | `null` | 键名，支持点号语法（如 user.profile.name） |

### getResult()

```php
public function getResult($key = null, $default = null)
```

获取结果 有错误时返回默认值；否则返回结果数据（指定键时区分「键存在但为 null」与「键不存在」）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$key` | `string|null` | `null` | 指定键的数据；不传或传 null 返回全部结果 |
| `$default` | `mixed` | `null` | 错误态、或指定键不存在、或整体数据为空时返回的默认值 |

### getBody()

```php
public function getBody()
```

获取输出的主体（在开发模式下，错误态未显式设置详情时自动补充调用栈）

### toArray()

```php
public function toArray()
```

将当前结果序列化为响应体数组结构

### toJson()

```php
public function toJson($flags = JSON_UNESCAPED_UNICODE)
```

将当前结果序列化为 JSON 字符串

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$flags` | `int` | `JSON_UNESCAPED_UNICODE` | json_encode 的 flags，默认 JSON_UNESCAPED_UNICODE |

可能抛出：

- `\RuntimeException` 当序列化失败（如数据含非法 UTF-8）时抛出，避免静默返回 false

## 非公开方法

**private**

- `private function buildBacktrace($skipFrames = 0)` —— 构建错误调用栈，并按需裁剪内部方法帧
- `private function onlyError($field)` —— 私有辅助：仅在错误态时返回指定响应字段，否则返回 null

## 同目录

- [Language](/php/api/support/language)
- [Output](/php/api/support/output)

