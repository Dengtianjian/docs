# AbilityBaseObject

`kernel\Foundation\Object\AbilityBaseObject`  ·  class

源码：`gstudio_kernel/Foundation/Object/AbilityBaseObject.php`

> 能力基础对象 适用于作为提供功能、能力类的基类，为实例提供一套统一的"错误状态机制"

## 声明

```php
class AbilityBaseObject extends BaseObject
```

父类：`BaseObject`

## 概述

用法（典型流程）：
1. 在方法内部遇到失败时，用 break() 记录错误状态并中断当前方法（返回 false）；
2. 需要对外输出结果时，用 return() 把当前错误状态打包成一个 Result 交给调用方；
3. 调用方可通过 isError()/getError() 或 Result 的判态方法消费结果。

与 Result 的分工：
- AbilityBaseObject 是"实例级错误状态机"，用于在方法执行过程中累积并中断错误；
- Result 是"独立值对象"，用于承载一次调用的最终结果（成功或失败），供调用方消费。
- 两者不冲突、互补：内部用 break() 设状态 + 中断，末尾用 return() 打包成 Result 输出。

继承说明：纯静态 Service 类不应依赖这套实例错误机制（静态上下文无 $this）。

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$error` | `boolean` | protected | 是否有错误 |
| `$errorCode` | `int` | protected | 错误码 |
| `$errorMessage` | `string` | protected | 错误信息 |
| `$errorStatusCode` | `int` | protected | HTTP响应状态码 |
| `$errorDetails` | `mixed` | protected | 错误详情 |
| `$errorData` | `mixed` | protected | 错误数据 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__get()`](#__get) | 魔术读取方法 |
| [`__isset()`](#__isset) | 魔术 isset 判断 |
| [`getErrorMessage()`](#geterrormessage) | — |
| [`getErrorCode()`](#geterrorcode) | — |
| [`getStatusCode()`](#getstatuscode) | — |
| [`getErrorDetails()`](#geterrordetails) | — |
| [`getErrorData()`](#geterrordata) | — |
| [`getError()`](#geterror) | — |
| [`isError()`](#iserror) | — |
| [`resetError()`](#reseterror) | — |

### __get()

```php
public function __get($name)
```

魔术读取方法

允许外部以属性方式读取 protected 错误字段（如 Controller 中的 $this->platform->error）。
仅对真实存在的属性生效，访问不存在的属性返回 null 而非触发警告。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string` | — | 属性名 |

### __isset()

```php
public function __isset($name)
```

魔术 isset 判断

与 __get 配套，保证 isset($obj->error) 等判断行为一致。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string` | — | 属性名 |

### getErrorMessage()

```php
public function getErrorMessage()
```

### getErrorCode()

```php
public function getErrorCode()
```

### getStatusCode()

```php
public function getStatusCode()
```

### getErrorDetails()

```php
public function getErrorDetails()
```

### getErrorData()

```php
public function getErrorData()
```

### getError()

```php
public function getError()
```

### isError()

```php
public function isError()
```

### resetError()

```php
public function resetError()
```

## 非公开方法

**protected**

- `protected function setError($statusCode = 500, $code = 500, $message = "error", $details = [], $data = [])`
- `protected function forwardBreak()`

## 同目录

- [BaseObject](/php/api/foundation/object/base-object)
- [DataObject](/php/api/foundation/object/data-object)
- [ReadonlyDataObject](/php/api/foundation/object/readonly-data-object)

