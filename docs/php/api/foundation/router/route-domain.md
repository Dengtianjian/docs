# RouteDomain

`kernel\Foundation\Router\RouteDomain`  ·  class

源码：`gstudio_kernel/Foundation/Router/RouteDomain.php`

## 声明

```php
class RouteDomain extends RouteRegister
```

父类：`RouteRegister`

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | — |
| [`group()`](#group) | 域名组内含子组 + 读取所属组（双语义，兼容父类 getter） |
| [`same()`](#same) | 域名组内含 same + 读取所属 same（双语义） |
| [`get()`](#get) | — |
| [`post()`](#post) | — |
| [`put()`](#put) | — |
| [`patch()`](#patch) | — |
| [`delete()`](#delete) | — |
| [`head()`](#head) | — |
| [`options()`](#options) | — |
| [`any()`](#any) | — |
| [`fallback()`](#fallback) | 域名组内 fallback 兜底路由（仅该域名及回退全局未命中时命中） |

### __construct()

```php
public function __construct($domain, $callback, $same = null, $group = null)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$domain` | `mixed` | — | — |
| `$callback` | `mixed` | — | — |
| `$same` | `mixed` | `null` | — |
| `$group` | `mixed` | `null` | — |

### group()

```php
public function group($prefix = null, $callback = null)
```

域名组内含子组 + 读取所属组（双语义，兼容父类 getter）

- 无参调用：读取当前域名组所属的父组（继承 RouteRegister::group() getter 语义）
- 传 prefix + callback：创建子组，子组通过其 group 位引用当前域名组，
resolve() 沿祖先链继承当前域名的 domain 与子组前缀。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$prefix` | `string|null` | `null` | 子组前缀 |
| `$callback` | `callable|null` | `null` | 子组回调（注入子 RouteGroup） |

### same()

```php
public function same($uri = null, $callback = null)
```

域名组内含 same + 读取所属 same（双语义）

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

域名组内 fallback 兜底路由（仅该域名及回退全局未命中时命中）

叶子以当前域名组为其 group 位，resolve() 沿祖先链继承 domain；不限定
方法/URI，仅标记 fallback。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$controller` | `string|array|\Closure|null` | `null` | 兜底控制器/闭包 |

## 非公开方法

**private**

- `private function leaf($uri, $method, $controller)` —— 域名组内叶子 DSL 公共构造：生成归属当前域名组的路由载体

## 同目录

- [Route](/php/api/foundation/router/route)
- [RouteGroup](/php/api/foundation/router/route-group)
- [RouteRegister](/php/api/foundation/router/route-register)
- [RouteSame](/php/api/foundation/router/route-same)
- [Router](/php/api/foundation/router/router)
- [Routes](/php/api/foundation/router/routes)

