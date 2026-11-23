# KPagination 分页

> 共同约定见 [共同约定](./index.md)。P3 数据展示批。页码、每页条数与快速跳转；KTable 内置消费。

## 何时使用

- 长列表/表格分页；
- 需要切换每页条数或输入页码跳转。

## 代码演示

<Demo path="pagination/sizes" title="三档尺寸" desc="`size` 三档：sm / md / lg，页码按钮、总条数与内部选择器同步缩放。" />

<Demo path="pagination/basic" title="基础 / 受控 / 每页条数 / 跳转 / 简单 / 禁用" :desc="['`v-model:current` + `v-model:page-size` 受控。', '`show-total` / `show-size-changer` / `show-quick-jumper` 组合。', '`simple` 只保留前后与页码摘要。', '`hide-on-single-page` 单页时隐藏。', '`disabled` 整体禁用。']" />

<Demo path="pagination/align" title="对齐位置" desc="`align` 控制整组分页在容器内的位置：`left` / `center` / `right`，默认靠左。" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| total | 总条数 | `number` | — |
| v-model:current | 当前页（1 基） | `number` | `1` |
| v-model:page-size | 每页条数 | `number` | `10` |
| pageSizeOptions | 每页条数选项 | `number[]` | `[10, 20, 50, 100]` |
| showSizeChanger | 显示每页条数选择 | `boolean` | `false` |
| showQuickJumper | 显示页码跳转输入 | `boolean` | `false` |
| showTotal | 显示总条数；函数可自定义 | `boolean \| (total, range) => string` | `false` |
| simple | 简单模式（前后 + 页码摘要） | `boolean` | `false` |
| disabled | 整体禁用 | `boolean` | `false` |
| hideOnSinglePage | 只有一页时隐藏 | `boolean` | `false` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| align | 整组分页在容器内的位置 | `'left' \| 'center' \| 'right'` | `'left'` |
| classNames | 部件类名（`root / total / item / active / ellipsis / prev / next / sizeChanger / quickJumper`） | `Partial<Record<Part, string>>` | — |
| styles | 部件内联样式（`root / total / item / active / ellipsis / prev / next / sizeChanger / quickJumper`） | `Partial<Record<Part, CSSProperties>>` | — |

<CommonProps />

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| change | 页码或每页条数变化 | `page: number, pageSize: number` |
| update:current | 当前页受控模型更新 | `number` |
| update:pageSize | 每页条数受控模型更新 | `number` |

## 注意事项

- 页码为 1 基并自动收敛到 `1..pageCount`；`total=0` 时显示第 1 页。
- `align` 只移动整组分页，需要容器比分页本身宽才看得出左右位置；放在 flex 行内时先把外层撑满。
- 页码、翻页按钮与省略号占位均为固定**正方形**（边长 = 当前尺寸档高度），两位数页码不会把格子撑宽。
- 按钮带 `aria-label`，当前页带 `aria-current="page"`；跳转输入回车或失焦提交，非法值回退当前页。
- 每页条数变化会把页码重置为 1。