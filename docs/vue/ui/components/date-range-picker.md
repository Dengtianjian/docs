# KDateRangePicker 日期范围选择

> 共同约定见 [共同约定](./index.md)。双面板日期范围选择：起点/终点两个只读输入，共享一个弹层；桌面双月并列，移动端单月切换。支持纯日期、日期+时间、快捷预设与 headless 自绘。

## 何时使用

- 报表、筛选、排期等需要选择一个连续日期区间；
- 单个日期用 [KDatePicker](./date-picker.md)，范围用本组件。

## 代码演示

<Demo path="date-range-picker/basic" title="基础范围选择" desc="`v-model` 为 `[开始时间戳, 结束时间戳]`；先点起点再点终点，第二次点击自动排序并关闭；hover 预览区间。" />

<Demo path="date-range-picker/limits" title="范围限制与禁用" desc="`min` / `max` 限定可选区间；`disabledDate` 按日期禁用（示例禁用周末）。" />

<Demo path="date-range-picker/presets" title="快捷预设" desc="`presets` 为 `{ label, value: [start, end] }[]`；点击左侧预设直接提交并关闭，当前区间匹配时高亮。" />

<Demo path="date-range-picker/time" title="日期 + 时间" desc="`showTime` 开启时分秒：默认起 00:00:00、止 23:59:59；面板底部可分别调整两端时间，点「确定」提交。" />

<Demo path="date-range-picker/render" title="自定义渲染（headless）" desc="`#render` 自绘极简范围选择：触发输入、预设、双月网格全部自绘；开合、起止选择、hover 预览、快捷提交、清空由 scope 绑定包继承。" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 日期区间（毫秒时间戳，起点 ≤ 终点） | `[number, number] \| null` | `null` |
| size | 高度档 | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` |
| variant | 外观 | `'outlined' \| 'filled' \| 'borderless'` | `'outlined'` |
| status | 校验态 | `'error' \| 'warning'` | — |
| disabled | 禁用 | `boolean` | `false` |
| clearable | 显示清除钮（有值且非禁用） | `boolean` | `false` |
| startPlaceholder / endPlaceholder | 起止占位文案 | `string` | `'开始日期'` / `'结束日期'` |
| showTime | 选择时分秒；开启后第二次点日期不自动关闭，需点「确定」提交 | `boolean` | `false` |
| presets | 快捷区间列表（常量时间戳；点击直接提交） | `{ label: string; value: [number, number] }[]` | — |
| format | 展示格式（dayjs format） | `string` | 日期 `'YYYY-MM-DD'`；showTime 时 `'YYYY-MM-DD HH:mm:ss'` |
| min / max | 可选范围下/上限（时间戳或可解析字符串），按天比较 | `number \| string` | — |
| disabledDate | 禁用判定（入参 = 当天 0 点 Dayjs） | `(date: Dayjs) => boolean` | — |
| id | 根 id 前缀（起止输入为 `${id}-start` / `${id}-end`） | `string` | — |

<CommonProps />


### Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| change | 区间提交（第二次点击）或清空 | `[number, number] \| null` |
| clear | 点击清除钮 | — |
| focus / blur | 起止输入聚焦 / 失焦 | `FocusEvent` |

### Expose

| 方法 | 说明 |
| --- | --- |
| `focus()` / `blur()` | 聚焦 / 失焦起点输入 |
| `open()` / `close()` | 打开 / 关闭面板 |
| `clear()` | 清空区间 |

## 自定义渲染（headless）

提供 `#render` 作用域插槽（优先）或 `render` 闭包 prop 任一，整件视觉输出被替换；逻辑照跑，**绑定包散播到自绘节点才继承**。通用契约见 [headless 自定义渲染](../headless.md)。scope = `KDateRangePickerRenderScope`（入口导出）：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| open / value / startText / endText | — | 开合、已提交区间、两端展示文本 |
| draftStart / draftEnd / hoverTs / activeEdge | — | 选择中的草稿与当前编辑端 |
| leftView / rightView / leftTitle / rightTitle / leftRows / rightRows | — | 双月视图与单元格 |
| presets / canCommit / showTime | — | 预设清单、确定可用性、时间态 |
| rootEl / popupEl | `Ref<HTMLElement \| null>` | 自绘根/面板 ref（必须绑定，点外关闭与焦点判定依赖） |
| rootAttrs / rootOn | — | 根 `data-part` 与 keydown/focusout |
| triggerAttrs(edge) / triggerOn(edge) | — | 起止输入语义包与 focus/blur/click |
| panelAttrs / cellAttrs(cell) / cellOn(cell) | — | 弹层、单元格 data-* 状态与 click/mouseenter |
| prevOn / nextOn / clearOn / confirmOn / presetOn(preset) | — | 翻月、清空、确定、预设动作包 |
| timePart / updateTimePart / hours / minutes | — | showTime 自绘时间选择 |
| openAt / close / commit / clear / shiftMonth / applyPreset / pick | — | 命令式动作 |

注意：定位、Teleport、过渡动画与可访问视觉不在包内；自绘需自行定位。`render` prop 走 `h()` 时样式须全局或内联。

## 注意事项

- 键盘：触发器聚焦后 Enter/空格/↓ 打开；方向键按天/周移动焦点（触发器 `aria-activedescendant` 指向当前格），Enter/空格选值，Esc 关闭。格子带 `aria-selected`、`aria-disabled`，今天带 `aria-current="date"`。

- 选择顺序不敏感：第二次点击早于起点时自动交换；同一天可选，形成单日区间。
- 首次点击只落起点，面板保持打开并等待终点；hover 日期实时预览区间底色。
- 移动端（≤767px）只显示当前单月，用标题两侧箭头翻月；点起点/终点输入会把视图定位到对应月份，预设改为横向滚动条。弹层内容变化会重新定位并夹入视口，面板限高 76vh 内部滚动；输入/控件高度沿用 mobile token（44px / 16px）。
- `presets` 只接收常量时间戳（相对日期请在 setup 里用 dayjs 算好）；点击预设立即提交，不进编辑态。
- 目前未接入 `render` headless 通道，按轮次单独补；showTime 的 min/max 仍按天判断，时间调整不做额外越界限制。
- 面板定位、外点关闭、Esc 关闭、方向键移动焦点与 Enter 落值均已接入；键盘焦点留在起止输入上。
