# Rule

`kernel\Foundation\Validation\Rule`  ·  class

源码：`gstudio_kernel/Foundation/Validation/Rule.php`

> 校验规则门面类

## 声明

```php
class Rule
```

## 概述

提供流式 API 定义数据校验规则，支持静态调用和实例调用两种方式。

所有规则定义方法委托给 `RuleBuilder` 执行，
通过 `__call` 和 `__callStatic` 实现链式委托。
规则状态（Rule、ErrorMessages 等）通过 `__get` / `__set` 透明代理到构建器。

基本用法：
```php
// 静态入口
$rules = Rule::required('必填')->type('string')->length(1, 100);

// 实例入口
$rules = (new Rule())->required('必填')->in(['a', 'b']);
```

## 示例

```php
// 静态入口
$rules = Rule::required('必填')->type('string')->length(1, 100);

// 实例入口
$rules = (new Rule())->required('必填')->in(['a', 'b']);
```

## 相关

- `RuleBuilder`
- `RuleInterface`

## 转发方法

门面通过 `__callStatic` 转发到实例，以下为可用的静态方法：

| 签名 | 说明 |
|---|---|
| `required(string $message = "")` | 校验值是否为空或为 null |
| `sometimes()` | 存在性闸门：字段键不存在时跳过整条规则（可选但传了才校验） |
| `type(string|array $value, string $message = "")` | 校验数据类型，支持 int/string/bool/array 等，int 和 bool 会自动转为 integer 和 boolean |
| `equal(mixed $value, string $message = "")` | 校验值是否等于指定值（严格比较 ===） |
| `includes(string|array $value, string $message = "")` | 校验字符串是否包含子串，或数组是否包含指定元素 |
| `hasKeys(string|array $value, string $message = "")` | 校验数组是否存在指定键名 |
| `min(int $value, string $message = "")` | 校验数值是否 >= 指定值 |
| `max(int $value, string $message = "")` | 校验数值是否 <= 指定值 |
| `range(int $min, int $max, string $message = "")` | 校验数值是否在 [min, max] 范围内 |
| `minLength(int $value, string $message = "")` | 校验字符串/数组长度是否 >= 指定值 |
| `maxLength(int $value, string $message = "")` | 校验字符串/数组长度是否 <= 指定值 |
| `length(int $min, int $max, string $message = "")` | 校验字符串/数组长度是否在 [min, max] 范围内 |
| `pattern(string $pattern, string $message = "")` | 正则表达式校验 |
| `custom(\Closure|callable $callback)` | 自定义校验，回调签名 function(mixed $value, array $rule, mixed $data): \kernel\Foundation\HTTP\Response |
| `exists(\kernel\Foundation\Database\RDB\Model $model, string $message = "", string|\Closure|callable|null $fieldOrCallback = null, \Closure|callable|null $callback = null)` | 校验记录是否存在于指定模型，默认按主键查询；第三参为字符串=字段名、闭包=拓展回调，第四参仅在第三参为字段名时传入 |
| `useRule(RuleInterface $validateRule)` | 复用已有的校验规则实例 |
| `email(string $message = "")` | 校验值是否为有效的邮箱地址 |
| `url(string $message = "")` | 校验值是否为有效的 URL 地址 |
| `ip(string $message = "")` | 校验值是否为有效的 IP 地址（支持 IPv4 和 IPv6） |
| `date(string $message = "")` | 校验值是否为有效的日期字符串 |
| `dateFormat(string $format, string $message = "")` | 校验值是否符合指定的日期格式 |
| `in(array|string ...$values)` | 校验值是否在给定的值列表中，支持 in(['a','b'], 'msg') 或 in('a','b','c') |
| `notIn(array|string ...$values)` | 校验值是否不在给定的值列表中 |
| `confirmed(string $message = "")` | 校验值是否与 字段名_confirmation 一致 |
| `same(string $field, string $message = "")` | 校验值是否与另一个字段的值相同 |
| `different(string $field, string $message = "")` | 校验值是否与另一个字段的值不同 |
| `nullable(string $message = "")` | 允许值为 null，值为 null 时跳过所有校验 |
| `present(string $message = "")` | 允许值为空字符串，值为空字符串时跳过所有校验 |
| `prohibited(string $message = "")` | 校验字段不能存在于输入数据中 |
| `requiredIf(string $anotherField, array|string $values, string $message = "")` | 当另一字段等于指定值时必填 |
| `requiredUnless(string $anotherField, array|string $values, string $message = "")` | 除非另一字段等于指定值，否则必填 |
| `required(string $message = "")` | [静态] 校验值是否为空或为 null |
| `type(string|array $value, string $message = "")` | [静态] 校验数据类型 |
| `equal(mixed $value, string $message = "")` | [静态] 校验是否等于指定值 |
| `includes(string|array $value, string $message = "")` | [静态] 校验是否包含指定值 |
| `hasKeys(string|array $value, string $message = "")` | [静态] 校验数组是否存在指定键 |
| `min(int $value, string $message = "")` | [静态] 校验数值是否 >= 指定值 |
| `max(int $value, string $message = "")` | [静态] 校验数值是否 <= 指定值 |
| `range(int $min, int $max, string $message = "")` | [静态] 校验数值是否在指定范围内 |
| `minLength(int $value, string $message = "")` | [静态] 校验字符串/数组长度 >= 指定值 |
| `maxLength(int $value, string $message = "")` | [静态] 校验字符串/数组长度 <= 指定值 |
| `length(int $min, int $max, string $message = "")` | [静态] 校验字符串/数组长度在 [min, max] 范围内 |
| `pattern(string $pattern, string $message = "")` | [静态] 正则表达式校验 |
| `custom(\Closure|callable $callback)` | [静态] 自定义校验 |
| `exists(\kernel\Foundation\Database\RDB\Model $model, string $message = "", string|\Closure|callable|null $fieldOrCallback = null, \Closure|callable|null $callback = null)` | [静态] 校验记录是否存在于指定模型，默认按主键查询 |
| `useRule(RuleInterface $validateRule)` | [静态] 复用已有的校验规则实例 |
| `email(string $message = "")` | [静态] 校验值是否为有效的邮箱地址 |
| `url(string $message = "")` | [静态] 校验值是否为有效的 URL 地址 |
| `ip(string $message = "")` | [静态] 校验值是否为有效的 IP 地址 |
| `date(string $message = "")` | [静态] 校验值是否为有效的日期字符串 |
| `dateFormat(string $format, string $message = "")` | [静态] 校验值是否符合指定的日期格式 |
| `in(array|string ...$values)` | [静态] 校验值是否在给定的值列表中 |
| `notIn(array|string ...$values)` | [静态] 校验值是否不在给定的值列表中 |
| `confirmed(string $message = "")` | [静态] 校验值是否与 字段名_confirmation 一致 |
| `same(string $field, string $message = "")` | [静态] 校验值是否与另一个字段的值相同 |
| `different(string $field, string $message = "")` | [静态] 校验值是否与另一个字段的值不同 |
| `nullable(string $message = "")` | [静态] 允许值为 null，值为 null 时跳过所有校验 |
| `present(string $message = "")` | [静态] 允许值为空字符串，值为空字符串时跳过所有校验 |
| `prohibited(string $message = "")` | [静态] 校验字段不能存在于输入数据中 |
| `requiredIf(string $anotherField, array|string $values, string $message = "")` | [静态] 当另一字段等于指定值时必填 |
| `requiredUnless(string $anotherField, array|string $values, string $message = "")` | [静态] 除非另一字段等于指定值，否则必填 |

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$builder` | `RuleBuilder` | protected | 规则构建器实例，承载全部规则定义方法 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__get()`](#__get) | 属性读取代理 |
| [`__set()`](#__set) | 属性写入代理 |
| [`__isset()`](#__isset) | 属性存在性检查代理 |
| [`__callStatic()`](#__callstatic) | 静态方法委托 — 支持 Rule::required() 等静态链式调用 |
| [`__call()`](#__call) | 实例方法委托 — 将任意方法调用转发给 `RuleBuilder` 执行 |

### __get()

```php
public function __get($name)
```

属性读取代理

将属性读取透明转发到内部 `RuleBuilder` 实例，
外部可通过 $rules->rule、$rules->errorMessages 等方式访问构建器状态。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string` | — | 属性名 |

### __set()

```php
public function __set($name, $value)
```

属性写入代理

将属性写入透明转发到内部 `RuleBuilder` 实例。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string` | — | 属性名 |
| `$value` | `mixed` | — | 属性值 |

### __isset()

```php
public function __isset($name)
```

属性存在性检查代理

检查属性是否存在于内部构建器上。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string` | — | 属性名 |

### __callStatic()

```php
public static function __callStatic($name, $arguments)
```

静态方法委托 — 支持 Rule::required() 等静态链式调用

创建当前类实例后委托给 `__call` 执行，从而复用同一条委托链路。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string` | — | 方法名 |
| `$arguments` | `array` | — | 方法参数 |

### __call()

```php
public function __call($name, $arguments)
```

实例方法委托 — 将任意方法调用转发给 `RuleBuilder` 执行

构建器的链式方法返回自身时，替换为当前 Rule 实例，
确保调用者始终拿到 Rule 而非内部构建器。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string` | — | 方法名 |
| `$arguments` | `array` | — | 方法参数 |

## 非公开方法

**protected**

- `protected function builder()` —— 获取构建器实例（延迟初始化）

## 同目录

- [RuleBuilder](/php/api/foundation/validation/rule-builder)
- [RuleInterface](/php/api/foundation/validation/rule-interface)
- [Rules](/php/api/foundation/validation/rules)
- [Validator](/php/api/foundation/validation/validator)

