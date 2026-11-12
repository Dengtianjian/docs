# AliyunAccount

`kernel\Modules\Aliyun\AliyunAccount`  ·  class

源码：`gstudio_kernel/Modules/Aliyun/AliyunAccount.php`

> 阿里云账号（凭证）

## 声明

```php
class AliyunAccount
```

## 概述

只装 accessKey 与 secret，不含任何请求逻辑——签名与请求分别见
`AliyunSignature` 与 `AliyunRequest`。

实例由 `AliyunProvider` 在装配期创建并登记（短名 `aliyun`），
业务侧通过门面 `Aliyun` 或 `$app->aliyun()` 取用。

## 相关

- `AliyunProvider`

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$AppId` | `string` | protected | 账号标识（AccessKey ID，或业务自定义的账号名） |
| `$AppSecret` | `string` | protected | 密钥（AccessKey Secret） |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | — |
| [`appId()`](#appid) | 账号标识 |
| [`appSecret()`](#appsecret) | 密钥 |

### __construct()

```php
public function __construct($appId, $appSecret)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$appId` | `string` | — | 账号标识 |
| `$appSecret` | `string` | — | 密钥 |

### appId()

```php
public function appId()
```

账号标识

### appSecret()

```php
public function appSecret()
```

密钥

## 同目录

- [Aliyun](/php/api/modules/aliyun/aliyun)
- [AliyunProvider](/php/api/modules/aliyun/aliyun-provider)
- [AliyunRequest](/php/api/modules/aliyun/aliyun-request)
- [AliyunSignature](/php/api/modules/aliyun/aliyun-signature)

