# Aliyun

`kernel\Modules\Aliyun\Aliyun`  ·  class

源码：`gstudio_kernel/Modules/Aliyun/Aliyun.php`

> 阿里云门面

## 声明

```php
class Aliyun extends Facade
```

父类：[Facade](/php/api/foundation/facade/facade)

## 概述

静态转发到**当前应用**容器里的阿里云账号（短名 `aliyun`）：
与 `$app->aliyun()`、`$app->make(AliyunAccount::class)` 是同一份实例。

底层由 `AliyunProvider` 在装配期登记：
```php
// 应用 Bootstrap
$app->make(AliyunProvider::class);   // 或 $app->provider(new AliyunProvider())
```
没配置密钥（provider 的 `account()` 返回 null）时不会登记，
此时取用会抛「无法解析 aliyun」——与「密钥未配置」的表现一致，不会静默用空密钥。

签名与请求不放门面：它们是纯工具，直接 `new AliyunSignature($account, ...)` 即可。

## 示例

```php
// 应用 Bootstrap
$app->make(AliyunProvider::class);   // 或 $app->provider(new AliyunProvider())
```

## 相关

- `AliyunAccount` 账号凭证
- `AliyunProvider` 装配

## 转发方法

门面通过 `__callStatic` 转发到实例，以下为可用的静态方法：

| 签名 | 说明 |
|---|---|
| `appId()` | 账号标识（AccessKey ID） |
| `appSecret()` | 密钥（AccessKey Secret） |

## 方法

本类没有公开方法。

## 非公开方法

**protected**

- `protected static function resolve()` —— 兜底实例：当前应用容器里的阿里云账号

## 同目录

- [AliyunAccount](/php/api/modules/aliyun/aliyun-account)
- [AliyunProvider](/php/api/modules/aliyun/aliyun-provider)
- [AliyunRequest](/php/api/modules/aliyun/aliyun-request)
- [AliyunSignature](/php/api/modules/aliyun/aliyun-signature)

