# QCloudProvider

`kernel\Modules\QCloud\QCloudProvider`  ·  class

源码：`gstudio_kernel/Modules/QCloud/QCloudProvider.php`

> 腾讯云服务装配

## 声明

```php
class QCloudProvider extends AbilityBaseObject
```

父类：[AbilityBaseObject](/php/api/foundation/object/ability-base-object)

## 概述

构造函数里一次做完两件事：
- 把 [QCloud](/php/api/modules/qcloud/q-cloud) 绑成应用单例——账号注册表必须整个请求共用一份，
否则装配阶段登记的账号与业务里取到的账号会是两个空表；
- 登记本应用的账号。默认没有账号（内核不知道应用把密钥放在哪），
应用侧继承本类覆盖 `account`，从自己的设置里读出密钥返回即可。

登记方式：`$app->register(new QCloudProvider())`。**必须传实例**——容器对「传类名」
的登记是延迟的（首次取用才构造），本类不被构造就不会登记账号。

默认不对外开放：腾讯云密钥属于装配它的应用，别的应用要用，请该应用先 `expose()`，
使用方再 `import()`。

## 相关

- [QCloud](/php/api/modules/qcloud/q-cloud)

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 构造即装配：绑服务 → 登记账号 |

### __construct()

```php
public function __construct()
```

构造即装配：绑服务 → 登记账号

## 非公开方法

**protected**

- `protected function account()` —— 本应用的腾讯云账号

## 同目录

- [QCloud](/php/api/modules/qcloud/q-cloud)
- [QCloudAccount](/php/api/modules/qcloud/q-cloud-account)
- [QCloudApi](/php/api/modules/qcloud/q-cloud-api)
- [QCloudFaceId](/php/api/modules/qcloud/q-cloud-face-id)

