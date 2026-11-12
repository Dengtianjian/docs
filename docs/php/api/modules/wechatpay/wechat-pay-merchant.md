# WechatPayMerchant

`kernel\Modules\WechatPay\WechatPayMerchant`  ·  class

源码：`gstudio_kernel/Modules/WechatPay/WechatPayMerchant.php`

> 微信支付商户（APIv3）

## 声明

```php
class WechatPayMerchant extends AbilityBaseObject
```

父类：[AbilityBaseObject](/php/api/foundation/object/ability-base-object)

## 概述

承载单个微信支付商户的身份与凭证，作为 [WechatPayV3](/php/api/modules/wechatpay/v3/wechat-pay-v3) 取用凭证的来源——
与微信模块中 [WechatAccount](/php/api/modules/wechat/wechat-account) 承载 AppId/AppSecret
的分工一致。

本模块目前**只支持 APIv3**，因此本类只承载 V3 所需凭证：
- **身份**：`appId`（公众平台 AppId）与 `merchantId`（商户号），构造时传入；
- **凭证**：APIv3 密钥、商户私钥文件路径、证书序列号、回调地址，
按需通过同名「读写一体」方法设置；
- **平台证书**：验证回调签名用的**微信支付平台证书**（微信方的证书，不是本商户的），
通过 `platformCertificates` 显式配置——本模块不会去调用接口拉取平台证书。

是否具备发起请求的条件由 `hasApiV3Credentials` 判断，避免把「半配置」的商户
交给接口客户端。

使用示例：

```php
$merchant = new WechatPayMerchant($appId, $mchId);

$merchant
->apiV3Secret("...")
->apiV3PrivateKeyFilePath("/path/apiclient_key.pem")
->apiV3PrivateKeySerialNo("...")
->notifyUrl("https://example.com/wechatPayNotify.php");

$merchant->hasApiV3Credentials(); // true：凭证已齐备
$merchant->merchantId();          // 读取商户号

// 验证回调签名用的微信支付平台证书：serial_no => PEM 内容 或 文件路径
$merchant->platformCertificates([
"43C1DCC87122AAE50991BFC2D7D21B1560FD7B1E" => "/path/wechatpay_platform_cert.pem",
]);

$pay = $merchant->v3();           // 实例化 APIv3 接口客户端
$pay->jsapi()->order($outTradeNo, $openId, 100, "测试商品");
```

## 示例

```php
$merchant = new WechatPayMerchant($appId, $mchId);

$merchant
->apiV3Secret("...")
->apiV3PrivateKeyFilePath("/path/apiclient_key.pem")
->apiV3PrivateKeySerialNo("...")
->notifyUrl("https://example.com/wechatPayNotify.php");

$merchant->hasApiV3Credentials(); // true：凭证已齐备
$merchant->merchantId();          // 读取商户号

// 验证回调签名用的微信支付平台证书：serial_no => PEM 内容 或 文件路径
$merchant->platformCertificates([
"43C1DCC87122AAE50991BFC2D7D21B1560FD7B1E" => "/path/wechatpay_platform_cert.pem",
]);

$pay = $merchant->v3();           // 实例化 APIv3 接口客户端
$pay->jsapi()->order($outTradeNo, $openId, 100, "测试商品");
```

## 常量

| 常量 | 值 | 说明 |
|---|---|---|
| `NOTIFY_URL_PATTERN` | `'~^https?://([^\s/?#\[\]\@]+\@)?([^\s/?#\@:]+)(?::\d{2,5})?([^\s?#\[\]]*)$~'` | 回调地址的格式校验规则 |

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$appId` | `string|null` | protected | 公众平台 AppId |
| `$merchantId` | `string|null` | protected | 微信支付商户号 |
| `$apiV3Secret` | `string|null` | protected | APIv3 密钥 |
| `$apiV3PrivateKeyFilePath` | `string|null` | protected | APIv3 商户私钥文件路径（apiclient_key.pem） |
| `$apiV3PrivateKeySerialNo` | `string|null` | protected | APIv3 商户证书序列号 |
| `$notifyUrl` | `string|null` | protected | 支付结果异步通知的回调地址 |
| `$platformCertificates` | `array` | protected | 微信支付平台证书（serial_no => PEM 内容） |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 初始化微信支付商户 |
| [`v3()`](#v3) | 实例化 APIv3 接口客户端 |
| [`appId()`](#appid) | 读写一体：获取或设置 AppId |
| [`merchantId()`](#merchantid) | 读写一体：获取或设置商户号 |
| [`apiV3Secret()`](#apiv3secret) | 读写一体：获取或设置 APIv3 密钥 |
| [`apiV3PrivateKeyFilePath()`](#apiv3privatekeyfilepath) | 读写一体：获取或设置 APIv3 商户私钥文件路径 |
| [`apiV3PrivateKeySerialNo()`](#apiv3privatekeyserialno) | 读写一体：获取或设置 APIv3 商户证书序列号 |
| [`notifyUrl()`](#notifyurl) | 读写一体：获取或设置支付结果通知的回调地址 |
| [`platformCertificates()`](#platformcertificates) | 读写一体：获取或设置微信支付平台证书 |
| [`hasApiV3Credentials()`](#hasapiv3credentials) | 是否具备发起 APIv3 请求的凭证 |

### __construct()

```php
public function __construct($appId, $merchantId)
```

初始化微信支付商户

只设置身份信息（AppId 与商户号），其余凭证后续按需通过同名方法链式设置。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$appId` | `string|null` | — | 公众平台 AppId |
| `$merchantId` | `string|null` | — | 微信支付商户号 |

### v3()

```php
public function v3()
```

实例化 APIv3 接口客户端

返回以本商户为凭证来源的 [WechatPayV3](/php/api/modules/wechatpay/v3/wechat-pay-v3)（V3 聚合入口），再由它取用各接口对象：
各支付产品（jsapi()/app()/h5()/native()/miniProgram()）、合单（combine()）、
账单（bill()）、分账（profitSharing()）、商家转账（transfer()）。

```php
$merchant->v3()->jsapi()->order($outTradeNo, $openId, 100, "测试商品");
$merchant->v3()->jsapi()->queryByOutTradeNo($outTradeNo);
```

每次调用返回新实例（不复用），与微信模块按需实例化各接口对象的做法一致。

本方法**不校验凭证是否齐备**：`hasApiV3Credentials` 要求回调地址（notifyUrl）也已配置，
那是「下单」的必要条件；而本方法同时也是查单、关单、退款、账单等不需要 notify_url 的入口，
在此拦截会把合法调用一并挡掉。下单前请自行用 hasApiV3Credentials() 自检。

```php
$merchant->v3()->jsapi()->order($outTradeNo, $openId, 100, "测试商品");
$merchant->v3()->jsapi()->queryByOutTradeNo($outTradeNo);
```

### appId()

```php
public function appId($data = null)
```

读写一体：获取或设置 AppId

传参即设置并返回 `$this`（便于链式调用），不传参则读取当前值。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `string|null` | `null` | 待设置的 AppId |

### merchantId()

```php
public function merchantId($data = null)
```

读写一体：获取或设置商户号

传参即设置并返回 `$this`（便于链式调用），不传参则读取当前值。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `string|null` | `null` | 待设置的商户号 |

### apiV3Secret()

```php
public function apiV3Secret($data = null)
```

读写一体：获取或设置 APIv3 密钥

传参即设置并返回 `$this`（便于链式调用），不传参则读取当前值。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `string|null` | `null` | 待设置的 APIv3 密钥 |

### apiV3PrivateKeyFilePath()

```php
public function apiV3PrivateKeyFilePath($data = null)
```

读写一体：获取或设置 APIv3 商户私钥文件路径

传参即设置并返回 `$this`（便于链式调用），不传参则读取当前值。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `string|null` | `null` | 待设置的私钥文件路径 |

### apiV3PrivateKeySerialNo()

```php
public function apiV3PrivateKeySerialNo($data = null)
```

读写一体：获取或设置 APIv3 商户证书序列号

传参即设置并返回 `$this`（便于链式调用），不传参则读取当前值。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `string|null` | `null` | 待设置的证书序列号 |

### notifyUrl()

```php
public function notifyUrl($data = null)
```

读写一体：获取或设置支付结果通知的回调地址

传参即设置并返回 `$this`（便于链式调用），不传参则读取当前值。

设置时按 `NOTIFY_URL_PATTERN` 校验格式，不合规直接抛
[Error](/php/api/foundation/exception/error)（与 `apiV3PrivateKeyFilePath` 的处理方式一致）；
传 null 或空串视为「不设置/清空回调地址」，不做校验。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `string|null` | `null` | 待设置的回调地址 |

可能抛出：

- [Error](/php/api/foundation/exception/error) 回调地址格式不合规时抛出

### platformCertificates()

```php
public function platformCertificates($data = null)
```

读写一体：获取或设置微信支付平台证书

验签用的是**微信支付平台证书**的公钥（微信方的证书），不是本商户的 apiclient 证书；
微信支付回调头 `Wechatpay-Serial` 指明用哪一张，且微信支持新旧平台证书并行，
因此这里按 `serial_no => 证书` 的映射保存。

证书值支持两种写法，设置时自动识别并**统一归一化为 PEM 内容**（读取拿到的是 PEM）：
- **PEM 内容**：含 `-----BEGIN CERTIFICATE-----`，直接使用；
- **文件路径**：其余情况视为路径，读取文件内容（不存在/不可读直接抛 Error，同
`apiV3PrivateKeyFilePath` 的处理方式）。

归一化在设置时完成，运行时验签不再碰磁盘；也正因为如此，平台证书**过期或轮换**后
必须重新调用本方法（本模块不会自动拉取或刷新平台证书）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array|null` | `null` | 待设置的映射（serial_no => PEM 内容或文件路径） |

可能抛出：

- [Error](/php/api/foundation/exception/error) 入参不是数组、证书为空、路径不可读或不是合法证书时抛出

### hasApiV3Credentials()

```php
public function hasApiV3Credentials()
```

是否具备发起 APIv3 请求的凭证

判定条件：AppId、商户号、APIv3 密钥、商户私钥文件路径、证书序列号
与回调地址均已配置（V3 下单必须携带 notify_url）。

## 同目录

- [WechatPay](/php/api/modules/wechatpay/wechat-pay)
- [WechatPayApi](/php/api/modules/wechatpay/wechat-pay-api)
- [WechatPayProvider](/php/api/modules/wechatpay/wechat-pay-provider)

