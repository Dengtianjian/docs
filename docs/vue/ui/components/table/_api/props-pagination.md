#### 分页

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| pagination | `false` 不分页；对象开启分页器<br>（`size` 可单独指定分页器尺寸） | `false \| KTablePaginationConfig` | `false` |
| paginationPosition | 分页器位置，六个角位 + `both` | `'top-left' \| 'top-center' \| 'top-right' \|<br>'bottom-left' \| 'bottom-center' \| 'bottom-right' \| 'both'` | `'bottom-right'` |
| v-model:current | 受控当前页 | `number` | `1` |
| v-model:page-size | 受控每页条数 | `number` | `10` |
