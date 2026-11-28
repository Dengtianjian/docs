# KChart 图表

> 共同约定见 [共同约定](./index.md)。P7 数据与导航。零依赖 SVG 折线 / 柱状 / 饼图，支持 `#chart` 适配外部图表库。

## 何时使用

- 仪表盘趋势、分类对比与占比展示；
- 不希望引入 ECharts / Chart.js 的轻量场景；
- 需要替换为自有图表库，但保留统一空态、图例与交互外壳。

## 代码演示

<Demo path="chart/line" title="折线图" :desc="['`categories` + `series` 渲染多系列折线。', '`smooth` 平滑曲线，`area` 填充面积。', '点击或键盘选中数据点派发 `pointClick`。']" />

<Demo path="chart/bar" title="柱状图" :desc="['`type=&quot;bar&quot;` 多系列分组柱。', '纵轴自动包含 0 基线并取整刻度。', '`colors` 覆盖调色板。']" />

<Demo path="chart/pie" title="饼图 / 环图" :desc="['`type=&quot;pie&quot;` 使用 `data` 与 `categories`。', '`innerRadius` 0 为饼图，0–1 为环图。', '图例按分类生成，可关闭。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 图表类型 | `'line' \| 'bar' \| 'pie'` | `'line'` |
| size | 尺寸（字号档） | `'sm' \| 'md' \| 'lg'` | `'md'` |
| categories | 分类 | `string[]` | `[]` |
| series | 系列数据（折线/柱状） | `KChartSeries[]` | `[]` |
| data | 单系列 / 饼图数据 | `number[]` | `[]` |
| colors | 调色板 | `string[]` | 主题 8 色 |
| height | 图表高度（px） | `number` | `280` |
| smooth | 平滑折线 | `boolean` | `false` |
| area | 折线面积 | `boolean` | `false` |
| showGrid | 网格 | `boolean` | `true` |
| showLegend | 图例 | `boolean` | `true` |
| showLabels | X 轴标签 | `boolean` | `true` |
| innerRadius | 环图内径比例 | `number` | `0.55` |
| emptyText | 空态文案 | `string` | `'暂无数据'` |
| ariaLabel | 无障碍名称 | `string` | `'图表'` |
| classNames / styles | 部件：`root / svg / grid / axis / lines / bars / pie / legend / empty` | — | — |

### KChartSeries

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| name | 系列名 | `string` |
| data | 数值 | `number[]` |
| color | 系列颜色 | `string` |

### Slots

| 插槽名 | 说明 | 作用域 |
| --- | --- | --- |
| chart | 完全接管渲染（适配外部图表库） | `{ type, categories, series, data, domain, width, height }` |
| legend | 自定义图例 | `{ items }` |
| empty | 空态 | — |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| pointClick | 点击 / 键盘选中数据点 | `{ seriesIndex, pointIndex, category, value, seriesName }` |

### 说明

- 内置图表为零依赖 SVG，适合中小数据量；超大数据集建议使用 `#chart` 插槽接外部库。
- 柱状图自动包含 0 基线；折线图按数据范围取整刻度。
- 单值饼图会绘制整圆/整环。