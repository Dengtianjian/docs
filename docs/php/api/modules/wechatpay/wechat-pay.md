# WechatPay

`kernel\Modules\WechatPay\WechatPay`  ·  class

源码：`gstudio_kernel/Modules/WechatPay/WechatPay.php`

> 微信支付服务

## 声明

```php
class WechatPay extends AbilityBaseObject
```

父类：[AbilityBaseObject](/php/api/foundation/object/ability-base-object)

## 概述

微信支付商户注册表 + 业务取用入口：只回答「这次调用该用哪个商户」，
不负责 HTTP 请求与签名（见 `WechatPayApi` 与 [WechatPayV3Api](/php/api/modules/wechatpay/v3/wechat-pay-v3-api)），
也不负责商户凭证本身的取用（见 `WechatPayMerchant`）。

与 [Wechat](/php/api/modules/wechat/wechat) 的分工一致，差别只在商户来源：
微信服务的账号以 wechat_accounts 表为准，本服务**暂无商户表**，注册表只存在于当前请求的内存中，
由调用方通过 addMerchant() 显式登记，不触发任何懒加载。
将来商户落表时，只需在 `merchant` 未命中处补一次懒加载，对外接口不变。

注册表以**商户号（merchantId）**为键，而非 AppId：商户号才是微信支付侧的唯一身份，
同一个商户号可以绑定公众号 / 小程序 / APP 等多个 AppId，用 AppId 作主键会把不同商户混在一起。
别名是运行时概念，仅当前请求有效，不落库。

取用商户时必须显式给出商户号或别名，本服务不提供「默认商户」概念：
无法从登记数量、登记顺序推断业务想用哪一个，猜错会静默把请求发到别的商户号上。

使用示例：

```php
$merchant = new WechatPayMerchant($appId, $mchId);
$merchant
->apiV3Secret("...")
->apiV3PrivateKeyFilePath("/path/apiclient_key.pem")
->apiV3PrivateKeySerialNo("...")
->notifyUrl("https://example.com/wechatPayNotify.php");

$service = $app->make(WechatPay::class);
$service->addMerchant($merchant, "main");     // 登记并起别名
$service->merchant("main");                   // 按别名取用
$service->hasMerchant("1900000109");          // 按商户号判存在
$service->getMerchants();                     // merchantId => 商户

$pay = new WechatPayV3($service->merchant("main"));
```

## 示例

```php
$merchant = new WechatPayMerchant($appId, $mchId);
$merchant
->apiV3Secret("...")
->apiV3PrivateKeyFilePath("/path/apiclient_key.pem")
->apiV3PrivateKeySerialNo("...")
->notifyUrl("https://example.com/wechatPayNotify.php");

$service = $app->make(WechatPay::class);
$service->addMerchant($merchant, "main");     // 登记并起别名
$service->merchant("main");                   // 按别名取用
$service->hasMerchant("1900000109");          // 按商户号判存在
$service->getMerchants();                     // merchantId => 商户

$pay = new WechatPayV3($service->merchant("main"));
```

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$merchants` | `array` | protected | 已登记的商户（merchantId => WechatPayMerchant） |
| `$aliases` | `array` | protected | 运行时别名映射（别名 => merchantId，仅当前请求有效） |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`addMerchant()`](#addmerchant) | 登记商户 |
| [`setAlias()`](#setalias) | 登记商户别名 |
| [`removeMerchant()`](#removemerchant) | 移除商户 |
| [`hasMerchant()`](#hasmerchant) | 商户是否存在 |
| [`getMerchants()`](#getmerchants) | 获取全部已登记商户 |
| [`merchant()`](#merchant) | 获取商户 |
| [`encodeAttach()`](#encodeattach) | 编码 attach 数据 |
| [`decodeAttach()`](#decodeattach) | 解码 attach 字符串 |
| [`reset()`](#reset) | 复位本次运行期的注册表 |

### addMerchant()

```php
public function addMerchant(WechatPayMerchant $merchant, $alias = null)
```

登记商户

同一商户号重复登记时后者覆盖前者；本方法只影响当前请求的内存注册表，不写入任何表。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$merchant` | `WechatPayMerchant` | — | 商户实例 |
| `$alias` | `string|null` | `null` | 可选别名，非空时建立运行时别名（仅当前请求） |

### setAlias()

```php
public function setAlias($merchantId, $alias)
```

登记商户别名

别名为运行时概念，仅作用于当前请求，不落库；需要跨请求可用请改为直接使用商户号。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$merchantId` | `string` | — | 商户号 |
| `$alias` | `string` | — | 别名 |

### removeMerchant()

```php
public function removeMerchant($merchantIdOrAlias)
```

移除商户

仅作用于当前请求的内存注册表；同时清理指向该商户号的全部运行时别名。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$merchantIdOrAlias` | `string` | — | 商户号或别名 |

### hasMerchant()

```php
public function hasMerchant($merchantIdOrAlias): bool
```

商户是否存在

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$merchantIdOrAlias` | `string` | — | 商户号或别名 |

返回：`bool` —— bool

### getMerchants()

```php
public function getMerchants(): array
```

获取全部已登记商户

返回：`array` —— array＜string, WechatPayMerchant＞ merchantId => 商户

### merchant()

```php
public function merchant($merchantIdOrAlias)
```

获取商户

先按别名解析，未命中则视为商户号直接查找。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$merchantIdOrAlias` | `string` | — | 商户号或别名（必填，本服务不提供默认商户） |

### encodeAttach()

```php
public static function encodeAttach($data)
```

编码 attach 数据

把数组编码成微信支付 `attach` 字段可接受的字符串：字符串键输出 `键=值`，数值键只输出值本身，
各片段用 `&` 连接；空数组与非数组一律返回空字符串。

`attach` 由微信支付原样带回回调，是下单与回调之间唯一的自定义透传通道，通常用来携带业务
参数（如回调分发的键）。这里按字符数（mb_strlen）校验微信支付的 128 字符上限，超长抛出 500 错误。
编码不做 URL 转义，键与值按原样拼接。

与 `decodeAttach` 互逆。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `array` | — | 待编码的键值数据 |

### decodeAttach()

```php
public static function decodeAttach($str)
```

解码 attach 字符串

把 `encodeAttach` 产出的字符串还原为数组：片段之间用 `&` 分隔，含 `=` 的片段按
`键 => 值` 归入关联项，不含 `=` 的片段按下标依次追加（对应编码时数值键的匿名项）。

输入即微信支付回调里的 `attach` 字段原值，未编码过该字段时为空字符串。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$str` | `string` | — | 微信支付回调返回的 attach 字段值 |

### reset()

```php
public function reset()
```

复位本次运行期的注册表

常驻进程（CLI / 队列）里两个任务之间需要清空注册表时手动调用。

## 同目录

- [WechatPayApi](/php/api/modules/wechatpay/wechat-pay-api)
- [WechatPayMerchant](/php/api/modules/wechatpay/wechat-pay-merchant)
- [WechatPayProvider](/php/api/modules/wechatpay/wechat-pay-provider)

