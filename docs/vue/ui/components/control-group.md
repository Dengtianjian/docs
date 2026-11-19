# KControlGroup 控件组

> 共同约定见 [共同约定](./index.md)。把输入类控件（KInput / KInputNumber / KSelect / KButton…）拼接成一组：共享边框、首尾圆角、中间直角；横向或纵向，可通栏等分。仅做视觉拼接与排布，校验/标签/错误信息仍走 KFormItem。

## 何时使用

- 搜索条、筛选栏、表单内联操作等需要把多个控件视觉上连成一整块。
- 与「表单字段分组」不同：本组件只做视觉拼接与排布，不参与校验、标签、错误信息；表单字段分组请用 KFormItem / 后续字段组。

## 代码演示

<Demo path="control-group/basic" title="横向拼接" desc="输入、选择、按钮顺序拼接：相邻控件共享 1px 边框并压边，首尾保留圆角、中间直角；hover / 聚焦项自动抬层盖住邻边。" />

<Demo path="control-group/block" title="通栏等分" desc="`block`：宽度 100%，子项 `flex: 1` 等分拉伸；适合搜索条、筛选栏。" />

<Demo path="control-group/vertical" title="纵向拼接" desc="`vertical`：子项上下拼接、压边，首尾保留圆角；适合窄栏表单。" />

<Demo path="control-group/composite" title="复合控件" desc="InputNumber、Select、按钮型 RadioGroup 的边缘圆角会透传到各自内部视觉壳；Checkbox/Radio/Switch 等无边框控件用 KControlGroupItem 补输入框同款外壳，也可直接放文字。" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| vertical | 纵向拼接（默认横向） | `boolean` | `false` |
| block | 通栏：宽度 100%，子项拉伸填满 | `boolean` | `false` |

<CommonProps />

### Slots

| 插槽 | 说明 | 参数 |
| --- | --- | --- |
| default | 组成控件组的子控件（直接子元素参与拼接） | — |

### KControlGroupItem

控件组内的通用外壳：给无边框控件或纯文字补与 Input 同款的边框/底色/高度，并作为直接子元素参与首尾圆角与压边。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| classNames / styles | 根节点类名/内联样式覆盖 | `{ root?: string }` / `{ root?: CSSProperties }` | — |
| render | 自定义渲染闭包（`#render` 插槽优先） | `KRenderFn` | — |

| 插槽 | 说明 |
| --- | --- |
| default | 外壳内容：Checkbox/Radio/Switch，或纯文字 |

部件变量：`--k-control-group-item-height`（`--k-control-height`）、`-padding-x`（`--k-size`）、`-radius`（`--k-border-radius`）、`-bg`、`-border-color`、`-border-width`、`-text-color`。

## 注意事项

- 拼接依赖**直接子元素**：请把控件平铺在默认插槽里，不要再包一层 div；子控件尺寸建议保持一致（同一 `size`），否则高度不齐。
- 边框来自子控件自身：相邻项 `margin: -1px` 压边，首/末项保留圆角、中间直角；hover / `:focus-within` 子项 `z-index: 1` 抬层，激活边不会被邻居盖住。
- **复合控件圆角透传**：Select 的圆角画在 `.k-select__control`、InputNumber 画在内部 KInput、按钮型 RadioGroup 画在首尾 `.k-radio--button` 上，组件组会把边缘规则透传到这些视觉壳。
- **无边框控件用 KControlGroupItem 包裹**：Checkbox/Radio/Switch 自身没有输入框外壳，直接放进来会与相邻控件脱节；包一层 `KControlGroupItem` 后获得与 Input 同款的高度、边框、底色与圆角，作为直接子元素参与首尾圆角拼接。该外壳也可只放文字（如「单位：件」）。
- `block` 下子项 `flex: 1 1 0; min-width: 0`，输入类控件自动去掉 100% 宽参与拉伸；非 block 时按子控件自身宽度排布。
- 只做视觉拼接，不含间距：需要间隔请用 KSpace，需要标签/校验请用 KFormItem。
- 纵向模式子项强制 `width: 100%`，上下压边。

## 自定义渲染（headless）

提供 `#render` 作用域插槽（优先）或 `render` 闭包 prop 任一，整件视觉输出被替换；绑定包 `rootAttrs`（`data-part="root"` + `data-vertical/data-block`）散播到自绘根节点即继承布局语义。通用契约见 [headless 自定义渲染](../headless.md)。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| vertical | `boolean` | 是否纵向 |
| block | `boolean` | 是否通栏等分 |
| rootAttrs | `Record<string, unknown>` | 根节点布局属性包 |
| slots | `Slots` | 当前 slots 访问对象 |

注意：拼接边框/圆角是视觉规则，headless 自绘需自行实现；`render` prop 经 `h()` 自绘时样式须全局或内联。
