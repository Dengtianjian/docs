# DiscuzXQCloudCOSStorage

`kernel\DiscuzX\Foundation\Storage\DiscuzXQCloudCOSStorage`  ·  class

源码：`gstudio_kernel/DiscuzX/Foundation/Storage/DiscuzXQCloudCOSStorage.php`

## 声明

```php
class DiscuzXQCloudCOSStorage extends QCloudCOSStorage
```

父类：[QCloudCOSStorage](/php/api/modules/qcloud/qcloudcos/q-cloud-cos-storage)

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 实例化 DiscuzX 侧的 COS 存储 |

### __construct()

```php
public function __construct(QCloudAccount $account, $region, $bucket)
```

实例化 DiscuzX 侧的 COS 存储

对象操作的客户端（[QCloudCosClient](/php/api/modules/qcloud/qcloudcos/q-cloud-cos-client)）与 STS 客户端
都由父类 `QCloudCOSStorage::boot` 初始化（挂在父类的 `$client` / `$stsClient` 上），
本类不再自行创建客户端。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$account` | `QCloudAccount` | — | 腾讯云账号，提供 SecretId / SecretKey 等凭据 |
| `$region` | `string` | — | 存储桶所在的地区 |
| `$bucket` | `string` | — | 存储桶名称 |

## 同目录

- [DiscuzXFTPStorage](/php/api/discuzx/foundation/storage/discuz-xftp-storage)
- [DiscuzXLocalStorage](/php/api/discuzx/foundation/storage/discuz-x-local-storage)
- [DiscuzXStorage](/php/api/discuzx/foundation/storage/discuz-x-storage)

