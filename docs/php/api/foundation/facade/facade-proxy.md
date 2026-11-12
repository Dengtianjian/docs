# FacadeProxy

`kernel\Foundation\Facade\FacadeProxy`  ·  class

源码：`gstudio_kernel/Foundation/Facade/FacadeProxy.php`

> 门面代理（FacadeProxy）

## 声明

```php
class FacadeProxy
```

## 概述

把「任意类」包装成可静态式调用的门面：调用方无需手动 new，即可通过代理
直接调用目标类的实例方法，底层自动单例化（同一类名首次实例化后复用）。

由 `Facade::of` 创建，典型用法：
```php
Facade::of(SomeService::class)->doSomething($a, $b);
Facade::of(SomeService::class, $dep)->doSomething(); // 构造参数仅首次实例化生效
```

语义与 `\kernel\Foundation\Object\BaseObject::singleton` 对齐：
- 单例按「目标类名」隔离，互不共享；
- 构造参数仅在首次实例化时生效；之后以不同非空参数再次调用会抛异常，
避免静默拿到旧实例。

目标类无需继承任何基类，也不需要是 static 方法——代理统一转发到实例方法上。

## 示例

```php
Facade::of(SomeService::class)->doSomething($a, $b);
Facade::of(SomeService::class, $dep)->doSomething(); // 构造参数仅首次实例化生效
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `static $instances` | `array` | `[]` | — |
| `static $fingerprints` | `array` | `[]` | — |

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$class` | `string` | protected | — |
| `$args` | `array` | protected | — |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | — |
| [`__call()`](#__call) | 实例方法转发 |
| [`__get()`](#__get) | 属性读取透传（返回目标实例的公开/动态属性） |
| [`__set()`](#__set) | 属性写入透传 |

### __construct()

```php
public function __construct(string $class, array $args = [])
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$class` | `string` | — | 目标类名（完整命名空间） |
| `$args` | `array` | `[]` | 目标类构造参数（仅首次实例化生效） |

### __call()

```php
public function __call(string $method, array $arguments)
```

实例方法转发

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$method` | `string` | — | 方法名 |
| `$arguments` | `array` | — | 参数列表 |

### __get()

```php
public function __get(string $name)
```

属性读取透传（返回目标实例的公开/动态属性）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string` | — | 属性名 |

### __set()

```php
public function __set(string $name, $value): void
```

属性写入透传

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string` | — | 属性名 |
| `$value` | `mixed` | — | 值 |

返回：`void` —— void

## 非公开方法

**protected**

- `protected function instance()` —— 解析目标实例（惰性单例）

**private**

- `private function fingerprint(array $args): ?string` —— 生成构造参数指纹（用于一致性校验）

## 同目录

- [Facade](/php/api/foundation/facade/facade)

