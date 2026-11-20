#### KTableColumn

| 字段 | 说明 |
| --- | --- |
| `key` | 列唯一键（缺省用 `dataIndex`） |
| `title` | 表头文本（`#columnHeader` 插槽优先） |
| `dataIndex` | 取值路径，支持 `a.b` |
| `width` | 列宽；<br>固定列必须为数字 `width` |
| `minWidth` | 最小列宽 |
| `align` | `left / center / right` |
| `fixed` | `'left' \| 'right'` 固定列 |
| `sortable` | `true` 默认比较，或自定义比较函数 |
| `filters` | 筛选项 `{ label, value }[]` |
| `filterMultiple` | 是否多选（默认 `true`） |
| `filterMethod` | 自定义筛选 `(value, row) => boolean` |
| `children` | 分组表头子列；<br>有 `children` 的列不渲染数据单元格 |
| `hidden` | 默认隐藏；<br>仍可在列设置中勾选打开（永久隐藏请配合 `hideable: false`） |
| `hideable` | 是否允许在列设置中切换，默认 `true`；<br>`false` 锁定 |
| `ellipsis` | 单元格单行省略<br>（表格自动切为固定布局） |
| `ellipsisTooltip` | 只在真实溢出时用 KTooltip 显示全文 |
| `render` | 单元格渲染 `({ row, value, index, column }) => VNodeChild` |
| `editable` | 允许进入单元格编辑 |
| `editHeight` | 自定义编辑控件高度（px）：可编辑行按它与默认控件取大预留，避免进入编辑撑高行 |
| `editRender` | 自定义编辑控件 `({ row, value, index, column, commit, cancel }) => VNodeChild`；缺省渲染 KInput |
| `actions` | 操作列图标按钮 `{ label, icon?, danger?, disabled?, onClick }[]`；点击不触发 `rowClick` |
| `maxActions` | 直排按钮数量，超出收进下拉菜单，默认 `3` |
| `stack` | 卡片模式字段：`false` 隐藏；<br>`'title'` / `'subtitle'` 指定标题与副标题；<br>缺省第一个非副标题列作标题、其余为键值字段 | `false \| 'title' \| 'subtitle'` |
| `classNames` | 列级表头/单元格类名，类型 `Partial<Record<Part, string>>` |
| `styles` | 列级表头/单元格内联样式，类型 `Partial<Record<Part, CSSProperties>>` |
