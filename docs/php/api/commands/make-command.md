# MakeCommand

`kernel\Commands\MakeCommand`  ·  class

源码：`gstudio_kernel/Commands/MakeCommand.php`

> 生成类命令的抽象基类

## 声明

```php
class MakeCommand
```

## 概述

为 make:model / make:controller / make:middleware 提供公共能力：
- 参数解析：支持 "Admin/User" 形式的子目录/子命名空间
- 命名空间拼接
- 骨架文件写入（含已存在保护与 --force 覆盖）

注意：本类为抽象基类，不定义 $name 属性，不会被注册为命令。

## 方法

本类没有公开方法。

## 非公开方法

**protected**

- `protected function split(string $arg): array` —— 将输入参数解析为 [相对目录, 类短名]
- `protected function joinNamespace(string $base, string $subDir): string` —— 拼接命名空间
- `protected function write(string $targetDir, string $className, string $namespace, string $body, bool $force, $console): bool` —— 写入骨架文件
- `protected function tableName(string $className): string` —— 由模型类名推断数据表名

## 同目录

- [MakeAppCommand](/php/api/commands/make-app-command)
- [MakeControllerCommand](/php/api/commands/make-controller-command)
- [MakeMiddlewareCommand](/php/api/commands/make-middleware-command)
- [MakeModelCommand](/php/api/commands/make-model-command)
- [PackageCommand](/php/api/commands/package-command)
- [ScheduleRunCommand](/php/api/commands/schedule-run-command)
- [UnpackCommand](/php/api/commands/unpack-command)

