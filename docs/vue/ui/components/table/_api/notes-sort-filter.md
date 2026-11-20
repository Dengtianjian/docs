- 排序为单列、客户端排序；筛选默认取单元格值与选项相等，复杂条件用 `filterMethod`。
- **全局搜索**：`searchable` 在工具条显示搜索框，关键字走 `v-model:globalFilter`；
  - 默认匹配可见叶子列的文本（大小写不敏感），可用 `globalFilterMethod` 自定义；
  - 默认文本单元格把命中片段（全部出现，大小写不敏感）包成 `<mark class="k-table__mark">`，`globalFilterHighlight="false"` 关闭；列 `render` 或行操作等自定义内容不处理；
  - 与列筛选、排序、分页叠加，树形下命中行的祖先链保留并强制展开；搜索变化会重置到第 1 页。

- **分页位置**按 `paginationPosition` 显式对齐，小屏不再强制居中；`both` 上下两份分页共用同一页状态。
- **分页器尺寸**跟随表格 `size`：sm→sm、md→md、lg→lg；可用 `pagination.size` 单独覆盖。
