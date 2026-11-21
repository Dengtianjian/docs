# KSearchBar 搜索栏

> 共同约定见 [共同约定](./index.md)。P9 移动端专项。带搜索图标、清空与取消的移动端输入条。

## 何时使用

- 商品、联系人、组件库搜索；
- 需要移动端取消按钮与清空操作；
- 需要圆角 / 方形两种外观。

## 代码演示

<Demo path="search-bar/basic" title="基础搜索" :desc="['`v-model` 绑定关键字，回车派发 `search`。', '`show-action` 显示取消按钮，`cancel` 可清空或退出搜索。', '有内容时出现清空按钮。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| placeholder | 占位文案 | `string` | `'搜索'` |
| showAction | 显示取消 | `boolean` | `false` |
| actionText | 取消文案 | `string` | `'取消'` |
| shape | 形状 | `'round' \| 'square'` | `'round'` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| disabled | 禁用 | `boolean` | `false` |
| autofocus | 自动聚焦 | `boolean` | `false` |
| maxlength | 最大长度 | `number` | — |
| ariaLabel | 无障碍名称 | `string` | `'搜索'` |
| classNames / styles | 部件：`root / field / icon / input / clear / action` | — | — |

### v-model

`modelValue: string`

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| search | 回车搜索 | `value` |
| clear | 清空 | — |
| cancel | 取消 | — |
| focus / blur | 聚焦 / 失焦 | `FocusEvent` |

### 暴露方法

`focus()` / `blur()`。