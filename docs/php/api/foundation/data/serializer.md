# Serializer

`kernel\Foundation\Data\Serializer`  ·  class

源码：`gstudio_kernel/Foundation/Data/Serializer.php`

## 声明

```php
class Serializer
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$useRuleName` | `string` | `null` | 要调用的规则名称 |

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$Rules` | `array` | private | 全局序列化规则 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 构建序列化实例 如果是实例化，那么就仅仅是要调用哪个已经存在的规则 |
| [`get()`](#get) | 获取序列化规则 |
| [`add()`](#add) | 添加规则 |
| [`serialization()`](#serialization) | 序列化 |
| [`load()`](#load) | 加载序列化文件。该文件会 return 一个数组，数组就是序列化规则 |
| [`loadGet()`](#loadget) | 加载序列化规则并且获取规则。该方法是 load 和 get 的合体 |

### __construct()

```php
public function __construct($RuleName)
```

构建序列化实例 如果是实例化，那么就仅仅是要调用哪个已经存在的规则

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$RuleName` | `string` | — | 要调用的规则名称 |

### get()

```php
public static function get($Names, $upperLevel = null)
```

获取序列化规则

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$Names` | `string|string[]` | — | 规则名称，如果传入的是字符串，可用“ . ”分隔层级，例如user.age，那就是获取user下的age规则。如果传入的字符串数组，那么就是获取多层级下的规则，跟用" . "分隔一样，例如传入[article,title]，就是获取article下的title规则 |
| `$upperLevel` | `array` | `null` | 上一层级的序列化规则，这是当前函数递归调用时使用到，无需传入 |

### add()

```php
public static function add($Name, $Rule)
```

添加规则

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$Name` | `string` | — | 第一级规则名称 |
| `$Rule` | `array` | — | 序列化规则数组 |

### serialization()

```php
public static function serialization($RuleOrName, $Data, $SerializerName = "temp")
```

序列化

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$RuleOrName` | `string|array` | — | 序列化规则或者要调用的序列化规则名称 |
| `$Data` | `array` | — | 被序列化的数据 |
| `$SerializerName` | `string` | `"temp"` | 序列化名称，会往被序列化的数组添加_serlizer键，值就是当前传入的值，默认是temp |

### load()

```php
public static function load($FileName, $ruleName = null, $BasePath = null)
```

加载序列化文件。该文件会 return 一个数组，数组就是序列化规则

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$FileName` | `string` | — | 文件名 |
| `$ruleName` | `string` | `null` | 规则名称，如果不传入该值，就会把文件名称作为规则名称 |
| `$BasePath` | `string` | `null` | 基路径 |

### loadGet()

```php
public static function loadGet($FileName, $ruleName = null, $Names = null, $upperLevel = null, $BasePath = null)
```

加载序列化规则并且获取规则。该方法是 load 和 get 的合体

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$FileName` | `string` | — | 文件名 |
| `$ruleName` | `string` | `null` | 规则名称，如果不传入该值，就会把文件名称作为规则名称 |
| `$Names` | `string|string[]` | `null` | $Names 规则名称，如果传入的是字符串，可用“ . ”分隔层级，例如user.age，那就是获取user下的age规则。如果传入的字符串数组，那么就是获取多层级下的规则，跟用" . "分隔一样，例如传入[article,title]，就是获取article下的title规则 |
| `$upperLevel` | `array` | `null` | 上一层级的序列化规则，这是当前函数递归调用时使用到，无需传入 |
| `$BasePath` | `string` | `null` | 基路径 |

## 同目录

- [Arr](/php/api/foundation/data/arr)
- [Date](/php/api/foundation/data/date)
- [Func](/php/api/foundation/data/func)
- [Money](/php/api/foundation/data/money)
- [Mutator](/php/api/foundation/data/mutator)
- [Numeric](/php/api/foundation/data/numeric)
- [Str](/php/api/foundation/data/str)
- [Transform](/php/api/foundation/data/transform)

