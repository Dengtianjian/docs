# 事件

事件由 `kernel\Foundation\Builtin\Event` 提供，是**进程内**的静态注册表：`new Event("名称", [订阅者])` 即注册，`Event::dispatch("名称", ...参数)` 按名称触发。

## 注册与触发

```php
use kernel\Foundation\Builtin\Event;

// 注册：名称 + 订阅者列表
new Event("order.paid", [OrderPaidListener::class]);

// 触发：按名称分发
Event::dispatch("order.paid", $order);
```

## 订阅者的三种形式

| 写法 | 行为 |
|---|---|
| `"Foo"`（类名） | `new Foo(...$params)`，构造即处理 |
| `[Foo::class, "handle"]` | 实例化后调 `handle(...$params)` |
| 闭包 / `__invoke` 对象 | 直接调用 |

```php
new Event("user.registered", [
  [SendWelcomeEmail::class, "handle"],
  function ($user) { /* 记个点 */ },
]);
```

## 注意

- **不是容器单例**：`Event` 需要构造参数，不要用 `$app->make()` 取，直接 `new Event(...)`；
- 同名重复注册会**覆盖**旧订阅列表；
- `dispatch()` 触发的名称不存在时抛 `kernel\Foundation\Exception\Error`；
- 单个订阅者抛异常会被捕获并 `Log::error` 记录，**不影响**后续订阅者执行。

## 查询与移除

```php
Event::has("order.paid");      // 是否已注册
Event::remove("order.paid");   // 移除
Event::distribute("order.paid");   // 返回触发闭包（可延迟触发）
```
