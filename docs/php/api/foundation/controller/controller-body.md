# ControllerBody

`kernel\Foundation\Controller\ControllerBody`  ·  class

源码：`gstudio_kernel/Foundation/Controller/ControllerBody.php`

> 控制器 Body 参数处理器

## 声明

```php
class ControllerBody extends RequestBody
```

父类：[RequestBody](/php/api/foundation/http/request/request-body)

## 概述

继承 [RequestBody](/php/api/foundation/http/request/request-body)，作为框架在控制器上下文中处理请求体（POST/PUT/PATCH）参数的专用载体。

与 `ControllerQuery` 的取舍不同：本类先调用父类 `RequestBody::__construct` 完成 mutator/validator
的初始化，再以 `$request->body`（框架封装后的请求体组件）覆盖 `data`，确保数据类型转换与
`Controller::body()` 读取到的内容一致。

构造时应用子类声明的 `$bodyMutator`（类型转换）与 `$bodyValidator`（校验规则），
校验结果写入 `validatedResult`，供 `Controller::before()` 拦截使用。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 构造 Body 参数处理器 |

### __construct()

```php
public function __construct(Request $request, $bodyMutator = null, $bodyValidator = null)
```

构造 Body 参数处理器

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$request` | `Request` | — | 当前请求对象（从中提取封装后的 body 数据） |
| `$bodyMutator` | `mixed` | `null` | 请求体类型转换规则（同 RequestData 的 mutator） |
| `$bodyValidator` | `mixed` | `null` | 请求体校验规则（同 RequestData 的 validator） |

## 同目录

- [AuthController](/php/api/foundation/controller/auth-controller)
- [Controller](/php/api/foundation/controller/controller)
- [ControllerQuery](/php/api/foundation/controller/controller-query)
- [ControllerResponse](/php/api/foundation/controller/controller-response)

