# RouteGroup

`kernel\Foundation\Router\RouteGroup`  ·  class

源码：`gstudio_kernel/Foundation/Router/RouteGroup.php`

## 声明

```php
class RouteGroup extends RouteRegister
```

父类：`RouteRegister`

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | — |
| [`group()`](#group) | 嵌套子组（组中组）+ 读取所属组（双语义，兼容父类 getter） |
| [`same()`](#same) | 组内含 same（same 中再分 HTTP 方法）+ 读取所属 same（双语义） |
| [`get()`](#get) | — |
| [`post()`](#post) | — |
| [`put()`](#put) | — |
| [`patch()`](#patch) | — |
| [`delete()`](#delete) | — |
| [`head()`](#head) | — |
| [`options()`](#options) | — |
| [`any()`](#any) | — |
| [`fallback()`](#fallback) | 组内 fallback 兜底路由（该组下所有正常路由未命中时命中） |

### __construct()

```php
public function __construct($prefix, $callback, $same = null, $group = null)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$prefix` | `mixed` | — | — |
| `$callback` | `mixed` | — | — |
| `$same` | `mixed` | `null` | — |
| `$group` | `mixed` | `null` | — |

### group()

```php
public function group($prefix = null, $callback = null)
```

嵌套子组（组中组）+ 读取所属组（双语义，兼容父类 getter）

- 无参调用：读取当前组所属的父组（继承 RouteRegister::group() getter 语义）
- 传 prefix + callback：创建子组，子组前缀在当前组前缀之上叠加（mergePath），
生成的子 RouteGroup 作为纯容器供其内部叶子路由通过 group 位引用，
resolvedUri() 取子组 prefix 即得完整前缀。

```
Route::group('api', function ($g) {
$g->group('v1', function ($g2) {
$g2->get('users'); // uri = api/v1/users
});
});
```

```php
Route::group('api', function ($g) {
$g->group('v1', function ($g2) {
$g2->get('users'); // uri = api/v1/users
});
});
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$prefix` | `string|null` | `null` | 子组前缀（相对当前组） |
| `$callback` | `callable|null` | `null` | 子组回调（注入子 RouteGroup） |

### same()

```php
public function same($uri = null, $callback = null)
```

组内含 same（same 中再分 HTTP 方法）+ 读取所属 same（双语义）

- 无参调用：读取当前组所属的 same（交叉嵌套时才有值）
- 传 uri + callback：在组内创建同 URI 注册器，生成的 RouteSame 通过其 group 位
引用当前组，resolvedUri() 组合「组前缀 + same 共用 URI + 叶子 URI」。

```
Route::group('api', function ($g) {
$g->same('users', function ($rs) {
$rs->get(ShowUserController::class); // uri = api/users
});
});
```

```php
Route::group('api', function ($g) {
$g->same('users', function ($rs) {
$rs->get(ShowUserController::class); // uri = api/users
});
});
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$uri` | `string|null` | `null` | 同 URI 基础 |
| `$callback` | `callable|null` | `null` | 同 URI 回调（注入子 RouteSame） |

### get()

```php
public function get($uri = null, $controller = null)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$uri` | `mixed` | `null` | — |
| `$controller` | `mixed` | `null` | — |

### post()

```php
public function post($uri = null, $controller = null)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$uri` | `mixed` | `null` | — |
| `$controller` | `mixed` | `null` | — |

### put()

```php
public function put($uri = null, $controller = null)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$uri` | `mixed` | `null` | — |
| `$controller` | `mixed` | `null` | — |

### patch()

```php
public function patch($uri = null, $controller = null)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$uri` | `mixed` | `null` | — |
| `$controller` | `mixed` | `null` | — |

### delete()

```php
public function delete($uri = null, $controller = null)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$uri` | `mixed` | `null` | — |
| `$controller` | `mixed` | `null` | — |

### head()

```php
public function head($uri = null, $controller = null)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$uri` | `mixed` | `null` | — |
| `$controller` | `mixed` | `null` | — |

### options()

```php
public function options($uri = null, $controller = null)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$uri` | `mixed` | `null` | — |
| `$controller` | `mixed` | `null` | — |

### any()

```php
public function any($uri = null, $controller = null)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$uri` | `mixed` | `null` | — |
| `$controller` | `mixed` | `null` | — |

### fallback()

```php
public function fallback($controller = null)
```

组内 fallback 兜底路由（该组下所有正常路由未命中时命中）

不限定方法/URI；叶子以当前组为其 group 位，resolve() 沿祖先链继承
domain / prefix 等。可配合 Route::domain 声明域名组内专属兜底。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$controller` | `string|array|\Closure|null` | `null` | 兜底控制器/闭包 |

## 非公开方法

**private**

- `private function leaf($uri, $method, $controller)` —— 组内叶子 DSL 公共构造：生成归属当前组的路由载体

## 同目录

- [Route](/php/api/foundation/router/route)
- [RouteDomain](/php/api/foundation/router/route-domain)
- [RouteRegister](/php/api/foundation/router/route-register)
- [RouteSame](/php/api/foundation/router/route-same)
- [Router](/php/api/foundation/router/router)
- [Routes](/php/api/foundation/router/routes)

