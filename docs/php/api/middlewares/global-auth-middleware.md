# GlobalAuthMiddleware

`kernel\Middlewares\GlobalAuthMiddleware`  ·  class

源码：`gstudio_kernel/Middlewares/GlobalAuthMiddleware.php`

> 全局认证中间件

## 声明

```php
class GlobalAuthMiddleware extends MiddlewareBase
```

父类：[MiddlewareBase](/php/api/foundation/middleware/middleware-base)

## 概述

从 Authorization 头取 token，校验 logins 表，把结果写入 [Auth](/php/api/modules/auth/auth)（登录态由 AuthModule 持有）
——只写上下文，不碰服务状态，也不把「当前用户」缓存到任何静态变量里。

中间件由 [AuthProvider](/php/api/modules/auth/auth-provider) 的构造函数按运行环境挂上
（DiscuzX 下换成 [GlobalDiscuzXAuthMiddleware](/php/api/discuzx/middlewares/global-discuz-x-auth-middleware)）。

注意：中间件是 `new $class($request, $controller)` 直接实例化的（见
`\kernel\Foundation\Middleware\Middleware::executeMiddleware`），不走容器注入，
因此这里用 `Applications::default()` 取当前应用，再取上下文 / 服务。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`handle()`](#handle) | 中间件处理：校验通过后执行业务逻辑，并为响应补充 Authorization 头 |

### handle()

```php
public function handle(\Closure $next)
```

中间件处理：校验通过后执行业务逻辑，并为响应补充 Authorization 头

后置注入——先 $next() 执行后续逻辑拿到 Response，再统一写入鉴权头，
不绕过框架的响应头管理（避免直接调用全局 header()）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$next` | `\Closure` | — | — |

## 非公开方法

**protected**

- `protected function app()` —— 当前应用实例
- `protected function verifyToken($strongCheck = true)` —— 验证token
- `protected function applyAuthHeader(Response $response): Response` —— 为响应补充 Authorization 头（后置注入）

## 同目录

- [GlobalCorsMiddleware](/php/api/middlewares/global-cors-middleware)

