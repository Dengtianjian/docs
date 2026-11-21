# KTimeline 时间轴

> 共同约定见 [共同约定](./index.md)。P7 数据与导航。垂直时间轴，支持左右/交替布局、节点颜色与图标、等待态。

## 何时使用

- 按时间顺序展示事件流、操作记录或流程进度；
- 需要左右分栏或交替布局的里程碑展示。

## 代码演示

<Demo path="timeline/basic" title="基础时间轴" :desc="['items 传 `label / time / content / color`。', '节点颜色支持 primary / success / warning / error / gray。', '每条内容与节点之间有连接线。']" />

<Demo path="timeline/slots" title="插槽与图标" :desc="['默认插槽里逐个使用 `KTimelineItem`。', 'KTimelineItem 提供 `dot` / `label` / `time` 插槽与 `icon` 图标。', 'item 的 `position` 可单独覆盖左右停靠（`left` / `right`）。']" />

<Demo path="timeline/alternate" title="交替布局与等待态" :desc="['`mode=\"alternate\"` 奇偶行左右交替。', '`pending` 传字符串时展示等待节点与文案。', '`reverse` 反转顺序，等待节点随之置顶。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 数据项（与默认插槽二选一） | `KTimelineItemData[]` | `[]` |
| mode | 内容停靠：左 / 右 / 交替 | `'left' \| 'right' \| 'alternate'` | `'left'` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| reverse | 反转顺序 | `boolean` | `false` |
| pending | 等待态：`true` 或文案 | `boolean \| string` | `false` |
| ariaLabel | 无障碍名称 | `string` | `'时间轴'` |
| classNames / styles | 部件：`root / item / rail / dot / content / label / time / pending` | — | — |

### KTimelineItemData

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| key | 唯一键 | `string \| number` |
| label | 标题 | `string` |
| time | 时间 | `string` |
| content | 内容文本 | `string` |
| color | 节点颜色 | `'primary' \| 'success' \| 'warning' \| 'error' \| 'gray' \| string` |
| icon | 节点图标组件 | `Component` |
| dot | 自定义节点组件 | `Component` |
| position | 单条停靠覆盖 | `'left' \| 'right'` |
| disabled | 禁用该条点击 | `boolean` |

### KTimelineItem Props

`label / time / color / icon / dot / position / disabled / classNames / styles`，部件与数据项同名。

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 自行放置 `KTimelineItem` |
| item | 自定义 items 渲染，作用域 `{ item, index }` |
| pending | 等待节点文案 |

### KTimelineItem Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 内容 |
| dot | 自定义节点 |
| label | 标题 |
| time | 时间 |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| itemClick | 点击非禁用条目 | `(item, index, event)` |

<CommonProps />

## 注意事项

- `classNames` / `styles` 的 `item / rail / dot / content / label / time` 会透传给内置 `KTimelineItem`。
- 连接线按条目绘制，最后一条自动收起；开启 `pending` 时保留到等待节点。
- 交替模式下奇偶布局由 CSS 完成，不依赖 DOM 顺序计算。
- 组件使用 `role="list"` / `role="listitem"` 语义；条目点击不是键盘操作，交互内容请放在内容区自行处理。
