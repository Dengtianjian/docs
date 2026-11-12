# WechatProvider

`kernel\Modules\Wechat\WechatProvider`  ·  class

源码：`gstudio_kernel/Modules/Wechat/WechatProvider.php`

> 微信服务装配

## 声明

```php
class WechatProvider extends AbilityBaseObject
```

父类：[AbilityBaseObject](/php/api/foundation/object/ability-base-object)

## 概述

构造函数里一次做完两件事：
- 把 [Wechat](/php/api/modules/wechat/wechat) 绑成应用单例——装配阶段 `addAccount()` 登记的账号
与业务里 `miniProgram()` 取到的，必须是同一个注册表；
- 登记本应用的账号。默认一个都没有（内核不知道应用用哪些 appId），
应用侧继承本类覆盖 `accounts` 返回账号表即可。

登记方式：`$app->register(new WechatProvider())`。**必须传实例**——容器对「传类名」
的登记是延迟的（首次取用才构造），本类不被构造就不会登记账号。

默认不对外开放：公众号 / 小程序凭据属于装配它的应用；要用请先 `expose()`。

## 相关

- [Wechat](/php/api/modules/wechat/wechat)

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 构造即装配：绑服务 → 登记账号 |

### __construct()

```php
public function __construct()
```

构造即装配：绑服务 → 登记账号

空表时不取服务，避免无谓地构建注册表。

## 非公开方法

**protected**

- `protected function accounts()` —— 本应用的微信账号（别名 => 账号实例）

## 同目录

- [Wechat](/php/api/modules/wechat/wechat)
- [WechatAccessToken](/php/api/modules/wechat/wechat-access-token)
- [WechatAccount](/php/api/modules/wechat/wechat-account)
- [WechatApi](/php/api/modules/wechat/wechat-api)

