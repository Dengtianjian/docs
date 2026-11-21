# KCalendar 日历

> 共同约定见 [共同约定](./index.md)。P7 数据与导航。月历 / 年月选择，支持范围禁用、自定义单元格与完整键盘操作。

## 何时使用

- 需要常驻展示整月安排的页面（日程、排班、日志）；
- 需要一个比日期选择器更重的面板式日期入口。

## 代码演示

<Demo path="calendar/basic" title="基础月历" :desc="['`v-model` 使用毫秒时间戳，与 KDatePicker 保持一致。', '`fullscreen=false` 时去掉外框，适合嵌入卡片。', '今天、选中、非本月日期有独立视觉状态。']" />

<Demo path="calendar/disabled" title="范围与禁用" :desc="['`disabledDate` 入参为 dayjs 日期，返回 true 即禁用。', '`min` / `max` 接受时间戳或可解析字符串。', '`change` 第二个参数标记来源：select / today / keyboard。']" />

<Demo path="calendar/custom" title="自定义单元格与月份视图" :desc="['`#dateCell` 作用域提供 `{ date, cell }`，可叠加日程点。', '`#footer` 放统计或快捷操作。', '`type=\"month\"` 切换为 12 个月选择面板。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 选中日期 / 月首时间戳 | `number \| null` | `null` |
| type | 面板类型 | `'date' \| 'month'` | `'date'` |
| min / max | 可选范围 | `number \| string` | — |
| disabledDate | 禁用判定 | `(date: Dayjs) => boolean` | — |
| firstDayOfWeek | 周起始（0=周日） | `number` | `1` |
| showToday | 显示「今天」 | `boolean` | `true` |
| fullscreen | 大尺寸外框 | `boolean` | `true` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| ariaLabel | 无障碍名称 | `string` | `'日历'` |
| classNames / styles | 部件：`root / header / headerTitle / headerActions / weekdays / grid / cell / content / footer` | — | — |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| dateCell | 日期单元格，作用域 `{ date, cell }` |
| header | 头部，作用域 `{ title, prev, next, today }` |
| footer | 底部 |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 选中变化 | `number \| null` |
| change | 选中变化（带来源） | `(value, { source })` |
| select | 选中日期 | `Dayjs` |
| panelChange | 切换月份 / 年份 | `Dayjs` |

<CommonProps />

## 注意事项

- 方向键移动日期（月份视图为月份），`Home / End` 跳周首尾（月份视图为年初/年末），`PageUp / PageDown` 翻月（月份视图翻年）；移动即选中并派发 `change`。
- 网格使用 `role="grid"` + `gridcell`，日期按钮带完整 `aria-label`；同一时刻只有一格 `tabindex=0`。
- `type="month"` 下 `modelValue` 统一归一化到月首，避免同月不同日造成选中态不一致。
- 禁用态按钮同时设置 `disabled` 与 `aria-disabled` 语义（原生 disabled），键盘会跳过。
- 周起始仅影响展示列顺序；`Home / End` 仍按 dayjs 的周一为周首计算，如需严格一致请保持 `firstDayOfWeek=1`。
