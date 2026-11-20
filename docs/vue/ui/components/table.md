# KTable 表格

> 共同约定见 [共同约定](./index.md)。列驱动表格：排序、筛选、行选择、固定列、粘性表头、合并、虚拟滚动与响应式卡片。

## 何时使用

- 结构化数据展示与轻量交互（排序、筛选、选择）；
- 需要固定首尾列、横向滚动、粘性表头或大数据量窗口化。

## 文档导航

| 分类 | 内容 |
| --- | --- |
| [快速上手](/vue/ui/components/table/quick-start) | 三件必填、最常用属性、下一步 |
| [功能地图](/vue/ui/components/table/map) | 按“想做什么”找页面与关键 Prop |
| [Prop / Slot 速查](/vue/ui/components/table/props) | 常用字段与插槽，标常用/进阶 |
| [基础与外观](/vue/ui/components/table/basic) | 渲染、尺寸、省略、边框、斑马纹、空态 |
| [表头与列头](/vue/ui/components/table/headers) | 多级表头、分组排序/筛选 |
| [排序与筛选](/vue/ui/components/table/sort-filter) | 单列排序、列筛选、全局搜索 |
| [分页](/vue/ui/components/table/pagination) | 分页器位置、受控页码与每页条数 |
| [插槽](/vue/ui/components/table/slots) | 列头、页眉、页脚、汇总行、工具条 |
| [展开与树形](/vue/ui/components/table/rows) | 展开行、自定义展开、嵌套子表格、树形 |
| [单元格合并](/vue/ui/components/table/merge) | 行列合并、固定区内合并、合并 × 展开 / 虚拟 |
| [固定列](/vue/ui/components/table/fixed-columns) | 左右固定列、多列堆叠、浮层吸附 |
| [固定行](/vue/ui/components/table/fixed-rows) | 顶部/底部固定行、与固定列交叉 |
| [表头位置与滚动](/vue/ui/components/table/sticky-scroll) | 顶部/底部表头、内部/页面吸顶、吸底滚动条 |
| [虚拟滚动](/vue/ui/components/table/virtual) | 变量行高、合并 / 展开 / 固定行组合、触底加载 |
| [列设置与拖拽](/vue/ui/components/table/columns) | 列显隐、列顺序、列宽、跨分组换位 |
| [行选择](/vue/ui/components/table/selection) | 多选、单选、跨页全选 |
| [操作与编辑](/vue/ui/components/table/editing) | 行操作、行拖拽、单元格编辑 |
| [响应式卡片](/vue/ui/components/table/stacked) | 断点卡片、卡片树、卡片虚拟化、自定义内容 |
| [边界与组合](/vue/ui/components/table/edge-cases) | 合并降级、综合大表与高级变体 |

## 入门入口

- [快速上手](/vue/ui/components/table/quick-start)
- [Prop / Slot 速查](/vue/ui/components/table/props)

## API 与注意事项

通用 Props、列字段、Slots、Events 与注意事项已拆成模块，随对应分类页加载：

- 核心 Props / 通用事件：见「基础与外观」；
- 全部 Slots：见「插槽」；
- 列字段 `KTableColumn`：见「表头与列头」「固定列」「列设置与拖拽」「操作与编辑」；
- 合并、固定、虚拟、卡片等专有字段与降级规则：分别见对应分类页。
