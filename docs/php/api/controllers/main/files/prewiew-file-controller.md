# PrewiewFileController

`kernel\Controllers\Main\Files\PrewiewFileController`  ·  class

源码：`gstudio_kernel/Controllers/Main/Files/PrewiewFileController.php`

> 预览文件

## 声明

```php
class PrewiewFileController extends FileOutputController
```

父类：`FileOutputController`

## 概述

公共流程见父类 `FileOutputController`；本类只声明"预览"这一输出方式
（本地 inline 输出、带 `max-age=43200` 缓存；远程资源按协议选择服务端代理或 302 跳转）。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`data()`](#data) | 预览指定文件 |

### data()

```php
public function data($fileKey = null)
```

预览指定文件

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$fileKey` | `string|null` | `null` | 文件键 |

## 同目录

- [DeleteFileController](/php/api/controllers/main/files/delete-file-controller)
- [DownloadFileController](/php/api/controllers/main/files/download-file-controller)
- [FileOutputController](/php/api/controllers/main/files/file-output-controller)
- [GetFileAuthController](/php/api/controllers/main/files/get-file-auth-controller)
- [GetFileController](/php/api/controllers/main/files/get-file-controller)
- [GetFileURLController](/php/api/controllers/main/files/get-file-url-controller)
- [UpdateFileController](/php/api/controllers/main/files/update-file-controller)
- [UploadFileController](/php/api/controllers/main/files/upload-file-controller)

