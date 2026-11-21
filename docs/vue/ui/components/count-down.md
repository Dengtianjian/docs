# KCountDown 倒计时 / KRollingText 滚动数字

> 共同约定见 [共同约定](./index.md)。P9 移动端专项。时间倒计时与逐位滚动的数字动画。

## 何时使用

- 秒杀、验证码、活动倒计时；
- 数据面板数字变化需要滚动动画；
- 需要开始 / 暂停 / 重置控制。

## 代码演示

<Demo path="count-down/countdown" title="倒计时" :desc="['`time` 为毫秒，`format` 支持 DD / HH / mm / ss。', '`finish` 在归零时派发一次。', '通过 ref 调用 `start / pause / reset`。']" />

<Demo path="count-down/rolling" title="滚动数字" :desc="['数字逐位使用纵向轨道过渡。', '`duration` 控制滚动时长，非数字字符保持静止。', '`prefers-reduced-motion` 下关闭过渡。']" />

## API

### KCountDown Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| time | 总时长（ms） | `number` | `0` |
| format | 格式 | `string` | `'HH:mm:ss'` |
| autoStart | 自动开始 | `boolean` | `true` |
| interval | 步进（ms） | `number` | `1000` |
| ariaLabel | 无障碍名称 | `string` | `'倒计时'` |
| classNames / styles | 部件：`root` | — | — |

### KCountDown Slots

`default` 作用域：`{ days, hours, minutes, seconds, formatted }`。

事件：`change(remaining)` / `finish`；暴露 `start()` / `pause()` / `reset()` / `remaining`。

### KRollingText Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 文本或数字 | `string \| number` | `0` |
| duration | 过渡时长（ms） | `number` | `600` |
| height | 高度 | `number \| string` | — |
| classNames / styles | 部件：`root / char / track` | — | — |

根节点带 `aria-label`，数字列对读屏隐藏。