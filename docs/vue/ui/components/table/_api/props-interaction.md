#### 编辑与拖拽

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| editTrigger | 进入编辑的方式：单击 / 双击 / 手动（只能通过 `v-model:editingCell`） | `'click' \| 'dblclick' \| 'manual'` | `'click'` |
| v-model:editingCell | 当前编辑单元格 `{ rowKey, columnKey }`；同一时间只编辑一格 | `{ rowKey: KTableRowKey; columnKey: string } \| null` | `null` |
| rowDraggable | 行拖拽排序（发 `rowReorder`，不改数据） | `boolean` | `false` |
| columnDragMode | 列拖拽触发：`handle` 仅抓手 / `press` 表头任意处 | `'handle' \| 'press'` | `'handle'` |
| rowDragMode | 行拖拽触发：`handle` 仅行抓手 / `press` 按住行任意处 | `'handle' \| 'press'` | `'handle'` |
