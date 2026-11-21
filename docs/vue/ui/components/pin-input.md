# KPinInput 验证码输入

> 共同约定见 [共同约定](./index.md)。P7 数据与导航。分段验证码 / PIN 输入，支持粘贴、自动填充与完整键盘操作。

## 何时使用

- 短信验证码、支付密码、邀请码等定长字符输入；
- 需要逐位聚焦、自动跳格与一次性验证码自动填充。

## 代码演示

<Demo path="pin-input/basic" title="基础与分组" :desc="['`v-model` 为拼接后的字符串。', '`length` 控制位数，`groupSize` + `separator` 做视觉分组。', '输入满位后自动失去焦点前移，满位派发 `complete`。']" />

<Demo path="pin-input/states" title="尺寸、掩码与状态" :desc="['`mask` 使用密码框样式，`otp` 开启一次性验证码 autocomplete。', '`size` 三档，`status` 支持 error / warning。', '`disabled` / `readonly` 均不可编辑，视觉有区分。']" />

<Demo path="pin-input/otp" title="校验与自动提交" :desc="['监听 `complete` 直接发起校验。', '校验失败时把 `status` 设为 `error` 并给出提示。', '支持整段粘贴、退格回退、方向键与 Home / End。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 输入值 | `string` | `''` |
| length | 位数 | `number` | `6` |
| type | 字符类型 | `'numeric' \| 'text'` | `'numeric'` |
| mask | 掩码显示 | `boolean` | `false` |
| otp | 一次性验证码 autocomplete | `boolean` | `false` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| status | 校验状态 | `'error' \| 'warning'` | — |
| disabled | 禁用 | `boolean` | `false` |
| readonly | 只读 | `boolean` | `false` |
| groupSize | 每 N 位插入分隔符 | `number` | `0` |
| separator | 分隔符文本 | `string` | `'—'` |
| ariaLabel | 无障碍名称 | `string` | `'验证码'` |
| classNames / styles | 部件：`root / item / separator` | — | — |

### Expose

| 方法 | 说明 |
| --- | --- |
| focus(index?) | 聚焦指定位或第一个空位 |
| clear() | 清空并聚焦首位 |
| inputs | 原生 input 引用数组 |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 值变化 | `string` |
| change | 值变化 | `string` |
| complete | 满位 | `string` |
| focus / blur | 聚焦 / 失焦 | `index` |

<CommonProps />

## 注意事项

- 每位输入框 `maxlength=1`，输入法或自动填充写入多位时会按位拆分填充。
- 粘贴会从当前格开始覆盖后续格，超出位数截断。
- 所有输入框共享同一 `role="group"`，逐位提供「第 n 位，共 m 位」标签；错误态设置 `aria-invalid`。
- 模型为拼接字符串：中间位留空时后续字符会前移，如需保留空位请在业务侧使用 `inputs` 或自行管理分段数据。
