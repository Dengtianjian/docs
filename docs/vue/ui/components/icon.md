# KIcon 图标

> 共同约定见 [共同约定](./index.md)。图标容器：尺寸、旋转、无障碍语义一次搞定，图标本体（svg）由业务自带。

## 何时使用

- 需要以 `1em` 跟随上下文字号/颜色渲染 svg 图标的场合；
- **推荐图标集已定稿（Q1，2026-11-17）= `@vicons/tabler`**（Tabler 1500+ 图标经 vicons 编译的 Vue3 组件，MIT，`1em × 1em + currentColor`，与本件契约天然吻合）；`component` 注入模式保持不变——业务仍可换任意图标方案（其它 vicons 集合、svg 组件、iconfont、unplugin-icons 皆可）；

## 代码演示

<Demo path="icon/sizes" title="尺寸与颜色" desc="轴名 xs/sm/md/lg 映射图标尺寸阶梯（14/16/24/32px），数字 = 直接 px；`currentColor` 继承父级文字颜色。" />

<Demo path="icon/spin" title="旋转" desc="`spin` 走 `motionDurationSlow` linear 动画；`label` 决定读屏语义——有则 `role=img` + aria-label，无则 `aria-hidden` 视为装饰件。" />

<Demo path="icon/render" title="自定义渲染（headless）" desc="`#render` 自绘图标盒（label→role=img 语义继承）；`render` prop 画旋转徽章（spin 状态驱动自绘动画，数字 size 随 rootAttrs）。" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| component | 图标组件（svg 组件等），也可用默认插槽直接放内容 | `Component` | — |
| size | 尺寸：轴名映射图标阶梯，数字为 px，缺省跟随当前字号 | `number \| 'xs' \| 'sm' \| 'md' \| 'lg'` | — |
| spin | 持续旋转 | `boolean` | `false` |
| label | 无障碍标签；不传视为装饰性图标（`aria-hidden`） | `string` | — |

<CommonProps />

其余透传属性（class/style/aria-*）落到根节点。

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 内联 svg 内容（仅 `component` prop 缺省时渲染） |
| render | 自定义渲染作用域插槽，scope 见文末「自定义渲染」节；提供时整件替换 |

无事件。

## 主题定制（部件变量）

| 变量 | 缺省 | 说明 |
| --- | --- | --- |
| `--k-size-icon-xs/sm/md/lg` | `14/16/24/32px` | 尺寸四档（seed `sizeUnit` 阶梯派生） |

## 注意事项

- 容器是 `inline-flex + 1em`，svg 会继承字号与 `currentColor`——改色直接改父级 `color`，别碰 svg 的 fill；
- 与 KButton 配合时优先用按钮自己的 `icon` prop（尺寸/间距已由按钮管），裸 KIcon 只用于独立图标的场合。

## 自定义渲染（headless）

双通道 `#render` 插槽（优先）/ `render` prop，通用契约见 [headless 自定义渲染](../headless.md)。scope = `KIconRenderScope`（入口导出）。静态件零行为，无 ref / 动作组，仅状态与绑定包两组：

#### 状态（只读快照）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| size | `number \| 'xs' \| 'sm' \| 'md' \| 'lg' \| undefined` | 尺寸原始 prop 值：数字 = px（解析成 fontSize 已进 rootAttrs 的 style）；轴名映射图标阶梯 `--k-size-icon-xs/sm/md/lg`（14/16/24/32px，**由默认渲染的类名提供，不在包内**，自绘按值取 token）；`undefined` = 跟随当前字号（1em 契约） |
| spin | `boolean` | 持续旋转（缺省 `false`）；默认渲染落 `is-spin` 类播放 `k-icon-spin` 动画（时长 `--k-motion-duration-spin`、linear、infinite）——动画类与 keyframes 消费不在包内，自绘按此状态驱动自己的旋转动画 |
| label | `string \| undefined` | 无障碍标签原始值；有 → `role=img` + `aria-label`（已进 rootAttrs），无 → 装饰性 `aria-hidden`。可交互组合件（如 icon-only 按钮）自己负责 aria-label，本件保持装饰性缺省 |
| component | `Component \| undefined` | 图标本体组件（svg 组件等，推荐 `@vicons/tabler`）；自绘可 `<component :is="ctx.component">` 直接渲染；缺省时用默认插槽内容（`ctx.slots.default`） |

#### 绑定包（spread 到自绘节点才继承）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| rootAttrs | `Record<string, unknown>` | 根节点：`data-part="root"` + aria 语义（有 label → `role="img"` + `aria-label=label`；无 label → `aria-hidden=true`，互斥不并存）+ `style`（**仅数字 size** 落 `fontSize: {size}px`，轴名/缺省无 style）+ **透传 attrs 合并**（组件 `inheritAttrs:false`，外部 class/style/aria-* 等全部并进包里、后展开——同名键会覆盖前面的语义/尺寸键，顺序与默认渲染一致）。**不含组件 class**——`k-icon` 的 `inline-flex` 居中、`vertical-align:-0.125em`、svg `1em × 1em + currentColor` 契约、轴名尺寸类与 `is-spin` 动画类全不在包内，视觉自绘 |

另有 `slots`（`ReturnType<typeof useSlots>`）：默认渲染的插槽集合（`default` = 内联 svg 内容，仅 `component` prop 缺省时渲染），自绘时可按需取用，如 `ctx.slots.default?.()`。

---

## 规格附录（实现决策，面向贡献者）

- 图标集选型（Q1）已定 = **@vicons/tabler**：官方 React 版 @ant-design/icons 不适用 Vue，antd 同源 Vue 端口为可选项但未选；容器 + `component` 注入模式不变，业务自带 svg 始终支持；
- `spin` 动画类 `k-icon-spin`，时长取 `--k-motion-duration-slow`、linear；
- a11y 约定：可交互组合件（如 KButton icon-only）自己负责 `aria-label`，KIcon 保持装饰性缺省。
