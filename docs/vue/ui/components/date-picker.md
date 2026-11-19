# KDatePicker 日期选择

> 共同约定见 [共同约定](./index.md)。P2.5 首个新组件；日期引擎使用 dayjs，值统一为 `number | null` 的毫秒时间戳。

## 何时使用

- 选择日期、周、月份、季度或年份。
- 需要最小/最大范围、按日期禁用、表单校验、主题作用域弹层或 headless 自定义渲染时使用。

## 代码演示

<Demo path="date-picker/time" title="日期 + 时间" desc="`showTime` 点日期只落草稿并保持面板，底部选时/分/秒后点「确定」提交；默认格式 `YYYY-MM-DD HH:mm:ss`，`disabledTime` 可按日期给出时分秒黑名单。" />

<Demo path="date-picker/basic" title="基础使用" desc="值为毫秒时间戳；clearable、disabled、size、variant、status 均可组合使用。" />

<Demo path="date-picker/pickers" title="五种 picker" desc="首批支持 date、week、month、quarter、year 单选；每种模式的 v-model 仍是周期起点时间戳。" />

<Demo path="date-picker/limit" title="范围与禁用" desc="min/max 按 picker 粒度比较；disabledDate 接收当前面板粒度的周期起点；format 只改变回显。" />

<Demo path="date-picker/form" title="KForm 联动" desc="KFormItem 通过注入下发 error/warning 状态，并在 change/blur 时触发字段校验。" />

<Demo path="date-picker/popup-container" title="弹层容器" desc="通过 KConfigProvider 的 popupContainer 指定出口；HTMLElement 容器使用 absolute，随容器滚动并受其裁切。" />

<Demo path="date-picker/inline" title="内联面板" desc="inline 常驻渲染面板（无触发器与弹层）；点击、方向键、Enter、今天/清除照常工作，面板焦点环落在整块上。" />

<Demo path="date-picker/render" title="自定义渲染（headless）" desc="#render 整件替换触发器、面板和单元格；开合、下钻、键盘、点外关闭、定位和禁用逻辑由绑定包继承。" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 周期起点的毫秒时间戳；未选择为 `null` | `number \| null` | `null` |
| picker | 选择粒度 | `'date' \| 'week' \| 'month' \| 'quarter' \| 'year'` | `'date'` |
| size | 触发器尺寸 | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` |
| variant | 触发器样式 | `'outlined' \| 'filled' \| 'borderless'` | `'outlined'` |
| status | 语义校验态；KFormItem 下发值时，prop 优先 | `'error' \| 'warning'` | — |
| placeholder | 未选择时的提示 | `string` | 随 picker 变化 |
| disabled | 是否禁用 | `boolean` | `false` |
| clearable | 是否显示清除按钮 | `boolean` | `false` |
| inline | 面板内联常驻（无触发器与弹层；`open`/`close` 为空操作） | `boolean` | `false` |
| showTime | 选择时分秒；点日期不自动提交，需点「确定」 | `boolean` | `false` |
| disabledTime | 当前草稿日期的时分秒黑名单 | `(date: Dayjs) => { disabledHours?, disabledMinutes?, disabledSeconds? }` | — |
| format | dayjs 回显格式；不改变 v-model 值 | `string` | 随 picker 变化 |
| min | 可选下限，按 picker 粒度比较 | `number \| string` | — |
| max | 可选上限，按 picker 粒度比较 | `number \| string` | — |
| disabledDate | 禁用当前面板单元格 | `(date: Dayjs) => boolean` | — |
| id | 原生 input id | `string` | — |
<CommonProps />

`disabledDate` 的入参是当前面板粒度的周期起点：日期层逐日、月份层逐月或逐季、年份层逐年。`min`/`max` 同样按当前 `picker` 粒度比较。

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | v-model 更新 | `value: number \| null` |
| change | 选中或清除后的值 | `value: number \| null` |
| focus | 触发器获得焦点 | `event: FocusEvent` |
| blur | 触发器失去焦点 | `event: FocusEvent` |
| panelChange | 面板视图或层级改变 | `view: number, level: 'date' \| 'month' \| 'year'` |
| clear | 清除值 | — |

### Slots

| 插槽 | 说明 | 参数 |
| --- | --- | --- |
| suffix | 追加到默认日历图标前的后缀内容 | — |
| extraFooter | 追加到内置“今天 / 清除”行之后 | — |

### Expose

| 方法 / 属性 | 说明 |
| --- | --- |
| `focus()` | 聚焦只读触发器 |
| `blur()` | 让触发器失焦 |
| `open()` | 打开面板 |
| `close()` | 关闭面板 |
| `triggerEl` | 触发器 input 的 ref |

### 部件变量

| 部件 | 变量 |
| --- | --- |
| 触发器 | `--k-datepicker-height`、`--k-datepicker-padding-x`、`--k-datepicker-radius`、`--k-datepicker-bg`、`--k-datepicker-border-color`、`--k-datepicker-border-width`、`--k-datepicker-text-color`、`--k-datepicker-placeholder-color`、`--k-datepicker-icon-color`、`--k-datepicker-clear-color`、`--k-datepicker-clear-color-hover`、`--k-datepicker-hover-border-color`、`--k-datepicker-focus-border-color`、`--k-datepicker-outline`、`--k-datepicker-outline-width` |
| 面板 | `--k-datepicker-panel-width`、`--k-datepicker-cell-h`、`--k-datepicker-cols` |

## 注意事项

- v-model 值是周期起点：date 为当日 0 点，week 为周一 0 点，month/quarter/year 为对应周期首日 0 点。
- dayjs 使用 `zh-cn` locale，周起点为周一；week 回显使用 `weekYear()`，避免跨年周显示错误年份。
- 第一批触发器为只读展示，不解析用户手动输入；键盘支持方向键、Enter、PageUp/PageDown、Esc。
- `clearable` 默认关闭，符合 KInput/KSelect 的显式启用约定；启用后清除按钮在悬浮或聚焦时出现。
- `inline` 模式面板常驻文档流：不渲染只读触发器与 Teleport 弹层；点击格、方向键、Enter、今天/清除、三层面板下钻均照常，`open`/`close` 动作与 Esc 关闭为空操作；外部改值会同步视图。
- 弹层复用 popupContainer 契约：缺省挂到 body 使用 fixed；传入 HTMLElement 或函数返回 HTMLElement 时使用容器内 absolute。
- KFormItem 会自动合并 status，并在日期改变、触发器失焦或关闭时参与字段校验。
- `format` 只影响触发器回显，不影响时间戳的周期语义。

## 自定义渲染（headless）

提供 `#render` 作用域插槽（优先）或 `render` 闭包 prop 任一，**整件视觉输出被替换**（触发器、Teleport、Transition、面板和单元格都自绘）；script 逻辑照跑，**绑定包散播到自绘节点才继承**。通用契约见 [headless 自定义渲染](../headless.md)。scope 为 `KDatePickerRenderScope`（入口导出），四组字段逐项如下。

#### 状态（只读快照）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| open | `boolean` | 面板是否打开（inline 下恒为 false） |
| inline | `boolean` | 是否内联常驻面板 |
| value | `number \| null` | 当前 v-model 毫秒时间戳 |
| picker | `KPickerMode` | 当前选择粒度 |
| format | `string \| undefined` | 自定义回显格式 |
| placeholder | `string` | 解析后的提示文案 |
| disabled | `boolean \| undefined` | 是否禁用 |
| size | `'xs' \| 'sm' \| 'md' \| 'lg'` | 触发器尺寸 |
| variant | `'outlined' \| 'filled' \| 'borderless'` | 触发器样式 |
| status | `'error' \| 'warning' \| undefined` | 合并后的校验态 |
| viewDate | `number` | 当前面板视图时间戳 |
| viewLevel | `'date' \| 'month' \| 'year'` | 当前面板层级 |
| rows | `KDateCell[][]` | 当前面板网格行；日期层 6×7 |
| focusedDate | `number \| null` | 键盘焦点周期起点，和 hover 分离 |
| flipped | `boolean` | 面板是否相对触发器上翻 |
| hasValue | `boolean` | 是否有已选值 |
| displayText | `string` | 触发器回显文本（showTime 打开中显示草稿） |
| showTime / draftDate / canConfirmTime | `boolean` / `number \| null` / `boolean` | 时间模式、草稿时间戳、确定可用性 |
| timePart / updateTimePart | `(unit) => number` / `(unit, value) => void` | 草稿时/分/秒读写 |
| hours / minutes / seconds | `number[]` | 时间下拉候选 |
| disabledTime | `KDatePickerDisabledTime` | 当前草稿日期的禁用时分秒 |
| confirmTime / confirmOn | `() => void` / `KOnPack` | 提交时间模式草稿 |
| showClear | `boolean` | 清除按钮是否应显示 |
| titleText | `string` | 面板标题 |
| weekdays | `string[]` | 周一到周日的文案 |
| todayDisabled | `boolean` | 今天按钮是否禁用 |
| canDrillUp | `boolean` | 标题是否还能回到更高层级 |
| showSuperNav | `boolean` | 是否显示上一年/下一年按钮 |

#### ref 与出口

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| rootEl | `Ref<HTMLElement \| null>` | 根节点；传给 `ref` 后点外关闭区域识别生效 |
| triggerEl | `Ref<HTMLInputElement \| null>` | 触发器节点；定位锚点和 focus/blur 依赖它 |
| popupEl | `Ref<HTMLElement \| null>` | Teleport 后的面板节点；定位测量和点外关闭依赖它 |
| teleportTarget | `HTMLElement \| string` | popupContainer 解析后的出口 |
| popupStyle | `CSSProperties` | fixed/absolute 定位结果；通常由 `dropAttrs.style` 继承 |

#### 绑定包（spread 到自绘节点才继承）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| rootAttrs | `Record<string, unknown>` | 根节点 `data-part="root"` |
| rootOn | `KOnPack` | 根节点 keydown 与 focusout |
| triggerAttrs | `Record<string, unknown>` | 只读 input 的 value、placeholder、combobox ARIA、disabled、id |
| triggerOn | `KOnPack` | 打开、focus、blur 事件 |
| dropAttrs | `Record<string, unknown>` | 面板出口 class、data-part/picker/level/placement、主题类与定位 style |
| superPrevOn | `KOnPack` | 上一年或更高层级的前向导航 |
| prevOn | `KOnPack` | 上一月、上一年或上十年 |
| titleOn | `KOnPack` | 标题下钻/回退 |
| nextOn | `KOnPack` | 下一月、下一年或下十年 |
| superNextOn | `KOnPack` | 下一年或更高层级的后向导航 |
| cellAttrs(cell) | `(cell: KDateCell) => Record<string, unknown>` | gridcell ARIA、today/selected/disabled/outside/focused 状态 |
| cellOn(cell) | `(cell: KDateCell) => KOnPack` | 单元格点击选中或下钻 |
| todayOn | `KOnPack` | 今天按钮；包含保持触发器焦点的 mousedown 语义 |
| clearOn | `KOnPack` | 清除按钮 mousedown 语义；阻止抢焦点并清值 |

#### 动作

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| setOpen | `(value: boolean) => void` | 设置面板开合 |
| toggleOpen | `() => void` | 切换面板开合 |
| navigate | `(dir: 'superPrev' \| 'prev' \| 'next' \| 'superNext') => void` | 按当前面板层级导航 |
| setViewLevel | `(level: 'date' \| 'month' \| 'year') => void` | 切换面板层级 |
| pick | `(cell: KDateCell) => void` | 选中单元格或进入下一层 |
| clear | `() => void` | 清除 v-model |
| goToday | `() => void` | 选择今天并关闭面板 |
| focus | `() => void` | 聚焦触发器 |
| blur | `() => void` | 让触发器失焦 |
| slots | `ReturnType<typeof useSlots>` | 当前组件 slots 访问对象 |

最小契约：

```vue
<KDatePicker v-model="ts">
  <template #render="ctx">
    <span :ref="ctx.rootEl" v-bind="ctx.rootAttrs" v-on="ctx.rootOn">
      <input :ref="ctx.triggerEl" v-bind="ctx.triggerAttrs" v-on="ctx.triggerOn" />
    </span>
    <Teleport :to="ctx.teleportTarget">
      <div v-if="ctx.open" :ref="ctx.popupEl" v-bind="ctx.dropAttrs">
        <button type="button" v-on="ctx.prevOn">‹</button>
        <button type="button" v-on="ctx.titleOn">{{ ctx.titleText }}</button>
        <button type="button" v-on="ctx.nextOn">›</button>
        <div v-for="(row, ri) in ctx.rows" :key="ri">
          <button
            v-for="cell in row"
            :key="cell.ts"
            type="button"
            v-bind="ctx.cellAttrs(cell)"
            v-on="ctx.cellOn(cell)"
            :disabled="cell.disabled"
          >{{ cell.label }}</button>
        </div>
        <button type="button" v-on="ctx.todayOn">今天</button>
      </div>
    </Teleport>
  </template>
</KDatePicker>
```

注意：headless 模式不渲染默认 Transition；自绘面板需要自行决定动画和宽度，但 `popupEl` 仍必须绑定以便定位测量。默认模板的周 picker 会按行高亮，自绘时可根据 `row.some(cell => cell.selected)` 复现；键盘焦点态依赖 `cellAttrs` 的 `data-focused`；`render` prop 经 `h()` 自绘时样式须使用全局选择器或内联样式，`#render` 插槽通道的 scoped 样式可正常生效；`classNames`/`styles` 只作用于默认渲染；使用 `h()` 散播事件包时按通用约定调用 `onProps(pack)`。

## 规格附录

### DOM 部件与状态属性

默认模板的 `data-part` 部件为：`root`、`trigger`、`suffix`、`panel`、`header`、`grid`、`cell`、`footer`。

面板出口还带有：

- `data-picker="date|week|month|quarter|year"`
- `data-level="date|month|year"`
- `data-placement="top|bottom"`
- `data-k-theme`（scheme 非 auto 时存在）

单元格状态属性为 `data-today`、`data-selected`、`data-disabled`、`data-outside`、`data-focused`。

### dayjs 引擎

组件注册 `quarterOfYear`、`weekOfYear`、`weekYear`、`advancedFormat` 插件，并按实例使用 `zh-cn` locale。默认格式为：

| picker | 格式 |
| --- | --- |
| date | `YYYY-MM-DD` |
| week | `weekYear()-wo`，例如 `2026-47周` |
| month | `YYYY-MM` |
| quarter | `YYYY-[Q]Q` |
| year | `YYYY` |
| showTime | `YYYY-MM-DD HH:mm:ss`（可被 `format` 覆盖） |

### 后续登记

- 范围选择已由 [KDateRangePicker](./date-range-picker.md) 独立承接（含 showTime / presets）。
- 单选剩余：`multiple` 多值、时间步进（minuteStep）、文本输入解析、复杂时区策略。
- 单值快捷预设 `ranges` 尚未接入（范围组件已有 `presets`）。
