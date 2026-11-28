# DiscuzView

`kernel\Discuz\Foundation\DiscuzView`  ·  class

源码：`gstudio_kernel/Discuz/Foundation/DiscuzView.php`

## 声明

```php
class DiscuzView extends ResponseView
```

父类：[ResponseView](/php/api/foundation/http/response/response-view)

## 方法一览

| 方法 | 说明 |
|---|---|
| [`__construct()`](#__construct) | 响应视图类，构建函数渲染的是页面，相当于调用了page函数 |
| [`generateTemplatePath()`](#generatetemplatepath) | — |
| [`page()`](#page) | — |
| [`layout()`](#layout) | — |
| [`render()`](#render) | — |
| [`renderAppPage()`](#renderapppage) | — |
| [`hook()`](#hook) | — |

### __construct()

```php
public function __construct($viewFile, $viewData = [], $viewFileBaseDir = "Views", $templateId = "page", $viewFileDir = null)
```

响应视图类，构建函数渲染的是页面，相当于调用了page函数

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$viewFile` | `string` | — | 渲染的视图文件，相对于$viewFileBaseDir目录 |
| `$viewData` | `array` | `[]` | 渲染的数据 |
| `$viewFileBaseDir` | `string` | `"Views"` | 视图文件所在的目录，相对于根目录 |
| `$templateId` | `string` | `"page"` | 模板ID，用于缓存模板 |
| `$viewFileDir` | `string` | `null` | 视图文件根目录，默认是基于Path::root()的，也就是当前项目的根目录，但是有时候可能需要渲染别的项目的视图文件，可通过该参数来修改 |

### generateTemplatePath()

```php
public static function generateTemplatePath($viewFile, $templateId, $viewFileDirBaseProject, $viewFileDir = null)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$viewFile` | `mixed` | — | — |
| `$templateId` | `mixed` | — | — |
| `$viewFileDirBaseProject` | `mixed` | — | — |
| `$viewFileDir` | `mixed` | `null` | — |

### page()

```php
public function page($viewFile, $viewData, $viewFileDirBaseProject = "Views", $templateId = "page", $viewFileDir = null)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$viewFile` | `mixed` | — | — |
| `$viewData` | `mixed` | — | — |
| `$viewFileDirBaseProject` | `mixed` | `"Views"` | — |
| `$templateId` | `mixed` | `"page"` | — |
| `$viewFileDir` | `mixed` | `null` | — |

### layout()

```php
public function layout($layout = null, $viewData = [], $fileBaseDir = "Views/Layout", $templateId = "layout")
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$layout` | `mixed` | `null` | — |
| `$viewData` | `mixed` | `[]` | — |
| `$fileBaseDir` | `mixed` | `"Views/Layout"` | — |
| `$templateId` | `mixed` | `"layout"` | — |

### render()

```php
public static function render($viewFiles, $viewData = [], $returnName = null)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$viewFiles` | `mixed` | — | — |
| `$viewData` | `mixed` | `[]` | — |
| `$returnName` | `mixed` | `null` | — |

### renderAppPage()

```php
public static function renderAppPage($viewFiles, $viewFileBaseDir = "", $viewData = [], $templateId = "page", $returnName = null)
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$viewFiles` | `mixed` | — | — |
| `$viewFileBaseDir` | `mixed` | `""` | — |
| `$viewData` | `mixed` | `[]` | — |
| `$templateId` | `mixed` | `"page"` | — |
| `$returnName` | `mixed` | `null` | — |

### hook()

```php
public static function hook($viewFiles, $viewData, $returnName = "return")
```

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `$viewFiles` | `mixed` | — | — |
| `$viewData` | `mixed` | — | — |
| `$returnName` | `mixed` | `"return"` | — |

## 同目录

- [DiscuzApp](/php/api/discuzx/foundation/discuz-x-app)
- [DiscuzController](/php/api/discuzx/foundation/discuz-x-controller)
- [DiscuzDeployment](/php/api/discuzx/foundation/discuz-x-deployment)
- [DiscuzGBKJsonResponse](/php/api/discuzx/foundation/discuz-xgbk-json-response)
- [DiscuzHookApp](/php/api/discuzx/foundation/discuz-x-hook-app)
- [DiscuzLang](/php/api/discuzx/foundation/discuz-x-lang)
- [DiscuzPath](/php/api/discuzx/foundation/discuz-x-path)
- [DiscuzResponse](/php/api/discuzx/foundation/discuz-x-response)

