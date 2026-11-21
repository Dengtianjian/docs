# KFloatingBubble 悬浮气泡 / KFloatingPanel 悬浮面板

> 共同约定见 [共同约定](./index.md)。P9 移动端专项。可拖拽吸附悬浮球与底部悬浮面板。

## 何时使用

- 客服、反馈、快捷入口常驻悬浮球；
- 复杂筛选、快捷设置从底部浮起；
- 需要拖动位置并吸附屏幕边缘。

## 代码演示

<Demo path="floating/bubble" title="可拖拽气泡" :desc="['`v-model:position` 控制坐标，拖拽后松手吸附左右边缘。', '`axis` 限制拖动方向，`magnetic` 控制吸附。', '拖动不会误触点击，`click` 仅轻触时派发。']" />

<Demo path="floating/panel" title="悬浮面板" :desc="['`v-model:open` 控制显隐，`height` 固定面板高度。', '带拖拽把手视觉、安全区与底部插槽。', '`closeOnMask` 与 Esc 均可关闭。']" />

## API

### KFloatingBubble Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| position | 坐标（`v-model:position`） | `{ x, y } \| null` | 右下默认位 |
| size | 直径（px） | `number` | `56` |
| gap | 屏幕边距 | `number` | `12` |
| axis | 拖动轴 | `'both' \| 'x' \| 'y'` | `'both'` |
| magnetic | 吸附左右边缘 | `boolean` | `true` |
| draggable | 可拖拽 | `boolean` | `true` |
| badge | 角标 | `string \| number` | — |
| ariaLabel | 无障碍名称 | `string` | `'悬浮按钮'` |
| disabled | 禁用 | `boolean` | `false` |
| classNames / styles | 部件：`root / badge` | — | — |

事件：`click / dragStart / dragEnd / update:position`；暴露 `reset()`。

### KFloatingPanel Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| open | 是否打开（`v-model:open`） | `boolean` | `false` |
| title | 标题 | `string` | — |
| height | 高度 | `number \| string` | `320` |
| closable | 关闭按钮 | `boolean` | `true` |
| closeOnMask | 遮罩关闭 | `boolean` | `true` |
| mask | 显示遮罩 | `boolean` | `true` |
| round / safeArea | 圆角 / 安全区 | `boolean` | true |
| zIndex | 层级 | `number` | 主题弹层层级 |
| ariaLabel | 无障碍名称 | `string` | 标题 |
| classNames / styles | 部件：`root / header / title / body / footer` | — | — |

### Slots

`KFloatingBubble`：default；`KFloatingPanel`：default / header / footer。

### Events

`KFloatingPanel`：`close` / `opened` / `update:open`。