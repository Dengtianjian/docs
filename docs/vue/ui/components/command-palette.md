# KCommandPalette 命令面板

> 共同约定见 [共同约定](./index.md)。P7 数据与导航。全局搜索 / 命令执行浮层，支持分组、模糊匹配、快捷键与完整键盘导航。

## 何时使用

- 应用内快速跳转页面、执行高频操作的入口；
- 需要 `⌘ / Ctrl + K` 这类全局唤起体验；
- 命令较多，需要分组与关键词检索。

## 代码演示

<Demo path="command-palette/basic" title="基础命令面板" :desc="['`v-model:open` 控制显隐，`items` 按 `group` 自动分组。', '支持 `shortcut` 展示快捷键、`keywords` 参与搜索。', '`select` 在点击或回车执行时派发。']" />

<Demo path="command-palette/hotkey" title="全局快捷键与搜索" :desc="['`hotkey=&quot;mod+k&quot;` 注册全局唤起（Mac 为 ⌘K，其他平台 Ctrl+K）。', '搜索支持子序列匹配，`kbtn` 可以命中 `KButton`。', '`search` 事件可用于异步补全。']" />

<Demo path="command-palette/custom" title="自定义命令项" :desc="['`#item` 作用域 `{ item, active, query }` 完全接管每项渲染。', '`#empty` 自定义空态。', '`#footer` 放统计或提示信息。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| open | 是否打开（`v-model:open`） | `boolean` | `false` |
| items | 命令项 | `KCommandPaletteItem[]` | `[]` |
| placeholder | 输入占位 | `string` | `'搜索命令或页面…'` |
| emptyText | 空态文案 | `string` | `'没有可用的命令'` |
| closeOnSelect | 选择后关闭 | `boolean` | `true` |
| hotkey | 全局快捷键，如 `mod+k` | `string` | — |
| loading | 搜索加载态 | `boolean` | `false` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| ariaLabel | 无障碍名称 | `string` | `'命令面板'` |
| classNames / styles | 部件：`root / header / input / list / groupLabel / item / itemIcon / label / description / shortcut / empty / footer` | — | — |

### KCommandPaletteItem

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| key | 唯一键 | `string \| number` |
| label | 名称 | `string` |
| group | 分组名 | `string` |
| description | 描述 | `string` |
| icon | 图标组件 | `Component` |
| shortcut | 快捷键文本 | `string` |
| keywords | 额外搜索关键词 | `string[]` |
| disabled | 禁用 | `boolean` |
| action | 选中时执行 | `() => void` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| item | 自定义命令项，作用域 `{ item, active, query }` |
| empty | 空态 |
| header | 顶部搜索区整体替换 |
| footer | 底部 |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| update:open | 打开状态变化 | `boolean` |
| select | 执行命令 | `item` |
| search | 搜索词变化 | `query` |

<CommonProps />

## 注意事项

- 打开时自动聚焦输入框，关闭后焦点回到打开前的元素；`Esc` 关闭，`↑ / ↓` 循环选择，`Enter` 执行。
- 对话框使用 `role="dialog"` + `aria-modal`，输入框为 `combobox`，列表为 `listbox`，当前项通过 `aria-activedescendant` 关联。
- 热键解析支持 `mod / ctrl / alt / shift` 组合；`mod` 同时接受 Meta 与 Ctrl，兼容 Mac 与 Windows。
- 搜索为前端同步过滤：先按子串位置排序，再退回子序列匹配；数据量大时建议配合 `loading` 与业务侧异步结果替换 `items`。
- 弹层默认挂到 `ConfigProvider.popupContainer`（缺省 `body`），并继承作用域主题。
