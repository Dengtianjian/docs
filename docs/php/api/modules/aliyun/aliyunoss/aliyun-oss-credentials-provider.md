# AliyunOSSCredentialsProvider

`kernel\Modules\Aliyun\AliyunOSS\AliyunOSSCredentialsProvider`  ·  class

源码：`gstudio_kernel/Modules/Aliyun/AliyunOSS/AliyunOSSCredentialsProvider.php`

## 声明

```php
class AliyunOSSCredentialsProvider implements CredentialsProvider
```

实现：`CredentialsProvider`

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$accessKeyId` | `mixed` | protected | — |
| `$accessKeySecret` | `mixed` | protected | — |
| `$token` | `mixed` | protected | — |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | — |
| [`getCredentials()`](#getcredentials) | — |

### __construct()

```php
public function __construct($AccessKeyId, $AccessKeySecret, $Token = null)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$AccessKeyId` | `mixed` | — | — |
| `$AccessKeySecret` | `mixed` | — | — |
| `$Token` | `mixed` | `null` | — |

### getCredentials()

```php
public function getCredentials()
```

可能抛出：

- `OssException`

## 同目录

- [AliyunOSSStorage](/php/api/modules/aliyun/aliyunoss/aliyun-oss-storage)

