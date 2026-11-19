# KTabs 标签页

> 共同约定见 [共同约定](./index.md)。P4 导航批。`KTabs` + `KTabPane` 组合；支持 line / card、四向位置、受控切换、禁用与关闭。

## 何时使用

- 同级内容分组切换，保持页面上下文；
- 需要保留非激活面板状态（面板用 `v-show`，不销毁）。

## 代码演示

<Demo path="tabs/basic" title="基础 / 可关闭 / 禁用" :desc="['`v-model:active` 受控切换，值为 KTabPane 的 `name`（缺省取 vnode key）。', '`closable` 只触发 `close(key, index)`，移除由业务控制。', '`disabled` 页签不可选中，键盘导航自动跳过。']" />

<Demo path="tabs/card" title="卡片形态 / 尺寸 / 等分" :desc="['`type=&quot;card&quot;` 卡片形态，激活项与内容区同底。', '`size` 三档：sm / md / lg。', '`stretch` 页签等分铺满；`centered` 居中。']" />

<Demo path="tabs/placement" title="四向位置" :desc="['`placement` 支持 top / bottom / left / right；left / right 时导航纵向排列。', '可与 line / card 组合。']" />

<Demo path="tabs/custom" title="自定义标题 / 导航扩展" :desc="['`#label` 作用域插槽覆盖每个页签标题，scope 提供 `item`、`index`、`active`。', '`#extra` 在导航尾部放操作区。']" />

## API

### KTabs Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model:active | 当前页签 key | `string \| number` | 第一个可用页签 |
| type | 外观 | `'line' \| 'card'` | `'line'` |
| placement | 导航位置 | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| centered | 导航居中 | `boolean` | `false` |
| stretch | 页签等分铺满 | `boolean` | `false` |
| classNames | 部件类名（`root / nav / tab / tabActive / close / content / extra`） | `Partial<Record<Part, string>>` | — |
| styles | 部件内联样式（同上） | `Partial<Record<Part, CSSProperties>>` | — |

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

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | `KTabPane` 列表 |
| label | KTabs：自定义标题，scope `{ item, index, active }` |
| extra | KTabs：导航尾部扩展内容 |

### 部件

`root` / `nav` / `tab` / `close` / `content` / `extra`；面板为 `KTabPane` 根节点（`role="tabpanel"`）。

## 注意事项

- `KTabPane` 必须是 `KTabs` 的直接子节点（支持 `v-for` / `<template>` 片段）；其它节点会被忽略。
- 非激活面板保留 DOM（`v-show`），切回时表单输入等状态不丢失。
- 键盘：左右方向键（left / right 位置时为上下）循环切换并跳过禁用项；Home / End 跳到首尾；Enter / Space 选中。
- 激活页签 `tabindex=0`，其余为 -1，符合 ARIA tabs 漫游焦点约定；面板带 `aria-labelledby`。
- `close` 不会自动删除页签；删除当前页签后，组件自动回退到第一个可用页签。
- `type="card"` 的四向位置均可用，激活项与内容区同底以避免接缝。