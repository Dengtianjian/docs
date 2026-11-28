# KBorderBeam 边框光束

> 共同约定见 [共同约定](./index.md)。P8 增强件。沿圆角边框循环移动的渐变光束。

## 何时使用

- AI 生成中、实时运行中等需要强调“活跃”状态的卡片；
- 营销区块、重点推荐的视觉点缀；
- 不希望改变内容布局的轻量动效。

## 代码演示

<Demo path="border-beam/basic" title="基础光束" :desc="['光束由 conic-gradient 与 mask 合成，不占布局。', '`size` 控制描边宽度，`duration` 控制一圈时长。', '内容保持可交互。']" />

<Demo path="border-beam/custom" title="颜色、圆角与暂停" :desc="['`color` 接受单色或 `[起色, 止色]`。', '`radius` 支持数字或任意 CSS 长度，`999` 为胶囊。', '`paused` 暂停动画但保留静态光束；`active=false` 才隐藏光束。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| active | 是否显示光束 | `boolean` | `true` |
| paused | 是否暂停动画（保留静态光束） | `boolean` | `false` |
| size | 光束宽度（px） | `number` | `2` |
| duration | 一圈时长（秒） | `number` | `6` |
| color | 单色或双色渐变 | `string \| [string, string]` | 主题主色 → 成功色 |
| background | 内容背景 | `string` | `var(--k-color-bg-container)` |
| radius | 圆角 | `number \| string` | `var(--k-border-radius-lg)` |
| classNames / styles | 部件：`root / beam / content` | — | — |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 内容 |

### 无障碍与降级

- 光束为 `aria-hidden` 纯装饰；
- `prefers-reduced-motion: reduce` 时停止旋转并退化为静态渐变。