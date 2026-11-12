# ResponseView

`kernel\Foundation\HTTP\Response\ResponseView`  ·  class

源码：`gstudio_kernel/Foundation/HTTP/Response/ResponseView.php`

## 声明

```php
class ResponseView extends Response
```

父类：[Response](/php/api/foundation/http/response)

## 属性

| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `static $layoutContext` | `array|null` | `null` | 布局渲染上下文（layout 包裹的页面文件与数据），用于 inject() 取回 |

## 受保护 / 私有属性

| 属性 | 类型 | 可见性 | 说明 |
|---|---|---|---|
| `$viewFilePath` | `mixed` | protected | — |
| `$viewFileBaseDir` | `mixed` | protected | — |
| `$templateId` | `mixed` | protected | — |

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 响应视图类，构建函数渲染的是页面，相当于调用了page函数 |
| [`page()`](#page) | 渲染页面 |
| [`layout()`](#layout) | 布局渲染 |
| [`getBody()`](#getbody) | 获取渲染的配置信息 |
| [`output()`](#output) | — |
| [`render()`](#render) | 渲染模板 |
| [`renderAppPage()`](#renderapppage) | 渲染App的模板，模板文件相对于当前运行的应用根目录 |
| [`inject()`](#inject) | 注入到布局模板内 用于layout方法使用的模板文件内，用layout方法使用的模板内直接调用该方法即可 |
| [`section()`](#section) | 渲染模板组件 |

### __construct()

```php
public function __construct($viewFile, $viewData = [], $viewFileBaseDir = "Views", $templateId = "page", $viewFileDir = null)
```

响应视图类，构建函数渲染的是页面，相当于调用了page函数

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$viewFile` | `string` | — | 渲染的视图文件，相对于$viewFileBaseDir目录 |
| `$viewData` | `array` | `[]` | 渲染的数据 |
| `$viewFileBaseDir` | `string|array` | `"Views"` | 视图文件所在的目录，相对于根目录 |
| `$templateId` | `string` | `"page"` | 模板ID，用于缓存模板 |
| `$viewFileDir` | `string|array` | `null` | 视图文件根目录，默认是基于Path::root()的，也就是当前项目的根目录，但是有时候可能需要渲染别的项目的视图文件，可通过该参数来修改 |

### page()

```php
public function page($viewFile, $viewData, $viewFileDirBaseProject = "Views", $templateId = "page", $viewFileDir = null)
```

渲染页面

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$viewFile` | `string` | — | 渲染的视图文件，相对于$viewFileBaseDir目录 |
| `$viewData` | `array` | — | 渲染的数据 |
| `$viewFileDirBaseProject` | `mixed` | `"Views"` | — |
| `$templateId` | `string` | `"page"` | 模板ID，用于缓存模板 |
| `$viewFileDir` | `string` | `null` | 视图文件根目录，默认是基于Path::root()的，也就是当前项目的根目录，但是有时候可能需要渲染别的项目的视图文件，可通过该参数来修改 |

### layout()

```php
public function layout($layout = null, $viewData = [], $fileBaseDir = "Views/Layout", $templateId = "layout")
```

布局渲染

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$layout` | `string` | `null` | 渲染的布局文件，相对于$viewFileBaseDir目录 |
| `$viewData` | `array` | `[]` | 渲染的数据 |
| `$fileBaseDir` | `string` | `"Views/Layout"` | 布局文件所在的目录，相对于根目录 |
| `$templateId` | `string` | `"layout"` | 模板ID，用于缓存模板 |

### getBody()

```php
public function getBody()
```

获取渲染的配置信息

### output()

```php
public function output()
```

### render()

```php
public static function render($viewFiles, $viewData = [])
```

渲染模板

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$viewFiles` | `string|string[]` | — | 渲染的模板文件绝对路径，或者字符串数组，里面存在渲染的模板文件绝对路径 |
| `$viewData` | `array` | `[]` | 渲染的数据 |

### renderAppPage()

```php
public static function renderAppPage($viewFiles, $viewFileBaseDir = "", $viewData = [], $templateId = "page")
```

渲染App的模板，模板文件相对于当前运行的应用根目录

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$viewFiles` | `string|string[]` | — | 渲染的模板文件名称（相对于$viewFileBaseDir），或者字符串数组，里面存在渲染的模板文件文件名称，都相对于$viewFileBaseDir值 |
| `$viewFileBaseDir` | `string` | `""` | 文件所在的文件夹，相对于当前运行的应用根目录 |
| `$viewData` | `array` | `[]` | 渲染的数据 |
| `$templateId` | `string` | `"page"` | 模板ID |

### inject()

```php
public static function inject()
```

注入到布局模板内 用于layout方法使用的模板文件内，用layout方法使用的模板内直接调用该方法即可

### section()

```php
public static function section($viewFiles, $viewData = [], $viewFileBaseDir = "Views", $templateId = "section")
```

渲染模板组件

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$viewFiles` | `string|string[]` | — | 组件文件名（相对于$viewFileBaseDir值）或者组件文件名数组，也是相对于$viewFileBaseDir |
| `$viewData` | `array` | `[]` | 渲染组件所需数据 |
| `$viewFileBaseDir` | `string` | `"Views"` | 组件所在的文件夹，相对于项目根目录 |
| `$templateId` | `string` | `"section"` | 模板ID |

## 同目录

- [ResponseDownload](/php/api/foundation/http/response/response-download)
- [ResponseError](/php/api/foundation/http/response/response-error)
- [ResponseFile](/php/api/foundation/http/response/response-file)
- [ResponsePagination](/php/api/foundation/http/response/response-pagination)
- [ResponseProxy](/php/api/foundation/http/response/response-proxy)
- [ResponseRedirect](/php/api/foundation/http/response/response-redirect)
- [ServerSentEvent](/php/api/foundation/http/response/server-sent-event)

