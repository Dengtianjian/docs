# StorageFile

`kernel\Modules\Storage\StorageFile`  ·  class

源码：`gstudio_kernel/Modules/Storage/StorageFile.php`

> 文件信息数据对象

**无方法**

## 声明

```php
class StorageFile extends DataObject
```

父类：[DataObject](/php/api/foundation/object/data-object)

## 概述

存储单个文件的元数据信息，由磁盘驱动的 getFile() 返回。
属性与文件模型（files 表）字段对应。

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$id` | `int|null` | protected | 文件记录 ID |
| `$key` | `string|null` | protected | 文件键（文件路径 + 文件名称） |
| `$name` | `string|null` | protected | 保存后文件名称 |
| `$source_file_name` | `string|null` | protected | 原文件名称 |
| `$path` | `string|null` | protected | 保存的文件路径（相对存储根目录） |
| `$extension` | `string|null` | protected | 文件扩展名 |
| `$size` | `float|null` | protected | 文件尺寸（字节） |
| `$filePath` | `string|null` | protected | 文件完整路径（含文件名） |
| `$width` | `float|null` | protected | 宽度（媒体文件才有该值） |
| `$height` | `float|null` | protected | 高度（媒体文件才有该值） |
| `$disk` | `string|null` | protected | 存储磁盘名称 |
| `$access_control` | `string|null` | protected | 访问控制权限（PRIVATE/PUBLIC_READ 等） |
| `$owner_id` | `string|null` | protected | 所属用户 ID |
| `$mime_type` | `string|null` | protected | 文件 MIME 类型 |
| `$ref` | `string|null` | protected | 引用的 ID |
| `$type` | `string|null` | protected | 引用的业务 |

## 方法

本类没有公开方法。

## 同目录

- [FilesModel](/php/api/modules/storage/files-model)
- [Storage](/php/api/modules/storage/storage)
- [StorageModule](/php/api/modules/storage/storage-module)
- [StorageProvider](/php/api/modules/storage/storage-provider)
- [StorageSignature](/php/api/modules/storage/storage-signature)
- [StorageURL](/php/api/modules/storage/storage-url)

