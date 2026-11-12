# RouteSame

`kernel\Foundation\Router\RouteSame`  ·  class

源码：`gstudio_kernel/Foundation/Router/RouteSame.php`

> 同 URI 路由注册器（same() 回调首参）

## 声明

```php
class RouteSame extends RouteRegister
```

父类：`RouteRegister`

## 概述

Route::same() 会把共用 URI 交给本实例并作为回调的第一个参数注入，
用于在同一 URI 下以链式方式注册不同 HTTP 方法的控制器。

```
Route::same('links/{id}', function (RouteSame $rs) {
$rs->get(ShowLinkController::class);      // GET    /links/{id}
$rs->put(UpdateLinkController::class);    // PUT    /links/{id}
$rs->delete(RemoveLinkController::class); // DELETE /links/{id}
});
```

支持「same 中 same」（same 的嵌套）：子 same 的 URI 在当前 same 的 URI 之上
叠加（mergePath），并继承父 same 的中间件 / 参数 / 名称 / 控制器等属性。

```
Route::same('users', function ($rs) {
$rs->same('{id}', function ($rs2) {
$rs2->get(ShowUserController::class);      // GET /users/{id}
$rs2->put(UpdateUserController::class);    // PUT /users/{id}
});
});
```

独立于 RouteGroup：RouteGroup 是「路由组」，DSL 收 uri + controller；RouteSame 是
「同 URI 注册器」，共用 URI 已由构造给定，DSL 只收 controller。两者方法同名但
参数语义不同，无法在覆写时兼容，故 RouteSame 不复用 RouteGroup 的 DSL，
直接继承 RouteRegister 独立定义。

## 示例

```php
Route::same('links/{id}', function (RouteSame $rs) {
$rs->get(ShowLinkController::class);      // GET    /links/{id}
$rs->put(UpdateLinkController::class);    // PUT    /links/{id}
$rs->delete(RemoveLinkController::class); // DELETE /links/{id}
});
```

## 示例

```php
Route::same('users', function ($rs) {
$rs->same('{id}', function ($rs2) {
$rs2->get(ShowUserController::class);      // GET /users/{id}
$rs2->put(UpdateUserController::class);    // PUT /users/{id}
});
});
```

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | — |
| [`same()`](#same) | 嵌套子 same + 读取父级 same（双语义，兼容父类 getter） |
| [`group()`](#group) | same 内含 group（同 URI 下细分子组）+ 读取所属组（双语义） |
| [`uri()`](#uri) | 共用 URI（读写一体：无参读取，传值写入返回 $this） |
| [`get()`](#get) | — |
| [`post()`](#post) | — |
| [`put()`](#put) | — |
| [`patch()`](#patch) | — |
| [`delete()`](#delete) | — |
| [`head()`](#head) | — |
| [`options()`](#options) | — |
| [`any()`](#any) | — |
| [`fallback()`](#fallback) | same 内 fallback 兜底路由（该 same 下所有正常路由未命中时命中） |

### __construct()

```php
public function __construct($uri, $callback, $same = null, $group = null)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$uri` | `string` | — | 共用 URI |
| `$callback` | `\Closure` | — | 注册回调（首参为当前 RouteSame 实例） |
| `$same` | `RouteSame|null` | `null` | 父级同 URI 注册器（嵌套 same 时传入） |
| `$group` | `RouteGroup|null` | `null` | 所属组（group 内含 same 时传入） |

### same()

```php
public function same($uri = null, $callback = null)
```

嵌套子 same + 读取父级 same（双语义，兼容父类 getter）

- 无参调用：读取当前 same 所属的父级 same
- 传 uri + callback：创建子 same，子 same 的 URI 在当前 same 之上叠加，
生成的子 RouteSame 作为纯容器供其内部叶子路由通过 same 位引用，
resolvedUri() 取子 same 的 uri 即得完整共用 URI。

```
Route::same('users', function ($rs) {
$rs->same('{id}', function ($rs2) {
$rs2->get(ShowUserController::class); // uri = users/{id}
});
});
```

```php
Route::same('users', function ($rs) {
$rs->same('{id}', function ($rs2) {
$rs2->get(ShowUserController::class); // uri = users/{id}
});
});
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$uri` | `string|null` | `null` | 子 same 的 URI（相对当前 same） |
| `$callback` | `callable|null` | `null` | 子 same 回调（注入子 RouteSame） |

### group()

```php
public function group($prefix = null, $callback = null)
```

same 内含 group（同 URI 下细分子组）+ 读取所属组（双语义）

- 无参调用：读取当前 same 所属的组（交叉嵌套时才有值）
- 传 prefix + callback：在 same 内创建子组，子 RouteGroup 通过其 same 位引用
当前 same，resolvedUri() 组合「组前缀 + same 共用 URI + 叶子 URI」。

```
Route::same('users', function ($rs) {
$rs->group('admin', function ($g) {
$g->get('list', ListAdminController::class); // uri = admin/users/list
});
});
```

```php
Route::same('users', function ($rs) {
$rs->group('admin', function ($g) {
$g->get('list', ListAdminController::class); // uri = admin/users/list
});
});
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$prefix` | `string|null` | `null` | 子组前缀 |
| `$callback` | `callable|null` | `null` | 子组回调（注入子 RouteGroup） |

### uri()

```php
public function uri($value = null)
```

共用 URI（读写一体：无参读取，传值写入返回 $this）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | — |

### get()

```php
public function get($controller = null)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$controller` | `mixed` | `null` | — |

### post()

```php
public function post($controller = null)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$controller` | `mixed` | `null` | — |

### put()

```php
public function put($controller = null)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$controller` | `mixed` | `null` | — |

### patch()

```php
public function patch($controller = null)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$controller` | `mixed` | `null` | — |

### delete()

```php
public function delete($controller = null)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$controller` | `mixed` | `null` | — |

### head()

```php
public function head($controller = null)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$controller` | `mixed` | `null` | — |

### options()

```php
public function options($controller = null)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$controller` | `mixed` | `null` | — |

### any()

```php
public function any($controller = null)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$controller` | `mixed` | `null` | — |

### fallback()

```php
public function fallback($controller = null)
```

same 内 fallback 兜底路由（该 same 下所有正常路由未命中时命中）

不限定方法/URI；叶子以当前 same 为其 same 位、所属组为 group 位，
resolve() 沿祖先链继承 domain 等。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$controller` | `string|array|\Closure|null` | `null` | 兜底控制器/闭包 |

## 非公开方法

**private**

- `private function leaf($method, $controller)` —— 同 URI 叶子 DSL 公共构造：归属当前 same

## 同目录

- [Route](/php/api/foundation/router/route)
- [RouteDomain](/php/api/foundation/router/route-domain)
- [RouteGroup](/php/api/foundation/router/route-group)
- [RouteRegister](/php/api/foundation/router/route-register)
- [Router](/php/api/foundation/router/router)
- [Routes](/php/api/foundation/router/routes)

