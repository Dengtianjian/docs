# Rules

`kernel\Foundation\Validation\Rules`  ·  class

源码：`gstudio_kernel/Foundation/Validation/Rules.php`

> 关联数组校验规则

## 声明

```php
class Rules extends Rule
```

父类：`Rule`

## 概述

用于定义关联数组中每个字段的校验规则，每个字段对应一个 `Rule` 实例。
继承自 `Rule`，因此同样支持流式链式调用定义自身级别的规则。

基本用法：
```php
$rules = new Rules([
'name' => Rule::required('姓名必填')->type('string')->length(1, 50),
'age'  => Rule::required('年龄必填')->type('integer')->range(0, 150),
]);
```

## 示例

```php
$rules = new Rules([
'name' => Rule::required('姓名必填')->type('string')->length(1, 50),
'age'  => Rule::required('年龄必填')->type('integer')->range(0, 150),
]);
```

## 相关

- `Rule`
- `Validator`

## 转发方法

门面通过 `__callStatic` 转发到实例，以下为可用的静态方法：

| 签名 | 说明 |
|---|---|
| `required(string $message = "")` | 校验值是否为空或为 null |
| `type(string|array $value, string $message = "")` | 校验数据类型 |
| `equal(mixed $value, string $message = "")` | 校验是否等于指定值 |
| `includes(string|array $value, string $message = "")` | 校验是否包含指定值 |
| `hasKeys(string|array $value, string $message = "")` | 校验数组是否存在指定键 |
| `min(int $value, string $message = "")` | 校验数值是否 >= 指定值 |
| `max(int $value, string $message = "")` | 校验数值是否 <= 指定值 |
| `range(int $min, int $max, string $message = "")` | 校验数值是否在指定范围内 |
| `minLength(int $value, string $message = "")` | 校验字符串/数组长度 >= 指定值 |
| `maxLength(int $value, string $message = "")` | 校验字符串/数组长度 <= 指定值 |
| `length(int $min, int $max, string $message = "")` | 校验字符串/数组长度在 [min, max] 范围内 |
| `pattern(string $pattern, string $message = "")` | 正则表达式校验 |
| `email(string $message = "")` | 校验值是否为有效的邮箱地址 |
| `url(string $message = "")` | 校验值是否为有效的 URL 地址 |
| `ip(string $message = "")` | 校验值是否为有效的 IP 地址 |
| `date(string $message = "")` | 校验值是否为有效的日期字符串 |
| `dateFormat(string $format, string $message = "")` | 校验值是否符合指定的日期格式 |
| `in(array|string ...$values)` | 校验值是否在给定的值列表中 |
| `notIn(array|string ...$values)` | 校验值是否不在给定的值列表中 |
| `confirmed(string $message = "")` | 校验值是否与 字段名_confirmation 一致 |
| `same(string $field, string $message = "")` | 校验值是否与另一个字段的值相同 |
| `different(string $field, string $message = "")` | 校验值是否与另一个字段的值不同 |
| `nullable(string $message = "")` | 允许值为 null |
| `present(string $message = "")` | 允许值为空字符串 |
| `prohibited(string $message = "")` | 校验字段不能存在于输入数据中 |
| `requiredIf(string $anotherField, array|string $values, string $message = "")` | 当另一字段等于指定值时必填 |
| `requiredUnless(string $anotherField, array|string $values, string $message = "")` | 除非另一字段等于指定值否则必填 |
| `custom(\Closure|callable $callback)` | 自定义校验 |
| `exists(\kernel\Foundation\Database\RDB\Model $model, string $message = "", string|\Closure|callable|null $fieldOrCallback = null, \Closure|callable|null $callback = null)` | 校验记录是否存在于指定模型，默认按主键查询 |
| `useRule(RuleInterface $validateRule)` | 复用已有的校验规则实例 |

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$fieldRules` | `array` | private | 字段规则映射，结构为 [字段名 => Rule 实例] |
| `$conditionalRules` | `array` | private | 条件规则（Laravel 风格 sometimes），仅当回调返回 true 时才参与校验 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 构建关联数组校验规则实例 |
| [`has()`](#has) | 检查是否存在指定字段的校验规则 |
| [`get()`](#get) | 获取指定字段的校验规则 |
| [`all()`](#all) | 获取全部字段校验规则 |
| [`sometimes()`](#sometimes) | 条件规则（Laravel 风格 sometimes） |
| [`getConditionalRules()`](#getconditionalrules) | 获取所有条件规则 |
| [`addRule()`](#addrule) | 动态添加字段规则（供 Validator 在合并条件规则时使用） |
| [`hasWildcard()`](#haswildcard) | 判断是否有字段名包含通配符 * |
| [`wildcardRules()`](#wildcardrules) | 获取包含通配符的字段规则集合 |

### __construct()

```php
public function __construct($fieldRules = null)
```

构建关联数组校验规则实例

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$fieldRules` | `mixed` | `null` | — |

可能抛出：

- `Exception` 当传入非关联数组或规则值不是 Rule 实例时抛出

### has()

```php
public function has($key)
```

检查是否存在指定字段的校验规则

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$key` | `string` | — | 字段名称 |

### get()

```php
public function get($key)
```

获取指定字段的校验规则

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$key` | `string` | — | 字段名称 |

### all()

```php
public function all()
```

获取全部字段校验规则

### sometimes()

```php
public function sometimes(string $attribute, Rule $rule, callable $callback)
```

条件规则（Laravel 风格 sometimes）

仅在回调返回 true 时才将该字段的规则加入校验。
回调签名为 function(array $data): bool，接收完整数据。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$attribute` | `string` | — | 字段名（支持点号语法） |
| `$rule` | `Rule` | — | 校验规则实例 |
| `$callback` | `callable` | — | 条件判断回调，返回 bool |

### getConditionalRules()

```php
public function getConditionalRules(): array
```

获取所有条件规则

返回：`array` —— array

### addRule()

```php
public function addRule(string $attribute, Rule $rule)
```

动态添加字段规则（供 Validator 在合并条件规则时使用）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$attribute` | `string` | — | 字段名 |
| `$rule` | `Rule` | — | 校验规则实例 |

### hasWildcard()

```php
public function hasWildcard(): bool
```

判断是否有字段名包含通配符 *

返回：`bool` —— bool

### wildcardRules()

```php
public function wildcardRules(): array
```

获取包含通配符的字段规则集合

返回：`array` —— array＜string, Rule＞

## 同目录

- [Rule](/php/api/foundation/validation/rule)
- [RuleBuilder](/php/api/foundation/validation/rule-builder)
- [RuleInterface](/php/api/foundation/validation/rule-interface)
- [Validator](/php/api/foundation/validation/validator)

