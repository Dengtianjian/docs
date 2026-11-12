# Config

`kernel\Facades\Config`  ·  class

源码：`gstudio_kernel/Facades/Config.php`

> 配置门面

## 声明

```php
class Config extends Facade
```

父类：[Facade](/php/api/foundation/facade/facade)

## 概述

转发到**当前应用**容器里的 `ConfigProvider`：与 `$app->config()`、
`$app->make(ConfigProvider::class)` 是同一份实例。

门面自身不持有实例、也不决定归属——配置实例读哪个应用目录，由构造它的容器决定。
跨应用读配置必须显式走对方应用的容器：`App::of("gstudio_super_app")->config()`。

没有任何应用登记时调用会抛错，而配置恰恰在早期阶段（异常输出、CLI 命令）常被读取。
需要「没有应用就返回默认值」的场景请自行兜底：`Applications::default() === null`
或 `try/catch`。

取用方式（调用点写法不变，只换 use）：
```php
use kernel\Facades\Config;

$mode = Config::get("mode", "production");
```

## 示例

```php
use kernel\Facades\Config;

$mode = Config::get("mode", "production");
```

## 转发方法

门面通过 `__callStatic` 转发到实例，以下为可用的静态方法：

| 签名 | 说明 |
|---|---|
| `get($key = null, $default = null)` | 读配置项，null 返回全部 |
| `all()` | 全部配置 |
| `has($key)` | 配置键是否存在 |
| `set($keyOrValue, $value = null)` | 运行时设置配置（仅内存） |
| `forget($key)` | 删除配置键 |
| `push($key, $value)` | 向数组类型的配置项追加值 |
| `load()` | 重新读取五层配置文件 |
| `read($filePath)` | 读取并合并单个配置文件 |
| `loaded()` | 是否已读过配置文件 |
| `flush()` | 清空内存配置 |

## 方法

本类没有公开方法。

## 非公开方法

**protected**

- `protected static function resolve()` —— 容器键：配置实例（应用级）

## 同目录

- [Cache](/php/api/facades/cache)
- [Crons](/php/api/facades/crons)
- [Log](/php/api/facades/log)

