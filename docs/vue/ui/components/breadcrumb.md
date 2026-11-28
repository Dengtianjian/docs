# KBreadcrumb 面包屑

> 共同约定见 [共同约定](./index.md)。P4 导航批。层级导航：`items` 数组或 `KBreadcrumbItem` 组合两种写法；支持图标、子链接、前后插槽，分隔符可根级设置、单项覆盖。

## 何时使用

- 需要展示当前页面在层级结构中的位置；
- 提供向上层级的快捷跳转。

## 代码演示

<Demo path="breadcrumb/basic" title="基础 / items 数组 / 组合写法" :desc="['`items` 数组：`label` + `to` / `href`，最后一项缺省为当前页。', '`KBreadcrumbItem` 组合写法，`current` 显式标记当前页（渲染为纯文本 + `aria-current=&quot;page&quot;`）。', '`size` 三档：sm / md / lg。']" />

<Demo path="breadcrumb/separators" title="分隔符 / 图标 / 禁用" :desc="['根级 `separator` 接受字符串或图标组件。', '单项 `separator` 可覆盖根级设置。', '`disabled` 置灰且不可跳转；`href` 与 `to` 都支持。']" />

<Demo path="breadcrumb/icons" title="图标 / 纯图标项 / 子链接 / 当前项高亮" :desc="['`items` 每项支持 `icon`（组件），图标随文字取色。', '首项省略 `label`，用 `aria-label` 提供可读名称，形成纯图标导航项。', '`children` 生成一级子链接下拉（sm 尺寸）；有子导航的项显示 pointer，键盘可漫游，禁用子项会被跳过。', '非当前项灰色；当前项缺省正文黑色，`highlight-current` 开启后换主题色。']" />

<Demo path="breadcrumb/slots" title="前后插槽" :desc="['`#before` / `#after` 位于列表两侧，与列表的间距同为 `--k-breadcrumb-gap`。', '两侧使用相同的留白容器，视觉距离保持对称。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 数组写法；与默认插槽二选一，最后一项缺省为当前页 | `KBreadcrumbItemOption[]` | — |
| separator | 分隔符：字符串或图标组件 | `string \| Component` | `'/'` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| highlightCurrent | 当前项使用主题色；缺省正文黑色 | `boolean` | `false` |
| classNames | 部件类名（`root / list / before / after`） | `Partial<Record<Part, string>>` | — |
| styles | 部件内联样式（`root / list / before / after`） | `Partial<Record<Part, CSSProperties>>` | — |

<CommonProps />

### KBreadcrumbItem Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 文字内容；也可用默认插槽；纯图标项可省略 | `string` | — |
| ariaLabel | 纯图标或无文字项的可读名称 | `string` | — |
| icon | 文字前置图标组件 | `Component` | — |
| to | 路由目标（优先于 href） | `RouteLocationRaw \| string` | — |
| href | 普通链接 | `string` | — |
| external | 外链：新窗口打开并补 `noopener noreferrer` | `boolean` | `false` |
| current | 当前页：纯文本 + `aria-current="page"` | `boolean` | `false` |
| disabled | 禁用：置灰且不可跳转 | `boolean` | `false` |
| separator | 单项分隔符，覆盖根级 | `string \| Component` | — |
| children | 一级子链接下拉 | `KBreadcrumbChildLink[]` | — |
| classNames | 部件类名（`item / separator / link / text / icon`） | `Partial<Record<Part, string>>` | — |
| styles | 部件内联样式（同上） | `Partial<Record<Part, CSSProperties>>` | — |

### KBreadcrumbChildLink

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| key | 唯一标识 | `string \| number` |
| label | 子链接文字 | `string` |
| icon | 子链接图标组件 | `Component` |
| to | 路由目标（优先于 href） | `RouteLocationRaw \| string` |
| href | 普通链接 | `string` |
| external | 外链新窗口打开 | `boolean` |
| disabled | 禁用子链接 | `boolean` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| before | `KBreadcrumb`：列表前方内容 |
| default | `KBreadcrumb`：`KBreadcrumbItem` 列表；`KBreadcrumbItem`：文字内容 |
| after | `KBreadcrumb`：列表后方内容 |
| separator | `KBreadcrumbItem`：单项分隔符内容 |

### 部件

`root`（nav）/ `list`（ol）/ `before` / `after` / `item`（li）/ `separator` / `link` / `text` / `icon`。

## 注意事项

- `current` 项不会渲染链接；数组写法自动把最后一项设为当前页。
- 非当前项统一灰色；当前项缺省正文黑色，`highlight-current` 开启后使用主题色。
- 分隔符两侧间距对称；首项的 separator 由 CSS 隐藏，DOM 中仍保留（`aria-hidden`），不影响读屏。
- `children` 只展开一级子链接：弹层固定使用 KDropdown 的 `sm` 尺寸，默认悬停/触屏点按打开，选中后按 `to` / `href` 跳转；有子导航的项显示 pointer，禁用项为 not-allowed，禁用子项会被键盘跳过。
- 纯图标项省略 `label` 时必须提供 `aria-label`，读屏名称落在链接/文本节点上。
- 长文本单行省略；容器宽度不足时列表自动换行，行间距独立为 `--k-breadcrumb-row-gap`。
- 导航跳转走 `KLink`：`to` 需要 vue-router，`href` 走原生链接。