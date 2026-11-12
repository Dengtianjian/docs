# QCloudCosPutObjectAcl

`kernel\Modules\QCloud\QCloudCos\Object\ACL\QCloudCosPutObjectAcl`  ·  class

源码：`gstudio_kernel/Modules/QCloud/QCloudCos/Object/ACL/QCloudCosPutObjectAcl.php`

> PUT Object acl（写入对象访问控制列表）的输入容器

## 声明

```php
class QCloudCosPutObjectAcl extends AbstractQCloudCosObject
```

父类：[AbstractQCloudCosObject](/php/api/modules/qcloud/qcloudcos/object/abstract-q-cloud-cos-object)

## 概述

请求：`PUT /＜ObjectKey＞?acl`。**请求头与请求体二选一**：
- **请求头**：`x-cos-acl` 或 `x-cos-grant-*`（本类继承 `QCloudCosObjectAclTrait`，方法直接可用）；
- **请求体 XML**：`AccessControlPolicy`（`Owner` + `AccessControlList/Grant`），用 `toXml` 产出。

```php
// 走请求头
(new QCloudCosPutObjectAcl())->acl(AbstractQCloudCosObject::ACL_PUBLIC_READ)->all();

// 走请求体（显式授权）
$xml = (new QCloudCosPutObjectAcl())
->ownerId("qcs::cam::uin/100000000001:uin/100000000001")
->grants([["id" => "qcs::cam::uin/100000000002:uin/100000000002", "permission" => "READ"]])
->toXml();
```

要点（官方）：
- 是**覆盖**操作：新 ACL 覆盖原 ACL；单个 ACL 最多 **100** 条 Grant；
- **仅可对 CAM 主账号或匿名用户授予权限**；给子用户/用户组授权要用 PUT Bucket policy；
- 请求者需对该对象具备写入 ACL 的权限（action `cos:PutObjectACL`）；响应体为空。

文档核对状态：**已按官方文档核对**（PUT Object acl，product/436/7748，页面更新 2026-03-12）。

## 示例

```php
// 走请求头
(new QCloudCosPutObjectAcl())->acl(AbstractQCloudCosObject::ACL_PUBLIC_READ)->all();

// 走请求体（显式授权）
$xml = (new QCloudCosPutObjectAcl())
->ownerId("qcs::cam::uin/100000000001:uin/100000000001")
->grants([["id" => "qcs::cam::uin/100000000002:uin/100000000002", "permission" => "READ"]])
->toXml();
```

## 常量

| 常量 | 值 | 说明 |
|---|---|---|
| `GRANTEE_CANONICAL_USER` | `"CanonicalUser"` | Grant 的 Grantee 类型：CAM 用户（用 ID） |
| `GRANTEE_GROUP` | `"Group"` | Grant 的 Grantee 类型：用户组（用 URI） |
| `PERMISSION_READ` | `"READ"` | Permission：读 |
| `PERMISSION_WRITE` | `"WRITE"` | Permission：写 |
| `PERMISSION_READ_ACP` | `"READ_ACP"` | Permission：读写 ACL |
| `PERMISSION_WRITE_ACP` | `"WRITE_ACP"` | Permission：写 ACL |
| `PERMISSION_FULL_CONTROL` | `"FULL_CONTROL"` | Permission：所有权限 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`ownerId()`](#ownerid) | Owner/ID（对象属主 ID） |
| [`ownerDisplayName()`](#ownerdisplayname) | Owner/DisplayName（属主显示名，可选） |
| [`grants()`](#grants) | 授权列表（**必选**：走请求体时至少要有一条） |
| [`toXml()`](#toxml) | 产出请求体 XML（`＜AccessControlPolicy＞`） |

### ownerId()

```php
public function ownerId($value = null)
```

Owner/ID（对象属主 ID）

官方格式：`qcs::cam::uin/[OwnerUin]:uin/[OwnerUin]`。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### ownerDisplayName()

```php
public function ownerDisplayName($value = null)
```

Owner/DisplayName（属主显示名，可选）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string|null` | `null` | 不传=读取 |

### grants()

```php
public function grants($grants = null)
```

授权列表（**必选**：走请求体时至少要有一条）

每项支持这些键：
- `type`：`GRANTEE_CANONICAL_USER`（默认，用 `id`）/ `GRANTEE_GROUP`（用 `uri`）
- `id` / `uri`：被授权者标识
- `permission`：`PERMISSION_READ` / `WRITE` / `READ_ACP` / `WRITE_ACP` / `PERMISSION_FULL_CONTROL`

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$grants` | `array|null` | `null` | 授权数组；不传=读取 |

### toXml()

```php
public function toXml()
```

产出请求体 XML（`＜AccessControlPolicy＞`）

⚠️ 这里是**手工拼串**而非 `\kernel\Foundation\Data\Arr::toXML`：官方 XML 需要
`Grantee` 上的 **`xsi:type` 属性**，而 `Arr::toXML()` 不支持属性。所有文本值逐值转义。

## 同目录

- [QCloudCosGetObjectAcl](/php/api/modules/qcloud/qcloudcos/object/acl/q-cloud-cos-get-object-acl)
- [QCloudCosObjectAclTrait](/php/api/modules/qcloud/qcloudcos/object/acl/q-cloud-cos-object-acl-trait)

