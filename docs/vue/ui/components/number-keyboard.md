# KNumberKeyboard 数字键盘

> 共同约定见 [共同约定](./index.md)。P9 移动端专项。数字键盘、支付密码与验证码输入三件套。

## 何时使用

- 金额、数量、支付密码等纯数字输入；
- 需要自绘键盘（避免系统键盘遮挡）；
- 需要掩码密码与分组验证码。

## 代码演示

<Demo path="number-keyboard/keyboard" title="数字键盘" :desc="['`v-model` 绑定输入值，`input` 派发按键。', '`random` 打乱数字键，`maxlength` 限制长度。', '`show-extra-key` 提供自定义功能键，删除键派发 `delete`。']" />

<Demo path="number-keyboard/password" title="密码与验证码" :desc="['`KPasswordInput` 单行掩码密码，满位派发 `complete`。', '`KPasscodeInput` 是 KPinInput 的密码预设，`groupSize` 分组。', '两者都支持 error / warning 状态。']" />

## API

### KNumberKeyboard Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 键盘标题 | `string` | `'数字键盘'` |
| showHeader / showClose | 头部 / 收起按钮 | `boolean` | true |
| showDelete / deleteText | 删除键 | `boolean` / `string` | true / 删除 |
| showExtraKey / extraKeyText | 功能键 | `boolean` / `string` | false / 完成 |
| random | 随机排列数字 | `boolean` | `false` |
| maxlength | 最大长度 | `number` | — |
| safeArea | 底部安全区 | `boolean` | `true` |
| ariaLabel | 无障碍名称 | `string` | `'数字键盘'` |
| classNames / styles | 部件：`root / header / keys / key / delete` | — | — |

### KNumberKeyboard Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| input | 数字键 | `key, value` |
| delete | 删除 | `value` |
| extra | 功能键 | `text` |
| close | 收起 | — |

### KPasswordInput Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| length | 位数 | `number` | `6` |
| mask | 隐藏字符 | `boolean` | `true` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| status | 状态 | `'error' \| 'warning'` | — |
| disabled | 禁用 | `boolean` | `false` |
| placeholder | 占位 | `string` | `'请输入支付密码'` |
| ariaLabel | 无障碍名称 | `string` | `'支付密码'` |

事件：`change` / `complete` / `focus` / `blur`；暴露 `focus()` / `clear()`。

### KPasscodeInput

Props：`length / mask / size / status / disabled / ariaLabel`；其余属性与事件透传给 KPinInput。