# WechatUsersModel

`kernel\Modules\Wechat\Models\WechatUsersModel`  ·  class

源码：`gstudio_kernel/Modules/Wechat/Models/WechatUsersModel.php`

## 声明

```php
class WechatUsersModel extends Model
```

父类：[Model](/php/api/foundation/database/rdb/model)

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | — |
| [`bound()`](#bound) | — |
| [`bind()`](#bind) | — |
| [`register()`](#register) | — |
| [`removeByMemberId()`](#removebymemberid) | — |
| [`removeByOpenId()`](#removebyopenid) | — |
| [`removeByUnionId()`](#removebyunionid) | — |
| [`removeByPhone()`](#removebyphone) | — |
| [`updatePhone()`](#updatephone) | — |

### __construct()

```php
public function __construct()
```

### bound()

```php
public function bound($memberId, $openId)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$memberId` | `mixed` | — | — |
| `$openId` | `mixed` | — | — |

### bind()

```php
public function bind($memberId, $openId, $unionId = null, $phone = null)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$memberId` | `mixed` | — | — |
| `$openId` | `mixed` | — | — |
| `$unionId` | `mixed` | `null` | — |
| `$phone` | `mixed` | `null` | — |

### register()

```php
public function register($openId, $unionId = null, $phone = null)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$openId` | `mixed` | — | — |
| `$unionId` | `mixed` | `null` | — |
| `$phone` | `mixed` | `null` | — |

### removeByMemberId()

```php
public function removeByMemberId($memberId, $directly = false)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$memberId` | `mixed` | — | — |
| `$directly` | `mixed` | `false` | — |

### removeByOpenId()

```php
public function removeByOpenId($openId)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$openId` | `mixed` | — | — |

### removeByUnionId()

```php
public function removeByUnionId($unionId)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$unionId` | `mixed` | — | — |

### removeByPhone()

```php
public function removeByPhone($phone)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$phone` | `mixed` | — | — |

### updatePhone()

```php
public function updatePhone($memberId, $phone)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$memberId` | `mixed` | — | — |
| `$phone` | `mixed` | — | — |

## 同目录

- [WechatAccountsModel](/php/api/modules/wechat/models/wechat-accounts-model)

