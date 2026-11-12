# Arr

`kernel\Foundation\Data\Arr`  ·  class

源码：`gstudio_kernel/Foundation/Data/Arr.php`

## 声明

```php
class Arr
```

## 方法一览

| 方法 | 说明 |
|---|---|
| [`isAssoc()`](#isassoc) | 判断不是关联数组 |
| [`indexToAssoc()`](#indextoassoc) | 索引数组转关联数组 |
| [`tree()`](#tree) | 分级 |
| [`merge()`](#merge) | 合并数组。支持多维数组合并 |
| [`stringToMultiLevelArray()`](#stringtomultilevelarray) | 分隔字符串转换成多级数组 |
| [`partial()`](#partial) | 从数组中抽取指定字段的值 |
| [`group()`](#group) | 根据指定的key分组 |
| [`toXML()`](#toxml) | 数组转换为XML字符串 |
| [`filterNullUnique()`](#filternullunique) | 过滤空值 并且 移除数组中重复的值 |
| [`has()`](#has) | 通过点号语法判断多维数组中是否存在指定的键 |
| [`get()`](#get) | 通过点号语法获取多维数组的值 |
| [`forget()`](#forget) | 通过点号语法移除多维数组中的键 |
| [`first()`](#first) | 取数组的第一个值 |
| [`last()`](#last) | 取数组的最后一个值 |
| [`firstKey()`](#firstkey) | 取数组的第一个键名 |
| [`lastKey()`](#lastkey) | 取数组的最后一个键名 |

### isAssoc()

```php
public static function isAssoc($array)
```

判断不是关联数组

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$array` | `array` | — | 原数组 |

### indexToAssoc()

```php
public static function indexToAssoc($array, $key)
```

索引数组转关联数组

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$array` | `array` | — | 原数组 索引数组 |
| `$key` | `string` | — | 键名 |

### tree()

```php
public static function tree($arr, $dataPrimaryKey, $relatedParentKey, $childArrayKeys = "childs")
```

分级

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$arr` | `array` | — | 原数组 |
| `$dataPrimaryKey` | `string` | — | 主键，也是父子都有的一个唯一值 |
| `$relatedParentKey` | `string` | — | 关联键名，用于关联父子 |
| `$childArrayKeys` | `string` | `"childs"` | = childs 子级保存在指定的键值下的数组名称 |

### merge()

```php
public static function merge(...$arrs)
```

合并数组。支持多维数组合并

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$arrs` | `...array` | — | 要合并的数组 |

### stringToMultiLevelArray()

```php
public static function stringToMultiLevelArray($string, $separator = "/")
```

分隔字符串转换成多级数组

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$string` | `string` | — | 字符串 |
| `$separator` | `string` | `"/"` | 用于分割字符串的字符。默认是 / |

### partial()

```php
public static function partial($target, $keys)
```

从数组中抽取指定字段的值

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$target` | `array` | — | 目标数组 |
| `$keys` | `array` | — | 要抽取的key值 |

### group()

```php
public static function group($target, $byKey)
```

根据指定的key分组

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$target` | `array` | — | 目标数组。需要时二维数组，每个二维数组里面都有一个共同的key |
| `$byKey` | `string` | — | 每个数组共同的key，就是根据这个key来分组 |

### toXML()

```php
public static function toXML($target, $root = true, $rootName = "xml", $contentWrap = true)
```

数组转换为XML字符串

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$target` | `array` | — | 目标数组 |
| `$root` | `boolean` | `true` | 是否需要根标签 |
| `$rootName` | `mixed` | `"xml"` | — |
| `$contentWrap` | `mixed` | `true` | — |

### filterNullUnique()

```php
public static function filterNullUnique($Target)
```

过滤空值 并且 移除数组中重复的值

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$Target` | `array` | — | 操作的数组 |

### has()

```php
public static function has($array, $key)
```

通过点号语法判断多维数组中是否存在指定的键

支持点号分隔的路径（如 user.profile.name）。
与 `get` 不同，本方法严格区分「键存在值为 null」和「键不存在」。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$array` | `array|\ArrayAccess` | — | 目标数组 |
| `$key` | `string|null` | — | 键名，支持点号语法 |

### get()

```php
public static function get($array, $key, $default = null)
```

通过点号语法获取多维数组的值

支持点号分隔的路径（如 user.profile.name）和通配符 *（如 photos.*.url）。
通配符匹配时返回平铺的结果数组。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$array` | `array|\ArrayAccess` | — | 目标数组 |
| `$key` | `string|null` | — | 键名，支持点号语法和 * 通配符 |
| `$default` | `mixed` | `null` | 键不存在时的默认值 |

### forget()

```php
public static function forget(&$array, $key)
```

通过点号语法移除多维数组中的键

支持点号分隔的路径（如 user.profile.name）。键不存在时静默忽略。
若 `$array` 为引用传递的对象（\ArrayAccess），直接对对象删除。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$array` | `array|\ArrayAccess` | — | 目标数组（对象传引用，数组需手动接收返回值） |
| `$key` | `string|null` | — | 键名，支持点号语法 |

### first()

```php
public static function first($array, $default = null)
```

取数组的第一个值

PHP 7.0 兼容替代「array_key_first()（PHP 7.3+）+ 取值」的写法，且不会移动数组内部指针。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$array` | `array` | — | 原数组 |
| `$default` | `mixed` | `null` | 空数组或非数组时返回的默认值 |

### last()

```php
public static function last($array, $default = null)
```

取数组的最后一个值

PHP 7.0 兼容替代「array_key_last()（PHP 7.3+）+ 取值」的写法。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$array` | `array` | — | 原数组 |
| `$default` | `mixed` | `null` | 空数组或非数组时返回的默认值 |

### firstKey()

```php
public static function firstKey($array, $default = null)
```

取数组的第一个键名

PHP 7.0 兼容替代 array_key_first()（PHP 7.3+）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$array` | `array` | — | 原数组 |
| `$default` | `mixed` | `null` | 空数组或非数组时返回的默认值 |

### lastKey()

```php
public static function lastKey($array, $default = null)
```

取数组的最后一个键名

PHP 7.0 兼容替代 array_key_last()（PHP 7.3+）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$array` | `array` | — | 原数组 |
| `$default` | `mixed` | `null` | 空数组或非数组时返回的默认值 |

## 非公开方法

**private**

- `private static function wildcardGet($array, $key, $default = null)` —— 通配符展开取值：将 photos.*.url 展开为数组中每个元素对应键的值
- `private static function wildcardWalk($data, $segments, $currentPath, &$results)` —— 递归遍历通配符路径

## 同目录

- [Date](/php/api/foundation/data/date)
- [Func](/php/api/foundation/data/func)
- [Money](/php/api/foundation/data/money)
- [Mutator](/php/api/foundation/data/mutator)
- [Numeric](/php/api/foundation/data/numeric)
- [Serializer](/php/api/foundation/data/serializer)
- [Str](/php/api/foundation/data/str)
- [Transform](/php/api/foundation/data/transform)

