# SettingModule

`kernel\Modules\Setting\SettingModule`  ·  class

源码：`gstudio_kernel/Modules/Setting/SettingModule.php`

> 设置服务

## 声明

```php
class SettingModule extends AbilityBaseObject
```

父类：[AbilityBaseObject](/php/api/foundation/object/ability-base-object)

## 概述

键值对设置项的读写入口：值经 serialize() 落库，读取时反序列化，
并区分「字符串 false」与「布尔 false」。持久化交给同目录的 `SettingsModel`，
本类只做编解码与字段维护（`updated_at`）。

由 [Setting](/php/api/modules/setting/setting) 绑定为应用单例：每个应用各自一份，
因此「给哪个应用加设置」由容器决定，不靠全局状态推断。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`model()`](#model) | 本应用的表访问入口 |
| [`items()`](#items) | 获取多个设置项 |
| [`item()`](#item) | 获取单个设置项值 |
| [`exists()`](#exists) | 查询某个设置项是否存在 |
| [`add()`](#add) | 添加设置项 |
| [`save()`](#save) | 保存单个设置项 |
| [`saveItems()`](#saveitems) | 保存多个设置项值 |

### model()

```php
public function model()
```

本应用的表访问入口

每次调用新建一个**绑定到本服务所属应用**的模型：模型是「一次查询一条链」的轻量对象，
表名在构造时按绑定的应用解析，因此 download 读 super_app 的设置才对得上表。

### items()

```php
public function items(...$names)
```

获取多个设置项

未传入任何名称时返回空数组：空名称列表继续下传会拼出 `` `name` IN () `` 这种非法 SQL。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$names` | `...array` | — | 设置项名称数组 |

### item()

```php
public function item($name)
```

获取单个设置项值

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string` | — | 设置项名称 |

### exists()

```php
public function exists($name)
```

查询某个设置项是否存在

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string` | — | 设置项名称 |

### add()

```php
public function add($name, $value = null, $serialization = true)
```

添加设置项

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string` | — | 设置项名称 |
| `$value` | `mixed` | `null` | 设置项值 |
| `$serialization` | `boolean` | `true` | 是否需要序列化后存储 |

### save()

```php
public function save($name, $value, $serialization = true)
```

保存单个设置项

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string` | — | 设置项名称 |
| `$value` | `string` | — | 设置项值 |
| `$serialization` | `boolean` | `true` | 是否需要序列化后存储 |

### saveItems()

```php
public function saveItems($settings)
```

保存多个设置项值

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$settings` | `array` | — | 设置项键值对，键是设置项名称，值是设置项值 |

## 非公开方法

**protected**

- `protected function decodeValue($raw)` —— 反序列化设置值

## 同目录

- [Setting](/php/api/modules/setting/setting)
- [SettingsModel](/php/api/modules/setting/settings-model)

