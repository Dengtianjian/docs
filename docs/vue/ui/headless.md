# headless 自定义渲染

> 逻辑留在组件里，视觉整件交给你。K UI 目前有 56 个公开组件支持 headless 双通道；状态机、受控双模、键盘导航、弹层定位、外点关闭、校验联动等逻辑照跑，默认视觉输出（含 Teleport / Transition / 包裹层）被你的自绘节点**整件替换**。P6–P9 新增组件暂只提供默认渲染 + `classNames / styles` + 插槽，覆盖现状见文末。

## 何时使用

- 组件的**交互逻辑合适、外观不合需求**：设计稿要下划线选择器、深色面板、渐变分割线、品牌化开关……不必 fork 组件，也不必用样式覆盖对抗默认结构。
- 需要把组件逻辑接进**自有设计系统**：绑定包散播到自绘节点即继承全部行为，token 链（`data-k-theme` / 作用域类）随包带走。

## 双通道

两条通道收到**同一份 scope**，任选其一：

| 通道 | 写法 | 优先级 |
| --- | --- | --- |
| `#render` 作用域插槽 | `<KSelect #render="ctx">…</KSelect>` | 高（两者同时提供时插槽生效） |
| `render` 闭包 prop | `<KSelect :render="(ctx) => h(…)" />` | 低 |

```vue
<!-- 通道一：#render 插槽（模板自绘） -->
<KDivider dashed>
  <template #render="{ dashed, rootAttrs }">
    <div v-bind="rootAttrs" class="my-bar">dashed = {{ dashed }}</div>
  </template>
</KDivider>

<!-- 通道二：render prop（h() 自绘） -->
<KDivider :render="({ dashed, rootAttrs }) => h('div', { ...rootAttrs, class: 'my-bar' }, `dashed = ${dashed}`)" />
```

## 核心契约：绑定包散播才继承

组件把逻辑拆成三类**绑定包**放进 scope：

- **attrs 包**（`rootAttrs` / `controlAttrs` / `dropAttrs` / `optionAttrs(o)` …）：语义角色（role / aria-*）、状态标记（`data-active` / `data-placement` …）、主题链（`data-k-theme` + 作用域类）、定位 style。`v-bind` 散播到自绘节点。
- **on 包**（`rootOn` / `controlOn` / `optionOn(o)` …）：事件监听。模板里 `v-on="pack"` 直接散播；**`h()` 里须 `onProps(pack)` 转成 `onXxx` 键**（入口有导出）：

```ts
import { onProps } from 'kit/vue/ui'

h('button', { ...ctx.controlAttrs, ...onProps(ctx.controlOn) }, '…')
```

- **ref 出口**（`rootEl` / `controlEl` / `popupEl` / `inputEl` …）：定位锚点、外点判定、尺寸测量的 DOM 引用，`:ref`（h() 里 `ref:`）绑定到对应自绘节点。**不绑 ref = 定位/外点/测量失效**。

包是**纯逻辑**的：不含视觉壳类（背景/阴影/圆角/内边距）与视觉语义（如「弹层贴触发器宽」）——那些归默认模板或你的自绘。散播哪些包、画什么结构，完全由你决定；漏散某个包只丢失对应逻辑，不会报错。

## scope 的四组字段

各组件 scope 类型入口统一导出（`KSelectRenderScope` / `KModalRenderScope` …，见[覆盖表](#覆盖表)），字段按四组组织：

| 组 | 内容 | 例 |
| --- | --- | --- |
| 状态 | 当前形态与派生状态（只读快照） | `open / disabled / checked / flipped / pattern / activeIndex` |
| ref 与出口 | DOM 引用 + Teleport 目标 + 定位 style | `rootEl / popupEl / teleportTarget / popupStyle` |
| 绑定包 | attrs / on 包（见上节） | `controlAttrs / controlOn / optionAttrs(o)` |
| 动作 | 改状态的函数（受控双模照跑：自管时内部改，受控时抛 `update:*`） | `setOpen / pick / toggle / onClear / focus` |

另有 `slots`（插槽对象，自绘时自行取用默认插槽内容等）。各组件字段明细见其文档页「自定义渲染（headless）」节。

## 样式注意（render prop 通道）

**render prop 闭包的产物在组件子作用域渲染，不带调用方 `<style scoped>` 的 data-v 属性**——scoped 选择器匹配不上自绘节点。该通道的样式必须：

- 全局样式（专属前缀命名防泄漏，如 `.my-select__drop`），或
- 内联 style。

`#render` 插槽通道在调用方作用域编译，scoped 照常生效。

## 限制与约定

- **无 Transition**：headless 分支不渲染默认进出场动画，展开/收合动画自管（状态里有 `open` / `visible` 可驱动自有过渡）。
- **`classNames` / `styles` 只作用于默认渲染**，headless 分支不消费。
- **弹层件**（Select / Tooltip / Popover / Popconfirm / Modal）：Teleport 目标、定位 style、翻转标记都在 scope 里，自绘弹层记得绑 `popupEl` ref 与定位包；`popupContainer` 契约（body=fixed / 指定容器=absolute）对 headless 同样生效。
- **KSelect 特例**：`maxTagCount="responsive"` 的两遍测量依赖默认标签结构（`.k-select__tag`），自绘多选请用数字档或自行测量；`popupWidth`（触发器实测宽）是独立字段，「弹层贴触发器宽」属默认视觉语义，自绘可自选绑定或忽略（窄触发器建议给弹层 `min-width`）。
- **KForm / KFormItem**：校验联动、`aria` 描述链随绑定包继承；自绘控件仍走 FormItem 的注入上下文。

## 最小契约示例（KSelect 单选）

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

开合、键盘导航（↑↓ / Enter / Esc）、点外关闭、定位翻转、禁用项逻辑全部由绑定包继承；`.my-drop` 的背景/阴影/层级自绘。

## 覆盖表

当前 **56 个公开组件**支持 headless 双通道（`render` prop + `#render` 插槽）。以下按批次列出已支持项；未支持项按原因分组见本节末尾。App / ConfigProvider 为逻辑提供者，Message 的**实例 API** 为服务驱动，无 headless 契约（声明式卡片 `KNotification` 本身支持）。

### 已支持（核心表）

| 组件 | scope 类型 | 关键绑定包 / 动作 |
| --- | --- | --- |

| 组件 | scope 类型 | 关键绑定包 / 动作 |
| --- | --- | --- |
| KButton | `KButtonRenderScope` | `rootAttrs / rootOn`、`loading / disabled` 状态 |
| KButtonGroup | `KButtonGroupRenderScope` | `rootAttrs`（组语义） |
| KIcon | `KIconRenderScope` | `rootAttrs`（aria 语义）、`spin` 状态 |
| KSpace | `KSpaceRenderScope` | `rootAttrs` + 间距 style（布局逻辑） |
| KFlex | `KFlexRenderScope` | `rootAttrs` + flex style（布局逻辑） |
| KDivider | `KDividerRenderScope` | `rootAttrs`（separator 语义） |
| KRow / KCol | `KRowRenderScope` / `KColRenderScope` | `rootAttrs` + 栅格 style（gutter / span 逻辑） |
| KLayout 五件 | `KLayoutRenderScope` 等 | `rootAttrs` + `hasSider` 等派生状态 |
| KTitle / KText / KParagraph | `KTitleRenderScope` 等 | `rootAttrs`（层级 / 语义标记） |
| KLink | `KLinkRenderScope` | `rootAttrs / rootOn`（href / 禁用拦截） |
| KInput | `KInputRenderScope` | `rootAttrs / inputAttrs / inputOn`、`onClear / focus` |
| KInputNumber | `KInputNumberRenderScope` | 输入包 + `stepUp / stepDown` 步进动作 |
| KSelect | `KSelectRenderScope` | 见 [KSelect](./components/select.md)（最全：菜单 / 标签 / 过滤 / 键盘） |
| KCheckbox / KCheckboxGroup | `KCheckboxRenderScope` / `KCheckboxGroupRenderScope` | `rootAttrs / inputAttrs / inputOn`、`toggle`、组上下文 |
| KRadio / KRadioGroup | `KRadioRenderScope` / `KRadioGroupRenderScope` | 同上（单选语义） |
| KSwitch | `KSwitchRenderScope` | `rootAttrs / rootOn`、`toggle`、loading 拦截 |
| KForm / KFormItem | `KFormRenderScope` / `KFormItemRenderScope` | 校验状态 + `validate / resetFields` 动作 |
| KTooltip | `KTooltipRenderScope` | `triggerAttrs / triggerOn / popupAttrs / popupOn`、`setOpen` |
| KPopover | `KPopoverRenderScope` | 同 Tooltip（title / content 结构自绘） |
| KPopconfirm | `KPopconfirmRenderScope` | 弹层包 + `onConfirm / onCancel`（Promise loading 照跑） |
| KModal | `KModalRenderScope` | 遮罩 / 面板 / 拖拽包 + `requestOpen / requestClose / onAfterLeave`，滚动锁与焦点逻辑继承 |
| KAlert | `KAlertRenderScope` | `rootAttrs`（alert 语义）、`onClose`、banner / 类型状态 |
| KSpin | `KSpinRenderScope` | `rootAttrs / nestedAttrs / indicatorAttrs` + delay 收敛态（包裹模式 inert 逻辑） |
| KNotification（声明式卡片） | `KNotificationRenderScope` | `rootAttrs / rootOn`、`onClose`、type / 进度条状态 |
| KTag | `KTagRenderScope` | `rootAttrs`、`onClose`、type / size 状态 |
| KBadge | `KBadgeRenderScope` | `rootAttrs`、count / status / 可见性派生 |
| KCard | `KCardRenderScope` | `rootAttrs` + title / loading / hoverable 状态 |
| KTable / KPagination / KVirtualList | —（P3 部级契约） | `classNames/styles` 部件 + 插槽；Table 另有列 `render`，无整件替换 |
| KEmpty / KSkeleton | —（P3 部级契约） | `classNames/styles` 部件 + 插槽 |

### 已支持（补充）

| 批次 | 组件 |
| --- | --- |
| P2.5 | KDatePicker、KDateRangePicker、KUpload、KSortable、KPreview |
| P4 | KMenu |
| P5 | KProgress、KResult、KRate、KSlider、KMentions、KAutoComplete、KTimePicker、KCascader、KTreeSelect、KTransfer、KColorPicker |

对应 scope 类型与绑定包字段见各组件文档的「自定义渲染（headless）」节。

### 暂未支持 headless

以下组件目前只提供默认渲染、`classNames / styles` 部件与插槽；不会渲染 `#render` / `render`。需要自定义整件视觉时，请先用部件变量 / 插槽覆盖，或等后续按需求补契约。

| 范围 | 组件 | 说明 |
| --- | --- | --- |
| 逻辑/服务 | KApp、KConfigProvider | 逻辑提供者，无视觉整件替换需求 |
| P2.5 | KImageCropper | 默认渲染 + 部件覆盖 |
| P3 | KTable、KPagination、KVirtualList、KEmpty、KSkeleton、KCardAction | 表格族按部级契约 |
| P4 导航族 | KBreadcrumb、KBreadcrumbItem、KSteps、KStep、KTabs、KTabPane、KDropdown、KAffix、KBackTop、KAnchor、KDrawer、KNavBar、KTabBar | 仅 KMenu 支持 |
| P6 | KAvatar、KAvatarGroup、KCollapse、KCollapseItem、KDescriptions、KDescriptionsItem、KSegmented、KFieldGroup、KList、KListItem、KCellGroup、KCell、KTree、KInputTags | 新增基础件 |
| P7 | KCalendar、KTimeline、KTimelineItem、KStatistic、KImage、KCarousel、KPinInput、KChart、KCommandPalette、KNavigationMenu | 数据与导航 |
| P8 | KContextMenu、KScrollArea、KKbd、KUser、KBanner、KMarquee、KSplitter、KQRCode、KWatermark、KMasonry、KTour、KFloatButton、KBorderBeam、KListbox | 增强件 |
| P9 | KActionSheet、KShareSheet、KPicker、KPickerView、KPullToRefresh、KInfiniteScroll、KSwipeCell、KSwipeAction、KSearchBar、KNoticeBar、KIndexBar、KIndexAnchor、KSideBar、KNumberKeyboard、KPasscodeInput、KPasswordInput、KFloatingBubble、KFloatingPanel、KSubmitBar、KActionBar、KCountDown、KRollingText、KPopup、KCenterPopup、KSafeArea、KSignature | 移动端专项 |

> P10 评估结论：不批量补“伪 headless”。P6–P9 先用默认渲染、`classNames / styles` 与插槽满足业务；确有个别组件需要自有设计系统整件替换时，再按组件补 scope 与绑定包。

入口导出：`KRenderFn` / `KOnPack` / `onProps` + 上表全部 scope 类型（`kit/vue/ui`）。

## 自己写组件

headless 的两种典型用法：消费者把绑定包封装成**自有设计系统组件**；贡献者用基座让**自己的组件支持 headless**。

### 封装自有组件（消费者向）

<Demo path="headless/my-select" title="自有组件 MySelect：下划线选择器" :desc="['一个可复用的自有组件：内部消费 KSelect headless 绑定包，对外只暴露自己的 props（accent 换肤）/ 事件（v-model / change）。', '开合、键盘导航、点外关闭、定位翻转、禁用拦截全部继承，业务侧无需了解 KSelect 的内部实现。']" />

组件核心（完整源码 `examples/headless/_MySelect.vue`，演示「查看代码」是使用侧）：

```vue
<script setup lang="ts">
import KSelect from 'kit/vue/ui/components/Select/Select.vue'

const props = withDefaults(defineProps<{
  modelValue?: string | number | null
  options?: KSelectOption[]
  accent?: string          // 自有 prop：强调色换肤
}>(), { accent: 'var(--k-color-primary)' })
const emit = defineEmits<{ 'update:modelValue': [v: string | number | null] }>()
</script>

<template>
  <KSelect :model-value="props.modelValue" :options="options"
    @update:model-value="(v) => emit('update:modelValue', v)">
    <template #render="ctx">
      <!-- 绑定包原样散播 = 逻辑继承；结构/视觉完全自有 -->
      <span :ref="ctx.rootEl" v-bind="ctx.rootAttrs" v-on="ctx.rootOn"
        class="my-select" :style="{ '--my-accent': accent }">
        <button :ref="ctx.controlEl" v-bind="ctx.controlAttrs" v-on="ctx.controlOn" …>
          {{ ctx.hasValue ? ctx.labelOf(ctx.selectedValues[0]) : ctx.placeholder }}
        </button>
      </span>
      <Teleport :to="ctx.teleportTarget" defer>
        <div v-if="ctx.open" :ref="ctx.popupEl" v-bind="ctx.dropAttrs"
          class="my-select__drop" :style="{ '--my-accent': accent }">…</div>
      </Teleport>
    </template>
  </KSelect>
</template>
```

要点：

- **自有契约**：props / events / 插槽按自家设计系统定义，KSelect 只是内部实现——换底层组件不影响业务调用方。
- **逻辑零自写**：散播哪些包就继承哪些逻辑；ref 出口（`rootEl` / `controlEl` / `popupEl`）必须绑，否则定位/外点失效。
- **CSS 变量不跨 Teleport**：`--my-accent` 写在触发器根上不够，弹层节点须重声明（弹层被传送到 body，不继承根上变量）。
- 受控双模、键盘、过滤等进阶能力同理透传；需要暴露时按 KSelect 的 scope 字段逐件接出。

### 让自己的组件支持 headless（贡献者向）

<Demo path="headless/like-button" title="从零接线：LikeButton 点赞钮" :desc="['用 useCustomRender 基座给自有组件接上双通道。', '默认视觉：心形 + 派生计数 + 点赞动画。', '`#render` 插槽自绘收藏书签。', '`render` prop 自绘纯文本点赞。', '三形态共用同一份逻辑：受控双模 + toggle + aria-pressed + Enter/Space 键盘。']" />

接线核心（完整源码 `examples/headless/_LikeButton.vue`）：

```vue
<script setup lang="ts">
import { useCustomRender, type KOnPack, type KRenderFn } from 'kit/vue/ui/composables/useCustomRender'

export interface KLikeButtonRenderScope {
  liked: boolean; count: number; disabled: boolean
  rootAttrs: Record<string, unknown>; rootOn: KOnPack
  toggle: () => void; slots: ReturnType<typeof useSlots>
}
const props = defineProps<{ modelValue?: boolean; count?: number; render?: KRenderFn<KLikeButtonRenderScope> }>()

// …受控双模（vnode.props 查 'modelValue'）+ toggle 动作…

// 铁律①：默认模板与 scope 共用的包提顶层 computed
const rootAttrs = computed(() => ({ 'data-part': 'root', role: 'button', 'aria-pressed': String(liked.value) }))
const rootOn: KOnPack = { click: () => toggle(), keydown: /* Enter/Space，原生 button 跳过防双触发 */ }

const { renderScope, hasCustomRender, renderPropOutlet } = useCustomRender(
  () => props.render,
  () => ({ liked: liked.value, count: props.count + (liked.value ? 1 : 0), rootAttrs: rootAttrs.value, rootOn, toggle, slots }),
)
</script>

<template>
  <template v-if="hasCustomRender">
    <slot v-if="$slots.render" name="render" v-bind="renderScope" />
    <component v-else :is="renderPropOutlet" />
  </template>
  <button v-else v-bind="rootAttrs" v-on="rootOn" class="hl-like" …>默认视觉</button>
</template>
```

要点：

- **scope 按四组组织**（状态 / ref 与出口 / 绑定包 / 动作），类型从组件导出并进 barrel——调用方才有类型提示。
- **两条铁律**见下节：共用包提顶层、视觉壳类不进包。
- 原生 `<button>` 的 Enter/Space 本就派发 click，键盘包里对 BUTTON/A 目标跳过，否则双触发。
- 逻辑件（弹层定位、滚动锁等）可复用库内 composable（`usePopup` / `useOverlayPosition` 等），不必重造。

## 实现基座（贡献者向）

`composables/useCustomRender.ts`：`useCustomRender(renderGetter, buildScope)` 返回 `renderScope`（computed）/ `hasCustomRender`（`!!slots.render || !!render()`）/ `renderPropOutlet`（纯函数当函数式组件，在自己 render effect 里读 scope 自动追踪）。组件模板头统一：

```vue
<template v-if="hasCustomRender">
  <slot v-if="$slots.render" name="render" v-bind="renderScope" />
  <component v-else :is="renderPropOutlet" />
</template>
<template v-else>…默认视觉…</template>
```

两条铁律（试点批抓出的 bug 教训）：

1. **默认模板与 scope 共用的绑定包必须提顶层 computed/const**——只写在 buildScope 闭包里，默认分支 `v-bind` 引用 undefined。
2. **视觉壳类不进 attrs 包**——壳类（背景/阴影/内边距）归默认模板静态 class，包只带语义 / 状态标记 / token 链 / 定位，否则 headless 自绘被默认视觉污染，全替换契约破口。