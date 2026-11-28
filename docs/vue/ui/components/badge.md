# KBadge 徽标

> 共同约定见 [共同约定](./index.md)。P3 数据展示批。数字/圆点/状态徽标，可包裹任意元素或独立展示。

## 何时使用

- 图标、头像、按钮右上角的未读数或状态提示；
- 表示状态点 + 文案（`color + text`）。

## 代码演示

<Demo path="badge/basic" title="数字 / 圆点 / 状态 / 包裹" :desc="['`count` 超过 `max` 显示 `99+`。', '`showZero` 显示 0。', '`dot` 只显示圆点。', '`color + text` 展示状态点与文案。', '`color` 统一走语义预设或 16 进制：计数模式作底色，状态模式作圆点色。']" />

<Demo path="badge/placements" title="九宫格方位" :desc="['`placement` 九值，徽标中心对准对应角/边/中心。', '`offset` 在方位基础上继续叠加 `[x, y]`。', '默认 `top-end`（右上角）。']" />

<Demo path="badge/pulse" title="呼吸动画" :desc="['`pulse` 在计数与状态圆点上叠加呼吸光环。', '光环颜色跟随徽标颜色（预设或 16 进制）。']" />

<Demo path="badge/transition" title="显示 / 隐藏动画" :desc="['计数、圆点、状态点显隐时淡入并缩放。', '尊重 `prefers-reduced-motion`：减弱动态偏好下只保留透明度。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| count | 数字按 `max` 折叠；字符串原样展示 | `number \| string` | — |
| max | 数字上限 | `number` | `99` |
| dot | 只显示圆点 | `boolean` | `false` |
| showZero | count=0 时仍显示 | `boolean` | `false` |
| pulse | 呼吸动画（计数与状态圆点） | `boolean` | `false` |
| text | 状态模式文案；传 `text` 进入状态模式 | `string` | — |
| color | 统一定义颜色：`'success' \| 'processing' \| 'warning' \| 'error' \| 'default'` 或 `'#...'`；计数模式作底色，状态模式作圆点色 | `KBadgeColor` | — |
| placement | 九宫格方位 | `'top-start' \| 'top' \| 'top-end' \| 'start' \| 'center' \| 'end' \| 'bottom-start' \| 'bottom' \| 'bottom-end'` | `'top-end'` |
| offset | 在方位基础上额外偏移 `[x, y]`（px） | `[number, number]` | — |
| size | 尺寸 | `'sm' \| 'md'` | `'md'` |
| ariaLabel | 徽标读屏文案（包裹模式下建议传） | `string` | — |
| classNames | 部件类名（`root / count / text`） | `Partial<Record<Part, string>>` | — |
| styles | 部件内联样式（`root / count / text`） | `Partial<Record<Part, CSSProperties>>` | — |

<CommonProps />

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 被包裹的内容；不传则徽标独立展示 |
| count | 自定义计数内容 |
| render | 自定义渲染作用域插槽（整件替换） |

无事件。

## 注意事项

- 显隐动画：计数 / 圆点 / 状态点进入与离开时 180ms 淡入淡出 + 缩放；`prefers-reduced-motion: reduce` 下只保留透明度。
- 呼吸动画：`pulse` 用光环扩散循环（1.6s），不改变位置，九宫格方位与 `offset` 不受影响；减弱动态偏好下关闭。
- 状态模式触发：传 `text`，或（不包裹内容且无计数时）只传 `color` 显示独立圆点。
- 计数模式不传 `color` 时底色为语义危险色（`--k-color-error`）。
- 包裹模式下计数用绝对定位，父元素建议有明确尺寸；独立模式自动转为静态布局。
- 方位按「徽标中心对准包裹元素的角/边/中心」定位，默认 `top-end`；圆球会有一半压在元素外，需要完全外置时用 `offset` 再推。
- 纯装饰徽标不读屏；需要播报时传 `ariaLabel`（如「5 条未读」）。