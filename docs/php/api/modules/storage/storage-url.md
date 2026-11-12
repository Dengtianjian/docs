# StorageURL

`kernel\Modules\Storage\StorageURL`  ·  class

源码：`gstudio_kernel/Modules/Storage/StorageURL.php`

> 存储文件访问地址（延迟构建的 URL）

## 声明

```php
class StorageURL extends URL
```

父类：[URL](/php/api/foundation/http/url)

## 概述

`Storage::url` 的返回值：把 `url($fileKey, $urlParams, $expires, $withSignature, $action)`
的每个参数都变成一个链式方法，参数改完后再取字符串 —— 只有调用 `toString`
（或把对象当字符串用，触发 `__toString()`）时才真正拼装路径、合并参数并**签发签名**。

这样解决了「先拿到地址、之后才决定参数」的问题：签名在**最后一次**构建时才计算，
因此构建前通过 `urlParams` / `action` 增改的参数都会被纳入签名，
不会出现「先签名再改参数 → 验签失败（verifyAuth:403010）」的情况。

用法：
```php
// 近似等价于 $storage->url("a/b.png", ["v" => 2], 600, true, "preview")，另多加了路径后缀
$url = $storage->url("a/b.png")
->urlParams(["v" => 2])
->expires(600)
->withSignature(true)
->action("preview")
->suffix("preview");   // 路径变成 files/a/b.png/preview

echo $url;              // 触发构建并输出地址字符串
$str = $url->toString(); // 同上
$url->build();           // 只构建不取字符串（构建后可读 $url->pathName / $url->queryParams）
```

结构：
- 路径：`{prefix}/{fileKey}`，设置 `suffix` 时追加为 `{prefix}/{fileKey}/{suffix}`；
路径在 `build` 时重算，因此**不要**直接改 `$pathName`（会被覆盖），
需要额外路径段请用 `suffix`；
- 主机：`protocol` / `host` / `port` / `user` / `password` 取自存储门面的基础地址（`Storage::baseURL`）；
- 查询参数：`$urlParams`（`urlParams`）+ 经 `URL::queryParam` 追加的参数，开启签名时再并入签名参数；
- 签名：仅当存储门面已开启签名鉴权（`Storage::auth`）且 `withSignature` 为真时才签发，
HTTP 方法固定按 "get" 参与签名。

注意：
- 构建是幂等的，可重复调用；每次构建都会按当前参数重新签发（时间戳会更新）；
- 构建前从 `$queryParams` 里手动塞的参数同样会被纳入，但**签名参数键**
（sign-algorithm / sign-time / key-time / header-list / signature / url-param-list，
以及绑定动作时的 action）会被剔除后重算，避免重复构建把它们当成业务参数；
- 不要在 `$urlParams` 里传 `auth` 键：它会参与签名计算却又会被剔除，导致验签失败。

## 示例

```php
// 近似等价于 $storage->url("a/b.png", ["v" => 2], 600, true, "preview")，另多加了路径后缀
$url = $storage->url("a/b.png")
->urlParams(["v" => 2])
->expires(600)
->withSignature(true)
->action("preview")
->suffix("preview");   // 路径变成 files/a/b.png/preview

echo $url;              // 触发构建并输出地址字符串
$str = $url->toString(); // 同上
$url->build();           // 只构建不取字符串（构建后可读 $url->pathName / $url->queryParams）
```

## 相关

- `Storage::url` 创建入口
- [URL](/php/api/foundation/http/url) 父类（host / pathName / queryParams 等公开属性与 queryParam()）

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$storage` | `Storage|null` | protected | 提供基础地址、路径前缀与签名能力的存储门面 |
| `$fileKey` | `string|null` | protected | 文件键（可含相对目录，如 "dir/a.jpg"） |
| `$storageParams` | `array` | protected | 参与签名的附加 URL 参数，对应 `url()` 的第二参 `$urlParams` |
| `$expires` | `integer` | protected | 签名有效期（秒） |
| `$withSignature` | `boolean` | protected | 是否附带签名授权参数 |
| `$action` | `string|null` | protected | 签名绑定的动作（如 preview / download / info），null 表示不绑定 |
| `$suffix` | `string|null` | protected | 路径后缀（追加在 `{prefix}/{fileKey}` 之后，如 "preview" / "download"） |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 构造存储访问地址 |
| [`fileKey()`](#filekey) | 读取或设置文件键 |
| [`suffix()`](#suffix) | 读取或设置路径后缀 |
| [`urlParams()`](#urlparams) | 读取或设置参与签名的附加 URL 参数（对应 `url()` 的第二参） |
| [`expires()`](#expires) | 读取或设置签名有效期（秒） |
| [`withSignature()`](#withsignature) | 读取或设置是否附带签名授权参数 |
| [`action()`](#action) | 读取或设置签名绑定的动作 |
| [`build()`](#build) | 构建地址（解析基础地址、重算路径、合并参数、按需签发签名） |
| [`toString()`](#tostring) | 输出地址字符串 |
| [`__toString()`](#__tostring) | 把对象当字符串使用时自动输出地址 |

### __construct()

```php
public function __construct(Storage $storage, $fileKey = null)
```

构造存储访问地址

仅记录存储门面与文件键并推导路径 `{prefix}/{fileKey}`，**不解析基础地址、不签发签名**，
这些留到 `build` / `toString` 时再执行。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$storage` | `Storage` | — | 存储门面（提供 baseURL / prefix / authEnabled / createAuthParams） |
| `$fileKey` | `string|null` | `null` | 文件键 |

### fileKey()

```php
public function fileKey($fileKey = null)
```

读取或设置文件键

文件键是访问路径的主体，但设置时**不会**立即写入 `$pathName`：
路径在 `build` 时按「前缀 + 文件键 + 后缀」重算。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$fileKey` | `string|null` | `null` | 文件键（可含相对目录，如 "dir/a.jpg"）；不传表示仅读取 |

### suffix()

```php
public function suffix($value = null)
```

读取或设置路径后缀

构建时把后缀拼到 `{prefix}/{fileKey}` 之后，得到 `{prefix}/{fileKey}/{suffix}`，
用于指向按动作区分的文件端点，例如：
- `->suffix("preview")` → `files/dir/a.png/preview`
- `->suffix("download")` → `files/dir/a.png/download`

与直接改 `$pathName` 的区别：`build` 每次都会按「前缀 + 文件键 + 后缀」重算 `$pathName`，
手动写入的路径段会被覆盖 —— 需要额外路径段请用本方法。

注意：
- 值按**原样拼接**（中间固定补一个 `/`），因此**不要**带前导斜杠，否则会拼出 `//`；
- 后缀只影响路径，**不参与签名**；需要限制地址用途时请配合 `action`
（按动作校验的端点通常两者成对使用：`->suffix("preview")->action("preview")`）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$value` | `mixed` | `null` | — |

### urlParams()

```php
public function urlParams($urlParams = null)
```

读取或设置参与签名的附加 URL 参数（对应 `url()` 的第二参）

这些参数既会拼进最终 query，也会参与签名（记入 `url-param-list`），
因此访问方必须原样携带。**不要**传入 `auth` 键（构建时会被剔除却已参与签名）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$urlParams` | `array|null` | `null` | 参数键值对；不传表示仅读取 |

### expires()

```php
public function expires($expires = null)
```

读取或设置签名有效期（秒）

仅在「已开启签名鉴权 + `withSignature` 为真」时生效。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$expires` | `int|null` | `null` | 有效期秒数；不传表示仅读取 |

### withSignature()

```php
public function withSignature($withSignature = null)
```

读取或设置是否附带签名授权参数

需存储门面已开启签名鉴权（`Storage::auth`），否则即使为真也不会签名。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$withSignature` | `boolean|null` | `null` | 是否签名；不传表示仅读取 |

### action()

```php
public function action($action = null)
```

读取或设置签名绑定的动作

传值会把动作写入签名，使该地址**只能用于该动作**的端点
（`info` / `preview` / `download` / `delete` / `update` / `upload` 等按动作校验的端点必须绑定）；
不传表示不绑定，此时只能用于不限制动作的端点。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$action` | `string|null` | `null` | 动作标识；不传表示仅读取（显式传 null 表示清除绑定） |

### build()

```php
public function build()
```

构建地址（解析基础地址、重算路径、合并参数、按需签发签名）

可重复调用：每次都会按当前 `$fileKey` / `$suffix` / `$urlParams` / `$expires` /
`$withSignature` / `$action` 重新计算，签名时间戳随之刷新。

`$pathName` 会被**重算**为 `{prefix}/{fileKey}[/{suffix}]` —— 直接改 `$pathName` 的路径段
会在构建时丢失，需要额外路径段请用 `suffix`。

构建结果写回父类的公开属性（`protocol` / `host` / `port` / `pathName` / `queryParams`），
不返回字符串。

### toString()

```php
public function toString()
```

输出地址字符串

先 `build` 再交给父类拼装，因此每次调用都会按当前参数重新签发签名。

### __toString()

```php
public function __toString()
```

把对象当字符串使用时自动输出地址

## 同目录

- [FilesModel](/php/api/modules/storage/files-model)
- [Storage](/php/api/modules/storage/storage)
- [StorageFile](/php/api/modules/storage/storage-file)
- [StorageModule](/php/api/modules/storage/storage-module)
- [StorageProvider](/php/api/modules/storage/storage-provider)
- [StorageSignature](/php/api/modules/storage/storage-signature)

