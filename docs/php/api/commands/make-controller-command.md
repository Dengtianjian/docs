# MakeControllerCommand

`kernel\Commands\MakeControllerCommand`  ·  class

源码：`gstudio_kernel/Commands/MakeControllerCommand.php`

> 生成控制器命令

## 声明

```php
class MakeControllerCommand extends MakeCommand
```

父类：`MakeCommand`

## 概述

命令名 make:controller 在 kernel/console 中注册（Console::addCommand）。

用法：
php kernel/console make:controller User          // 生成 UserController
php kernel/console make:controller Admin/User    // 生成 Admin/UserController（子命名空间）
php kernel/console make:controller User --force  // 覆盖已存在文件

骨架参照 kernel\Controller 下现有控制器约定（继承 Controller 基类）。

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
| `$args` | `array` | — | 位置参数：[0] 控制器名（如 "User" 或 "Admin/User"） |
| `$options` | `array` | — | 选项参数：force 是否覆盖已存在文件 |

返回：`int` —— integer 退出码，0 表示成功

## 同目录

- [MakeAppCommand](/php/api/commands/make-app-command)
- [MakeCommand](/php/api/commands/make-command)
- [MakeMiddlewareCommand](/php/api/commands/make-middleware-command)
- [MakeModelCommand](/php/api/commands/make-model-command)
- [PackageCommand](/php/api/commands/package-command)
- [ScheduleRunCommand](/php/api/commands/schedule-run-command)
- [UnpackCommand](/php/api/commands/unpack-command)

