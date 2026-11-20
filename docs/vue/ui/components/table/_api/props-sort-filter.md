#### 排序、筛选与搜索

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| sortState | 受控排序；不传走内部状态 | `KTableSortState \| null` | — |
| filters | 受控筛选；不传走内部状态 | `KTableFilterState` | — |
| searchable | 工具条显示全局搜索框 | `boolean` | `false` |
| searchPlaceholder | 搜索框占位文案 | `string` | `'搜索'` |
| v-model:globalFilter | 全局搜索关键字；不传走内部状态 | `string` | `''` |
| globalFilterMethod | 自定义全局匹配 `(row, keyword) => boolean`；缺省按可见叶子列文本包含匹配 | `(row, keyword) => boolean` | — |
| globalFilterHighlight | 全局搜索命中时高亮默认文本单元格；自定义 `render` 内容不处理 | `boolean` | `true` |
