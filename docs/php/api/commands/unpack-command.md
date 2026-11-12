# UnpackCommand

`kernel\Commands\UnpackCommand`  ·  class

源码：`gstudio_kernel/Commands/UnpackCommand.php`

> 解包命令（框架内置）：将应用与内核的 zip 解压回对应目录

## 声明

```php
class UnpackCommand
```

## 概述

用法：
php isdtj/console unpack                    # 应用名取 $console->appId()，内核名取 $console->kernelId()
php kernel/console unpack isdtj             # 从内核控制台运行：位置参数指定应用名
php kernel/console unpack isdtj kernel      # 同时指定应用名与内核名
php kernel/console unpack --app=isdtj --kernel=kernel

- 应用名默认取 `$console->appId()`，内核名默认取 `$console->kernelId()`（默认 "kernel"）
- 两者均可由位置参数（[app] [kernel]）或选项（--app / --kernel）覆盖
- 读取项目根下的 {app}.zip / {kernel}.zip，解压到 {app} / {kernel} 目录
- 归档文件不存在时跳过该目标并告警，不中断其余目标

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$name` | `string` | protected | — |
| `$description` | `string` | protected | — |

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
| `$args` | `array` | — | 位置参数：[0] 应用名（可选）、[1] 内核名（可选） |
| `$options` | `array` | — | 选项：app / kernel（可选） |

返回：`int` —— integer 退出码，0 表示成功

## 同目录

- [MakeAppCommand](/php/api/commands/make-app-command)
- [MakeCommand](/php/api/commands/make-command)
- [MakeControllerCommand](/php/api/commands/make-controller-command)
- [MakeMiddlewareCommand](/php/api/commands/make-middleware-command)
- [MakeModelCommand](/php/api/commands/make-model-command)
- [PackageCommand](/php/api/commands/package-command)
- [ScheduleRunCommand](/php/api/commands/schedule-run-command)

