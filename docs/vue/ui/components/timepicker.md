# KTimePicker 时间选择

> 共同约定见 [共同约定](./index.md)。表单补充批。时间面板选择，支持单值与范围、步进与禁用项。

## 何时使用

- 预约、排班、营业时间等时间录入；
- 需要起止时间范围，但不需要日期。

## 代码演示

<Demo path="timepicker/basic" title="单值 / 范围 / 禁用" :desc="['默认格式 `HH:mm:ss`；`format=&quot;HH:mm&quot;` 隐藏秒列。', '`range` 打开双面板，分别选择开始与结束。', '`disabled-hours` 等支持数组或函数。']" />

<Demo path="timepicker/step" title="步进与精度" :desc="['`hour-step / minute-step / second-step` 控制列选项间隔。', '范围面板通过点击左侧/右侧切换当前编辑面板。', '`allow-clear=false` 隐藏清除入口。']" />

<Demo path="timepicker/variants" title="外观变体" :desc="['`variant` 四档：outlined 带框 / filled 灰底无框 / borderless 全透明 / underlined 仅底部边框（hover / 聚焦只变底线颜色，不出聚焦圈）。']" />

## API

### KTimePicker Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 单值 `string` 或范围 `[string, string]` | `string \| [string, string] \| null` | `null` |
| format | 显示格式，含秒则显示秒列 | `string` | `'HH:mm:ss'` |
| range | 范围模式 | `boolean` | `false` |
| hourStep / minuteStep / secondStep | 列步进 | `number` | `1` |
| disabledHours / disabledMinutes / disabledSeconds | 禁用项 | `number[] \| (value) => boolean` | — |
| allowClear | 允许清除 | `boolean` | `true` |
| placeholder | 占位文本，可为 `[开始, 结束]` | `string \| [string, string]` | `'请选择时间'` |
| rangeSeparator | 范围显示分隔符 | `string` | `' ~ '` |
| disabled / readonly | 禁用 / 只读 | `boolean` | `false` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| status | 校验态 | `'error' \| 'warning'` | FormItem 兜底 |
| variant | 外观 | `'outlined' \| 'filled' \| 'borderless' \| 'underlined'` | 跟随 KForm（缺省 `'outlined'`） |
| render | 自定义渲染闭包 | `KRenderFn<KTimePickerRenderScope>` | — |
| classNames / styles | 部件类名 / 样式 | `Partial<Record<Part, …>>` | — |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| change | 确认或清除 | `value: KTimePickerValue` |
| openChange | 面板开合 | `open: boolean` |
| focus / blur | 焦点事件 | `FocusEvent` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| suffix | 触发器后缀 |
| render | headless 整件替换 |

## 注意事项

- 选择过程先写入草稿，点击“确定”才回写 model；清除会写入 `null`。
- “此刻”按钮填充当前编辑面板；范围模式可分别设置开始/结束。
- 触发器只读，避免自由文本与格式解析冲突。