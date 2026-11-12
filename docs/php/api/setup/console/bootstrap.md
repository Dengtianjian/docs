# Bootstrap

`kernel\Setup\Console\Bootstrap`  ·  class

源码：`gstudio_kernel/Setup/Console/Bootstrap.php`

> 内核 CLI 装配类

## 声明

```php
class Bootstrap extends AbilityBaseObject
```

父类：[AbilityBaseObject](/php/api/foundation/object/ability-base-object)

## 概述

在 kernel/console 入口通过 `new Console(Bootstrap::class)` 装配。
构造不接收 Console 实例：Console 就是当前默认应用，用继承的 app() 回落取到，
再调用其 addCommand() 注册内核命令。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | — |

### __construct()

```php
public function __construct()
```

