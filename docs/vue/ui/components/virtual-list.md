# KVirtualList 虚拟列表

> 共同约定见 [共同约定](./index.md)。P3 数据展示批。固定行高虚拟滚动：只渲染可视区与 overscan 范围。

## 何时使用

- 长列表（数千条以上）需要流畅滚动；
- 行高固定、可由业务自行布局。

## 代码演示

<Demo path="virtual-list/basic" title="一万条列表 / 编程滚动" :desc="['`items` + 固定 `item-height` + `height`。', '默认插槽拿到 `{ item, index }`。', 'expose 的 `scrollToIndex(index, align)` 支持 start/center/end，`scrollToTop()` 回到顶部。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 数据源 | `readonly T[]` | — |
| itemHeight | 行高（px） | `number` | — |
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
| `scrollToIndex(index, align?)` | 滚动到指定项（`start / center / end`） |
| `scrollToTop()` | 回到顶部 |
| `viewportEl` | 滚动容器 ref |

## 注意事项

- 只支持**固定行高**；动态高度、分组吸顶属于后续能力。
- 行内容请自行保证高度等于 `itemHeight`，否则会出现重叠或空隙。
- 视口高度传百分比时通过 ResizeObserver 读取真实高度。