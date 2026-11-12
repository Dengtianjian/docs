# LocalStorage

`kernel\Modules\Storage\Drivers\LocalStorage`  ·  class

源码：`gstudio_kernel/Modules/Storage/Drivers/LocalStorage.php`

> 本地磁盘存储

## 声明

```php
class LocalStorage extends AbstractStorage
```

父类：`AbstractStorage`

## 概述

`AbstractStorage` 的本地实现
本地存储目录下，路径经 `Path::join` 安全拼接，避免
目录穿越。

磁盘名称固定为 `local`。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 构造本地存储实例 |
| [`get()`](#get) | 获取本地文件信息 |
| [`put()`](#put) | 保存/上传文件到本地磁盘 |
| [`delete()`](#delete) | 删除本地文件 |
| [`exists()`](#exists) | 判断本地文件是否存在 |
| [`url()`](#url) | 获取本地文件的完整路径 |

### __construct()

```php
public function __construct()
```

构造本地存储实例

固定将磁盘名称设为 `local`。

### get()

```php
public function get($fileName)
```

获取本地文件信息

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$fileName` | `string` | — | 文件名称 |

### put()

```php
public function put($file, $saveFileName = null)
```

保存/上传文件到本地磁盘

通过 `FileSystem::upload` 将源文件写入目标位置。目标文件名
由 `$saveFileName` 决定（未传则使用源文件的 `name`）。失败时调用
`AbilityBaseObject::break` 返回 500 错误态。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$file` | `array` | — | 源文件描述数组（含 `name` 等上传信息） |
| `$saveFileName` | `string|null` | `null` | 保存后的文件名称（含相对路径）；为 null 时使用 `$file['name']` |

### delete()

```php
public function delete($fileName)
```

删除本地文件

先经 `exists` 确认文件存在（不存在返回 404 错误态），
再以 `url` 得到的完整路径委托 `FileSystem::deleteFile` 执行物理删除。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$fileName` | `string` | — | 文件名称（相对 storage 根目录的路径） |

### exists()

```php
public function exists($fileName)
```

判断本地文件是否存在

以 `url` 得到的完整路径进行 `file_exists` 判定。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$fileName` | `string` | — | 文件名称（相对 storage 根目录的路径） |

### url()

```php
public function url($fileName)
```

获取本地文件的完整路径

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$fileName` | `string` | — | 文件名称（相对 storage 根目录的路径） |

## 同目录

- [AbstractObjectStorage](/php/api/modules/storage/drivers/abstract-object-storage)
- [AbstractStorage](/php/api/modules/storage/drivers/abstract-storage)
- [FTPStorage](/php/api/modules/storage/drivers/ftp-storage)

