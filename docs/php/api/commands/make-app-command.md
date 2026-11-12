# MakeAppCommand

`kernel\Commands\MakeAppCommand`  ·  class

源码：`gstudio_kernel/Commands/MakeAppCommand.php`

> 创建新应用命令

## 声明

```php
class MakeAppCommand
```

## 概述

命令名 make:app 在 kernel/console 中注册（Console::addCommand）。

用法：
php kernel/console make:app ＜AppId＞

生成应用骨架到 {root}/{AppId}/：Setup/（Bootstrap/Bootup/Shutdown 装配类）、Routes/index.php（HTTP 路由 + 命令注册）、
Controllers/、console 入口（Console 子类）等。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`handle()`](#handle) | 命令处理器 |

### handle()

```php
public function handle($console, $args, $options): int
```

命令处理器

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$console` | `\kernel\Foundation\Console\Console` | — | 控制台实例 |
| `$args` | `array` | — | 位置参数：[0] 应用 ID（如 "test"、"isdtj"） |
| `$options` | `array` | — | 选项参数（无） |

返回：`int` —— integer 退出码，0 表示成功

## 同目录

- [MakeCommand](/php/api/commands/make-command)
- [MakeControllerCommand](/php/api/commands/make-controller-command)
- [MakeMiddlewareCommand](/php/api/commands/make-middleware-command)
- [MakeModelCommand](/php/api/commands/make-model-command)
- [PackageCommand](/php/api/commands/package-command)
- [ScheduleRunCommand](/php/api/commands/schedule-run-command)
- [UnpackCommand](/php/api/commands/unpack-command)

