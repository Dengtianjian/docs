# KPicker 选择器

> 共同约定见 [共同约定](./index.md)。P9 移动端专项。底部多列滚轮选择器；`KPickerView` 提供可内联的滚轮列。

## 何时使用

- 地区、日期、规格等多列联动选择；
- 需要底部弹出 + 取消 / 确定工具栏；
- 页面内嵌滚轮（不弹层）。

## 代码演示

<Demo path="picker/basic" title="底部选择器" :desc="['`columns` 每列提供 `options`，`v-model` 绑定值数组。', '滚动停止后吸附到最近项，禁用项自动跳过。', '`confirm` 派发确认值，`cancel` 恢复原值。']" />

<Demo path="picker/inline" title="内联滚轮" :desc="['`KPickerView` 不带弹层，可直接嵌入页面。', '`visibleCount` 控制可见行数，`itemHeight` 控制行高。', '↑ / ↓ / Home / End 可键盘选择。']" />

## API

### KPicker Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 列配置 | `KPickerColumn[]` | `[]` |
| title | 标题 | `string` | `'请选择'` |
| cancelText / confirmText | 取消 / 确定文案 | `string` | 取消 / 确定 |
| visibleCount | 可见行数 | `number` | `5` |
| itemHeight | 行高（px） | `number` | `36` |
| loading | 加载态（禁用操作） | `boolean` | `false` |
| closeOnMask | 遮罩关闭 | `boolean` | `true` |
| safeArea | 底部安全区 | `boolean` | `true` |
| ariaLabel | 无障碍名称 | `string` | 标题 |
| classNames / styles | 部件：`root / header / title / footer / column / scroller / option / highlight` | — | — |

### KPickerColumn / Option

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| key | 列键 | `string \| number` |
| label | 列名称 | `string` |
| options | 选项 | `KPickerOption[]` |
| option.label | 文本 | `string` |
| option.value | 值 | `string \| number \| boolean \| null` |
| option.disabled | 禁用 | `boolean` |

### v-model

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| open | 是否打开 | `boolean` |
| modelValue | 各列选中值 | `KPickerValue[]` |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| confirm | 确认 | `values` |
| cancel | 取消 | — |
| change | 滚动变化 | `values, column, value` |
| close | 关闭 | — |

### KPickerView Props

`columns / visibleCount / itemHeight / disabled / ariaLabel / classNames / styles`，`v-model` 绑定值数组，事件 `change(values, column, value)`。

### 键盘

列可聚焦：`↑ / ↓` 切换选项，`Home / End` 首尾，禁用项自动跳过。