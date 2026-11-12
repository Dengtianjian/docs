# MakeMiddlewareCommand

`kernel\Commands\MakeMiddlewareCommand`  ·  class

源码：`gstudio_kernel/Commands/MakeMiddlewareCommand.php`

> 生成中间件命令

## 声明

```php
class MakeMiddlewareCommand extends MakeCommand
```

父类：`MakeCommand`

## 概述

命令名 make:middleware 在 kernel/console 中注册（Console::addCommand）。

用法：
php kernel/console make:middleware Auth             // 生成 AuthMiddleware
php kernel/console make:middleware Admin/Auth       // 生成 Admin/AuthMiddleware（子命名空间）
php kernel/console make:middleware Auth --force     // 覆盖已存在文件

骨架参照 kernel\Foundation\Middleware\MiddlewareBase 基类约定。

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
| `$args` | `array` | — | 位置参数：[0] 中间件名（如 "Auth" 或 "Admin/Auth"） |
| `$options` | `array` | — | 选项参数：force 是否覆盖已存在文件 |

返回：`int` —— integer 退出码，0 表示成功

## 同目录

- [MakeAppCommand](/php/api/commands/make-app-command)
- [MakeCommand](/php/api/commands/make-command)
- [MakeControllerCommand](/php/api/commands/make-controller-command)
- [MakeModelCommand](/php/api/commands/make-model-command)
- [PackageCommand](/php/api/commands/package-command)
- [ScheduleRunCommand](/php/api/commands/schedule-run-command)
- [UnpackCommand](/php/api/commands/unpack-command)

