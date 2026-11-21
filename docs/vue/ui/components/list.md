# KList 列表 / KCell 单元格

> 共同约定见 [共同约定](./index.md)。P6 基础补齐。数据驱动或插槽驱动的列表；`KList/KListItem` 同时作为移动端 `KCellGroup/KCell` 导出。

## 何时使用

- 展示一组同构条目（任务、联系人、设置项）；
- 移动端设置页使用 `KCellGroup + KCell` 形态。

## 代码演示

<Demo path="list/data" title="数据驱动" :desc="['items 直接渲染列表。', 'itemClick 返回条目与下标。', 'header / footer 插槽放标题与统计。']" />

<Demo path="list/cell" title="单元格 / 头像 / 尾部操作" :desc="['KListItem 支持 avatar / title / description / extra 插槽。', 'clickable 开启 hover、键盘 Enter/Space 与点击事件。', 'extra 内的按钮会阻止冒泡，不触发行点击。']" />

<Demo path="list/states" title="加载与空态" :desc="['loading 在列表内部显示遮罩。', 'items 为空自动显示空态，可替换 #empty。', '空态与加载都保留外框尺寸。']" />

## API

### KList Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 数据条目 | `KListDataItem[]` | — |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| bordered | 外框 | `boolean` | `true` |
| split | 条目分隔线 | `boolean` | `true` |
| loading | 加载遮罩 | `boolean` | `false` |
| emptyText | 空态文案 | `string` | `'暂无数据'` |
| classNames / styles | 部件：`root / header / body / empty / footer / loading` | — | — |

### KListDataItem

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| key | 唯一标识 | `string \| number` |
| title | 标题 | `string` |
| description | 描述 | `string` |
| extra | 右侧文案 | `string` |
| disabled | 禁用 | `boolean` |

### KListItem Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `string` | — |
| description | 描述 | `string` | — |
| extra | 右侧文案 | `string` | — |
| clickable | 可点击 | `boolean` | `false` |
| disabled | 禁用 | `boolean` | `false` |
| selected | 选中态 | `boolean` | — |
| classNames / styles | 部件：`root / avatar / content / title / description / extra` | — | — |

### Slots

| 组件 | 插槽 | 说明 |
| --- | --- | --- |
| KList | default | 自定义条目 |
| KList | header / footer / empty | 页眉、页脚、空态 |
| KList | item | 数据条目自定义，作用域 `{ item, index }` |
| KListItem | default | 整块内容覆盖 |
| KListItem | avatar / title / description / extra | 分区内容 |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| itemClick | 数据条目点击 | `(item, index, event)` |
| KListItem `click` | 单元格点击/回车 | `MouseEvent \| KeyboardEvent` |

<CommonProps />

## 注意事项

- `KCellGroup` 是 `KList` 的别名，`KCell` 是 `KListItem` 的别名，导入路径分别指向 `List/List.vue`、`List/ListItem.vue`。
- `KListItem` 渲染为 `li`，应放在列表容器内。
- 数据模式默认把 `items` 渲染为可点击单元格；需要完全自定义时用 `#item` 插槽。
- 键盘用户按 Enter / Space 触发行点击；尾部操作按钮应放在 `#extra`。