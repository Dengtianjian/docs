# KRadio 单选框

> 共同约定见 [共同约定](./index.md)。P2a 表单批第四件之二（与 KRadioGroup 同页）。互斥单选；`shape="button"` = RadioButton 拼接段形态。

## 何时使用

- 2~5 项互斥选项直接平铺时（更多收进 [KSelect](./select.md)）；分段切换器语义用 `shape="button"`。

## 代码演示

<Demo path="radio/basic" title="基础与组" :desc="['KRadioGroup `options` 自渲染 / 插槽手写两形态（与 Checkbox 一致）。', 'model 单值。']" />

<Demo path="radio/button" title="按钮形态" :desc="['`shape=button`：段拼接（首末圆角、选中段主色描边主色字并抬 z-index 压相邻边）。', '键盘方向键走原生 radio 组语义。']" />

<Demo path="radio/render" title="自定义渲染（headless）" :desc="['KRadioGroup `#render` 直消费 options/value/select 自绘套餐卡（role=radiogroup 语义继承）。', 'KRadio `render` prop 自绘方案瓦片（原生 radio 语义包 + change 逻辑包继承）。']" />

## API

### KRadio Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | standalone 时存「选中值」，与 `:value` 相等即选中 | `string \| number` | — |
| value | 选项值（组模式必配对；standalone 配 v-model 也可） | `string \| number` | — |
| disabled | 原生 disabled 透传 | `boolean` | — |
| name | 原生 name 透传 | `string` | — |
| id | 原生 id 透传 | `string` | — |

<CommonProps />

### KRadioGroup

| 属性 | 说明 |
| --- | --- |
| v-model | `string \| number` |
| options | `Array<string \| {label, value, disabled?}>` |
| shape | `'circle'`（缺省）\| `'button'` |
| disabled | 组级禁用下发 |
| name | 原生 name（同组互斥由 context 收敛） |
| id | 组根节点 id（缺省取 FormItem 自动 id） |

<CommonProps />

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 选中时派发（KRadio 恒发 `true`，radio 无反选）；组本身不发事件，变更走 v-model | `(checked: boolean)` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default（KRadio） | 标签文字（button 形态为段内文字） |
| default（KRadioGroup） | 手写子件（仅未传 `options` 时渲染） |
| render（KRadio / KRadioGroup） | 自定义渲染作用域插槽，scope 见文末「自定义渲染」节；提供时整件替换 |

### 部件变量

圆点框：`--k-radio-dot-size`=`--k-size`；选中内点 `--k-radio-inner`=`primary`；边框链同 Checkbox。button 形态段高 = `control-height`，段距零（拼接），变量 `--k-radio-btn-padding-x`=`size`（16px）。

## 注意事项

- 触屏（`hover: none`）：整行最小高度 44px，扩大点击区。

- button 形态选中段左缘由 `::before` 1px 竖条补上并翻主色（段自身 `border-left:0`，左缘像素归前段右边框所有，选中描边染不到左缘）；竖条高度含上下边框行才与选中上下边连成整框，`z-index:1` 压相邻边、共用边线不双描（antd 实况同，2026-11-17 左边框补全）。
- 圆点内点取 8×8 @ 3px 整偏移（`inset: calc(25% - 0.5px)`）：纯 25% 得 7px @ 3.5px 半像素，栅格化把环隙舍入成 3/4 不对称而视觉偏芯（2026-11-17 居中修正）。
- 单选「反选」不存在：点已选中项无变化（原生 radio 语义），清空需求走 KSelect allowClear。
- 按压遮罩豁免（同输入族）。

## 自定义渲染（headless）

双通道 `#render` 插槽（优先）/ `render` prop，提供时**整件视觉输出被替换**（圆点/拼接段、内点、标签排版全自绘）；script 逻辑照跑，**绑定包散播到自绘节点才继承**。通用契约见 [headless 自定义渲染](../headless.md)。KRadio 与 KRadioGroup 各有独立 scope（均入口导出），逐组字段如下。

### KRadioRenderScope

#### 状态（只读快照）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| value | `string \| number \| undefined` | 选项值原值；**组模式判定 = 注入到组 context 且 value != null**，此时选中态/写值全走组；standalone 时与 v-model 相等即选中（未传 value 则永不选中、change 也不写值） |
| checked | `boolean` | 当前选中态：组模式比对 `group.value === value`，standalone 比对 `modelValue === value`；自绘内点/描边统一用它 |
| disabled | `boolean` | **`disabled \|\| 组 disabled` 合成后的禁用态**（非 prop 原值）；inputAttrs 的原生 disabled 消费它，自绘置灰也应以它为准 |
| button | `boolean` | 组 `shape="button"` 注入的拼接段形态标记（`group?.shape === 'button'`，standalone 恒 false）；默认渲染据此切「圆点 + 文字」/「段内文字」两套结构，自绘可据此切形态 |
| name | `string \| undefined` | 原生 name 原值；已并入 inputAttrs。**同名是原生 radio 互斥与方向键组语义的根据**——组默认渲染把组 name 下发到每个子件，headless 自绘需自行保证同组同 name |
| id | `string \| undefined` | 原生 id 原值；已并入 inputAttrs，外部 label for 关联无需单独消费 |

#### ref 与出口

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| inputEl | `Ref<HTMLInputElement \| null>` | 隐藏原生 input 的 ref：组件 expose 的 `focus()` 落点；`:ref="ctx.inputEl"` 绑到自绘原生 input，不绑则 focus() 静默空操作。默认渲染把 input 隐藏（absolute + opacity:0 + pointer-events:none）由它承担 a11y 语义、键盘 Space 与方向键组切换，自绘建议沿用「隐藏原生 input + 自绘圆点/段」结构 |

#### 绑定包（spread 到自绘节点才继承）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| rootAttrs | `Record<string, unknown>` | 根节点：仅 `data-part="root"`（静态对象）。默认宿主是 `label`（点文字转发选中到 input 是 label 原生行为），自绘用 div 则丢这层免费交互，需自行把点击引到 input。**不含视觉类**——圆点边框/内点缩放、button 段拼接（首末圆角/左缘 ::before 竖条/选中抬 z-index）、hover 边框、focus-visible 环、禁用置灰全自绘 |
| inputAttrs | `Record<string, unknown>` | 原生 input 语义包：`data-part="input"` + `type="radio"` + `checked`（随选中态布尔）+ `disabled`（合成禁用为 true 才落，false 省略键）+ `name` / `id`（未传省略） |
| inputOn | `{ change: () => void }` | 原生 input 逻辑包：`change` → 组模式调 `group.select(value)` 写组单值；standalone 且 value != null 时写 `model.value = value`（defineModel 抛 `update:modelValue`）；**恒 emit `change(true)`**（radio 无反选，点已选中项原生不派发 change）。禁用拦截靠 inputAttrs 的原生 disabled，包内无显式守卫；无受控 prop，值恒经 v-model/组 context 通道；无表单字段校验联动（源码未接 KFormItem 注入） |

另有 `slots`（`ReturnType<typeof useSlots>`）：默认渲染的插槽集合（default = 标签文字，button 形态为段内文字），自绘时可按需取用，如 `ctx.slots.default?.()`。本件 scope 无独立动作函数——写值动作全在 inputOn 的 change 闭包内。

### KRadioGroupRenderScope

#### 状态（只读快照）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| options | `{ label: string; value: string \| number; disabled?: boolean }[]` | 归一化后的选项清单（string 项展开为 `{label: o, value: o}`；未传 options 为 `[]`，此时走 `slots.default` 手写子件形态）；自绘 `v-for` 数据源 |
| shape | `'circle' \| 'button'` | 组形态（缺省 `'circle'`）；经 provide 下发为子件 scope 的 `button` 标记；自绘据此决定圆点平铺或拼接段 |
| disabled | `boolean` | 组级禁用 prop（缺省 false）；经 provide 下发合成子件禁用态，并落 rootAttrs 的 aria-disabled；自绘直绘选项时需自行消费 |
| name | `string \| undefined` | 组级原生 name 原值；**不在 rootAttrs 内**——默认渲染逐子件下发，headless 需自行传给子件/自绘 input（同名互斥 + 方向键组语义靠它） |
| value | `string \| number \| undefined` | 当前选中单值（v-model 原值，未选为 undefined）；选中判断 `value === o.value` |

#### 绑定包（spread 到自绘节点才继承）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| rootAttrs | `Record<string, unknown>` | 根节点：`data-part="root"` + `role="radiogroup"` + `aria-disabled`（组禁用为 true 才落，false 省略键）。**不含视觉类**——默认根的 inline-flex 换行排布/间距、button 形态的无缝拼接（gap:0 + nowrap）自绘；provide 注入照跑：headless 组内放默认渲染的 KRadio（带 value）照常继承组 value/disabled/shape/select |

#### 动作

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| select | `(v: string \| number) => void` | 组选值：直写 `model.value = v`（抛 `update:modelValue`）。**无禁用守卫**（组 disabled 只下发子件，直调 select 不拦截，自绘需自查）；无反选语义（再选同值仍是该值，清空需求走 KSelect allowClear）；组本身不发 change 事件——change 由组内 KRadio 恒发 `true`，直调 select 只有 v-model 变更；无受控 prop、无表单字段校验联动 |

另有 `slots`（`ReturnType<typeof useSlots>`）：默认渲染的插槽集合（default = 手写子件，仅未传 options 时渲染），自绘时可按需取用，如 `ctx.slots.default?.()`。本件无 ref/出口字段。
