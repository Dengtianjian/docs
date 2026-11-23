# KActionSheet 操作面板

> 共同约定见 [共同约定](./index.md)。P9 移动端专项。底部操作面板，支持列表 / 宫格两种布局；`KShareSheet` 为分享宫格预设。

## 何时使用

- 移动端“更多操作”、删除确认、分享渠道；
- 需要底部滑入、安全区与取消按钮；
- 分享面板需要 4 列图标宫格。

## 代码演示

<Demo path="action-sheet/basic" title="列表操作面板" :desc="['`v-model:open` 控制显隐，`actions` 渲染列表项。', '`cancelText` 生成取消按钮，`closeOnMask` 控制遮罩关闭。', '`select` 派发操作项，危险项可通过 `color` 标红。']" />

<Demo path="action-sheet/share" title="分享宫格" :desc="['`KShareSheet` 固定 `layout=&quot;grid&quot;`，默认标题“分享到”。', '`columns` 控制列数，`#icon` 自定义渠道图标。', '取消与遮罩关闭都会派发 `cancel`。']" />

## API

### KActionSheet Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| actions | 操作项 | `KActionSheetAction[]` | `[]` |
| title / description | 标题 / 描述 | `string` | — |
| layout | 布局 | `'list' \| 'grid'` | `'list'` |
| columns | 宫格列数 | `number` | `4` |
| cancelText | 取消按钮文案，空字符串隐藏 | `string` | `'取消'` |
| closeOnMask | 点击遮罩关闭 | `boolean` | `true` |
| safeArea | 底部安全区 | `boolean` | `true` |
| width | 宽度覆盖；缺省最大宽 `420px` | `number \| string` | — |
| ariaLabel | 无障碍名称 | `string` | 标题 |
| classNames / styles | 部件：`root / header / title / description / actions / action / actionIcon / actionLabel / actionDescription / cancel` | — | — |

### KActionSheetAction

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| key | 唯一键 | `string \| number` |
| label | 文本 | `string` |
| description | 描述 | `string` |
| icon | 图标组件 | `Component` |
| color | 文本颜色 | `string` |
| disabled | 禁用 | `boolean` |

### v-model

`open: boolean`

### Slots

| 插槽名 | 说明 | 作用域 |
| --- | --- | --- |
| header | 自定义头部 | — |
| actions | 接管操作区 | `{ select }` |
| icon | 自定义图标 | `{ action }` |
| footer | 取消按钮上方内容 | — |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| select | 选择操作 | `action` |
| cancel | 取消 / 遮罩关闭 | — |
| close | 面板关闭 | — |

### KShareSheet

Props 与 KActionSheet 相同；额外默认 `layout="grid"`、`title="分享到"`。透传全部属性与插槽。

## PC 端宽度

- 默认 `width: min(100%, 420px)`：移动端占满，PC 端缩窄并水平居中。
- `width` prop 直接覆盖；也可用 `--k-action-sheet-max-width` 修改默认上限。
- 视口 ≥ 768px 时只收窄到 420px，仍保持贴底与上圆角。