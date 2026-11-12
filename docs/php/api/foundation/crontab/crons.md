# Crons

`kernel\Foundation\Crontab\Crons`  ·  class

源码：`gstudio_kernel/Foundation/Crontab/Crons.php`

> 定时任务管理器

## 声明

```php
class Crons
```

## 概述

负责登记与执行 Cron 任务：
- register(Cron) / registerClass(string)  按实例或类名登记
- discover(string $dir, string $ns)        扫描目录下的全部 .php 类文件，按命名空间登记
- runDue()                                 执行所有到期任务，返回执行数量
- run(string $class)                       强制执行指定类名的任务（忽略到期判断）

典型用法（业务应用手动装配，经门面共享）：
use kernel\Foundation\Crontab\Crons as CronsManager;
use kernel\Facades\Crons;
$crons = new CronsManager();
$crons->registerClass(\isdtj\Crons\ClearAuthTokensCron::class);
Crons::registerClass(\isdtj\Crons\ClearAuthTokensCron::class); // 经门面登记
Crons::runDue();
（Crons 管理器本身不含静态单例，实例持有由 kernel\Facades\Crons 负责。）

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$tasks` | `Cron[]` | protected | — |
| `$notFound` | `string[]` | protected | — |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`register()`](#register) | 登记一个任务实例 |
| [`registerClass()`](#registerclass) | 按类名登记（自动实例化）；非 Cron 子类或类不存在则跳过 |
| [`discover()`](#discover) | 扫描目录下的全部 .php 类文件并按命名空间登记 |
| [`runDue()`](#rundue) | 执行所有到期任务 |
| [`run()`](#run) | 强制执行指定类名的任务（忽略到期判断） |
| [`all()`](#all) | 返回已登记的任务实例列表 |
| [`notFound()`](#notfound) | 返回扫描时未找到的类名（供告警） |

### register()

```php
public function register(Cron $cron)
```

登记一个任务实例

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$cron` | `Cron` | — | — |

### registerClass()

```php
public function registerClass(string $class)
```

按类名登记（自动实例化）；非 Cron 子类或类不存在则跳过

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$class` | `string` | — | — |

### discover()

```php
public function discover(string $directory, string $namespace)
```

扫描目录下的全部 .php 类文件并按命名空间登记

对每个文件尝试以「命名空间 + 文件名」构造类名调用 registerClass，
其中非 Cron 子类或不存在的类会被自动跳过（不会报错）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$directory` | `string` | — | 绝对目录路径 |
| `$namespace` | `string` | — | 类命名空间（不含尾部反斜杠） |

### runDue()

```php
public function runDue(): int
```

执行所有到期任务

返回：`int` —— integer 实际执行数量

### run()

```php
public function run(string $class): bool
```

强制执行指定类名的任务（忽略到期判断）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$class` | `string` | — | — |

返回：`bool` —— boolean 是否找到并执行

### all()

```php
public function all(): array
```

返回已登记的任务实例列表

返回：`array` —— Cron[]

### notFound()

```php
public function notFound(): array
```

返回扫描时未找到的类名（供告警）

返回：`array` —— string[]

## 同目录

- [Cron](/php/api/foundation/crontab/cron)

