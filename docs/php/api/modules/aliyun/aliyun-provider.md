# AliyunProvider

`kernel\Modules\Aliyun\AliyunProvider`  ·  class

源码：`gstudio_kernel/Modules/Aliyun/AliyunProvider.php`

> 阿里云装配

## 声明

```php
class AliyunProvider extends AbilityBaseObject
```

父类：[AbilityBaseObject](/php/api/foundation/object/ability-base-object)

## 概述

构造即装配：把本应用的 `AliyunAccount` 登记成应用单例（类名 + 短名 `aliyun`）。

内核不知道应用把密钥放在哪，所以默认**不登记**（`account` 返回 null）；
应用侧继承本类覆写 `account()`，从自己的设置里读出密钥即可：

```php
class AliyunProvider extends \kernel\Modules\Aliyun\AliyunProvider
{
protected function account()
{
$settings = Setting::items("Aliyun_AccessKey", "Aliyun_Secret");

return new AliyunAccount($settings["Aliyun_AccessKey"], $settings["Aliyun_Secret"]);
}
}
```

登记方式：`$app->make(AliyunProvider::class)` 或 `$app->provider(new AliyunProvider())`，
**必须传实例**——容器对「传类名」是延迟构造，本类不被构造就不会登记账号。

密钥属于装配它的应用；别的应用要用，由该应用 `expose()`、使用方 `import()`。

## 示例

```php
class AliyunProvider extends \kernel\Modules\Aliyun\AliyunProvider
{
protected function account()
{
$settings = Setting::items("Aliyun_AccessKey", "Aliyun_Secret");

return new AliyunAccount($settings["Aliyun_AccessKey"], $settings["Aliyun_Secret"]);
}
}
```

## 相关

- `AliyunAccount`
- `Aliyun` 门面

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 构造即装配：登记账号 |

### __construct()

```php
public function __construct()
```

构造即装配：登记账号

## 非公开方法

**protected**

- `protected function account()` —— 本应用的阿里云账号

## 同目录

- [Aliyun](/php/api/modules/aliyun/aliyun)
- [AliyunAccount](/php/api/modules/aliyun/aliyun-account)
- [AliyunRequest](/php/api/modules/aliyun/aliyun-request)
- [AliyunSignature](/php/api/modules/aliyun/aliyun-signature)

