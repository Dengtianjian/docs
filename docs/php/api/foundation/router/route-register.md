# RouteRegister

`kernel\Foundation\Router\RouteRegister`  ·  class

源码：`gstudio_kernel/Foundation/Router/RouteRegister.php`

> 单个路由注册器（新 R 路由体系）

## 声明

```php
class RouteRegister
```

## 概述

由 Route::get / post / put / patch / delete / head / options / any 实例化，
作为「单个路由」的定义载体。Route 静态方法已定型路由性质（单路由/组/同 URI），
本类只负责承载并产出单个路由的完整定义（resolve()）。

支持链式补充：

```
Route::get('links', ListLinksController::class)
->name('links.list')
->middleware([AuthMiddleware::class])
->where('id', '[0-9]+');
```

读 / 写一体的 setter（name/prefix/controller/method/uri/parameters）
传值写入返回 $this，无参读取返回当前值。

## 示例

```php
Route::get('links', ListLinksController::class)
->name('links.list')
->middleware([AuthMiddleware::class])
->where('id', '[0-9]+');
```

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$method` | `string` | protected | HTTP 方法（小写），any 用 "*" |
| `$uri` | `string` | protected | 原始 URI（未含组前缀） |
| `$prefix` | `string` | protected | 组前缀（由 RouteGroup 组上下文注入） |
| `$middlewares` | `array` | protected | 路由级中间件（不含组中间件） |
| `$name` | `string` | protected | 路由名称（用于 url() 生成、redirect() 反查） |
| `$controller` | `string|array|\Closure|null` | protected | 控制器：类名字符串、[类名, 方法名] 数组或闭包 |
| `$parameters` | `array` | protected | 控制器实例化参数 |
| `$where` | `array` | protected | 路由参数约束（参数名 => 正则） |
| `$append` | `array` | protected | 额外参数（隐式传值，不在 URL 中，匹配后合并进请求参数） |
| `$group` | `RouteGroup|null` | protected | 所属组（RouteGroup 实例，注册接通时用于回填组上下文） |
| `$domain` | `string` | protected | 生效域名（由 RouteDomain 域名组注入；"*" 表示对所有域名生效，即不区分域名） |
| `$same` | `RouteSame|null` | protected | 所属同 URI 注册器（RouteSame 实例） |
| `$fallback` | `bool` | protected | 是否为 fallback 兜底路由（所有正常路由未命中时命中；不限定方法/URI） |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 构造 |
| [`name()`](#name) | 设置或读取路由名称 |
| [`hasName()`](#hasname) | 判断当前路由是否已命名（含沿祖先链继承到的最终名） |
| [`prefix()`](#prefix) | 设置或读取组前缀 |
| [`domain()`](#domain) | 设置或读取生效域名（"*" 表示对所有域名生效，即不区分域名） |
| [`fallback()`](#fallback) | 设置或读取 fallback 兜底标记（所有正常路由未命中时命中；不限定方法/URI） |
| [`controller()`](#controller) | 设置或读取控制器 |
| [`method()`](#method) | 设置或读取 HTTP 方法（小写，any 用 "*"） |
| [`uri()`](#uri) | 设置或读取原始 URI（未含组前缀） |
| [`parameters()`](#parameters) | 设置或读取控制器实例化参数 |
| [`middleware()`](#middleware) | 设置路由级中间件（覆盖，非追加） |
| [`middlewares()`](#middlewares) | 读取路由级中间件 |
| [`where()`](#where) | 设置路由参数约束（合并，参数名 => 正则） |
| [`whereNumber()`](#wherenumber) | 设置数字参数约束（[0-9]+） |
| [`whereAlpha()`](#wherealpha) | 设置字母参数约束（[a-zA-Z]+） |
| [`whereAlphaNumeric()`](#wherealphanumeric) | 约束指定参数为字母数字（a-zA-Z0-9） |
| [`whereIn()`](#wherein) | 约束指定参数为给定值之一 |
| [`whereUuid()`](#whereuuid) | 约束指定参数为 UUID 格式（8-4-4-4-12） |
| [`getWhere()`](#getwhere) | 读取路由参数约束 |
| [`params()`](#params) | 获取 URI 动态参数（参数名 => 正则） |
| [`group()`](#group) | 所属组 |
| [`same()`](#same) | 所属同 URI 注册器 |
| [`append()`](#append) | 额外参数（读写一体：无参读取，传数组写入合并返回 $this） |
| [`resolve()`](#resolve) | 产出完整路由定义（供注册接通 / 下游消费） |

### __construct()

```php
public function __construct($uri, $method = "*", $group = null, $same = null)
```

构造

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$uri` | `string` | — | 原始 URI |
| `$method` | `string` | `"*"` | HTTP 方法（小写，any 用 "*"） |
| `$group` | `RouteGroup|null` | `null` | 所属组 |
| `$same` | `RouteSame|null` | `null` | 所属同 URI 注册器 |

### name()

```php
public function name($value = null)
```

设置或读取路由名称

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 传值写入，不传仅读取 |

### hasName()

```php
public function hasName()
```

判断当前路由是否已命名（含沿祖先链继承到的最终名）

### prefix()

```php
public function prefix($value = null)
```

设置或读取组前缀

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 传值写入，不传仅读取 |

### domain()

```php
public function domain($value = null)
```

设置或读取生效域名（"*" 表示对所有域名生效，即不区分域名）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 传值写入，不传仅读取 |

### fallback()

```php
public function fallback($value = null)
```

设置或读取 fallback 兜底标记（所有正常路由未命中时命中；不限定方法/URI）

传 true/false 写入，不传读取。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `bool|null` | `null` | 传值写入，不传仅读取 |

### controller()

```php
public function controller($value = null)
```

设置或读取控制器

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|array|\Closure|null` | `null` | 传值写入，不传仅读取 |

### method()

```php
public function method($value = null)
```

设置或读取 HTTP 方法（小写，any 用 "*"）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 传值写入，不传仅读取 |

### uri()

```php
public function uri($value = null)
```

设置或读取原始 URI（未含组前缀）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 传值写入，不传仅读取 |

### parameters()

```php
public function parameters($value = null)
```

设置或读取控制器实例化参数

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `array|null` | `null` | 传值写入，不传仅读取 |

### middleware()

```php
public function middleware(...$middlewares)
```

设置路由级中间件（覆盖，非追加）

可传单个数组，或一个或多个中间件参数。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$middlewares` | `...array|string|object` | — | 中间件 |

### middlewares()

```php
public function middlewares()
```

读取路由级中间件

### where()

```php
public function where($name, $regex = null)
```

设置路由参数约束（合并，参数名 => 正则）

```
Route::get('users/{id}', UserController::class)->where('id', '[0-9]+');
Route::get('users/{id}', UserController::class)->where(['id' => '[0-9]+']);
```

```php
Route::get('users/{id}', UserController::class)->where('id', '[0-9]+');
Route::get('users/{id}', UserController::class)->where(['id' => '[0-9]+']);
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string|array` | — | 参数名或「参数名 => 正则」关联数组 |
| `$regex` | `string|null` | `null` | 当 $name 为字符串时必填的正则 |

### whereNumber()

```php
public function whereNumber(...$names)
```

设置数字参数约束（[0-9]+）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$names` | `...string` | — | 参数名 |

### whereAlpha()

```php
public function whereAlpha(...$names)
```

设置字母参数约束（[a-zA-Z]+）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$names` | `...string` | — | 参数名 |

### whereAlphaNumeric()

```php
public function whereAlphaNumeric(...$names)
```

约束指定参数为字母数字（a-zA-Z0-9）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$names` | `...string` | — | 参数名 |

### whereIn()

```php
public function whereIn($name, $values)
```

约束指定参数为给定值之一

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string` | — | 参数名 |
| `$values` | `array` | — | 允许的值列表 |

### whereUuid()

```php
public function whereUuid(...$names)
```

约束指定参数为 UUID 格式（8-4-4-4-12）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$names` | `...string` | — | 参数名 |

### getWhere()

```php
public function getWhere()
```

读取路由参数约束

### params()

```php
public function params()
```

获取 URI 动态参数（参数名 => 正则）

解析当前 URI 中的动态参数并返回关联数组。支持三种占位形式：
- `{param:regex}` → `param => regex`
- `{param}`（无内联正则）→ `param => [^/]+`（默认）
- `{?param[:regex]}`（可选参数）→ 同必选，正则同上

where() 约束（参数名 => 正则）优先于 URI 内联正则。

```
Route::get('user/{userId:\w+}')->params(); // ['userId' => '\w+']
Route::get('users/{id}/posts/{slug}')
->where('id', '[0-9]+')
->params();                         // ['id' => '[0-9]+', 'slug' => '[^/]+']
```

```php
Route::get('user/{userId:\w+}')->params(); // ['userId' => '\w+']
Route::get('users/{id}/posts/{slug}')
->where('id', '[0-9]+')
->params();                         // ['id' => '[0-9]+', 'slug' => '[^/]+']
```

### group()

```php
public function group()
```

所属组

### same()

```php
public function same()
```

所属同 URI 注册器

### append()

```php
public function append($extras = null)
```

额外参数（读写一体：无参读取，传数组写入合并返回 $this）

设置路由跳转时隐式传入操作的参数对（不在 URL 中的参数），
匹配后合并进请求参数，可作安全防护 / 上下文注入。可多次调用合并。

```
Route::get('blog/:id', 'blog/read')->append(['status' => 1, 'app_id' => 5]);
```

```php
Route::get('blog/:id', 'blog/read')->append(['status' => 1, 'app_id' => 5]);
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$extras` | `array|null` | `null` | 额外参数（参数名 => 值） |

### resolve()

```php
public function resolve()
```

产出完整路由定义（供注册接通 / 下游消费）

父级属性沿「same + 组链（组中组）」逐级累积合并：
- controller：自身有则优先用，否则从最近父级（same 优先，再沿组链由近及远）取第一个非空
- middlewares / parameters / where / append：父在前、自身在后合并
（后者同名键覆盖前者；同 same 视为最近父级，组链从最外层父组逐级向内）
- name：组链各父组 name 前缀（外层在前）+ 自身 name 拼接（自身 name 为空则结果为空）
- method：自身 method 为空则从最近父级取第一个非空
- domain：自身 domain 为空则从最近父级取第一个非空（"*" = 全局生效）
- params：基于合并后的完整 URI 与合并后的 where 重新解析
- uri：已拼接父 uri / 组前缀的最终 URI（去多余斜杠）

## 非公开方法

**protected**

- `protected function resolveControllerTarget($controller)` —— 解析控制器目标（契约对齐旧版 resolveControllerTarget）
- `protected function inheritedList()` —— 非 URI 继承列表：group 链优先、再 same 链，均近 → 远，去重
- `protected function inheritedValue($prop, $anc)` —— 沿继承列表（近 → 远）取第一个非空（或非 null）的父级属性值
- `protected function ancestors()` —— 收集祖先链（近 → 远，不含自身），同时沿 same 与 group 两条父级指针逐级向上
- `protected function measureDepth($node, $d, &$depth, &$nodes)` —— 递归测量各祖先相对叶子的嵌套深度（叶子=0，父级深度=子级+1）
- `protected function resolveParams($uri, $where)` —— 解析 URI 动态参数（参数名 => 正则）
- `protected function resolvedUri()` —— 解析最终 URI
- `protected function resolvedName()` —— 计算最终路由名（沿祖先链：各父组 name 前缀外层在前 + 自身 name）
- `protected function mergePath($parent, $child)` —— 合并父路径与子路径：有则拼、无则只用父

## 同目录

- [Route](/php/api/foundation/router/route)
- [RouteDomain](/php/api/foundation/router/route-domain)
- [RouteGroup](/php/api/foundation/router/route-group)
- [RouteSame](/php/api/foundation/router/route-same)
- [Router](/php/api/foundation/router/router)
- [Routes](/php/api/foundation/router/routes)

