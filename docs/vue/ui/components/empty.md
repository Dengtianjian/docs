# KEmpty 空状态

> 共同约定见 [共同约定](./index.md)。P3 数据展示批。无数据占位：内置插图、描述与操作区。

## 何时使用

- 列表、表格、搜索结果为空的占位；
- 需要引导用户下一步操作（新建、重置筛选）时。

## 代码演示

<Demo path="empty/basic" title="尺寸 / 操作区 / 自定义插图" desc="`size` 三档；`#actions` 放引导按钮；`#image` 替换内置插图；`description` 可被默认插槽覆盖。" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| description | 描述文案 | `string` | `'暂无数据'` |
| size | 插图与间距档 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| classNames | 部件类名（`root / image / description / actions`） | `Partial<Record<Part, string>>` | — |
| styles | 部件内联样式（`root / image / description / actions`） | `Partial<Record<Part, CSSProperties>>` | — |

<CommonProps />

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义描述内容（优先于 `description`） |
| image | 替换插图 |
| actions | 操作区 |

无事件。

## 注意事项

- 内置插图是装饰性 SVG（`aria-hidden`），描述文本负责读屏传达。
- 表格空态可直接复用：`KTable` 默认在无数据时渲染 KEmpty。