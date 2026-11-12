# QCloudApi

`kernel\Modules\QCloud\QCloudApi`  ·  class

源码：`gstudio_kernel/Modules/QCloud/QCloudApi.php`

> 腾讯云 API 请求客户端（TC3-HMAC-SHA256）

## 声明

```php
class QCloudApi extends AbilityBaseObject
```

父类：[AbilityBaseObject](/php/api/foundation/object/ability-base-object)

## 概述

以腾讯云账号（`QCloudAccount`）为凭据来源，封装对腾讯云云 API
（`*.tencentcloudapi.com`）的 HTTP 请求：按 TC3-HMAC-SHA256 算法签名、发送
GET/POST 请求、把响应归一化为 [Result](/php/api/support/result)。各云产品（人脸核身、COS 等）
在本类基础上扩展具体接口。

与 [WechatApi](/php/api/modules/wechat/wechat-api) 对称：账号负责身份（`QCloudAccount`），
本类负责请求；操作的服务名 `$service`（决定请求域名）与请求地址由子类或构造参数给出。
想省掉手动装配账号，可走模块门面（见 `QCloud`）：`QCloud::account("main")->api("faceid")`。

凭据优先级：本实例上的**临时凭据**（`tmpSecretId` / `tmpSecretKey` / `tmpSecurityToken`，
见 `tmpCredentials`）→ 账号上的凭据。临时凭据非空时，请求会自动附带
`X-TC-Token` 头并一并纳入签名；`cancelTmpCredentials` 可一次性撤销临时凭据，
回到账号凭据。

使用示例：

```php
$api = new QCloudApi($account, "faceid");
$result = $api->post("BankCard2EVerification", "2018-03-01", ["Name" => $name, "BankCard" => $no]);

// 临时凭据（如 STS 换取的）：只影响本实例后续请求
$api->tmpCredentials($tmpSecretId, $tmpSecretKey, $sessionToken);
$api->cancelTmpCredentials();
```

## 示例

```php
$api = new QCloudApi($account, "faceid");
$result = $api->post("BankCard2EVerification", "2018-03-01", ["Name" => $name, "BankCard" => $no]);

// 临时凭据（如 STS 换取的）：只影响本实例后续请求
$api->tmpCredentials($tmpSecretId, $tmpSecretKey, $sessionToken);
$api->cancelTmpCredentials();
```

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$account` | `QCloudAccount|null` | protected | 腾讯云账号（凭据来源） |
| `$tmpSecretId` | `string` | protected | 临时的 SecretId 如果该值存在，优先使用该值 |
| `$tmpSecretKey` | `string` | protected | 临时的 SecretKey 如果该值存在，优先使用该值 |
| `$tmpSecurityToken` | `string` | protected | 临时的安全令牌 如果该值存在，优先使用该值 |
| `$host` | `string` | protected | 请求的主机，腾讯云的 |
| `$algorithm` | `string` | protected | 加密算法 |
| `$service` | `string` | private | 操作的服务名称 |
| `$curl` | `Curl` | protected | CURL实例 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 实例化腾讯云请求客户端 |
| [`account()`](#account) | 读写一体：获取或设置腾讯云账号 |
| [`tmpSecretId()`](#tmpsecretid) | 设置临时SecretId |
| [`tmpSecretKey()`](#tmpsecretkey) | 设置临时SecretKey |
| [`tmpSecurityToken()`](#tmpsecuritytoken) | 设置临时安全令牌 |
| [`tmpCredentials()`](#tmpcredentials) | 设置临时凭证 |
| [`cancelTmpCredentials()`](#canceltmpcredentials) | 取消使用临时凭证，使用账号上的凭证 |
| [`get()`](#get) | 发送GET请求 |
| [`post()`](#post) | 发送POST请求 |

### __construct()

```php
public function __construct(QCloudAccount $account, $service = null, $host = null)
```

实例化腾讯云请求客户端

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$account` | `QCloudAccount` | — | 腾讯云账号，提供 SecretId / SecretKey 等凭据 |
| `$service` | `string` | `null` | 操作的服务名称，如 `faceid`；非空时请求域名拼成 `{service}.{host}` |
| `$host` | `string` | `null` | 接口请求地址 |

### account()

```php
public function account($data = null)
```

读写一体：获取或设置腾讯云账号

依据调用时是否传入参数区分读写：
- 传入参数：设置账号，并返回当前实例以支持链式调用；
- 不传参数：返回当前已设置的账号。

```php
$api->account($account);  // 设置，返回 $api
$api->account();          // 读取，返回 QCloudAccount
```

```php
$api->account($account);  // 设置，返回 $api
$api->account();          // 读取，返回 QCloudAccount
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `QCloudAccount|null` | `null` | 待设置的腾讯云账号 |

### tmpSecretId()

```php
public function tmpSecretId($tmpSecretId = null)
```

设置临时SecretId

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$tmpSecretId` | `string` | `null` | 新的临时SecretId，如果传入null，即为使用账号上的SecretId |

### tmpSecretKey()

```php
public function tmpSecretKey($tmpSecretKey = null)
```

设置临时SecretKey

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$tmpSecretKey` | `string` | `null` | 新的临时SecretKey，如果传入null，即为使用账号上的SecretKey |

### tmpSecurityToken()

```php
public function tmpSecurityToken($tmpSecurityToken = null)
```

设置临时安全令牌

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$tmpSecurityToken` | `string` | `null` | 新的临时安全令牌，如果传入null，即为使用账号上的安全令牌 |

### tmpCredentials()

```php
public function tmpCredentials($tmpSecretId, $tmpSecretKey, $securityToken)
```

设置临时凭证

三个值都非空时，后续请求一律用临时凭证签名，并自动附带 X-TC-Token 头。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$tmpSecretId` | `string` | — | 临时SecretId |
| `$tmpSecretKey` | `string` | — | 临时SecretKey |
| `$securityToken` | `string` | — | 安全令牌 |

### cancelTmpCredentials()

```php
public function cancelTmpCredentials()
```

取消使用临时凭证，使用账号上的凭证

### get()

```php
public function get($action, $version, $query = [])
```

发送GET请求

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$action` | `string` | — | 操作的名称 |
| `$version` | `string` | — | 服务版本 |
| `$query` | `array` | `[]` | 查询信息 |

### post()

```php
public function post($action, $version, $body = [], $query = [])
```

发送POST请求

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$action` | `string` | — | 操作的名称 |
| `$version` | `string` | — | 服务版本 |
| `$body` | `array` | `[]` | 请求体 |
| `$query` | `array` | `[]` | 查询信息 |

## 非公开方法

**protected**

- `protected function getSecretId()` —— 获取实际使用的SecretId 如果存在临时SecretId就返回临时的，否则返回账号上的
- `protected function getSecretKey()` —— 获取实际使用的SecretKey 如果存在临时SecretKey就返回临时的，否则返回账号上的
- `protected function getSecurityToken()` —— 获取实际使用的安全令牌 如果存在临时安全令牌就返回临时的，否则返回账号上的
- `protected function generateAuthorizaion($timestamp, $action, $body = [], $query = [], $canonicalURI = "/", $httpRequestMethod = "POST")` —— 生成授权信息

## 同目录

- [QCloud](/php/api/modules/qcloud/q-cloud)
- [QCloudAccount](/php/api/modules/qcloud/q-cloud-account)
- [QCloudFaceId](/php/api/modules/qcloud/q-cloud-face-id)
- [QCloudProvider](/php/api/modules/qcloud/q-cloud-provider)

