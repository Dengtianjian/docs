# KForm 表单

> 共同约定见 [共同约定](./index.md)。P2a 表单批收尾件（与 KFormItem 同页）。数据收集 + 校验编排；**kit 首个运行时依赖 async-validator@4 在本批落地声明**（2026-11-17 三拍板之②）。

## 何时使用

- 需要把多个表单控件组织成一次数据提交并统一校验/回显时。

## 代码演示

<Demo path="form/basic" title="校验与回显" :desc="['`model` + `rules`（async-validator 规则表）。', '`form.validate()` 整表校验，失败 reject 汇总。', '控件错误态边框自动下发（Input 族消费 FormItem context）。', '自定义 `validator` 走回调式。']" />

<Demo path="form/layout" title="布局" :desc="['`layout=vertical`（缺省）/ `horizontal`（labelWidth 定宽 + labelAlign）/ `inline`（横排紧凑）。', '冒号 `colon` 默认开。']" />

<Demo path="form/a11y" title="分组控件关联" :desc="['RadioGroup / CheckboxGroup 用 aria-labelledby 关联字段标签，Switch 用 label for。', '错误时自动带 aria-describedby 与 aria-invalid。']" />

<Demo path="form/render" title="自定义渲染（headless）" :desc="['Form / FormItem 双层 `#render`：自绘卡片表单 + 字段行——字段注册、整表校验（submit 拦截）、错误回显、控件 status 注入照常生效。', 'validate/resetFields 动作直消费。']" />

## API

### KForm Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model | 数据源对象（字段值按 `name` 取） | `Record<string, unknown>` | — |
| rules | 表级规则：`{ [name]: Rule \| Rule[] }`（async-validator 语义；字段级 `KFormItem rules` 覆盖） | `Record<string, unknown>` | — |
| layout | 布局；支持断点对象/字符串 | `'vertical' \| 'horizontal' \| 'inline' \| Partial<Record<Breakpoint, Layout>> \| string` | `'vertical'` |
| labelWidth | horizontal/inline 标签宽；支持断点对象/字符串 | `number \| string \| Partial<Record<Breakpoint, number \| string>>` | `100` |
| labelAlign | 标签对齐；支持断点对象/字符串 | `'left' \| 'right' \| Partial<Record<Breakpoint, 'left' \| 'right'>> \| string` | `'right'` |
| colon | 标签后冒号；支持断点对象/字符串（字符串值 `true`/`false`） | `boolean \| Partial<Record<Breakpoint, boolean>> \| string` | `true` |

<CommonProps />

### Events（KForm）

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| finish | 整表校验通过（`<form>` 原生 submit 回车/提交按钮自动拦截进 validate） | `(values: Record<string, unknown>)` |
| finishFailed | 整表校验失败 | `(e: { errors: unknown[]; values: Record<string, unknown> })` |

Expose：`validate(): Promise<void>`（失败 reject `{errors, values}`）、`resetFields()`、`validating`、`errorCount`。KFormItem 无事件。

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default（KForm） | 表单内容（KFormItem 清单） |
| label（KFormItem） | 字段标签（覆盖 `label` prop） |
| default（KFormItem） | 字段控件 |
| extra（KFormItem） | 常驻帮助文案（覆盖 `extra` prop；仅无错误时显示） |
| render（KForm / KFormItem） | 自定义渲染作用域插槽，scope 见文末「自定义渲染」节；提供时整件替换 |

### KFormItem Props

| 属性 | 说明 |
| --- | --- |
| name | 字段名（注册进表；取值 `model[name]`、匹配 `rules[name]`） |
| label | 标签（`#label` 插槽优先） |
| rules | 字段级规则覆盖（优先于表级 `rules[name]`） |
| required | 无规则也显星号 |
| validateTrigger | `'blur' \| 'change' \| 'both'`（缺省 both；规则级 `trigger` 数组同样生效） |
| extra | 常驻帮助文案（无错误时替代错误行显示；`#extra` 插槽优先） |
| warningOnly | 规则对象里 `warningOnly: true` → 错误按 `status=warning` 下发（不判失败）※见注意事项 |

<CommonProps />

### 校验联动契约（context）

- `FORM_KEY`：model/rules/colon + 字段注册表；`FORM_ITEM_KEY`：`status` + `onFieldBlur/onFieldChange` 回调。
- Input 族消费方（合并链 prop > context）：KInput、KSelect 直接消费；KInputNumber 经内层 KInput 间接消费。
- Checkbox/Radio/Switch 不消费 status（回显靠错误行文案；控件变色留后批拍板）。

## 注意事项

- 移动端（≤767px）：横向/内联表单自动改为标签在上、控件通栏，不再使用固定 100px 标签宽。
- **标签与错误关联**：FormItem 自动生成控件 id 并经 `FORM_ITEM_KEY` 下发，控件（Input/InputNumber/Select/DatePicker/DateRangePicker/Checkbox/Radio/Switch）自动绑定 `id`；
  - RadioGroup/CheckboxGroup 由组根节点绑定 `id` 并用 `aria-labelledby` 关联标签；
  - 标签 `for` 指向它（自定义触发器不是 labelable 元素时，点标签会兜底 `focus()`）。
  - 有 `error`/`extra` 时控件自动带 `aria-describedby` 指向帮助文案，错误态带 `aria-invalid="true"`，错误文案 `role="alert"`；校验通过后自动移除。

- **整表校验 = 逐字段 Promise.allSettled 汇总**（校验逻辑全部下沉 FormItem），不存在「表级 schema 与字段独有规则两套回显路径」的分叉。
- 字段 rules 只在 FormItem 侧合并一次：`props.rules ?? form.rules[name]`。
- 响应式表单属性（layout / labelWidth / labelAlign / colon）的完整演示见 [响应式取值演示](../playground/responsive-form.md)。

- 布局变量链：`--k-form-label-width`（表级 style 注入）→ `--k-form-item-label-width`（字段级覆盖）；gap = `--k-form-gap`(size-lg)。
  - 响应式表单属性（layout / labelWidth / labelAlign / colon）由共享断点解析，语法见 [响应式取值](../design/responsive-values.md)；
  - `model` / `rules` 是数据，不做断点解析。
- **warningOnly 现状**：async-validator 4.x 的 `warningOnly` 也会走 reject 通道，本实现按「error 才置失败」判定 —— `warningOnly` 规则失败时字段仍计入失败（语义待 P2 复盘拍板，暂按 error 处理并保留规则透传）。

## 自定义渲染（headless）

双通道 `#render` 插槽（优先）/ `render` prop，提供时**整件视觉输出被替换**（表单壳、字段行、标签列、错误行全自绘）；script 逻辑照跑（字段注册、校验编排、控件 context 注入不受渲染通道影响），**绑定包散播到自绘节点才继承**。通用契约见 [headless 自定义渲染](../headless.md)。KForm 与 KFormItem 各有独立 scope（均入口导出），逐组字段如下；两件均无 ref/出口字段——标签宽变量出口在各自 rootAttrs.style 内。

### KFormRenderScope

#### 状态（只读快照）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| layout | `'vertical' \| 'horizontal' \| 'inline'` | 布局形态（缺省 `'vertical'`）；默认渲染映射 `.k-form--{layout}` 类（纵向列 / 横向标签列 / 横排换行），自绘据此排字段行 |
| labelWidth | `string` | **解析后的标签宽 CSS 值**（响应式对象/字符串按当前断点取值；number → `{n}px`，string 原样；缺省 `'100px'`）；已经变量形式并入 rootAttrs.style，自绘直取此值定标签列宽亦可 |
| labelAlign | `'left' \| 'right'` | 标签对齐（缺省 `'right'`）；默认渲染映射 `.k-form--label-{align}` 类，仅 horizontal/inline 有标签列时生效，自绘自映射 |
| colon | `boolean` | 标签后冒号开关（缺省 true）；经 FORM_KEY 注入为 FormItem scope 的 `colon`，自绘标签行消费 |
| model | `Record<string, unknown> \| undefined` | 数据源对象原值（字段值按 name 取）；validate 的 finish/finishFailed 回传它的浅拷贝；控件各自 v-model 到 `model.xxx`，KForm 不代管值 |
| rules | `Record<string, unknown> \| undefined` | 表级规则表原值（async-validator 语义，按字段 name 匹配）；字段级 `KFormItem rules` 覆盖，合并只在 FormItem 侧发生一次 |
| validating | `boolean` | 整表校验进行中（validate 进入置 true、finally 置 false）；自绘提交钮 loading 消费它；与组件 expose 的 `validating` 同源 |
| errorCount | `number` | 最近一次整表校验的失败字段数（allSettled rejected 计数；resetFields 归零）；自绘错误汇总条消费它；与 expose 的 `errorCount` 同源 |

#### 绑定包（spread 到自绘节点才继承）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| rootAttrs | `Record<string, unknown>` | 根节点：`data-part="root"` + `style: { '--k-form-label-width': 归一化标签宽 }`（布局变量链的表级源头，FormItem 的 `--k-form-item-label-width` 可覆盖）。**不含视觉类**——`.k-form` 的 flex 排布/gap（`--k-form-gap`）/字号字色、layout/labelAlign 类全自绘；h() 里追加样式用数组 `[ctx.rootAttrs.style, {…}]` 合并，勿后写 style 键整体覆盖丢变量 |
| rootOn | `{ submit: (e: Event) => void }` | 根节点逻辑包：`submit` → `preventDefault()` + `validate()`（reject 被 catch 吞掉，失败结果走 `finishFailed` 事件）。默认宿主是原生 `form`（回车 / type=submit 按钮自动触发 submit），自绘用 div 则丢这层原生提交语义，需自行接提交钮点击 → validate |

#### 动作

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| validate | `() => Promise<void>` | 整表校验：置 validating=true，对注册表内全部字段 `Promise.allSettled(it.validate('submit'))`（**校验逻辑全下沉 FormItem**，字段级 rules 覆盖照跑），errorCount = rejected 数；有失败 → 汇总各字段 errors + model 浅拷贝，emit `finishFailed({errors, values})` 并 **reject `{errors, values}`**（自绘直调需 catch）；全过 → emit `finish(values)`；finally 置 validating=false。与 expose 的 `validate()` 同一函数；无禁用守卫（表单级 disabled 留后批） |
| resetFields | `() => void` | 重置回显：遍历注册表逐字段 `clearError()` + errorCount 归零。**只清错误不还原数据**（model 由调用方自行重置）；不发事件；与 expose 的 `resetFields()` 同一函数 |

另有 `slots`（`ReturnType<typeof useSlots>`）：默认渲染的插槽集合（default = 表单内容 / KFormItem 清单），自绘时可按需取用，如 `ctx.slots.default?.()`。

### KFormItemRenderScope

#### 状态（只读快照）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| name | `string \| undefined` | 字段名原值：取值 `model[name]`、匹配 `rules[name]`、注册进表的键；未传则不注册（validate 也直接清错返回）。**KFormItem 必须在 KForm 内使用**（注入不到 FORM_KEY 直接 throw），headless 通道同样成立；name 动态改会重挂注册 |
| label | `string \| undefined` | 标签文案原值；`#label` 插槽优先覆盖（默认渲染语义），自绘按 `slots.label ?? label` 取 |
| required | `boolean` | **`required prop \|\| 合并规则任一含 required` 合成**（规则数组逐项查）；只驱动星号视觉，不加校验规则——无规则时星号照显但不拦截 |
| status | `'error' \| 'warning' \| undefined` | 控件下发态：无错误 undefined；有错误时合并规则任一 `warningOnly: true` → `'warning'`，否则 `'error'`。经 FORM_ITEM_KEY 注入 Input 族（合并链 prop > context）；warningOnly 仍计入整表失败（见注意事项） |
| error | `string \| null` | 错误文案：最近一次校验失败的首条 message（缺省兜底 `'校验失败'`），成功/清除后 null；自绘错误行消费它，有错误时优先于 extra 显示 |
| validating | `boolean` | 本字段校验进行中（runValidate 进入置 true、finally 置 false）；自绘字段级 loading 消费 |
| extra | `string \| undefined` | 常驻帮助文案原值；默认渲染仅无错误时显示（`#extra` 插槽优先），自绘按 `error ? error : (slots.extra ?? extra)` 排 |
| colon | `boolean` | **表级 colon 注入值**（非本件 prop）；自绘标签行据此补冒号 |
| controlId | `string` | 自动生成的控件 id；自绘标签用 `:for="ctx.controlId"` |
| labelId | `string` | 自动生成的标签 id；自绘标签用 `:id="ctx.labelId"`、分组控件用 `aria-labelledby="ctx.labelId"` |
| helpId | `string` | 自动生成的帮助文案 id；错误行用 `:id="ctx.helpId"` |
| describedBy | `string \| undefined` | 有 error/extra 时的 helpId；自绘控件绑 `aria-describedby` 用 |
| invalid | `boolean` | 当前是否错误（`status === 'error'`）；自绘控件绑 `aria-invalid` 用 |

#### 绑定包（spread 到自绘节点才继承）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| rootAttrs | `Record<string, unknown>` | 根节点：`data-part="root"`；**显式传 labelWidth prop 时**另带 `style: { '--k-form-item-label-width': number → px / string 原样 }`（覆盖表级 `--k-form-label-width`），未传则无 style 键。**不含视觉类与结构**——`has-error` 类、label/control/help 三段结构、星号/冒号/错误行排版、horizontal/inline 标签列宽与对齐全自绘；追加样式同样用数组合并勿覆盖 style 键 |

#### 动作

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| validate | `(trigger?: 'blur' \| 'change' \| 'submit') => Promise<void>` | 字段校验：**无 name / 无合并规则（`props.rules ?? form.rules[name]`）/ 无 model 时清 error 直接 resolve**；trigger 为 blur/change 时按规则级 `trigger` 过滤（无 trigger 的规则恒过，字符串相等或数组 includes 匹配），过滤后为空直接 resolve；否则以 async-validator `new Schema({[name]: rules})` 校验 `model[name]`——期间 validating=true，成功清 error，失败置 error=首条 message（兜底 `'校验失败'`）并 **rethrow（reject）**，finally 复位 validating。`'submit'`/不传 = 全规则不过滤（整表 validate 走此档）。也是注册进表供 KForm 汇总的同一函数 |
| clearError | `() => void` | 清本字段错误回显（error=null，status 随之归 undefined）；不动数据、不发事件；KForm.resetFields 逐字段调它 |

另有 `slots`（`ReturnType<typeof useSlots>`）：默认渲染的插槽集合（default = 字段控件、label = 标签覆盖、extra = 帮助文案覆盖），自绘时可按需取用，如 `ctx.slots.default?.()`。

headless 下字段注册与控件注入照跑：自绘 FormItem 内放默认 KInput，status 下发与 blur/change 校验联动不变（FORM_ITEM_KEY 的 `onFieldBlur/onFieldChange` 按 `validateTrigger`（缺省 both）过滤后调上表 validate；自绘直绘原生 input 则需自行在 blur/change 时调 `ctx.validate('blur'/'change')`）。

## 规格附录

- 2026-11-17：依赖声明 = kit `package.json` dependencies `async-validator: ^4.2.5`（此前 kit 运行时依赖为零；tiptap 系属 packages/editor，与 ui 无涉）。
  - 安装形态：包级 `packages/vue/ui/node_modules/async-validator`（kit 根 node_modules 属主 root 不可写，node 解析自 importer 向上命中包级目录）。
- 留后批：表单级 disabled/size 下发、嵌套字段路径（`a.b.c` name 解析）、`validateFirst`、动态增删 FormItem 的自动重校验。
