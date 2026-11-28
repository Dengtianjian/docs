# KTable · Prop / Slot 速查

> 只列入门与日常最常用的字段；完整 API 在各分类页底部按模块加载。
> 标记：★ 日常必看，☆ 有需要再看。

### 表格 Props

| 字段 | 说明 | 常用度 | 详见 |
| --- | --- | --- | --- |
| `columns` | 列定义 | ★ | [基础](/vue/ui/components/table/basic) |
| `data-source` | 行数据 | ★ | [基础](/vue/ui/components/table/basic) |
| `row-key` | 行唯一键 | ★ | [基础](/vue/ui/components/table/basic) |
| `size` | 密度 `sm / md / lg` | ★ | [基础](/vue/ui/components/table/basic) |
| `bordered` / `striped` | 外框 / 斑马纹 | ★ | [基础](/vue/ui/components/table/basic) |
| `scroll` | `{ x, y }` 横/纵滚动 | ★ | [固定列](/vue/ui/components/table/fixed-columns) |
| `sticky` | 表头吸顶（配 `scroll.y`） | ★ | [表头位置与滚动](/vue/ui/components/table/sticky-scroll) |
| `pagination` | 分页器配置；`false` 关闭 | ★ | [分页](/vue/ui/components/table/pagination) |
| `v-model:current` / `v-model:page-size` | 受控页码 / 每页条数 | ★ | [分页](/vue/ui/components/table/pagination) |
| `rowSelection` | 多选/单选配置 | ★ | [行选择](/vue/ui/components/table/selection) |
| `sortState` / `filters` | 受控排序 / 筛选 | ☆ | [排序与筛选](/vue/ui/components/table/sort-filter) |
| `searchable` / `v-model:globalFilter` | 工具条全局搜索 | ☆ | [排序与筛选](/vue/ui/components/table/sort-filter) |
| `columnSetting` | 内置列设置按钮 | ☆ | [列设置与拖拽](/vue/ui/components/table/columns) |
| `rowPinning` | 顶部/底部固定行 | ☆ | [固定行](/vue/ui/components/table/fixed-rows) |
| `headerPosition` / `pageSticky` | 表头沉底 / 页面吸顶 | ☆ | [表头位置与滚动](/vue/ui/components/table/sticky-scroll) |
| `virtual` | 大数据量窗口化 | ☆ | [虚拟滚动](/vue/ui/components/table/virtual) |
| `spanMethod` | 行/列合并 | ☆ | [单元格合并](/vue/ui/components/table/merge) |
| `stacked` / `stackBreakpoint` | 响应式卡片 | ☆ | [响应式卡片](/vue/ui/components/table/stacked) |

### 列字段

| 字段 | 说明 | 常用度 | 详见 |
| --- | --- | --- | --- |
| `title` / `dataIndex` | 表头文本 / 取值路径 | ★ | [基础](/vue/ui/components/table/basic) |
| `key` | 列唯一键（缺省用 `dataIndex`） | ★ | [基础](/vue/ui/components/table/basic) |
| `width` | 列宽；固定列必须是数字 | ★ | [固定列](/vue/ui/components/table/fixed-columns) |
| `align` | 表体对齐 `left / center / right` | ★ | [基础](/vue/ui/components/table/basic) |
| `ellipsis` / `ellipsisTooltip` | 单行省略 / 溢出提示 | ★ | [基础](/vue/ui/components/table/basic) |
| `sortable` / `filters` | 排序 / 筛选 | ★ | [排序与筛选](/vue/ui/components/table/sort-filter) |
| `fixed` | `'left' \| 'right'` | ☆ | [固定列](/vue/ui/components/table/fixed-columns) |
| `children` | 分组表头 | ☆ | [表头与列头](/vue/ui/components/table/headers) |
| `render` | 自定义单元格 VNode | ★ | [基础](/vue/ui/components/table/basic) |
| `actions` | 行操作按钮 | ☆ | [操作与编辑](/vue/ui/components/table/editing) |
| `editable` / `editRender` / `editHeight` | 单元格编辑 | ☆ | [操作与编辑](/vue/ui/components/table/editing) |
| `stack` | 卡片模式字段角色 | ☆ | [响应式卡片](/vue/ui/components/table/stacked) |

### 常用 Slots

| 插槽 | 用途 | 详见 |
| --- | --- | --- |
| `#header` / `#footer` | 表格页眉 / 页脚 | [插槽](/vue/ui/components/table/slots) |
| `#summary` | 汇总行 | [插槽](/vue/ui/components/table/slots) |
| `#columnHeader` | 自定义列头 | [插槽](/vue/ui/components/table/slots) |
| `#expanded` | 展开行内容 | [展开与树形](/vue/ui/components/table/rows) |
| `#filter` / `#toolbar` | 工具条左右区域 | [插槽](/vue/ui/components/table/slots) |
| `#actions` | 行操作前置内容 | [操作与编辑](/vue/ui/components/table/editing) |
| `#card` | 卡片模式整体替换 | [响应式卡片](/vue/ui/components/table/stacked) |

### 常用 Events

| 事件 | 用途 | 详见 |
| --- | --- | --- |
| `selectionChange` | 选择变化 | [行选择](/vue/ui/components/table/selection) |
| `sortChange` / `filterChange` | 排序 / 筛选变化 | [排序与筛选](/vue/ui/components/table/sort-filter) |
| `pageChange` | 分页变化 | [分页](/vue/ui/components/table/pagination) |
| `expandChange` | 展开变化 | [展开与树形](/vue/ui/components/table/rows) |
| `cellEdit` | 单元格提交 | [操作与编辑](/vue/ui/components/table/editing) |
| `rowClick` | 行点击 | [基础](/vue/ui/components/table/basic) |

> 完整字段：各分类页底部；类型定义见 `KTableColumn`、`KTableRowSelection` 等模块。