# 异常与错误

## 统一异常

框架里所有可预期的失败都抛 `kernel\Foundation\Exception\Error`：

```php
use kernel\Foundation\Exception\Error;

throw new Error("商品不存在", 404, "404:ProductNotFound");
```

构造签名：

```php
new Error($message = "Server error", $statusCode = 500, $errorCode = 500, $errorDetails = null);
```

| 参数 | 含义 |
|---|---|
| `$message` | 给用户看的文案 |
| `$statusCode` | HTTP 状态码 |
| `$errorCode` | 业务错误码（字符串或整数，推荐 `"<状态码>:<语义>"`） |
| `$errorDetails` | 附加信息（字段级错误、调试信息等） |

## 约定

- **错误码带语义**：`500:DuplicateEntry`、`500:UnresolvableDependency`、`404:ProductNotFound`——排查时一眼知道是哪一类问题；
- **不吞异常**：容器、装配、部署里的失败一律抛出，不做「静默降级」；
- **消息面向使用者**：技术细节放 `$errorDetails`。

## 什么时候抛

| 场景 | 例子 |
|---|---|
| 参数不合法 | `new Error("缺少参数 id", 400, "400:MissingParameter")` |
| 资源不存在 | `new Error("文件不存在", 404, "404:FileNotFound")` |
| 业务规则拒绝 | `new Error("余额不足", 400, "400:InsufficientBalance")` |
| 配置 / 装配错误 | 容器抛 `500:UnknownComponent` 等 |
| 依赖方未就绪 | `500:AppNotAssembled`、`500:UnresolvableDependency` |

## 输出

控制器里不必自己 try/catch：异常冒泡到框架，统一转成响应：

```json
{
  "code": 404,
  "message": "文件不存在",
  "details": []
}
```

- 开发模式（`Config::get("mode") === "development"`）会附上堆栈；
- 生产模式只输出 `message` 与 `errorCode`。

## 捕获

需要局部兜底时按类型捕获，别用 `\Exception` 一网打尽：

```php
try {
  Storage::get($key);
} catch (\kernel\Foundation\Exception\Error $e) {
  if ($e->getCode() === "404:FileNotFound") {
    return (new Response())->error(404, "404:FileNotFound", "文件不存在");
  }

  throw $e;      // 不认识的继续往上抛
}
```

## 容器与装配相关错误码

| 码 | 含义 |
|---|---|
| `500:UnknownComponent` | 名字没有登记，也不是可用类名 |
| `500:DuplicateEntry` | 同名重复登记 |
| `500:AmbiguousEntry` | 按类名反查命中多个 |
| `500:MissingEntryName` | 闭包 / 工厂没给名字 |
| `500:SingletonArguments` | 单例传了构造参数 |
| `500:UnresolvableDependency` | 参数无法注入 |
| `500:CircularDependency` | 构造链循环 |
| `500:AppNotAssembled` | 提供方应用未装配 |
| `500:AppNotRegistered` | 没有任何可用应用（模型算表名时会遇到） |
