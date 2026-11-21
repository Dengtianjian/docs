# KPinInput 验证码输入

> 共同约定见 [共同约定](./index.md)。P7 数据与导航。逐位输入、粘贴分发、OTP 自动填充与分组显示。

## 何时使用

- 短信验证码、支付密码、设备配对码；
- 需要限制位数、隐藏字符或按组分隔；
- 需要整段粘贴自动分配到各位。

## 代码演示

<Demo path="pin-input/basic" title="基础验证码" :desc="['`length` 控制位数，默认 6。', '输入满位派发 `complete`。', '清空与填入示例会同步 `v-model`。']" />

<Demo path="pin-input/otp" title="OTP、掩码与分组" :desc="['`otp` 在首位提示系统短信验证码自动填充。', '`mask` 隐藏输入内容。', '`groupSize` + `separator` 按组插入分隔符。']" />

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