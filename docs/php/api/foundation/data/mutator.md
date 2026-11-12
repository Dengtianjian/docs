# Mutator

`kernel\Foundation\Data\Mutator`  ·  class

源码：`gstudio_kernel/Foundation/Data/Mutator.php`

> 数据突变器 —— 将输入数据按类型规则进行深度转换。

## 声明

```php
class Mutator
```

## 概述

核心能力：
- 单一类型转换（如整份数据转为 int）
- 管道链式转换（"string|int|mask:3" 或 ["string","int","mask:3"]），用 | 或数组分隔多步类型，按序处理
- 时间戳转换（timestamp 秒级 / timestamp_m 毫秒级）
- 日期转换（date 日期 / datetime 日期时间），支持 :format 自定义输出格式
- 密文遮盖（mask / mask:4），将字符串中间部分替换为 *，默认遮盖 80%
- 字符串清洗（trim / lower / upper / strip_tags / htmlspecialchars）
- 数值处理（number 提取数字 / abs 绝对值 / round 四舍五入 / number_format 千分位）
- 空值兜底（default:值），null / '' 时使用默认值（其余规则对 null 不做转换，保持原值）
- JSON 编解码（json / json_decode）
- 数组操作（pluck 提取 / implode 拼接）
- 编码转换（urlencode / urldecode / base64 / base64_decode）
- 字符串截断（truncate:n:suffix）
- 关联数组逐键类型映射，支持点号路径（"user.profile.id"）和通配符（"items.*.price"）
- 分隔符语法：将字符串按分隔符拆分后逐元素转换（如 "int/," 按逗号拆分转 int）
- array＜type＞ 语法：对索引数组逐元素指定类型
- 嵌套 Mutator 实例管道处理
- callable 自定义转换
- completion / removeNotExistRuleKey 控制数据结构的补全与裁剪

使用示例：
```php
// 简单类型
(new Mutator)->data('123')->int()->convert();                    // 123

// 时间戳
(new Mutator)->data('2024-01-01')->timestamp()->convert();      // 1704067200
(new Mutator)->data('2024-01-01')->timestamp_m()->convert();    // 1704067200000

// 日期 & 日期时间
(new Mutator)->data(1704067200)->date()->convert();             // "2024-01-01"
(new Mutator)->data('2024-01-01')->datetime()->convert();       // "2024-01-01 00:00:00"
(new Mutator)->data('2024-01-01 12:30:00')->date()->convert();  // "2024-01-01"

// 自定义格式
(new Mutator)->data('2024-01-01')
->convert('date:Y年m月d日');                                  // "2024年01月01日"

// 密文遮盖
(new Mutator)->data('13288364266')->mask()->convert();           // "1*********6"
(new Mutator)->data('13288364266')
->convert('mask:4');                                          // "132****4266"

// 管道链式转换（字符串形式和数组形式等价）
(new Mutator)->data('13288364266')->convert('string|mask:3');     // "132****4266"
(new Mutator)->data('13288364266')
->convert(['string', 'mask:3']);                               // "132****4266"
(new Mutator)->data('123.99')->convert('float|int|string');        // "123"
(new Mutator)->data('123.99')->convert(['float', 'int', 'string']); // "123"

// 数组映射
(new Mutator(['name' => 'string', 'age' => 'int']))
->data(['name' => 'admin', 'age' => '18'])
->convert();
// => ['name' => 'admin', 'age' => 18]

// 点号路径
(new Mutator(['user.profile.id' => 'int']))
->data(['user' => ['profile' => ['id' => '9910']]])
->convert();
// => ['user' => ['profile' => ['id' => 9910]]]

// 通配符
(new Mutator(['items.*.price' => 'double']))
->data(['items' => [['price' => '9.99'], ['price' => '12.50']]])
->convert();
// => ['items' => [['price' => 9.99], ['price' => 12.50]]]
```

## 示例

```php
// 简单类型
(new Mutator)->data('123')->int()->convert();                    // 123

// 时间戳
(new Mutator)->data('2024-01-01')->timestamp()->convert();      // 1704067200
(new Mutator)->data('2024-01-01')->timestamp_m()->convert();    // 1704067200000

// 日期 & 日期时间
(new Mutator)->data(1704067200)->date()->convert();             // "2024-01-01"
(new Mutator)->data('2024-01-01')->datetime()->convert();       // "2024-01-01 00:00:00"
(new Mutator)->data('2024-01-01 12:30:00')->date()->convert();  // "2024-01-01"

// 自定义格式
(new Mutator)->data('2024-01-01')
->convert('date:Y年m月d日');                                  // "2024年01月01日"

// 密文遮盖
(new Mutator)->data('13288364266')->mask()->convert();           // "1*********6"
(new Mutator)->data('13288364266')
->convert('mask:4');                                          // "132****4266"

// 管道链式转换（字符串形式和数组形式等价）
(new Mutator)->data('13288364266')->convert('string|mask:3');     // "132****4266"
(new Mutator)->data('13288364266')
->convert(['string', 'mask:3']);                               // "132****4266"
(new Mutator)->data('123.99')->convert('float|int|string');        // "123"
(new Mutator)->data('123.99')->convert(['float', 'int', 'string']); // "123"

// 数组映射
(new Mutator(['name' => 'string', 'age' => 'int']))
->data(['name' => 'admin', 'age' => '18'])
->convert();
// => ['name' => 'admin', 'age' => 18]

// 点号路径
(new Mutator(['user.profile.id' => 'int']))
->data(['user' => ['profile' => ['id' => '9910']]])
->convert();
// => ['user' => ['profile' => ['id' => 9910]]]

// 通配符
(new Mutator(['items.*.price' => 'double']))
->data(['items' => [['price' => '9.99'], ['price' => '12.50']]])
->convert();
// => ['items' => [['price' => 9.99], ['price' => 12.50]]]
```

## 常量

| 常量 | 值 | 说明 |
|---|---|---|
| `ALLOWED_TYPES` | `[ 'boolean', 'bool', 'integer', 'int', 'float', 'double', 'string', 'array', 'object', 'null', 'any', ]` | settype() 允许的类型名白名单。 |
| `WHOLE_VALUE_TYPES` | `[ 'json', 'json_decode', 'implode', 'pluck', ]` | 需整体消费的类型名——不做数组子元素遍历，而是把整个值传给处理器。 例如 json（编码整个数组）、implode（拼接整个数组）、pluck（从数组中提取键）。 |

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$types` | `string|array|null` | private | 转换规则：字符串表示统一类型，数组表示逐键映射。 |
| `$data` | `mixed` | private | 待转换的原始数据。 |
| `$completion` | `bool` | private | 是否补全 data 中不存在但在 rules 中定义了类型的键（补为 null）。 |
| `$removeNotExistRuleKey` | `bool` | private | 是否剔除 data 中存在但 rules 未定义的键。 与 completion 同时为 true 时：规则外多余键被剔除，规则内缺失键补全 null。 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 构建数据突变器实例。 |
| [`data()`](#data) | 传入待转换的原始数据。 |
| [`string()`](#string) | 设定目标类型为 string。 |
| [`int()`](#int) | 设定目标类型为 integer。 |
| [`object()`](#object) | 设定目标类型为 object（建议传入数组数据）。 |
| [`double()`](#double) | 设定目标类型为 double（浮点数）。 |
| [`bool()`](#bool) | 设定目标类型为 bool。 |
| [`timestamp()`](#timestamp) | 设定目标类型为 timestamp（Unix 时间戳，秒）。 |
| [`timestamp_m()`](#timestamp_m) | 设定目标类型为 timestamp_m（Unix 时间戳，毫秒）。 |
| [`date()`](#date) | 设定目标类型为 date（日期字符串，默认格式 Y-m-d）。 |
| [`datetime()`](#datetime) | 设定目标类型为 datetime（日期时间字符串，默认格式 Y-m-d H:i:s）。 |
| [`mask()`](#mask) | 设定目标类型为 mask（密文遮盖），将字符串中间部分替换为 *。 |
| [`trim()`](#trim) | 设定目标类型为 trim（去除首尾空白字符）。 |
| [`lower()`](#lower) | 设定目标类型为 lower（转为小写）。 |
| [`upper()`](#upper) | 设定目标类型为 upper（转为大写）。 |
| [`number()`](#number) | 设定目标类型为 number（提取数字字符，保留 0-9、.、-）。 |
| [`json()`](#json) | 设定目标类型为 json（数组/对象 → JSON 字符串）。 |
| [`json_decode()`](#json_decode) | 设定目标类型为 json_decode（JSON 字符串 → 关联数组）。 |
| [`abs()`](#abs) | 设定目标类型为 abs（取绝对值）。 |
| [`strip_tags()`](#strip_tags) | 设定目标类型为 strip_tags（去除 HTML/PHP 标签）。 |
| [`implode()`](#implode) | 设定目标类型为 implode（数组拼接为字符串，默认逗号分隔）。 |
| [`pluck()`](#pluck) | 设定目标类型为 pluck（提取数组列表中指定键的值）。 |
| [`urlencode()`](#urlencode) | 设定目标类型为 urlencode（URL 编码）。 |
| [`urldecode()`](#urldecode) | 设定目标类型为 urldecode（URL 解码）。 |
| [`htmlspecialchars()`](#htmlspecialchars) | 设定目标类型为 htmlspecialchars（HTML 实体转义）。 |
| [`round()`](#round) | 设定目标类型为 round（四舍五入）。 |
| [`number_format()`](#number_format) | 设定目标类型为 number_format（千分位格式化）。 |
| [`base64()`](#base64) | 设定目标类型为 base64（Base64 编码）。 |
| [`base64_decode()`](#base64_decode) | 设定目标类型为 base64_decode（Base64 解码）。 |
| [`truncate()`](#truncate) | 设定目标类型为 truncate（截断字符串）。 |
| [`convert()`](#convert) | 执行数据转换，返回转换后的数据。 |

### __construct()

```php
public function __construct($types = null, bool $completion = false, bool $removeNotExistRuleKey = false)
```

构建数据突变器实例。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$types` | `array|string|null` | `null` | 转换规则。 |
| `$completion` | `bool` | `false` | 是否补全 data 中不存在但规则中定义了类型的键（补为 null）。 |
| `$removeNotExistRuleKey` | `bool` | `false` | 是否剔除 data 中存在但规则未定义的键。 |

### data()

```php
public function data($data): self
```

传入待转换的原始数据。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `mixed` | — | 任意类型的数据，通常为数组或标量。 |

返回：`self` —— $this

### string()

```php
public function string(): self
```

设定目标类型为 string。

返回：`self` —— $this

### int()

```php
public function int(): self
```

设定目标类型为 integer。

返回：`self` —— $this

### object()

```php
public function object(): self
```

设定目标类型为 object（建议传入数组数据）。

返回：`self` —— $this

### double()

```php
public function double(): self
```

设定目标类型为 double（浮点数）。

返回：`self` —— $this

### bool()

```php
public function bool(): self
```

设定目标类型为 bool。

返回：`self` —— $this

### timestamp()

```php
public function timestamp(): self
```

设定目标类型为 timestamp（Unix 时间戳，秒）。

支持日期字符串、DateTime 对象、数值等输入。

返回：`self` —— $this

### timestamp_m()

```php
public function timestamp_m(): self
```

设定目标类型为 timestamp_m（Unix 时间戳，毫秒）。

返回：`self` —— $this

### date()

```php
public function date(): self
```

设定目标类型为 date（日期字符串，默认格式 Y-m-d）。

支持 DateTime、时间戳、日期字符串等输入。
可通过 date:format 语法指定自定义格式，如 "date:Y年m月d日"。

返回：`self` —— $this

### datetime()

```php
public function datetime(): self
```

设定目标类型为 datetime（日期时间字符串，默认格式 Y-m-d H:i:s）。

支持 DateTime、时间戳、日期字符串等输入。
可通过 datetime:format 语法指定自定义格式，如 "datetime:Y年m月d日 H:i"。

返回：`self` —— $this

### mask()

```php
public function mask(): self
```

设定目标类型为 mask（密文遮盖），将字符串中间部分替换为 *。

默认遮盖字符串整体长度的 80%（向上取整）。
可通过 mask:count 语法指定精确遮盖位数，如 "mask:4"。

返回：`self` —— $this

### trim()

```php
public function trim(): self
```

设定目标类型为 trim（去除首尾空白字符）。

返回：`self` —— $this

### lower()

```php
public function lower(): self
```

设定目标类型为 lower（转为小写）。

返回：`self` —— $this

### upper()

```php
public function upper(): self
```

设定目标类型为 upper（转为大写）。

返回：`self` —— $this

### number()

```php
public function number(): self
```

设定目标类型为 number（提取数字字符，保留 0-9、.、-）。

返回：`self` —— $this

### json()

```php
public function json(): self
```

设定目标类型为 json（数组/对象 → JSON 字符串）。

返回：`self` —— $this

### json_decode()

```php
public function json_decode(): self
```

设定目标类型为 json_decode（JSON 字符串 → 关联数组）。

返回：`self` —— $this

### abs()

```php
public function abs(): self
```

设定目标类型为 abs（取绝对值）。

返回：`self` —— $this

### strip_tags()

```php
public function strip_tags(): self
```

设定目标类型为 strip_tags（去除 HTML/PHP 标签）。

返回：`self` —— $this

### implode()

```php
public function implode(): self
```

设定目标类型为 implode（数组拼接为字符串，默认逗号分隔）。

返回：`self` —— $this

### pluck()

```php
public function pluck(): self
```

设定目标类型为 pluck（提取数组列表中指定键的值）。

返回：`self` —— $this

### urlencode()

```php
public function urlencode(): self
```

设定目标类型为 urlencode（URL 编码）。

返回：`self` —— $this

### urldecode()

```php
public function urldecode(): self
```

设定目标类型为 urldecode（URL 解码）。

返回：`self` —— $this

### htmlspecialchars()

```php
public function htmlspecialchars(): self
```

设定目标类型为 htmlspecialchars（HTML 实体转义）。

返回：`self` —— $this

### round()

```php
public function round(): self
```

设定目标类型为 round（四舍五入）。

返回：`self` —— $this

### number_format()

```php
public function number_format(): self
```

设定目标类型为 number_format（千分位格式化）。

返回：`self` —— $this

### base64()

```php
public function base64(): self
```

设定目标类型为 base64（Base64 编码）。

返回：`self` —— $this

### base64_decode()

```php
public function base64_decode(): self
```

设定目标类型为 base64_decode（Base64 解码）。

返回：`self` —— $this

### truncate()

```php
public function truncate(): self
```

设定目标类型为 truncate（截断字符串）。

返回：`self` —— $this

### convert()

```php
public function convert($types = null)
```

执行数据转换，返回转换后的数据。

类型规则支持以下形式：
| 规则形式 | 示例 | 说明 |
|---------|------|------|
| 字符串类型 | "int" | 整份数据转为该类型 |
| 管道链式(字符串) | "string\|int\|mask:3" | 用 \| 分隔多步类型，按序串行处理 |
| 管道链式(数组) | ["string","int","mask:3"] | 等效于字符串管道形式 |
| 时间戳 | "timestamp" | 将日期字符串/DateTime 转为 Unix 秒级时间戳 |
| 毫秒时间戳 | "timestamp_m" | 将日期字符串/DateTime 转为 Unix 毫秒级时间戳 |
| 日期 | "date" | 将 DateTime/时间戳/日期字符串 转为日期字符串（Y-m-d） |
| 日期时间 | "datetime" | 将 DateTime/时间戳/日期字符串 转为日期时间字符串（Y-m-d H:i:s） |
| 自定义格式 | "date:Y年m月d日" | date/datetime 支持 :format 后缀自定义输出格式 |
| 密文遮盖 | "mask" | 字符串中间部分替换为 *，默认遮盖 80% |
| 指定遮盖位数 | "mask:4" | 精确遮盖 4 位，如 13288364266 → 132****4266 |
| 去除空白 | "trim" | 去除首尾空白字符 |
| 转小写 | "lower" | 转为小写 |
| 转大写 | "upper" | 转为大写 |
| 提取数字 | "number" | 提取数值字符（保留 0-9 . -），如 "¥99.99元" → "99.99" |
| 去除标签 | "strip_tags" | 去除 HTML/PHP 标签；strip_tags:a,b 保留指定标签 |
| HTML 转义 | "htmlspecialchars" | HTML 实体转义（防 XSS） |
| JSON 编码 | "json" | 数组/对象 → JSON 字符串 |
| JSON 解码 | "json_decode" | JSON 字符串 → 关联数组 |
| 绝对值 | "abs" | 取绝对值 |
| 空值兜底 | "default:匿名" | null / '' 时使用指定默认值 |
| 四舍五入 | "round:2" | 保留指定小数位；round 默认 0 位 |
| 千分位 | "number_format" | 千分位格式化（默认 2 位小数）；number_format:0 无小数 |
| 数组提取 | "pluck:id" | 从数组列表中提取每项的指定键值 |
| 数组拼接 | "implode" | 数组拼接为字符串（默认逗号分隔）；implode:\| 指定分隔符 |
| URL 编码 | "urlencode" | URL 编码 |
| URL 解码 | "urldecode" | URL 解码 |
| Base64 编码 | "base64" | Base64 编码 |
| Base64 解码 | "base64_decode" | Base64 解码 |
| 字符串截断 | "truncate:100" | 截断到指定字符数，超出加 "..."；truncate:50:→ 自定义后缀 |
| 分隔符语法 | "int/," | 按分隔符拆分字符串后逐元素转换 |
| array<> 语法 | "array＜int＞" | 索引数组逐元素指定类型 |
| 关联数组 | ["name" => "string"] | 逐键映射；键支持点号路径和通配符 |
| 数值键保留 | ["username","profile"] | 保留字段但不做类型转换，原样透传 |
| 展开标记 | ["...", "name" => "string"] | 保留所有原始字段，仅对显式定义做转换；可排除字段（"...\|password,secret"） |
| Mutator 实例 | new Mutator("int") | 通过管道处理（索引数组自动遍历） |
| callable | fn($v) => intval($v) | 自定义转换函数 |

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$types` | `array|string|null` | `null` | 转换规则。传入 null 则使用构造时或 fluent 方法设定的规则。 |

## 非公开方法

**private**

- `private function convertByStringType(string $type)` —— 将整份数据按照单一字符串类型转换。
- `private function convertIndexedData(array $types): array` —— 对索引数据的每个元素递归应用同一套规则。
- `private function convertAssocData(array $types): array` —— 处理关联数组规则。
- `private function applyFlatRule(array &$result, $key, $type)` —— 应用一条扁平规则到结果数组。
- `private function applyMutatorRule(array &$result, string $key, self $mutator)` —— 将 Mutator 实例规则应用到结果数组的指定键。
- `private function applyDotRule(array &$result, string $ruleKey, $type)` —— 应用一条点号语法规则。
- `private function applyWildcardRule(array &$result, array $path, int $wildcardIndex, $type)` —— 应用含通配符 "*" 的点号规则。
- `private function convertValue($value, $type)` —— 将单个值按字符串类型规则转换。
- `private function getPipelineSteps($type)` —— 判断 $type 是否为管道类型，若是则返回步骤数组，否则返回 null。
- `private function applyPipelineSteps($value, array $steps)` —— 按步骤数组将值串行转换。
- `private function convertIndexedValue(array $value, string $type): array` —— 转换索引数组的每个元素。
- `private function convertWithSeparator($value, string $type): array` —— 按分隔符拆分字符串后逐元素转换。
- `private function auto($target)` —— 自动识别值类型并转换。
- `private function setType($target, string $type)` —— 将值强制转换为指定类型。
- `private function toTimestamp($target): int` —— 将值转为 Unix 时间戳（秒）。
- `private function toTimestampMs($target): int` —— 将值转为 Unix 时间戳（毫秒）。
- `private function toDate($target, string $type = 'date'): string` —— 将值转为日期字符串（默认 Y-m-d）。
- `private function toDatetime($target, string $type = 'datetime'): string` —— 将值转为日期时间字符串（默认 Y-m-d H:i:s）。
- `private function formatDateValue($target, string $format): string` —— 将任意值按指定格式转为日期字符串（底层实现）。
- `private function toMask($target, string $type = 'mask'): string` —— 将值转为密文字符串（中间遮盖为 *）。
- `private function applyTrim($target): string` —— 去除首尾空白字符。
- `private function applyCase($target, string $mode): string` —— 大小写转换（lower / upper 共用）。
- `private function applyNumber($target): string` —— 提取数值字符（保留 0-9、.、-）。
- `private function applyJsonEncode($target): string` —— 数组/对象 → JSON 字符串。
- `private function applyJsonDecode($target)` —— JSON 字符串 → 关联数组。
- `private function applyAbs($target)` —— 取绝对值。
- `private function applyUrlEncode($target): string` —— URL 编码。
- `private function applyUrlDecode($target): string` —— URL 解码。
- `private function applyHtmlspecialchars($target): string` —— HTML 实体转义（防 XSS）。
- `private function applyBase64Encode($target): string` —— Base64 编码。
- `private function applyBase64Decode($target)` —— Base64 解码。
- `private function applyDefault($target, string $type)` —— 空值兜底：null / '' 时使用默认值，其他情况原样返回。
- `private function applyStripTags($target, string $type): string` —— 去除 HTML/PHP 标签，可选保留指定标签。
- `private function applyImplode($target, string $type): string` —— 数组拼接为字符串。
- `private function applyPluck($target, string $type): array` —— 从数组列表中提取指定键的值。
- `private function applyRound($target, string $type): float` —— 四舍五入到指定小数位。
- `private function applyNumberFormat($target, string $type): string` —— 千分位数字格式化。
- `private function applyTruncate($target, string $type): string` —— 字符串截断，超出长度追加后缀。
- `private function parseFormattedType(string $type): array` —— 解析带参数的格式化类型名。
- `private function parsePath(string $key): array` —— 将点号语法键解析为路径数组。
- `private function getNestedValue($data, array $path)` —— 从嵌套数组中按路径读取值。
- `private function setNestedValue(array &$array, array $path, $value)` —— 按路径向嵌套数组写入值。
- `private function resolveConvert($value, $type)` —— 统一分发不同类型的转换规则。
- `private function createChild($types): self` —— 创建子 Mutator 实例。

## 同目录

- [Arr](/php/api/foundation/data/arr)
- [Date](/php/api/foundation/data/date)
- [Func](/php/api/foundation/data/func)
- [Money](/php/api/foundation/data/money)
- [Numeric](/php/api/foundation/data/numeric)
- [Serializer](/php/api/foundation/data/serializer)
- [Str](/php/api/foundation/data/str)
- [Transform](/php/api/foundation/data/transform)

