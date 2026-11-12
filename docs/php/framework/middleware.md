# 中间件

中间件在路由命中后、控制器执行前后运行，构成洋葱模型。基类是 `kernel\Foundation\Middleware\MiddlewareBase`。

## 写一个中间件

```php
namespace myapp\Middlewares;

use kernel\Foundation\Middleware\MiddlewareBase;
use kernel\Foundation\HTTP\Response;

class GlobalCorsMiddleware extends MiddlewareBase
{
  public function handle($next): Response
  {
    // 前置逻辑...

    $Response = $next();   // 放行到下一层（控制器 + 内层中间件）

    // 后置逻辑（$next 返回之后）...
    return Cors::applyTo($Response, $this->getOrigin());
  }
}
```

- 构造函数拿到 `$request` 与 `$controller`，需要什么从构造注入；
- `handle($next)` 必须 `return $next()` 或返回 `Response`。

## 登记：全局

在装配类里登记，执行顺序即登记顺序：

```php
$this->app()->middleware()->set(\myapp\Middlewares\GlobalAuthMiddleware::class);
$this->app()->middleware()->set(\myapp\Middlewares\GlobalCorsMiddleware::class);
```

`set($classOrClosure, $executeParams = null, $alias = null)` 支持类名、闭包，可带别名。

## 登记：路由级

路由链式声明：

```php
Route::get("/admin", AdminController::class)
  ->middleware([AuthMiddleware::class]);
```

执行时按键名（别名或类名）查找；未注册的类名会直接实例化。

## 执行顺序

`App::runMiddleware()` 调 `Middleware::execute($route['middlewares'], $controller, $onion)`，洋葱内层依次执行：

```
before() → data()（或指定方法）→ after()
```

字符串中间件以 `new $class($request, $controller)` 实例化后 `handle(...$params, $next)`；闭包则注入 request 后调用。
