# KProgress 进度条

> 共同约定见 [共同约定](./index.md)。反馈补充批。进度展示：支持线性、环形、仪表盘与分段四种形态。

## 何时使用

- 展示任务完成比例、上传/下载进度或流程推进状态；
- 需要同时表达成功段与剩余段的复合进度。

## 代码演示

<Demo path="progress/basic" title="线性进度与状态" :desc="['`percent` 低于 0 会被夹取；超过 100 按 100 渲染。', '`status` 支持 active / success / exception / warning；未显式传状态时 100% 自动转成功。', '`successPercent` 在主进度上叠加成功段；末尾示例展示文件名 + 状态文字与进度条组合。']" />

<Demo path="progress/circle" title="环形 / 仪表盘 / 分段" :desc="['`type=&quot;dashboard&quot;` 使用带缺口的弧形。', '`type=&quot;steps&quot;` 按百分比点亮分段。', '`showInfo=false` 隐藏右侧或中心信息。']" />

<Demo path="progress/animated" title="动态与手动进度" :desc="['进度值变化时宽度与弧长按 token 过渡。', '自动播放可暂停 / 重播；−10% / +10% / +25% / 重置 按钮可直接步进或清零。', '新增条形 / 环形 / 仪表盘的 items 动态进度，随 percent 逐段展开。']" />

<Demo path="progress/sizes" title="尺寸" :desc="['`size` 同时控制线性线高与环形直径。', 'xs / sm / md / lg 分别对应 2 / 4 / 8 / 12px 线高与 40 / 96 / 120 / 144px 环径。']" />

<Demo path="progress/track" title="隐藏轨道" :desc="['`showTrack=false` 时线形 / steps / 环形 / 分段环的未填充轨道透明。', '布局尺寸保持不变，只隐藏轨道颜色。']" />

<Demo path="progress/info-position" title="文案位置" :desc="['`infoPosition` 仅作用于线性进度，支持 right / left / inside / top。', 'inside 时轨道按文案自动撑高，白字跟随填充段末端。']" />

<Demo path="progress/gradient" title="渐变进度" :desc="['`strokeColor` 传数组即为渐变：≥2 色均匀分布，单值为单色；线性进度使用横向渐变，环形 / 仪表盘使用 SVG 渐变。', '分段进度按每个点亮分段取整圈渐变；`strokeColor` 优先于 `color`。']" />

<Demo path="progress/trail" title="统一颜色与轨道" :desc="['`color` 同时设置进度与轨道：轨道自动用同色浅调（单色混 18% 轨道底色，多色按 22% → 6% 分布）。', '`strokeColor` 覆盖进度色、`trailColor` 覆盖轨道色；单值为单色，数组为渐变。', '最后：同色系四组渐变 items（条形 / 分段 / 环形 / 分段环）、同心叠环两组（左：每环一组渐变；右：每环四段渐变）、其下的条形与两个环形用 items 四段渐变；末尾一条条形专作 successPercent；另加非同色系四组渐变的条形与环形（不分段、圆角头），并各加一份 itemsStack=end 作对照。']" />

<Demo path="progress/text-slot" title="文字插槽" :desc="['`#content` 插槽可放置任意内容，优先于 `format` 插槽与默认百分比。', '插槽 scope 提供 `percent`，可组合数字、单位与说明文字。']" />

<Demo path="progress/slot" title="插槽组合" :desc="['`#content` 里可以直接组合 KAvatar、KTag 等组件，做出文件上传等复杂信息。', '线性默认右侧信息区宽度自适应，环形中心可做纵向排版。']" />

<Demo path="progress/overflow" title="环形文案溢出" :desc="['环形 / 仪表盘的中心文案始终留在圈内，超出内圆宽度时自动省略。', '开启 `infoTooltip` 后悬停可查看完整文案，气泡与圆环保留 16px 间距。']" />

<Demo path="progress/linecap" title="边缘形状与线宽" :desc="['`strokeLinecap` 控制线形两端与环形端点，支持 round / butt / square。', '默认 round：带缺口的环形，轨道与进度端在缺口处都是圆头。', '线形可用 `strokeWidth` 调整线高，环形则为环宽。']" />

<Demo path="progress/status" title="完成与失败" :desc="['条形进度的成功 / 失败图标为圆形实心，比文案略大，颜色跟随进度条颜色。', '环形保持描边图标，尺寸随 size 档缩放：xs 24 / sm 32 / md 40 / lg 48。']" />

<Demo path="progress/gap" title="缺口位置与角度" :desc="['环形与仪表盘都支持缺口：`gapDegree` 控制角度，`gapPosition` 控制位置。', '未显式设置时环形为 0°，仪表盘 75° 且缺口在底部。']" />

<Demo path="progress/segments" title="分段进度" :desc="['`type=&quot;steps&quot;` 按百分比点亮分段，`stepsGap` 控制分段间距。', '分段厚度沿用尺寸档或 `strokeWidth`。']" />

<Demo path="progress/ring-segments" title="环形分段" :desc="['环形通过 `segments` 分段、`segmentGap` 控制可见间距（度），仅 circle 类型生效。', '点亮段数按 percent × 段数四舍五入，中心文案仍显示百分比。']" />

<Demo path="progress/dual" title="多进度叠层" :desc="['`successPercent` 是单段成功色快捷方式；`items` 传 `{ percent, color }` 数组，按顺序累加为多段（30 / 25 / 20 → 0-30 / 30-55 / 55-75）。', '`color` 单值为单色、数组为该段渐变；分段条形 / 分段环形按段中点落到对应段取色，`color` 缺省用内置色板，超过 percent 的部分自动截断。']" />

<Demo path="progress/group" title="环形进度条组" :desc="['KProgressGroup 把多个环形子项按顺序排成同心环，演示可调 `stroke-width`、`gap` 与轨道显隐。', '子项自带 strokeWidth / showTrack 时优先（按 px），否则继承组的配置；中心内容由 `#content` 插槽接管。']" />

## API

### KProgress Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| percent | 当前进度 | `number` | `0` |
| successPercent | 成功段进度（叠层，超过 percent 时封顶） | `number` | `0` |
| type | 形态 | `'line' \| 'circle' \| 'dashboard' \| 'steps'` | `'line'` |
| status | 状态 | `'normal' \| 'active' \| 'success' \| 'exception' \| 'warning'` | `'normal'` |
| size | 尺寸 | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` |
| showInfo | 显示进度信息 | `boolean` | `true` |
| showTrack | 显示未填充轨道 | `boolean` | `true` |
| infoPosition | 线性进度文案位置 | `'right' \| 'left' \| 'inside' \| 'top'` | `'right'` |
| infoTooltip | 环形 / 仪表盘悬停显示完整文案 | `boolean` | `false` |
| strokeWidth | 线宽 / 环宽（线形同时决定线高） | `number` | 按尺寸 |
| color | 统一颜色：进度条与轨道（轨道自动浅色）；`strokeColor` / `trailColor` 优先 | `string \| string[]` | — |
| strokeColor | 进度色：单值单色，数组为渐变；优先于 color | `string \| string[]` | — |
| strokeLinecap | 边缘形状 | `'butt' \| 'round' \| 'square'` | `'round'` |
| trailColor | 轨道色：单值单色，数组为渐变；优先于 color 派生的轨道 | `string \| string[]` | — |
| items | 多进度叠加：按顺序累加的段，元素 `{ percent, color }`；color 支持 `string \| string[]` | `KProgressItem[]` | — |
| itemsStack | items 叠放方向：`start` 前段压后段 / `end` 后段压前段 | `'start' \| 'end'` | `'start'` |
| steps | 分段数量（steps 类型） | `number` | `5` |
| stepsGap | 分段间距（steps 类型，px） | `number` | `2` |
| segments | 环形分段数（仅 circle，≥2 生效） | `number` | `0` |
| segmentGap | 环形分段可见间距（度） | `number` | `6` |
| gapDegree | 缺口角度（环形 / 仪表盘） | `number` | 仪表盘 `75` / 环形 `0` |
| gapPosition | 缺口位置 | `'top' \| 'right' \| 'bottom' \| 'left'` | 仪表盘 `'bottom'` / 环形 `'top'` |
| format | 自定义信息格式 | `(percent: number) => string` | — |
| ariaLabel | 无障碍名称 | `string` | `'进度'` |
| render | 自定义渲染闭包 | `KRenderFn<KProgressRenderScope>` | — |
| classNames / styles | 部件类名 / 样式 | `Partial<Record<Part, …>>` | — |

部件：`root / track / bar / success / info / circle / steps / step`。

### KProgressGroup（环形进度条组）

同心多环容器：按子项顺序由外到内排布，统一圈宽与间距，中心内容用 `#content` 插槽自定义。

```vue
<KProgressGroup :size="176" :stroke-width="10" :gap="8">
  <template #content>78% / 56%</template>
  <KProgress :percent="78" stroke-color="#0a84ff" />
  <KProgress :percent="56" stroke-color="#30d158" />
</KProgressGroup>
```

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 最外圈直径（px） | `number` | `160` |
| strokeWidth | 单圈线宽（px），子项自带 strokeWidth 时优先 | `number` | `10` |
| gap | 相邻圈间距（px） | `number` | `8` |
| showTrack | 子项是否显示轨道，子项自带 showTrack 时优先 | `boolean` | `true` |

| 插槽名 | 说明 |
| --- | --- |
| default | 环形子项，数量决定环数；顺序由外到内 |
| content | 中心自定义内容，可放组件；组件不注入排版样式 |

子项会被统一为 `type="circle"` 并隐藏自带中心信息，环径由 Group 接管：传入 line / steps 会被直接当作环形绘制，dashboard 的缺口也不会保留，`infoPosition / steps / gapDegree` 等形状相关配置不生效；`percent / strokeColor / segments / status` 等数据能力仍然生效。线宽与轨道显隐优先子项自带的 `strokeWidth` / `showTrack`，未提供时才用组的配置。内环直径按「前一环实际线宽 + gap」递推，`gap` 最小为 0：缩到 0 时环带只相切、不会互相压住。

### Slots

| 插槽名 | 说明 |
| --- | --- |
| content | 自定义进度信息内容，可放任意节点，优先于 format 插槽；scope `{ percent }` |
| format | 自定义进度信息，scope `{ percent }` |
| render | headless 整件替换，scope 见 `KProgressRenderScope` |

### 事件

无事件。

## 注意事项

- 根节点带 `role="progressbar"` 与 `aria-valuenow/min/max`；信息文本只作视觉呈现。
- `active` 的条纹动画在 `prefers-reduced-motion` 下自动关闭。
- 环形的 `strokeWidth` 随 viewBox 缩放，实际像素宽度会随尺寸档变化。
- 环形 / 仪表盘的半径会按 `strokeWidth` 内缩，描边不会超出 SVG 视口被裁切；根节点按内容宽度收缩。
- `warning` 状态保留百分比文案（使用 warning 色），仅 `success` / `exception` 用图标替换文案。
- 状态图标：环形 / 仪表盘为 xs 24 / sm 32 / md 40 / lg 48 的描边图标；条形 / 分段为圆形实心，约 1.15em，略大于文案。颜色跟随进度色（含 `strokeColor`，渐变取起始色）。
- 条形 / 分段的成功、失败图标为圆形实心；环形 / 仪表盘为描边图标。
- `percent` 与 `successPercent` 都按 0–100 夹取；超过 100 按 100 渲染，不再有超额盖片或头部阴影。
- `aria-valuenow` 与视觉进度一致（0–100）。
- `showTrack=false` 只隐藏未填充轨道（线形 / steps / 环形 / 分段环），布局尺寸与交互不变。
- `successPercent` 渲染在主进度之上（成功色）：线形 / 连续环形为叠层，steps 与环形 segments 按比例把前若干段转为成功色。
- 颜色优先级：进度 `strokeColor > color > 状态色 / 主色`；轨道 `trailColor > color 派生浅色 > 默认轨道色`。显式颜色优先于 `status` 色；成功段仍用 success 色，`items` 的显式 `color` 不受影响。
- 单值 = 单色；数组 ≥2 色均匀分布为渐变（线形横向、环形 / 仪表盘对角、分段环按整圈渐变取色）。
- `showTrack=false` 时隐藏轨道与派生 / 自定义轨道色。
- items 叠放方向由 `itemsStack` 控制：默认 `start`（前段压后段），`end` 时后段压前段（条形改左圆头搭接、环形改顺序绘制）。
- items 段随 percent 增长 / 回收都有过渡：前一段按后续定义段预加搭接长度，下一段出现或隐藏都不是瞬跳。
- items 为显式多段：底层进度条隐藏；`successPercent`、`color`、`strokeColor` 不参与 items 着色，`items[].color` 优先（缺省用内置色板）；`trailColor` / `color` 派生仍只作用于轨道；`percent` 负责截断。
- items 段跟随 `strokeLinecap`：默认 `round` 时条形段为圆角、环形段为圆头；`butt` / `square` 按对应端点。
- KProgressGroup 只负责同心布局与几何参数，不改动子项的数据语义；子项统一按 `type="circle"` 绘制（line / steps / dashboard 也会被转成 circle，形状相关配置不生效），中心文案清空后子项也保持无信息态。
- 带缺口的环形默认 `round`，缺口处的轨道与进度端都是圆头；`butt` / `square` 时按对应端点裁切。
- 环形 / 仪表盘中心文案始终限制在圈内并自动省略；`infoTooltip` 气泡与圆环间距 16px，提示内容取 `format` 或默认百分比，不含自定义插槽内容。
- `infoPosition` 只影响 `line`；环形与仪表盘固定居中，分段固定右侧。
- `inside` 文案宽度不超过已填充段，进度过低时会隐藏；适合高进度或大尺寸场景。
- 线形与分段的文案宽度随内容自适应，不再预留固定宽度。
- 环形分段仅对 `circle` 生效：点亮段数 = 四舍五入(percent × 段数)，`successPercent` 命中前若干段为成功色，忽略 `gapDegree`。
- `segmentGap` 表示可见间距，圆 / 方端点会按线宽自动补偿，避免圆头吃掉缝隙。
- 环形设置 `gapDegree` 后同样生效，默认缺口在顶部；仪表盘默认缺口在底部。