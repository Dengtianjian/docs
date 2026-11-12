# QCloudFaceId

`kernel\Modules\QCloud\QCloudFaceId`  ·  class

源码：`gstudio_kernel/Modules/QCloud/QCloudFaceId.php`

## 声明

```php
class QCloudFaceId extends QCloudApi
```

父类：`QCloudApi`

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 实例化人脸核身客户端 |
| [`bankCard2EVerification()`](#bankcard2everification) | 银行卡二要素核验 |

### __construct()

```php
public function __construct(QCloudAccount $account)
```

实例化人脸核身客户端

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$account` | `QCloudAccount` | — | 腾讯云账号，提供 SecretId / SecretKey 等凭据 |

### bankCard2EVerification()

```php
public function bankCard2EVerification($name, $bankCard)
```

银行卡二要素核验

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string` | — | 姓名 |
| `$bankCard` | `string` | — | 银行卡 |

## 同目录

- [QCloud](/php/api/modules/qcloud/q-cloud)
- [QCloudAccount](/php/api/modules/qcloud/q-cloud-account)
- [QCloudApi](/php/api/modules/qcloud/q-cloud-api)
- [QCloudProvider](/php/api/modules/qcloud/q-cloud-provider)

