# KSwitch 开关

> 共同约定见 [共同约定](./index.md)。P2a 表单批第四件之三。开/关即时生效的二态切换（与 Checkbox 的「登记待提交」语义区分）。

## 何时使用

- 切换后立即生效的设置项；需要配合提交动作的登记型勾选用 [KCheckbox](./checkbox.md)。

## 代码演示

<Demo path="switch/basic" title="基础与状态" desc="`v-model` 布尔；`checkedChildren/unCheckedChildren` 内嵌文字；`size=small`；`loading` 不可交互 + 把手位 spinner；disabled 态。" />

<Demo path="switch/render" title="自定义渲染（headless）" desc="双通道：`#render` 自绘方形闸刀（role=switch/aria-checked 语义 + click/keydown 逻辑包继承）；`render` prop 自绘灯泡开关（checked 驱动自绘发光）。" />

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 开合态 | `boolean` | `false` |
| size | 轨道规格（非四轴 size 阶梯，开关只有两档） | `'default' \| 'small'` | `'default'` |
| checkedChildren / unCheckedChildren | 轨道内嵌文字 | `string` | — |
| disabled / loading | 禁用 / 加载中（不可交互，spinner 在把手位） | `boolean` | `false` |
| id / name | 原生透传（`button` 元素，name 仅语义） | — | — |
| render | 自定义渲染闭包（`#render` 插槽优先）；提供时整件视觉输出被替换 | `(scope: KSwitchRenderScope) => VNodeChild` | — |
| classNames / styles | `'root' \| 'handle'` | — | — |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 开合态变化 | `(checked: boolean)` |

Slots：`render` = 自定义渲染作用域插槽（scope 见文末「自定义渲染」节，提供时整件替换）；内嵌文字走 `checkedChildren/unCheckedChildren` prop。Expose：`focus()`。

### 部件变量

| 变量 | 初值 |
| --- | --- |
| `--k-switch-track-width / -height`（含 `-sm` 两档） | `control-height-xs ×2 / ×1`（small = ×1.5 / −4px） |
| `--k-switch-on-bg` | `--k-color-primary`（走 antd 主色路数，非移动端绿） |
| `--k-switch-off-bg` | `text-quaternary` |
| `--k-switch-disabled-on-bg` | `color-mix(primary 50% onto)` |
| `--k-switch-handle-bg / -text-color` | `bg-container` / `text-light-solid` |
| 动效 | 轨道与把手 `motion-duration-mid ease-in-out-cubic`；spinner `motion-duration-spin` |

## 注意事项

- 原生 `button[role=switch]` + `aria-checked`，Space/Enter 切换（键盘语义零成本，focus 环 = control-outline 同基线）。
- 把手位移走 `left`（transform 会跟内嵌文字打架，位移成本两帧内可忽略）。
- `loading` 优先级高于 `disabled`：都挡交互，把手位 spinner 用 `--k-motion-duration-spin`（1s 同源 token）。
- 按压遮罩豁免（同输入族）。

## 自定义渲染（headless）

双通道 `#render` 插槽（优先）/ `render` prop，提供时**整件视觉输出被替换**（轨道、把手、内嵌文字、spinner 全自绘）；script 逻辑照跑，**绑定包散播到自绘节点才继承**。通用契约见 [headless 自定义渲染](../headless.md)。scope = `KSwitchRenderScope`（入口导出），四组字段逐项如下。

#### 状态（只读快照）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| size | `'default' \| 'small'` | 轨道规格档（缺省 `'default'`；开关只有两档，非四轴 size 阶梯）；默认渲染映射 `.k-switch--{size}` 类，自绘可映射为自己的尺寸变量 |
| checked | `boolean` | 当前开合态（`modelValue === true` 的规范化布尔）；自绘发光/位移/内嵌文字切换统一用它 |
| disabled | `boolean` | **`disabled \|\| loading` 合成后的不可交互态**（非 disabled prop 原值）；rootAttrs 的 aria-disabled/原生 disabled 与 toggle 守卫都消费它，自绘置灰也应以它为准 |
| loading | `boolean` | 加载中 prop 原值；默认渲染据此在把手位画 spinner（`--k-motion-duration-spin` 旋转），自绘可据此画自己的加载指示 |
| checkedChildren | `string \| undefined` | 开态轨道内嵌文字；自绘按 checked 决定显隐与摆放（默认渲染开态靠左、关态靠右） |
| unCheckedChildren | `string \| undefined` | 关态轨道内嵌文字；同上 |
| id | `string \| undefined` | 原生 id 透传原值；已并入 rootAttrs，label for 关联场景无需单独消费 |
| name | `string \| undefined` | 原生 name 透传原值（button 元素上仅语义）；已并入 rootAttrs |

#### ref 与出口

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| rootEl | `Ref<HTMLElement \| null>` | 根节点 ref：`focus()` 的落点；`:ref="ctx.rootEl"` 绑到自绘根（建议原生 `button`），不绑则 `focus()`（含组件 expose 的同名方法）静默空操作 |

#### 绑定包（spread 到自绘节点才继承）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| rootAttrs | `Record<string, unknown>` | 根节点语义包：`data-part="root"` + `type="button"`（防表单误提交）+ `role="switch"` + `aria-checked`（随 checked 布尔）+ `aria-disabled` 与原生 `disabled`（合成禁用态为 true 才落，false 时省略键）+ `id` / `name`（未传省略）。**不含视觉类**——轨道宽高/圆角/开关底色、把手位移与阴影、内嵌文字排版、loading spinner、focus-visible 环全自绘；type=button 预设了原生 button 宿主，自绘用 div 需自行补键盘可达性 |
| rootOn | `{ click: () => void; keydown: (e: KeyboardEvent) => void }` | 根节点逻辑包：`click` → toggle 开合；`keydown` → Enter/Space 时 `preventDefault()`（防 Space 滚页）+ toggle。`v-on="ctx.rootOn"` spread 即继承全部开合交互（守卫在 toggle 内） |

#### 动作

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| toggle | `() => void` | 开合翻转：合成禁用态（disabled 或 loading）直接 return；否则写 `model.value = !checked`（defineModel 双向，向外抛 `update:modelValue`）并 emit `change(新布尔)`。无受控 prop——始终经 v-model 通道改值，父级不回写则视图不变；无表单字段校验联动（源码未接 KFormItem 注入） |
| focus | `() => void` | 聚焦根节点（`rootEl.value?.focus()`）；自绘未绑 rootEl 时空操作。与组件 expose 的 `focus()` 同一函数 |

另有 `slots`（`ReturnType<typeof useSlots>`）：默认渲染的插槽集合（本件仅 `render` 自身，无 default——内嵌文字走 `checkedChildren/unCheckedChildren` prop），自绘时可按需取用。
