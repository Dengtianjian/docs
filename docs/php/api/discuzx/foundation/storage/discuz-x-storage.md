# DiscuzXStorage

`kernel\DiscuzX\Foundation\Storage\DiscuzXStorage`  ·  class

源码：`gstudio_kernel/DiscuzX/Foundation/Storage/DiscuzXStorage.php`

## 声明

```php
class DiscuzXStorage extends Storage
```

父类：`Storage`

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | — |
| [`verifySignature()`](#verifysignature) | — |

### __construct()

```php
public function __construct($disks = null)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$disks` | `mixed` | `null` | — |

### verifySignature()

```php
public function verifySignature($fileKey, $rawURLParams, $rawHeaders = [], $httpMethod = "get", $action = null)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$fileKey` | `mixed` | — | — |
| `$rawURLParams` | `mixed` | — | — |
| `$rawHeaders` | `mixed` | `[]` | — |
| `$httpMethod` | `mixed` | `"get"` | — |
| `$action` | `mixed` | `null` | — |

## 同目录

- [DiscuzXFTPStorage](/php/api/discuzx/foundation/storage/discuz-xftp-storage)
- [DiscuzXLocalStorage](/php/api/discuzx/foundation/storage/discuz-x-local-storage)
- [DiscuzXQCloudCOSStorage](/php/api/discuzx/foundation/storage/discuz-xq-cloud-cos-storage)

