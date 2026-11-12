# GetFileAuthController

`kernel\Controllers\Main\Files\GetFileAuthController`  ·  class

源码：`gstudio_kernel/Controllers/Main/Files/GetFileAuthController.php`

> 获取文件操作授权

## 声明

```php
class GetFileAuthController extends AuthController
```

父类：[AuthController](/php/api/foundation/controller/auth-controller)

## 概述

对应存储层注册的 `auth` 路由：`{prefix}/auth/{method:(get|post|patch|delete)}`
（见 `\kernel\Modules\Storage\StorageModule::registerRoute`），
URL 里的 `method` 会作为 `data` 的第一个参数传入，据此派发到同名方法。

作用是向调用方**签发带签名与有效期的授权参数**（`Storage::createAuthParams`）：
客户端先来这里换授权，再拿授权去调用真正的读取 / 上传 / 修改 / 删除接口。

四种方法的差异：
- `get`：**无需登录**（读取权限最终由文件 ACL 在真正读取时判定）；
- `post`：需登录；登记文件元信息（开启数据存储时写库）并返回上传授权；
- `patch` / `delete`：需登录；分别返回修改、删除授权。

请求体字段与类型转换规则见 `$requestBodySerializes`。

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$requestBodySerializes` | `array` | protected | 请求体字段的类型转换规则（字段名 => 类型） |
| `$fileKey` | `string|null` | protected | 本次操作的文件键 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`data()`](#data) | 接口入口：按 URL 中的方法名派发，返回对应的授权参数 |

### data()

```php
public function data(string $method)
```

接口入口：按 URL 中的方法名派发，返回对应的授权参数

流程：校验方法名 → 从请求体取 `fileKey`（除 `post` 外必须非空）→ 调用同名方法
（`get` / `post` / `patch` / `delete`）；若该调用返回
[Response](/php/api/foundation/http/response)（例如 `post` 的 success、或各方法的 fail）则直接作为响应返回，
否则把授权参数包成 `{key, method, auth}` 返回。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$method` | `string` | — | 操作方法，取值 `post` / `get` / `patch` / `delete` |

## 非公开方法

**protected**

- `protected function patch(string $fileKey)` —— 签发「修改」授权（需登录）
- `protected function get(string $fileKey)` —— 签发「读取」授权（无需登录）
- `protected function post($fileKey = null)` —— 签发「上传」授权，并登记文件元信息（需登录）
- `protected function delete(string $fileKey)` —— 签发「删除」授权（需登录）

## 同目录

- [DeleteFileController](/php/api/controllers/main/files/delete-file-controller)
- [DownloadFileController](/php/api/controllers/main/files/download-file-controller)
- [FileOutputController](/php/api/controllers/main/files/file-output-controller)
- [GetFileController](/php/api/controllers/main/files/get-file-controller)
- [GetFileURLController](/php/api/controllers/main/files/get-file-url-controller)
- [PrewiewFileController](/php/api/controllers/main/files/prewiew-file-controller)
- [UpdateFileController](/php/api/controllers/main/files/update-file-controller)
- [UploadFileController](/php/api/controllers/main/files/upload-file-controller)

