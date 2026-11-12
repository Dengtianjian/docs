# DiscuzXHookApp

`kernel\DiscuzX\Foundation\DiscuzXHookApp`  ·  class

源码：`gstudio_kernel/DiscuzX/Foundation/DiscuzXHookApp.php`

## 声明

```php
class DiscuzXHookApp extends DiscuzXApp
```

父类：`DiscuzXApp`

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 构造：只走 Web 应用那一层（基座 + 框架零件），跳过 DiscuzXApp 的构造追加 |

### __construct()

```php
public function __construct($setup = null, $appId = null)
```

构造：只走 Web 应用那一层（基座 + 框架零件），跳过 DiscuzXApp 的构造追加

刻意**不用** `parent::__construct()`：那会连带执行 DiscuzXApp 里的语言加载、
请求 URI 写入与异常处理器设置。钩子应用被宿主钩子点直接实例化，`$_GET['uri']`
往往还不存在，此时改写共享 Request 的 URI 会把正在处理的请求带偏。

显式点名 [App](/php/api/foundation/app) 的构造函数，用意是「从 App 这一层起跳」，
而不是「绕过构造函数」——基座与框架零件照常登记。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$setup` | `string|callable|null` | `null` | 装配类名或装配闭包；null 表示只建骨架、不装配 |
| `$appId` | `string` | `null` | 应用 ID（等于插件目录名） |

## 同目录

- [DiscuzXApp](/php/api/discuzx/foundation/discuz-x-app)
- [DiscuzXController](/php/api/discuzx/foundation/discuz-x-controller)
- [DiscuzXDeployment](/php/api/discuzx/foundation/discuz-x-deployment)
- [DiscuzXGBKJsonResponse](/php/api/discuzx/foundation/discuz-xgbk-json-response)
- [DiscuzXLang](/php/api/discuzx/foundation/discuz-x-lang)
- [DiscuzXPath](/php/api/discuzx/foundation/discuz-x-path)
- [DiscuzXResponse](/php/api/discuzx/foundation/discuz-x-response)
- [DiscuzXView](/php/api/discuzx/foundation/discuz-x-view)

