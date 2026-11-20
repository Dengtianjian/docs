#### 基础渲染与外观

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 列定义 | `KTableColumn<T>[]` | — |
| dataSource | 数据 | `T[]` | — |
| rowKey | 行 key：字段名或函数 | `string \| (row, index) => string \| number` | `'id'` |
| size | 密度 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| bordered | 外框与圆角 | `boolean` | `true` |
| rowBorders | 行分隔线 | `boolean` | `true` |
| columnBorders | 列分隔线；不传时跟随 `bordered` | `boolean` | `bordered` |
| striped | 斑马纹 | `boolean` | `false` |
| sticky | 表头吸顶（需配合 `scroll.y`） | `boolean` | `false` |
| loading | 加载遮罩 | `boolean` | `false` |
| emptyText | 空态文案 | `string` | `'暂无数据'` |
| scroll | `{ x, y }` 横向滚动宽度 / 纵向高度 | `{ x?: number \| string; y?: number \| string }` | — |
| classNames | 部件类名<br>（`root / header / toolbar / columnSetting / wrap / fixedLayer / row / filterPanel / loading / stack / scrollbar / loadMore / footer / pagination`） | `Partial<Record<Part, string>>` | — |
| styles | 部件内联样式<br>（`root / toolbar / columnSetting / wrap / fixedLayer / row / filterPanel / loading / stack / scrollbar / loadMore / pagination`） | `Partial<Record<Part, CSSProperties>>` | — |

<CommonProps />
