# KListbox 列表框

> 共同约定见 [共同约定](./index.md)。P8 增强件。始终展开的选项列表，支持单选、多选与完整键盘操作。

## 何时使用

- 设置项、筛选器、权限选择等需要直接展示全部选项；
- 需要多选且不希望弹层；
- 需要上下键、Home/End、字母跳转与 ARIA 语义。

## 代码演示

<Demo path="listbox/basic" title="单选" :desc="['`options` 提供 `label / value / description / disabled`。', '点击选项更新 `v-model`。', '当前项使用主色浅底与勾选态。']" />

<Demo path="listbox/multiple" title="多选" :desc="['`multiple` 后模型为数组。', '↑ / ↓ 移动，Enter / Space 切换，字母键跳转。', '`#header / #footer` 可展示计数与提示。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | 选项列表 | `KListboxOption[]` | `[]` |
| multiple | 多选 | `boolean` | `false` |
| disabled | 禁用全部 | `boolean` | `false` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| maxHeight | 列表最大高度 | `number \| string` | `240` |
| showCheck | 单选时也显示勾选位 | `boolean` | `false` |
| emptyText | 空态文案 | `string` | `'暂无可选项'` |
| ariaLabel | 列表名称 | `string` | `'选项列表'` |
| classNames / styles | 部件：`root / header / list / option / indicator / body / label / description / empty / footer` | — | — |

### KListboxOption

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| label | 文本 | `string` |
| value | 值 | `unknown` |
| description | 描述 | `string` |
| disabled | 禁用 | `boolean` |
| key | 唯一键 | `string \| number` |

### v-model

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| modelValue | 单选值或多选数组 | `unknown \| unknown[]` |

### Slots

| 插槽名 | 说明 | 作用域 |
| --- | --- | --- |
| header | 列表顶部 | — |
| option | 自定义选项内容 | `{ option, index, selected }` |
| empty | 空态 | — |
| footer | 列表底部 | — |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| change | 选择变化 | `value` |
| update:modelValue | 选择变化 | `value` |

### 键盘

`↑ / ↓` 移动，`Home / End` 首尾，`Enter / Space` 选择，字母键按前缀跳转；禁用项自动跳过。