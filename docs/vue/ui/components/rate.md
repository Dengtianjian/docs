# KRate 评分

> 共同约定见 [共同约定](./index.md)。表单补充批。评分控件：支持半星、清除、自定义字符、提示文案与键盘操作。

## 何时使用

- 满意度、商品评价等星级评分；
- 只需要轻量的数值打分，不希望引入滑块或输入框。

## 代码演示

<Demo path="rate/basic" title="基础 / 半星 / 只读" :desc="['`v-model` 绑定数值，`show-text` 显示右侧文案。', '`allow-half` 开启半星；根节点用方向键调整。', '`disabled` 只读展示，不响应鼠标与键盘。']" />

<Demo path="rate/sizes" title="四档尺寸" :desc="['`size` 支持 xs（16px）/ sm（20px）/ md（24px）/ lg（32px），星形、间距与右侧文案同步缩放。']" />

<Demo path="rate/custom" title="自定义字符与提示" :desc="['`character` 替换默认星形。', '`tooltips` 为每一项提供悬停提示（复用 KTooltip，可跟随暗色）。', '`allow-clear` 点击当前分值可清零。']" />

<Demo path="rate/animate" title="首次渲染动画" :desc="['`animate` 开启后只在首次渲染时从 0 递增到当前分值（600ms），后续改值不重复播放。', '右侧开关控制是否动画，「重新播放」通过重建组件触发；减少动效偏好下直接落位。']" />

## API

### KRate Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 当前分值 | `number` | `0` |
| count | 总星数 | `number` | `5` |
| allowHalf | 允许半星 | `boolean` | `false` |
| allowClear | 点击当前分值清零 | `boolean` | `true` |
| disabled | 禁用 | `boolean` | `false` |
| readonly | 只读（外观不变） | `boolean` | `false` |
| size | 尺寸 | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` |
| status | 校验态 | `'error' \| 'warning'` | FormItem 兜底 |
| character | 自定义字符 | `string` | 星形 |
| color / voidColor | 选中 / 未选中颜色 | `string` | token |
| tooltips | 单项提示（KTooltip，内容为空时不弹） | `string[]` | — |
| animate | 首次渲染从 0 递增到当前分值（仅一次，尊重减少动效偏好） | `boolean` | `false` |
| showText / text | 显示右侧文案 / 自定义文案 | `boolean` / `string` | `false` / — |
| render | 自定义渲染闭包 | `KRenderFn<KRateRenderScope>` | — |
| classNames / styles | 部件类名 / 样式 | `Partial<Record<Part, …>>` | — |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| change | 分值变化 | `value: number` |
| hoverChange | 悬停预览值变化 | `value: number` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| character | 自定义字符，scope `{ index, active, half }` |
| text | 自定义右侧文案，scope `{ value }` |
| render | headless 整件替换 |

## 注意事项

- 根节点是 `role="slider"`，支持 ←/→/↑/↓、Home、End；`allow-half` 时步长为 0.5。
- 鼠标移动到星级左半区可预览半星；点击当前分值会按 `allowClear` 清零。
- 在 `KFormItem` 内会自动读取校验态并触发字段校验。