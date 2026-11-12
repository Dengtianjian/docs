# HTTP

请求从 `Request` 进来，经中间件链，命中 `Route`，交给 `Controller`，返回 `Response`。

## 路由

路由写在应用（或内核）的 `Routes/*.php` 里，用 `Route` 静态 DSL 声明：

```php
use kernel\Foundation\Router\Route;
use gstudio_super_app\Controllers\HomeController;

Route::get("/home", HomeController::class)->name("home");

Route::post("/orders", CreateOrderController::class)
  ->middleware(AuthMiddleware::class)
  ->whereNumber("id");

// 分组
Route::group("/admin", function () {
  Route::get("/users", ListUsersController::class);
  Route::delete("/users/{id}", DeleteUserController::class)->whereNumber("id");
});

// 同一 URI 下按方法细分
Route::same("/profile", function () {
  Route::get("", GetProfileController::class);
  Route::put("", UpdateProfileController::class);
});

// 兜底
Route::fallback(NotFoundController::class);
```

可用方法：`get` / `post` / `put` / `patch` / `delete` / `head` / `options` / `any` / `group` / `same` / `domain` / `fallback` / `pattern` / `url`。

注册器还能链式设置：`name()`、`middleware()`、`where()` / `whereNumber()` / `whereAlpha()` / `whereAlphaNumeric()`、`domain()`、`prefix()`。

> 路由表在应用装配时加载（`Router` 由容器 `defer` 持有），所以「注册路由」必须发生在装配期。

## 控制器

```php
namespace gstudio_super_app\Controllers;

use kernel\Foundation\Controller\Controller;
use kernel\Foundation\HTTP\Request;
use kernel\Foundation\HTTP\Response;

class HomeController extends Controller
{
  public function __construct(Request $R)
  {
    parent::__construct($R);
  }

  public function data()
  {
    return (new Response())->success(["ok" => true]);
  }
}
```

- 控制器由容器构造，构造参数自动注入（`Request` 会自动给当前请求）；
- 方法返回 `Response` 即输出；返回数组会被包装成 JSON 响应。

## 请求

```php
$R->method();                 // GET / POST …
$R->isPost();  $R->isGet();
$R->uri();
$R->input("name", $default);  // 取一个参数（query / body 合并）
$R->hasInput("name");
$R->all();                    // 全部参数
$R->file("avatar");           // 上传文件
$R->hasFile("avatar");
```

## 响应

```php
$response = new Response();

$response->success($data);                       // { code: 200, message: "ok", data: … }
$response->error(400, 40001, "参数错误", $details);  // 业务错误
$response->null();                               // 空 body
$response->header("x-total", 100);               // 自定义响应头
$response->statusCode(201);
```

输出格式：`json()` / `xml()` / `text()` / `html()`，由框架按请求的 `Accept` 协商。

## 中间件

全局中间件在 Bootstrap 里按顺序登记：

```php
$this->app()->middleware()->set(CorsMiddleware::class);
$this->app()->middleware()->set(AuthMiddleware::class);
```

- `set($classOrClosure, $executeParams = null, $alias = null)`：登记一个中间件；
- 执行顺序即登记顺序，`execute()` 由框架在路由命中后统一调度；
- 中间件构造函数同样由容器注入，需要什么要什么。

## CORS

`Foundation\HTTP\Cors` 负责跨域响应头与预检请求，内置中间件已覆盖常规场景；需要自定义白名单时覆写配置即可。

## URL

```php
use kernel\Foundation\HTTP\URL;

URL::baseURL();          // 站点根地址
Route::url("home", ["id" => 1]);   // 按路由名生成地址
```
