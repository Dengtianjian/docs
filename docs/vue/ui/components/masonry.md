# KMasonry 瀑布流

> 共同约定见 [共同约定](./index.md)。P8 增强件。基于 CSS columns 的多列不等高布局。

## 何时使用

- 图片墙、笔记流、卡片墙等高度不一致的内容；
- 需要随容器宽度自动减少列数；
- 希望零 JS 测量即可完成排列。

## 代码演示

<Demo path="masonry/basic" title="数据驱动" :desc="['`items` + `#item` 作用域渲染。', '`columns` 固定列数；`gap` 同时控制行列间距。', '`itemClick` 派发 `(item, index, event)`。']" />

<Demo path="masonry/slot" title="默认插槽与自适应列宽" :desc="['不传 `columns` 时按 `minColumnWidth` 自适应。', '默认插槽子项自动 `break-inside: avoid`。', '窄屏自动减少列数。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 数据项 | `unknown[]` | `[]` |
| columns | 固定列数；0 表示自适应 | `number` | `0` |
| minColumnWidth | 自适应时的最小列宽 | `number` | `240` |
| gap | 行列间距 | `number` | `16` |
| itemKey | 数据项 key 字段或函数 | `string \| ((item, index) => string \| number)` | — |
| classNames / styles | 部件：`root / item` | — | — |

### Slots

| 插槽名 | 说明 | 作用域 |
| --- | --- | --- |
| default | 自行放置子项 | — |
| item | 渲染 `items` 中的每项 | `{ item, index }` |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| itemClick | 点击数据项 | `item, index, MouseEvent` |