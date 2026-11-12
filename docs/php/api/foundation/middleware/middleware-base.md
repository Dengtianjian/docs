# MiddlewareBase

`kernel\Foundation\Middleware\MiddlewareBase`  ·  class

源码：`gstudio_kernel/Foundation/Middleware/MiddlewareBase.php`

## 声明

```php
class MiddlewareBase
```

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$request` | `Request` | protected | 请求实例 |
| `$controller` | `Controller|AuthController|\Closure|null` | protected | 控制器实例 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 中间件基类构造函数 |

### __construct()

```php
public function __construct(Request $request, $controller = null)
```

中间件基类构造函数

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$request` | `Request` | — | 请求实例 |
| `$controller` | `Controller|AuthController|\Closure|null` | `null` | 控制器实例，闭包路由时为 null |

## 同目录

- [Middleware](/php/api/foundation/middleware/middleware)

