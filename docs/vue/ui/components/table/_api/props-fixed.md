#### 固定行与固定列

固定列的 `fixed` / `width` 是列级字段（见 `KTableColumn`），需配合数字 `scroll.x`。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model:rowPinning | 固定行受控 `{ top: keys[], bottom: keys[] }` | `{ top?: KTableRowKey[];<br>bottom?: KTableRowKey[] }` | `{}` |

#### 吸底横向滚动条

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| bottomScrollbar | 表格下方常驻横向滚动条：<br>与表体双向同步，页面滚动时吸在视口底部 | `boolean` | `false` |

#### 表头位置

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| headerPosition | 表头渲染在数据行上方还是下方；<br>底部表头配合 `sticky` / `pageSticky` 悬浮在底部，<br>筛选面板改为向上展开 | `'top' \| 'bottom'` | `'top'` |

#### 页面级吸顶

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| pageSticky | 页面滚动时表头吸顶；表头在底部时改为吸在视口底部；<br>要求没有 `scroll.x` / `scroll.y` | `boolean` | `false` |
| pageStickyOffset | 吸附偏移：数字按 px，字符串原样；<br>可避开站点顶栏或底栏 | `number \| string` | `0` |
