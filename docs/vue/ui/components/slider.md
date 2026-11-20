# KSlider 滑动输入

> 共同约定见 [共同约定](./index.md)。表单补充批。单值/范围滑动选择，支持刻度、垂直方向、提示与键盘操作。

## 何时使用

- 在连续或离散区间中选择数值；
- 需要双端范围筛选（价格、时间区间等）。

## 代码演示

<Demo path="slider/basic" title="单值 / 范围 / 垂直" :desc="['`marks` 在轨道上渲染刻度与标签。', '`range` 使用双滑块，model 为 `[start, end]`。', '`vertical` 切换纵向布局；`disabled` 整体禁用。']" />

<Demo path="slider/tooltip" title="提示与格式化" :desc="['`show-tooltip=&quot;always&quot;` 常显提示。', '`tooltip-formatter` 自定义提示文本。', '范围滑块的两个端点会各自约束在另一端点内侧。']" />

## API

### KSlider Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 单值或范围值 | `number \| [number, number]` | `0` |
| min / max / step | 区间与步长 | `number` | `0 / 100 / 1` |
| range | 双滑块模式 | `boolean` | `false` |
| vertical | 纵向 | `boolean` | `false` |
| reverse | 反向 | `boolean` | `false` |
| disabled / readonly | 禁用 / 只读 | `boolean` | `false` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| status | 校验态 | `'error' \| 'warning'` | FormItem 兜底 |
| marks | 刻度，key 为数值 | `Record<number, string \| { label?; style? }>` | — |
| showTooltip | 提示显示策略 | `boolean \| 'always' \| 'hover'` | `'hover'` |
| tooltipFormatter | 提示文本格式化 | `(value: number) => string` | — |
| ariaLabel | 无障碍名称 | `string` | `'滑块'` |
| render | 自定义渲染闭包 | `KRenderFn<KSliderRenderScope>` | — |
| classNames / styles | 部件类名 / 样式 | `Partial<Record<Part, …>>` | — |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| change | 拖动结束或键盘调整后的值 | `value: KSliderValue` |
| dragStart | 开始拖动 | `value` |
| dragEnd | 拖动结束 | `value` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| render | headless 整件替换，scope 含绑定包与 `setValue` |

## 注意事项

- 每个滑块是独立的 `role="slider"`，支持 ←/→/↑/↓、PageUp/PageDown、Home、End；`Shift` 加速 10 步。
- 范围模式会阻止两端交叉：起点不能超过终点，终点不能低于起点。
- 刻度标签在窄容器中可能重叠，必要时通过 `styles.mark` 或容器宽度控制。