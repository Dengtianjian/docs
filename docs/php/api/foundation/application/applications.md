# Applications

`kernel\Foundation\Application\Applications`  ·  class

源码：`gstudio_kernel/Foundation/Application/Applications.php`

> 应用（App）实例管理器

## 声明

```php
class Applications
```

## 概述

统一登记同一进程内创建的全部 App 实例，并维护一个「默认应用」指针：
- **第一个注册的应用自动成为默认应用**（`$makeDefault` 未显式指定时）；
- 也可以**显式指定**默认应用：注册时传 `$makeDefault = true`，或事后调用 `setDefault`。

默认应用是 `default` / `defaultId` / `$app->kernelId()` 的数据来源，
因此「谁被登记为默认」直接决定框架各处取到的是哪个应用。

典型场景与顺序：
- 常规应用：`new App(Bootstrap::class, "app")` 构造时自动注册，因是第一个注册者，自动成为默认；
- 多应用共存（如 DiscuzX 插件）：插件 App 构造时传 `$makeDefault = true`，显式接管默认位置；
- 测试/常驻进程：可用 `clear` 重置注册表，或用 `setDefault` 在多个实例间切换。

注意：注册表以「应用 ID」为键，重复注册同一 ID 会覆盖前者（实例替换，默认指针不变 ——
若被覆盖的正是默认应用，仍指向该 ID，取用时会拿到新实例）。

类型上只认 `Application`：具体的 Web 应用 / 未来的 console 应用都是它的子类，
管理器不需要知道是哪种。

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `static $applications` | `array` | `[]` | 已登记的应用实例 |
| `static $defaultId` | `string|null` | `null` | 默认应用的应用ID |
| `static $setupStack` | `Application[]` | `[]` | 装配上下文栈 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`register()`](#register) | 登记一个应用实例 |
| [`all()`](#all) | 获取全部已登记的应用实例 |
| [`graph()`](#graph) | 依赖图：每个应用引了谁、开放了什么、装了哪些装配单元 |
| [`ids()`](#ids) | 获取全部已登记的应用ID |
| [`has()`](#has) | 判断指定应用是否已登记 |
| [`get()`](#get) | 按应用ID获取实例 |
| [`enterSetup()`](#entersetup) | 进入装配 / 构造上下文 |
| [`leaveSetup()`](#leavesetup) | 退出装配上下文 |
| [`setUpApp()`](#setupapp) | 取当前装配 / 构造上下文里的应用 |
| [`defaultId()`](#defaultid) | 获取默认应用的应用ID |
| [`setDefault()`](#setdefault) | 切换默认应用 |
| [`remove()`](#remove) | 移除一个已登记的应用 |
| [`clear()`](#clear) | 清空注册表（含默认应用） |

### register()

```php
public static function register(Application $app, $id, $makeDefault = false): Application
```

登记一个应用实例

- 注册表里尚无默认应用时，本次注册的应用自动成为默认；
- `$makeDefault = true` 时**强制**把该应用设为默认（覆盖已有的默认应用）；
- 重复注册同一 ID 会替换实例，默认指针保持不变。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$app` | `Application` | — | 应用实例 |
| `$id` | `string` | — | 应用ID（与项目目录同名）；空字符串会抛异常 |
| `$makeDefault` | `boolean` | `false` | 是否强制指定为默认应用，默认 false（仅在还没有默认应用时自动成为默认） |

返回：`Application` —— Application 返回传入的应用实例，便于链式使用

可能抛出：

- [Error](/php/api/foundation/exception/error) 应用ID为空时抛出

### all()

```php
public static function all(): array
```

获取全部已登记的应用实例

返回：`array` —— array＜string, Application＞ 应用ID => 实例

### graph()

```php
public static function graph(): array
```

依赖图：每个应用引了谁、开放了什么、装了哪些装配单元

排查「这个能力究竟从哪个应用来的」先看它。开发模式下 `\kernel\Foundation\App::run`
会在装配完成后写进日志（`app.dependencyGraph`），生产环境不写，避免每请求多一次 IO。

返回结构：
```php
[
"gstudio_download" => [
"imports"   => ["kernel\Modules\Setting\Setting" => "gstudio_super_app"],
"exposed"   => [],
"providers" => ["kernel\Modules\Setting\Setting", ...],
],
// ...
]
```

```php
[
"gstudio_download" => [
"imports"   => ["kernel\Modules\Setting\Setting" => "gstudio_super_app"],
"exposed"   => [],
"providers" => ["kernel\Modules\Setting\Setting", ...],
],
// ...
]
```

返回：`array` —— array＜string, array{imports: array＜string,string＞, providers: array＜int,string＞}>

### ids()

```php
public static function ids(): array
```

获取全部已登记的应用ID

返回：`array` —— string[]

### has()

```php
public static function has($id): bool
```

判断指定应用是否已登记

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$id` | `string` | — | 应用ID |

返回：`bool` —— boolean

### get()

```php
public static function get($id): ?Application
```

按应用ID获取实例

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$id` | `string` | — | 应用ID |

返回：`?Application` —— Application|null 未登记时返回 null

### enterSetup()

```php
public static function enterSetup(Application $app): void
```

进入装配 / 构造上下文

两处成对调用（见 `leaveSetup`）：
- `App::assemble()`：构造 Bootstrap 期间；
- `Container::buildClass()` / `buildConcrete()`：构造对象、执行工厂期间。

目的是让对象在构造函数里调用 `$this->app()` 时能拿到正确的归属——
`bindApp()` 在构造之后才生效，构造期只能靠这个栈。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$app` | `Application` | — | 当前正在构造/装配的应用 |

返回：`void` —— void

### leaveSetup()

```php
public static function leaveSetup(): void
```

退出装配上下文

与 `enterSetup` 成对；栈空时静默返回，保证 boot 失败也不会把栈弄乱。

返回：`void` —— void

### setUpApp()

```php
public static function setUpApp(): ?Application
```

取当前装配 / 构造上下文里的应用

既不在装配期也不在构造期时返回 null——调用方（`\kernel\Foundation\Object\BaseObject::app`）
再回落到默认应用。

返回：`?Application` —— Application|null 当前上下文的应用；都没有时返回 null

### defaultId()

```php
public static function defaultId(): ?string
```

获取默认应用的应用ID

返回：`?string` —— string|null 尚未登记任何应用时返回 null

### setDefault()

```php
public static function setDefault($idOrApp): bool
```

切换默认应用

只接受**已登记**的应用，登记表本身不会被修改。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$idOrApp` | `string|Application` | — | 应用ID，或已登记的 Application 实例 |

返回：`bool` —— boolean 指定成功返回 true；实例未登记 / ID 不存在返回 false

### remove()

```php
public static function remove($id): ?Application
```

移除一个已登记的应用

若移除的正是默认应用，则把默认指针交给**剩余应用中的第一个**（保持「总有一个默认」）；
注册表被清空后默认指针归 null。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$id` | `string` | — | 应用ID |

返回：`?Application` —— Application|null 被移除的实例；未登记时返回 null

### clear()

```php
public static function clear(): void
```

清空注册表（含默认应用）

仅供测试或常驻进程重置使用；清空后 Applications::default() 返回 null。

返回：`void` —— void

## 同目录

- [Application](/php/api/foundation/application/application)
- [Container](/php/api/foundation/application/container)
- [Identity](/php/api/foundation/application/identity)

