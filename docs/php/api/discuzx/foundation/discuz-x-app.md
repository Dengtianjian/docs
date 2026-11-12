# DiscuzXApp

`kernel\DiscuzX\Foundation\DiscuzXApp`  ·  class

源码：`gstudio_kernel/DiscuzX/Foundation/DiscuzXApp.php`

## 声明

```php
class DiscuzXApp extends App
```

父类：[App](/php/api/foundation/app)

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$deployment` | `DiscuzXDeployment` | private | — |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 构造：DiscuzX 基座 + 装配 |
| [`hook()`](#hook) | — |
| [`deployment()`](#deployment) | 部署编排器（安装 / 更新 / 卸载） |
| [`exists()`](#exists) | 当前运行环境是否为 DiscuzX |

### __construct()

```php
public function __construct($setup = null, $appId = null, $kernelId = "gstudio_kernel")
```

构造：DiscuzX 基座 + 装配

装配刻意**不交给父类构造**（`parent::__construct()` 第三参传 null）：本类要先把
语言包与请求 URI 准备好，Bootstrap 里读 `$app->request()->uri()` 才拿得到真实值。
因此这里在父类构造之后、URI 写入之后，再显式调 `App::assemble`。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$setup` | `string|callable|null` | `null` | 装配类名或装配闭包；null 表示只建骨架、不装配 |
| `$appId` | `string` | `null` | 应用 ID（等于插件目录名） |
| `$kernelId` | `string` | `"gstudio_kernel"` | 内核 ID，默认 gstudio_kernel；传 null 时用默认值 |

### hook()

```php
public function hook($uri)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$uri` | `mixed` | — | — |

### deployment()

```php
public function deployment()
```

部署编排器（安装 / 更新 / 卸载）

### exists()

```php
public static function exists()
```

当前运行环境是否为 DiscuzX

靠 Discuz 常量 `IN_DISCUZ` 判断，只看宿主，不依赖是否已经建过应用实例——内核在
「还没有 App」的早期阶段（自动加载、模型构造、URL 拼装）也要用它。

两类用途：
- 表名：DiscuzX 下要带应用前缀，见 `\kernel\Foundation\Database\RDB\Model::discuzTableName`；
- 中间件：[Auth](/php/api/modules/auth/auth) 的构造函数据此在 DiscuzX 认证与通用认证之间选型。

只回答「宿主是不是 DiscuzX」，不回答「DiscuzX 适配层是否装配完整」。

## 同目录

- [DiscuzXController](/php/api/discuzx/foundation/discuz-x-controller)
- [DiscuzXDeployment](/php/api/discuzx/foundation/discuz-x-deployment)
- [DiscuzXGBKJsonResponse](/php/api/discuzx/foundation/discuz-xgbk-json-response)
- [DiscuzXHookApp](/php/api/discuzx/foundation/discuz-x-hook-app)
- [DiscuzXLang](/php/api/discuzx/foundation/discuz-x-lang)
- [DiscuzXPath](/php/api/discuzx/foundation/discuz-x-path)
- [DiscuzXResponse](/php/api/discuzx/foundation/discuz-x-response)
- [DiscuzXView](/php/api/discuzx/foundation/discuz-x-view)

