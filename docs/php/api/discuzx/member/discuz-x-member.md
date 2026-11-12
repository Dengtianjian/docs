# DiscuzXMember

`kernel\DiscuzX\Member\DiscuzXMember`  ·  class

源码：`gstudio_kernel/DiscuzX/Member/DiscuzXMember.php`

## 声明

```php
class DiscuzXMember
```

## 方法一览

| 方法 | 说明 |
|---|---|
| [`login()`](#login) | 账号密码登录 |
| [`register()`](#register) | 注册用户 |
| [`avatar()`](#avatar) | — |
| [`credit()`](#credit) | — |
| [`group()`](#group) | — |
| [`newPrompt()`](#newprompt) | — |
| [`get()`](#get) | — |
| [`getAll()`](#getall) | — |
| [`exist()`](#exist) | 查看用户是否存在 |

### login()

```php
public static function login($username, $password, $cookieTime = 1296000)
```

账号密码登录

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$username` | `string` | — | 会员账号 |
| `$password` | `string` | — | 会员密码 |
| `$cookieTime` | `int` | `1296000` | cookie有效期 |

### register()

```php
public static function register($username, $password, $email = null, $invationCode = null)
```

注册用户

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$username` | `string` | — | 用户名 |
| `$password` | `string` | — | 账号密码 |
| `$email` | `string` | `null` | 注册邮箱地址 |
| `$invationCode` | `string` | `null` | 邀请码 |

### avatar()

```php
public static function avatar($memberId, $size = 'middle', $returnsrc = 1, $real = FALSE, $static = FALSE, $ucenterurl = '', $class = '', $extra = '', $random = 0)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$memberId` | `mixed` | — | — |
| `$size` | `mixed` | `'middle'` | — |
| `$returnsrc` | `mixed` | `1` | — |
| `$real` | `mixed` | `FALSE` | — |
| `$static` | `mixed` | `FALSE` | — |
| `$ucenterurl` | `mixed` | `''` | — |
| `$class` | `mixed` | `''` | — |
| `$extra` | `mixed` | `''` | — |
| `$random` | `mixed` | `0` | — |

### credit()

```php
public static function credit($memberId = null)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$memberId` | `mixed` | `null` | — |

### group()

```php
public static function group($groupId = null, $simple = false)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$groupId` | `mixed` | `null` | — |
| `$simple` | `mixed` | `false` | — |

### newPrompt()

```php
public static function newPrompt($memberId = null)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$memberId` | `mixed` | `null` | — |

### get()

```php
public static function get($memberId = null, $detailed = true, $dataConversionRules = null)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$memberId` | `mixed` | `null` | — |
| `$detailed` | `mixed` | `true` | — |
| `$dataConversionRules` | `mixed` | `null` | — |

### getAll()

```php
public static function getAll($page = 1, $limit = 15, $query = null, $accurateQuery = false)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$page` | `mixed` | `1` | — |
| `$limit` | `mixed` | `15` | — |
| `$query` | `mixed` | `null` | — |
| `$accurateQuery` | `mixed` | `false` | — |

### exist()

```php
public static function exist($UserId)
```

查看用户是否存在

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$UserId` | `int` | — | 查询的用户 ID |

## 同目录

- [DiscuzXMemberGroup](/php/api/discuzx/member/discuz-x-member-group)

