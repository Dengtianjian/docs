# 数据工具

`kernel\Foundation\Data` 下是一组纯函数式的工具类，命名空间 `kernel\Foundation\Data`。这些工具不依赖应用上下文，随处可用。

## Arr —— 数组

```php
use kernel\Foundation\Data\Arr;

Arr::get($array, "user.name", "默认");      // 点号取值
Arr::has($array, "user.name");             // 判断存在
Arr::forget($array, "user.name");          // 点号删除（引用传参）
Arr::isAssoc($array);                      // 是否关联数组
Arr::merge($a, $b, $c);                    // 多维递归合并
Arr::group($list, "type");                 // 按字段分组
Arr::partial($row, ["id", "name"]);        // 只取指定键
Arr::tree($list, "id", "pid");             // 平铺转树
Arr::first($array);  Arr::last($array);    // 首/尾元素
Arr::firstKey($array); Arr::lastKey($array);
```

## Str —— 字符串

```php
use kernel\Foundation\Data\Str;

Str::contains($s, "foo");
Str::startsWith($s, "http");
Str::endsWith($s, ".png");
Str::random(8);                    // 随机串
Str::uuid();                       // UUID
Str::serialNo(32, "SO");           // 流水号
Str::limit($long, 20, "...");      // 截断
Str::mask("13288364266", "*", 3, 4);   // "132****4266"
Str::studly("foo_bar");  Str::camel("foo_bar");  Str::snake("FooBar");
Str::slug("你好 world");            // URL 友好
```

## Date —— 时间

```php
use kernel\Foundation\Data\Date;

Date::now();                       // "2026-11-12 10:00:00"
Date::today();                     // "2026-11-12"
Date::milliseconds();              // 毫秒时间戳
Date::format($ts, "Y-m-d H:i:s");
Date::parse("2026-11-12");
Date::diff($startMs);              // 距今毫秒差
Date::humanize($ms);               // 人性化时长
```

## Money —— 货币

```php
use kernel\Foundation\Data\Money;

Money::fenToYuan(123);             // 1.23
Money::yuanToFen(1.23);            // 123
Money::yuan(1.23);                 // "¥1.23"
Money::discount(100, 0.8);         // 打折
Money::tax(100, 0.06);             // 计税
Money::toChinese(1234.5);          // 中文大写
```

## Numeric —— 数值

```php
use kernel\Foundation\Data\Numeric;

Numeric::val("18");                // 18（null→0，数值字符串→int/float）
Numeric::isBetween($x, 1, 10);
Numeric::clamp($x, 0, 100);        // 夹取
Numeric::roundTo(1.234, 2);        // 1.23
Numeric::format(1234.5, 2);        // "1,234.50"
Numeric::percentage(3, 10, 2);     // 30.00
Numeric::bytesToHuman(1536);       // "1.50 KB"
```

## Mutator —— 类型转换 / 突变

```php
use kernel\Foundation\Data\Mutator;

(new Mutator)->data("123")->int()->convert();             // 123

(new Mutator(["name" => "string", "age" => "int"]))
  ->data(["name" => "admin", "age" => "18"])
  ->convert();                                             // ['name'=>'admin','age'=>18]

(new Mutator)->data("13288364266")->convert("string|mask:3");   // "132****4266"
```

可用类型：`string/int/array/object/double/bool/timestamp/date/datetime/mask/trim/lower/upper/number/json/abs/strip_tags/implode/default/round/base64/…`。

## Serializer / Transform / Func

```php
use kernel\Foundation\Data\Serializer;
Serializer::serialization($rule, $data);      // 按规则序列化

use kernel\Foundation\Data\Transform;
Transform::parse($raw);                        // 解析 _transform 参数

use kernel\Foundation\Data\Func;
Func::isSafeCallable($value, $whitelist);      // 安全的可调用判断
```

`Serializer` 与 `Transform` 主要被控制器内部用于响应序列化与 `_transform` 变换，业务里一般直接配 `$responseSerializes` / `$allowedTransformers` 即可。
