# KCard 卡片

> 共同约定见 [共同约定](./index.md)。P3 数据展示批。通用内容容器：header（标题 / 附加区）、body、footer 页脚与底部操作栏，可选分段分隔线。

## 何时使用

- 把一组相关信息收进独立容器；
- 需要标题/额外操作/底部操作栏的标准卡片结构。

## 代码演示

<Demo path="card/basic" title="标题 / 封面 / 操作栏 / 加载" :desc="['`title + extra` 头部。', '`#cover` 封面。', '`#actions` 子项自动成为 KButton，等分、悬浮/按下有反馈；`KCardAction` 可传 KButton 的 type / variant / disabled。', '`hoverable` 悬浮反馈。', '`loading` 内容区换成骨架屏、头部保持可见。']" />

<Demo path="card/variants" title="变体 / 尺寸 / 内部卡片" :desc="['`variant` 四档：outlined / borderless / filled / elevated。', '`size` 三档：sm / md / lg，内边距与标题字号同步变化。', '`inner` 用于嵌套：只缩圆角与内边距，外观跟随 `variant`。', '`hoverShadow` 控制悬浮阴影，0.2s 过渡。']" />

<Demo path="card/sections" title="分段：header / body / footer" :desc="['`segmented` 给 header 加底边线、footer 加顶边线。', '`#footer` 放自由页脚内容，位于 `#actions` 之上。', '`#header` 整体替换 title / extra。']" />

<Demo path="card/actions" title="actions 按钮特性" :desc="['`KCardAction` 即 KButton：`type` / `variant` / `disabled` / `aria-label` / `@click` 按 KButton 语义使用。', '第一项默认样式，第二项用 `type=&quot;primary&quot; variant=&quot;text&quot;`。', '页脚按钮动态切换最后一项的禁用状态。']" />

## 实例演示

<Demo path="card/instance-profile" title="用户信息卡" :desc="['`title + extra` 头部。', '`#footer` 放登录时间。']" />

<Demo path="card/instance-stats" title="统计卡" :desc="['`variant=&quot;filled&quot;` + `size=&quot;sm&quot;` 做紧凑统计。', '数值与趋势用普通内容排版。']" />

<Demo path="card/instance-product" title="商品卡" :desc="['`#cover` 商品图 + `extra` 库存标签。', '`hoverShadow` 悬浮浮起，`#actions` 放收藏与加购。']" />

<Demo path="card/instance-article" title="文章卡" :desc="['封面 + `segmented` 分段。', '`#footer` 放作者与阅读时长，`#actions` 放阅读/分享。']" />

<Demo path="card/instance-task" title="任务卡" :desc="['`segmented` 三段结构：任务列表、截止时间、操作。', '`KTag` 展示状态。']" />

<Demo path="card/instance-nested" title="嵌套内部卡片" :desc="['`inner` 只缩圆角与内边距，浅底来自 `variant=&quot;filled&quot;`。', '嵌套卡片可继续使用 header / footer。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `string` | — |
| size | 尺寸档：内边距 16 / 20 / 24px | `'sm' \| 'md' \| 'lg'` | `'md'` |
| variant | 外观变体 | `'outlined' \| 'borderless' \| 'filled' \| 'elevated'` | 由 `bordered` 推导 |
| bordered | 兼容别名：`true` → outlined，`false` → borderless | `boolean` | `true` |
| hoverable | 悬浮反馈：outlined 加深边框，并出现阴影 | `boolean` | `false` |
| hoverShadow | 悬浮时浮起阴影，任意变体可用，0.2s 过渡 | `boolean` | `false` |
| inner | 内部卡片：小圆角、更紧内边距；背景/边框/阴影跟随 `variant` | `boolean` | `false` |
| loading | 内容区显示骨架屏 | `boolean` | `false` |
| segmented | 分段外观：header 底边线、footer 顶边线 | `boolean` | `false` |
| classNames | 部件类名（`root / cover / header / title / extra / body / footer / actions`） | `Partial<Record<Part, string>>` | — |
| styles | 部件内联样式（`root / cover / header / title / extra / body / footer / actions`） | `Partial<Record<Part, CSSProperties>>` | — |

<CommonProps />

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 内容区 |
| header | 整体自定义头部（优先于 title / extra） |
| title | 标题 |
| extra | 右侧附加区 |
| cover | 封面（图片自动裁满宽度） |
| footer | 自由页脚（位于 actions 之上） |
| actions | 底部操作栏：每个子项自动渲染为 KButton（default × quiet），等分并带分隔线；需要按钮属性/样式时用 `KCardAction` |
| render | 自定义渲染作用域插槽（整件替换） |

无事件。

## 注意事项

- `loading` 只替换内容区；需要整卡骨架请直接用 KSkeleton。
- `segmented` 默认关闭，打开后只影响分隔线，不改变内边距；actions 栏始终带顶边线。
- 分隔线与描边使用 `--k-color-border-secondary`，比常规边框更浅。
- `hoverShadow` 只加阴影、不改边框；`hoverable` 在 outlined 下会同时加深边框。
- `header` 与 `body` 的视觉间距等于 body 内边距：header 下边距与 body 上边距不删，只对相邻 body 施加负 margin 抵消 header 下边距，因此 header / body 各自四边仍对称。
- actions 子项由 Card 渲染为 KButton（default × quiet），自带键盘聚焦与 focus-visible；波纹默认关闭，需要时给 `KCardAction` 传 `wave`。
- 子项只放文本/图标，不要再嵌套按钮。
- 需要按钮样式或属性时改用 `KCardAction`，它内部就是 KButton：`type` / `variant` / `disabled` / `@click` / `aria-label` 等按 KButton 语义使用，原生 type 走 `nativeType`。例：`<KCardAction type="primary" variant="text" @click="onEdit">编辑</KCardAction>`。
- actions 子项悬浮显示 `fill-secondary` 底色，按下为 `fill`；disabled 无反馈。
- `inner` 只影响圆角与内边距，背景/边框/阴影完全跟随 `variant`；需要浅底时搭配 `variant="filled"`。
- `inner` 仍可使用 `footer` / `actions`。
- 操作栏子项建议用按钮/链接等可聚焦元素，Card 不额外注入交互语义。