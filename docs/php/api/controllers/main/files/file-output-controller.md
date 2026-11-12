# FileOutputController

`kernel\Controllers\Main\Files\FileOutputController`  ·  class

源码：`gstudio_kernel/Controllers/Main/Files/FileOutputController.php`

> 文件输出控制器（预览 / 下载的公共实现）

## 声明

```php
class FileOutputController extends Controller
```

父类：[Controller](/php/api/foundation/controller/controller)

## 概述

`PrewiewFileController` 与 `DownloadFileController` 的流程**除"输出方式"外完全相同**，
曾各自复制一份（前 40 余行逐字相同）。本类作为控制器承载那套公共流程，两者继承它、只声明自己的输出方式：

- 覆写 `$download` 为 `true` 即"下载"（本地 attachment、代理也强制 attachment），默认"预览"（inline）；
- 子类实现唯一的端点方法 `data($fileKey)`，调用本类的 `output`。

公共流程：
1. 鉴权：`Storage::authorizeOperation`（失败直接回 `Storage::return`）；
2. 取文件记录：开启数据存储时查模型，否则走 `Storage::get`；
3. 404 兜底；
4. 过滤掉签名相关 query 参数（`SIGN_QUERY_PARAMS`），其余留给目标地址；
5. 按记录里的 `disk` 取磁盘、取访问地址（`\kernel\Modules\Storage\Drivers\AbstractStorage::url`）；
6. **远程地址**：能被服务端代理的协议（如 `ftp://`，见 `ResponseProxy::canProxy`）→ 代理取回后转发；
其余（http/https 等）→ 补全协议相对地址、并入 query 参数后 302 跳转（省服务端带宽）；
7. **本地路径**：预览 → [ResponseFile](/php/api/foundation/http/response/response-file)（inline，带 `max-age=43200`）；
下载 → [ResponseDownload](/php/api/foundation/http/response/response-download)（attachment）。

说明：本类**不声明 `data()`**（端点方法由子类给出，也就不会被误当成可路由端点），
只提供公共流程；因而是"控制器"而非纯工具类 —— 逻辑与控制器同处一层，可直接使用
`$this->query()` / `$this->fail()` / `$this->request` 等受保护成员。

## 常量

| 常量 | 值 | 说明 |
|---|---|---|
| `SIGN_QUERY_PARAMS` | `["sign-algorithm", "sign-time", "key-time", "header-list", "signature", "url-param-list"]` | 签名相关的 query 参数：不应透传给目标地址 |

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$download` | `boolean` | protected | 是否为下载模式 |

## 方法

本类没有公开方法。

## 非公开方法

**protected**

- `protected function output($fileKey = null)` —— 输出指定文件
- `protected function actionName()` —— 动作名称（用于失败文案：「预览」/「下载」）

## 同目录

- [DeleteFileController](/php/api/controllers/main/files/delete-file-controller)
- [DownloadFileController](/php/api/controllers/main/files/download-file-controller)
- [GetFileAuthController](/php/api/controllers/main/files/get-file-auth-controller)
- [GetFileController](/php/api/controllers/main/files/get-file-controller)
- [GetFileURLController](/php/api/controllers/main/files/get-file-url-controller)
- [PrewiewFileController](/php/api/controllers/main/files/prewiew-file-controller)
- [UpdateFileController](/php/api/controllers/main/files/update-file-controller)
- [UploadFileController](/php/api/controllers/main/files/upload-file-controller)

