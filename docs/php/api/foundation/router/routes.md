# Routes

`kernel\Foundation\Router\Routes`  ·  class

源码：`gstudio_kernel/Foundation/Router/Routes.php`

> 路由表集合（静态容器）

## 声明

```php
class Routes
```

## 概述

静态持有全部已注册的 RouteRegister（$routes 实例表）。push / remove 仅维护
实例表；分发的三表（$staticRoutes / $paramRoutes / $named）由 distribute() 在
读取时统一重建。

承载全部路由表的分发与匹配（以静态属性替代已被移除的 RouteCollection 实例）。

## 常量

| 常量 | 值 | 说明 |
|---|---|---|
| `PLACEHOLDER` | `'/\{(\??)(\w+)(?::([^}]+))?\}/'` | URI 动态参数占位符正则（唯一来源） |

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$routes` | `mixed` | protected | 原始注册器表（push 顺序，数值键） |
| `$staticRoutes` | `mixed` | protected | 静态路由定义表：domain => method => uri => 定义（无动态参数，domain 用 "*" 表示全局） |
| `$paramRoutes` | `mixed` | protected | 动态路由定义表：domain => method => uri => 定义（含 {} 参数，domain 用 "*" 表示全局） |
| `$named` | `mixed` | protected | 命名路由索引：路由名 => 路由定义（无名称的路由不入表） |
| `$fallback` | `mixed` | protected | fallback 兜底路由表：domain => 路由定义（每域名一个；不入 static/param 表） |
| `$patterns` | `mixed` | protected | 全局路由参数格式约束：参数名 => 正则（一次定义全局生效，路由自身 where 优先覆盖） |
| `$dirty` | `mixed` | protected | 分表脏标记：实例表/全局约束变更后置真，distribute() 仅在其为真时全量重建 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`compilePattern()`](#compilepattern) | 编译带动态占位符的 URI 为完整匹配正则 |
| [`extractParams()`](#extractparams) | 解析 URI 动态参数映射（参数名 => 正则） |
| [`push()`](#push) | 追加路由到路由表（仅维护实例表，不重建分表） |
| [`remove()`](#remove) | 从路由表移除指定路由（仅维护实例表，不重建分表） |
| [`clear()`](#clear) | 清空路由表与分表 |
| [`pattern()`](#pattern) | 定义全局路由参数格式约束（一次定义，对后续所有路由生效） |
| [`patterns()`](#patterns) | 读取全部全局参数格式约束 |
| [`tables()`](#tables) | 导出完整路由定义表（静态 + 动态，每项为 resolve() 产物） |
| [`find()`](#find) | 按路由名读取路由定义 |
| [`url()`](#url) | 按路由名反向生成 URL |

### compilePattern()

```php
public static function compilePattern($uri, $params)
```

编译带动态占位符的 URI 为完整匹配正则

将 `{param}` / `{param:regex}` / `{?param[:regex]}` 替换为命名捕获组正则，
以 "#^...$#" 包裹返回。$params 为「参数名 => 正则」约束（where / 全局 pattern
合并结果），同名优先于内联正则；$params 缺省键时回退内联正则或默认 [^/]+。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$uri` | `string` | — | 含占位符的 URI |
| `$params` | `array` | — | 参数名 => 正则 约束映射 |

### extractParams()

```php
public static function extractParams($uri, $where)
```

解析 URI 动态参数映射（参数名 => 正则）

与 compilePattern 共用 PLACEHOLDER，解析规则一致：where 约束优先于 URI 内联
正则，缺省回退 [^/]+。支持 `{param:regex}` / `{param}` / `{?param[:regex]}`。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$uri` | `string` | — | 含占位符的 URI |
| `$where` | `array` | — | 参数约束（where / 全局 pattern 合并） |

### push()

```php
public static function push(RouteRegister $RR)
```

追加路由到路由表（仅维护实例表，不重建分表）

分表由 distribute() 在读取时统一重建（脏标记触发）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$RR` | `RouteRegister` | — | — |

### remove()

```php
public static function remove(RouteRegister $RR)
```

从路由表移除指定路由（仅维护实例表，不重建分表）

按实例严格匹配移除；分表由 distribute() 在读取时统一重建（脏标记触发）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$RR` | `RouteRegister` | — | — |

### clear()

```php
public static function clear()
```

清空路由表与分表

### pattern()

```php
public static function pattern($name, $regex = null)
```

定义全局路由参数格式约束（一次定义，对后续所有路由生效）

与路由自身 where 同名时，路由 where 优先覆盖全局约束；可作为 URI 内联
正则（`{id:...}`）的全局默认。支持单条 `pattern('id', '[0-9]+')` 或
批量 `pattern(['id' => '[0-9]+', 'slug' => '[a-z-]+'])`。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string|array` | — | 参数名（字符串）或 参数名=>正则 映射（数组） |
| `$regex` | `string|null` | `null` | 当 $name 为字符串时必填的正则 |

### patterns()

```php
public static function patterns()
```

读取全部全局参数格式约束

### tables()

```php
public static function tables()
```

导出完整路由定义表（静态 + 动态，每项为 resolve() 产物）

结构：domain => method => uri => 路由定义（三层索引）。domain 键为路由生效
域名（全局路由为 "*"），method 键照注册方法名（get/post/...），any 用 "*"。
同 uri 下 get 与 post、以及不同域名下同 uri 可各自独立定义。
每项含：name / method / uri（已拼组前缀）/ controller /
middlewares / parameters / where / params（动态参数正则）/ append / domain。

### find()

```php
public static function find($name)
```

按路由名读取路由定义

先 distribute() 重建分表与命名索引，再按名读取。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string` | — | 路由名 |

### url()

```php
public static function url($name, $params = [], $domain = null, $https = false)
```

按路由名反向生成 URL

先 distribute() 重建命名索引，按名取出路由定义后：
- 用 $params 中同名值替换 URI 占位符 `{name}` / `{name:regex}`；必选参数缺失抛异常，
可选参数 `{?name}` 缺省则留空（多余空段自动归一化）
- 路径参数值经 rawurlencode 编码（避免 `/ ? # 空格` 破坏 URL）
- 未在 URI 中消费的 $params 键值拼成查询串 `?k=v&...`（值经 urlencode）
- 传 $domain 时生成绝对 URL（scheme://host/path），否则返回相对路径

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

## 非公开方法

**protected**

- `protected static function domains($domain)` —— 域名查找序：指定域名优先，未命中回退全局（"*"）
- `protected static function distribute()` —— 分发：遍历全部注册器，逐条 resolve 重建分表与命名索引
- `protected static function matchParam($def, $uri)` —— 编译动态路由定义并匹配 URI

## 同目录

- [Route](/php/api/foundation/router/route)
- [RouteDomain](/php/api/foundation/router/route-domain)
- [RouteGroup](/php/api/foundation/router/route-group)
- [RouteRegister](/php/api/foundation/router/route-register)
- [RouteSame](/php/api/foundation/router/route-same)
- [Router](/php/api/foundation/router/router)

