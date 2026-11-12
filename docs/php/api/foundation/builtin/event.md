# Event

`kernel\Foundation\Builtin\Event`  ·  class

源码：`gstudio_kernel/Foundation/Builtin/Event.php`

> 事件服务

## 声明

```php
class Event extends AbilityBaseObject
```

父类：[AbilityBaseObject](/php/api/foundation/object/ability-base-object)

## 概述

进程内的事件注册表：`new EventProvider("名称", [订阅类])` 即注册，`dispatch()` 按名称触发。
与其它服务一样继承 [AbilityBaseObject](/php/api/foundation/object/ability-base-object)，拿到统一的错误态机制；
但因为构造必须带事件名，它不是容器单例——不要用 `$app->make()` 取它。

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$events` | `array` | private | 已注册的事件实例（进程内注册表） |
| `$name` | `string` | private | 事件名称 |
| `$subscriptions` | `array` | private | 订阅者列表 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 注册事件 |
| [`getName()`](#getname) | 获取事件名称 |
| [`getSubscriptions()`](#getsubscriptions) | 获取订阅者列表 |
| [`has()`](#has) | 检查事件是否已注册 |
| [`remove()`](#remove) | 移除已注册的事件 |
| [`distribute()`](#distribute) | 获取事件分发闭包 |
| [`dispatch()`](#dispatch) | 触发事件 |

### __construct()

```php
public function __construct($name, $subscriptions = [])
```

注册事件

构造即注册到进程内注册表；同名事件重复注册会覆盖已存在的订阅者列表。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string` | — | 事件名称 |
| `$subscriptions` | `array` | `[]` | 订阅者数组 |

### getName()

```php
public function getName()
```

获取事件名称

### getSubscriptions()

```php
public function getSubscriptions()
```

获取订阅者列表

### has()

```php
public static function has($name)
```

检查事件是否已注册

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string` | — | 事件名称 |

### remove()

```php
public static function remove($name)
```

移除已注册的事件

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string` | — | 事件名称 |

### distribute()

```php
public static function distribute($name)
```

获取事件分发闭包

事件是否存在的校验延迟到闭包被调用时（由 dispatch 完成），
因此闭包可在事件注册前创建，注册后再调用。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string` | — | 事件名称 |

### dispatch()

```php
public static function dispatch($name, ...$params)
```

触发事件

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string` | — | 事件名称 |
| `$params` | `...array` | — | 传给订阅者的参数 |

## 非公开方法

**private**

- `private function send($params)` —— 发送订阅通知
- `private function invokeSubscriber($item, $params)` —— 执行单个订阅者
- `private function describeSubscriber($item)` —— 描述订阅者（用于异常日志）

## 同目录

- [Cache](/php/api/foundation/builtin/cache)
- [Config](/php/api/foundation/builtin/config)
- [Deployment](/php/api/foundation/builtin/deployment)
- [Lifecycle](/php/api/foundation/builtin/lifecycle)
- [Log](/php/api/foundation/builtin/log)

