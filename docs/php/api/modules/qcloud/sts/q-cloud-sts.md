# QCloudSTS

`kernel\Modules\QCloud\STS\QCloudSTS`  ·  class

源码：`gstudio_kernel/Modules/QCloud/STS/QCloudSTS.php`

> 腾讯云 STS 安全凭证服务

## 声明

```php
class QCloudSTS extends AbilityBaseObject
```

父类：[AbilityBaseObject](/php/api/foundation/object/ability-base-object)

## 概述

把腾讯云 STS 的临时密钥申请包装成"实例方法 + 实例字段"的形式：
构造时固定密钥、存储桶与地域，之后按需申请临时密钥或组装 CAM 策略。

**请求客户端二选一**（`$stsClient`）：装了官方 STS SDK（`QCloud\COSSTS\Sts`，
即 `vendor/qcloud_sts`）就用 SDK 实例，否则用自带的 `QCloudSTSClient` ——
两者接口一致（`getTempKeys($config)` / `getTempKeys4Ci($config)`），返回值也都会经
`handleResponseData` 规整，因此**对调用方无感**，只是为兼容"有/没有 SDK"两种环境。

与客户端是**组合**关系（不是继承）：本类负责拼装它需要的 `$config`，真正的签名计算与
HTTPS 请求由它完成。

被 [QCloudCOSStorage](/php/api/modules/qcloud/qcloudcos/q-cloud-cos-storage) 与其子类
[DiscuzXQCloudCOSStorage](/php/api/discuzx/foundation/storage/discuz-xq-cloud-cos-storage) 持有 —— 都挂在父类的
`$stsClient` 属性上，用于 COS 直传（前端拿临时密钥直传对象存储）。

字段：$userId / $bucket / $region 为 public，可读；$secretId / $secretKey 为 private，
只存实例内、不对外暴露（也没有 getter）。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$userId` | `string` | `null` | 腾讯云 APPID（用户维度的账号 ID） |
| `$bucket` | `string` | `null` | 存储桶名称，形如 `bucketName-appid`（如 `test-125000000`） |
| `$region` | `string` | `null` | 存储桶所属地域，如 `ap-guangzhou` |

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$secretId` | `string` | private | 云 API 密钥 SecretId |
| `$secretKey` | `string` | private | 云 API 密钥 SecretKey |
| `$stsClient` | `QCloudSTSClient|Sts` | private | STS 请求客户端（**按环境二选一**） |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 创建腾讯云 STS 服务实例 |
| [`getTempKeys()`](#gettempkeys) | 获取临时密钥（按前缀 + 操作集合授权，GetFederationToken） |
| [`getTempKeysByPolicy()`](#gettempkeysbypolicy) | 基于自定义 CAM 策略获取临时密钥 |
| [`generateResourceDescription()`](#generateresourcedescription) | 生成 CAM 资源描述（资源六段式的简化拼装） |
| [`generatePolicyStatement()`](#generatepolicystatement) | 生成一条 CAM 策略语句（statement） |

### __construct()

```php
public function __construct($secretId, $secretKey, $region, $bucket)
```

创建腾讯云 STS 服务实例

创建请求客户端（**有 SDK 用 SDK、否则用自带的**）并保存凭据/存储桶/地域；
同时从 $bucket 的 `-appid` 段解析出 `$userId`。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$secretId` | `string` | — | 云 API 密钥 SecretId |
| `$secretKey` | `string` | — | 云 API 密钥 SecretKey（**不要**输出到日志/响应） |
| `$region` | `string` | — | 存储桶所属地域，如 ap-guangzhou |
| `$bucket` | `string` | — | 存储桶名称，形如 bucketName-appid（如 test-125000000）；尾部 appid 会被解析为 $userId |

### getTempKeys()

```php
public function getTempKeys($allowPrefix, $allowActions, $durationSeconds = 1800)
```

获取临时密钥（按前缀 + 操作集合授权，GetFederationToken）

把本实例的凭据与入参拼成 $config 交给 `QCloudSTSClient::getTempKeys`，
由其申请临时密钥（返回键名已小写化）；本方法只做拼装与响应规整。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$allowPrefix` | `array|string` | — | 资源前缀：全部资源用 `*`；某目录下全部资源用 `a/*`；单个文件用 `a/test.jpg` |
| `$allowActions` | `array` | — | 授予的 COS API 权限集合，如 `["name/cos:PutObject"]`；权限名见 https://cloud.tencent.com/document/product/436/31923 |
| `$durationSeconds` | `integer` | `1800` | 临时密钥最长有效期（秒），默认 1800；由服务端限制，最大 7200 |

可能抛出：

- `\Exception` 底层客户端申请失败时抛出（消息可能被包装成文本，原始类型会丢失）

### getTempKeysByPolicy()

```php
public function getTempKeysByPolicy($statement, $durationSeconds = 1800, $version = "2.0")
```

基于自定义 CAM 策略获取临时密钥

与 `getTempKeys` 同构，区别是不用 allowPrefix/allowActions，而是直接传一条 CAM 策略语句
（由 `generatePolicyStatement` 生成、配合 `generateResourceDescription` 使用）。

方法体先按 CAM 策略组装 `$config`（`policy.version` + `policy.statement`），交给
`$stsClient` 的 `getTempKeys($config)` 真正申请，最后经 `handleResponseData` 规整成数组。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$statement` | `array` | — | CAM 策略语句（statement 数组），示例：[{"effect":"allow","action":"sts:AssumeRole","resource":"*"}] |
| `$durationSeconds` | `integer` | `1800` | 临时密钥最长有效期（秒），默认 1800，最大 7200 |
| `$version` | `string` | `"2.0"` | 策略语法版本，默认 2.0 |

可能抛出：

- `\Exception` 底层客户端申请失败时抛出

### generateResourceDescription()

```php
public function generateResourceDescription($resourceName, $serviceType = "cos")
```

生成 CAM 资源描述（资源六段式的简化拼装）

输出形如 `qcs::{serviceType}:{region}:uid/{userId}:{bucket}/{resourceName}`，
其中 region / userId / bucket 都取自当前实例；\`*\`（星号）代表该类型下的所有资源。

建议与 `generatePolicyStatement` 搭配使用，避免手写资源串出错。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$resourceName` | `string` | — | 具体资源：`resource_type/${resourceid}` 或 `＜resource_type＞/＜resource_path＞`（后者支持目录级前缀匹配）；`*` 表示所有资源 |
| `$serviceType` | `string` | `"cos"` | 产品简称（CAM 中简称），默认 cos；为空表示所有产品 |

### generatePolicyStatement()

```php
public function generatePolicyStatement($action, $resource, $effect = "allow", $condition = [])
```

生成一条 CAM 策略语句（statement）

返回键名固定为 CAM 的小写格式：`action` / `resource` / `effect` / `condition`；
`condition` 即使为空数组也会带上（等价于无额外约束）。本方法**只做拼装、不做任何校验**。

建议 resource 用 `generateResourceDescription` 生成；多条语句可组成策略的 statement 数组。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$action` | `array|string` | — | 允许或拒绝的操作（API 名或功能集）；`*` 为所有操作 |
| `$resource` | `array|string` | — | 授权的具体资源（六段式）；`*` 为所有资源 |
| `$effect` | `string` | `"allow"` | 结果：allow（允许）或 deny（显式拒绝），默认 allow |
| `$condition` | `array` | `[]` | 生效约束条件（操作符/操作键/操作值），默认空数组 |

## 非公开方法

**protected**

- `protected function handleResponseData($responseData)` —— 把 STS 响应规整成数组

## 同目录

- [QCloudSTSClient](/php/api/modules/qcloud/sts/q-cloud-sts-client)
- [QCloudSTSScope](/php/api/modules/qcloud/sts/q-cloud-sts-scope)

