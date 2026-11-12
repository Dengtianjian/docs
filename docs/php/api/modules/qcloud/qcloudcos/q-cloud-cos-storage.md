# QCloudCOSStorage

`kernel\Modules\QCloud\QCloudCos\QCloudCOSStorage`  ·  class

源码：`gstudio_kernel/Modules/QCloud/QCloudCos/QCloudCOSStorage.php`

> 腾讯云 COS 存储磁盘

## 声明

```php
class QCloudCOSStorage extends AbstractObjectStorage
```

父类：[AbstractObjectStorage](/php/api/modules/storage/drivers/abstract-object-storage)

## 概述

继承抽象的对象存储骨架（AbstractObjectStorage），实现腾讯云对象存储 COS 的
上传 / 读取 / 删除 / 存在性判断 / 访问 URL 等能力。对象操作统一走 `QCloudCosClient`
（它内部再决定**用官方 SDK 还是自己发签名请求**，以适配不同环境），
并用 [QCloudSTS](/php/api/modules/qcloud/sts/q-cloud-sts) 申请临时凭证（前端直传场景）。

凭据（SecretId / SecretKey / SecurityToken）取自构造传入的 [QCloudAccount](/php/api/modules/qcloud/q-cloud-account)；
存储桶与地域仍属本磁盘自己的配置，由构造另行传入 —— 与「账号只管凭据」的分工一致。
父类 [AbstractObjectStorage](/php/api/modules/storage/drivers/abstract-object-storage) 是 COS / OSS 共用的骨架，保持裸密钥契约不变，
因此「账号 → 裸密钥」的拆包由本类完成。

本磁盘同时承担「文件访问签名签发」职责：`createAuthorization` 借助
`QCloudCosSignture` 生成 COS 风格的签名授权参数，供 FileStorage 统一鉴权流程调用。

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$account` | `QCloudAccount|null` | protected | — |
| `$stsClient` | `QCloudSTS|null` | protected | — |
| `$client` | `QCloudCosClient|null` | protected | — |
| `$host` | `string|null` | protected | — |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 实例化 COS 存储磁盘 |
| [`client()`](#client) | 读取或设置存储服务客户端实例 |
| [`get()`](#get) | 获取文件信息 |
| [`put()`](#put) | 上传文件到 COS |
| [`delete()`](#delete) | 删除 COS 上的文件 |
| [`exists()`](#exists) | 判断 COS 上文件是否存在 |
| [`url()`](#url) | 获取 COS 文件的访问 URL |
| [`getTempKeys()`](#gettempkeys) | 申请 COS 临时上传凭证（STS） |
| [`createAuthorization()`](#createauthorization) | 生成 COS 文件访问签名授权参数 |
| [`convertURLParams()`](#converturlparams) | 转换 URL 的 query 参数 因为每个平台对文件的处理参数都不一样，所以就诞生了该方法，把统一的文件处理参数转换为指定平台的处理参数 例如腾讯云 COS 的图片缩放是 `imageMogr2/thumbnail/!40p`，而文件链接的是传 `s=40` 就需要使用该方法把 `s=40` 转换为 `imageMogr2/thumbnail/!40p`，再去生成链接 |

### __construct()

```php
public function __construct(QCloudAccount $account, $region, $bucket)
```

实例化 COS 存储磁盘

账号必须在调用父类构造**之前**赋值：父类构造末尾会触发 `boot`，
而 boot() 需要账号来初始化 STS 与 COS 客户端。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$account` | `QCloudAccount` | — | 腾讯云账号，提供 SecretId / SecretKey 等凭据 |
| `$region` | `string` | — | 存储桶所在地区，如 ap-guangzhou |
| `$bucket` | `string` | — | 存储桶名称，形如 bucketName-appid |

### client()

```php
public function client($client = null)
```

读取或设置存储服务客户端实例

读写一体：传参时设置客户端并返回 `$this`（链式）；不传时返回当前客户端
（未设置时为 null）。客户端由子类在自己的 `boot` 里创建。

```php
$storage->client($myClient);    // 注入
$client = $storage->client();   // 读取
```

⚠️ 读分支必须访问**属性** `$this->client`；若写成 `$this->client()`，PHP 会把它当成
**递归调用本方法**（本类同时有同名属性 `$client` 与同名方法 `client()`），从而无限递归。

💡 本子类用的就是父类的 `$client` 属性（在 `boot` 里注入 `QCloudCosClient`）。

```php
$storage->client($myClient);    // 注入
$client = $storage->client();   // 读取
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$client` | `mixed|null` | `null` | 客户端实例；不传（`func_num_args()` 为 0）则读取 |

### get()

```php
public function get($fileName)
```

获取文件信息

读取元信息，并补充 `disk = "cos"` 字段。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$fileName` | `string` | — | 文件名称（相对 storage 根目录的路径） |

### put()

```php
public function put($file, $saveFileName = null)
```

上传文件到 COS

流程：先以临时文件名落到本地 `cos_temp` 目录，校验临时文件落盘成功后，
探测图片尺寸（若有），再经 COS 客户端上传（按文件大小自动选简单/分块）；
上传成功后清理临时文件并回填图片宽高，
最后复用 `get` 取回完整元信息。任意环节失败均清理临时文件并抛出异常 / 错误态。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$file` | `array` | — | 上传文件数组（同 PHP $_FILES 单文件结构） |
| `$saveFileName` | `string|null` | `null` | 目标文件键；为 null 时使用 $file['name'] |

### delete()

```php
public function delete($fileKey)
```

删除 COS 上的文件

调用 COS 客户端删除对象；**失败时向上抛 Error**。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$fileKey` | `string` | — | 文件键 |

可能抛出：

- [Error](/php/api/foundation/exception/error) 删除失败（细节见客户端 {@see QCloudCosClient::lastError()）}

### exists()

```php
public function exists($fileName)
```

判断 COS 上文件是否存在

底层调客户端的 `QCloudCosClient::exists`。**只有 200 才算存在**，
所以「对象不存在（404）」与「没权限（403）」都会返回 false；而
「未建立连接（状态码 0）」或「服务端 5xx」视为**调用失败**，按原契约上抛 Error。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$fileName` | `string` | — | 文件键 |

可能抛出：

- [Error](/php/api/foundation/exception/error) 网络/服务端错误时抛出

### url()

```php
public function url($fileName, $urlParams = [], $expires = 1800, $withSignature = true)
```

获取 COS 文件的访问 URL

根据 $withSignature 决定生成带时效签名的 URL 或公开无签名 URL：
- 带签名（默认）：`QCloudCosClient::presignedUrl` —— 拼上 `q-*` 签名参数，$expires 秒内有效；
- 无签名：`QCloudCosClient::objectUrl` —— 直接拼域名，可公开访问（依赖桶的公开读策略）。

两者都是**纯计算**（不发请求），域名形如 `https://{bucket}.cos.{region}.myqcloud.com`。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$fileName` | `string` | — | 文件键（内部会 trim 去掉首尾空白） |
| `$urlParams` | `array` | `[]` | 附加的 URL 参数（当前实现未参与计算，保留以对齐父类签名） |
| `$expires` | `int` | `1800` | 带签名时的有效时长（秒），默认 1800 |
| `$withSignature` | `boolean` | `true` | 是否生成带时效签名的 URL，默认 true |

### getTempKeys()

```php
public function getTempKeys($allowPrefix = null, $allowActions = null, $durationSeconds = 1800)
```

申请 COS 临时上传凭证（STS）

委托 [QCloudSTS](/php/api/modules/qcloud/sts/q-cloud-sts) 获取临时密钥，供前端/客户端直传 COS 使用。
失败时解析 STS 返回的错误结构，归一化为本框架的 break 错误态。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$allowPrefix` | `string|array` | `null` | 允许操作的对象前缀（路径白名单），null 时使用默认 |
| `$allowActions` | `array` | `null` | 允许的操作动作列表，null 时使用默认 |
| `$durationSeconds` | `int` | `1800` | 凭证有效期（秒），默认 1800 |

### createAuthorization()

```php
public function createAuthorization($fileKey = null, $expires = 1800, $httpMethod = "get", $urlParams = [], $headers = [])
```

生成 COS 文件访问签名授权参数

借助 `QCloudCosSignture` 生成 COS 风格的签名（含 sign-algorithm / sign-time /
key-time / header-list / signature / url-param-list 等），供 FileStorage 统一鉴权流程调用。
文件键若不以 "/" 开头会自动补前缀。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$fileKey` | `string|null` | `null` | 文件键，null 时表示仅生成通用签名 |
| `$expires` | `int` | `1800` | 签名有效期（秒），默认 1800 |
| `$httpMethod` | `string` | `"get"` | 参与的 HTTP 方法，默认 get |
| `$urlParams` | `array` | `[]` | 参与签名的 URL 参数 |
| `$headers` | `array` | `[]` | 参与签名的请求头 |

### convertURLParams()

```php
public function convertURLParams($urlParams, $targetName)
```

转换 URL 的 query 参数 因为每个平台对文件的处理参数都不一样，所以就诞生了该方法，把统一的文件处理参数转换为指定平台的处理参数 例如腾讯云 COS 的图片缩放是 `imageMogr2/thumbnail/!40p`，而文件链接的是传 `s=40` 就需要使用该方法把 `s=40` 转换为 `imageMogr2/thumbnail/!40p`，再去生成链接

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$urlParams` | `array` | — | URL 参数 |
| `$targetName` | `string` | — | 目标平台 |

## 非公开方法

**protected**

- `protected function boot()` —— 磁盘引导初始化（由 AbilityBaseObject 生命周期触发）

## 同目录

- [QCloudCosClient](/php/api/modules/qcloud/qcloudcos/q-cloud-cos-client)
- [QCloudCosSignture](/php/api/modules/qcloud/qcloudcos/q-cloud-cos-signture)

