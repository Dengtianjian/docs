# KStatistic 统计数值

> 共同约定见 [共同约定](./index.md)。P7 数据与导航。标题、前后缀、精度、千分位与数字滚动。

## 何时使用

- 仪表盘 KPI、财务金额、转化率等数值展示；
- 需要统一千分位 / 小数分隔符；
- 需要从 0 滚动到目标值的入场效果。

## 代码演示

<Demo path="statistic/basic" title="基础数值" :desc="['`precision` 固定小数位，默认保留原始精度。', '`prefix / suffix` 展示币种与单位。', '`loading` 显示骨架而不破坏布局。']" />

<Demo path="statistic/countup" title="数字滚动" :desc="['`count-up` 开启滚动，`duration` 控制时长。', '值变化时从 0 重新滚动。', '`prefers-reduced-motion` 下直接显示终值。']" />

<Demo path="statistic/rolling" title="逐位滚动" :desc="['`animation=&quot;rolling&quot;` 复用 `KRollingText`，逐位滚动格式化后的数字。', '`rollingSpeed` 三档：fast / normal / slow；`rollingTiming` 支持 linear 与 ease-out（先快后慢）。', '标题、前后缀、精度、千分位、loading 与尺寸仍由 KStatistic 负责。', 'KRollingText 保留为底层滚动原语，也可独立使用。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `string` | — |
| value | 数值 | `number` | `0` |
| precision | 小数位 | `number` | — |
| prefix / suffix | 前后缀 | `string` | — |
| groupSeparator | 千分位分隔符 | `string` | `','` |
| decimalSeparator | 小数分隔符 | `string` | `'.'` |
| formatter | 完全自定义格式化 | `(value: number) => string` | — |
| animation | 动画：无 / 数值递增 / 逐位滚动 | `'none' \| 'count-up' \| 'rolling'` | `'none'` |
| countUp | 兼容别名，等价于 `animation="count-up"` | `boolean` | `false` |
| duration | 动画时长（ms）；count-up 默认 900；rolling 显式传入时覆盖 speed 预设 | `number` | — |
| rollingSpeed | rolling 速度档 | `'fast' \| 'normal' \| 'slow'` | `'normal'` |
| rollingTiming | rolling 缓动 | `'linear' \| 'ease-out'` | `'ease-out'` |
| loading | 加载态 | `boolean` | `false` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| valueStyle | 数值内联样式 | `CSSProperties` | — |
| ariaLabel | 无障碍名称 | `string` | 标题 |
| classNames / styles | 部件：`root / title / value / prefix / number / suffix / skeleton` | — | — |

### KStatistic 与 KRollingText 的分工

- `KStatistic` 负责统计语义：标题、前后缀、精度、分隔符、formatter、loading、尺寸与动画模式。
- `KRollingText` 负责逐位滚动本身，不处理统计语义；`KStatistic animation="rolling"` 内部复用它。
- 只有一段任意数字/文本需要滚动时，直接用 `KRollingText` 更轻。

### Slots

| 插槽名 | 说明 | 作用域 |
| --- | --- | --- |
| title | 标题 | — |
| prefix / suffix | 前后缀 | — |
| value | 数值 | `{ value, formatted }` |