# 模块

一个业务领域 = 一个模块目录。模块没有基类、没有接口，只靠**命名与目录约定**保持一致：

```
Modules/Auth/
├── Auth.php           门面（可选）：静态入口，转发到当前应用的实例
├── AuthModule.php     实现：真正的业务逻辑，天然带上所属应用
├── AuthProvider.php   装配：构造即装配，把实现登记进容器
└── LoginsModel.php    该领域的数据模型
```

## 三件套各自的职责

| 角色 | 后缀 | 职责 | 不该做的事 |
|---|---|---|---|
| 实现 | `XxxModule` | 业务方法、状态 | 不登记自己、不挂中间件 |
| 装配 | `XxxProvider` | 构造期：创建实现、登记容器、挂中间件、清理数据 | 不写业务逻辑 |
| 门面 | `Xxx` | 静态转发到「当前应用」的实例 | 不持有状态 |

不是每个模块都需要三件套：没有装配副作用的（如 `Setting`）可以只写实现，由 Bootstrap 直接 `provider(new SettingModule(), "setting")`；没有外部调用的（如 `WechatPay`）可以不要门面。

## 为什么实现不自己登记

因为**装配时机要可控**。如果实现类在构造函数里 `provider($this)`，那么「谁先 new 谁就登记」，装配顺序就散落在各处了。放在 Provider 里，装配点只有 Bootstrap 一处，出问题一眼能看到。

## 装配与门面的连接

```php
// AuthProvider
public function __construct()
{
  $auth = new AuthModule();

  //* 类名 + 短名两条路都指向同一实例
  $this->app()->provider($auth, AuthModule::class);
  $this->app()->provider($auth, "auth");
  ...
}

// Auth 门面
protected static function resolve()
{
  return Applications::default()->auth();   // 走别名，跟随应用的契约
}
```

门面必须用**别名**而不是 `make(实现类::class)`：

- 应用可以把 `auth` 槽位换成自己的实现，门面自动跟随；
- 槽位没登记时，别名取用会**明确报错**；写死类名则会反射新建一个对象，静默跑偏。

## 新增一个模块

1. 建目录 `Modules/Billing/`；
2. 写实现 `BillingModule.php`（`namespace kernel\Modules\Billing;`）；
3. 写装配 `BillingProvider.php`（构造里 `provider($impl, BillingModule::class)` + `provider($impl, "billing")`）；
4. 需要静态入口再写门面 `Billing.php`（`resolve()` 返回 `Applications::default()->billing()`）；
5. 在应用 Bootstrap 里装配：

```php
$this->app()->make(\kernel\Modules\Billing\BillingProvider::class);
```

## 模块内取其它组件

```php
// 取已登记的单例
$storage = $this->app()->storage();

// 临时构造（不登记），归属仍跟随本应用
$user = $this->app()->make(UserModel::class);

// 读设置
$vat = Setting::item("Billing_VatRate");
```

## 现有模块

| 模块 | 实现 | 装配 | 门面 |
|---|---|---|---|
| Auth | `AuthModule` | `AuthProvider` | `Auth` |
| Setting | `SettingModule` | 由 Bootstrap 直接 `new` | `Setting` |
| Storage | `StorageModule` | `StorageProvider` | `Storage` |
| Redis | `RedisModule` | `RedisProvider` | `Redis` |
| QCloud | `QCloud` | `QCloudProvider` | — |
| Aliyun | `AliyunAccount` | `AliyunProvider` | `Aliyun` |
| Wechat | `Wechat` | `WechatProvider` | — |
| WechatPay | `WechatPay` | `WechatPayProvider` | — |
