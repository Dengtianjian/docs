# Router

`kernel\Foundation\Router\Router`  ·  class

源码：`gstudio_kernel/Foundation/Router/Router.php`

> 路由匹配实例

## 声明

```php
class Router
```

## 概述

由 App 实例化并持有（`App::$router`），负责：

- 构造时加载 Routes 文件（kernel/Routes 与 App/Routes 下的 PHP 文件，
文件内通过新 Route 门面（Route::get/post/group/same/domain/fallback）注册路由）
- 按请求匹配路由（委托静态容器 Routes::match）

路由定义 DSL 已沉淀到新 Route 门面（Route::get/post/.../group/same/domain），
本类仅保留运行期匹配职责，不再承载静态注册方法。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 构造：加载路由 |
| [`route()`](#route) | 获取匹配的路由 |
| [`routes()`](#routes) | 获取全部已注册路由 |

### __construct()

```php
public function __construct()
```

构造：加载路由

由 App 实例化并持有（`App::$router`）。匹配所需的请求实例通过 `Applications::default()->request()`
获取，无需在构造时传入。

### route()

```php
public function route()
```

获取匹配的路由

由 App::run() 调用，命中参数经 `$request->params->fill($route['params'])` 注入。

### routes()

```php
public function routes()
```

获取全部已注册路由

委托 Routes::tables() 导出完整路由定义表（静态 + 动态）。

结构：domain => method => uri => 路由定义（三层索引）。domain 键为路由生效
域名（全局路由为 "*"），method 键照注册方法名（get/post/...），any 用 "*"。
每项含：name / method / uri（已拼组前缀）/ controller / middlewares /
parameters / where / params（动态参数正则）/ append / domain。

## 非公开方法

**protected**

- `protected function load()` —— 加载路由文件

## 同目录

- [Route](/php/api/foundation/router/route)
- [RouteDomain](/php/api/foundation/router/route-domain)
- [RouteGroup](/php/api/foundation/router/route-group)
- [RouteRegister](/php/api/foundation/router/route-register)
- [RouteSame](/php/api/foundation/router/route-same)
- [Routes](/php/api/foundation/router/routes)

