# AliyunOSSStorage

`kernel\Modules\Aliyun\AliyunOSS\AliyunOSSStorage`  ·  class

源码：`gstudio_kernel/Modules/Aliyun/AliyunOSS/AliyunOSSStorage.php`

> 阿里云 OSS 存储磁盘

## 声明

```php
class AliyunOSSStorage extends AbstractObjectStorage
```

父类：[AbstractObjectStorage](/php/api/modules/storage/drivers/abstract-object-storage)

## 概述

继承抽象的对象存储骨架（AbstractObjectStorage），实现阿里云对象存储 OSS 的
上传 / 读取 / 删除 / 存在性判断 / 访问 URL 等能力。内部同时使用 OSS V2 SDK
（`Oss\Client`，主操作）与 V1 SDK（`OssClient`，兼容接口），
并借助 STS（`Sts`）申请临时访问凭证（`getSTSToken`）。

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$roleArn` | `string` | protected | 获取的角色ARN |
| `$policy` | `array` | protected | 填写自定义权限策略，用于进一步限制STS临时访问凭证的权限。如果不指定Policy，则返回的STS临时访问凭证默认拥有指定角色的所有权限。  临时访问凭证最后获得的权限是步骤4设置的角色权限和该Policy设置权限的交集。 |
| `$sdkClient` | `Oss\Client` | protected | SDK实例 |
| `$sdkV1Client` | `OssClient` | protected | v1 SDK 实例 |
| `$stsClient` | `Sts|null` | protected | — |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 构造阿里云 OSS 存储磁盘 |
| [`get()`](#get) | 获取文件元信息 |
| [`put()`](#put) | 上传文件到 OSS |
| [`delete()`](#delete) | 删除 OSS 上的文件 |
| [`exists()`](#exists) | 判断 OSS 上文件是否存在 |
| [`url()`](#url) | 获取文件访问 URL（预签名） |
| [`getSTSToken()`](#getststoken) | 获取 STS Token |

### __construct()

```php
public function __construct($accessKeyId, $accessKeySecret, $region, $bucket, $roleArn = null, $policy = null)
```

构造阿里云 OSS 存储磁盘

设置磁盘名（oss）并记录 STS 角色 ARN 与自定义权限策略，再调用父类构造注入密钥/地域/桶。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$accessKeyId` | `string` | — | 阿里云 AccessKeyId |
| `$accessKeySecret` | `string` | — | 阿里云 AccessKeySecret |
| `$region` | `string` | — | OSS 所在地域 |
| `$bucket` | `string` | — | 存储桶名称 |
| `$roleArn` | `string|null` | `null` | STS 角色 ARN（申请临时凭证时使用），null 表示不启用 STS |
| `$policy` | `array|null` | `null` | 自定义权限策略，进一步收敛 STS 临时凭证权限；null 表示使用角色默认权限 |

### get()

```php
public function get($fileName)
```

获取文件元信息

先确认文件存在（不存在返回 404 错误态），再经 SDK headObject 获取对象元信息，
并组装为统一的文件信息数组（含 name/disk/sourceFileName/path/extension/size/width/height/filePath）。
注意：width/height 在此统一置为 null（OSS 不随 head 返回图片尺寸，需由调用方另行探测）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$fileName` | `string` | — | 文件键 |

### put()

```php
public function put($file, $saveFileName = null)
```

上传文件到 OSS

流程：先以临时文件名落到本地 `cos_temp` 目录，校验临时文件落盘成功后探测图片尺寸，
再经 V2 SDK 分片上传至 OSS；上传成功后复用 `get` 取回元信息并回填宽高，最后返回。
任意环节失败均清理临时文件并抛出异常 / 错误态。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$file` | `array` | — | 上传文件数组（同 PHP $_FILES 单文件结构） |
| `$saveFileName` | `string|null` | `null` | 目标文件键；为 null 时使用 $file['name'] |

### delete()

```php
public function delete($fileName)
```

删除 OSS 上的文件

调用 SDK 删除对象。注意：本方法不校验 SDK 删除是否真正成功，无论结果一律返回 true，
调用方无法据此判断文件是否已被删除；SDK 调用本身抛异常时会上抛 Error。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$fileName` | `string` | — | 文件键 |

可能抛出：

- [Error](/php/api/foundation/exception/error) SDK 调用异常时抛出

### exists()

```php
public function exists($fileName)
```

判断 OSS 上文件是否存在

底层调用 SDK 的 isObjectExist。注意：本方法在对象不存在时返回 false，
但 SDK 调用本身抛异常（如网络/鉴权错误）时会上抛 Error，不会静默返回 false。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$fileName` | `string` | — | 文件键 |

可能抛出：

- [Error](/php/api/foundation/exception/error) SDK 调用异常时抛出

### url()

```php
public function url($fileName, $urlParams = [], $expires = 1800, $withSignature = true)
```

获取文件访问 URL（预签名）

通过 SDK presign 生成预签名访问 URL。注意：当前实现**忽略了** $urlParams / $expires / $withSignature 三参数，
仅生成默认预签名 URL（pre-signed URL 本身即带时效签名），不对这三者做定制。
若需区分"带/不带签名"或自定义有效期，需后续改造本方法。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$fileName` | `string` | — | 文件键 |
| `$urlParams` | `array` | `[]` | 预留参数（当前未参与计算） |
| `$expires` | `int` | `1800` | 预留参数（当前未参与计算） |
| `$withSignature` | `boolean` | `true` | 预留参数（当前未参与计算） |

### getSTSToken()

```php
public function getSTSToken($durationSeconds = 3000, $roleSessionName = "oss_session")
```

获取 STS Token

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$durationSeconds` | `integer` | `3000` | 用于设置临时访问凭证有效时间单位为秒，最小值为900，最大值以当前角色设定的最大会话时间为准 |
| `$roleSessionName` | `string` | `"oss_session"` | 用于自定义角色会话名称，用来区分不同的令牌 |

## 非公开方法

**protected**

- `protected function boot()` —— 磁盘引导初始化（由 AbilityBaseObject 生命周期触发）

## 同目录

- [AliyunOSSCredentialsProvider](/php/api/modules/aliyun/aliyunoss/aliyun-oss-credentials-provider)

