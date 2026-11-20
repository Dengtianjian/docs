#### 行选择

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| rowSelection | 行选择配置，详见下方 `KTableRowSelection` | `KTableRowSelection<T>` | — |

**KTableRowSelection**

| 字段 | 说明 |
| --- | --- |
| `type` | `'checkbox'`（默认，多选 + 全选）或 `'radio'`（单选） |
| `selectedRowKeys` | 受控选中 keys；单选模式长度保持 ≤ 1 |
| `onChange` | `(keys, rows) => void` |
| `getCheckboxProps` | `(row) => ({ disabled? })`，多选/单选共用 |
| `selectAllScope` | `'page'`（默认，全选只增删当前页）或 `'all'`（表头全选覆盖当前筛选/排序结果的所有分页） |
