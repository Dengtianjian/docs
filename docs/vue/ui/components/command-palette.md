# KCommandPalette 命令面板

> 共同约定见 [共同约定](./index.md)。P7 数据与导航。全局搜索 / 命令执行浮层，支持分组、模糊匹配、快捷键与完整键盘导航。

## 何时使用

- 应用内快速跳转页面、执行高频操作的入口；
- 需要 `⌘ / Ctrl + K` 这类全局唤起体验；
- 命令较多，需要分组与关键词检索。

## 代码演示

<Demo path="command-palette/basic" title="基础命令面板" :desc="['`v-model:open` 控制显隐，`items` 按 `group` 自动分组。', '支持 `shortcut` 展示快捷键、`keywords` 参与搜索。', '`select` 在点击或回车执行时派发。']" />

<Demo path="command-palette/hotkey" title="全局快捷键与自定义项" :desc="['`hotkey=&quot;mod+k&quot;` 注册全局唤起（Mac 为 ⌘K，其他平台 Ctrl+K）。', '搜索支持子序列匹配，`kbt` 可以命中 `KButton`。', '`#item` 作用域 `{ item, active, query }` 自定义行渲染。']" />

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
| classNames / styles | 部件：`root / header / input / list / groupLabel / item / itemIcon / label / description / shortcut / loading / empty / footer` | — | — |

### KCommandPaletteItem

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| key | 唯一键 | `string \| number` |
| label | 主文本 | `string` |
| group | 分组 | `string` |
| description | 描述 | `string` |
| keywords | 额外搜索词 | `string[]` |
| shortcut | 快捷键文案 | `string` |
| disabled | 禁用 | `boolean` |
| icon | 图标组件 | `Component` |

### Slots

| 插槽名 | 说明 | 作用域 |
| --- | --- | --- |
| header | 替换搜索头 | — |
| item | 自定义命令项 | `{ item, active, query }` |
| icon | 自定义图标 | `{ item }` |
| empty | 空态 | `{ query }` |
| footer | 底栏 | `{ count }` |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| select | 执行命令 | `item` |
| search | 搜索词变化 | `query` |
| close | 关闭 | — |

### 暴露方法

`open()` / `close()` / `focus()`。

### 键盘

`↑ / ↓` 移动，`Home / End` 首尾，`Enter` 执行，`Esc` 关闭；`hotkey` 指定全局组合键。