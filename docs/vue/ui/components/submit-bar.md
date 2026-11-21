# KSubmitBar 提交栏 / KActionBar 操作栏

> 共同约定见 [共同约定](./index.md)。P9 移动端专项。底部固定提交栏与通用操作条。

## 何时使用

- 购物车结算、表单提交；
- 详情页底部主次操作；
- 需要固定底部、安全区与加载态。

## 代码演示

<Demo path="submit-bar/basic" title="提交栏" :desc="['`price / label` 展示合计，`buttonText` 为主按钮。', '`loading` 显示提交中并禁用按钮，`submit` 派发。', '`fixed` + `placeholder` 可吸附底部并占位。']" />

<Demo path="submit-bar/action" title="操作栏" :desc="['`items` 定义多个操作，`type` 控制主次与危险色。', '`#left` 放计数或说明。', '`select` 派发操作项。']" />

## API

### KSubmitBar Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 说明文本 | `string` | — |
| price | 金额 | `number \| string \| null` | — |
| currency | 币种符号 | `string` | `'¥'` |
| precision | 小数位 | `number` | `2` |
| buttonText | 按钮文案 | `string` | `'提交'` |
| buttonType | 按钮色 | `'primary' \| 'warning' \| 'danger'` | `'primary'` |
| loading / loadingText | 加载态 | `boolean` / `string` | false / 提交中… |
| disabled | 禁用 | `boolean` | `false` |
| fixed / placeholder | 固定底部 / 占位 | `boolean` | false |
| safeArea | 底部安全区 | `boolean` | `true` |
| classNames / styles | 部件：`root / left / label / price / right / button` | — | — |

事件：`submit`；插槽：`left / button`。

### KActionBar Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 操作项 | `KActionBarItem[]` | `[]` |
| align | 对齐 | `'right' \| 'space-between'` | `'right'` |
| fixed | 固定底部 | `boolean` | `false` |
| safeArea | 安全区 | `boolean` | `true` |
| loading | 禁用操作 | `boolean` | `false` |
| classNames / styles | 部件：`root / left / actions / item` | — | — |

### KActionBarItem

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| key | 唯一键 | `string \| number` |
| text | 文本 | `string` |
| type | 类型 | `'default' \| 'primary' \| 'danger' \| 'warning'` |
| disabled | 禁用 | `boolean` |

事件：`select(item)`；插槽：`left / default`。