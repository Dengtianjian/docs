# KAnchor 锚点

> 共同约定见 [共同约定](./index.md)。P4 导航批。监听滚动容器并高亮当前章节，点击平滑跳转。

## 何时使用

- 长文档、设置页右侧目录；
- 需要跟随滚动高亮当前章节并支持点击定位。

## 代码演示

<Demo path="anchor/basic" title="滚动高亮 / 多级 / 平滑跳转" :desc="['`items` 用 `key + href` 描述目标，`children` 形成缩进层级。', '`target` 传滚动容器，缺省监听 window；`targetOffset` 同时影响高亮阈值与跳转落点。', '点击后同步 hash，并触发 `change`。']" />

<Demo path="anchor/horizontal" title="横向排列" :desc="['`direction=&quot;horizontal&quot;` 时高亮段在底部，跟随当前项移动。', '点击、滚动高亮与 `targetOffset` 逻辑与纵向一致；多级锚点建议保持纵向。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 锚点树 | `KAnchorItem[]` | `[]` |
| target | 滚动容器；缺省 window | `KScrollTarget` | — |
| targetOffset | 跳转落点与高亮判定的偏移量 | `number` | `0` |
| bounds | 高亮判定的额外余量 | `number` | `5` |
| direction | 排列方向 | `'vertical' \| 'horizontal'` | `'vertical'` |
| affix | 使用 `position: sticky` 贴顶 | `boolean` | `false` |
| affixOffsetTop | 贴顶距离 | `number` | `0` |
| anchorLabel | `nav` 的 `aria-label` | `string` | `'锚点导航'` |
| classNames | 部件类名（`root / list / item / link`） | `Partial<Record<Part, string>>` | — |
| styles | 部件内联样式（同上） | `Partial<Record<Part, CSSProperties>>` | — |

<CommonProps />

### KAnchorItem

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| key | 唯一标识 | `string` |
| href | 目标锚点，必须是 `#id` | `string` |
| title | 文字 / VNode | `VNodeChild` |
| children | 子锚点 | `KAnchorItem[]` |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| change | 当前高亮锚点变化 | `key: string, item: KAnchorItem` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| link | 单项作用域插槽，scope `{ item, active, level }` |

### 部件

`root`（nav）/ `list` / `item` / `link`。

## 注意事项

- 灰色轨道与高亮段同为 2px；高亮段用主色跟随当前锚点移动并覆盖当前项，不随距离累计。横向模式高亮段在底部，按当前项左右移动。
- `href` 仅支持 `#id`；组件用 `getElementById` 查找目标，非 `#` 开头会被忽略。
- 标题顺序应与 DOM 顺序一致；容器滚到底时自动高亮最后一项。
- 点击使用 `history.replaceState` 同步 hash，避免浏览器默认跳转与平滑滚动冲突。
- 嵌套项以缩进平铺渲染；父级在子项激活时一并高亮，`aria-current` 只落在当前叶子。
- 开启 `affix` 后使用 sticky，需要外层滚动容器无 `overflow: hidden` 截断。

<style>
/* 文档站 :where(.vp-doc) li + li 的间距会穿透进锚点演示，统一在页面收掉 */
.vp-doc._vue_ui_components_anchor .k-anchor li + li {
  margin-top: 0;
}
</style>
