# KVirtualList 虚拟列表

> 共同约定见 [共同约定](./index.md)。P3 数据展示批。固定或动态行高虚拟滚动：只渲染可视区与 overscan 范围。

## 何时使用

- 长列表（数千条以上）需要流畅滚动；
- 行高固定，或行高随内容变化（动态测量）的列表。

## 代码演示

<Demo path="virtual-list/basic" title="一万条列表 / 编程滚动" :desc="['`items` + 固定 `item-height` + `height`。', '默认插槽拿到 `{ item, index }`。', 'expose 的 `scrollToIndex(index, align)` 支持 start/center/end，`scrollToTop()` 回到顶部。']" />

<Demo path="virtual-list/dynamic" title="动态高度：内容展开/收起自动测高" :desc="['省略 `item-height` 进入动态模式，未测量行按 `estimated-item-height` 估算，渲染后用 ResizeObserver 回写真实高度。', '文本两行截断，点「展开全文」后行变高，列表自动重新测量并保持当前可视锚点。', '顶部按钮验证动态布局下的 `scrollToIndex` / `scrollToTop`。']" />

<Demo path="virtual-list/chat" title="消息列表：头像 + 双行摘要 + 未读角标" :desc="['8000 条消息，行高 64px；头像、名称、时间、摘要、未读数字都在固定高度内布局。', '角标、悬停、溢出的摘要由行内容自己处理，列表只负责占位与滚动。']" />

<Demo path="virtual-list/ledger" title="账单流水：多列表头 + 状态标签 + 金额对齐" :desc="['表头、行、汇总页脚三段结构，列宽用 grid 对齐。', '金额使用等宽数字并右对齐，收入着色；渠道用 `KTag` 表达状态。', '6000 行只渲染可视区，页脚汇总一次算好。']" />

<Demo path="virtual-list/load-more" title="滚动触底追加加载" :desc="['监听 `scroll` 事件，距底部小于阈值时追加下一页并显示 `KSpin`。', '首次只放 300 条，每次追加 200 条，直到 20000 条后提示已全部加载。']" />

<Demo path="virtual-list/filter" title="搜索过滤 + 空状态 + 滚动复位" :desc="['输入关键字实时计算过滤结果，数据变化后自动 `scrollToTop()`。', '无匹配时换成 `KEmpty` 空状态；命中数与滚动位置在列表外展示。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 数据源 | `readonly T[]` | — |
| itemHeight | 固定行高（px）；省略时进入动态高度模式 | `number` | — |
| estimatedItemHeight | 动态模式下未测量行的估算高度 | `number` | `44` |
| height | 视口高度 | `number \| string` | `320` |
| overscan | 可视区上下额外渲染条数 | `number` | `4` |
| itemKey | 行 key：字段名或取值函数 | `string \| (item, index) => string \| number` | — |
| classNames | 部件类名（`root / content / item`） | `Partial<Record<Part, string>>` | — |
| styles | 部件内联样式（`root / content / item`） | `Partial<Record<Part, CSSProperties>>` | — |

<CommonProps />

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| default | 行内容 | `{ item, index }` |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| scroll | 滚动 | `scrollTop: number` |

### Expose

| 方法 | 说明 |
| --- | --- |
| `scrollToIndex(index, align?)` | 滚动到指定项（`start / center / end`）；动态模式先按估算定位，再随测量收敛 |
| `scrollToTop()` | 回到顶部 |
| `viewportEl` | 滚动容器 ref |

## 注意事项

- 传 `itemHeight` 走固定行高，不做任何测量，性能最好；省略则进入动态高度模式：可见行渲染后实测，未渲染行按 `estimatedItemHeight` 估算。
- 动态模式建议提供 `itemKey`：测量结果按 key 缓存，过滤、重排后不会错位；不提供时退化为按索引缓存。
- 动态模式的行高以 `offsetHeight` 为准，行内请用 padding 撑开，不要给行加 `margin`，也不要在行上写死高度。
- 真实高度变化（展开、图片加载、字体变化）由 ResizeObserver 捕获；上方行变高时会补偿 `scrollTop`，保持当前可视锚点。
- 动态模式跳转到远处行时先按估算落点，随后按实测行高收敛到目标行；用户一旦滚动/触摸会立即取消这次修正。
- 固定模式下行内容请自行保证高度等于 `itemHeight`，否则会出现重叠或空隙；复杂行（头像、双行文本、角标）同样按固定高度排版。
- 无限加载是业务侧行为：在 `scroll` 事件里判断距底距离，追加 `items` 即可，组件会自动修正内容高度。
- 视口高度传百分比时通过 ResizeObserver 读取真实高度。