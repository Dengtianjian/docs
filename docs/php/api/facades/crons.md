# Crons

`kernel\Facades\Crons`  ·  class

源码：`gstudio_kernel/Facades/Crons.php`

> 定时任务门面

## 声明

```php
class Crons extends Facade
```

父类：[Facade](/php/api/foundation/facade/facade)

## 概述

继承 Facade，因覆写 resolve() 自动判定为单例门面，单例实例为 Crontab\Crons 管理器。

业务应用可直接通过本门面登记/执行定时器（如 Crons::registerClass(...)）；
未显式登记时由 resolve() 兜底自动 new 一个管理器并扫描当前应用 Crons/
目录登记定时器。

## 转发方法

门面通过 `__callStatic` 转发到实例，以下为可用的静态方法：

| 签名 | 说明 |
|---|---|
| `register(\kernel\Foundation\Crontab\Cron $cron)` | 登记一个任务实例，返回自身 |
| `registerClass(string $class)` | 按类名登记（自动实例化，非 Cron 子类跳过），返回自身 |
| `discover(string $directory, string $namespace)` | 扫描目录下的全部 .php 类文件并按命名空间登记，返回自身 |
| `runDue()` | 执行所有到期任务，返回执行数量 |
| `run(string $class)` | 强制执行指定类名的任务（忽略到期判断） |
| `all()` | 返回已登记的任务实例列表 |
| `notFound()` | 返回扫描时未找到的类名 |

## 方法

本类没有公开方法。

## 非公开方法

**protected**

- `protected static function resolve()` —— 兜底实例：自动 new 一个管理器并扫描当前应用 Crons/ 目录登记定时器

## 同目录

- [Cache](/php/api/facades/cache)
- [Config](/php/api/facades/config)
- [Log](/php/api/facades/log)

