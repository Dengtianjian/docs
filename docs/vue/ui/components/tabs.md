# KTabs 标签页

> 共同约定见 [共同约定](./index.md)。P4 导航批。`KTabs` + `KTabPane` 组合，或直接传 `items`；支持 line / card / simple、四向位置、滑动指示条、溢出滚动、受控切换、禁用与关闭、新增页签。

## 何时使用

- 同级内容分组切换，保持页面上下文；
- 需要保留非激活面板状态（面板用 `v-show`，不销毁）；
- 导航条放不下时自动出现辅助滚动按钮。

## 代码演示

<Demo path="tabs/basic" title="基础 / 可关闭 / 禁用" :desc="['`v-model:active` 受控切换，值为 KTabPane 的 `name`（缺省取 vnode key）。', '`closable` 只触发 `close(key, index)`，移除由业务控制。', '`disabled` 页签不可选中，键盘导航自动跳过。']" />

<Demo path="tabs/card" title="卡片形态 / 尺寸 / 等分" :desc="['`type=&quot;card&quot;` 卡片形态，每个页签之间留 4px 间距，激活项与内容区同底。', '`size` 三档：sm / md / lg。', '`stretch` 页签等分铺满；`centered` 居中。']" />

<Demo path="tabs/simple" title="简约形态 / items 模式 / 新增页签" :desc="['`type=&quot;simple&quot;` 无底线的文字页签，激活项下划线随切换滑动。', '不写 KTabPane，直接传 `items`，用 `#content` 渲染内容；非激活面板保留 DOM。', '`addable` 只提供 + 按钮并触发 `add`，列表由业务 push 后激活。']" />

<Demo path="tabs/scroll" title="溢出滚动 / 前缀后缀" :desc="['页签超出容器宽度时出现左右辅助滚动按钮（`scroll-buttons` 默认开启）。', '切换/程序设置激活项会自动滚入可视区。', '`#prefix` / `#suffix` 在页签两端放图标、计数等补充内容。']" />

<Demo path="tabs/align" title="导航左中右位置" :desc="['`align` 控制页签在导航内的位置：left / center / right；`centered` 等价于 center。', '仅在 top / bottom 且没有溢出时生效，溢出后从起始端开始滚动。']" />

<Demo path="tabs/placement" title="四向位置" :desc="['`placement` 支持 top / bottom / left / right；left / right 时导航纵向排列。', '可与 line / card 组合。']" />

<Demo path="tabs/custom" title="自定义标题 / 导航扩展" :desc="['`#label` 作用域插槽覆盖每个页签标题，scope 提供 `item`、`index`、`active`。', '`#extra` 在导航尾部放操作区。']" />

## API

### KTabs Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model:active | 当前页签 key | `string \| number` | 第一个可用页签 |
| type | 外观 | `'line' \| 'card' \| 'simple'` | `'line'` |
| placement | 导航位置 | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| align | 页签在导航内的位置（top / bottom 且未溢出时生效） | `'left' \| 'center' \| 'right'` | `'left'` |
| centered | 导航居中（等价 `align="center"`） | `boolean` | `false` |
| stretch | 页签等分铺满 | `boolean` | `false` |
| items | 不写 KTabPane 时直接传页签数据 | `KTabsItem[]` | — |
| addable | 显示“新增页签”按钮，点击触发 `add` | `boolean` | `false` |
| scrollButtons | 溢出时显示辅助滚动按钮 | `boolean` | `true` |
| classNames | 部件类名（`root / nav / scroller / list / tab / tabActive / close / content / extra / prefix / suffix / ink / add / scrollButton`） | `Partial<Record<Part, string>>` | — |
| styles | 部件内联样式（同上） | `Partial<Record<Part, CSSProperties>>` | — |

`KTabsItem`：`{ name?, key?, label?, icon?, disabled?, closable? }`；key 取 `name` → `key` → 序号。

<CommonProps />

### KTabPane Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 页签标题；也可用 KTabs 的 `#label` 插槽 | `VNodeChild` | — |
| name | 唯一标识；缺省使用 vnode key 或序号 | `string \| number` | — |
| icon | 标题左侧图标 | `Component` | — |
| disabled | 禁用页签 | `boolean` | `false` |
| closable | 显示关闭按钮 | `boolean` | `false` |
| classNames | 部件类名（`root`） | `Partial<Record<Part, string>>` | — |
| styles | 部件内联样式（`root`） | `Partial<Record<Part, CSSProperties>>` | — |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| update:active | 选中页签变化 | `key: string \| number` |
| change | 选中页签变化（与 update:active 同时触发） | `key: string \| number` |
| close | 点击关闭按钮（不自动移除） | `key: string \| number, index: number` |
| add | 点击“新增页签”按钮（不自动新增） | — |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | `KTabPane` 列表（与 `items` 二选一） |
| content | items 模式内容，scope `{ item, index, active }` |
| label | KTabs：自定义标题，scope `{ item, index, active }` |
| prefix | 页签起始位置补充内容 |
| suffix | 页签末尾补充内容 |
| extra | KTabs：导航尾部扩展内容 |

### 部件

`root` / `nav` / `scroller` / `list` / `tab` / `close` / `content` / `extra` / `prefix` / `suffix` / `ink` / `add` / `scrollButton`；面板为 `KTabPane` 根节点（`role="tabpanel"`）。

## 注意事项

- `KTabPane` 必须是 `KTabs` 的直接子节点（支持 `v-for` / `<template>` 片段）；其它节点会被忽略。
- 传了 `items` 时以 `items` 为准，默认插槽里的 `KTabPane` 会被忽略；items 模式的内容用 `#content` 渲染，面板同样保留 DOM。
- 非激活面板保留 DOM（`v-show`），切回时表单输入等状态不丢失。
- 键盘：左右方向键（left / right 位置时为上下）循环切换并跳过禁用项；Home / End 跳到首尾；Enter / Space 选中。
- 激活页签 `tabindex=0`，其余为 -1，符合 ARIA tabs 漫游焦点约定；面板带 `aria-labelledby`。
- `close` 不会自动删除页签；`add` 也不会自动新增，列表与激活项都由业务维护。
- `line` / `simple` 的激活指示条是一条滑动元素，切换时 0.2s 过渡；`card` 无指示条。
- 导航溢出时出现左右（left / right 位置为上下）辅助滚动按钮；激活项会自动滚入可视区。
- `align` 只在 top / bottom 且未溢出时生效；溢出后从起始端开始，由滚动按钮/滚动条浏览。
- `type="card"` 的四向位置均可用，每个卡片之间留 4px 间距，激活项与内容区同底以避免接缝。