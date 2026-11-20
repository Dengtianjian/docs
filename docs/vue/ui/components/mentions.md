# KMentions 提及

> 共同约定见 [共同约定](./index.md)。表单补充批。在文本输入中通过触发字符唤起候选列表，选择后插入标签。

## 何时使用

- 评论、工单、协作备注中的 @成员；
- 需要把结构化对象（人、标签、部门）插入自由文本。

## 代码演示

<Demo path="mentions/basic" title="基础用法" :desc="['输入 `@` 唤起候选，继续输入过滤。', '上下方向键切换，Enter / Tab 选中，Esc 关闭。', '`#option` 可替换候选项内容。']" />

## API

### KMentions Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 文本内容 | `string` | `''` |
| options | 候选项 | `KMentionsOption[]` | `[]` |
| trigger | 触发字符 | `string` | `'@'` |
| rows | 文本域行数 | `number` | `3` |
| placeholder | 占位文本 | `string` | — |
| disabled / readonly | 禁用 / 只读 | `boolean` | `false` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| status | 校验态 | `'error' \| 'warning'` | FormItem 兜底 |
| maxlength | 最大长度 | `number` | — |
| notFoundContent | 无匹配文案 | `string` | `'无匹配项'` |
| filter | 自定义过滤 | `(pattern, option) => boolean` | label/value 包含 |
| render | 自定义渲染闭包 | `KRenderFn<KMentionsRenderScope>` | — |
| classNames / styles | 部件类名 / 样式 | `Partial<Record<Part, …>>` | — |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| change | 文本变化 | `value: string` |
| select | 选中候选项 | `option: KMentionsOption` |
| search | 触发字符后的查询变化 | `pattern: string` |
| focus / blur | 焦点事件 | `FocusEvent` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| option | 候选内容，scope `{ option, active }` |
| render | headless 整件替换 |

## 注意事项

- 触发字符只有在行首、空白或 `([{` 之后才生效，避免普通邮箱地址误触发。
- 选中后插入 `trigger + label + 空格`，value 作为候选项元数据通过 `select` 事件返回。
- 弹层与输入框共享焦点；点击候选不会先触发 blur。