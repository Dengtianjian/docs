# KProgress 进度条

> 共同约定见 [共同约定](./index.md)。反馈补充批。进度展示：支持线性、环形、仪表盘与分段四种形态。

## 何时使用

- 展示任务完成比例、上传/下载进度或流程推进状态；
- 需要同时表达成功段与剩余段的复合进度。

## 代码演示

<Demo path="progress/basic" title="线性进度与状态" :desc="['`percent` 超出 0–100 会被夹取。', '`status` 支持 active / success / exception / warning；未显式传状态时 100% 自动转成功。', '`successPercent` 渲染第二段浅色进度。']" />

<Demo path="progress/circle" title="环形 / 仪表盘 / 分段" :desc="['`type=&quot;dashboard&quot;` 使用带缺口的弧形。', '`type=&quot;steps&quot;` 按百分比点亮分段。', '`showInfo=false` 隐藏右侧或中心信息。']" />

## API

### KProgress Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| percent | 当前进度 | `number` | `0` |
| successPercent | 成功段进度 | `number` | `0` |
| type | 形态 | `'line' \| 'circle' \| 'dashboard' \| 'steps'` | `'line'` |
| status | 状态 | `'normal' \| 'active' \| 'success' \| 'exception' \| 'warning'` | `'normal'` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| showInfo | 显示进度信息 | `boolean` | `true` |
| strokeWidth | 线宽 / 环宽 | `number` | 按尺寸 |
| strokeColor | 自定义进度色 | `string` | — |
| trailColor | 轨道色 | `string` | — |
| steps | 分段数量（steps 类型） | `number` | `5` |
| gapDegree | 仪表盘缺口角度 | `number` | `75` |
| format | 自定义信息格式 | `(percent: number) => string` | — |
| ariaLabel | 无障碍名称 | `string` | `'进度'` |
| render | 自定义渲染闭包 | `KRenderFn<KProgressRenderScope>` | — |
| classNames / styles | 部件类名 / 样式 | `Partial<Record<Part, …>>` | — |

部件：`root / track / bar / success / info / circle / steps / step`。

### Slots

| 插槽名 | 说明 |
| --- | --- |
| format | 自定义进度信息，scope `{ percent }` |
| render | headless 整件替换，scope 见 `KProgressRenderScope` |

### 事件

无事件。

## 注意事项

- 根节点带 `role="progressbar"` 与 `aria-valuenow/min/max`；信息文本只作视觉呈现。
- `active` 的条纹动画在 `prefers-reduced-motion` 下自动关闭。
- 环形的 `strokeWidth` 随 viewBox 缩放，实际像素宽度会随尺寸档变化。
- 环形 / 仪表盘的半径会按 `strokeWidth` 内缩，描边不会超出 SVG 视口被裁切；根节点按内容宽度收缩。