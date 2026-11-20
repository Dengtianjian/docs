# KTransfer 穿梭框

> 共同约定见 [共同约定](./index.md)。表单补充批。双栏列表之间移动条目，支持搜索、全选、禁用项与自定义渲染。

## 何时使用

- 权限、成员、字段等“从可选集合选择目标集合”的场景；
- 需要同时看到源列表与目标列表。

## 代码演示

<Demo path="transfer/basic" title="基础用法" :desc="['`v-model` 是目标侧 key 数组。', '勾选后使用中间按钮移入/移回。', '`disabled` 条目不可移动。']" />

<Demo path="transfer/custom" title="自定义条目 / 关闭全选" :desc="['`#item` 替换条目内容。', '`#footer` 自定义底栏。', '`show-select-all=false` 隐藏表头全选。']" />

## API

### KTransfer Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 目标侧 key 数组 | `(string \| number)[]` | `[]` |
| dataSource | 全量数据 | `KTransferItem[]` | `[]` |
| titles | 左右标题 | `[string, string]` | `['源列表', '目标列表']` |
| searchable | 显示搜索框 | `boolean` | `true` |
| searchPlaceholder | 搜索占位 | `string` | `'搜索'` |
| showSelectAll | 显示表头全选 | `boolean` | `true` |
| listHeight | 列表高度（px） | `number` | `240` |
| emptyText | 空列表文案 | `string` | `'暂无数据'` |
| disabled | 整体禁用 | `boolean` | `false` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| status | 校验态 | `'error' \| 'warning'` | FormItem 兜底 |
| render | 自定义渲染闭包 | `KRenderFn<KTransferRenderScope>` | — |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| change | 目标集合变化 | `(targetKeys, direction, movedKeys)` |
| search | 某侧搜索词变化 | `(direction, query)` |
| selectChange | 某侧勾选变化 | `(direction, keys)` |

方向：`'right'` 表示源 → 目标，`'left'` 表示目标 → 源。

### Slots

| 插槽名 | 说明 |
| --- | --- |
| title | 面板标题，scope `{ title, direction }` |
| item | 条目内容，scope `{ item, direction }` |
| footer | 底栏，scope `{ direction, selected }` |
| render | headless 整件替换 |

## 注意事项

- 移动后目标 key 按 `dataSource` 原顺序重排，避免目标列表跳动。
- 全选只作用于当前搜索结果中可见且未禁用的条目。
- 当前版本不做虚拟滚动；大数据量建议分页或自行裁剪。