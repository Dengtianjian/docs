- **单元格编辑**：列配 `editable` 后按 `editTrigger` 进入编辑（click / dblclick / manual），编辑态走 `v-model:editingCell`。
  - 默认控件是 KInput：Enter 或失焦提交、Esc 取消；`editRender` 可换成 KSelect 等任意控件，通过 `commit` / `cancel` 结束；
  - 提交只发 `cellEdit({ row, column, value, previousValue, rowIndex })`，不会直接修改 `dataSource`，由业务回写；
  - 同一时间只编辑一个单元格，固定列浮层与主表共用同一编辑态；
  - 存在 `editable` 列时，表体行最低高度统一按默认编辑控件（KInput sm，跟随 `--k-control-height-sm`）加单元格上下 padding 预留，进入/退出编辑不改变行高；自定义 `editRender` 高于默认控件时给列设 `editHeight`（px），行高按最大者预留。

- **行操作**：列的 `actions` 生成图标按钮（`icon` 内置 view / edit / copy / remove / more），`maxActions` 之外的收进竖向点下拉菜单；`danger` 用危险色，`disabled` 支持布尔或按行函数。
  - `#actions` 插槽渲染在按钮之前，与按钮同一 flex 行垂直居中，可放状态标签；
  - 点击操作会阻止冒泡，不触发 `rowClick`；操作列是普通列，固定、宽度与分组规则与其他列一致。

- **行拖拽**：`rowDraggable` 拖行首列抓手（`rowDragMode="press"` 可改为按住行任意处），浮层副本跟随指针、蓝色线条标示落位，不插入占位行。
  - 松手发 `rowReorder({ row, from, to })`，索引是当前页展示序，组件不改 `dataSource`；
  - 固定行不可拖动；表格中有按钮/输入/展开箭头等交互元素时，从这些元素上按下不会开始拖拽。
