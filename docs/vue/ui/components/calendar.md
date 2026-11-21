# KCalendar 日历

> 共同约定见 [共同约定](./index.md)。P7 数据与导航。日期 / 月份视图、标记、范围限制与键盘导航。

## 何时使用

- 面板式日期选择、排期与工作日展示；
- 需要标记节点、限制可选范围；
- 需要纯键盘完成月份切换与日期选择。

## 代码演示

<Demo path="calendar/basic" title="日期视图与标记" :desc="['`v-model` 输出 `YYYY-MM-DD`，可传字符串或 Date。', '`markers` 在日期底部渲染圆点，`color` 可自定义。', '今天、选中、禁用与相邻月有独立状态。']" />

<Demo path="calendar/month" title="月份视图" :desc="['`type=&quot;month&quot;` 输出 `YYYY-MM`。', '上下键切换月份，PageUp / PageDown 切换年份。', '`format` 可覆盖输出格式。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 视图类型 | `'date' \| 'month'` | `'date'` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| min / max | 可选范围 | `string \| Date \| null` | — |
| disabled | 禁用整个日历 | `boolean` | `false` |
| showToday | 显示今天按钮 | `boolean` | `true` |
| disabledDate | 自定义禁用日期 | `(date: Date) => boolean` | — |
| markers | 日期标记 | `KCalendarMarker[]` | `[]` |
| format | 输出格式 | `string` | 日期 `YYYY-MM-DD` / 月份 `YYYY-MM` |
| ariaLabel | 无障碍名称 | `string` | `'日历'` |
| classNames / styles | 部件：`root / header / nav / title / weekdays / grid / cell / marker / footer` | — | — |

### KCalendarMarker

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| date | 标记日期 | `string \| Date \| null` |
| color | 圆点颜色 | `string` |
| label | 标记文案（透传作用域） | `string` |

### v-model

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| modelValue | 选中值 | `string \| Date \| null` |

### Slots

| 插槽名 | 说明 | 作用域 |
| --- | --- | --- |
| title | 自定义标题 | `{ date, title }` |
| footer | 自定义底栏 | `{ view, select }` |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| change | 选择变化 | `value, Date` |
| panelChange | 面板翻页 | `Date` |

### 键盘

`← / → / ↑ / ↓` 移动，`Home / End` 行首行尾，`PageUp / PageDown` 上一月/下一月（月份视图为年），`Enter / Space` 选择。周起点固定为周一。