# Middleware

`kernel\Foundation\Middleware\Middleware`  ·  class

源码：`gstudio_kernel/Foundation/Middleware/Middleware.php`

## 声明

```php
class Middleware
```

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$middlewares` | `array` | protected | 全局中间件列表（关联数组：键名 => 中间件定义） |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 构建中间件管理器 |
| [`set()`](#set) | 注册全局中间件 |
| [`execute()`](#execute) | 执行中间件链（全局中间件 + 路由级中间件，洋葱模型） |

### __construct()

```php
public function __construct()
```

构建中间件管理器

### set()

```php
public function set($classOrFun, $executeParams = null, $alias = null)
```

注册全局中间件

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$classOrFun` | `\Closure|object|string` | — | 中间件类或者函数 |
| `$executeParams` | `array` | `null` | 执行中间件时传入的参数 |
| `$alias` | `string|null` | `null` | 中间件别名（可选，用于键名和路由引用） |

### execute()

```php
public function execute($routeMiddlewares, Controller $controller, \Closure $callback)
```

执行中间件链（全局中间件 + 路由级中间件，洋葱模型）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$routeMiddlewares` | `array|null` | — | 路由级中间件列表（类名或别名） |
| `$controller` | `Controller` | — | 控制器实例 |
| `$callback` | `\Closure` | — | 最内层回调（执行业务逻辑） |

## 非公开方法

**protected**

- `protected function resolveKey($classOrFun, $alias = null)` —— 生成中间件键名

**private**

- `private function executeMiddleware($middlewares, Controller $controller, \Closure $callback)` —— 递归执行中间件链

## 同目录

- [MiddlewareBase](/php/api/foundation/middleware/middleware-base)

