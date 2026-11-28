# KFloatingBubble 悬浮气泡 / KFloatingPanel 悬浮面板

> 共同约定见 [共同约定](./index.md)。P9 移动端专项。可拖拽吸附悬浮球与底部悬浮面板。

## 何时使用

- 客服、反馈、快捷入口常驻悬浮球；
- 复杂筛选、快捷设置从底部浮起；
- 需要拖动位置并吸附屏幕边缘。

## 代码演示

<Demo path="floating/bubble" title="可拖拽气泡" :desc="['`v-model:position` 控制坐标，拖拽后松手吸附左右边缘。', '`axis` 限制拖动方向，`magnetic` 控制吸附。', '拖动不会误触点击，`click` 仅轻触时派发。']" />

<Demo path="floating/panel" title="悬浮面板" :desc="['`v-model:open` 控制显隐，`height` 固定面板高度。', '带拖拽把手视觉、安全区与底部插槽。', '`closeOnMask` 与 Esc 均可关闭。']" />

<Demo path="floating/draggable" title="拖拽锚点面板" :desc="['`draggable` 开启后，`height` 作为初始高度，`anchors` 为可停靠档位。', '手柄命中区放大到 28px 高；默认手柄与整条头部都可拖拽，开启 `dragHandleOnly` 后仅手柄可拖。', '不传 `anchors` 时默认两档：初始高度与 85vh；内容仍可滚动。', '`:mask=&quot;false&quot;` 时遮罩层不再拦截页面点击，适合地图类常驻面板。', '`@height-change` 实时给出高度与是否吸附中；按钮演示 `setHeight()`。']" />

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
| height | 高度；`draggable` 时作为初始高度 | `number \| string` | `320` |
| draggable | 开启锚点拖拽 | `boolean` | `false` |
| anchors | 可停靠高度（px）；缺省 `[height, 85vh]` | `number[]` | — |
| contentDraggable | 内容区也可触发拖拽；默认只拖把手 / 头部 | `boolean` | `false` |
| dragHandleOnly | 仅手柄可拖拽；关闭时整条头部也可拖 | `boolean` | `false` |
| closable | 关闭按钮 | `boolean` | `true` |
| closeOnMask | 遮罩关闭 | `boolean` | `true` |
| mask | 显示遮罩；`false` 时遮罩层不拦截页面点击 | `boolean` | `true` |
| round / safeArea | 圆角 / 安全区 | `boolean` | true |
| zIndex | 层级 | `number` | 主题弹层层级 |
| ariaLabel | 无障碍名称 | `string` | 标题 |
| classNames / styles | 部件：`root / header / title / body / footer` | — | — |

### Slots

`KFloatingBubble`：default；`KFloatingPanel`：default / header / footer。

### Events

`KFloatingPanel`：`close` / `opened` / `heightChange(height, animating)` / `update:open`。

### Expose

`KFloatingPanel`：`close()`、`panel`、`setHeight(height, { immediate? })`。

### 拖拽与锚点

- `anchors` 会排序去重；实际高度限制在最小 / 最大锚点之间。
- 拖拽结束按最近锚点吸附；快速滑动会带一点速度惯性。
- 默认只响应把手 / 头部拖拽；开启 `dragHandleOnly` 后标题、关闭钮所在的头部不再触发拖拽，仅手柄可拖。
- 开启 `contentDraggable` 后，未到最高档时内容区也可拖动，最高档把上滑留给内容滚动。
- 手柄命中区为整条 28px 高区域，视觉条 `44 × 4px`；头部命中区仍随标题区域。
- 最小高度会按“手柄 + 头部 + footer”动态抬升，收齐时 footer 始终留在面板内，不会被挤到视口外。
- 面板聚焦时可用 `Home / End / ↑ / ↓` 在锚点间切换；输入框、按钮等交互元素内的按键不劫持。
- `mask=false` 时遮罩层为 `pointer-events: none`，页面可继续操作，`closeOnMask` 不再生效。
- PC（≥768px）默认最大宽 `420px` 且保持贴底；可用 `--k-floating-panel-max-width` 覆盖。