#### 展开行

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| expandable | 行展开开关；需配合 `#expanded` 插槽 | `boolean` | `true` |
| defaultExpandAll | 首次挂载时展开全部可展开行 | `boolean` | `false` |
| rowExpandable | 指定行是否可展开 | `(row) => boolean` | — |
| expandedPlacement | 展开内容位置：<br>`inline` 紧随该行；<br>`bottom` 追加到所属合并组的末尾整行（跨全部列）。<br>`bottom` 仅在传 `spanMethod` 时生效；检测到 rowSpan 时自动按组尾追加 | `'inline' \| 'bottom'` | `'inline'` |
| expandedRender | 展开内容渲染函数，返回 VNodeChild（组件 / `h()` / VNode 均可）；<br>对某行返回 `undefined` 时回退 `#expanded` 插槽，返回 `null` 视为空内容 | `(ctx: { row, index, rowKey })<br>=> VNodeChild \| undefined` | — |
| v-model:expandedRowKeys | 展开行 / 树节点受控 keys | `KTableRowKey[]` | `[]` |

#### 树形数据

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| tree | 树形数据：`true` 或 `{ childrenKey, indent }`；<br>展开箭头在首列，展开状态与行详情共用 `expandedRowKeys`。<br>与固定行数合并、固定带子节点的行不兼容，见注意事项 | `boolean \|<br>{ childrenKey?: string; indent?: number }` | `false` |
