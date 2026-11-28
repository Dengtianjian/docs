#### 固定行与固定列

固定列的 `fixed` / `width` 是列级字段（见 `KTableColumn`），需配合数字 `scroll.x`。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model:rowPinning | 固定行受控 `{ top: keys[], bottom: keys[] }` | `{ top?: KTableRowKey[];<br>bottom?: KTableRowKey[] }` | `{}` |
