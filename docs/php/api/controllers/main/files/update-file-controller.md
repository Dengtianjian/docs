# UpdateFileController

`kernel\Controllers\Main\Files\UpdateFileController`  ·  class

源码：`gstudio_kernel/Controllers/Main/Files/UpdateFileController.php`

## 声明

```php
class UpdateFileController extends Controller
```

父类：[Controller](/php/api/foundation/controller/controller)

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$requestBodySerializes` | `mixed` | `[ "disk" => "string", "ref" => "string",`… | — |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | — |
| [`data()`](#data) | — |

### __construct()

```php
public function __construct(Request $R)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$R` | `Request` | — | — |

### data()

```php
public function data(string $fileKey)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$fileKey` | `string` | — | — |

## 同目录

- [DeleteFileController](/php/api/controllers/main/files/delete-file-controller)
- [DownloadFileController](/php/api/controllers/main/files/download-file-controller)
- [FileOutputController](/php/api/controllers/main/files/file-output-controller)
- [GetFileAuthController](/php/api/controllers/main/files/get-file-auth-controller)
- [GetFileController](/php/api/controllers/main/files/get-file-controller)
- [GetFileURLController](/php/api/controllers/main/files/get-file-url-controller)
- [PrewiewFileController](/php/api/controllers/main/files/prewiew-file-controller)
- [UploadFileController](/php/api/controllers/main/files/upload-file-controller)

