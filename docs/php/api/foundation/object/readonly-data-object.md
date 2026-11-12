# ReadonlyDataObject

`kernel\Foundation\Object\ReadonlyDataObject`  ·  class

源码：`gstudio_kernel/Foundation/Object/ReadonlyDataObject.php`

> 只读数据对象（Readonly Data Object）

## 声明

```php
class ReadonlyDataObject extends DataObject
```

父类：`DataObject`

## 概述

`DataObject` 的只读变体：继承 `DataObject` 的全部读写与序列化
能力，但重写 `__set` 以禁止实例化后的任何写入（含未声明的动态属性），
从而保证数据在传递过程中的不可变性。

适用场景：
- 把结构化数据（如配置、查询结果行、外部 API 响应）封装成对象
- 在多个组件间传递，但任意一方都不应意外修改内容

如果需要「实例化后仍可写入」的变体，请直接继承 `DataObject`。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__set()`](#__set) | 禁止在实例化后写入数据 |

### __set()

```php
public function __set($k, $v)
```

禁止在实例化后写入数据

仅拦截写入「未声明的动态属性」；构造期对已声明属性的赋值
不会进入此方法，故实例化过程不受影响。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$k` | `string` | — | — |
| `$v` | `mixed` | — | — |

可能抛出：

- [Error](/php/api/foundation/exception/error)

## 同目录

- [AbilityBaseObject](/php/api/foundation/object/ability-base-object)
- [BaseObject](/php/api/foundation/object/base-object)
- [DataObject](/php/api/foundation/object/data-object)

