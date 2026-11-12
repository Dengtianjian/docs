# Str

`kernel\Foundation\Data\Str`  ·  class

源码：`gstudio_kernel/Foundation/Data/Str.php`

> 字符串工具类

## 声明

```php
class Str
```

## 概述

提供字符串编解码、格式化、截取、大小写转换、随机生成、XML 解析等一系列
静态工具方法。全部方法无需实例化即可调用。

方法分为以下几组：
- 编解码：    fromJsEscape、ucs2ToUtf8、fromXml
- 模板替换：  replace
- 随机生成：  random、randomInt、serialNo、uuid
- 判断：      startsWith、endsWith、contains
- 截取：      before、after、limit、mask
- 长度：      length
- 大小写转换：studly、camel、snake
- URL/Slug：  slug

## 方法一览

| 方法 | 说明 |
|---|---|
| [`fromJsEscape()`](#fromjsescape) | 可对前端通过escape()编码的字符进行解码 |
| [`ucs2ToUtf8()`](#ucs2toutf8) | UCS-2 编码转换为 UTF-8 |
| [`fromXml()`](#fromxml) | XML 字符串转数组，保留 XML 属性（以 @attr 键存储） |
| [`replace()`](#replace) | 使用参数数组替换字符串中的 {key} 占位符 |
| [`random()`](#random) | 生成随机字符串 |
| [`randomInt()`](#randomint) | 生成随机整数 |
| [`serialNo()`](#serialno) | 生成序列单号 |
| [`uuid()`](#uuid) | 生成 UUID v4 |
| [`startsWith()`](#startswith) | 检查字符串是否以指定子串开头 |
| [`endsWith()`](#endswith) | 检查字符串是否以指定子串结尾 |
| [`contains()`](#contains) | 检查字符串是否包含指定子串 |
| [`before()`](#before) | 返回字符串中指定搜索值之前的部分 |
| [`after()`](#after) | 返回字符串中指定搜索值之后的部分 |
| [`limit()`](#limit) | 截取字符串到指定长度，超出部分以指定字符结尾 |
| [`mask()`](#mask) | 用指定字符掩盖字符串中间部分 |
| [`length()`](#length) | 获取字符串长度（多字节安全） |
| [`studly()`](#studly) | 将字符串转换为 StudlyCase（大驼峰，首字母大写） |
| [`camel()`](#camel) | 将字符串转换为 camelCase（小驼峰，首字母小写） |
| [`snake()`](#snake) | 将字符串转换为 snake_case（下划线分隔，全小写） |
| [`slug()`](#slug) | 生成 URL 友好的 slug |

### fromJsEscape()

```php
public static function fromJsEscape($str): string
```

可对前端通过escape()编码的字符进行解码

支持以下编码格式：
- %uXXXX    — JavaScript escape() 的 Unicode 编码
- %XX       — 标准 URL 编码（ASCII 字符）
- &#xXXXX;  — HTML 十六进制字符实体
- &#NNN;    — HTML 十进制字符实体

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$str` | `string` | — | 要解码的字符串 |

返回：`string` —— string 解码后的 UTF-8 字符串

### ucs2ToUtf8()

```php
public static function ucs2ToUtf8($data)
```

UCS-2 编码转换为 UTF-8

优先使用 mb_convert_encoding，不可用时 fallback 到 iconv。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `string` | — | UCS-2 编码的原始字节 |

### fromXml()

```php
public static function fromXml($XMLString)
```

XML 字符串转数组，保留 XML 属性（以 @attr 键存储）

递归解析 XML 节点树，自动处理 CDATA、重复子元素（合并为数组）、
以及混合内容节点（文本存储为 #text 键）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$XMLString` | `string` | — | XML 字符串 |

### replace()

```php
public static function replace($string, $params = []): string
```

使用参数数组替换字符串中的 {key} 占位符

支持两种模式：
- 关联数组：按 key 匹配替换，{"name" => "Alice"} 替换 {name}
- 索引数组：按占位符出现顺序对应替换

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$string` | `string` | — | 包含 {key} 占位符的模板字符串 |
| `$params` | `array` | `[]` | 参数数组，关联数组按 key 匹配，索引数组按顺序匹配 |

返回：`string` —— string 替换后的字符串

### random()

```php
public static function random($stringLength = 5, $chars = null, $secure = false): string
```

生成随机字符串

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$stringLength` | `integer` | `5` | 生成的字符串长度 |
| `$chars` | `string|null` | `null` | 自定义字符集，默认为 [a-zA-Z0-9] |
| `$secure` | `bool` | `false` | 是否使用密码学安全随机数（random_int），默认 false |

返回：`string` —— string 随机字符串

### randomInt()

```php
public static function randomInt($min = 0, $max = 100): int
```

生成随机整数

PHP 7.0+ 优先使用密码学安全的 random_int，否则 fallback 到 mt_rand

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$min` | `integer` | `0` | 可选的、返回的最小值（默认：0） |
| `$max` | `integer` | `100` | 可选的、返回的最大值（默认：100） |

返回：`int` —— integer 随机整数

### serialNo()

```php
public static function serialNo($ExpectLength = 32, $Prefix = null, $Suffix = null, $dateFormat = 'YmdHis'): string
```

生成序列单号

格式：{前缀}{日期时间}{随机数字填充}{后缀}
长度不足时用随机数字补全，超出时从尾部截断。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$ExpectLength` | `integer` | `32` | 期望的总长度（含前后缀） |
| `$Prefix` | `string|int|float|null` | `null` | 前缀，null 表示无前缀 |
| `$Suffix` | `string|int|float|null` | `null` | 后缀，null 表示无后缀 |
| `$dateFormat` | `string` | `'YmdHis'` | 日期格式，默认 YmdHis |

返回：`string` —— string 序列单号

### uuid()

```php
public static function uuid(): string
```

生成 UUID v4

符合 RFC 4122 标准的版本 4 UUID（随机生成）。

返回：`string` —— string 格式为 xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx 的 UUID

### startsWith()

```php
public static function startsWith($haystack, $needle): bool
```

检查字符串是否以指定子串开头

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$haystack` | `string` | — | 被检查的字符串 |
| `$needle` | `string` | — | 要查找的子串 |

返回：`bool` —— bool

### endsWith()

```php
public static function endsWith($haystack, $needle): bool
```

检查字符串是否以指定子串结尾

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$haystack` | `string` | — | 被检查的字符串 |
| `$needle` | `string` | — | 要查找的子串 |

返回：`bool` —— bool

### contains()

```php
public static function contains($haystack, $needle): bool
```

检查字符串是否包含指定子串

为 PHP 7 项目提供 str_contains 兼容实现

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$haystack` | `string` | — | 被检查的字符串 |
| `$needle` | `string` | — | 要查找的子串 |

返回：`bool` —— bool

### before()

```php
public static function before($subject, $search): string
```

返回字符串中指定搜索值之前的部分

若搜索值不存在，返回原字符串。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$subject` | `string` | — | 源字符串 |
| `$search` | `string` | — | 搜索值 |

返回：`string` —— string

### after()

```php
public static function after($subject, $search): string
```

返回字符串中指定搜索值之后的部分

若搜索值不存在，返回原字符串。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$subject` | `string` | — | 源字符串 |
| `$search` | `string` | — | 搜索值 |

返回：`string` —— string

### limit()

```php
public static function limit($value, $limit = 100, $end = '...'): string
```

截取字符串到指定长度，超出部分以指定字符结尾

多字节安全：优先使用 mb_substr，fallback 到 substr。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string` | — | 要截取的字符串 |
| `$limit` | `int` | `100` | 最大长度 |
| `$end` | `...string` | `'...'` | 超出时追加的结尾字符 |

返回：`string` —— string

### mask()

```php
public static function mask($value, $character = '*', $start = 3, $length = 4): string
```

用指定字符掩盖字符串中间部分

适用于手机号、邮箱、身份证号等敏感数据的脱敏展示。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string` | — | 原始字符串 |
| `$character` | `string` | `'*'` | 掩盖字符，默认为 * |
| `$start` | `int` | `3` | 从第几位开始掩盖（0-based） |
| `$length` | `int` | `4` | 掩盖长度，null 表示从 start 掩盖到末尾 |

返回：`string` —— string

### length()

```php
public static function length($value): int
```

获取字符串长度（多字节安全）

优先使用 mb_strlen 以正确处理中文等多字节字符，
mbstring 不可用时 fallback 到 strlen。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string` | — | 要计算长度的字符串 |

返回：`int` —— int 字符数（非字节数）

### studly()

```php
public static function studly($value): string
```

将字符串转换为 StudlyCase（大驼峰，首字母大写）

"foo_bar_baz" → "FooBarBaz"
"foo-bar-baz" → "FooBarBaz"

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string` | — | 要转换的字符串 |

返回：`string` —— string

### camel()

```php
public static function camel($value): string
```

将字符串转换为 camelCase（小驼峰，首字母小写）

"foo_bar_baz" → "fooBarBaz"
"foo-bar-baz" → "fooBarBaz"
"FooBar"      → "fooBar"

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string` | — | 要转换的字符串 |

返回：`string` —— string

### snake()

```php
public static function snake($value, $delimiter = '_'): string
```

将字符串转换为 snake_case（下划线分隔，全小写）

"FooBarBaz"  → "foo_bar_baz"
"fooBarBaz"  → "foo_bar_baz"
"foo-barBaz" → "foo_bar_baz"

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string` | — | 要转换的字符串 |
| `$delimiter` | `string` | `'_'` | 分隔符，默认为下划线 |

返回：`string` —— string

### slug()

```php
public static function slug($value, $separator = '-'): string
```

生成 URL 友好的 slug

将字符串转换为仅包含小写字母、数字和指定分隔符的格式。
适用于文章标题转 URL 路径、分类别名等场景。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `string` | — | 要转换的字符串 |
| `$separator` | `string` | `'-'` | 分隔符，默认为中划线 |

返回：`string` —— string

## 非公开方法

**private**

- `private static function _simpleXmlToArray(\SimpleXMLElement $xml)` —— 递归将 SimpleXMLElement 转为数组，保留属性

## 同目录

- [Arr](/php/api/foundation/data/arr)
- [Date](/php/api/foundation/data/date)
- [Func](/php/api/foundation/data/func)
- [Money](/php/api/foundation/data/money)
- [Mutator](/php/api/foundation/data/mutator)
- [Numeric](/php/api/foundation/data/numeric)
- [Serializer](/php/api/foundation/data/serializer)
- [Transform](/php/api/foundation/data/transform)

