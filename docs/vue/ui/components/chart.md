# KChart 图表

> 共同约定见 [共同约定](./index.md)。P7 数据与导航。零依赖 SVG 图表：折线 / 面积 / 柱状 / 饼图 / 环形图，并提供外部图表库接管插槽。

## 何时使用

- 快速展示趋势、对比、占比等轻量图表；
- 不想为简单图表引入整套图表库；
- 需要统一容器、图例、空态与加载态的场景。

## 代码演示

<Demo path="chart/line" title="折线与面积" :desc="['`series` 支持多系列，`categories` 为横轴标签。', '`smooth` 默认开启平滑曲线；`type=&quot;area&quot;` 切换面积图。', '悬浮显示参考线与 tooltip，点击节点派发 `pointClick`。']" />

<Demo path="chart/bar" title="分组柱状" :desc="['多系列自动分组并排。', '`colors` 覆盖配色，缺省使用主题色板。', '`min` / `max` 可固定纵轴范围。']" />

<Demo path="chart/pie" title="饼图与环形图" :desc="['饼图取第一条系列数据，`categories` 作为分片名称。', '`type=&quot;donut&quot;` 切换环形并展示合计。', '`gapDegree` 控制分片间隙。']" />

<Demo path="chart/custom" title="外部图表库适配" :desc="['`#chart` 作用域插槽接管整个绘图区，KChart 只保留容器、图例与状态。', '插槽参数提供 `series`、`categories`、`width`、`height`、`palette`。', '可在此渲染 ECharts / Chart.js 实例或完全自定义图形。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 图表类型 | `'line' \| 'bar' \| 'area' \| 'pie' \| 'donut'` | `'line'` |
| data | 单系列数据（与 series 二选一） | `number[]` | `[]` |
| series | 多系列数据 | `KChartSeries[]` | `[]` |
| categories | 横轴 / 分片名称 | `string[]` | `[]` |
| colors | 配色，缺省用主题色板 | `string[]` | — |
| width | viewBox 宽度 | `number` | `640` |
| height | viewBox 高度 | `number` | `280` |
| min / max | 纵轴范围 | `number` | 自动 |
| showAxis / showGrid | 轴与网格 | `boolean` | `true` |
| showLegend | 图例 | `boolean` | `true` |
| smooth | 平滑曲线 | `boolean` | `true` |
| donut | 环形（兼容 `type`） | `boolean` | `false` |
| gapDegree | 分片间隙角度 | `number` | `2` |
| valueFormatter | 数值格式化 | `(value: number) => string` | — |
| emptyText | 空态文案 | `string` | `'暂无数据'` |
| loading | 加载骨架 | `boolean` | `false` |
| size | 尺寸（字号档） | `'sm' \| 'md' \| 'lg'` | `'md'` |
| ariaLabel | 无障碍名称 | `string` | — |
| classNames / styles | 部件：`root / body / canvas / axis / grid / legend / tooltip / empty / skeleton` | — | — |

### KChartSeries

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| name | 系列名 | `string` |
| data | 数据 | `number[]` |
| color | 系列颜色 | `string` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| chart | 接管绘图区，作用域 `{ series, categories, width, height, palette }` |
| empty | 空态内容 |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| pointClick | 点击数据点 / 柱 / 扇区 | `(index, { category, value, series })` |

<CommonProps />

## 注意事项

### 为什么不是外部图表库

kit 的运行时依赖保持极简（目前仅 async-validator 等业务必需项），直接 `import echarts` 会让每个业务包被打入数百 KB，且与「peer 依赖由业务提供」的约定冲突。因此 KChart 首版选择：

- **内置零依赖 SVG 渲染**，覆盖折线 / 面积 / 柱状 / 饼图 / 环形图等轻量场景；
- **`#chart` 插槽作为适配层**：需要 ECharts、Chart.js、D3 时，业务自行安装并接管绘图区，KChart 继续提供容器、尺寸、图例、空态与加载态。

```
# 业务侧可选安装
pnpm add echarts
```

```vue
<KChart :series="series" :categories="categories">
  <template #chart="{ height }">
    <MyEcharts :option="option" :style="{ height: `${height}px` }" />
  </template>
</KChart>
```

后续若确有大量业务需要，可再评估新增 `kit/charts` 子包承载可选适配器，而不把图表库塞进主入口。

- 内置 SVG 使用 `role="img"`，复杂图表建议同时提供文本摘要（如 `ariaLabel`）。
- tooltip 跟随指针对齐数据点，饼图 tooltip 锚定在扇区中部。
- `series` 与 `data` 同时存在时以 `series` 为准。
