# KNumberKeyboard 数字键盘

> 共同约定见 [共同约定](./index.md)。P9 移动端专项。自绘数字键盘；密码与验证码输入见 [KPinInput](./pin-input.md) 系列。

## 何时使用

- 金额、数量等需要自定义数字键盘的纯数字输入；
- 需要自绘键盘避免系统键盘遮挡；
- 需要把键盘输出接到分格输入或密码展示壳。

## 代码演示

<Demo path="number-keyboard/keyboard" title="数字键盘" :desc="['`v-model` 绑定输入值，`input` 派发按键。', '`random` 打乱数字键，`maxlength` 限制长度。', '`show-extra-key` 提供自定义功能键，删除键派发 `delete`。']" />

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

### 与 KPinInput 系列的分工

- `KNumberKeyboard` 是自绘键盘输入面板，只负责按键与输出字符串；不处理光标、分格、粘贴、掩码和 OTP。
- `KPinInput` 是分格验证码输入框，负责键入、粘贴、退格、分组与 OTP 提示；不是键盘。
- `KPasscodeInput` 是 `KPinInput` 的掩码预设；`KPasswordInput` 是旧 API 兼容密码预设，内部同样使用 `KPinInput`。
- 需要“自定义键盘 + 分格展示”时，用 `KNumberKeyboard` 的 `v-model` 驱动 `KPinInput` 的值即可，两者是组合关系，不重复。

密码、验证码的 Props 与预设说明统一见 [KPinInput](./pin-input.md)。