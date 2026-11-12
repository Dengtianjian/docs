# WechatPayProvider

`kernel\Modules\WechatPay\WechatPayProvider`  ·  class

源码：`gstudio_kernel/Modules/WechatPay/WechatPayProvider.php`

> 微信支付服务装配

## 声明

```php
class WechatPayProvider extends AbilityBaseObject
```

父类：[AbilityBaseObject](/php/api/foundation/object/ability-base-object)

## 概述

构造函数里一次做完两件事：
- 把 [WechatPay](/php/api/modules/wechatpay/wechat-pay) 绑成应用单例：商户注册表必须整个请求共用一份，
否则装配阶段登记的商户与业务里取到的商户会是两个空表；
- 登记本应用的商户。默认一个都没有（内核不知道应用的商户号与证书在哪），
应用侧继承本类覆盖 `merchants` 返回商户表即可。

商户依赖小程序的 appId（JSAPI 下单要带 appid），所以应用侧通常在登记完小程序账号
之后再登记商户——注册这两个 Provider 时先 `WechatProvider` 再本类即可。

登记方式：`$app->register(new WechatPayProvider())`。**必须传实例**——容器对「传类名」
的登记是延迟的（首次取用才构造），本类不被构造就不会登记商户。

默认不对外开放：商户号与证书路径属于装配它的应用；要用请先 `expose()`。

## 相关

- [WechatPay](/php/api/modules/wechatpay/wechat-pay)

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 构造即装配：绑服务 → 登记商户 |

### __construct()

```php
public function __construct()
```

构造即装配：绑服务 → 登记商户

空表时不取服务，避免无谓地构建注册表。

## 非公开方法

**protected**

- `protected function merchants()` —— 本应用的支付商户（别名 => 商户实例）

## 同目录

- [WechatPay](/php/api/modules/wechatpay/wechat-pay)
- [WechatPayApi](/php/api/modules/wechatpay/wechat-pay-api)
- [WechatPayMerchant](/php/api/modules/wechatpay/wechat-pay-merchant)

