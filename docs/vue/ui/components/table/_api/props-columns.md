#### 列设置、顺序与宽度

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columnSetting | 显示内置「列设置」按钮 | `boolean` | `false` |
| v-model:columnVisibility | 列显隐受控表 `{ 列key: boolean }` | `Record<string, boolean>` | `{}` |
| v-model:columnOrder | 列顺序（叶子 key 数组）；不传走内部状态 | `string[]` | `[]` |
| v-model:columnGroups | 跨分组换位（叶子 key → 分组 key 路径）；缺省沿用列定义 | `Record<string, string[]>` | `{}` |
| v-model:columnWidths | 列宽覆盖（叶子 key → px，最小 56）；不传走内部状态 | `Record<string, number>` | `{}` |
| columnDraggable | 拖动表头调整列顺序（可跨分组换位） | `boolean` | `false` |
| columnResizable | 拖动表头右边缘调整列宽 | `boolean` | `false` |
