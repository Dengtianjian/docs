# Cron

`kernel\Foundation\Crontab\Cron`  ·  class

源码：`gstudio_kernel/Foundation/Crontab/Cron.php`

> 定时任务基类

## 声明

```php
class Cron
```

## 概述

业务模块可继承本类并实现 plan()（计划）与 handle()（任务逻辑），
由 kernel/Foundation/Crontab/Crons 管理器（命令 schedule:run 统一驱动）：
扫描当前应用的 Crons/ 目录，对到期的任务调用 run()。

plan() 返回一个计划描述，可用基类提供的助手方法构造：
$this->everyMinute()           每分钟
$this->everyFiveMinutes()      每 5 分钟
$this->hourly()                每小时整点
$this->daily($hour = 0)        每天指定小时（默认 0 点）
$this->cron("0 3 * * *")       标准 5 段 cron 表达式

上次执行时间持久化在 Data 目录的 cron/{类名}.last，保证进程重启后仍按周期去重。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`handle()`](#handle) | 任务逻辑，子类实现 |
| [`run()`](#run) | 运行入口：先执行 handle()，再记录执行时间 |
| [`due()`](#due) | 判断当前是否到期（相对上次执行时间） |

### handle()

```php
public function handle()
```

任务逻辑，子类实现

### run()

```php
public function run()
```

运行入口：先执行 handle()，再记录执行时间

### due()

```php
public function due(): bool
```

判断当前是否到期（相对上次执行时间）

返回：`bool` —— boolean

## 非公开方法

**protected**

- `protected function plan(): array` —— 定义执行计划，子类必须覆盖
- `protected function currentTick(array $plan, int $now)` —— 计算 plan 在 <= $now 的最近一次应触发时刻
- `protected function prevCronTick(string $expr, int $now)` —— 从 $now 向前回溯，找到满足 cron 表达式的最近时刻
- `protected function cronFieldValues(string $field, int $min, int $max): array` —— 解析 cron 单段为允许值集合（支持通配、步长、区间、列表及其组合）
- `protected function everyMinute()` —— 计划助手：每分钟
- `protected function everyFiveMinutes()` —— 计划助手：每 5 分钟
- `protected function hourly()` —— 计划助手：每小时整点
- `protected function daily(int $hour = 0, int $minute = 0)` —— 计划助手：每天指定小时
- `protected function cron(string $expression)` —— 计划助手：标准 cron 表达式
- `protected function lastRun()` —— 读取上次执行时间
- `protected function markRun()` —— 记录本次执行时间
- `protected function lastRunFile()` —— 上次执行时间持久化文件路径

## 同目录

- [Crons](/php/api/foundation/crontab/crons)

