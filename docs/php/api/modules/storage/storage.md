# Storage

`kernel\Modules\Storage\Storage`  ·  class

源码：`gstudio_kernel/Modules/Storage/Storage.php`

> 文件存储门面

## 声明

```php
class Storage extends Facade
```

父类：[Facade](/php/api/foundation/facade/facade)

## 概述

门面本身不持有实例：`Storage::get(...)` 每次都向**当前应用**的容器取
`Storage::class`，也就是 [StorageModule](/php/api/modules/storage/storage-module) 构造时登记的那一份
（磁盘池、访问控制、落库、文件路由都在它上面）。

与 `$app->make(Storage::class)`、`$app->storage()` 完全同源——登记时用的是
`$app->instance(Storage::class, $storage, "storage")`，三个键指向同一对象。

未装配时直接抛错，不会反射新建一个配置全默认的空存储。

## 转发方法

门面通过 `__callStatic` 转发到实例，以下为可用的静态方法：

| 签名 | 说明 |
|---|---|
| `get(string $fileKey)` | 读取文件内容 |
| `put($file, $saveFileName = null)` | 上传并保存 |
| `delete(string $key)` | 删除文件 |
| `exists(string $key)` | 判断文件是否存在 |
| `url(string $fileKey)` | 生成访问地址 |
| `direct(string $fileKey, array $urlParams = [], int $expires = 1800, bool $withSignature = true)` | 直接向磁盘取地址 |
| `verifySignature(string $fileKey, array $rawURLParams, array $rawHeaders = [], string $httpMethod = "get", $action = null)` | 校验访问签名 |
| `registerRoute($nameOrUri, $methodOrController = null, $controller = null)` | 注册文件路由 |
| `enableDataSave()` | 开启文件元信息落库 |
| `accessControl($val = null, $authId = null, $enableAuth = null)` | 配置访问控制 |
| `disk($name = null)` | 切换磁盘 |
| `disks()` | 全部磁盘（别名 => 驱动） |

## 方法

本类没有公开方法。

## 非公开方法

**protected**

- `protected static function resolve()` —— 容器键：存储实例

## 同目录

- [FilesModel](/php/api/modules/storage/files-model)
- [StorageFile](/php/api/modules/storage/storage-file)
- [StorageModule](/php/api/modules/storage/storage-module)
- [StorageProvider](/php/api/modules/storage/storage-provider)
- [StorageSignature](/php/api/modules/storage/storage-signature)
- [StorageURL](/php/api/modules/storage/storage-url)

