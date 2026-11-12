# 路由

路由写在应用（或内核）的 `Routes/*.php` 里，用 `Route` 静态 DSL 声明。装配时 `Router` 会扫描 `Path::kernel()/Routes` 与 `Path::root()/Routes` 下所有 PHP 文件并 `include_once`。

## 基础方法

```php
use kernel\Foundation\Router\Route;
use myapp\Controllers\HomeController;

Route::get("/home", HomeController::class);
Route::post("/orders", CreateOrderController::class);
Route::put("/users/{id}", UpdateUserController::class);
Route::delete("/users/{id}", DeleteUserController::class);
Route::any("/legacy", LegacyController::class);
```

可用方法：`get` / `post` / `put` / `patch` / `delete` / `head` / `options` / `any`。

## 链式配置

```php
Route::get("users/{id}/posts", PostController::class)
  ->name("user.posts")
  ->middleware([AuthMiddleware::class])
  ->where("id", "[0-9]+");
```

常用链式方法：

| 方法 | 用途 |
|---|---|
| `name()` | 命名路由 |
| `middleware(...)` | 路由级中间件 |
| `where($name, $regex)` | 参数正则 |
| `whereNumber() / whereAlpha() / whereAlphaNumeric() / whereUuid()` | 常见类型约束 |
| `whereIn($name, $values)` | 枚举约束 |
| `domain()` | 域名约束 |

## 分组、同 URI、域名、兜底

```php
// 分组：uri 前缀自动拼接
Route::group("api", function ($g) {
  $g->get("users", UserController::class);        // uri = api/users
  $g->group("v1", function ($g2) {
    $g2->get("posts", PostController::class);     // uri = api/v1/posts
  });
});

// 同一 URI 按方法细分
Route::same("links/{id}", function ($rs) {
  $rs->get(ShowLinkController::class);            // GET    /links/{id}
  $rs->put(UpdateLinkController::class);          // PUT    /links/{id}
  $rs->delete(RemoveLinkController::class);       // DELETE /links/{id}
});

// 域名分组
Route::domain("api.example.com", function ($d) {
  $d->get("v1", V1Controller::class);
});

// 兜底
Route::fallback(NotFoundController::class);
```

## 生成地址

```php
Route::url("user.posts", ["id" => 42]);    // users/42/posts
Route::redirect("user.posts", ["id" => 42]);
```

## 全局参数默认正则

```php
Route::pattern("id", "[0-9]+");   // 全局：所有 {id} 默认按数字匹配
```

> 路由表在应用装配时加载（`Router` 由容器 `defer` 持有），所以「注册路由」必须发生在装配期。
