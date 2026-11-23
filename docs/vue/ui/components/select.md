# KSelect 选择器

> 共同约定见 [共同约定](./index.md)。P2a 表单批第三件，**首个弹层组件 = popupContainer 契约首验**（KConfigProvider 职责④；P2b 弹层三件套共用基座）。

## 何时使用

- 从候选集中选择一项/多项；候选多时开 `filterable` 搜索，候选有层级时用分组，多选标签多用 `maxTagCount` 折叠。

## 代码演示

<Demo path="select/basic" title="基础使用" :desc="['`options` 清单（`{label,value,disabled}`）。', '`allow-clear` 悬浮出清除钮。', 'disabled 项弹层内不可点。']" />

<Demo path="select/multiple" title="多选" :desc="['`mode=multiple`，model 为数组。', '选中项以标签回显、可单个移除。', 'Backspace 删尾标签。', '弹层保持展开直到外点/Esc。']" />

<Demo path="select/filter" title="过滤 / 输入创建选项" :desc="['`filterable` 触发器内嵌输入框（单选替换回显、多选跟在标签后），本地按 label 不区分大小写过滤。', '`filter` 自定义匹配。', '`tag` 回车把输入值创建为选项。', '`search` 事件实时抛输入。']" />

<Demo path="select/group" title="分组 / 隐藏已选 / 前后缀" :desc="['`options` 混排 `{type:\'group\',label,children}` 与散选项，分组子项自动缩进一级。', '`hide-selected` 菜单隐藏已选（组空整组消失）。', '`#prefix` / `#suffix` 插槽（箭头保留）。']" />

<Demo path="select/virtual" title="虚拟列表 / 到顶到底" :desc="['`virtual` 只渲染可视窗口内的行，1000 条选项照样流畅；分组标题参与定高。', '`reach-top` / `reach-bottom` 在滚动进入边界时各触发一次（打开时静默初始化，不触发）。', '`filterable` 与虚拟滚动可同时开启。']" />

<Demo path="select/max-tag" title="最大标签数" :desc="['`max-tag-count` 数字 = 固定保留个数。', '`responsive` = ResizeObserver 实测触发器宽度自适应收敛。', '溢出 +N 标签悬停 Tooltip 列剩余项。', '`#label` 插槽改标签回显。']" />

<Demo path="select/slots" title="菜单插槽 / 滚动事件" :desc="['`#header` / `#footer` 不随列表滚。', '`#option` 自绘行（scope：option/selected/active）。', '`#empty` 带 pattern。', '`#label` 改选中回显。', '列表 `scroll` 事件实时抛出。']" />

<Demo path="select/popup-container" title="弹层容器（契约首验）" :desc="['`KConfigProvider :popup-container` 指定挂载盒：弹层 absolute 进容器文档流，随内容滚动、被盒边界裁切。', 'scoped 主题下出口节点自带作用域类，token 链不断。']" />

<Demo path="select/render" title="自定义渲染（headless）" :desc="['`#render` 插槽 / `render` prop 整件替换：下划线触发器 + 深色面板全自绘。', '开合、键盘导航、点外关闭、定位翻转、禁用项逻辑由绑定包继承。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 选中值（多选 = 数组） | `string \| number \| (string\|number)[] \| null` | — |
| options | 候选清单，可混排分组 | `(KSelectOption \| KSelectGroup)[]`（`{label, value, disabled?}` / `{type:'group', label, children}`） | `[]` |
| mode | `'multiple'` 或缺省单选 | `string` | — |
| placeholder | 占位（filterable 展开时作输入框占位；单选输入框占位 = 当前选中 label） | `string` | `'请选择'` |
| filterable | 可搜索：触发器内嵌输入框，本地过滤 | `boolean` | `false` |
| filter | 自定义过滤（缺省 label 包含 pattern，不区分大小写） | `(pattern: string, option: KSelectOption) => boolean` | — |
| tag | 输入值可创建为选项（需 filterable）；Enter 无高亮项时创建并选中 | `boolean` | `false` |
| maxTagCount | 多选标签折叠：数字 = 保留个数；`'responsive'` = 按触发器宽度实测 | `number \| 'responsive'` | — |
| hideSelected | 菜单隐藏已选中项 | `boolean` | `false` |
| virtual | 选择列表虚拟滚动（分组标题 + 选项统一窗口化，行高实测修正） | `boolean` | `false` |
| size | 同 [KInput](./input.md) 尺寸轴（触发器视觉同源） | — | — |
| variant | 同 [KInput](./input.md) 样式轴（触发器视觉同源） | — | — |
| status | 同 [KInput](./input.md) 校验态轴（触发器视觉同源） | — | — |
| disabled | 同 KInput 语义（整件禁用） | — | — |
| allowClear | 同 KInput 语义（有值时悬浮出清除钮） | — | — |
| id | 同 KInput 语义（filterable 时 id 落输入框） | — | — |

<CommonProps />

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 选中值变化（多选为数组） | `(value: string \| number \| (string\|number)[] \| null)` |
| focus | 触发件（filterable = 输入框）聚焦 | `(e: FocusEvent)` |
| blur | 触发件（filterable = 输入框）失焦 | `(e: FocusEvent)` |
| search | 过滤输入变化 | `(pattern: string)` |
| scroll | 选项列表滚动 | `(e: Event)` |
| reachTop | 滚动进入列表顶部（状态跃迁触发一次，打开时静默） | — |
| reachBottom | 滚动进入列表底部（状态跃迁触发一次，打开时静默） | — |

### Slots

| 插槽 | 说明 | 作用域参数 |
| --- | --- | --- |
| prefix | 触发器前缀 | — |
| suffix | 触发器后缀（在清除钮与箭头之前） | — |
| label | 选中回显（单选整行 / 多选每个标签） | `{ option: KSelectOption \| null, value }` |
| option | 菜单行自绘（替换默认 label + 勾选） | `{ option, selected, active }` |
| header | 菜单头，不随列表滚动 | — |
| footer | 菜单脚，不随列表滚动 | — |
| empty | 空菜单（过滤无匹配时 pattern 非空） | `{ pattern }` |
| render | 自定义渲染作用域插槽，scope 见文末「自定义渲染」节；提供时整件替换 | `KSelectRenderScope` |

Expose：`focus() / blur() / open() / close()`。

### 部件变量（触发器）

| 变量 | 初值 |
| --- | --- |
| `--k-select-height / padding-x / radius / bg / border-color` | 同 KInput 路数（controlHeight / size 16px，xs 12 / lg 20 / border-radius / bg-container / border） |
| `--k-select-hover-border-color / -focus-border-color / outline(-width)` | primary-hover / primary / control-outline |
| `--k-select-tag-bg / -radius` | `fill-tertiary` / `border-radius-sm` |
| 弹层 | bg `--k-color-bg-elevated`、影 `--k-box-shadow-secondary`、层级 `--k-z-index-dropdown` |
| 选项行 | 紧凑弹层档：md 行高 32px（sm/xs 28、lg 36）；内容区四边 4px，选项水平内边距 8px；字号与弹层档一致：sm/xs 12、md 14、lg 16 |
| 选项态 | active 行 `fill-tertiary`；选中 `primary-bg` 底 + 主色字（active+选中 `primary-bg-hover`） |

## 注意事项

- **弹层定位**：锚触发框下沿（间距 4px = `--k-size-xxs` 同步常数），宽度贴触发器；下方溢出视口自动上翻，展开动画随之镜像（顶→底 scaleY 展开 / 上翻时底→顶收合，进出场都有）。
- **popupContainer 契约（2026-11-17 改判，antd getPopupContainer 同款）**：缺省 body = `fixed` + scroll（capture）/resize 跟随。
  - 指定元素 = `absolute` 进容器文档流（坐标 = 视口坐标 − 容器原点 − border + 容器 scroll；随内容滚、被容器 overflow 裁切；static 容器自动补 `relative`；翻转仍按视口判定）。
  - Select/Tooltip/Popover/Popconfirm 四件同语义（`usePopupFrame` 基座）。
- **焦点模型**：非 filterable 焦点恒留 `role=combobox` 触发件。
  - filterable 焦点在输入框（combobox 语义随输入框），弹层靠 `aria-activedescendant` 指示活动项。
  - ↑↓ 移动、Enter 选中（tag 模式无高亮项时创建）、Esc 关闭、多选 Backspace 空输入删尾标签。
  - IME 组合期间不响应 Enter。
- **maxTagCount responsive**：两遍实测（先全渲染量标签宽，再扣输入框与 +N 探针宽收敛），ResizeObserver 跟触发器尺寸；+N 无溢出时退为隐藏探针保留可测宽度（探针必须 `display: inline-flex` 覆写通用 `.is-hidden` 的 `display:none`，否则量宽为 0 收敛多算一档）。
- **多选换行撑高**：触发器 `min-height` + 内容 `flex-wrap`，标签换行自动撑大盒高；多选模式控制框带 4px 垂直内边距（`--k-size-xxs`），换行行不贴边框；+N 的 KTooltip 触发层 flex 化消除 inline 基线 strut（否则单行被撑大 3px）。
- 外点关闭用 `pointerdown` capture 判定（含弹层内与触发区内不关）；Tab 焦点离开触发区/弹层亦关。
- 列表滚动条走部件视觉（thin / 6px、`fill-secondary` thumb）。
- **分组缩进**：组标题保持弹层水平内边距，组内选项再缩进一级（`--k-popup-item-padding-x + --k-size-sm` = 20px）；散选项无组标题，不缩进。
- **filterable 空输入态**：输入框在有 pattern 时按字符数收缩、为空时撑满剩余宽度，多选触发器的 placeholder 因此完整可见。
- **虚拟列表**：`virtual` 开启后按「分组标题 + 选项」拍平成行，容器用行高前缀和撑总高、窗口内行绝对定位；行高先估算（md 32 / 分组 26）再实测修正，`size` 换档与过滤导致行集变化时缓存失效重测。键盘高亮行在窗口外时按偏移直接滚列表；`reachTop` / `reachBottom` 只在进入边界状态时各触发一次，打开弹层的初始化不触发。headless 自绘需自行窗口化（scope 提供 `virtual` 原值与 `listEl` 滚动容器）。

## 自定义渲染（headless）

提供 `#render` 作用域插槽（优先）或 `render` 闭包 prop 任一，**整件视觉输出被替换**（触发器、Teleport、Transition、菜单结构都自绘）；script 逻辑照跑，**绑定包散播到自绘节点才继承**。通用契约见 [headless 自定义渲染](../headless.md)。scope 为 `KSelectRenderScope`（入口导出），四组字段逐项如下。

#### 状态（只读快照）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| open | `boolean` | 弹层是否展开；自绘弹层用它做 `v-if` 门控 |
| multiple | `boolean` | 是否多选（`mode="multiple"`）；决定回显用标签还是单值、pick 后是否保持展开 |
| disabled | `boolean` | 整件禁用；自绘触发器应据此挂 `disabled` / `data-disabled` 并置灰，所有动作内部也有禁用守卫 |
| filterable | `boolean` | 可搜索模式；为 true 时焦点与 combobox 语义在输入框（inputAttrs/inputOn），controlAttrs 的 tabindex 变 -1 |
| virtual | `boolean` | 虚拟滚动开关原值；默认渲染窗口化只需它，headless 自绘需自行实现窗口化与行高测量 |
| size | `'xs' \| 'sm' \| 'md' \| 'lg'` | 尺寸档；自绘可映射为自己的密度变量 |
| placeholder | `string` | 占位文案；无值时回显用 |
| pattern | `string` | 当前过滤输入（filterable）；空菜单提示可用它回显「无匹配」 |
| activeIndex | `number` | 键盘高亮项在 menuOptions 中的下标（-1 = 无）；自绘行高亮建议直接消费 optionAttrs 的 `data-active` |
| flipped | `boolean` | 弹层是否上翻（下方溢出视口）；自绘展开动画方向可据此镜像 |
| selectedValues | `(string \| number)[]` | 已选值数组（单选也包成数组）；回显与勾选判断统一用它 |
| selectedOption | `KSelectOption \| null` | 首个已选值对应的候选对象（多选时取第一项） |
| hasValue | `boolean` | 是否有选中值；区分占位与回显 |
| showClear | `boolean` | 清除钮是否应渲染（allowClear + 有值 + 非禁用 + **弹层关闭时**）；悬浮显隐由自绘自管 |
| menuOptions | `KSelectOption[]` | 过滤 + hideSelected 后的扁平候选清单（`v-for` 数据源；分组结构见 renderGroups） |
| renderGroups | `{ label: string \| null; children: KSelectOption[] }[]` | 分组视图：`label=null` 为散选项组；组内已过滤，空组已剔除 |
| activeOption | `KSelectOption \| null` | 当前键盘高亮项对象 |
| visibleTagCount | `number` | maxTagCount 收敛后应渲染的标签数；responsive 档依赖默认标签结构测量，自绘多选建议数字档或自行测量 |
| hiddenValues | `(string \| number)[]` | 被折叠的剩余值（+N 的内容） |
| showOverflowProbe | `boolean` | responsive 档是否渲染隐藏测量探针；自绘不测量可忽略 |
| overflowTip | `VNode` | +N 悬停提示的现成 VNode（KTooltip 列剩余项），自绘可直接嵌入 |
| optionOf(v) | `(v: string \| number) => KSelectOption \| null` | 按值查候选对象（含已被过滤掉的项与 tag 创建项） |
| labelOf(v) | `(v: string \| number) => string` | 按值取回显文案（查不到回退 `String(v)`） |

#### ref 与出口

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| rootEl | `Ref<HTMLElement \| null>` | 根节点 ref：focusout 关闭判定的边界；`:ref="ctx.rootEl"` 绑到自绘根 |
| controlEl | `Ref<HTMLElement \| null>` | 触发件 ref：定位锚点（量触发框）、外点判定、非 filterable 时 focus() 落点；**必绑** |
| contentEl | `Ref<HTMLElement \| null>` | 触发器内容区 ref：responsive 标签测量的宽度基准 |
| inputEl | `Ref<HTMLInputElement \| null>` | filterable 输入框 ref：focus()/blur() 落点、多选 pick 后回焦；filterable 自绘必绑 |
| popupEl | `Ref<HTMLElement \| null>` | 弹层节点 ref：定位测量（量高判翻转）与外点判定「弹层内不关」的依据；自绘弹层**必绑** |
| listEl | `Ref<HTMLElement \| null>` | 列表滚动容器 ref：到顶/到底状态与虚拟滚动的测量落点；自绘滚动容器建议绑定 |
| teleportTarget | `HTMLElement \| string` | Teleport 目标：缺省 `'body'`（fixed + 滚动/resize 跟随）；KConfigProvider `popupContainer` 指定时为容器元素（absolute 进容器文档流）。`<Teleport :to="ctx.teleportTarget">` 直接消费 |
| popupStyle | `CSSProperties` | 定位 style 包（position/top/left/visibility 等，已含翻转结果），经 dropAttrs.style 散播；h() 里追加样式用数组 `[ctx.dropAttrs.style, {…}]` 合并，勿后写 style 键整体覆盖 |
| popupWidth | `string` | 触发器实测宽（如 `'218px'`）。「弹层贴触发器宽」是默认视觉语义，由默认模板绑定；headless 可自选绑定或忽略，窄触发器建议给弹层 `min-width` 以免选项裁切 |

#### 绑定包（spread 到自绘节点才继承）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| rootAttrs | `Record<string, unknown>` | 根节点：`data-part="root"` |
| rootOn | `KOnPack` | 根节点：`keydown`（↑↓ 移动高亮 / Enter 选中 / Esc 关闭 / 多选 Backspace 空输入删尾标签 / IME 组合保护）+ `focusout`（焦点离开触发区与弹层即关；relatedTarget=null 交给外点判定，避免多选点选项误关） |
| controlAttrs | `Record<string, unknown>` | 触发件 combobox 语义：`role=combobox`、`aria-expanded`、`aria-haspopup=listbox`、`aria-controls`（展开时指向列表 id）、`aria-activedescendant`（高亮项 id）、`aria-disabled`；非 filterable 另带 `tabindex=0` + `id`，filterable 时 `tabindex=-1`（语义让位输入框） |
| controlOn | `KOnPack` | 触发件：`click` 开合 + `focus`/`blur` 事件转发 |
| inputAttrs | `Record<string, unknown>` | filterable 输入框：combobox 语义全套 + `id` + `aria-autocomplete=list` |
| inputOn | `KOnPack` | 输入框：`input`（写 pattern + search 事件 + 未展开则展开）、`click` 阻止冒泡（不触发开合）、`focus`/`blur` 转发 |
| dropAttrs | `Record<string, unknown>` | 弹层节点：作用域类 + `data-part="list"` + `data-placement`（top/bottom）+ `data-k-theme` + 定位 style。**不含视觉壳类**——背景/圆角/阴影/层级全自绘 |
| listAttrs | `Record<string, unknown>` | 列表：`role=listbox` + `id`（combobox 的 aria-controls 指向它）+ `aria-multiselectable`（多选） |
| listOn | `KOnPack` | 列表：`scroll` 事件转发 + 到顶/到底状态检测（进入边界时抛 `reachTop` / `reachBottom`，虚拟模式下同步窗口与行高实测） |
| optionAttrs(o) | `(o: KSelectOption) => Record<string, unknown>` | 选项行：`id`（aria-activedescendant 指向）+ `role=option` + `data-part=option` + `aria-selected` + `data-active`（键盘高亮标记，滚动跟随也靠它） |
| optionOn(o) | `(o: KSelectOption) => KOnPack` | 选项行：`click` 选中（pick）+ `pointerenter` 移高亮（禁用项跳过） |
| tagRemoveOn(v) | `(v: string \| number) => KOnPack` | 标签移除钮：`mousedown`（preventDefault 保焦点 + stopPropagation + removeValue） |
| clearOn | `KOnPack` | 清除钮：`mousedown`（preventDefault 保焦点 + stopPropagation + onClear） |

#### 动作

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| setOpen(v) | `(v: boolean) => void` | 开/合弹层；禁用守卫、同值幂等；关闭时连带 blur 触发件 + 表单字段 blur 校验 |
| toggleOpen() | `() => void` | 开合翻转（setOpen 的便捷式） |
| pick(o) | `(o: KSelectOption) => void` | 选中一项：单选写值后关弹层；多选切换选中、清 pattern、回焦输入框、保持展开；整件/项禁用跳过；抛 `change` + 表单字段 change 校验 |
| createTag() | `() => void` | tag 模式把当前 pattern（trim 后）创建为选项并选中；已存在同值项则直接 pick（需 filterable + tag） |
| removeValue(v) | `(v: string \| number) => void` | 移除一个值：多选从数组剔除，单选置 null（标签 × / Backspace 共用）；抛 `change` + 字段校验 |
| onClear(e) | `(e: MouseEvent) => void` | 清空全部选中（多选 `[]` / 单选 `null`）；stopPropagation；抛 `change` + 字段校验 |
| onInput(e) | `(e: Event) => void` | 过滤输入处理：读 `target.value` 写 pattern、抛 `search`、未展开则展开；一般经 inputOn 散播即可 |
| focus() | `() => void` | 聚焦触发件（filterable = 输入框，否则触发件） |
| blur() | `() => void` | 失焦同上 |

另有 `slots`（`ReturnType<typeof useSlots>`）：默认渲染的插槽集合（prefix/suffix/label/option/header/footer/empty），自绘时可按需取用，如 `ctx.slots.header?.()`。

最小契约（单选）：

```vue
<KSelect v-model="val" :options="opts">
  <template #render="ctx">
    <span :ref="ctx.rootEl" v-bind="ctx.rootAttrs" v-on="ctx.rootOn">
      <button :ref="ctx.controlEl" v-bind="ctx.controlAttrs" v-on="ctx.controlOn">
        {{ ctx.hasValue ? ctx.labelOf(ctx.selectedValues[0]) : ctx.placeholder }}
      </button>
    </span>
    <Teleport :to="ctx.teleportTarget">
      <div v-if="ctx.open" :ref="ctx.popupEl" v-bind="ctx.dropAttrs" class="my-drop">
        <div v-bind="ctx.listAttrs" v-on="ctx.listOn">
          <button v-for="o in ctx.menuOptions" :key="o.value"
            v-bind="ctx.optionAttrs(o)" v-on="ctx.optionOn(o)">{{ o.label }}</button>
        </div>
      </div>
    </Teleport>
  </template>
</KSelect>
```

注意：headless 无 Transition（展开动画自管）；`maxTagCount="responsive"` 的测量依赖默认标签结构（`.k-select__tag`），自绘多选请用数字档或自行测量；键盘滚动跟随依赖 `optionAttrs` 的 `data-active`；`render` prop 走 `h()` 时事件包需 `onProps(pack)` 转 `onXxx` 键；**render prop 闭包产物在组件子作用域渲染，不带调用方 `<style scoped>` 的 data-v 属性**——该通道的自绘样式须全局（专属前缀命名）或内联，`#render` 插槽通道 scoped 照常生效；`classNames`/`styles` 只作用于默认渲染。

## 规格附录

- 2026-11-17 P2a：`labelInValue`、`fieldNames`、远程搜索（loading/异步 options）留后批；
- 2026-11-17 增强批：filterable/filter/tag/maxTagCount(number+responsive)/hideSelected/分组/七插槽/search+scroll 事件落地；选项行高改判触发器 −4；展开动画改顶→底 scaleY 并补离场；
- 单选选中后 `setOpen(false)` 触发的 blur 会连带一次字段校验（trigger=both 时与 change 双触发等价幂等，无副作用）。
