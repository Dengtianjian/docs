# DiscuzGBKJsonResponse

`kernel\Discuz\Foundation\DiscuzGBKJsonResponse`  ·  class

源码：`gstudio_kernel/Discuz/Foundation/DiscuzGBKJsonResponse.php`

## 声明

```php
class DiscuzGBKJsonResponse
```

## 常量

| 常量 | 值 | 说明 |
|---|---|---|
| `JSON_SLICE` | `1` | — |
| `JSON_IN_STR` | `2` | — |
| `JSON_IN_ARR` | `4` | — |
| `JSON_IN_OBJ` | `8` | — |
| `JSON_IN_CMT` | `16` | — |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`encode()`](#encode) | — |
| [`nameValue()`](#namevalue) | — |
| [`reduceString()`](#reducestring) | — |
| [`decode()`](#decode) | — |
| [`utf8ToUnicode()`](#utf8tounicode) | — |
| [`unicodeToUTF8()`](#unicodetoutf8) | — |
| [`utf8ToUTF16BE()`](#utf8toutf16be) | — |
| [`utf16beToUTF8()`](#utf16betoutf8) | — |

### encode()

```php
public static function encode($var)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$var` | `mixed` | — | — |

### nameValue()

```php
public static function nameValue($name, $value)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `mixed` | — | — |
| `$value` | `mixed` | — | — |

### reduceString()

```php
public static function reduceString($str)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$str` | `mixed` | — | — |

### decode()

```php
public static function decode($str, $useArray = true)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$str` | `mixed` | — | — |
| `$useArray` | `mixed` | `true` | — |

### utf8ToUnicode()

```php
public static function utf8ToUnicode(&$str)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$str` | `mixed` | — | — |

### unicodeToUTF8()

```php
public static function unicodeToUTF8(&$str)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$str` | `mixed` | — | — |

### utf8ToUTF16BE()

```php
public static function utf8ToUTF16BE(&$str, $bom = false)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$str` | `mixed` | — | — |
| `$bom` | `mixed` | `false` | — |

### utf16beToUTF8()

```php
public static function utf16beToUTF8(&$str)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$str` | `mixed` | — | — |

## 同目录

- [DiscuzApp](/php/api/discuzx/foundation/discuz-x-app)
- [DiscuzController](/php/api/discuzx/foundation/discuz-x-controller)
- [DiscuzDeployment](/php/api/discuzx/foundation/discuz-x-deployment)
- [DiscuzHookApp](/php/api/discuzx/foundation/discuz-x-hook-app)
- [DiscuzLang](/php/api/discuzx/foundation/discuz-x-lang)
- [DiscuzPath](/php/api/discuzx/foundation/discuz-x-path)
- [DiscuzResponse](/php/api/discuzx/foundation/discuz-x-response)
- [DiscuzView](/php/api/discuzx/foundation/discuz-x-view)

