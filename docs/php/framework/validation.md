# 验证

验证由 `kernel\Foundation\Validation` 提供，三件套：`Rule`（单条规则）、`Rules`（字段规则集合）、`Validator`（跑校验）。

## 写规则

`Rule` 是门面，链式声明，支持实例化与静态调用两种写法：

```php
use kernel\Foundation\Validation\Rule;

$rule = Rule::required("姓名必填")->type("string")->length(1, 50);
```

常用规则：

| 规则 | 说明 |
|---|---|
| `required($msg)` | 必填 |
| `nullable` / `present` / `prohibited` | 可空 / 必须存在 / 禁止 |
| `type($type)` | 类型：string/int/integer/array/… |
| `min() / max() / range($min,$max)` | 数值范围 |
| `minLength() / maxLength() / length($min,$max)` | 长度 |
| `pattern() / email / url / ip / date / dateFormat()` | 格式 |
| `in($values) / notIn($values)` | 枚举 |
| `confirmed / same($field) / different($field)` | 字段比较 |
| `requiredIf($field,$values) / requiredUnless(...)` | 条件必填 |
| `custom($callback)` | 自定义 |
| `exists($model, ...)` | 数据库记录存在性 |

## 字段级校验

```php
use kernel\Foundation\Validation\Rules;
use kernel\Foundation\Validation\Validator;

$rules = new Rules([
  "name" => Rule::required("姓名必填")->type("string")->length(1, 50),
  "age"  => Rule::required("年龄必填")->type("integer")->range(0, 150),
]);

$validator = new Validator($rules, $input);
$result = $validator->validate();

if ($result->error) {
  $message = $result->errorMessage();
}
```

`Rules` 也支持 `sometimes($field, $rule, $callback)` 做条件校验。

## 与控制器配合

控制器子类声明校验规则，`before()` 自动拦截并短路：

```php
protected $requestQueryValidator = [
  "id" => Rule::required("缺 id")->type("integer"),
];

protected $requestBodyValidator = [
  "name" => Rule::required("姓名必填")->length(1, 50),
];
```

校验失败会生成 `400` + 业务码 `400:ValidateFailed:ParamError`，调用方按 `$result->error` / `$result->errorMessage()` 消费。

## 错误处理

- `Validator::getErrorMessage($key)` 取指定字段错误；
- `Validator::ReturnParamError()` 直接生成参数错误 `Result`；
- `exists` 规则依赖 `RDB\Model`，用 `scopedQuery()->where(...)->exists()` 判断。
