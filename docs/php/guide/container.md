# 容器

容器只做两件事：**按名字登记**、**按名字取用**。没有反射魔法，也没有自动扫描。

## 四种登记方式

| 方法 | 生命周期 | 构造时机 |
|---|---|---|
| `provider($concrete, $name)` | 单例 | **登记即构造** |
| `defer($concrete, $name)` | 单例 | 首次取用才构造 |
| `bind($concrete, $name)` | 多例 | 每次取用都构造 |
| `import($source, $appId, $alias)` | 跨应用 | 不构造，转发给提供方 |

```php
$app->provider(Config::class, "config");   // 立即构造，之后复用
$app->defer(Router::class, "router");      // 用到才构造
$app->bind(UserModel::class);              // 每次新建
$app->import(StorageModule::class, "gstudio_super_app", "storage");
```

> 为什么 `provider` 要立即构造：**构造即装配**。挂中间件、建磁盘池、清过期 token 这些副作用必须发生在启动期，否则等业务用到时才装配就太晚了。
> 框架自带零件（Request / Router / Lifecycle / Config / Log / Cache）都用 `defer`，避免装配期产生副作用。

## 名字规则

- 登记时给了 `$name` 就用 `$name`；没给就用 `$concrete` 的类名；
- 名字**精确匹配**：不做短名推断、不剥 `Service` 后缀；
- 一个名字只能有一种生命周期，重复登记直接报 `500:DuplicateEntry`；
- 取用写完整类名也能命中：容器会按实现体反查一次（多个命中则报 `500:AmbiguousEntry`）。

```php
$app->provider(Config::class, "config");

$app->config();                    // ✅ 别名
$app->make(Config::class);         // ✅ 反查命中同一条目
$app->make("Config");              // ❌ 精确匹配，不会猜
```

## 实现体的四种形态

```php
// 1. 类名：反射构造，参数自动注入
$app->provider(AuthModule::class);

// 2. 实例：直接用（归属只在为空时补）
$app->provider(new SettingModule(), "setting");

// 3. 闭包：立刻调用（provider）或首次取用调用（defer）
$app->defer(function (Request $R) { return new SearchService($R); }, "search");

// 4. 工厂：class + method，每次调用都新建工厂
$app->bind([ReportFactory::class, "make"], "report");
```

闭包和工厂不给名字会报 `500:MissingEntryName`——因为推导不出名字。

## 取用与参数注入

```php
$app->make(RedisModule::class);
$app->make(UserModel::class, ["table" => "custom_users"]);   // 位置参数
$app->make(UserModel::class, ["table" => "custom_users"]);   // 命名参数
```

注入顺序（构造参数、工厂方法参数、闭包参数共用一套）：

1. 调用方显式传入（命名优先、位置按序）；
2. 类型命中：`Application` → 容器所属应用；`Request` → 当前请求；其它类 → 递归 `make()`；
3. 形参名是 `$app` / `$request`；
4. 参数默认值；
5. 可空则 `null`；
6. 都没有 → `500:UnresolvableDependency`。

单例不接受构造参数，传了会报 `500:SingletonArguments`——要每次新建请用 `bind`。

## `$app->xxx()` 是什么

`Application::__call()` 会把方法名当名字、参数原样传下去：

```php
$app->auth();             // = $app->make("auth")
$app->probe(1, 2);        // = $app->make("probe", [1, 2])，多例时即构造参数
```

## 归属绑定

容器构造出来的对象会自动 `bindApp($所属应用)`，只有对象本来没有归属时才写入：

- `$superApp->make(FilesModel::class)->tableName` → `gstudio_super_app_files`
- `$downloadApp->make(FilesModel::class)->tableName` → `gstudio_download_files`

构造**期间**拿归属走的是装配上下文栈（`Applications::setUpApp()`），所以构造函数里的 `$this->app()` 同样正确。

## 排查

```php
$app->providers();   // 已构造的单例：名字 => 实例
$app->imports();     // 已声明的跨应用来源：名字 => appId
$app->has("auth");   // 是否登记
```

## 错误码

| 码 | 含义 |
|---|---|
| `500:UnknownComponent` | 名字既没登记，也不是可用类名 |
| `500:DuplicateEntry` | 同名重复登记 |
| `500:AmbiguousEntry` | 按类名反查命中多个登记 |
| `500:MissingEntryName` | 闭包 / 工厂登记时没给名字 |
| `500:SingletonArguments` | 给单例传了构造参数 |
| `500:UnresolvableDependency` | 参数无法注入 |
| `500:CircularDependency` | 构造链出现循环 |
| `500:AppNotAssembled` | 跨应用取用但提供方还没装配 |
