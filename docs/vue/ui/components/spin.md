# KSpin 加载中

> 共同约定见 [共同约定](./index.md)。P2b 反馈批第七件。区域级加载态：独立指示器或包裹内容的遮罩。

## 何时使用

- 区块内容等待数据时包裹加载；按钮内的即时反馈用 KButton `loading`，全页加载用骨架/进度条方案。

## 代码演示

<Demo path="spin/basic" title="三档尺寸 / tip / 包裹模式" desc="独立用法与包裹用法（内容压暗 + inert 禁交互）；spinning=false 整体不渲染指示器。" />

<Demo path="spin/render" title="自定义渲染（headless）" desc="双通道：`#render` 自绘包裹遮罩（nestedAttrs 继承 inert/aria-busy，delay 收敛态照跑）；`render` prop 自绘三点脉冲。" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| spinning | 加载态 | `boolean` | `true` |
| size | 指示器档位 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| tip | 指示器下方文案（支持 VNode） | `string \| VNode` | — |
| delay | 延迟展示毫秒（防瞬时请求闪烁） | `number` | — |
| render | 自定义渲染闭包（`#render` 插槽优先）；提供时整件视觉输出被替换 | `(scope: KSpinRenderScope) => VNodeChild` | — |
| classNames / styles | `root \| indicator \| tip \| nested` | — | — |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 被包裹内容（传了即进包裹模式） |
| indicator | 自定义加载指示（替换内建 spinner） |
| render | 自定义渲染作用域插槽，scope 见文末「自定义渲染」节；提供时整件替换 |

无事件。`tip` 为 prop（无插槽）。

### 部件变量

| 变量 | 初值 |
| --- | --- |
| `--k-spin-dot-size`（含 `-sm/-lg` 档） | `6×step / 4.5×step / 8×step`（24/18/32px） |
| `--k-spin-color / --k-spin-tip-color` | `--k-color-primary` |
| 旋转 | `--k-motion-duration-spin`（1s）linear infinite |
| 包裹内容压暗 | `opacity .45` + `user-select/pointer-events` 关闭 + `inert` |

## 注意事项

- spinner 为内建 inline SVG（`stroke-dasharray` 圆环），与反馈件图标同路线，零图标依赖。
- `inert` 让被包裹区整体退出焦点序列，读屏播报 `role="status"`；静态渲染可补 `aria-live`。
- delay 只对「进入」生效：`spinning` 转 false 立即收起，避免加载完成反而晚出现。

## 自定义渲染（headless）

双通道 `#render` 插槽（优先）/ `render` prop，通用契约见 [headless 自定义渲染](../headless.md)。scope = `KSpinRenderScope`（入口导出），字段逐组如下（纯状态指示件：只有状态 + 绑定包，无 ref/出口与动作组；headless 分支不受 spinning 门控，收起/展示由自绘消费 `spinning` 自理）。

#### 状态（只读快照）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| spinning | `boolean` | **delay 收敛后的展示态**（非原始 prop）：`delay > 0` 时转 true 要等 delay 毫秒才展示（防瞬时请求闪烁），转 false 立即收起并清计时器（组件卸载也清理）；自绘指示器用它做 `v-if` 门控 |
| size | `'sm' \| 'md' \| 'lg'` | 指示器档位；默认渲染映射 `--k-spin-dot-size`（18/24/32px），自绘可映射为自己的尺寸变量 |
| tip | `string \| VNode \| undefined` | 指示器下方文案（VNode 经 KNode 渲染）；纯 prop 通道，无同名插槽 |
| nested | `boolean` | 是否传了默认插槽（包裹模式标记）；自绘据此决定画独立指示器还是包裹遮罩结构 |

#### 绑定包（spread 到自绘节点才继承）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| rootAttrs | `Record<string, unknown>` | 根节点：仅 `data-part="root"`。**不含 `k-spin` token 宿主类**——`--k-spin-dot-size / -color / -tip-color` 变量与尺寸档类由默认模板追加；自绘布局（独立 inline-flex / 包裹 block 定位上下文）全自理 |
| nestedAttrs | `Record<string, unknown>` | 包裹内容节点：`data-part="nested"` + `inert` / `aria-busy`（展示态为 true 时携带，false 时为 undefined 即不输出该属性）——绑到自绘包裹层即继承「整体退出焦点序列 + 读屏 busy 播报」；压暗（opacity .45）与 `user-select/pointer-events` 关闭是默认 CSS 视觉，自绘自理（`inert` 本身已禁交互） |
| indicatorAttrs | `Record<string, unknown>` | 指示器节点：`data-part="indicator"` + `role="status"` + `aria-live="polite"`（加载态读屏播报语义）；spinner 图形与旋转动画自绘（或取 `slots.indicator`） |

另有 `slots`（`ReturnType<typeof useSlots>`）：默认渲染的插槽集合（default = 被包裹内容、indicator = 自定义指示器），自绘时可按需取用，如 `ctx.slots.default?.()`。
