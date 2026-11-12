# 日志

日志由 `kernel\Foundation\Builtin\Log` 提供，门面 `kernel\Facades\Log` 同源。落盘到 `{app}/Data/Logs/{年}/{月}/{日}.jsonl`，每行一条单行 JSON。

## 分级

级别从小到大：`debug < info < warning < error`。低于当前最小级别的记录会被忽略：

```php
use kernel\Facades\Log;

Log::debug("变量", ["x" => 1]);
Log::info("登录成功", ["uid" => 1]);
Log::warning("余额不足", ["uid" => 1]);
Log::error("下单失败", ["order" => "NO123"]);
```

设置最小级别：

```php
Log::level("warning");   // 此后 debug / info 被忽略
```

## 通用记录

```php
Log::record($content, $level = "info");
```

`$content` 可以是字符串、数组、对象，会自动 JSON；`Throwable` 自动转成 `message + file:line + trace`。

## 输出格式

每行一条 JSON：

```json
{"time":"2026-11-12 10:00:00","level":"info","content":{"uid":1}}
```

## 读取（后台查看）

```php
Log::read($day, $month, $year);               // 读某天全部
Log::page(1, 20, $day, $month, $year);        // 分页读
Log::cleanup(30);                             // 清 30 天前的日志
```

## 注意

- `$app->log()`、`$app->make(Log::class)`、门面 `Log` 是**同一份实例**；
- 非法 UTF-8 内容会被替换符兜底，不会写坏 jsonl。
