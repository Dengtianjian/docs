# KStatistic 统计数值

> 共同约定见 [共同约定](./index.md)。P7 数据与导航。展示带标题、前后缀、精度与数字动画的统计值。

## 何时使用

- 仪表盘、概览页展示核心指标；
- 需要千分位、精度、货币前缀或自定义格式的数值。

## 代码演示

<Demo path="statistic/basic" title="基础与尺寸" :desc="['`title / value / description` 三段结构。', '`prefix` / `suffix` 与数值基线对齐。', '`size` 三档：sm / md / lg。']" />

<Demo path="statistic/precision" title="精度与格式" :desc="['`precision` 控制小数位。', '`groupSeparator` / `decimalSeparator` 可改千分位与小数点。', '`formatter` 完全接管展示文本。']" />

<Demo path="statistic/countup" title="数字动画与加载态" :desc="['`countUp` 在值变化时以缓动动画过渡。', '`prefers-reduced-motion` 下自动关闭动画。', '`loading` 用骨架替换数值。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `string` | — |
| description | 描述 | `string` | — |
| value | 数值 | `number \| string` | `0` |
| precision | 小数位 | `number` | — |
| prefix / suffix | 前缀 / 后缀 | `string` | — |
| groupSeparator | 千分位分隔符，传空串关闭分组 | `string` | `','` |
| decimalSeparator | 小数点 | `string` | `'.'` |
| formatter | 自定义格式化 | `(value: number \| string) => string` | — |
| countUp | 数字动画 | `boolean` | `false` |
| duration | 动画时长（ms） | `number` | `900` |
| loading | 加载态骨架 | `boolean` | `false` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| valueStyle | 数值内联样式 | `CSSProperties` | — |
| ariaLabel | 无障碍名称，缺省取 title | `string` | — |
| classNames / styles | 部件：`root / title / value / prefix / number / suffix / description / skeleton` | — | — |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 描述区 |
| title / prefix / suffix | 对应文案区 |
| value | 自定义数值，作用域 `{ value, formatted }` |

无事件。

<CommonProps />

## 注意事项

- 非数字字符串会原样展示，不做分组与精度处理。
- `countUp` 只对可解析为数字的 `value` 生效。
- `loading` 只替换数值区，标题、前后缀与描述保持显示。
