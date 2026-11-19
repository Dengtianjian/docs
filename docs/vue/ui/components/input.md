# KInput 输入框

> 共同约定见 [共同约定](./index.md)。P2a 表单批首件（2026-11-17 开工，P2 三拍板：重组件出批 / KForm 内置校验走 async-validator / 反馈只走 useKApp 实例）。单行文本输入，含状态、尺寸、字数、前后缀扩展位与多行/密码/加载等增强。

## 何时使用

- 需要用户在表单中输入并编辑单行文本时；
- 密码/搜索/邮箱等原生语义用 `type` 透传，不另立组件（可见性切换等增强留后批）。

## 代码演示

<Demo path="input/fluid" title="自适应容器宽度" desc="不设固定宽度：输入框、文本域默认 100% 跟随容器；移动端控件高 44px、字号 16px（防 iOS 聚焦缩放），清除钮常显并扩大命中区。" />

<Demo path="input/textarea" title="多行输入" desc="`type=textarea` 渲染原生 textarea，`rows` 控制行数、可纵向缩放。" />

<Demo path="input/autosize" title="自适应文本高度" desc="`autosize` 随内容长高，从 1 行起。" />

<Demo path="input/autosize-range" title="自适应高度范围" desc="`{ minRows, maxRows }` 限定高度区间，超出 maxRows 出内部滚动。" />

<Demo path="input/password" title="密码框" desc="`type=password` 默认带明暗文切换，切换保持焦点与光标；`showPassword=false` 关闭，`passwordVisibleChange` 监听状态。" />

<Demo path="input/loading" title="加载状态" desc="`loading` 在后缀显示旋转图标并标记 `aria-busy`，不锁定输入。" />

<Demo path="input/passive" title="被动激活" desc="`passivelyActivated`：点击外壳空白或前后缀区域也聚焦输入框。" />

<Demo path="input/basic" title="基础使用" desc="`v-model` 双向绑定；`clearable` 悬浮/聚焦时出清除钮；`disabled / readonly` 两态；`type` 原生透传。" />

<Demo path="input/status" title="校验状态" desc="`status=error/warning`：边框+聚焦圈整体换语义色（focus 环取语义色 25% 淡底，非主色圈）。KForm 批将由表单自动下发，本组件先支持手动指定。" />

<Demo path="input/sizes" title="尺寸与形态" desc="`size` 四档走 controlHeight 阶梯；`variant` 四档：outlined（缺省带框）/ filled 灰底无框 / borderless 全透明 / underlined 仅底部边框（hover/focus 只变底线颜色、无聚焦圈）。" />

<Demo path="input/count" title="字数统计" desc="`maxlength` 限长 + `showCount` 计数；无 `maxlength` 时仅显示当前字数。超限拦截由原生 maxlength 完成，「超额可输、计数标红」的 allowExceed 形态留后批。" />

<Demo path="input/prefix-suffix" title="前后缀" desc="`#prefix / #suffix` 插槽（示例图标 = @vicons/tabler）；清除钮与计数自动落进后缀区，顺序 = 插槽内容 → 清除 → 计数。" />

<Demo path="input/render" title="自定义渲染（headless）" desc="双通道：`#render` 自绘墨线输入（focused 驱动底线渐变，showClear/onClear 继承清除逻辑）；`render` prop 自绘胶囊搜索框（inputAttrs/inputOn 全逻辑包继承）。" />

## API

### Props

> 移动端：控件高度/字号走根级 token（≤767px 自动 16px 字号防 iOS 聚焦缩放、控件高 44）；清除按钮在无 hover 设备常显并扩大命中区；`enterkeyhint` / `autocapitalize` 直接透传。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| enterkeyhint | 移动端回车键文案（`search` / `done` / `next`…） | `string` | — |
| autocapitalize | 移动端自动大写策略 | `string` | — |
| model-value / v-model | 绑定值 | `string` | `''` |
| size | 高度档（controlHeight 阶梯） | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` |
| status | 校验态（手动指定；KForm 下发同值） | `'error' \| 'warning'` | — |
| variant | 外观形态 | `'outlined' \| 'filled' \| 'borderless' \| 'underlined'` | `'outlined'` |
| rows | type=textarea 行数（未开 autosize 时生效） | `number` | `3` |
| autosize | 文本域自适应高度：`true` 或 `{ minRows, maxRows }` | `boolean \| object` | `false` |
| loading | 加载态：后缀旋转图标（不改变可编辑性） | `boolean` | `false` |
| passivelyActivated | 点击外壳空白/前后缀区域也聚焦输入框 | `boolean` | `false` |
| showPassword | type=password 时显示明文切换按钮 | `boolean` | `true` |
| type | 控件类型（含 textarea） | `'text' \| 'password' \| 'textarea' \| 'search' \| 'email' \| 'tel' \| 'url' \| 'number'` | `'text'` |
| placeholder | 占位文本 | `string` | textarea `'请输入内容'`；其余 `'请输入'` |
| disabled / readonly | 禁用 / 只读 | `boolean` | `false` |
| clearable | 显示清除钮（有值且非禁用/只读，悬浮或聚焦时可见） | `boolean` | `false` |
| maxlength | 原生最大长度 | `number \| string` | — |
| showCount | 字数统计 | `boolean` | `false` |
| autofocus / autocomplete / id / name | 原生属性透传 | — | — |

<CommonProps />

### Slots

| 插槽名 | 说明 |
| --- | --- |
| prefix / suffix | 前缀 / 后缀内容（图标、文本、开关均可） |
| render | 自定义渲染作用域插槽，scope 见文末「自定义渲染」节；提供时整件替换 |

### Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| focus / blur | 聚焦 / 失焦 | `FocusEvent` |
| change | 原生 change（失焦提交） | `Event` |
| clear | 点击清除钮后触发 | — |
| passwordVisibleChange | 密码明暗文切换 | `visible: boolean` |

### Expose

| 方法/属性 | 说明 |
| --- | --- |
| `inputEl` | 原生 input/textarea 元素引用 |
| `focus()` / `blur()` / `select()` | 编程式聚焦 / 失焦 / 全选（`activate`/`deactivate` 为 focus/blur 别名） |

## 主题定制（部件变量）

| 变量 | 缺省 | 说明 |
| --- | --- | --- |
| `--k-input-height` | `var(--k-control-height)` | size 档切换 controlHeight 阶梯 |
| `--k-input-font-size` | `var(--k-input-font-size)`（theme.css §8.2 根级 token） | **组件只消费不重声明**——mobile 块自动翻 16px 防 iOS 聚焦缩放；尺寸档不改字号（避免压破该保护） |
| `--k-input-padding-x` | `var(--k-size)`（16px） | 左右内边距（xs 12 / lg 20） |
| `--k-input-affix-gap` | `var(--k-size-xs)`（8px） | 前缀 / 输入 / 后缀之间的间距 |
| `--k-input-radius` | `var(--k-border-radius)` | 圆角 |
| `--k-input-bg` | `var(--k-color-bg-container)` | 底色（filled=fill-tertiary、disabled=fill-tertiary） |
| `--k-input-border-color` | `var(--k-color-border)` | 静置边框；hover/focus/status 局部重声明 |
| `--k-input-hover-border-color` | `var(--k-color-primary-hover)` | status 档整体换语义色 |
| `--k-input-focus-border-color` | `var(--k-color-primary)` | 同上 |
| `--k-input-outline` / `-width` | `var(--k-control-outline/-width)` | 聚焦圈；error/warning 换语义色 25% 淡圈 |
| `--k-input-text-color` | `var(--k-color-text)` | 字色（disabled=quaternary） |
| `--k-input-placeholder-color` | `var(--k-color-text-tertiary)` | 占位色 |
| `--k-input-icon-color` | `var(--k-color-text-tertiary)` | 前后缀区色 |
| `--k-input-clear-color / -hover` | quaternary / tertiary | 清除钮两态色 |
| `--k-input-count-color` | `var(--k-color-text-tertiary)` | 计数色 |

## 注意事项

- `type=textarea` 渲染原生 `<textarea>`：未开 `autosize` 时按 `rows` 定高、可纵向缩放；`autosize` 时禁用缩放并随内容/宽度重算高度（超过 `maxRows` 出现内部滚动）。
- 密码框默认显示明文切换按钮（`showPassword=false` 可关）；切换后保持焦点与光标位置，并 emit `passwordVisibleChange`。
- `loading` 仅在后缀占位显示旋转图标、设置 `aria-busy`，不锁定输入；需要只读请同时传 `readonly`。
- `passivelyActivated` 让外壳空白/前后缀点击也能聚焦输入框；`#render` 自绘时可用 scope 的 `passivelyActivated` 自行实现。
- 手动操作：expose `focus()` / `blur()` / `select()`（另有 `activate`/`deactivate` 别名）与 `inputEl`。

- 多个输入/选择/按钮需要拼成一组时用 [KControlGroup](./control-group.md)，不要手工改圆角/边框。

- 根节点是 `div.k-input` 外壳（承载边框/圆角/前后缀/清除/计数与 `:focus-within` 焦点圈），原生表单控件是内层 `<input data-part="input">`；无外层 `<form>` 语义依赖。

- 聚焦圈画在 **root**（`:focus-within`），不在原生 input 上——前后缀同框整体反馈（antd 路数）；
- `filled / borderless` 无框形态不参与 hover 换框与聚焦圈（`box-shadow: none`），只保留内部字色链；
- 清除钮命中区 = 图标本体（1em），`@mousedown.prevent` 保焦点不闪；必须保留 `aria-label="清除"` 语义（内建）；
- 前后缀插槽直供的裸 svg（@vicons 等只有 viewBox 无宽高）由宿主定 `1em` 尺寸（同 KButton/KIcon 路数，2026-11-18 补）；KSelect 前后缀同规则（内建箭头 0.6em 嵌套在自身 span 里不受覆写）；
- **不套 App 端黑 8% 按压遮罩**：表单件按压语义 = 聚焦，与触发类件（Button）不同，此为登记在 theme-tokens §8.2 平台形态规则下的显式豁免；
- addon 前后组（`addonBefore/After`）与 `showCount` 超额标红未在本批（登记待办）；KForm/KFormItem（含 async-validator 接线与 status 自动下发）为 P2a 尾件。

## 自定义渲染（headless）

双通道 `#render` 插槽（优先）/ `render` prop，提供时**整件视觉输出被替换**（外框、前后缀区、清除钮、计数全自绘）；script 逻辑照跑，**绑定包散播到自绘节点才继承**。通用契约见 [headless 自定义渲染](../headless.md)。scope = `KInputRenderScope`（入口导出），四组字段逐项如下。

#### 状态（只读快照）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| size | `'xs' \| 'sm' \| 'md' \| 'lg'` | 高度档（缺省 `'md'`，controlHeight 阶梯）；默认渲染映射 `.k-input--{size}` 类，自绘可映射为自己的密度变量；字号全档同值（根级 `--k-input-font-size`，iOS 防缩放保护） |
| variant | `'outlined' \| 'filled' \| 'borderless' \| 'underlined'` | 外观形态（缺省 `'outlined'`）；filled 灰底无框 / borderless 全透明 / underlined 仅底部边框，后三者不参与完整边框反馈与聚焦圈——自绘按此语义绘制 |
| type | `string` | 原生 input 类型（prop 限 `'text' \| 'password' \| 'search' \| 'email' \| 'tel' \| 'url' \| 'number'`，缺省 `'text'`）；已并入 inputAttrs |
| status | `InputStatus \| undefined` | 校验态（`'error' \| 'warning'`），**合并链：prop > KFormItem 校验态**（`props.status ?? formItem.status`）；自绘语义色边框/聚焦圈消费它，无校验为 undefined |
| placeholder | `string` | 占位文本（已应用默认：textarea「请输入内容」，其余「请输入」）；已并入 inputAttrs |
| disabled | `boolean \| undefined` | 禁用 prop 原值；inputAttrs 的原生 disabled（true 才落键）与 showClear 合成消费它；置灰底色/字色/not-allowed 光标属默认视觉，自绘自理 |
| readonly | `boolean \| undefined` | 只读 prop 原值；inputAttrs 的原生 readonly（true 才落键）与 showClear 合成消费它；只读仍可选可聚焦，仅不可编辑 |
| clearable | `boolean \| undefined` | 清除钮开关 prop 原值；实际显隐看 showClear 合成值 |
| maxlength | `number \| string \| undefined` | 原生最大长度原值；已并入 inputAttrs（超限拦截由原生完成）；自绘计数分母也用它 |
| showCount | `boolean \| undefined` | 字数统计开关 prop 原值；默认渲染在后缀区画 `当前字数 / maxlength`（无上限只显当前字数），自绘用 `value.length` 自行排版 |
| id | `string \| undefined` | 原生 id 原值；已并入 inputAttrs，外部 label for 关联无需单独消费 |
| name | `string \| undefined` | 原生 name 原值；已并入 inputAttrs |
| value | `string` | 当前绑定值（v-model，缺省 `''`）；已并入 inputAttrs.value 受控回写 DOM；自绘计数/占位判断直接用它 |
| focused | `boolean` | 聚焦态（inputOn 的 focus/blur 维护）；自绘 focus 反馈（底线渐变/发光等）消费它——默认渲染的聚焦圈走 CSS `:focus-within` 不依赖此值 |
| showClear | `boolean` | 清除钮应否渲染：**`clearable && 有值（value !== '' 且非 null）&& !disabled && !readonly`** 合成；「悬浮或聚焦才可见」（触屏常驻）是默认视觉的 visibility 规则，自绘显隐时机自管 |

#### ref 与出口

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| inputEl | `Ref<HTMLInputElement \| null>` | 原生 input 的 ref：`focus()` 与 onClear 清除后回焦的落点，也是组件 expose 的 `inputEl`；`:ref="ctx.inputEl"` 绑到自绘原生 input，**必绑**——不绑则编程聚焦与清除回焦全部静默失效 |

#### 绑定包（spread 到自绘节点才继承）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| rootAttrs | `Record<string, unknown>` | 根节点：仅 `data-part="root"`（静态对象）。**不含视觉类与状态类**——外框底色/边框/圆角、size/variant/status 类、hover 换框、`:focus-within` 聚焦圈、disabled/readonly 置灰全自绘 |
| inputAttrs | `Record<string, unknown>` | 原生 input 语义包：`data-part="input"` + `value`（受控回写：DOM 值恒随 model，父级不回写 v-model 则输入被拉回旧值）+ `type` + `placeholder` + `disabled` / `readonly` / `autofocus`（true 才落键，false 省略）+ `maxlength` + `autocomplete` + `inputmode` + `enterkeyhint` + `autocapitalize` + `id` / `name`（未传省略）。注意 autofocus/autocomplete/inputmode 是 prop 直通包内，**scope 无对应快照字段**，只能经本包继承 |
| inputOn | `{ input: (e: Event) => void; focus: (e: FocusEvent) => void; blur: (e: FocusEvent) => void; change: (e: Event) => void }` | 原生 input 逻辑包：`input` → 读 `target.value` 写 model（抛 `update:modelValue`）+ **KFormItem `onFieldChange()` 校验联动**；`focus` → 置 focused=true + emit `focus(e)`；`blur` → 置 focused=false + emit `blur(e)` + **KFormItem `onFieldBlur()` 校验联动**；`change` → 原样转发 emit `change(e)`（原生失焦提交语义）。禁用/只读拦截靠 inputAttrs 原生属性，包内无显式守卫 |

#### 动作

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| onClear | `() => void` | 清除：置 `model.value = ''`（抛 `update:modelValue`）+ emit `clear` + `inputEl.focus()` 回焦。**函数本身无 disabled/readonly 守卫**（显隐由 showClear 合成把关，自绘直调需自查）；不触发 KFormItem 字段校验、不发 change（源码未调用）；默认渲染经 `@mousedown.prevent` 调用以保焦点不闪，自绘建议沿用 mousedown + preventDefault |
| focus | `() => void` | 编程式聚焦（`inputEl.value?.focus()`）；与组件 expose 的 `focus()` 同一函数，未绑 inputEl 时空操作 |

另有 `slots`（`ReturnType<typeof useSlots>`）：默认渲染的插槽集合（prefix / suffix = 前后缀内容），自绘时可按需取用，如 `ctx.slots.prefix?.()`；默认后缀区顺序 = suffix 插槽 → 清除钮 → 计数，自绘可自定。

## 规格附录（实现决策，面向贡献者）

- 字号链定稿：`--k-input-font-size` 是 theme.css §8.2 的**根级例外 token**（iOS 聚焦缩放防线），组件基线若在自己元素上重声明同名变量会按「自身>继承」压破根级 mobile 值——故本组件全程只 `var()` 消费；尺寸档因此只动 height/padding 不动 font-size；
- 清除图标 = 最小 inline SVG（currentColor），不动 KIcon 注入模式——kit 尚无内建图标依赖，KForm 批引入 async-validator 时一并评估是否给内建图标立 peer；
- `type=password` 仅原生透传（浏览器掩码），可见性切换眼图标属增强位，避免本批把内建图标问题做实；
- v-model 走 Vue 3.5 `defineModel`；原生 `:value` + `@input` 手动同步（受控语义，model 变更即时反映 DOM）。
