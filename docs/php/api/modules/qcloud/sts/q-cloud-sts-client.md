# QCloudSTSClient

`kernel\Modules\QCloud\STS\QCloudSTSClient`  ·  class

源码：`gstudio_kernel/Modules/QCloud/STS/QCloudSTSClient.php`

> 腾讯云 STS 临时密钥申请（官方样例移植版）

## 声明

```php
class QCloudSTSClient
```

## 概述

向腾讯云 STS 申请临时密钥，供 COS 直传等场景使用；由 `QCloudSTS` 持有并调用
（它的 $stsInstance 属性就是本类实例）。

本文件源自腾讯云官方「临时密钥计算样例」，只做了命名空间/类名移植，**内部逻辑未重写**，
官方样例的取舍一并保留（见下方「注意」）。

两条主线：
- `getTempKeys`：GetFederationToken，**目前仓内实际使用的入口**（`QCloudSTS::getTempKeys` 调用它）；
- `getRoleCredential`：AssumeRole（需 roleArn），保留自样例，仓内暂未使用。

传入的 $config 常用键：
- 凭据：secretId / secretKey；
- 资源：bucket / region / allowPrefix（数组）/ allowActions（数组）/ condition（可选）；
- 其它：durationSeconds（整数，秒）、allowCiSource（为 true 时额外放行万象 ci 资源）；
- policy：直接给完整 policy，**跳过上面的自动组装**；
- roleArn / externalId：仅 `getRoleCredential` 使用；
- url / domain / endpoint / proxy：覆盖服务地址与代理。

注意（实现现状，改动前先读）：
- 请求一律 CURLOPT_SSL_VERIFYPEER = 0 + CURLOPT_SSL_VERIFYHOST = 0（官方样例如此，**不校验 TLS 证书**）；
- 异常在 catch 里被**重新包装成 \Exception**（原始异常类型与消息会丢失，只剩文本）；
- durationSeconds 只做「存在则须为 int」的校验，**不是必填**；缺失时请求里的 DurationSeconds 为 null，由服务端报错；
- $ShortBucketName / $allow 等变量由官方样例保留，实际未被使用。

## 方法一览

| 方法 | 说明 |
|---|---|
| [`_hex2bin()`](#_hex2bin) | 十六进制字符串转二进制 |
| [`json2str()`](#json2str) | 把参数数组拼成 query string（k=v&k=v 形式） |
| [`getSignature()`](#getsignature) | 计算临时密钥请求的签名 |
| [`backwardCompat()`](#backwardcompat) | 兼容 v2 接口的返回键名：递归把每个键的首字母改成小写 |
| [`getTempKeys()`](#gettempkeys) | 获取临时密钥（GetFederationToken） |
| [`getTempKeys4Ci()`](#gettempkeys4ci) | 获取临时密钥（无条件附加万象资源授权） |
| [`getRoleCredential()`](#getrolecredential) | 申请角色授权（AssumeRole） |
| [`getPolicy()`](#getpolicy) | 由 scope 对象数组组装 policy（version 2.0） |

### _hex2bin()

```php
public function _hex2bin($data)
```

十六进制字符串转二进制

等价于 PHP 5.4+ 的原生 hex2bin()，此处为官方样例自带的旧环境实现（签名计算用）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `string` | — | 十六进制字符串（长度须为偶数） |

### json2str()

```php
public function json2str($obj, $notEncode = false)
```

把参数数组拼成 query string（k=v&k=v 形式）

先按键名 ksort 排序，再按 $notEncode 决定值是否 rawurlencode ——
签名串必须用**不编码**的形式（$notEncode = true），而真正发出去的 POST body 用编码形式。

实现现状：ksort() 写在 is_array() 校验**之前**，所以传非数组时先触发一条 PHP 警告，
之后才抛出下面这个更友好的异常。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$obj` | `array` | — | 参数数组 |
| `$notEncode` | `boolean` | `false` | 是否**不做** URL 编码，默认 false |

可能抛出：

- `\Exception` $obj 不是数组时抛出

### getSignature()

```php
public function getSignature($opt, $key, $method, $config)
```

计算临时密钥请求的签名

拼串 = HTTP方法 + host + "/?" + 参数串(不编码) → hash_hmac("sha1", …)
→ _hex2bin() → base64_encode()。

host 取值优先级：默认 sts.tencentcloudapi.com → $config 的 domain 键 → $config 的 endpoint 键
（endpoint 会覆盖 domain）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$opt` | `array` | — | 参与签名的参数（含 SecretId / Timestamp / Nonce / Action …） |
| `$key` | `string` | — | 密钥 secretKey，用作 HMAC 的 key |
| `$method` | `string` | — | HTTP 方法，本类固定传 POST |
| `$config` | `array` | — | 配置（读取 domain / endpoint 键） |

### backwardCompat()

```php
public function backwardCompat($result)
```

兼容 v2 接口的返回键名：递归把每个键的首字母改成小写

v2 时代返回键首字母小写、v3 改成大写，这里统一转回小写以向下兼容；
另外把 Token 特判映射为 sessionToken（临时密钥里的会话令牌）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$result` | `array` | — | 接口返回的数组 |

可能抛出：

- `\Exception` $result 不是数组时抛出

### getTempKeys()

```php
public function getTempKeys($config)
```

获取临时密钥（GetFederationToken）

流程：
1. 确定 policy —— 传了 $config 的 policy 键就直接用；否则由 bucket（解析出 AppId）
+ region + allowPrefix + allowActions（可选 condition）组装 version 2.0 策略；
若 allowCiSource 为 true，额外附加一条万象 qcs::ci:…/bucket/{bucket}/* 资源；
2. 组装请求参数（SecretId / Timestamp / Nonce / DurationSeconds / Policy …）并计算 Signature；
3. curl POST 到 STS（地址可被 url / domain / endpoint 覆盖，proxy 可设代理）；
4. 解析返回：取 Response 节点，含 Error 则抛异常；再补一个 startTime
（= ExpiredTime - durationSeconds，即密钥生效时刻）；
5. 经 `backwardCompat` 统一键名后返回。

失败时抛出的 \Exception 消息形如 "error: …"（各步骤的参数校验失败）或已获取到的响应
JSON（get cam failed 等业务错误）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$config` | `array` | — | 见类注释的 $config 常用键 |

可能抛出：

- `\Exception` 参数缺失（bucket / allowPrefix / region）、durationSeconds 非整数、请求或业务失败

### getTempKeys4Ci()

```php
public function getTempKeys4Ci($config)
```

获取临时密钥（无条件附加万象资源授权）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$config` | `array` | — | 同 `getTempKeys` |

可能抛出：

- `\Exception` 同 {@see getTempKeys()}

::: warning 已废弃
官方已不再维护本方法 —— 请改用 {@see getTempKeys()} 并把 allowCiSource 设为 true。
:::

### getRoleCredential()

```php
public function getRoleCredential($config)
```

申请角色授权（AssumeRole）

与 `getTempKeys` 同构，差别：
- Action 为 AssumeRole，必须提供 $config 的 roleArn 键（否则抛异常），可选 externalId；
- **默认服务地址是内网端点** https://sts.internal.tencentcloudapi.com/ ，非腾讯云内网
环境必须用 $config 的 endpoint 键覆盖（本方法**不认** url / domain 键）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$config` | `array` | — | 见类注释的 $config 常用键（需 roleArn） |

可能抛出：

- `\Exception` 参数缺失（bucket / allowPrefix / region / roleArn）、durationSeconds 非整数、请求或业务失败

### getPolicy()

```php
public function getPolicy($scopes)
```

由 scope 对象数组组装 policy（version 2.0）

每个元素需是 `QCloudSTSScope`，逐一取其 get_action() / get_resource() / get_effect()
拼成一条 statement。注意：本方法**只判 $scopes 是否为数组**，元素类型不做校验，
传入非 Scope 对象会在调用其方法时致命。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$scopes` | `array` | — | `QCloudSTSScope` 数组 |

## 同目录

- [QCloudSTS](/php/api/modules/qcloud/sts/q-cloud-sts)
- [QCloudSTSScope](/php/api/modules/qcloud/sts/q-cloud-sts-scope)

