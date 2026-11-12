# ScheduleRunCommand

`kernel\Commands\ScheduleRunCommand`  ·  class

源码：`gstudio_kernel/Commands/ScheduleRunCommand.php`

> 定时任务执行命令

## 声明

```php
class ScheduleRunCommand
```

## 概述

命令名 schedule:run 在 kernel/console 中注册（Console::addCommand）。

用法：
php isdtj/console schedule:run

直接经 Crons 门面执行：业务应用可先经门面登记定时器（如 Crons::registerClass(...)）；
未登记时门面自动实例化并扫描当前应用 Crons/ 目录，
对继承 kernel\Foundation\Crontab\Cron 且到期的任务调用 run()。

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
| `$args` | `array` | — | 位置参数（无） |
| `$options` | `array` | — | 选项参数（无） |

返回：`int` —— integer 退出码，0 表示成功

## 同目录

- [MakeAppCommand](/php/api/commands/make-app-command)
- [MakeCommand](/php/api/commands/make-command)
- [MakeControllerCommand](/php/api/commands/make-controller-command)
- [MakeMiddlewareCommand](/php/api/commands/make-middleware-command)
- [MakeModelCommand](/php/api/commands/make-model-command)
- [PackageCommand](/php/api/commands/package-command)
- [UnpackCommand](/php/api/commands/unpack-command)

