# 对象基类

`kernel\Foundation\Object` 下是框架的对象基础设施：`BaseObject`（单例 + 应用归属）、`AbilityBaseObject`（错误状态机）、`DataObject` / `ReadonlyDataObject`（数据容器）。

## BaseObject —— 单例 + 归属

```php
use kernel\Foundation\Object\BaseObject;

class Service extends BaseObject {}

Service::singleton();      // 每类单例（按 get_called_class 分类）
Service::make();           // 每类工厂（每次 new）
Service::hasSingleton();
Service::clearSingleton();

$service->app();           // 所属 App（构造注入优先，否则默认应用）
```

- 单例只认类型不认参数，禁止 clone / 反序列化；
- `app()` 是「归属绑定」核心：模型、Repository 这类要按归属算表名 / 路径的类靠它；
- `bindApp()` 由容器在构造后调用，补归属（对象已有归属时不会过户）。

## AbilityBaseObject —— 错误状态机

`Controller` 继承它，所以控制器有 `break() / return() / isError()` 等能力：

```php
class SomeService extends AbilityBaseObject
{
  public function run()
  {
    if ($fail) {
      return $this->break(400, "400:BadInput", "参数错误");   // 记录错误并返回 false
    }
    return $this->return();   // 打包为 Result（无错则成功态）
  }
}

$result = $service->run();
if ($result->error) {
  $result->errorMessage();
  $result->errorCode();
  $result->statusCode();
}
```

| 方法 | 用途 |
|---|---|
| `break(...)` | 记录错误并 `return false` |
| `return()` | 打包为 `Result` |
| `isError() / getError()` | 判断 / 取错误 |
| `getErrorMessage() / getErrorCode() / getStatusCode()` | 错误细节 |
| `resetError()` | 清空错误态 |

> 约定见 [异常与错误](/php/ops/errors)：成功返回数据，失败返回 `false` + `break()` 置错，`Result` 用于对外输出。

## DataObject —— 可变数据容器

```php
use kernel\Foundation\Object\DataObject;

$obj = new DataObject(["name" => "Alice", "age" => 18]);
$obj->name;                       // "Alice"
$obj->set("age", 20)->set(["city" => "SZ"]);
$obj->has("name");
$obj->get("name", "默认");
$obj->toArray();                  // ['name'=>'Alice','age'=>20,'city'=>'SZ']
$obj->toJson();                   // JSON 字符串
```

- 继承 `stdClass`，可用属性语法读写；
- `assign($data)` 只更新已有属性。

## ReadonlyDataObject —— 只读变体

```php
use kernel\Foundation\Object\ReadonlyDataObject;

$ro = new ReadonlyDataObject(["id" => 1]);
$ro->id;            // 可读
$ro->id = 2;        // 抛 Error：只允许实例化时设置
```

适合封装配置、查询结果行、外部 API 响应，跨组件传递时防止被误改。
