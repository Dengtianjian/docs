# KSkeleton 骨架屏

> 共同约定见 [共同约定](./index.md)。P3 数据展示批。内容加载占位：头像/标题/段落组合，或包裹内容做加载切换。

## 何时使用

- 首屏或区块数据未就绪，提前占位减少布局跳动；
- 需要从骨架平滑切换到真实内容（包裹模式）。

## 代码演示

<Demo path="skeleton/basic" title="组合 / 动画 / 包裹模式" :desc="['`avatar` 支持尺寸与方形。', '`paragraph` 控制行数与逐行宽度。', '`active` 微光动画。', '`round` 圆角行。', '包裹模式下 `loading` 切换内容与骨架，并输出 `aria-busy`。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| loading | 包裹模式开关；无默认插槽时始终显示骨架 | `boolean` | `false` |
| active | 微光动画 | `boolean` | `false` |
| round | 标题/段落行圆角 | `boolean` | `false` |
| avatar | 头像：布尔或 `{ size, shape }` | `boolean \| object` | `false` |
| title | 显示标题条 | `boolean` | `true` |
| paragraph | 段落：布尔或 `{ rows, width }`（width 可为数组） | `boolean \| object` | `true` |
| classNames | 部件类名（`root / avatar / title / paragraph / row`） | `Partial<Record<Part, string>>` | — |
| styles | 部件内联样式（`root / avatar / title / paragraph / row`） | `Partial<Record<Part, CSSProperties>>` | — |

<CommonProps />

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | `loading=false` 时展示的内容 |

无事件。

## 注意事项

- 骨架本身 `aria-hidden`；包裹模式在骨骼展示时给容器 `aria-busy="true"`。
- 行高、头像尺寸均由 token 控制，重内容请按实际版式调整 `paragraph.width`。