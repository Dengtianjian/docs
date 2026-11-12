# 微信

## 公众号与小程序

```
Modules/Wechat/
├── Wechat.php           账号注册表（单例）
├── WechatProvider.php   装配：登记账号
├── WechatAccount.php    账号（appId / secret / 类型）
├── WechatApi.php  WechatAccessToken.php
├── OfficialAccount/     公众号能力（模板消息、网页授权、素材…）
├── Miniprogram/         小程序能力（登录、订阅消息、手机号…）
└── Models/              微信用户 / 绑定关系
```

### 装配

```php
class WechatProvider extends \kernel\Modules\Wechat\WechatProvider
{
  protected function accounts()
  {
    return [
      new WechatAccount($appId, $secret, WechatAccount::TYPE_OFFICIAL_ACCOUNT, "main"),
      new WechatAccount($mpAppId, $mpSecret, WechatAccount::TYPE_MINIPROGRAM, "mp"),
    ];
  }
}
```

### 使用

```php
use kernel\Modules\Wechat\Wechat;

$wechat = $this->app()->make(Wechat::class);

$wechat->hasAccount("mp");
$account = $wechat->account("mp");            // WechatAccount
$mp      = $wechat->miniProgram("mp");        // 小程序能力入口
$oa      = $wechat->officialAccount("main");  // 公众号能力入口
```

`appId` 和别名都能作为键：`account($appIdOrAlias)`。

## 微信支付

```
Modules/WechatPay/
├── WechatPay.php           商户注册表
├── WechatPayProvider.php   装配
├── WechatPayMerchant.php   商户（mchId / 证书 / 密钥）
├── WechatPayApi.php
└── V3/                     APIv3：签名、证书、回调验签
```

### 装配

```php
class WechatPayProvider extends \kernel\Modules\WechatPay\WechatPayProvider
{
  protected function merchants()
  {
    return [
      new WechatPayMerchant($mchId, $serialNo, $privateKey, $apiV3Key, "main"),
    ];
  }
}
```

### 使用

```php
$pay = $this->app()->make(WechatPay::class);

$pay->hasMerchant("main");
$merchant = $pay->merchant("main");
```

### 附加数据编解码

支付回调里的 `attach` 字段有长度限制，模块提供了紧凑编解码：

```php
$attach = WechatPay::encodeAttach(["orderId" => 123, "scene" => "recharge"]);
$data   = WechatPay::decodeAttach($attach);
```

## 跨应用

微信账号与商户都属于装配它们的应用；别的应用要用必须 `import`：

```php
$this->app()->import(Wechat::class, "gstudio_super_app", "wechat");
```
