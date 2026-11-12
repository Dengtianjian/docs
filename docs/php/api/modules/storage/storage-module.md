# StorageModule

`kernel\Modules\Storage\StorageModule`  ·  class

源码：`gstudio_kernel/Modules/Storage/StorageModule.php`

> 文件存储（聚合多磁盘 + 签名鉴权 + 访问控制）

## 声明

```php
class StorageModule extends AbilityBaseObject
```

父类：[AbilityBaseObject](/php/api/foundation/object/ability-base-object)

## 概述

存储层对外的统一入口，自身不读写磁盘，职责是编排三件事：
- **多磁盘聚合**：持有若干 [AbstractStorage](/php/api/modules/storage/drivers/abstract-storage) 磁盘实例（本地 / 腾讯云 COS / 阿里云 OSS 等），
由 `disks` 取全部、`disk` 取指定或当前使用的磁盘、`use` 切换当前磁盘；
- **签名鉴权**：经 `StorageSignature` 为文件访问 URL 附加「限时效 + 防篡改」的授权参数，
开启 `auth` 后由 `verifyRequestSignature` 校验；
- **访问控制**：启用 `enableDataSave` 后经 `FilesModel` 落库文件元信息，
开启 `accessControl` 后按 ACL 标签（`PRIVATE` / `PUBLIC_READ` 等）
由 `checkAccessControl` 判定读写权限。

此外 `registerRoute` 支持按快捷名或自定义 URI 批量注册文件相关路由。

三个开关决定其余方法的行为：
- `$authEnabled` / `auth`：是否校验请求签名；
- `$accessControlEnabled` / `accessControl`：是否按 ACL 标签校验操作权限；
- `$dataSave` / `enableDataSave`：是否把文件元信息写入数据库
（`save` / `add` / `update` / `delete` / `exists` 依赖它）。

装配注意：本类不登记自身。实例由 `StorageProvider` 在构造时建好并登记进应用容器，
谁要用谁 `$app->make(Storage::class)` 或接收构造注入；不同应用各持一份磁盘池，互不覆盖。
因此不同应用可以各持一份磁盘池，互不覆盖。

## 常量

| 常量 | 值 | 说明 |
|---|---|---|
| `PRIVATE` | `"private"` | 私有：仅创作者与管理员具备全部权限，其他人无权限 |
| `PUBLIC_READ` | `"public-read"` | 公开读：匿名用户具备 READ 权限，创作者与管理员具备全部权限 |
| `PUBLIC_READ_WRITE` | `"public-read-write"` | 公开读写：创建者、管理员与匿名用户具备全部权限，通常不建议授予 |
| `AUTHENTICATED_READ` | `"authenticated-read"` | 认证读：认证用户具备 READ 权限，创作者与管理员具备全部权限 |
| `AUTHENTICATED_READ_WRITE` | `"authenticated-read-write"` | 认证读写：创建者、管理员与认证用户具备全部权限，通常不建议授予 |

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$signature` | `StorageSignature` | protected | 文件访问签名器，负责签发与校验访问授权参数 |
| `$disks` | `array` | protected | 磁盘驱动表，键为磁盘名、值为磁盘实例 |
| `$useDisk` | `AbstractStorage` | protected | 当前使用的磁盘：构造时取磁盘池首块，可由 `use` 切换 |
| `$defaultDisk` | `AbstractStorage|null` | protected | 默认磁盘兜底位 |
| `$baseURL` | `string` | protected | 基础地址，生成文件访问 URL 的起点 |
| `$prefix` | `string` | protected | 文件路由前缀，同时作为访问 URL 的路径前缀 |
| `$authEnabled` | `boolean` | protected | 请求签名鉴权开关，由 `auth` 读写 |
| `$accessControlEnabled` | `boolean` | protected | 文件访问控制开关，由 `accessControl` 读写 |
| `$accessControlAuthIdValue` | `mixed` | protected | 访问控制所用的当前认证 ID（通常为用户 ID，可为闭包） |
| `$dataSave` | `boolean` | protected | 数据存储开关：是否把文件元信息写入 `FilesModel`，由 `enableDataSave` 开启 |
| `$registrableRoutes` | `array` | private | 快捷名 => 默认控制器 |
| `$registrableRouteMethods` | `array` | private | 快捷名 => HTTP 方法 |
| `$registrableRouteUriSuffixs` | `array` | private | 快捷名 => URI 后缀（null 表示不加后缀，即 `{prefix}/{fileKey:...}` 本身） |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 构造文件存储 |
| [`fileKeyRoutePattern()`](#filekeyroutepattern) | 获取文件键的路由匹配正则 |
| [`buildFileKeyRouteUri()`](#buildfilekeyrouteuri) | 构建带文件键占位符的路由 URI |
| [`registerRoute()`](#registerroute) | 注册文件相关路由 |
| [`generateFileKey()`](#generatefilekey) | 生成带唯一前缀的文件键 |
| [`buildFileKey()`](#buildfilekey) | 拼接目录与文件名，构建文件键 |
| [`enableDataSave()`](#enabledatasave) | 启用文件数据存储 |
| [`dataSave()`](#datasave) | 读取数据存储开关状态 |
| [`disks()`](#disks) | 获取全部磁盘驱动 |
| [`disk()`](#disk) | 获取磁盘 |
| [`baseURL()`](#baseurl) | 读取基础地址 |
| [`prefix()`](#prefix) | 读取文件路由前缀 |
| [`auth()`](#auth) | 读取或设置请求签名鉴权开关 |
| [`authEnabled()`](#authenabled) | 读取请求签名鉴权开关状态 |
| [`accessControl()`](#accesscontrol) | 读取或设置文件访问控制（ACL）开关 |
| [`accessControlEnabled()`](#accesscontrolenabled) | 读取访问控制开关状态 |
| [`accessControlAuthId()`](#accesscontrolauthid) | 读取或设置访问控制当前认证身份 |
| [`get()`](#get) | 获取文件信息 |
| [`put()`](#put) | 上传文件到当前磁盘 |
| [`save()`](#save) | 上传文件并把元信息写入数据库 |
| [`add()`](#add) | 仅登记文件元信息（不实际上传文件内容） |
| [`update()`](#update) | 更新文件元信息 |
| [`updateAccessControl()`](#updateaccesscontrol) | 更新文件的 ACL 访问标签 |
| [`delete()`](#delete) | 删除文件 |
| [`exists()`](#exists) | 判断文件是否存在 |
| [`url()`](#url) | 生成文件访问地址 |
| [`direct()`](#direct) | 获取文件的直连地址（由当前磁盘直接给出，不经过本应用中转） |
| [`createAuthParams()`](#createauthparams) | 生成文件访问的授权参数（URL query 形式） |
| [`verifySignature()`](#verifysignature) | 校验文件访问签名 |
| [`verifyRequestSignature()`](#verifyrequestsignature) | 从当前 HTTP 请求提取参数并校验文件签名 |
| [`authorizeOperation()`](#authorizeoperation) | 校验对指定文件执行操作（读 / 写）的授权 |
| [`checkAccessControl()`](#checkaccesscontrol) | 基于 ACL 标签判定操作是否被允许 |

### __construct()

```php
public function __construct($disks)
```

构造文件存储

依次完成：按**归属应用**初始化签名器 → 记录磁盘池 → 取磁盘池**第一块**磁盘作为
当前使用磁盘（赋给 `$useDisk`）→ 基础访问地址取自应用基础 URL。

「归属应用」决定三件事：签名器的密钥种子、文件元信息表的表名前缀、签出 URL 的归属。
子系统（download）要用主系统（super_app）的文件中心时，不重新装配，直接复用那份实例；
需要指定归属时在登记前调父类的 `\kernel\Foundation\Object\BaseObject::bindApp`。

构造**不接收 app、也不登记任何全局单例**：实例归应用容器所有，归属由
`instance()` / `register()` 登记时绑定，构造期只做与归属无关的初始化
（签名器因依赖 appId，延迟到首次使用）。

磁盘池为空时 `$useDisk` 保持 null，后续 `get` / `put` 等磁盘操作均不可用。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$disks` | `mixed` | — | — |

### fileKeyRoutePattern()

```php
public static function fileKeyRoutePattern()
```

获取文件键的路由匹配正则

用于路由中 `{fileKey:...}` 占位符的匹配规则，可匹配含相对目录的文件键（如 "dir/file.txt"）。

### buildFileKeyRouteUri()

```php
public static function buildFileKeyRouteUri($prefix, $suffix = null)
```

构建带文件键占位符的路由 URI

把目录前缀、`{fileKey:...}` 占位符与后缀拼成一条路由 URI 模式，供路由注册使用，
形如 `{prefix}/{fileKey:[\w\/]+?\.\w+}[/suffix]`（后缀为空时省略）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$prefix` | `string` | — | 路由目录前缀（如 "files"） |
| `$suffix` | `string|null` | `null` | 路由后缀，为空时不拼入 |

### registerRoute()

```php
public function registerRoute($nameOrUri, $methodOrController = null, $controller = null)
```

注册文件相关路由

支持两种用法：
1. **快捷名**：`get` / `auth` / `upload` / `update` / `delete` / `preview` / `download`。
HTTP 方法与 URI 后缀取自 `$registrableRouteMethods` / `$registrableRouteUriSuffixs`，
控制器默认取自 `$registrableRoutes`、可用第二参覆盖；URI 形如 `{prefix}/{fileKey:...}[/后缀]`。
其中 `auth` 较特殊：不带文件键占位符，而是 `{prefix}/auth/{method:(get|post|patch|delete)}`。
2. **自定义 URI**：第一参为 URI、第二参为 HTTP 方法、第三参为控制器；
URI 中不含当前前缀时会自动补成 `{prefix}/{fileKey:...}/{uri}`。

两者以第三参 `$controller` 区分：传了 `$controller` 即按自定义 URI 处理；
而「URI 是否已含当前前缀」按**子串包含**判断，而非前缀判断。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$nameOrUri` | `string` | — | 快捷名（见上）或自定义路由 URI |
| `$methodOrController` | `string|null` | `null` | 快捷名模式：控制器类名，为空时用默认控制器；自定义模式：HTTP 方法 |
| `$controller` | `string|null` | `null` | 控制器类名，传值即走自定义 URI 分支 |

### generateFileKey()

```php
public static function generateFileKey($extension)
```

生成带唯一前缀的文件键

以 `uniqid` 拼上扩展名，形如 `66f3a1b2c3d4.jpg`，作为文件在存储中的唯一标识。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$extension` | `string` | — | 文件扩展名（不含点） |

### buildFileKey()

```php
public static function buildFileKey($filePath, $fileName)
```

拼接目录与文件名，构建文件键

以 `Path::join` 组合目录与文件名，并把分隔符统一为正斜杠 "/"，
使文件键跨平台一致，可直接作为存储读写与访问 URL 的标识。
与 `generateFileKey` 的区别：本方法不生成唯一前缀，只组合给定路径与文件名。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$filePath` | `string` | — | 文件目录路径，为空时仅返回文件名 |
| `$fileName` | `string` | — | 文件名（可含扩展名） |

### enableDataSave()

```php
public function enableDataSave()
```

启用文件数据存储

启用后 `save` / `add` / `update` / `delete` / `exists`
等方法会读写文件模型 `FilesModel`。

### dataSave()

```php
public function dataSave()
```

读取数据存储开关状态

与 `enableDataSave` 对应，仅读取不修改。

### disks()

```php
public function disks()
```

获取全部磁盘驱动

### disk()

```php
public function disk($name = null)
```

获取磁盘

传 $name 时返回该名称对应的磁盘；不传时返回当前使用磁盘，
没有当前使用磁盘则回退到默认磁盘（`$defaultDisk`）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$name` | `string|null` | `null` | 磁盘名；为空时取当前使用磁盘 |

### baseURL()

```php
public function baseURL()
```

读取基础地址

生成文件访问 URL 的起点，构造时取自 `URL::baseURL`；
`StorageURL` 构建地址时从这里解析 host / protocol / port。

### prefix()

```php
public function prefix()
```

读取文件路由前缀

默认 "files"，同时是访问 URL 的路径前缀（`{baseURL}/{prefix}/{fileKey}`）。

### auth()

```php
public function auth($val = null)
```

读取或设置请求签名鉴权开关

读写一体：传 $val 时设定开关并返回 $this（可链式），不传时返回当前开关值。
开启后 `put` / `save` 等方法会先经 `verifyRequestSignature` 校验签名。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$val` | `boolean|null` | `null` | 是否启用；null 表示仅读取 |

### authEnabled()

```php
public function authEnabled()
```

读取请求签名鉴权开关状态

与 `auth` 对应，仅读取不修改。

### accessControl()

```php
public function accessControl($val = null, $authId = null, $enableAuth = null)
```

读取或设置文件访问控制（ACL）开关

读写一体：传 $val 时设定开关并返回 $this（可链式），不传时返回当前开关值。
开启（$val 为真）时一并记录当前认证 ID（`$authId`，用于判定文件归属者）；
关闭时清空已记录的认证 ID。
第三参 $enableAuth 不为 null 时联动 `auth`，即「开 ACL 的同时顺带开/关签名鉴权」。

$authId 允许传**闭包**，在取用时才调用（见 `accessControlAuthId`）。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$val` | `boolean|null` | `null` | 是否启用访问控制；null 表示仅读取 |
| `$authId` | `mixed|null` | `null` | 当前认证 ID（通常为用户 ID，可为闭包） |
| `$enableAuth` | `boolean|null` | `null` | 是否同时设置签名鉴权开关；null 表示不改动 |

### accessControlEnabled()

```php
public function accessControlEnabled()
```

读取访问控制开关状态

与 `accessControl` 对应，仅读取不修改。

### accessControlAuthId()

```php
public function accessControlAuthId($val = null)
```

读取或设置访问控制当前认证身份

读写一体：传 $val 时设定当前认证 ID（如当前用户 ID）并返回 $this（可链式）；
不传时返回当前认证 ID，若其为闭包则先调用再返回。
该身份用于 `checkAccessControl` 判定文件归属与权限。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$val` | `mixed|null` | `null` | 认证 ID（通常为用户 ID）；null 表示仅读取 |

### get()

```php
public function get($fileKey)
```

获取文件信息

委托当前使用磁盘读取文件元信息：磁盘报错时透传其错误态，
未报错但结果为空时返回 500「获取文件信息失败」。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$fileKey` | `string` | — | 文件键 |

### put()

```php
public function put($file, $saveFileName = null)
```

上传文件到当前磁盘

把上传的文件写入当前使用磁盘，返回携带元信息的 `StorageFile` 对象。
开发环境（`$app->isDevelopment()`）下会把磁盘的错误详情一并透出，便于排查。

本方法**只落盘、不写库**（元信息落库请用 `save`）：返回对象上的
`owner_id` / `ref` / `type` 均为 null、`access_control` 固定为 `PUBLIC_READ`，
需要真实归属与 ACL 时交由 `save` 覆盖后写库。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$file` | `array` | — | 上传文件数组（同 PHP $_FILES 单文件结构，含 name/type/size/tmp_name 等） |
| `$saveFileName` | `string|null` | `null` | 保存用的文件键；为 null 时取 $file['name'] |

### save()

```php
public function save($file, $fileKeyOrSavePath = null, $ownerId = null, $ref = null, $type = null, $accessControl = self::AUTHENTICATED_READ)
```

上传文件并把元信息写入数据库

需先经 `enableDataSave` 启用数据存储，否则抛 [Error](/php/api/foundation/exception/error)。流程：
1. 解析目标路径或文件键（第二参不含扩展名时按目录处理，自动生成唯一文件键）；
2. 按需校验签名（`auth`）与访问控制（`accessControl`）；
3. 写入当前磁盘（复用 `put`）；
4. 把元信息写入 `FilesModel`，同一文件键先删除再插入以保证幂等。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$file` | `array` | — | 上传文件数组（同 PHP $_FILES 单文件结构） |
| `$fileKeyOrSavePath` | `string|null` | `null` | 保存目录（不含扩展名，自动生成文件键）或完整文件键（含扩展名） |
| `$ownerId` | `mixed|null` | `null` | 文件归属者 ID |
| `$ref` | `mixed|null` | `null` | 业务关联引用（自定义） |
| `$type` | `mixed|null` | `null` | 业务类型标识（自定义） |
| `$accessControl` | `string` | `self::AUTHENTICATED_READ` | 文件 ACL 标签，默认 `AUTHENTICATED_READ` |

可能抛出：

- [Error](/php/api/foundation/exception/error) 未启用数据存储时抛出

### add()

```php
public function add($key, $sourceFileName = null, $saveFileName = null, $path = null, $size = null, $extension = null, $mimeType = null, $ownerId = null, $accessControl = self::AUTHENTICATED_READ, $disk = "local", $ref = null, $type = null, $width = null, $height = null)
```

仅登记文件元信息（不实际上传文件内容）

需先启用数据存储。适用于文件内容已在外部落盘、只需把元信息写库的场景；
同一文件键已存在时先物理删除再插入，保证幂等。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$key` | `string` | — | 文件键（唯一标识） |
| `$sourceFileName` | `string|null` | `null` | 原始文件名 |
| `$saveFileName` | `string|null` | `null` | 保存文件名 |
| `$path` | `string|null` | `null` | 文件目录路径 |
| `$size` | `int|null` | `null` | 文件大小（字节） |
| `$extension` | `string|null` | `null` | 扩展名 |
| `$mimeType` | `string|null` | `null` | MIME 类型 |
| `$ownerId` | `mixed|null` | `null` | 归属者 ID |
| `$accessControl` | `string` | `self::AUTHENTICATED_READ` | ACL 标签，默认 AUTHENTICATED_READ |
| `$disk` | `string` | `"local"` | 所属磁盘名，默认 local |
| `$ref` | `mixed|null` | `null` | 业务关联引用 |
| `$type` | `mixed|null` | `null` | 业务类型 |
| `$width` | `int|null` | `null` | 图片宽度 |
| `$height` | `int|null` | `null` | 图片高度 |

可能抛出：

- [Error](/php/api/foundation/exception/error) 未启用数据存储时抛出

### update()

```php
public function update($key, $data)
```

更新文件元信息

需先启用数据存储（否则抛 [Error](/php/api/foundation/exception/error)）。只更新 `FilesModel` 中该文件键对应的记录，
不改动磁盘上的实际文件；记录不存在时返回 403 错误态。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$key` | `string` | — | 文件键 |
| `$data` | `array` | — | 要更新的字段键值对（对应 `FilesModel` 字段） |

可能抛出：

- [Error](/php/api/foundation/exception/error) 未启用数据存储时抛出

### updateAccessControl()

```php
public function updateAccessControl($key, $val)
```

更新文件的 ACL 访问标签

便捷方法，等价于 `update` 仅传入 `access_control` 字段。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$key` | `string` | — | 文件键 |
| `$val` | `string` | — | ACL 标签（本类常量之一，如 `PRIVATE` / `PUBLIC_READ`） |

### delete()

```php
public function delete($key)
```

删除文件

启用数据存储时先删除数据库记录（`FilesModel`），再删除当前磁盘上的实际文件。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$key` | `string` | — | 文件键 |

### exists()

```php
public function exists($key)
```

判断文件是否存在

启用数据存储时先查数据库：数据库无记录则直接返回 false；
有记录（或未启用数据存储）时，再向当前磁盘确认实际文件是否存在。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$key` | `string` | — | 文件键 |

### url()

```php
public function url($fileKey)
```

生成文件访问地址

返回 `StorageURL`（延迟构建）：此处**只记录参数、不拼字符串也不签发签名**，
直到 `StorageURL::toString`（或把对象当字符串用）时才真正构建。
因而可以在拿到对象后继续用链式方法调整参数，最终签名会覆盖全部参数：

```php
$url = $storage->url($fileKey)->expires(600)->withSignature(true)->action("preview");
$url->urlParams(["v" => 2]);   // 构建前增改都安全
echo $url;                     // 此时才签发
```

拼装规则为 `{baseURL}/{prefix}/{fileKey}`，指向**本应用文件路由**的中转地址
（请求先落到本站控制器，可叠加快照鉴权与访问控制）；需要「不经本站」的地址请用 `direct`。

签名与动作绑定的细节见 `StorageURL`：仅当**已开启签名鉴权**（`auth`）且
`$withSignature` 为真时才签发；按动作校验的端点（`info` / `preview` / `download` /
`delete` / `update` / `upload`）必须传 `$action`，否则以「缺少参数」（`verifyAuth:403001`）被拒。

```php
$url = $storage->url($fileKey)->expires(600)->withSignature(true)->action("preview");
$url->urlParams(["v" => 2]);   // 构建前增改都安全
echo $url;                     // 此时才签发
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$fileKey` | `string` | — | 文件键（可含相对目录，如 "dir/a.jpg"）；**不做 urlencode**，特殊字符需调用方先行编码 |

### direct()

```php
public function direct($fileKey, $urlParams = [], $expires = 1800, $withSignature = true)
```

获取文件的直连地址（由当前磁盘直接给出，不经过本应用中转）

与 [URL](/php/api/foundation/http/url) 的关键区别在于**请求落在哪里**：
- [URL](/php/api/foundation/http/url) 返回 `{baseURL}/{prefix}/{fileKey}`，指向本应用的文件路由，请求先落到本应用
（由控制器读磁盘再输出），因此能叠加本应用的签名鉴权（`auth`）与访问控制（`accessControl`）；
- 本方法委托 `AbstractStorage::url` 直接向磁盘取地址：远程磁盘（COS / OSS）返回
可直接访问的**带签名原生 URL**，本地磁盘返回**文件系统路径**，FTP 磁盘返回 FTP 地址。

**安全提示**：直连地址**绕开了本应用的签名校验与 ACL 判定**，访问权限由磁盘自身决定
（远程磁盘取决于其 URL 签名与桶 / 对象 ACL，本地磁盘取决于文件系统权限）。
因此它适合在内部 / 可信场景下直接取用存储地址，不适合替代 [URL](/php/api/foundation/http/url) 对外暴露受控文件。

另注意：本地磁盘返回的是文件系统路径而非可访问 URL，本方法**原样返回**不做回退；
需要「总能访问的 URL」请用 [URL](/php/api/foundation/http/url)。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$fileKey` | `string` | — | 文件键 |
| `$urlParams` | `array` | `[]` | 附加 URL 参数（参与磁盘侧签名，如 COS 的图片处理参数；本地 / FTP 磁盘忽略） |
| `$expires` | `int` | `1800` | 磁盘签名有效期（秒），默认 1800（仅远程磁盘生效） |
| `$withSignature` | `boolean` | `true` | 是否带磁盘签名，默认 true；传 false 得到公开地址（需桶为公共读） |

### createAuthParams()

```php
public function createAuthParams($key, $expires = 600, $urlParams = [], $headers = [], $httpMethod = "get", $action = null)
```

生成文件访问的授权参数（URL query 形式）

委托 `StorageSignature::createAuthorization` 签发，供私有文件的 URL 附加
「限时效 + 防篡改」的鉴权参数。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$key` | `string` | — | 文件键 |
| `$expires` | `int` | `600` | 签名有效期（秒），默认 600 |
| `$urlParams` | `array` | `[]` | 参与签名的 URL 参数 |
| `$headers` | `array` | `[]` | 参与签名的请求头 |
| `$httpMethod` | `string` | `"get"` | 参与签名的 HTTP 方法，默认 get |
| `$action` | `string|null` | `null` | 动作标识（如 preview / download / info）；传入才会写入 `action` 参数并参与签名 |

可能抛出：

- [Error](/php/api/foundation/exception/error) $key 为空时抛出

### verifySignature()

```php
public function verifySignature($fileKey, $rawURLParams, $rawHeaders = [], $httpMethod = "get", $action = null)
```

校验文件访问签名

从请求参数中取出签名相关字段（sign-algorithm / sign-time / key-time / header-list /
signature / url-param-list，限定动作时还有 action），先校验算法与时效
（sign-time 与 key-time 须一致且未过期），再委托
`StorageSignature::verifyAuthorization` 比对签名。
任一环节不通过即返回错误态，全部通过返回 true。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$fileKey` | `string` | — | 文件键 |
| `$rawURLParams` | `array` | — | 原始 URL query 参数（含签名参数） |
| `$rawHeaders` | `array` | `[]` | 原始请求头（参与签名的部分） |
| `$httpMethod` | `string` | `"get"` | 请求方法 |
| `$action` | `string|array|null` | `null` | 允许的动作：**字符串**为精确匹配（忽略大小写），**数组**为允许集合 |

### verifyRequestSignature()

```php
public function verifyRequestSignature($key, $silent = false, $action = null)
```

从当前 HTTP 请求提取参数并校验文件签名

未启用签名鉴权（`$authEnabled`）时直接放行返回 true；否则从当前请求的
query / header / method 取参数，转交 `verifySignature` 校验。
$silent 为 true 时改为返回错误状态码（`$this->errorStatusCode`）而非错误态，
供 `checkAccessControl` 判定使用。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$key` | `string` | — | 文件键 |
| `$silent` | `boolean` | `false` | 是否静默模式：仅返回状态码而非错误态，默认 false |
| `$action` | `string|array|null` | `null` | 允许的动作（字符串=精确匹配 / 数组=允许集合 / null=不限制）， |

### authorizeOperation()

```php
public function authorizeOperation($fileKey, $operation = "read", $action = null)
```

校验对指定文件执行操作（读 / 写）的授权

授权编排入口，按是否启用数据存储分两条路：
- **启用数据存储**：从库中取文件的归属者与 ACL 标签；当前认证者即归属者则放行，
否则交 `checkAccessControl` 按 ACL 判定；
- **未启用数据存储**：退化为只校验请求签名（`verifyRequestSignature`）。

取库中记录时以 `addSelect("owner_id", "access_control")` 只取这两列，随后按**数组下标**读取
（`$file['owner_id']` / `$file['access_control']`），因此要求文件模型返回数组形态的行
（DiscuzX 侧模型满足）。记录不存在返回 404，ACL / 签名不通过返回 403。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$fileKey` | `string` | — | 文件键 |
| `$operation` | `string` | `"read"` | 操作类型：read 或 write，默认 read |
| `$action` | `string|array|null` | `null` | 允许的动作（字符串=精确匹配 / 数组=允许集合 / null=不限制）， |

### checkAccessControl()

```php
public function checkAccessControl($fileKey, $authTag, $ownerId, $operation = "read", $action = null)
```

基于 ACL 标签判定操作是否被允许

仅在启用数据存储（`$dataSave`）且启用访问控制（`$accessControlEnabled`）时生效，否则一律放行。
判定规则：
- 访问者与文件归属者相同 → 放行；
- 归属者不同且标签为 `PRIVATE` → 拒绝；
- `AUTHENTICATED_READ` / `AUTHENTICATED_READ_WRITE`：认证用户允许；
只读标签配写操作 → 拒绝；其余情形转为校验请求签名；
- `PUBLIC_READ` / `PUBLIC_READ_WRITE`：公开；只读标签配写操作 → 拒绝。

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$fileKey` | `string` | — | 文件键 |
| `$authTag` | `string` | — | ACL 标签（本类常量之一） |
| `$ownerId` | `mixed` | — | 文件归属者 ID |
| `$operation` | `string` | `"read"` | 操作类型：read 或 write，默认 read |
| `$action` | `string|array|null` | `null` | 允许的动作，透传给 `verifyRequestSignature` |

## 非公开方法

**protected**

- `protected function signature()` —— 文件访问签名器（懒建）
- `protected function files()` —— 文件元信息表入口

## 同目录

- [FilesModel](/php/api/modules/storage/files-model)
- [Storage](/php/api/modules/storage/storage)
- [StorageFile](/php/api/modules/storage/storage-file)
- [StorageProvider](/php/api/modules/storage/storage-provider)
- [StorageSignature](/php/api/modules/storage/storage-signature)
- [StorageURL](/php/api/modules/storage/storage-url)

