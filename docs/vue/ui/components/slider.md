# KSlider 滑动输入

> 共同约定见 [共同约定](./index.md)。表单补充批。单值、范围或多拇指滑动选择，支持刻度、停靠值、前后插槽、垂直方向、提示与键盘操作。

## 何时使用

- 在连续或离散区间中选择数值；
- 需要双端范围筛选（价格、时间区间等）；
- 需要多个可拖动的分界点（价格档位、分割比例等）。

## 代码演示

<Demo path="slider/basic" title="单值 / 范围 / 垂直" :desc="['`marks` 在轨道上渲染刻度与标签。', '`range` 使用双滑块，model 为 `[start, end]`。', '`vertical` 切换纵向布局；`disabled` 整体禁用。']" />

<Demo path="slider/affix" title="前后插槽" :desc="['`prefix` / `suffix` 渲染在轨道两端，纵向时分别位于顶部与底部。', '插槽只负责定位，图标尺寸与文字颜色由业务侧决定。']" />

<Demo path="slider/stops" title="指定停靠值" :desc="['`stops` 限定可取值，拖动与键盘都只会停在最近的停靠点。', '停靠值不改变 `min` / `max` 区间，刻度可用 `marks` 单独标注。']" />

<Demo path="slider/stops-marks" title="刻度与停靠点" :desc="['`marks` 每 10 一个、`stops` 每 20 一个：刻度只是视觉标记，只有 `stops` 参与吸附。', '滑块可以越过非停靠刻度，停靠时跳到最近的 20 的倍数；键盘也按停靠点跳转。', '停靠点上的圆点会盖住同位置的刻度点，经过后圆点放大溢出轨道。']" />

<Demo path="slider/draggable-track" title="可拖拽轨道" :desc="['开启 `draggable-track` 后，拖动填充段可整体平移两端，跨度保持不变，到达两端时整段停住。', '仅两个节点的范围模式生效；与 `addable` 同开时，填充段优先整段拖动，其余空白处才插入节点。']" />

<Demo path="slider/multi" title="多点与动态节点" :desc="['model 传入数组即为多拇指模式，按值升序渲染；拖动越过相邻节点后可互换角色。', '开启 `addable` 后，点击轨道空白处即在该位置插入节点，可继续拖动调整。', '移除节点直接改动数组即可；`disabled-values` 按值锁定滑块，命中的节点不可拖动。']" />

<Demo path="slider/reverse" title="反向与禁用" :desc="['`reverse` 反向排列，方向键也会跟随翻转。', '`disabled` 整体禁用，提示与键盘一并失效。']" />

<Demo path="slider/tooltip" title="提示与格式化" :desc="['`show-tooltip=&quot;always&quot;` 常显提示。', '`tooltip-formatter` 自定义提示文本。', '范围滑块的两个端点会各自约束在另一端点内侧。']" />

## API

### KSlider Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 单值或值数组（范围 / 多拇指） | `number \| number[]` | `0` |
| min / max / step | 区间与步长 | `number` | `0 / 100 / 1` |
| range | 双滑块模式（等价于数组 model 恰好两个值） | `boolean` | `false` |
| vertical | 纵向 | `boolean` | `false` |
| reverse | 反向，方向键同步翻转 | `boolean` | `false` |
| disabled / readonly | 整体禁用 / 只读 | `boolean` | `false` |
| disabledValues | 值命中列表的滑块不可拖动 | `number[]` | `[]` |
| stops | 限制只能停在指定数值，拖动吸附最近停靠点 | `number[]` | `[]` |
| addable | 点击轨道插入节点，仅数组 model 生效 | `boolean` | `false` |
| draggableTrack | 双拇指时拖动填充段整体平移，跨度不变 | `boolean` | `false` |
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
| prefix | 轨道前插槽，纵向时为顶部 |
| suffix | 轨道后插槽，纵向时为底部 |
| render | headless 整件替换，scope 含绑定包与 `setValue` |

## 注意事项

- 每个滑块是独立的 `role="slider"`，支持 ←/→/↑/↓、PageUp/PageDown、Home、End；`Shift` 加速 10 步；设置 `stops` 后按停靠点跳转。
- 数组 model 始终是升序数组；拖动允许越过相邻节点，交叉后按值重排、两个节点互换角色（与 antd 一致），被拖的那个继续跟随指针。
- `disabledValues` 按值匹配，滑块移动离开该值后即恢复可拖动；多节点增删直接修改数组即可。
- 多个滑块叠到同一个锁定值时只锁其中一个，其余保持可拖动且层级更高，从重叠处按下拖走的总是可拖动的那一个。
- `addable` 只在数组 model 下插入节点；点击位置与已有节点重合时不会重复添加，改为拖动该节点。
- `marks` 与 `stops` 相互独立：`marks` 只画刻度，`stops` 才限制停靠；刻度可以比停靠点更密。
- 每个停靠点会自动渲染一个圆点，与轨道同高；进度到达或超过该停靠点后，圆点放大到溢出轨道并带一圈同色外边框。层级高于刻度点，与 `marks` 位置重合时盖住刻度点。
- `draggableTrack` 只对恰好两个节点生效，平移按 `step`（有 `stops` 时按停靠点）吸附，拖到边界时整段停住。
- 刻度标签在窄容器中可能重叠，必要时通过 `styles.mark` 或容器宽度控制。