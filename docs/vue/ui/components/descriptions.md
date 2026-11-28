# KDescriptions 描述列表

> 共同约定见 [共同约定](./index.md)。P6 基础补齐。用于成组展示只读字段，支持边框、横向/纵向布局与跨列。

## 何时使用

- 详情页展示订单、实例、用户等结构化信息；
- 需要统一标签宽度与多列排布时。

## 代码演示

<Demo path="descriptions/basic" title="基础 / 跨列" :desc="['columns 控制列数。', 'item 的 span 控制跨列，最大不超过 columns。', 'title / extra 放在内容区上方。']" />

<Demo path="descriptions/bordered" title="边框 / 纵向" :desc="['bordered 使用 1px 网格线。', 'layout=vertical 标签在值上方。', 'labelWidth 统一标签宽度。']" />

## API

### KDescriptions Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `string` | — |
| columns | 列数 | `number` | `3` |
| bordered | 显示网格边框 | `boolean` | `false` |
| layout | 标签与值排布 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| colon | 标签后显示冒号 | `boolean` | `true` |
| labelWidth | 标签宽度 | `number \| string` | — |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| classNames / styles | 部件：`root / header / title / extra / body` | — | — |

### KDescriptionsItem Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 标签 | `string` | — |
| span | 跨列数 | `number` | `1` |
| labelWidth | 单项标签宽度覆盖 | `number \| string` | — |
| classNames / styles | 部件：`item / label / content` | — | — |

### Slots

| 组件 | 插槽 | 说明 |
| --- | --- | --- |
| KDescriptions | default | 放置 `KDescriptionsItem` |
| KDescriptions | title / extra | 标题与右侧区 |
| KDescriptionsItem | default | 字段值 |
| KDescriptionsItem | label | 自定义标签 |

<CommonProps />

## 注意事项

- 使用原生 `dl / dt / dd` 语义；`KDescriptionsItem` 渲染为 `dl` 的分组节点。
- `bordered` 通过网格 1px 间隙绘制边框，跨列项会自然占满多格。
- 列数为整数，最小为 1；`span` 会被夹在 `1..columns` 之间。