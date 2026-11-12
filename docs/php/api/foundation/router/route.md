# Route

`kernel\Foundation\Router\Route`  ·  class

源码：`gstudio_kernel/Foundation/Router/Route.php`

> 路由定义门面（Route 类）

## 声明

```php
class Route
```

## 概述

静态入口，用于以链式/声明式方式定义路由。所有方法返回一个路由注册器实例
（RouteRegister / RouteGroup / RouteSame / RouteDomain），可供调用方继续链式
设置（controller / name / middleware / where / append 等），或在 Routes 注册
阶段 push 收集。

四类返回：
- `RouteRegister`：普通路由（Route::get/post/.../any 直接定义）
- `RouteGroup`（路由组）：Route::group，组前缀 + 内部叶子路由
- `RouteSame`（同 URI 注册器）：Route::same，共用 URI 下细分 HTTP 方法的控制器
- `RouteDomain`（域名组）：Route::domain，按生效域名声明路由

完整路径与属性合并遵循「谁先定义谁在前」（外层在前）、并有时 group 优先，
由 RouteRegister::resolve() / resolvedUri() 统一处理。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`get()`](#get) | 注册 GET 路由 |
| [`post()`](#post) | 注册 POST 路由 |
| [`put()`](#put) | 注册 PUT 路由（整体更新） |
| [`patch()`](#patch) | 注册 PATCH 路由（部分更新） |
| [`delete()`](#delete) | 注册 DELETE 路由 |
| [`head()`](#head) | 注册 HEAD 路由（仅返回响应头，无响应体） |
| [`options()`](#options) | 注册 OPTIONS 路由（预检/跨域探测） |
| [`any()`](#any) | 注册 ANY 路由（兜底：任意 HTTP 方法均可命中，含静态与动态） |
| [`group()`](#group) | 注册路由组（组前缀 + 内部叶子路由） |
| [`same()`](#same) | 注册同 URI 注册器（共用 URI 下细分 HTTP 方法） |
| [`fallback()`](#fallback) | 注册 fallback 兜底路由（所有正常路由未命中时命中） |
| [`pattern()`](#pattern) | 定义全局路由参数格式约束（一次定义，对后续所有路由生效） |
| [`domain()`](#domain) | 注册域名组（按生效域名声明路由） |
| [`url()`](#url) | 按路由名反向生成 URL |
| [`redirect()`](#redirect) | 按路由名生成 302 重定向响应 |

### get()

```php
public static function get($uri, $controller = null)
```

注册 GET 路由

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$uri` | `string` | — | 路由 URI，如 "users"、"blog/{id:\d+}" |
| `$controller` | `string|array|\Closure|null` | `null` | 控制器类/`[类,方法]`/闭包，可省略 |

### post()

```php
public static function post($uri, $controller = null)
```

注册 POST 路由

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$uri` | `string` | — | 路由 URI |
| `$controller` | `string|array|\Closure|null` | `null` | 控制器类/`[类,方法]`/闭包，可省略 |

### put()

```php
public static function put($uri, $controller = null)
```

注册 PUT 路由（整体更新）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$uri` | `string` | — | 路由 URI |
| `$controller` | `string|array|\Closure|null` | `null` | 控制器类/`[类,方法]`/闭包，可省略 |

### patch()

```php
public static function patch($uri, $controller = null)
```

注册 PATCH 路由（部分更新）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$uri` | `string` | — | 路由 URI |
| `$controller` | `string|array|\Closure|null` | `null` | 控制器类/`[类,方法]`/闭包，可省略 |

### delete()

```php
public static function delete($uri, $controller = null)
```

注册 DELETE 路由

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$uri` | `string` | — | 路由 URI |
| `$controller` | `string|array|\Closure|null` | `null` | 控制器类/`[类,方法]`/闭包，可省略 |

### head()

```php
public static function head($uri, $controller = null)
```

注册 HEAD 路由（仅返回响应头，无响应体）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$uri` | `string` | — | 路由 URI |
| `$controller` | `string|array|\Closure|null` | `null` | 控制器类/`[类,方法]`/闭包，可省略 |

### options()

```php
public static function options($uri = null, $controller = null)
```

注册 OPTIONS 路由（预检/跨域探测）

未传入控制器时，自动以「空响应（204 No Content）」放行——绝大多数业务对
OPTIONS 预检只需通过、无需返回实体。
- `Route::options("users")`：仅该 URI 的 OPTIONS 请求返回 204；
- `Route::options()`（`$uri` 为 null）：通配任意 URI，全量放行 OPTIONS；
如需自定义预检逻辑，显式传入控制器/闭包即可。
空响应由 `GlobalCorsMiddleware` 等跨域中间件按需补 Access-Control-* 头。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$uri` | `string|null` | `null` | 路由 URI；为 null 时通配全部 URI（全量放行） |
| `$controller` | `string|array|\Closure|null` | `null` | 控制器类/`[类,方法]`/闭包，省略则空响应放行 |

### any()

```php
public static function any($uri, $controller = null)
```

注册 ANY 路由（兜底：任意 HTTP 方法均可命中，含静态与动态）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$uri` | `string` | — | 路由 URI |
| `$controller` | `string|array|\Closure|null` | `null` | 控制器类/`[类,方法]`/闭包，可省略 |

### group()

```php
public static function group($prefix, $callback)
```

注册路由组（组前缀 + 内部叶子路由）

回调内通过注入的 RouteGroup 实例定义叶子路由，组前缀在最终 URI 最前拼接。
组级 name/middleware/where/controller 等可在 RouteGroup 上链式设置，并由叶子
路由经 resolve() 继承。

```
Route::group("api", function ($g) {
$g->get("users", UserController::class);   // uri = api/users
$g->group("v1", function ($g2) {           // 组中组
$g2->get("posts", PostController::class); // uri = api/v1/posts
});
});
```

```php
Route::group("api", function ($g) {
$g->get("users", UserController::class);   // uri = api/users
$g->group("v1", function ($g2) {           // 组中组
$g2->get("posts", PostController::class); // uri = api/v1/posts
});
});
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$prefix` | `string` | — | 组前缀（相对路径段） |
| `$callback` | `callable` | — | 组回调，注入当前组实例 RouteGroup |

### same()

```php
public static function same($uri, $callback)
```

注册同 URI 注册器（共用 URI 下细分 HTTP 方法）

回调内通过注入的 RouteSame 实例为同一 URI 定义不同方法的控制器，叶子 URI 由
resolvedUri() 沿祖先链拼接得到。

```
Route::same("links/{id}", function ($rs) {
$rs->get(ShowLinkController::class);    // GET  /links/{id}
$rs->put(UpdateLinkController::class);  // PUT  /links/{id}
$rs->delete(RemoveLinkController::class);// DELETE /links/{id}
});
```

```php
Route::same("links/{id}", function ($rs) {
$rs->get(ShowLinkController::class);    // GET  /links/{id}
$rs->put(UpdateLinkController::class);  // PUT  /links/{id}
$rs->delete(RemoveLinkController::class);// DELETE /links/{id}
});
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$uri` | `string` | — | 共用 URI（相对路径段） |
| `$callback` | `callable` | — | 回调，注入当前同 URI 实例 RouteSame |

### fallback()

```php
public static function fallback($controller = null, $domain = null)
```

注册 fallback 兜底路由（所有正常路由未命中时命中）

不限定 URI 与 HTTP 方法，作为任意请求的最终兜底（可用于返回 404 页面、
统一异常响应等）。支持链式设置 controller / middleware / where 等。

默认定义全局兜底；传 $domain 则仅对该域名（及回退全局）生效。
也可放在 Route::domain 组内（经 $d->fallback），语义相同。

```
Route::fallback(NotFoundController::class);
Route::fallback(ApiNotFoundController::class, "api.example.com"); // 仅 api 域名兜底
Route::domain("api.example.com", function ($d) {
$d->fallback(ApiNotFoundController::class);                     // 等价写法
});
```

```php
Route::fallback(NotFoundController::class);
Route::fallback(ApiNotFoundController::class, "api.example.com"); // 仅 api 域名兜底
Route::domain("api.example.com", function ($d) {
$d->fallback(ApiNotFoundController::class);                     // 等价写法
});
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$controller` | `string|array|\Closure|null` | `null` | 兜底控制器/闭包 |
| `$domain` | `string|null` | `null` | 生效域名（null = 全局兜底） |

### pattern()

```php
public static function pattern($name, $regex = null)
```

定义全局路由参数格式约束（一次定义，对后续所有路由生效）

与路由自身 where 同名时，路由 where 优先覆盖；可作为 URI 内联正则的
全局默认。支持单条或批量：

```
Route::pattern('id', '[0-9]+');
Route::pattern(['id' => '[0-9]+', 'slug' => '[a-z-]+']);
Route::get('posts/{id}/edit', EditController::class);  // id 全局约束为数字
```

```php
Route::pattern('id', '[0-9]+');
Route::pattern(['id' => '[0-9]+', 'slug' => '[a-z-]+']);
Route::get('posts/{id}/edit', EditController::class);  // id 全局约束为数字
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string|array` | — | 参数名（字符串）或 参数名=>正则 映射（数组） |
| `$regex` | `string|null` | `null` | 当 $name 为字符串时必填的正则 |

### domain()

```php
public static function domain($domain, $callback)
```

注册域名组（按生效域名声明路由）

回调内通过注入的 RouteDomain 实例定义叶子路由，路由仅在指定域名下命中；
同 URI 在不同域名组可命中不同控制器。未在域名组内的路由对所有域名生效。
域名组内可嵌套 group / same，域名沿祖先链被子路由继承。

```
Route::domain("api.example.com", function ($d) {
$d->get("users", ApiUserController::class);     // 仅 api 域名
});
Route::get("users", WebUserController::class);    // 其他域名
```

```php
Route::domain("api.example.com", function ($d) {
$d->get("users", ApiUserController::class);     // 仅 api 域名
});
Route::get("users", WebUserController::class);    // 其他域名
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$domain` | `string` | — | 生效域名（如 "api.example.com"，不含协议/端口） |
| `$callback` | `callable` | — | 回调，注入当前域名组实例 RouteDomain |

### url()

```php
public static function url($name, $params = [], $domain = null, $https = false)
```

按路由名反向生成 URL

见 Routes::url() 的完整说明。URI 占位符由 $params 同名值填充（值经 rawurlencode），
多余项追加为查询串；必选参数缺失抛 InvalidArgumentException。
传 $domain 时生成绝对 URL（scheme://host/path）。

```
Route::get('users/{id}/posts', PostController::class)->name('user.posts');
Route::url('user.posts', ['id' => 42]);                          // users/42/posts
Route::url('user.posts', ['id' => 42, 'page' => 2]);             // users/42/posts?page=2
Route::url('user.posts', ['id' => 42], 'api.example.com');       // http://api.example.com/users/42/posts
Route::url('user.posts', ['id' => 42], 'api.example.com', true); // https://api.example.com/users/42/posts
```

```php
Route::get('users/{id}/posts', PostController::class)->name('user.posts');
Route::url('user.posts', ['id' => 42]);                          // users/42/posts
Route::url('user.posts', ['id' => 42, 'page' => 2]);             // users/42/posts?page=2
Route::url('user.posts', ['id' => 42], 'api.example.com');       // http://api.example.com/users/42/posts
Route::url('user.posts', ['id' => 42], 'api.example.com', true); // https://api.example.com/users/42/posts
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string` | — | 路由名 |
| `$params` | `array` | `[]` | 路由参数（参数名 => 值）；多出项作为查询串追加 |
| `$domain` | `string|null` | `null` | 域名（非 null 时生成绝对 URL） |
| `$https` | `bool` | `false` | 是否 HTTPS（默认 false = http） |

### redirect()

```php
public static function redirect($name, $params = [])
```

按路由名生成 302 重定向响应

内部调用 url() 生成目标地址，返回 Result 对象（status=302）。
适用于控制器中按命名路由跳转，避免硬编码 URL。

```
Route::get('login', LoginController::class)->name('login');
return Route::redirect('login');                    // 302 到 /login
return Route::redirect('user.posts', ['id' => 42]); // 302 到 /users/42/posts
```

```php
Route::get('login', LoginController::class)->name('login');
return Route::redirect('login');                    // 302 到 /login
return Route::redirect('user.posts', ['id' => 42]); // 302 到 /users/42/posts
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string` | — | 路由名 |
| `$params` | `array` | `[]` | 路由参数 |

## 非公开方法

**private**

- `private static function make($uri, $method, $controller)` —— 构造普通路由注册器（门面各 DSL 的公共实现）

## 同目录

- [RouteDomain](/php/api/foundation/router/route-domain)
- [RouteGroup](/php/api/foundation/router/route-group)
- [RouteRegister](/php/api/foundation/router/route-register)
- [RouteSame](/php/api/foundation/router/route-same)
- [Router](/php/api/foundation/router/router)
- [Routes](/php/api/foundation/router/routes)

