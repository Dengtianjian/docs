# 缓存

缓存由 `kernel\Foundation\Builtin\Cache` 提供，门面 `kernel\Facades\Cache` 同源。默认是**文件驱动**：`serialize` 写入 `{app}/Data/Cache/{id}.txt`，并发写用 `LOCK_EX`。

## 读写

```php
use kernel\Facades\Cache;

Cache::write("user:1", ["name" => "Alice"], 1);  // 写，1 天过期
$user = Cache::read("user:1");                    // 读
Cache::has("user:1");                             // 是否存在且未过期
Cache::remove("user:1");                          // 删除
```

`read()` 返回值区分三种状态：

| 返回 | 含义 |
|---|---|
| `false` | 不存在 |
| `null` | 存在但已过期 |
| 其他 | 缓存内容 |

## 回源写入（remember）

读不到时自动生成并写入，是最常用的模式：

```php
$user = Cache::remember("user:1", function () {
  return $db->find(1);
}, 1);   // 1 天
```

## 语义区分

- `write()` 对数组内容做一层合并（新键覆盖旧键）；
- `overwrite()` 完全替换；
- `clear()` 清空该缓存的内容（保留文件）；
- `remove()` 删除缓存文件。

## 计数

```php
Cache::increment("visits", 1, 30);   // +1，30 天过期
Cache::decrement("stock", 1);
```

## 过期与清理

- 过期单位是**天**，支持小数（`1 / 24` 为 1 小时）；`<= 0` 或 `null` 永不过期；
- 运维清理：

```php
Cache::flush();   // 清空全部缓存文件
Cache::gc();      // 只清过期的，返回清理数量
```

## 动态 KEY

```php
Cache::key();     // 进程级 16 位十六进制，静态资源地址拿它做版本号
```
