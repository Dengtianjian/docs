# App

`kernel\Foundation\App`  ·  class

源码：`gstudio_kernel/Foundation/App.php`

> Web 应用：框架零件登记 + 装配 + 请求执行流程

## 声明

```php
class App extends Application
```

父类：[Application](/php/api/foundation/application/application)

## 概述

身份（ID / kernelId）、容器、组件登记与取用全在基类 [Application](/php/api/foundation/application/application) 里，
本类只负责 Web 这一层：装配（`assemble`）、执行（`run`）、
控制器调用（`executeController`）与路由参数绑定。

组件一律由容器持有，App 不为组件保留属性；`$app->xxx()` 由基类
`Application::__call` 按类短名解析到容器。新增组件只需在装配期绑定，
不需要改这个类。

## 相关

- [Application](/php/api/foundation/application/application) 身份、容器与组件装配
- `Application::__call` 短名到容器的解析规则

## 转发方法

门面通过 `__callStatic` 转发到实例，以下为可用的静态方法：

| 签名 | 说明 |
|---|---|
| `request()` | 当前请求（请求级，跨应用共享同一份） |
| `router()` | 路由表与路由匹配（请求级） |
| `lifeCycle()` | 生命周期钩子（请求级） |
| `middleware()` | 中间件链（应用级） |
| `config()` | 本应用配置（应用级） |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 构造：基座 + 框架零件 + 装配 |
| [`onBootUp()`](#onbootup) | 注册启动钩子或启动装配类 |
| [`onShutdown()`](#onshutdown) | 注册结束钩子或结束装配类 |
| [`onError()`](#onerror) | 注册错误钩子 |
| [`run()`](#run) | 启动应用：提交组件 → 生命周期启动 → 路由匹配 → 中间件执行 → 响应输出 |
| [`executeController()`](#executecontroller) | 执行控制器/闭包路由，并将返回值写入控制器响应 |

### __construct()

```php
public function __construct($setup = null, $id = null, $kernelId = "kernel")
```

构造：基座 + 框架零件 + 装配

三步，顺序不能换：
1. 基座（身份、容器、启动时间、登记到应用管理器）由
`Application::__construct` 准备；
2. 登记框架零件：App 自身、ConfigProvider / LogProvider / Middleware，以及请求级三件套
Request / Router / LifecycleProvider（只登记、不构造）；
3. 执行装配（`assemble`）——Bootstrap 里第一句就要 `register()`，因此必须排在最后。

构造完成即「配置好的、可 run() 的应用」，不再有「new 完还得记得 setup」的半成品状态。

构造期零副作用是懒装配的前提：`Application::of` 懒装配别的应用时传 `null`，
不会顺带把对方的请求、路由表、钩子链拉起来。

路由表由 Router 加载，匹配所需的当前请求经 `$app->request()` 获取。CLI 下 Request 的
URI 由 Console::handle() 置为命中的命令名；DiscuzX 下由 `DiscuzXApp::run()` 在
处理请求前写入。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$setup` | `string|callable|null` | `null` | 装配类名或装配闭包；null 表示只建骨架、不装配 |
| `$id` | `string` | `null` | 应用唯一标识，跟项目目录同名 |
| `$kernelId` | `string` | `"kernel"` | 内核 id，默认 kernel |

### onBootUp()

```php
public function onBootUp($callback = null)
```

注册启动钩子或启动装配类

委托给请求级的 `LifecycleProvider`：状态（是否已触发、捕获的异常）跟着请求走，
常驻进程下由容器 `flush()` 一并清掉，不会串到下一轮。

装配期（构造参数里的闭包 / Bootstrap）即可注册：
```php
new DiscuzXApp(function ($app) {
$app->onBootUp(Bootup::class);
$app->onShutdown(Shutdown::class);
});
```

```php
new DiscuzXApp(function ($app) {
$app->onBootUp(Bootup::class);
$app->onShutdown(Shutdown::class);
});
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$callback` | `string|callable|null` | `null` | 装配类名、启动回调；null 时用 {App}\Setup\Bootup |

### onShutdown()

```php
public function onShutdown($callback)
```

注册结束钩子或结束装配类

正常结束与异常结束都会执行。回调签名 `function ($response, $context)`。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$callback` | `string|callable` | — | 装配类名或结束回调 |

### onError()

```php
public function onError($callback)
```

注册错误钩子

请求处理过程中捕获到异常时触发，回调签名 `function (\Throwable $e)`。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$callback` | `callable` | — | 错误回调 |

### run()

```php
public function run()
```

启动应用：提交组件 → 生命周期启动 → 路由匹配 → 中间件执行 → 响应输出

主流程四步，细节在下列私有方法里：
1. 开发模式下把依赖图写进日志（此时装配已结束）；
2. `LifecycleProvider::fireBootUp` 触发启动钩子，随后 `matchRoute` 匹配路由并注入参数
（未命中抛 404）、`resolveController` 构建控制器 / 闭包与实参
（构造期异常属代码/装配错误，交由全局异常处理器兜底）；
3. `runMiddleware` 执行中间件链，内层依次 before() → `executeController` → after()；
中间件短路未进入内层时兜底补一次 after()；
4. `outputResponse` 触发结束钩子、输出响应并 exit。

异常路径：fireError() 触发错误钩子 → fireShutdown() 触发结束钩子 → 交由全局异常处理器输出。

### executeController()

```php
public function executeController($callTarget, $callParams, &$controller)
```

执行控制器/闭包路由，并将返回值写入控制器响应

由 run() 中的中间件链回调调用。核心逻辑：
- 以 call_user_func_array 调用路由目标（闭包或控制器方法），捕获异常并包装为 Error；
- $controller 为 null 或可调用时（闭包路由），补建默认 Controller 以承载响应；
- 将返回的响应写入 $controller->response：Response 实例直接赋值，否则 setData()。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$callTarget` | `callable|array` | — | 路由目标（闭包，或 [控制器, 方法名]） |
| `$callParams` | `array` | — | 传给路由目标的参数 |
| `$controller` | `object|null` | — | 控制器实例（按引用传入；闭包路由时为 null，此处补建） |

## 非公开方法

**protected**

- `protected function assemble($call)` —— 应用装配：执行装配类或装配闭包（构造末尾调用，不再对外暴露）
- `protected function bindParamsByName($parameters, $routeParams)` —— 按参数名绑定路由参数（反射）
- `protected function bindClosureParams($parameters, $routeParams, $instantiateParams, $request)` —— 按参数名绑定闭包路由参数（反射，保持声明顺序）
- `protected function isRequestParameter($param, $request)` —— 判断闭包参数是否应注入当前请求实例（按类型声明）

**private**

- `private function matchRoute()` —— 匹配当前请求的路由，并把路由参数注入请求
- `private function resolveController($route, $routeParams)` —— 构建调用目标：控制器实例 + [调用目标, 实参]
- `private function runMiddleware($route, &$controller, $callTarget, $callParams)` —— 执行中间件链，并把链的返回值回填到控制器响应
- `private function outputResponse($controller)` —— 结束钩子 + 响应输出（正常路径的终点，不返回）

