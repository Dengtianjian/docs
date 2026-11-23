# KInputNumber 数值输入框

> 共同约定见 [共同约定](./index.md)。P2a 表单批第二件。数值输入 + 步进列 + 键盘上下；组合 KInput 实现（输入框视觉与 iOS 16px 防缩放链同源复用，本组件不重复立输入框变量）。

## 何时使用

- 需要输入数值且希望有步进/限幅/精度控制时；纯文本场景用 [KInput](./input.md)。

## 代码演示

<Demo path="input-number/basic" title="基础使用" :desc="['`v-model` 绑 `number | null`（空串 = null）。', 'disabled 态不显步进列。']" />

<Demo path="input-number/step" title="步进与限幅" :desc="['`step` 步进（小数 step 自动推 precision）。', '`min/max` 在失焦与步进时限幅。', '`controls=false` 收起步进列（键盘 ↑↓ 仍可用）。']" />

<Demo path="input-number/precision" title="精度与状态" :desc="['`precision` 显式小数位（失焦补零格式化）。', '`status` / `size` / `variant` 透传 KInput 同轴。']" />

<Demo path="input-number/affix" title="组合标签与前后缀" :desc="['`before / after` 与 `#before / #after / #prefix / #suffix` 插槽透传内层 KInput，规则与 [KInput](./input.md) 一致。', '`after` 标签紧邻步进列，右侧圆角自动压平。']" />

<Demo path="input-number/animation" title="步进滚动动画" :desc="['`animated` 开启后，点击步进或按 ↑/↓ 时数字滚动到新值，动画结束回到原生输入框。', '默认关闭；打字与外部 v-model 赋值不播动画。']" />

<Demo path="input-number/render" title="自定义渲染（headless）" :desc="['双通道：`#render` 自绘数量步进器（stepUp/stepDown/setText/onBlur/onKeydown 全逻辑继承）。', '`render` prop 自绘温度计（step 0.5 小数步进 + 限幅照常生效）。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 绑定数值，空值 = `null` | `number \| null` | `null` |
| min | 下限（失焦与步进时收敛；打字中途不拦截） | `number` | — |
| max | 上限（失焦与步进时收敛；打字中途不拦截） | `number` | — |
| step | 步长；`precision` 缺省跟随其小数位 | `number` | `1` |
| precision | 显式小数位（失焦格式化） | `number` | 随 step |
| controls | 右侧步进列开关 | `boolean` | `true` |
| placeholder | 占位文本 | `string` | `'请输入数值'` |
| size | 同 [KInput](./input.md) 对应项，透传 | — | — |
| variant | 同 [KInput](./input.md) 对应项，透传 | — | — |
| status | 同 [KInput](./input.md) 对应项，透传 | — | — |
| disabled | 同 [KInput](./input.md) 对应项，透传 | — | — |
| readonly | 同 [KInput](./input.md) 对应项，透传 | — | — |
| id | 同 [KInput](./input.md) 对应项，透传 | — | — |
| before | 前置组合标签（纯文本；`#before` 插槽优先） | `string \| number` | — |
| after | 后置组合标签（纯文本；`#after` 插槽优先） | `string \| number` | — |
| animated | 步进滚动动画开关（仅步进触发） | `boolean` | `false` |

<CommonProps />

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 步进或失焦落定后派发（非逐键） | `(value: number \| null)` |
| focus | 内层输入框聚焦 | `(e: FocusEvent)` |
| blur | 内层输入框失焦 | `(e: FocusEvent)` |

Slots：`render` = 自定义渲染作用域插槽（scope 见文末「自定义渲染」节，提供时整件替换）；`before` / `after` / `prefix` / `suffix` 透传内层 KInput（规则同 [KInput](./input.md)，`after` 标签在步进列左侧）。

### 部件（DOM `data-part`）

`root`（组合壳）→ `input`（内层 KInput 子树，`k-input` 类可定向）；`step`（步进列，内部两个原生 `button`）。

### 部件变量（步进列；输入框变量见 KInput）

| 变量 | 初值 |
| --- | --- |
| `--k-input-number-step-width` | `calc(var(--k-font-size) * 1.7)` |
| `--k-input-number-step-icon-color` / `-icon-hover` | `text-tertiary` / `text` |
| `--k-input-number-step-hover-bg` / `-active-bg` | `fill-tertiary` / `fill-secondary` |
| `--k-input-number-step-divider` | `--k-color-split` |

## 注意事项

- 触屏（`hover: none`）：步进按钮纵向命中区不足 44px，默认收起步进列，改用数字键盘（`inputmode=decimal`）输入。
- `animated` 开关：动画层复用 [KRollingText](./statistic.md)（fast 350ms），覆盖在内层输入文字上并暂时隐藏原生文字；只在步进（按钮 / ↑↓）且值实际变化时播放，打字与外部 v-model 赋值不播；`prefers-reduced-motion: reduce` 下自动禁用。

- **组合实现**：步进列绝对定位在组合壳右侧，`.k-input-number--controls` 时给内层输入框加右内边距让位（特异性 (0,2,0) 压过 KInput 基线，不改 KInput 源码）；
  - 输入框 hover/focus 边框与聚焦圈全由 KInput 承担。
- **文本态/数值态分离**：打字中间态（`-`、`1.`）不回填输入框；`min/max` 限幅与 `precision` 格式化只在失焦与步进落定发生（antd 同语义）。
- 步进钮 `mousedown.prevent` + 回焦输入框：点击不丢焦点、不触发表单提交；`tabindex="-1"` 不进 Tab 序列。
- 浮点残差：步进结果先 `toFixed(max(precision,10))` 归位再限幅（0.1+0.2 类问题）。
- KForm 联动：`status` 走合并链（prop > FormItem 校验态），同 KInput。

## 自定义渲染（headless）

双通道 `#render` 插槽（优先）/ `render` prop，提供时**整件视觉输出被替换**（组合壳、内层 KInput、步进列全自绘）；script 逻辑照跑（文本态/数值态分离、限幅、浮点归位全在动作里），**绑定包散播到自绘节点才继承**。通用契约见 [headless 自定义渲染](../headless.md)。scope = `KInputNumberRenderScope`（入口导出），四组字段逐项如下。

#### 状态（只读快照）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| size | `'xs' \| 'sm' \| 'md' \| 'lg'` | 高度档（缺省 `'md'`）；默认渲染透传内层 KInput，自绘可映射为自己的密度变量 |
| variant | `'outlined' \| 'filled' \| 'borderless'` | 外观形态（缺省 `'outlined'`）；透传 KInput 同轴；默认渲染 borderless 时步进列不垫左边线，自绘对齐此语义 |
| status | `NumberStatus \| undefined` | 校验态 prop 原值（`'error' \| 'warning'`）。**scope 里是原值不做合并**——「prop > FormItem 校验态」合并链发生在内层 KInput；headless 直绘原生 input 拿不到 FormItem 校验态，自绘内嵌默认渲染 KInput 并透传 status 才继承合并链 |
| min | `number \| undefined` | 下限原值；限幅只在落定（onCommit/步进）发生，打字中途不拦截；自绘可据此画限幅提示 |
| max | `number \| undefined` | 上限原值；同上 |
| step | `number` | 步长（缺省 1）；stepUp/stepDown 的增量，也是 precision 缺省推导源 |
| precision | `number` | **解析后的小数位**：`precision ?? step 的小数位数`（`String(step)` 小数点后长度，无小数点为 0）；落定格式化 `toFixed(precision)` 补零用它 |
| placeholder | `string` | 占位文本（已应用默认 `'请输入数值'`）；默认渲染透传内层 KInput，自绘自绑 |
| disabled | `boolean \| undefined` | 禁用 prop 原值；步进守卫（stepBy）与 showStep 合成消费它；自绘输入框需自绑原生 disabled |
| readonly | `boolean \| undefined` | 只读 prop 原值；步进守卫与 showStep 合成消费它（只读仍可选可聚焦）；自绘输入框需自绑原生 readonly |
| controls | `boolean` | 步进列开关 prop 原值（缺省 true）；实际显隐看 showStep 合成值；关掉后键盘 ↑↓ 仍可用 |
| animated | `boolean` | 动画开关原值（缺省 `false`）；开启后仅步进时播滚动动画，打字/外部赋值不播；自绘需自行实现 |
| id | `string \| undefined` | 原生 id 原值；默认渲染透传内层 KInput，自绘自绑（label for 关联） |
| before | `string \| number \| undefined` | 前置组合标签文本 prop 原值（插槽内容不进 scope）；默认渲染透传内层 KInput 的 `before`，自绘可自行排版 |
| after | `string \| number \| undefined` | 后置组合标签文本 prop 原值（插槽内容不进 scope）；默认渲染透传内层 KInput 的 `after`，自绘可自行排版 |
| value | `number \| null` | **数值态**（v-model，空值 = null）；打字可解析即同步、落定才限幅格式化；自绘回显数值/画温度计类视觉用它 |
| text | `string` | **文本态**：输入中间态（`"1."`、`"-"`）保留不回填；**自绘输入框的 value 绑它**（不是 value），输入事件调 setText；落定后为 `toFixed(precision)` 格式化串 |
| showStep | `boolean` | 步进列应否渲染：**`controls && !disabled && !readonly`** 合成；自绘步进钮显隐用它 |

#### ref 与出口

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| inputRef | `typeof inputRef`（`Ref<InstanceType<typeof KInput> \| null>`） | **内层 KInput 组件实例 ref**（非原生元素）：`focus()` 与步进后回焦的落点，组件 expose 的 `inputEl()` 也从它取原生 input。自绘内嵌 `<KInput :ref="ctx.inputRef">` 才有值；直绘原生 input 不绑则聚焦/步进回焦静默空操作（需自理焦点） |

#### 绑定包（spread 到自绘节点才继承）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| rootAttrs | `Record<string, unknown>` | 根节点：仅 `data-part="root"`（静态对象）。**不含视觉类**——组合壳排布、步进列绝对定位/分隔线/hover 底色、输入框让位右内边距全自绘（输入框视觉本就走 KInput 部件变量）。**本件无 inputAttrs/inputOn 语义包**：原生 input 的 type/value/placeholder/disabled/readonly/id 需自绑（value 绑 `text`），`inputmode="decimal"`（数字键盘）是默认渲染写死在内层 KInput 上的，自绘需自补；交互经动作组函数手动接线（`@input` → setText、`@blur` → onBlur、`@keydown` → onKeydown、`@focus` → onFocus） |

#### 动作

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| setText | `(t: string) => void` | 写文本态 `text.value = t`；**打字即同步 watcher 照跑**：trim 后空串 → `model = null`；可解析（剔除非 `[\d.eE+-]` 字符后为有限数）→ `model = 解析值`（抛 `update:modelValue`）；中间态（`"1."`、`"-"`、`"."`）不写 model 也不回填 text。model watcher 有等值短路防回环。无禁用守卫（靠自绘 input 的原生 disabled 挡输入）；无受控 prop，值恒经 v-model 通道 |
| onCommit | `() => void` | 落定：解析 text，不可解析 → text 回填 model 格式化值（null 则空串）并 emit `change(model.value)`；可解析 → min/max 限幅，值或文本与格式化结果有差才写 `model` + `text = toFixed(precision)`，恒 emit `change(限幅值)`。无禁用守卫；不直接调 KFormItem 校验（校验联动在内层 KInput 的 blur 链上，直绘原生 input 无此联动） |
| onFocus | `(e: FocusEvent) => void` | 仅转发 emit `focus(e)`；自绘输入框 `@focus` 绑它 |
| onBlur | `(e: FocusEvent) => void` | **先 onCommit() 落定（含 change 事件）再 emit `blur(e)`**；自绘输入框 `@blur` 绑它，不绑则丢限幅/格式化落定 |
| stepUp | `() => void` | 加一步：`disabled \|\| readonly` 守卫直接 return；base = `value ?? 0`，`base + step` 先 `toFixed(max(precision, 10))` 浮点归位（0.1+0.2 类残差）再 min/max 限幅；写 model + text 格式化 + emit `change(新值)` + `inputRef.focus()` 回焦。默认渲染经 `@mousedown.prevent` 调用（保焦点不闪、不触发提交），自绘建议沿用 |
| stepDown | `() => void` | 减一步：同 stepUp，方向取负；守卫/归位/限幅/回焦全同 |
| onKeydown | `(e: KeyboardEvent) => void` | ArrowUp/ArrowDown → `preventDefault()`（防光标跳动/滚动）+ stepBy(±1)（守卫在步进内）；其余键不拦截；自绘输入框 `@keydown` 绑它，controls=false 时键盘步进仍生效 |
| focus | `() => void` | 编程式聚焦（`inputRef.value?.focus()`，经内层 KInput 落原生 input）；与组件 expose 的 `focus()` 同一函数，未绑 inputRef 时空操作 |

另有 `slots`（`ReturnType<typeof useSlots>`）：默认渲染的插槽集合（before / after / prefix / suffix = 透传给内层 KInput 的内容位，render = 本件自定义渲染），自绘时可按需取用。

## 规格附录

- 长按连发（press-and-hold 加速）与 `formatter/parser` 自定义显示留后批；
- `controls` 键盘可达性走输入框 ↑↓，步进钮本身不入焦点序列（antd 实况同）。
