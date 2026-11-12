# Validator

`kernel\Foundation\Validation\Validator`  ·  class

源码：`gstudio_kernel/Foundation/Validation/Validator.php`

## 声明

```php
class Validator
```

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$rule` | `array` | protected | 从校验规则类实例取到的校验规则 |
| `$data` | `mixed` | protected | 要校验的数据 |
| `$fullData` | `mixed` | protected | 全数据，有可能被校验的数据是数组里的某个元素，而这个变量用来存储被校验数据所属的数组 |
| `$errorMessages` | `array` | protected | 从校验规则类实例取到的校验错误信息 |
| `$validateRule` | `Rule` | protected | 校验规则类实例 |
| `$fieldName` | `string|null` | protected | 当前校验的字段名（Rules 关联数组场景下由外部设置） |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 构建校验器 |
| [`ReturnParamError()`](#returnparamerror) | 返回参数错误 |
| [`data()`](#data) | 设置要校验的数据 |
| [`fullData()`](#fulldata) | 设置被校验的数据所属的数据集 |
| [`getErrorMessage()`](#geterrormessage) | 获取校验失败错误信息 |
| [`setFieldName()`](#setfieldname) | 设置当前校验的字段名（供 Rules 关联数组场景使用） |
| [`validate()`](#validate) | 校验 |

### __construct()

```php
public function __construct(Rule $validateRule, $data = null, $fullData = null)
```

构建校验器

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$validateRule` | `Rule` | — | 校验规则实例 |
| `$data` | `mixed` | `null` | 要校验的数据 |
| `$fullData` | `mixed` | `null` | — |

### ReturnParamError()

```php
public function ReturnParamError()
```

返回参数错误

### data()

```php
public function data($data)
```

设置要校验的数据

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `mixed` | — | 被校验的数据 |

### fullData()

```php
public function fullData($data)
```

设置被校验的数据所属的数据集

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$data` | `mixed` | — | 数据集 |

### getErrorMessage()

```php
public function getErrorMessage($key)
```

获取校验失败错误信息

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$key` | `string` | — | 错误信息键 |

### setFieldName()

```php
public function setFieldName($name)
```

设置当前校验的字段名（供 Rules 关联数组场景使用）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string` | — | 字段名称 |

### validate()

```php
public function validate()
```

校验

在校验开始前处理条件规则（sometimes），随后执行 check。

## 非公开方法

**protected**

- `protected function applyConditionalRules(Rules $rules, $data)` —— 应用条件规则（sometimes）
- `protected function validateWildcardField($data, $fieldName, Rule $fieldRule, $parentData)` —— 通过通配符展开，将 photos.*.url → 逐一校验每个元素的 url 字段
- `protected function check($target, $rule, $validateRule = null, $data = null)` —— 校验规则

**private**

- `private function getTargetLength($target)` —— 获取目标值的长度（字符串取字符数，数组取元素个数）

## 同目录

- [Rule](/php/api/foundation/validation/rule)
- [RuleBuilder](/php/api/foundation/validation/rule-builder)
- [RuleInterface](/php/api/foundation/validation/rule-interface)
- [Rules](/php/api/foundation/validation/rules)

