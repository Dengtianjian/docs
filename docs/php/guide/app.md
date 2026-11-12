# 应用与装配

## 应用是什么

一个**应用** = 一个应用 ID + 一个容器 + 一份装配记录。它同时是「业务的边界」和「数据的边界」：

```php
$app = new \kernel\DiscuzX\Foundation\DiscuzXApp(AppBootstrap::class, "gstudio_super_app");

$app->appId();      // "gstudio_super_app"
$app->container();  // 它自己的容器
$app->assembled();  // 是否已经跑完装配
```

- **业务边界**：不同应用的类、路由、中间件互不干扰；
- **数据边界**：模型按所属应用解析表名（`gstudio_super_app_files` / `gstudio_download_files`），不会串表。

## 装配：两个阶段

```php
new DiscuzXApp(Bootstrap::class, "gstudio_super_app");
```

1. **注册**：应用对象创建后立刻登记进 `Applications`，此后 `Applications::get("gstudio_super_app")` 就能拿到它；
2. **装配**：执行 Bootstrap（`setup` 参数），完成后 `assembled()` 变成 `true`。

两者的区别很重要：

| 状态 | `Applications::get()` | `assembled()` | 容器里有业务组件吗 |
|---|---|---|---|
| 骨架（`Application::of()` 建出来的） | 能拿到 | `false` | 没有 |
| 完整装配 | 能拿到 | `true` | 有 |

所以判断「对方能不能给我东西」要用 `assembled()`，而不是 `!== null`。

### 装配参数

`assemble()` 接受三种形态：

```php
new App(function (Application $app) { ... }, "id");   // 闭包
new App(AppBootstrap::class, "id");                   // 类名：会 new 一次
new App(null, "id");                                  // 骨架：只注册，不装配
```

装配期间框架会 `enterSetup($app)`，所以构造函数里 `Applications::setUpApp()` 拿到的是当前应用——**这也是 `$this->app()` 在装配期能正确工作的原因**。

## 取用

```php
$app->auth();                    // __call：按别名取
$app->make(AuthModule::class);   // 按类名取（或临时构造）
$app->has("auth");               // 是否登记过
$app->providers();               // 已构造的单例（排查用）
$app->imports();                 // 已声明的跨应用来源
```

## 跨应用

默认**不共享**：`$superApp->auth()` 只有 super_app 自己的代码能调，别的应用拿不到。要用别人的，必须显式 `import`：

```php
// download 的 Bootstrap
$this->app()->import(StorageModule::class, "gstudio_super_app", "storage");
```

取用时转发到提供方容器，**构造发生在提供方**，归属、表名、配置目录都跟着提供方走。

前置条件：提供方必须**已装配**（`assembled()` 为 `true`）。子应用常见写法是先确保主应用装配完：

```php
private function registerMainApp()
{
  $mainApp = Applications::get("gstudio_super_app");
  if ($mainApp === null || !$mainApp->assembled()) {
    new DiscuzXApp(AppBootstrap::class, "gstudio_super_app");
  }
}
```

## 静态入口

| API | 用途 |
|---|---|
| `Applications::get($id)` | 取已登记的应用（可能是骨架） |
| `Application::of($idOrClass)` | 取应用；不存在则建**骨架** |
| `Applications::default()` | 当前进程的默认应用（首个注册的） |
| `Applications::setUpApp()` | 装配 / 构造上下文栈顶，非装配期为 `null` |

## 归属（`$this->app()`）

对象「属于哪个应用」的解析顺序：

```
① bindApp() 注入的 $this->app
② 装配 / 构造上下文栈顶（Applications::setUpApp()）
③ 默认应用（Applications::default()）
```

- 经容器构造的对象，构造期间框架会压栈，所以构造函数里 `$this->app()` 也是对的；
- `bindApp()` 只填空：对象已有归属时不会被「过户」，跨应用共享实例时不会被改归属。

模型、Repository 这类要按归属算表名 / 路径的类，靠的正是这一套。
