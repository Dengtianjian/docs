# KTable 表格

> 共同约定见 [共同约定](./index.md)。列驱动表格：排序、筛选、行选择、固定列、粘性表头、合并、虚拟滚动与响应式卡片。

## 何时使用

- 结构化数据展示与轻量交互（排序、筛选、选择）；
- 需要固定首尾列、横向滚动、粘性表头或大数据量窗口化。

## 文档导航

| 分类 | 内容 |
| --- | --- |
| [基础与外观](/vue/ui/components/table/basic) | 渲染、尺寸、表头分组、省略、边框、空态 |
| [排序、筛选与分页](/vue/ui/components/table/sort-filter) | 排序、列筛选、全局搜索、工具条、分页 |
| [展开与树形](/vue/ui/components/table/rows) | 展开行、自定义展开、嵌套子表格、树形 |
| [单元格合并](/vue/ui/components/table/merge) | 行列合并、固定区内合并、合并 × 展开 / 虚拟 |
| [固定列与固定行](/vue/ui/components/table/fixed) | 固定列、固定行堆叠、表头沉底、页面吸顶、吸底滚动条 |
| [虚拟滚动](/vue/ui/components/table/virtual) | 变量行高、合并 / 展开 / 固定行组合、触底加载 |
| [列设置与拖拽](/vue/ui/components/table/columns) | 列显隐、列顺序、列宽、跨分组换位、汇总与页脚 |
| [选择与编辑](/vue/ui/components/table/interaction) | 多选/单选/跨页、行操作、行拖拽、单元格编辑 |
| [响应式卡片](/vue/ui/components/table/stacked) | 断点卡片、卡片树、卡片虚拟化、自定义内容 |

## 基础示例

<Demo :title-level="4" path="table/basic" title="基础表格" :desc="['`columns` + `data-source` + `row-key` 即可渲染。', '默认按 `dataIndex` 取值展示；`align` 只作用于表体，表头统一左对齐。']" />

## API 与注意事项

通用 Props、列字段、Slots、Events 与注意事项已拆成模块，随对应分类页加载：

- 核心 Props / 布局插槽 / 通用事件：见「基础与外观」页底部；
- 列字段 `KTableColumn`：见「列设置与拖拽」「选择与编辑」「固定列与固定行」页；
- 合并、固定、虚拟、卡片等专有字段与降级规则：分别见对应分类页。
