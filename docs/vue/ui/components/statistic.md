# KStatistic 统计数值

> 共同约定见 [共同约定](./index.md)。P7 数据与导航。标题、前后缀、精度、千分位与数字滚动。

## 何时使用

- 仪表盘 KPI、财务金额、转化率等数值展示；
- 需要统一千分位 / 小数分隔符；
- 需要从 0 滚动到目标值的入场效果。

## 代码演示

<Demo path="statistic/basic" title="基础数值" :desc="['`precision` 固定小数位，默认保留原始精度。', '`prefix / suffix` 展示币种与单位。', '`loading` 显示骨架而不破坏布局。']" />

<Demo path="statistic/countup" title="数字滚动" :desc="['`count-up` 开启滚动，`duration` 控制时长。', '值变化时从 0 重新滚动。', '`prefers-reduced-motion` 下直接显示终值。']" />

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
| countUp | 数字滚动 | `boolean` | `false` |
| duration | 滚动时长（ms） | `number` | `900` |
| loading | 加载态 | `boolean` | `false` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| valueStyle | 数值内联样式 | `CSSProperties` | — |
| ariaLabel | 无障碍名称 | `string` | 标题 |
| classNames / styles | 部件：`root / title / value / prefix / number / suffix / skeleton` | — | — |

### Slots

| 插槽名 | 说明 | 作用域 |
| --- | --- | --- |
| title | 标题 | — |
| prefix / suffix | 前后缀 | — |
| value | 数值 | `{ value, formatted }` |