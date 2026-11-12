# Console

`kernel\Foundation\Console\Console`  ·  class

源码：`gstudio_kernel/Foundation/Console/Console.php`

> 控制台应用

## 声明

```php
class Console extends App
```

父类：[App](/php/api/foundation/app)

## 概述

继承 App：提供命令注册（command/discover）、分发、参数解析、彩色输出与交互输入能力。
命令完全由本类实例管理，不再依赖 Router（Router 只负责 HTTP 路由）。

命令注册方式：
1. 业务方在自己入口（如 kernel/console、App 的 CLI 入口）手动 $console->command() 注册
2. discover() 自动扫描命令类目录注册（命令类自带 $name 属性）

命令处理器支持三种形式：
1. 命令控制器类：实现 handle(Console $console, array $args, array $options): int 方法，
类放 Controller/ 目录（如 "kernel\\Controllers\\Commands\\MakeAppCommand"），由本类实例化并调用
2. 闭包：function (Console $console, array $args, array $options): int

命令名支持冒号命名空间（如 make:controller）；输入空参数、help、-h 或 --help
时自动列出全部已注册命令。CLI 环境下异常/错误输出到 stderr 并以非 0 退出。

入口脚本：kernel/console
$console = new Console(\kernel\Setup\Console\Bootstrap::class);
$console->run(); // 内部调用 handle() 分发命令并以退出码结束

命令行调用：php kernel/console make:app hello --name=john

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$commands` | `array` | protected | 已注册的命令 |
| `$argv` | `array` | protected | 命令行参数（不含脚本名） |
| `$commandName` | `string` | protected | 当前命令名 |
| `$arguments` | `array` | protected | 位置参数 |
| `$options` | `array` | protected | 选项参数 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 构建 |
| [`addCommand()`](#addcommand) | 注册一条命令 |
| [`discover()`](#discover) | 从目录自动发现并注册命令类 |
| [`commands()`](#commands) | 获取已注册的全部命令 |
| [`command()`](#command) | 当前命令名 |
| [`argument()`](#argument) | 获取位置参数 |
| [`option()`](#option) | 获取选项值 支持 --key=value、--key value、-k value、--flag（布尔 true） |
| [`handle()`](#handle) | 分发执行命令 |
| [`line()`](#line) | 输出一行文本 |
| [`success()`](#success) | 绿色成功输出 |
| [`info()`](#info) | 青色信息输出 |
| [`warning()`](#warning) | 黄色警告输出 |
| [`error()`](#error) | 红色错误输出，写入 STDERR |
| [`ask()`](#ask) | 提示输入 |
| [`confirm()`](#confirm) | 确认询问，返回布尔值 |
| [`secret()`](#secret) | 静默输入（不回显），用于密码等敏感信息 |
| [`run()`](#run) | 覆写 App::run：执行命令分发并以退出码结束 |

### __construct()

```php
public function __construct($setup = null, $AppId = "kernel", $KernelId = "kernel")
```

构建

装配不交给父类构造（第三参传 null）：CLI 要先把异常 / 错误处理器换成输出到 stderr、
以非 0 退出的那一套，装配期抛错才不会打出 web 的 HTML 错误页。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$setup` | `string|callable|null` | `null` | 装配类名或装配闭包；null 表示只建骨架、不装配 |
| `$AppId` | `string` | `"kernel"` | AppId，默认 kernel |
| `$KernelId` | `string` | `"kernel"` | KernelId，默认 kernel |

### addCommand()

```php
public function addCommand(string $name, $handler, string $description = ""): Console
```

注册一条命令

方法名刻意不叫 register()：父类的 register() 登记的是容器组件，子类重写会让
Console 无法登记组件（签名不兼容直接 fatal），两个概念也不该共用一个名字。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string` | — | 命令名，例如 "make:controller"，支持冒号命名空间 |
| `$handler` | `callable|string` | — | 闭包：function (Console $console, array $args, array $options): int； |
| `$description` | `string` | `""` | 命令说明，用于帮助列表 |

返回：`Console` —— Console

### discover()

```php
public function discover(string $directory, string $namespace): Console
```

从目录自动发现并注册命令类

扫描指定目录下所有 .php 文件，按 PSR-4 约定推断类名（命名空间 + 文件名），
类存在且定义了 $name 属性（命令名）即注册，$description 属性作为命令说明。

命令类约定：
namespace App\Commands;
class CacheClearCommand
{
/** @var string 命令名，例如 "cache:clear" *\/
protected $name = "cache:clear";
/** @var string 命令说明，用于帮助列表 *\/
protected $description = "Clear application cache";

public function handle($console, $args, $options): int { ... }
}

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$directory` | `string` | — | 命令类所在目录（绝对路径），目录不存在时静默跳过 |
| `$namespace` | `string` | — | 命令类命名空间，类名取文件名（如 "App\\Commands"） |

返回：`Console` —— Console

### commands()

```php
public function commands(): array
```

获取已注册的全部命令

命令由本实例 addCommand()/discover() 统一管理，不再依赖 Router。

返回：`array` —— array＜string, array＞ 命令名 => 命令定义

### command()

```php
public function command(): string
```

当前命令名

返回：`string` —— string

### argument()

```php
public function argument(int $index, $default = null)
```

获取位置参数

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$index` | `int` | — | 参数下标，从 0 开始 |
| `$default` | `mixed` | `null` | 不存在时返回的默认值 |

### option()

```php
public function option(string $name, $default = null)
```

获取选项值 支持 --key=value、--key value、-k value、--flag（布尔 true）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string` | — | 选项名 |
| `$default` | `mixed` | `null` | 不存在时返回的默认值 |

### handle()

```php
public function handle($argv = null): int
```

分发执行命令

分发前触发 App 生命周期"启动"钩子（bootUp），命令执行完毕（正常或异常）后触发
"结束"钩子（shutdown，由 App::$lifeCycle 触发），供命令在统一时机做初始化与清理。
命令抛出的异常会先执行结束钩子（记录进度、释放资源），再交由 CLI 异常处理器输出并退出。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$argv` | `array|null` | `null` | 命令行参数（不含脚本名）。不传时使用构造时捕获的 GLOBALS['argv'] |

返回：`int` —— integer 退出码

### line()

```php
public function line(string $text = "",$color = null, $stream = null): Console
```

输出一行文本

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$text` | `string` | `""` | 文本 |
| `$color` | `string|null` | `null` | ANSI 颜色码，null 表示无色。例如 "32" 绿色 |
| `$stream` | `resource|null` | `null` | 输出流，默认 STDOUT |

返回：`Console` —— Console

### success()

```php
public function success(string $text): Console
```

绿色成功输出

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$text` | `string` | — | — |

返回：`Console` —— Console

### info()

```php
public function info(string $text): Console
```

青色信息输出

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$text` | `string` | — | — |

返回：`Console` —— Console

### warning()

```php
public function warning(string $text): Console
```

黄色警告输出

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$text` | `string` | — | — |

返回：`Console` —— Console

### error()

```php
public function error(string $text): Console
```

红色错误输出，写入 STDERR

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$text` | `string` | — | — |

返回：`Console` —— Console

### ask()

```php
public function ask(string $question, $default = null): string
```

提示输入

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$question` | `string` | — | 问题 |
| `$default` | `mixed` | `null` | 默认值，回车直接使用 |

返回：`string` —— string

### confirm()

```php
public function confirm(string $question, bool $default = true): bool
```

确认询问，返回布尔值

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$question` | `string` | — | 问题 |
| `$default` | `bool` | `true` | 默认值 |

返回：`bool` —— bool

### secret()

```php
public function secret(string $question): string
```

静默输入（不回显），用于密码等敏感信息

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$question` | `string` | — | 问题 |

返回：`string` —— string

### run()

```php
public function run()
```

覆写 App::run：执行命令分发并以退出码结束

## 非公开方法

**protected**

- `protected function parseArguments(array $argv): array` —— 解析命令行参数 第一个非选项参数作为命令名，其余为位置参数；选项支持 --key=value、--key value、-k value、--flag
- `protected function isOption(string $arg): bool` —— 判断参数是否为选项形式
- `protected function isOptionValue(array $argv, int $nextIndex): bool` —— 判断下一个参数是否可作为选项的值（非选项形式）
- `protected function execute(array $command): int` —— 执行命令处理器
- `protected function listCommands(int $exitCode = 0): int` —— 输出帮助：列出所有已注册命令
- `protected function supportsColor(): bool` —— 是否支持 ANSI 颜色（TTY 且未设置 NO_COLOR）

## 同目录

- [Command](/php/api/foundation/console/command)

