# KPinInput 验证码 / 密码输入

> 共同约定见 [共同约定](./index.md)。P7 数据与导航。逐位输入、粘贴分发、OTP 自动填充与分组显示，附带密码 / 验证码预设。

## 何时使用

- 短信验证码、支付密码、设备配对码；
- 需要限制位数、隐藏字符或按组分隔；
- 需要整段粘贴自动分配到各位；
- 需要直接使用掩码预设或单行支付密码壳。

## 代码演示

<Demo path="pin-input/basic" title="基础验证码" :desc="['`length` 控制位数，默认 6。', '输入满位派发 `complete`。', '清空与填入示例会同步 `v-model`。']" />

<Demo path="pin-input/otp" title="OTP、掩码与分组" :desc="['`otp` 在首位提示系统短信验证码自动填充。', '`mask` 隐藏输入内容，并关闭浏览器原生的显示密码按钮。', '`groupSize` + `separator` 按组插入分隔符。']" />

<Demo path="pin-input/presets" title="密码与验证码预设" :desc="['`KPasscodeInput` 是 KPinInput 的掩码预设，支持分组。', '`KPasswordInput` 是为旧 API 保留的兼容密码预设，内部同样使用 KPinInput。', '两者都支持 error / warning 状态。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| length | 位数 | `number` | `6` |
| type | 输入类型 | `'numeric' \| 'text'` | `'numeric'` |
| mask | 隐藏字符 | `boolean` | `false` |
| otp | 开启 OTP 自动填充提示 | `boolean` | `false` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| status | 状态 | `'error' \| 'warning'` | — |
| disabled / readonly | 禁用 / 只读 | `boolean` | `false` |
| groupSize | 每组位数，0 不分组 | `number` | `0` |
| separator | 分组分隔符 | `string` | `'-'` |
| ariaLabel | 无障碍名称 | `string` | `'验证码'` |
| classNames / styles | 部件：`root / item / separator` | — | — |

### v-model

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| modelValue | 当前验证码 | `string` |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| change | 内容变化 | `value` |
| complete | 输入满位 | `value` |
| focus / blur | 聚焦 / 失焦 | `index` |

### 暴露方法

`focus(index = 0)` / `clear()` / `value`。

### KPasscodeInput

`KPinInput` 的掩码预设，默认 `mask / size / status / disabled / ariaLabel`，其余 Props、事件和暴露方法与 KPinInput 一致。

### KPasswordInput Props

> 兼容预设：内部渲染 KPinInput，保留旧 Props / 事件 / `focus()` / `clear()`；新代码优先使用 KPinInput 或 KPasscodeInput。

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

兼容映射：`classNames/styles` 的 `root` 作用于外壳，`field` 作用于 KPinInput 根节点，`cell` / `input` 作用于每个格子；旧的 `dot` 部件不再生效。

### 注意

- 掩码与 OTP 模式使用 `autocomplete="one-time-code"`，并标记忽略主流密码管理器，避免被识别为普通登录密码框。
- 浏览器原生的密码查看按钮已通过 `::-ms-reveal` 与 WebKit 伪元素隐藏。
- 分格验证码优先用 KPinInput，掩码分格用 KPasscodeInput；KPasswordInput 仅为旧 API 兼容预设，同一场景不要混用。