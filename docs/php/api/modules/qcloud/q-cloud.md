# QCloud

`kernel\Modules\QCloud\QCloud`  ·  class

源码：`gstudio_kernel/Modules/QCloud/QCloud.php`

> 腾讯云服务

## 声明

```php
class QCloud extends AbilityBaseObject
```

父类：[AbilityBaseObject](/php/api/foundation/object/ability-base-object)

## 概述

腾讯云账号注册表：只回答「这次调用该用哪个账号」，不负责凭据本身
（见 `QCloudAccount`），也不负责 HTTP 请求与 TC3 签名（见 `QCloudApi`）。
客户端取用入口全部挂在账号对象上（见 `QCloudAccount::api`、
`QCloudAccount::faceId`、`QCloudAccount::cos`），本服务只做注册表。

与 [WechatPay](/php/api/modules/wechatpay/wechat-pay) 的分工一致，差别只在账号来源：
微信支付服务无商户表、注册表只存在于当前请求内存中，本服务同样是**纯内存注册表**
（暂无账号表、不触发任何懒加载），由调用方通过 `addAccount` 显式登记，仅当前请求有效。
将来账号要落表时，只需在 `account` 未命中处补一次懒加载，对外接口不变。

注册表以**账号标识（name）**为键：腾讯云没有像微信 appId、支付商户号那样的业务自然键，
所以标识由调用方自定义（如 `main` / `cos`），见 `QCloudAccount::name`。
正因为键本身就是自定义字符串，本服务**不提供别名**（别名只会是同一标识的第二套写法）。

取用账号时必须显式给出标识，本服务不提供「默认账号」概念：
无法从登记数量、登记顺序推断业务想用哪一个，猜错会静默拿错密钥发请求。

使用示例：

```php
QCloud::addAccount(new QCloudAccount($secretId, $secretKey, "main")); // 登记（应用侧）

QCloud::account("main")->faceId()->bankCard2EVerification($name, $bankCard);
QCloud::account("main")->cos("ap-guangzhou", "bkt-1250000000")->upload("a/b.png", "/tmp/a.png");
QCloud::account("main")->api("faceid")->post("BankCard2EVerification", "2018-03-01", [...]);
```

## 示例

```php
QCloud::addAccount(new QCloudAccount($secretId, $secretKey, "main")); // 登记（应用侧）

QCloud::account("main")->faceId()->bankCard2EVerification($name, $bankCard);
QCloud::account("main")->cos("ap-guangzhou", "bkt-1250000000")->upload("a/b.png", "/tmp/a.png");
QCloud::account("main")->api("faceid")->post("BankCard2EVerification", "2018-03-01", [...]);
```

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$accounts` | `array` | protected | 已登记的账号（账号标识 => QCloudAccount） |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`addAccount()`](#addaccount) | 登记账号 |
| [`removeAccount()`](#removeaccount) | 移除账号 |
| [`hasAccount()`](#hasaccount) | 账号是否已登记 |
| [`getAccounts()`](#getaccounts) | 获取全部已登记账号 |
| [`account()`](#account) | 获取账号 |

### addAccount()

```php
public function addAccount(QCloudAccount $account)
```

登记账号

账号标识取自 `QCloudAccount::name`（构造时给出，或事后用 `name()` 设置）。
同一标识重复登记时后者覆盖前者；本方法只影响当前请求的内存注册表，不写入任何表。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$account` | `QCloudAccount` | — | 账号实例，必须已带有非空标识 |

### removeAccount()

```php
public function removeAccount($accountName)
```

移除账号

仅作用于当前请求的内存注册表，不修改任何表。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$accountName` | `string` | — | 账号标识 |

### hasAccount()

```php
public function hasAccount($accountName): bool
```

账号是否已登记

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$accountName` | `string` | — | 账号标识 |

返回：`bool` —— bool

### getAccounts()

```php
public function getAccounts(): array
```

获取全部已登记账号

返回：`array` —— array＜string, QCloudAccount＞ 账号标识 => 账号

### account()

```php
public function account($accountName)
```

获取账号

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$accountName` | `string` | — | 账号标识（必填，本服务不提供默认账号） |

## 同目录

- [QCloudAccount](/php/api/modules/qcloud/q-cloud-account)
- [QCloudApi](/php/api/modules/qcloud/q-cloud-api)
- [QCloudFaceId](/php/api/modules/qcloud/q-cloud-face-id)
- [QCloudProvider](/php/api/modules/qcloud/q-cloud-provider)

