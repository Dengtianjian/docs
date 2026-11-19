# KBreadcrumb 面包屑

> 共同约定见 [共同约定](./index.md)。P4 导航批。层级导航：`items` 数组或 `KBreadcrumbItem` 组合两种写法；分隔符可根级设置、单项覆盖。

## 何时使用

- 需要展示当前页面在层级结构中的位置；
- 提供向上层级的快捷跳转。

## 代码演示

<Demo path="breadcrumb/basic" title="基础 / items 数组 / 组合写法" :desc="['`items` 数组：`label` + `to` / `href`，最后一项缺省为当前页。', '`KBreadcrumbItem` 组合写法，`current` 显式标记当前页（渲染为纯文本 + `aria-current=&quot;page&quot;`）。', '`size` 三档：sm / md / lg。']" />

<Demo path="breadcrumb/separators" title="分隔符 / 图标 / 禁用" :desc="['根级 `separator` 接受字符串或图标组件。', '单项 `separator` 可覆盖根级设置。', '`disabled` 置灰且不可跳转；`href` 与 `to` 都支持。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 数组写法；与默认插槽二选一，最后一项缺省为当前页 | `KBreadcrumbItemOption[]` | — |
| separator | 分隔符：字符串或图标组件 | `string \| Component` | `'/'` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| classNames | 部件类名（`root / list`） | `Partial<Record<Part, string>>` | — |
| styles | 部件内联样式（`root / list`） | `Partial<Record<Part, CSSProperties>>` | — |

<CommonProps />

### KBreadcrumbItem Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 文字内容；也可用默认插槽 | `string` | — |
| to | 路由目标（优先于 href） | `RouteLocationRaw \| string` | — |
| href | 普通链接 | `string` | — |
| external | 外链：新窗口打开并补 `noopener noreferrer` | `boolean` | `false` |
| current | 当前页：纯文本 + `aria-current="page"` | `boolean` | `false` |
| disabled | 禁用：置灰且不可跳转 | `boolean` | `false` |
| separator | 单项分隔符，覆盖根级 | `string \| Component` | — |
| classNames | 部件类名（`item / separator / link / text`） | `Partial<Record<Part, string>>` | — |
| styles | 部件内联样式（`item / separator / link / text`） | `Partial<Record<Part, CSSProperties>>` | — |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | `KBreadcrumb`：`KBreadcrumbItem` 列表；`KBreadcrumbItem`：文字内容 |
| separator | `KBreadcrumbItem`：单项分隔符内容 |

### 部件

`root`（nav）/ `list`（ol）/ `item`（li）/ `separator` / `link` / `text`。

## 注意事项

- `current` 项不会渲染链接；数组写法自动把最后一项设为当前页。
- 首项的 separator 由 CSS 隐藏，DOM 中仍保留（`aria-hidden`），不影响读屏。
- 长文本单行省略；容器宽度不足时列表自动换行。
- 导航跳转走 `KLink`：`to` 需要 vue-router，`href` 走原生链接。