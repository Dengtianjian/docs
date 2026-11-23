# KSegmented 分段控制器

> 共同约定见 [共同约定](./index.md)。P6 基础补齐。在少量互斥选项之间切换，带滑轨指示与键盘导航。

## 何时使用

- 在 2–5 个视图/筛选之间切换；
- 代替 Tabs 做轻量、无路由的切换。

## 代码演示

<Demo path="segmented/basic" title="基础与尺寸" :desc="['v-model 绑定当前值。', 'size 支持 sm / md / lg。', '切换时滑轨动画跟随；点击当前项不重复派发。']" />

<Demo path="segmented/block" title="通栏 / 描边 / 禁用" :desc="['block 占满容器宽度并等分。', 'variant=outlined 使用描边外观。', 'disabled 或选项 disabled 阻止切换。']" />

<Demo path="segmented/measured" title="不等宽选项" :desc="['滑轨读取每个选项的真实位置与宽度，不按等分计算。', '文案长短不同、可选间距不同时，滑轨仍与选中项对齐。', '切换时滑轨同时过渡位置与宽度。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | 选项 | `KSegmentedOption[]` | — |
| modelValue | 当前值 | `string \| number` | — |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| variant | 外观 | `'filled' \| 'outlined'` | `'filled'` |
| block | 通栏等分 | `boolean` | `false` |
| disabled | 整体禁用 | `boolean` | `false` |
| classNames / styles | 部件：`root / thumb / option / label / icon` | — | — |

### KSegmentedOption

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| label | 文案 | `string` |
| value | 值 | `string \| number` |
| disabled | 单项禁用 | `boolean` |
| icon | 图标组件 | `Component` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| option | 自定义选项内容，作用域 `{ option, active }` |
| icon | 自定义图标，作用域 `{ option }` |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 值变化 | `string \| number` |
| change | 值变化 | `string \| number` |

<CommonProps />

## 注意事项

- 使用 `radiogroup / radio` 语义；左右方向键切换，Home / End 跳到首尾项。
- 禁用项会被键盘导航跳过。
- 滑轨按每个选项的真实 `offset + width` 测量定位，不等宽选项也会对齐；窗口尺寸、文案或选项变化后自动重算。