# 快速开始

## 环境

- PHP 7.4+（部分代码保留了 PHP 7 兼容写法）
- DiscuzX 插件目录：`source/plugin/<app_id>/`

## 一个应用的最小结构

```
gstudio_super_app/
├── App.php                   应用类（可选，需要自定义时才有）
├── Setup/
│   └── Bootstrap.php         装配入口：登记组件、挂中间件、注册路由
├── Routes/
│   └── index.php             路由定义
├── Controllers/              控制器
├── Modules/ 或 Services/     业务模块
├── Providers/                装配类（若按模块拆分）
└── Deployment/               安装 / 升级 / 卸载脚本
```

## 第一步：写装配入口

```php
// Setup/Bootstrap.php
namespace gstudio_super_app\Setup;

use kernel\Foundation\Application\Application;
use kernel\Modules\Auth\AuthProvider;
use kernel\Modules\Setting\SettingModule;

class Bootstrap
{
  private $app = null;

  public function __construct()
  {
    $this->app = \kernel\Foundation\Application\Applications::setUpApp();

    $this->database();
    $this->middleware();
    $this->registerComponents();
  }

  private function app(): Application
  {
    return $this->app;
  }

  private function middleware()
  {
    //* 全局中间件：按顺序执行
    $this->app()->middleware()->set(\kernel\Middlewares\CorsMiddleware::class);
  }

  private function registerComponents()
  {
    //* 装配类：构造即装配（登记实例、挂中间件、清过期 token）
    $this->app()->make(AuthProvider::class);

    //* 组件：登记进容器
    $this->app()->provider(new SettingModule(), "setting");
  }

  private function database()
  {
    $this->app()->provider(\kernel\DiscuzX\Foundation\Database\DiscuzXDatabase::class, "database");
  }
}
```

要点：

- 构造函数里 `Applications::setUpApp()` 拿到的就是**正在装配的应用**；
- 装配期是唯一的「副作用窗口」：挂中间件、登记组件、注册路由都写在这里；
- 有副作用的组件必须**传实例**（`new Xxx()` / `make(Xxx::class)`），不能只传类名——容器对类名是延迟构造，构造不发生则装配不发生。

## 第二步：启动应用

```php
use kernel\DiscuzX\Foundation\DiscuzXApp;
use gstudio_super_app\Setup\Bootstrap;

new DiscuzXApp(Bootstrap::class, "gstudio_super_app");
```

`DiscuzXApp` 是 Discuz 环境下的应用基类（自动接管 `IN_DISCUZ` 判断、表前缀、路径）；纯框架场景可直接用 `kernel\Foundation\App`。

## 第三步：定义路由与控制器

```php
// Routes/index.php
use kernel\Foundation\Router\Route;
use gstudio_super_app\Controllers\HomeController;

Route::get("/home", HomeController::class)->name("home");
```

```php
// Controllers/HomeController.php
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
    return (new Response())->success(["hello" => "world"]);
  }
}
```

控制器方法返回 `Response` 即可，输出与 CORS 由框架统一处理。

## 第四步：用容器写字

```php
// 取已登记的单例
$auth = $this->app()->auth();              // 别名
$auth = $this->app()->make(AuthModule::class);   // 完整类名

// 临时构造（不登记）
$user = $this->app()->make(UserModel::class);

// 门面
Auth::userId();
Config::get("mode");
```

## 下一步

- 应用与装配的完整规则：[应用与装配](/php/guide/app)
- 容器的四种登记方式：[容器](/php/guide/container)
- 业务模块怎么组织：[模块](/php/guide/modules)
