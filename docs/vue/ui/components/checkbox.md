# KCheckbox 复选框

> 共同约定见 [共同约定](./index.md)。P2a 表单批第四件（与 KCheckboxGroup 同页）。多选登记；含半选态与组两形态（options 自渲染 / 插槽手写）。

## 何时使用

- 独立开关型选项，或一组多选（KCheckboxGroup）；「全选」场景用子件 `indeterminate` 表达部分选中。

## 代码演示

<Demo path="checkbox/basic" title="基础与半选" desc="`v-model` 布尔；`indeterminate` 半选视觉（状态由调用方管理，antd 同语义）；禁用三态。" />

<Demo path="checkbox/group" title="复选组" desc="KCheckboxGroup 两形态：`options` 自渲染 或 默认插槽手写子件（`:value` 对上组 model）；共用同一 context，`disabled` 组级下发。" />

<Demo path="checkbox/render" title="自定义渲染（headless）" desc="三件齐演：KCheckbox `#render` 自绘 chip（隐藏原生 input 继承勾选逻辑）；`render` prop 自绘卡片；KCheckboxGroup `#render` 直消费 options/values/toggle 自绘多选段。" />

## API

### KCheckbox Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 勾选态（standalone） | `boolean` | `false` |
| value | 组模式选项值（组内消费 context，不配 v-model） | `string \| number` | — |
| indeterminate | 半选视觉 | `boolean` | `false` |
| disabled / required / name / id | 原生透传（name 仅 standalone） | — | — |

<CommonProps />

### KCheckboxGroup

| 属性 | 说明 |
| --- | --- |
| v-model | `(string \| number)[]` |
| options | `Array<string \| {label, value, disabled?}>`；不传 = 插槽形态 |
| disabled / id | 组级禁用下发 / 组根节点 id（缺省取 FormItem 自动 id） |

<CommonProps />

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 勾选态变化（KCheckbox standalone / 组模式均派发；组本身不发事件，变更走 v-model） | `(checked: boolean)` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default（KCheckbox） | 标签文字 |
| default（KCheckboxGroup） | 手写子件（仅未传 `options` 时渲染） |
| render（KCheckbox / KCheckboxGroup） | 自定义渲染作用域插槽，scope 见文末「自定义渲染」节；提供时整件替换 |

### 部件变量（勾选框体）

| 变量 | 初值 |
| --- | --- |
| `--k-checkbox-box-size` / `-radius` | `--k-size`(16px) / `border-radius-xs` |
| `--k-checkbox-border / -hover-border` | `border` / `primary-hover` |
| `--k-checkbox-checked-bg / -checked-border` | `primary` / `primary` |
| `--k-checkbox-solid-color` | `--k-color-text-light-solid`（勾/横条恒白） |
| `--k-checkbox-disabled-bg / -border` | `fill-tertiary` / `border` |
| focus 环 | `control-outline(-width)` 垫在框体（原生 input 隐藏同法） |

## 注意事项

- 触屏（`hover: none`）：整行最小高度 44px，扩大点击区。

- 勾 = 右下半边框旋转 45°（零图标依赖，同 KInput 清除件路数）；半选 = 居中横条，与勾互斥渲染。勾的定位 `translate` 写在 `rotate` 左侧（未旋转坐标系位移）并上移补偿墨迹重心，保证勾在框体正中（2026-11-17 居中修正）。
- 隐藏原生 `input`（`opacity:0` absolute）承担 a11y 语义与键盘 Space；focus 环走 `:focus-visible + box`。
- 半选只改视觉不改 model（调用方按 `checked && !indeterminate` 判定全选，antd 同语义）。
- 按压遮罩豁免（同输入族）：按压语义 = 勾选。

## 自定义渲染（headless）

双通道 `#render` 插槽（优先）/ `render` prop，提供时**整件视觉输出被替换**（框体、勾/横条、标签排版全自绘）；script 逻辑照跑，**绑定包散播到自绘节点才继承**。通用契约见 [headless 自定义渲染](../headless.md)。KCheckbox 与 KCheckboxGroup 各有独立 scope（均入口导出），逐组字段如下。

### KCheckboxRenderScope

#### 状态（只读快照）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| value | `string \| number \| undefined` | 组模式选项值原值（standalone 不传为 undefined）；**组模式判定 = 注入到组 context 且 value != null**，此时勾选态/写值全走组，v-model 不参与 |
| indeterminate | `boolean` | 半选视觉 prop（缺省 false，状态由调用方管理）；只改视觉不改 model，自绘半选横条与勾互斥渲染可参照 inputAttrs 的 indeterminate 合成值 |
| checked | `boolean` | 当前勾选态：组模式读 `group.values.includes(value)`，standalone 读 `modelValue === true`；自绘勾/底色统一用它 |
| disabled | `boolean` | **`disabled \|\| 组 disabled` 合成后的禁用态**（非 prop 原值）；inputAttrs 的原生 disabled 消费它，自绘置灰也应以它为准 |
| required | `boolean \| undefined` | 原生 required 原值（仅 standalone 有意义）；已并入 inputAttrs（true 才落键） |
| name | `string \| undefined` | 原生 name 原值（仅 standalone 参与表单提交语义）；已并入 inputAttrs |
| id | `string \| undefined` | 原生 id 原值；已并入 inputAttrs，外部 label for 关联无需单独消费 |

#### ref 与出口

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| inputEl | `Ref<HTMLInputElement \| null>` | 隐藏原生 input 的 ref：组件 expose 的 `focus()` 落点；`:ref="ctx.inputEl"` 绑到自绘原生 input，不绑则 focus() 静默空操作。默认渲染把 input 隐藏（absolute + opacity:0 + pointer-events:none）由它承担 a11y 语义与键盘 Space，自绘建议沿用「隐藏原生 input + 自绘框体」结构 |

#### 绑定包（spread 到自绘节点才继承）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| rootAttrs | `Record<string, unknown>` | 根节点：仅 `data-part="root"`（静态对象）。默认宿主是 `label`（点文字转发勾选到 input 是 label 原生行为），自绘用 div 则丢这层免费交互，需自行把点击引到 input。**不含视觉类**——框体边框/圆角/底色、勾（半边框旋转 45°）、半选横条、hover 边框、focus-visible 环、禁用置灰全自绘 |
| inputAttrs | `Record<string, unknown>` | 原生 input 语义包：`data-part="input"` + `type="checkbox"` + `checked`（随勾选态布尔）+ `disabled`（合成禁用为 true 才落，false 省略键）+ `required`（true 才落）+ `name` / `id`（未传省略）+ `indeterminate`（**`indeterminate && !checked` 合成**，半选与勾互斥；落的是 DOM property，驱动浏览器原生半选态） |
| inputOn | `{ change: (e: Event) => void }` | 原生 input 逻辑包：`change` → 读 `event.target.checked`；组模式调 `group.toggle(value, checked)` 写组值集，standalone 写 `model.value`（defineModel 抛 `update:modelValue`）；两模式均 emit `change(checked)`。禁用拦截靠 inputAttrs 的原生 disabled（浏览器不派发 change），包内无显式守卫；无受控 prop，值恒经 v-model/组 context 通道；无表单字段校验联动（源码未接 KFormItem 注入） |

另有 `slots`（`ReturnType<typeof useSlots>`）：默认渲染的插槽集合（default = 标签文字），自绘时可按需取用，如 `ctx.slots.default?.()`。本件 scope 无独立动作函数——写值动作全在 inputOn 的 change 闭包内。

### KCheckboxGroupRenderScope

#### 状态（只读快照）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| options | `{ label: string; value: string \| number; disabled?: boolean }[]` | 归一化后的选项清单（string 项展开为 `{label: o, value: o}`；未传 options 为 `[]`，此时走 `slots.default` 手写子件形态）；自绘 `v-for` 数据源 |
| disabled | `boolean` | 组级禁用 prop（缺省 false）；经 provide 下发给组内 KCheckbox 合成其禁用态；自绘直绘选项时需自行消费 |
| values | `(string \| number)[]` | 当前选中值集（`modelValue ?? []` 规范化）；勾选判断 `values.includes(o.value)` |

#### 绑定包（spread 到自绘节点才继承）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| rootAttrs | `Record<string, unknown>` | 根节点：仅 `data-part="root"`（静态对象）。**不含视觉类**——默认根的 inline-flex 换行排布与间距自绘；provide 注入照跑：headless 组内放默认渲染的 KCheckbox（带 value）照常继承组 values/disabled/toggle |

#### 动作

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| toggle | `(v: string \| number, on: boolean) => void` | 组写值：以当前 values 建 Set，on=true 加 / false 删（**Set 去重**），回写 `model.value = [...set]`（抛 `update:modelValue`）。**无禁用守卫**（组 disabled 只下发子件，直调 toggle 不拦截，自绘需自查）；组本身不发 change 事件——change 由组内 KCheckbox 派发，直调 toggle 只有 v-model 变更；无受控 prop、无表单字段校验联动 |

另有 `slots`（`ReturnType<typeof useSlots>`）：默认渲染的插槽集合（default = 手写子件，仅未传 options 时渲染），自绘时可按需取用，如 `ctx.slots.default?.()`。本件无 ref/出口字段。
