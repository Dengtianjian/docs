# KInputTags 标签输入

> 共同约定见 [共同约定](./index.md)。P6 基础补齐。输入文本后回车/逗号创建标签，支持删除、上限、校验与清空。

## 何时使用

- 录入技能、关键词、邮箱等可自由创建的短标签；
- 需要限制数量/长度并即时提示非法值时。

## 代码演示

<Demo path="input-tags/basic" title="基础用法" :desc="['v-model 绑定字符串数组。', 'Enter 或中英文逗号创建标签；Backspace 在空输入时删除最后一个。', '点击 × 移除；clearable 提供一键清空。']" />

<Demo path="input-tags/limit" title="数量 / 长度 / 校验" :desc="['max 限制标签数量，maxLength 限制单标签长度。', 'validate 返回 false 或错误文案时阻止添加。', 'invalid 事件返回值和原因，可用于展示错误。']" />

<Demo path="input-tags/variants" title="外观变体" :desc="['标签外壳同样四档：outlined / filled / borderless / underlined。', 'underlined 仅保留底部边框，聚焦不出外圈。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 标签数组 | `string[]` | `[]` |
| placeholder | 占位文案 | `string` | `'输入后回车添加'` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| disabled | 禁用 | `boolean` | `false` |
| readonly | 只读 | `boolean` | `false` |
| max | 最大标签数 | `number` | — |
| maxLength | 单标签最大长度 | `number` | — |
| allowDuplicates | 允许重复 | `boolean` | `false` |
| clearable | 显示清空按钮 | `boolean` | `true` |
| status | 状态 | `'error' \| 'warning'` | — |
| variant | 外观 | `'outlined' \| 'filled' \| 'borderless' \| 'underlined'` | 跟随 KForm（缺省 `'outlined'`） |
| prefix / suffix | 前后缀文案 | `string` | — |
| ariaLabel | 输入框读屏文案 | `string` | `'标签输入'` |
| validate | 自定义校验 | `(value) => boolean \| string` | — |
| classNames / styles | 部件：`root / prefix / tags / tag / tagText / close / input / clear / suffix` | — | — |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| prefix | 前置内容 |
| suffix | 后置内容 |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 标签数组变化 | `string[]` |
| change | 标签数组变化 | `string[]` |
| add | 新增标签 | `(value, tags)` |
| remove | 删除标签 | `(value, index, tags)` |
| invalid | 添加被拒绝 | `(value, reason)` |

<CommonProps />

## 注意事项

- 支持输入法组合态，组合输入期间不会误触发添加。
- 粘贴包含逗号的文本会按逗号拆分并逐个添加。
- 去重、数量、长度与 `validate` 依次校验；被拒绝时通过 `invalid` 返回原因：`duplicate / max-count / max-length / validate`。