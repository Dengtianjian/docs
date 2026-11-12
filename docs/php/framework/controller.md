# 控制器

控制器继承 `kernel\Foundation\Controller\Controller`，由容器构造，构造参数自动注入（`Request` 会自动给当前请求）。

## 最小控制器

```php
namespace myapp\Controllers;

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
    return (new Response())->success(["hello" => "world"]);
  }
}
```

- 方法返回 `Response` 即输出；返回数组会被包装成 JSON 响应；
- 路由没有指定方法名时调用 `data()`，指定则调用对应方法。

## 内置能力

`Controller` 继承 `AbilityBaseObject`，自带错误状态机：

```php
protected function success($data = null, $statusCode = 200, $code = 200, $message = "ok");
protected function fail($statusCode = 500, $code = "500:ServerError", $message = "error", $details = [], $data = []): Response;
```

取请求参数：

```php
$this->params($key, $default);   // 路由参数
$this->query($key, $default);    // GET 参数
$this->body($key, $default);     // Body 参数
$this->rawBody($key, $default);  // 原始 Body
```

## 请求校验与类型转换

子类声明校验/转换规则，`before()` 会自动拦截：

```php
protected $requestQueryValidator = ["id" => /* 规则 */];     // GET 校验
protected $requestBodyValidator = ["name" => /* 规则 */];    // Body 校验
protected $requestQuerySerializes = ["page" => "int"];        // GET 类型转换
protected $requestBodySerializes = ["age" => "int"];          // Body 类型转换
protected $responseSerializes = null;                          // 响应序列化
protected $allowedTransformers = [];                           // _transform 白名单
```

详见 [验证](/php/framework/validation)。

## 响应工厂

`ControllerResponse` 提供常用响应：

```php
$this->response()->view("home", $data);                       // 渲染视图
$this->response()->pagination($total, $list);                 // 分页结构
$this->response()->download($filePath, "report.xlsx");        // 下载
$this->response()->file($filePath);                           // 输出文件
$this->response()->redirect("/home");                         // 重定向
```

## 认证控制器

`AuthController` 在 `Controller` 基础上加 `$admin` / `$auth` 开关和 `verifyAdmin() / verifyAuth()`，配合 `GlobalAuthMiddleware` 做登录/后台鉴权。
