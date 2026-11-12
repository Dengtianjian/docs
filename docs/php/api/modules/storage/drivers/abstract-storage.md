# AbstractStorage

`kernel\Modules\Storage\Drivers\AbstractStorage`  ·  class

源码：`gstudio_kernel/Modules/Storage/Drivers/AbstractStorage.php`

> 存储抽象基类

## 声明

```php
class AbstractStorage extends AbilityBaseObject
```

父类：[AbilityBaseObject](/php/api/foundation/object/ability-base-object)

## 概述

定义一套与具体存储后端无关的磁盘存储契约：本地磁盘、对象存储（OSS/S3 等）
均继承本类并实现下列抽象方法，调用方只需面向 AbstractStorage 编程即可在
不同存储之间无缝切换。

每个实例代表「一个磁盘」（通过 `name` 标识），磁盘名称在构造时指定，
默认名为 `local`。

子类约定：
- `get()`     读取文件元信息
- `put()`     写入/上传文件
- `delete()`  删除文件
- `exists()`  判断文件是否存在
- `url()`     返回文件可访问路径/URL

继承 [AbilityBaseObject](/php/api/foundation/object/ability-base-object)，因此具备 `setError()` / `return()` / `break()`
等错误与中断处理能力（如 put 失败可通过 `break()` 返回错误态）。

注：ACL 标签常量（`\kernel\Modules\Storage\StorageModule::PRIVATE` 等）
定义在聚合门面 [StorageModule](/php/api/modules/storage/storage-module) 上，不在本基类。

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$name` | `string|null` | protected | 当前磁盘名称 |
| `$basePath` | `string` | protected | 本磁盘内 fileKey 的基准路径 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 构造存储实例 |
| [`name()`](#name) | 获取当前磁盘名称 |
| [`basePath()`](#basepath) | 获取本磁盘内 fileKey 的基准路径 |
| [`get()`](#get) | — |
| [`put()`](#put) | — |
| [`delete()`](#delete) | — |
| [`exists()`](#exists) | — |
| [`url()`](#url) | — |

### __construct()

```php
public function __construct($name = "local", $basePath = "")
```

构造存储实例

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string` | `"local"` | 磁盘名称，默认 `local` |
| `$basePath` | `string` | `""` | 本磁盘内 fileKey 的基准路径 |

### name()

```php
public function name()
```

获取当前磁盘名称

### basePath()

```php
public function basePath()
```

获取本磁盘内 fileKey 的基准路径

### get()

```php
public abstract function get($fileName)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$fileName` | `mixed` | — | — |

### put()

```php
public abstract function put($file)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$file` | `mixed` | — | — |

### delete()

```php
public abstract function delete($fileName)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$fileName` | `mixed` | — | — |

### exists()

```php
public abstract function exists($fileName)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$fileName` | `mixed` | — | — |

### url()

```php
public abstract function url($fileName)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$fileName` | `mixed` | — | — |

## 同目录

- [AbstractObjectStorage](/php/api/modules/storage/drivers/abstract-object-storage)
- [FTPStorage](/php/api/modules/storage/drivers/ftp-storage)
- [LocalStorage](/php/api/modules/storage/drivers/local-storage)

