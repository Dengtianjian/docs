# PackageCommand

`kernel\Commands\PackageCommand`  ·  class

源码：`gstudio_kernel/Commands/PackageCommand.php`

> 打包命令（框架内置）：将业务应用与内核目录分别打包为 zip

## 声明

```php
class PackageCommand
```

## 概述

用法：
php isdtj/console package                    # 应用名取 $console->appId()，内核名取 $console->kernelId()
php kernel/console package isdtj             # 从内核控制台运行：位置参数指定应用名
php kernel/console package isdtj kernel      # 同时指定应用名与内核名
php kernel/console package --app=isdtj --kernel=kernel

- 应用名默认取 `$console->appId()`（业务应用目录名，如 isdtj）
- 内核名默认取 `$console->kernelId()`（内核目录名，默认 "kernel"）
- 两者均可由位置参数（[app] [kernel]）或选项（--app / --kernel）覆盖
- 输出到项目根：{app}.zip / {kernel}.zip；打包前删除旧 zip
- 按内置忽略名单排除 .git、vendor、Data、Storage、Secrets 等

## 常量

| 常量 | 值 | 说明 |
|---|---|---|
| `IGNORE` | `[ ".git", ".github", ".gitattributes", ".gitignore", "Config.local.php", "Config.development.php", "/vendor", "/Data", "/Storage", "/Secrets", "404.html", ]` | 打包忽略名单（追加进 Zip 的 ignore 列表） |

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
- [ScheduleRunCommand](/php/api/commands/schedule-run-command)
- [UnpackCommand](/php/api/commands/unpack-command)

