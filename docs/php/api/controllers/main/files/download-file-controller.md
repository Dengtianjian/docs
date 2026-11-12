# DownloadFileController

`kernel\Controllers\Main\Files\DownloadFileController`  ·  class

源码：`gstudio_kernel/Controllers/Main/Files/DownloadFileController.php`

> 下载文件

## 声明

```php
class DownloadFileController extends FileOutputController
```

父类：`FileOutputController`

## 概述

公共流程见父类 `FileOutputController`；本类只声明"下载"这一输出方式
（本地 attachment 输出；远程资源同样按协议选择服务端代理或 302 跳转，走代理时**强制 attachment**，
不会因为文件是图片就变成内联打开）。

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$download` | `boolean` | protected | 下载模式 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`data()`](#data) | 下载指定文件 |

### data()

```php
public function data($fileKey = null)
```

下载指定文件

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$fileKey` | `string|null` | `null` | 文件键 |

## 同目录

- [DeleteFileController](/php/api/controllers/main/files/delete-file-controller)
- [FileOutputController](/php/api/controllers/main/files/file-output-controller)
- [GetFileAuthController](/php/api/controllers/main/files/get-file-auth-controller)
- [GetFileController](/php/api/controllers/main/files/get-file-controller)
- [GetFileURLController](/php/api/controllers/main/files/get-file-url-controller)
- [PrewiewFileController](/php/api/controllers/main/files/prewiew-file-controller)
- [UpdateFileController](/php/api/controllers/main/files/update-file-controller)
- [UploadFileController](/php/api/controllers/main/files/upload-file-controller)

