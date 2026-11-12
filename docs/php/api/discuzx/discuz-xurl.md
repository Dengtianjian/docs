# DiscuzXURL

`kernel\DiscuzX\DiscuzXURL`  ·  class

源码：`gstudio_kernel/DiscuzX/DiscuzXURL.php`

## 声明

```php
class DiscuzXURL extends URL
```

父类：[URL](/php/api/foundation/http/url)

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$pathName` | `mixed` | `"plugin.php"` | — |
| `$uri` | `mixed` | `null` | — |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | — |
| [`buildURL()`](#buildurl) | 构建URL |
| [`toString()`](#tostring) | — |

### __construct()

```php
public function __construct($URL = null)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$URL` | `mixed` | `null` | — |

### buildURL()

```php
public static function buildURL($host = "", $pathName = "", $uri = null, $queryParams = [], $fragment = null, $protocol = "https", $port = null, $user = null, $password = null)
```

构建URL

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$host` | `string` | `""` | 主机信息 |
| `$pathName` | `string` | `""` | 路径 |
| `$uri` | `string` | `null` | URI |
| `$queryParams` | `array` | `[]` | 请求参数 |
| `$fragment` | `string` | `null` | hash片段 |
| `$protocol` | `string` | `"https"` | 请求协议 |
| `$port` | `int` | `null` | 端口 |
| `$user` | `string` | `null` | 用户名 |
| `$password` | `string` | `null` | 密码 |

### toString()

```php
public function toString()
```

## 同目录

- [DiscuzXForum](/php/api/discuzx/discuz-x-forum)
- [DiscuzXPost](/php/api/discuzx/discuz-x-post)
- [DiscuzXThread](/php/api/discuzx/discuz-x-thread)

