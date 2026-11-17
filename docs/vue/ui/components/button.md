# KButton 按钮

> 共同约定见 [共同约定](./index.md)。按钮用于开始一个即时操作。
>
> 本页为使用者文档（示例可交互预览）；页尾「规格附录」保留实现决策与 DOM 契约，其余组件文档按本页结构回填。

## 何时使用

- 标记一个（或一组）可立即触发的操作，如提交、确认、取消；
- 语义选 `type`（primary = 页面主行动，最多一个；danger = 破坏性操作），外观浓度选 `variant`（等级四档：outlined 基础 / filled 次要 / tonal 次次要 / text 次次次要；quiet = text 的灰底交互版；dashed 添加占位（无底色）；ghost 彩色/复杂底图；plain/soft 白底两式（plain 有框 / soft 无边框）；border 隐框交互现边框+文字）；
- 跳转请直接用 `href`（渲染为 `<a>`，可被浏览器右键新开）或路由场景用 [KLink](./link.md)。

## 代码演示

<Demo path="button/types" title="语义类型" desc="`type` 轴：default / primary / info / success / warning / danger / link。" />

<Demo path="button/variants" title="外观变体" desc="`variant` 轴与 `type` 正交，十种外观 × 语义色全矩阵；等级四档（基础/次要/次次要/次次次要 = outlined/filled/tonal/text）+ quiet（text 的灰底交互版）+ dashed（无底色虚线框）+ ghost（透明底，彩色/复杂底图用）+ plain/soft（白底：plain 有框、交互变边框+文字；soft 无边框、交互变背景 tint+文字）+ border（隐框：静置边框透明，交互现边框色+文字色）。" />

<Demo path="button/sizes" title="尺寸" desc="`size` 轴走控件高度阶梯（24/28/32/40），移动端 token 组自动升到 44px 触控高度。" />

<Demo path="button/shapes" title="形状" desc="`shape` 轴：round 全圆角；circle / square 用于 icon-only，circle 需配 `aria-label`。" />

<Demo path="button/states" title="加载与禁用" desc="`loading` 期间不可点且保留宽度防抖动；`disabled` 走原生 disabled（href 场景落 aria-disabled）。" />

<Demo path="button/block" title="块级按钮" desc="`block` 撑满容器宽，常用于移动端与窄卡片。" />

<Demo path="button/icon" title="图标" desc="`icon` prop 注入组件，或 `#icon` 插槽直接放 svg；`#loading` 插槽可自定义加载指示。" />

<Demo path="button/icon-placement" title="图标位置" desc="`iconPlacement` 缺省 start（文字前），end 落文字后；loading  spinner 占图标位一并后移。" />

<Demo path="button/href" title="链接按钮" desc="有 `href` 时渲染 `<a>`（`target` 透传）；`type=link` 是无框文本按钮，独立于 type×variant 矩阵。" />

<Demo path="button/group" title="按钮组" desc="`KButtonGroup` 接壤成组：叠边 -1px、首尾留外侧半径；`size` 下发（子级自传优先）、`vertical` 纵排。" />

::: tip App 端按压形态已拍板（2026-11-17，走 antd-mobile 实况）
真触屏（`@media (hover: none)`）下 KButton 自动：**关波纹 → `::before` 黑 8% 遮罩（0.15s 过渡），active 底色加深照常叠加**；桌面窄窗口不受影响仍走波纹。源码查证记录：antd-mobile 并非整体降 opacity（那是 disabled .4），其实况也是遮罩；vant 为灰 #e8e8e8 10% 遮罩，未采用。参数对照（决策存档）：
| 形态 | 机制 | 参数 |
| --- | --- | --- |
| A 桌面（现状） | antd Wave 波纹 + active 底色加深 | 0.6s 自定参，触屏让位给 B |
| B antd-mobile | `::before` 全铺 `#000`，`:active` 时 opacity .08，transition .15s | 源码 `button.less` 实测抄回 |
| C vant | `::before` 铺 `#e8e8e8`（--van-active-color），`:active` 时 opacity .1 | 源码 `button.less` 实测抄回 |
| D opacity | 按压整体降透明度（iOS 原生味） | .65 / .15s，未落地候选 |
:::

<Demo path="button/mobile-press" title="按压形态对比（决策存档）" desc="B 已落库：触屏按住即库真实行为；A 为桌面窄窗表现，C/D 仍是 demo 模拟。" />

<Demo path="button/render-group" title="按钮组自定义渲染（headless）" desc="KButtonGroup `#render` 自绘胶囊接壤组：role=group 语义继承，size 下发（provide）照跑——组内默认 KButton 仍吃 sm 档。" />

<Demo path="button/render" title="按钮自定义渲染（headless）" desc="KButton 双通道：`#render` 自绘票券按钮（rootAttrs/rootOn 继承 click 拦截与语义）；`render` prop 自绘标签按钮（tag 派生 a/button）。" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 语义类型 | `'default' \| 'primary' \| 'info' \| 'success' \| 'warning' \| 'danger' \| 'link'` | `'default'` |
| variant | 外观变体 = 等级四档（基础/次要/次次要/次次次要 = outlined/filled/tonal/text；quiet = text 的灰底交互版；另 dashed 添加占位（无底色）、ghost 透明底档、plain/soft 白底两式、border 隐框档（交互现边框+文字色）；`type=link` 时无效，不落 variant 类名） | `'outlined' \| 'filled' \| 'tonal' \| 'text' \| 'quiet' \| 'dashed' \| 'ghost' \| 'plain' \| 'soft' \| 'border'` | `'outlined'` |
| size | 尺寸（在 `KButtonGroup` 内缺省走组下发） | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` |
| shape | 形状 | `'default' \| 'round' \| 'circle' \| 'square'` | `'default'` |
| loading | 加载中（不可点，宽度保持） | `boolean` | `false` |
| disabled | 禁用 | `boolean` | `false` |
| block | 撑满容器宽 | `boolean` | `false` |
| href | 有值则渲染 `<a>` | `string` | — |
| target | 外链打开方式（仅 `href` 渲染 `<a>` 时透传） | `string` | — |
| icon | 图标组件（也可用 `#icon` 插槽） | `Component \| null` | `null` |
| iconPlacement | 图标位置（loading 占同位） | `'start' \| 'end'` | `'start'` |
| wave | 点击波纹开关；缺省跟随 Provider（`wave.disabled` / `defaults.KButton.wave`），显式传值强制开/关 | `boolean` | — |
| nativeType | 原生 type 属性 | `'button' \| 'submit' \| 'reset'` | `'button'` |
| render | 自定义渲染闭包（`#render` 插槽优先）；提供时整件视觉输出被替换 | `(scope: KButtonRenderScope) => VNodeChild` | — |
| classNames | 语义化结构 class，见「部件」 | `Partial<Record<'root' \| 'loading' \| 'icon' \| 'content', string>>` | — |
| styles | 语义化结构 style | 同上结构，值为 `CSSProperties` | — |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击（`loading`/`disabled` 时不派发；`href` 场景仍派发，可用于埋点） | `(event: MouseEvent)` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 按钮文字 |
| icon | 图标内容（`icon` prop 的替代，两者都无 = 纯文字按钮） |
| loading | 自定义加载指示（缺省为内置 spinner） |
| render | 自定义渲染作用域插槽，scope 见文末「自定义渲染」节；提供时整件替换 |

### 部件（data-part）

| 部件 | DOM | 说明 |
| --- | --- | --- |
| root | `button` / `a` | 根节点，四轴类名挂在上面（`shape=default` 不落类名，避免与 type 轴 `k-button--default` 同名冲突） |
| loading | `span.k-button__spinner` | 仅 `loading` 时渲染 |
| icon | `span.k-button__icon`（内含 [KIcon](./icon.md)） | 有图标且非 loading 时渲染 |
| content | `span.k-button__content` | 文字容器（无文字内容不渲染，防 icon-only 被 gap 挤偏） |

### KButtonGroup 按钮组

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 下发给组内 KButton 的尺寸；子级自传 `size` 优先 | 同 KButton `size` | — |
| vertical | 纵排（接壤边转为上下叠压） | `boolean` | `false` |
| classNames / styles | 根节点 class/style | `Partial<Record<'root', …>>` | — |
| render | 自定义渲染闭包（`#render` 插槽优先）；提供时整件视觉输出被替换 | `(scope: KButtonGroupRenderScope) => VNodeChild` | — |

结构 `div.k-button-group[data-part=root][role=group]`；组内直接子级 `KButton` 叠边 -1px、首尾保留外侧半径（hover/focus 自动抬 z-index，防邻钮压边）。

KButtonGroup Slots：`default` = 组内 KButton 清单；`render` = 自定义渲染作用域插槽（scope 见文末「自定义渲染」节，提供时整件替换）。无事件。

## 主题定制（部件变量）

覆盖方式见 [KConfigProvider](./config-provider.md) 的 `components.KButton`，或任意未分层 CSS 覆盖（组件样式本身不分层）。

| 变量 | 缺省 | 说明 |
| --- | --- | --- |
| `--k-button-height` | `var(--k-control-height)` | size 档切换 controlHeight 阶梯 |
| `--k-button-padding-x` | `var(--k-padding-md)`（20px；xs/sm/lg = 12/16/20） | circle/square 时 = height/2.75 |
| `--k-button-radius` | `var(--k-border-radius)` | round→full，circle→50% |
| `--k-button-bg` | 按 type×variant 矩阵取色 | hover/active/disabled 状态局部重声明 |
| `--k-button-text-color` | 同上 | 描边/文字类同链路；文字通道彩字取 `--k-button-c-text`（R4b 深档） |
| `--k-button-c-text` | `var(--k-color-N-text-strong)`（default=主色深档） | 白底彩字 WCAG 4.5 深档别名，只喂文字通道；边框/底色仍走 `--k-button-c` |
| `--k-button-border-color` | 同上 | text/filled 时无描边 |
| `--k-button-icon-gap` | `var(--k-size-xxs)` | icon 与文字同现时生效 |
| `--k-button-font-size` | `var(--k-font-size)` | xs/sm 降 fontSizeSM |
| `--k-button-wave-color` | 透明底档 `color-mix(--k-button-c 24%)`；实底/灰底/浅底档（filled/tonal/soft/quiet）`color-mix(--k-button-bg 60%)` | 点击波纹颜色跟主题色——实底/浅底档取当前背景（var 间接引用，hover/active 换底自动跟随）；透明底档取字色 |

## 注意事项

- `variant=text` 时 `shape` 无意义，按 default 渲染；`shape=circle` 要求 icon-only，带文字会在开发环境告警；
- 图标按钮无文字时必须给 `aria-label`（无障碍要求）；
- 按下反馈 = active 态颜色加深（25%，2026-11-17 按压观感校准）+ 点击波纹（对齐 antd v5 Wave，`--k-button-wave-color` 可调）；系统「减弱动态效果」（`prefers-reduced-motion`）下波纹自动关闭；App 端（真触屏，`@media (hover: none)`）波纹换 antd-mobile 式黑 8% `::before` 遮罩（2026-11-17 拍板）；不做缩放/位移，回弹类动效请业务二开。

## 自定义渲染（headless）

双通道 `#render` 插槽（优先）/ `render` prop，通用契约见 [headless 自定义渲染](../headless.md)。KButton / KButtonGroup 各有 scope（入口导出），逐字段如下（接口没有的组不列；click 动作经 rootOn 绑定包暴露，无独立动作函数组）：

**`KButtonRenderScope`**：

#### 状态（只读快照）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| type | `ButtonType` | 语义类型（`ButtonType` = `'default' \| 'primary' \| 'info' \| 'success' \| 'warning' \| 'danger' \| 'link'`，缺省 `'default'`）；自绘按值取语义色 token（`--k-color-primary/success/…`），`link` 独立于 type×variant 矩阵 |
| variant | `ButtonVariant` | 外观变体（`ButtonVariant` = `'outlined' \| 'filled' \| 'tonal' \| 'text' \| 'quiet' \| 'dashed' \| 'ghost' \| 'plain' \| 'soft' \| 'border'`，缺省 `'outlined'`）；type×variant 配色矩阵是默认渲染的 CSS 类规则，自绘按两轴状态自行取色 |
| size | `ButtonSize` | **合并后的尺寸**（`ButtonSize` = `'xs' \| 'sm' \| 'md' \| 'lg'`）：解析链 `prop > KButtonGroup 下发 > 'md'`——组内未自传 size 时这里已是组下发值，自绘直接消费无需再 inject |
| shape | `ButtonShape` | 形状（`ButtonShape` = `'default' \| 'round' \| 'circle' \| 'square'`，缺省 `'default'`）；圆角/等宽内边距视觉自绘（circle/square 默认渲染 padding-x = height/2.75） |
| loading | `boolean` | 加载中（缺省 `false`）；rootAttrs 已落 `aria-busy` 与 button 原生 disabled，rootOn 已拦截点击；spinner 视觉自绘（可取 `ctx.slots.loading`），默认渲染的「保留宽度防抖动」由自绘自管 |
| disabled | `boolean` | 禁用 prop 值（缺省 `false`；**不含 loading**，loading 单列）；自绘置灰据此 + loading 两者取或，与 rootAttrs 的原生 disabled 判定一致 |
| block | `boolean` | 撑满容器宽（缺省 `false`）；默认渲染 `display:flex; width:100%`，自绘按值映射 |
| href | `string \| undefined` | 链接地址；有值 → tag 为 `'a'`（已进 rootAttrs），可被浏览器右键新开；无值 = 按钮形态 |
| target | `string \| undefined` | 外链打开方式原始值；仅 tag 为 `'a'` 时进 rootAttrs（button 形态不落） |
| icon | `Component \| null` | 图标组件 prop（缺省 `null`）；自绘可交给 KIcon 或 `<component :is>` 渲染，也可用 `ctx.slots.icon` |
| iconPlacement | `'start' \| 'end'` | 图标位置（缺省 `'start'`）；默认渲染 DOM 顺序不动、`order` 后移（RTL 安全），loading spinner 占图标同位——自绘自行排布 |
| nativeType | `'button' \| 'submit' \| 'reset'` | 原生 type（缺省 `'button'`）；仅 tag 为 `'button'` 时进 rootAttrs，表单提交/重置语义由此继承 |
| tag | `'a' \| 'button'` | 派生标签：有 `href` → `'a'`，否则 `'button'`；自绘可 `<component :is="ctx.tag">` 直接消费，与 rootAttrs 的条件键严格一致 |
| hasIcon | `boolean` | 是否有图标 = `icon` prop 非空 **或** `#icon` 插槽存在；自绘据此决定是否画图标位（icon-only 判定还须结合 default 插槽有无） |

#### ref 与出口

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| rootEl | `Ref<HTMLElement \| undefined>` | 波纹锚点：rootOn 的 click 触发 `triggerWave()` 时在此节点上「摘 `k-button--waving` 类 → `void offsetWidth` 强制重排 → 挂类」重启一次性 box-shadow 扩散动画（连点也稳定重放）。`:ref="ctx.rootEl"` 绑到自绘根即继承波纹触发（动画 keyframes/时长由全局 CSS 提供，波纹色 `--k-button-wave-color` 须自绘声明）；**不绑则点击无波纹**（守卫与 `click` 事件照常），也可兼作自绘 focus 落点 |

#### 绑定包（spread 到自绘节点才继承）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| rootAttrs | `Record<string, unknown>` | 根节点原生语义包：`data-part="root"` + `type=nativeType`（仅 button 标签）+ `href` + `target`（仅 a 标签）+ `disabled=true`（仅 button 且 disabled 或 loading）+ `aria-disabled=true`（仅 a 且 disabled——a 无原生 disabled，loading 不落此键）+ `aria-busy=true`（loading）。**不含任何 class/style**——四轴类名、is-disabled/is-loading 状态类、全部部件变量（`--k-button-bg/-text-color/-border-color/-height/-radius/-wave-color` 等）与 hover/active/focus-visible/触屏遮罩规则全不在包内，背景/边框/圆角/高度/波纹色自绘；`classNames`/`styles` 只作用于默认渲染 |
| rootOn | `{ click: (e: MouseEvent) => void }` | click 逻辑包（`v-on="ctx.rootOn"` spread 即继承；`h()` 通道写 `onClick: ctx.rootOn.click`）：① disabled 或 loading → `preventDefault()` + `stopImmediatePropagation()` 拦截，不 emit、不波纹（a 标签的导航也被 preventDefault 拦下）；② 否则按波纹开关合并链（`wave` prop > Provider `defaults.KButton.wave` > `!wave.disabled` > 开）触发波纹（依赖 rootEl 已绑；`prefers-reduced-motion` 与触屏遮罩豁免由 CSS 层管）；③ emit `click(event: MouseEvent)`——href 场景仍派发（埋点可用），原生跳转不拦截。无受控双模（组件无内部开合/值状态） |

另有 `slots`（`ReturnType<typeof useSlots>`）：默认渲染的插槽集合（`default` = 按钮文字、`icon` = 图标内容、`loading` = 自定义加载指示），自绘时可按需取用，如 `ctx.loading ? ctx.slots.loading?.() : ctx.slots.default?.()`。

**`KButtonGroupRenderScope`**：

#### 状态（只读快照）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| size | `ButtonSize \| undefined` | 组 size prop **原始值**（`'xs' \| 'sm' \| 'md' \| 'lg'`；`undefined` = 未下发，子级各自走 md）。**size 下发（provide/inject）照跑**——headless 组内的默认 KButton 仍按 `prop > 组 > md` 吃下发值，无需自绘接管 |
| vertical | `boolean` | 纵排（缺省 `false`）；默认渲染切 `flex-direction:column; align-items:stretch`、叠边从左右转上下，自绘按值排布 |

#### 绑定包（spread 到自绘节点才继承）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| rootAttrs | `Record<string, unknown>` | 根节点：`data-part="root"` + `role="group"`（按钮组无障碍语义，静态对象、无 style）。**不含任何 class**——`k-button-group` 的 `inline-flex`、纵排类，以及接壤规则（子级直角 + 非首钮 `-1px` 叠边、首尾只留外侧半径、hover/focus `z-index:1` / active `z-index:2` 抬升防邻钮压边）全不在包内，接壤视觉自绘（这些规则选择器依赖 `.k-button-group > .k-button` 结构，自绘壳不复用类名则需自行实现）；`classNames`/`styles` 只作用于默认渲染 |

另有 `slots`（`ReturnType<typeof useSlots>`）：默认渲染的插槽集合（`default` = 组内 KButton 清单），自绘时可按需取用，如 `ctx.slots.default?.()`。无事件包、无动作（纯结构件）。

---

## 规格附录（实现决策，面向贡献者）

- `type=link` 是独立 type 不进矩阵（视觉规则 §1.1 品牌色克制）；实现上 `type=link` 时 **variant 类名不落**，hover/active 只变文字色（浅化/深化，无背景反馈，对齐 antd link）；`danger` 占用 type 轴（antd 的 `danger` 布尔被吸收）；
- 本文深度 = 全库样板（接口 + 部件 + 变量表 + 行为），其余组件照此回填；
- 等级四档映射 naive（2026-11-17）：基础=`outlined`、次要=`filled`、次次要=`tonal`（新增）、次次次要=`text`。值名当日由 tertiary 改 `tonal`：与 fill 阶梯 token 的 tertiary 撞名歧义，且 outlined/filled/dashed 是观感词族。naive 实测 secondary/tertiary 静置同灰（buttonColor2 .05），我们按 fill 阶梯拆出真档位（6%→4%）；tonal 的 hover/active 走 naive 等差 +4% 的破格值 8%/12%（`color-mix(text-base, transparent 92%/88%)`），语义档同灰底 + `--k-button-c` 彩字（naive tertiary 同款）；等级不单独立演示，收在外观变体矩阵内呈现；
- 部件变量初值引用 alias token，状态（`:hover`/`:active`/`.is-disabled`）以局部重声明实现，见 [主题 Token 规格 §1.1](../design/theme-tokens.md)；
- ghost/plain/soft 三档（2026-11-17 拍板，三家对照调研）：ghost 进 variant 轴而非 antd/naive 的布尔——variant 天然互斥，避免 ghost×variant 组合爆炸；default×ghost 静置跟 naive（中性边 + 正文字），antd 的白边反色不内置（业务 `styles` 可覆写）；plain = 交互变边框+文字、背景恒容器白（antd default 交互路数），soft = 交互变背景 tint + 文字（vant plain 路数）；soft tint 浓度取 filled 阶梯下移一档（hover 10% / active 16%，落在 filled 静置/ hover 之间不撞档）。**当日改判：soft 去边框**（静置 border transparent 占位保高度，与有框 plain 拉开分工；边框静止的通道随之取消，交互只剩背景+文字）；
- border 档（2026-11-17 同日新增，用户点名；再调参：交互文字也跟着变）：隐框交互现——静置边框透明（1px 占位不跳版），hover 现 `c 90%up` 边框、文字同式 `c 90%up`，active 边框+文字 `c 75%down`（与 plain 同公式，default 档 c=primary 自然落主色），背景恒静置；语义档静置文字 = `--k-button-c`、default 档 = 正文字（基线）；透明边框占位而非 `border: none`，防 hover 时高度 +2px 跳动；
- text/quiet 拆分 + dashed 去底（2026-11-17 同日用户拍板）：原 `text` 的 hover/active 灰底（fill-tertiary/secondary）随改名迁给 `quiet`（= antd text 路数），`text` 回归纯文字交互——只变文字色、永不落底（naive text 路数，「text 本来就该没背景」）；**兼容破坏：存量 `variant="text"` 升级后失去灰底反馈，要旧观感改 `quiet`**；default×text hover/active 文字走 c 公式（default 的 c=primary → 落主色浅/深档，与 outlined 同链）；另 default×dashed 静置灰底（原 filled 同款）作废改透明底——dashed 全 type 统一「透明底 + 虚线框」；
- KButtonGroup（2026-11-17）：走 naive 路线非 antd「Space 顶替」路线——接壤体验（-1px 叠边、首尾外侧半径、hover/focus z-index 抬升防邻钮压边）Space 给不了；size 经 provide/inject 下发、子级自传优先（`props.size ?? 组 ?? md`，size 缺省因此从 withDefaults 移到解析链）；
- R4b 彩字深档（2026-11-17，低评分三分类「只治 A」拍板）：文字通道不再直接用 `--k-button-c`，改接部件变量 `--k-button-c-text` = `--k-color-N-text-strong`（浅底压黑深档，dark 复用 c；比例见主题 Token 规格 §4.1 表）——静态彩字 9 处、hover/active 表达式 18 处、default×outlined/dashed 2 处全量换；边框/底色/波纹通道不动，观感链（c 90up/75down 的浅深化）在文字通道改由深档出发，静置彩字格矩阵页实测全 ≥4.5；
- `iconPlacement` 取 antd v6/naive 同款名（antd 已把 iconPosition 废弃成 iconPlacement），值 `start/end` 逻辑方向兼容 RTL；实现 = DOM 顺序不动、`order` 后移，loading spinner 占图标位；`target` 仅 href 落 `<a>` 时透传。三家 props 不搬清单及理由：`color/textColor`（违反无裸写色 token 纪律，覆写走部件变量）、loading 对象形态（`#loading` 插槽已覆盖，delay 属业务防抖）、`strong/tag/focusable/keyboard/fadeOnPress/hairline/loading-text/autoInsertSpace/url/to/replace`（或已被插槽/变量覆盖、或属其它组件语义、或移动端专属）；导航仍按边界走 [KLink](./link.md)。
- 语义 DOM 契约（DOM 结构即公开 API）：

```html
<button class="k-button k-button--primary k-button--md" data-part="root"
        :class="cn.root" :style="st.root">
  <span class="k-button__spinner" data-part="loading" v-if="loading"><slot name="loading"/></span>
  <span class="k-button__icon"    data-part="icon"    v-else-if="icon"><slot name="icon"/></span>
  <span class="k-button__content" data-part="content"><slot/></span>
</button>
```

- **点击波纹（2026-11-17 拍板，推翻早前「不做涟漪」决策；同日调参放慢）**：click 时挂 `k-button--waving` 类播放一次性 `box-shadow` 扩散动画（0 → 4px（35% 保持帧，避免出发即淡）→ 6.4px，0.6s `--k-motion-ease-wave`；antd v5 Wave 同形态但用户「太快」由 0.4s 放慢；同日再缩宽至 80%（用户「宽度有点大」）），animationend 不再摘类（类常驻无害，动画结束样式自然回落）；连点重启动画 = DOM 摘类→`void offsetWidth` 强制重排→挂类（2026-11-17 修复：早前 `waving` ref + `nextTick` 摘挂在 Vue 同帧批处理下不产生真实绘制，连点波纹时有时无）。`disabled/loading` 不触发；动画期间 `box-shadow` 压过 `:focus-visible` 描边（antd 同款冲突）；波纹色跟主题（2026-11-17 用户「filled/tonal 等波纹与按钮颜色不一致」改判）：实底/灰底/浅底档（filled/tonal/soft/quiet）= 当前 `--k-button-bg` 60% 透明——var 间接引用即时解析，hover/active 换底波纹自动跟随；透明底档仍走 `--k-button-c` 24% 字色；
- **波纹开关（2026-11-17，抄 antd 双通道）**：全局 = [KConfigProvider](./config-provider.md) `:wave="{ disabled: true }"`（antd ConfigProvider.wave 同款形态，嵌套 Provider 子覆盖父）；实例 = `KButton wave` prop（显式传值强制开/关）；合并链 `wave prop > defaults.KButton.wave > !wave.disabled > 开`（defaults 通道顺带走 config-provider 的组件默认值机制）；`prefers-reduced-motion` 关闭条款独立并存，不受开关影响；**App 端形态豁免（2026-11-17 拍板）**：`@media (hover: none)` 触屏下波纹动画强制 `none`、改 `::before` 黑 8% 遮罩（0.15s，`:active` 触发，disabled 不响应），属平台形态差异、不受 wave 开关影响；
