# ClearExpiredTokensCron

`kernel\Crons\ClearExpiredTokensCron`  ·  class

源码：`gstudio_kernel/Crons/ClearExpiredTokensCron.php`

> 清理过期登录凭证的定时任务

## 声明

```php
class ClearExpiredTokensCron extends Cron
```

父类：[Cron](/php/api/foundation/crontab/cron)

## 概述

内核提供基础任务，业务应用可在自身 Crons/ 目录下放一个极简子类即可注册
（例如 `gstudio_super_app\Crons\ClearAuthTokensCron`）。

默认每天 03:00 执行，清理 logins 表中已过期的记录。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`handle()`](#handle) | 任务逻辑：清理过期 token |

### handle()

```php
public function handle()
```

任务逻辑：清理过期 token

走当前应用的认证服务：表名、app_id 归属都由应用决定，任务本身不猜。

## 非公开方法

**protected**

- `protected function plan(): array` —— 执行计划：每天凌晨 3 点

