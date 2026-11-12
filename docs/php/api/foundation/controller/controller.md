# Controller

`kernel\Foundation\Controller\Controller`  ·  class

源码：`gstudio_kernel/Foundation/Controller/Controller.php`

> 控制器基类

## 声明

```php
class Controller extends AbilityBaseObject
```

父类：[AbilityBaseObject](/php/api/foundation/object/ability-base-object)

## 概述

所有业务控制器的抽象基类，封装了完整的请求-响应处理流程。

## 核心属性速览
| 属性 | 类型 | 作用 |
|------|------|------|
| `$requestQuery` / `$requestBody` | ControllerQuery / ControllerBody | 封装后的 GET / Body 参数处理器（含校验结果） |
| `$requestQuerySerializes` / `$requestBodySerializes` | array\|Mutator\|null | GET / Body 参数的类型转换规则，null 表示不转换 |
| `$requestQueryValidator` / `$requestBodyValidator` | array\|Validator\|null | GET / Body 参数的校验规则，null 表示不校验 |
| `$responseSerializes` | array\|string\|Mutator\|Serializer\|null | 响应数据的序列化规则，null 表示原样输出 |
| `$allowedTransformers` | string[] | 允许客户端通过 `_transform` 参数调用的数据变换器白名单 |
| `$request` | Request | 当前请求对象（含原始 query/body/路由 params） |
| `$response` | Response | 响应对象，生命周期内可被替换 |

## 生命周期
```
__construct  →  boot  →  before  →  data (或自定义 handle)  →  after
```
1. **构造阶段** — 初始化 requestQuery/requestBody，执行参数校验与类型转换
2. **boot**          — 子类初始化钩子（在 query/body 处理之后触发）
3. **before**        — 校验拦截：query/body 校验失败则设 response 为错误并终止后续流程
4. **data / handle** — 业务逻辑入口，子类必须覆盖
5. **after**         — 响应后处理：执行 Transform 数据变换、Serializer 序列化

## 子类配置
子类可通过覆盖以下属性控制请求/响应行为：
- `$requestQuerySerializes` / `$requestBodySerializes` — 对 GET/Body 参数做类型转换
- `$requestQueryValidator` / `$requestBodyValidator`   — 对 GET/Body 参数做校验
- `$responseSerializes` — 对响应数据做序列化输出
- `$allowedTransformers` — 允许客户端通过 _transform 参数调用的数据变换器

## data() 返回值约定
- `null` / `array` / `object` → 直接作为响应数据
- `Response` 实例（如 success/fail 返回） → 替换当前 response
- `Result` 实例 → 直接作为响应数据
- `ResponsePagination` 实例 → 直接作为分页响应数据

## 快速响应
- `$this->success($data)` → 成功响应
- `$this->fail($statusCode, $code, $message)` → 错误响应

## 示例

```php
__construct  →  boot  →  before  →  data (或自定义 handle)  →  after
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$response` | `ControllerResponse` | — | 响应对象 |

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$requestQuery` | `ControllerQuery` | protected | GET 参数处理器 |
| `$requestQuerySerializes` | `array` | protected | GET 参数序列化规则 |
| `$requestQueryValidator` | `array` | protected | GET 参数校验规则 |
| `$requestBody` | `ControllerBody` | protected | Body 参数处理器 |
| `$requestBodySerializes` | `array` | protected | Body 参数序列化规则 |
| `$requestBodyValidator` | `array` | protected | Body 参数校验规则 |
| `$responseSerializes` | `array` | protected | 响应数据序列化规则 |
| `$allowedTransformers` | `string[]` | protected | 允许的数据变换器 |
| `$request` | `Request` | protected | 当前请求对象 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 构造控制器实例 |
| [`before()`](#before) | — |
| [`after()`](#after) | — |

### __construct()

```php
public function __construct(Request $request)
```

构造控制器实例

执行顺序：
1. 注入 Request 并初始化空 Response
2. 用子类配置的序列化/校验规则构造 requestQuery（处理 GET 参数）
3. 用子类配置的序列化/校验规则构造 requestBody（处理 Body 参数）
4. 调用 boot() 钩子

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$request` | `Request` | — | — |

### before()

```php
public function before()
```

### after()

```php
public function after()
```

## 非公开方法

**protected**

- `protected function boot()` —— 子类初始化钩子
- `protected function params($key = null, $default = null)` —— 获取路由参数（URL 中的占位符，如 /post/{id} 中的 id）
- `protected function body($key = null, $default = null)` —— 获取 Body 参数（POST/PUT/PATCH 请求体）
- `protected function query($key = null, $default = null)` —— 获取 Query 参数（URL ? 后的 GET 参数）
- `protected function rawBody($key = null, $default = null)` —— 获取原始 Body 参数（未经类型转换和校验）
- `protected function rawQuery($key = null, $default = null)` —— 获取原始 Query 参数（未经类型转换和校验）
- `protected function success($data = null, $statusCode = 200, $code = 200, $message = "ok")` —— 构建成功响应
- `protected function fail(int $statusCode = 500, $code = "500:ServerError", string $message = "error", $details = [], $data = []): Response` —— 构建错误响应

**private**

- `private function serialization()` —— 响应数据序列化
- `private function transform()` —— 数据变换

## 同目录

- [AuthController](/php/api/foundation/controller/auth-controller)
- [ControllerBody](/php/api/foundation/controller/controller-body)
- [ControllerQuery](/php/api/foundation/controller/controller-query)
- [ControllerResponse](/php/api/foundation/controller/controller-response)

