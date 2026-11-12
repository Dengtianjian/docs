# Wechat

`kernel\Modules\Wechat\Wechat`  ·  class

源码：`gstudio_kernel/Modules/Wechat/Wechat.php`

> 微信服务

## 声明

```php
class Wechat extends AbilityBaseObject
```

父类：[AbilityBaseObject](/php/api/foundation/object/ability-base-object)

## 概述

微信账号注册表 + 业务取用入口：只回答「这次调用该用哪个账号」，
不负责 HTTP 请求（见 `WechatApi` 与 OfficialAccount/Miniprogram 下各接口类），
也不负责 token 生命周期（见 `WechatAccessToken`）与用户绑定（见 WechatUsersModel）。

账号来源与优先级：
1. 内存注册表：调用方通过 addAccount() 显式登记的账号，优先级最高；
2. 别名：setAlias() / addAccount() 登记的别名（运行时概念，仅当前请求有效，不落库）；
3. wechat_accounts 表：以上未命中时懒加载整表，按 type 分派为
[WechatOfficialAccount](/php/api/modules/wechat/officialaccount/wechat-official-account) 或 [WechatMiniProgram](/php/api/modules/wechat/miniprogram/wechat-mini-program)，同一请求内只查一次。

取用账号时必须显式给出 appId 或别名，本服务不提供「默认账号」概念：
无法从账号数量、入库顺序等信息推断业务想用哪一个，猜错会静默发错请求。

类型分派严格按表字段 type 进行，不做静默强转：officialAccount() 拿到的账号
一定是公众号、miniProgram() 拿到的一定是小程序，否则返回 null。

使用示例：

```php
$oa = Wechat::officialAccount("wx1234567890");        // 指定 appId
$mp = Wechat::miniProgram("wx1234567890");            // 指定 appId
Wechat::setAlias("wx1234567890", "mini-default");     // 登记别名（仅当前请求）
$mp2 = Wechat::miniProgram("mini-default");           // 按别名
$token = Wechat::account("default")->accessToken();   // token 仍归 WechatAccessToken
$oa->message()->template()->send($openid, $templateId, $data);
```

说明：账号以 wechat_accounts 表为准；别名是运行时概念，仅当前请求有效。

## 示例

```php
$oa = Wechat::officialAccount("wx1234567890");        // 指定 appId
$mp = Wechat::miniProgram("wx1234567890");            // 指定 appId
Wechat::setAlias("wx1234567890", "mini-default");     // 登记别名（仅当前请求）
$mp2 = Wechat::miniProgram("mini-default");           // 按别名
$token = Wechat::account("default")->accessToken();   // token 仍归 WechatAccessToken
$oa->message()->template()->send($openid, $templateId, $data);
```

## 常量

| 常量 | 值 | 说明 |
|---|---|---|
| `TYPE_OFFICIAL_ACCOUNT` | `"official_account"` | 账号类型：公众号（wechat_accounts.type） |
| `TYPE_MINI_PROGRAM` | `"mini_program"` | 账号类型：小程序（wechat_accounts.type） |

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$accounts` | `array` | protected | 已登记的账号（appId => WechatAccount） |
| `$aliases` | `array` | protected | 运行时别名映射（别名 => appId，仅当前请求有效） |
| `$missing` | `array` | protected | 已确认不存在的 key（负缓存，避免同一请求内反复查库） |
| `$loaded` | `bool` | protected | 是否已从 wechat_accounts 表加载 |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`addAccount()`](#addaccount) | 登记账号 |
| [`setAlias()`](#setalias) | 登记账号别名 |
| [`removeAccount()`](#removeaccount) | 移除账号 |
| [`hasAccount()`](#hasaccount) | 账号是否存在 |
| [`getAccounts()`](#getaccounts) | 获取全部已登记账号 |
| [`account()`](#account) | 获取账号（不限定类型） |
| [`officialAccount()`](#officialaccount) | 获取公众号账号 |
| [`miniProgram()`](#miniprogram) | 获取小程序账号 |
| [`reset()`](#reset) | 复位本次运行期缓存 |

### addAccount()

```php
public function addAccount(WechatAccount $account, $alias = null)
```

登记账号

内存注册表优先级最高；同一 appId 重复登记时后者覆盖前者。
本方法只影响当前请求的内存注册表，不写入 wechat_accounts 表。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$account` | `WechatAccount` | — | 账号实例 |
| `$alias` | `string|null` | `null` | 可选别名，非空时建立运行时别名（仅当前请求） |

### setAlias()

```php
public function setAlias($appId, $alias)
```

登记账号别名

别名为运行时概念，仅作用于当前请求，不写入 wechat_accounts 表；
需要跨请求可用请改为直接使用 appId。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$appId` | `string` | — | 账号 AppId |
| `$alias` | `string` | — | 别名 |

### removeAccount()

```php
public function removeAccount($appIdOrAlias)
```

移除账号

仅作用于当前请求的内存注册表，不修改 wechat_accounts 表；
同时清理指向该 appId 的全部运行时别名。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$appIdOrAlias` | `string` | — | AppId 或别名 |

### hasAccount()

```php
public function hasAccount($appIdOrAlias): bool
```

账号是否存在

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$appIdOrAlias` | `string` | — | AppId 或别名 |

返回：`bool` —— bool

### getAccounts()

```php
public function getAccounts(): array
```

获取全部已登记账号

会触发一次懒加载（若尚未加载过）。

返回：`array` —— array＜string, WechatAccount＞ appId => 账号

### account()

```php
public function account($appIdOrAlias)
```

获取账号（不限定类型）

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$appIdOrAlias` | `string` | — | AppId 或别名（必填，本服务不提供默认账号） |

### officialAccount()

```php
public function officialAccount($appIdOrAlias)
```

获取公众号账号

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$appIdOrAlias` | `string` | — | AppId 或别名（必填，本服务不提供默认账号） |

### miniProgram()

```php
public function miniProgram($appIdOrAlias)
```

获取小程序账号

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$appIdOrAlias` | `string` | — | AppId 或别名（必填，本服务不提供默认账号） |

### reset()

```php
public function reset()
```

复位本次运行期缓存

常驻进程（CLI / 队列）里两个任务之间需要清空注册表时手动调用；
一次性请求无需理会——进程结束即释放。

## 非公开方法

**protected**

- `protected function resolve($appIdOrAlias)` —— 解析 AppId 或别名到账号（内部使用）
- `protected function loadFromStore()` —— 从 wechat_accounts 表加载账号（内部使用）
- `protected function normalizeRow($row)` —— 归一化表行数据（内部使用）
- `protected function makeAccount(array $row)` —— 按表行数据创建账号对象（内部使用）

## 同目录

- [WechatAccessToken](/php/api/modules/wechat/wechat-access-token)
- [WechatAccount](/php/api/modules/wechat/wechat-account)
- [WechatApi](/php/api/modules/wechat/wechat-api)
- [WechatProvider](/php/api/modules/wechat/wechat-provider)

