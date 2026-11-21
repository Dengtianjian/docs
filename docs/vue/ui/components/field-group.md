# KFieldGroup 字段组

> 共同约定见 [共同约定](./index.md)。P6 基础补齐。给一组相关字段提供统一标题、说明、必填标记与状态反馈。

## 何时使用

- 表单中多个字段属于同一主题（收货信息、开票信息、通知设置）；
- 需要给一组字段统一显示错误/警告信息。

## 代码演示

<Demo path="field-group/basic" title="基础字段组" :desc="['label / description 提供组标题与说明。', '默认纵向排列，子字段间距由组统一控制。', '不需要额外外壳时保持 bordered=false。']" />

<Demo path="field-group/states" title="边框 / 横向 / 状态" :desc="['bordered 给字段组加卡片式外壳。', 'layout=horizontal 标签在左、内容在右。', 'status + message 统一显示错误/警告/成功信息。', 'fieldset disabled 会原生禁用内部控件。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 组标题 | `string` | — |
| description | 组说明 | `string` | — |
| required | 显示必填星号 | `boolean` | `false` |
| disabled | 禁用组内原生控件 | `boolean` | `false` |
| status | 状态 | `'error' \| 'warning' \| 'success'` | — |
| message | 状态文案 | `string` | — |
| bordered | 卡片式外壳 | `boolean` | `false` |
| layout | 标签与内容排布 | `'vertical' \| 'horizontal'` | `'vertical'` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| classNames / styles | 部件：`root / header / label / description / extra / content / message` | — | — |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 组内字段 |
| label / description | 自定义标题/说明 |
| extra | 标题右侧内容 |
| message | 自定义状态文案 |

<CommonProps />

## 注意事项

- 使用原生 `fieldset / legend`；`disabled` 会一并禁用内部原生表单控件。
- 字段组只负责分组与状态展示，不替代 `KFormItem` 的校验逻辑。
- `status=error` 时消息区使用 `role="alert"`，其余状态为 `role="status"`。