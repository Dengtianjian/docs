# KTag 标签

> 共同约定见 [共同约定](./index.md)。P3 数据展示批。短文本标记：状态、分类、可关闭筛选项。`color` 同时接受预设状态与十六进制色值，外观由 `variant` 决定。

## 何时使用

- 用颜色表达状态或分类（成功/警告/错误/主色）；
- 需要用户移除的筛选项、标签集合（`closable`）。

## 代码演示

<Demo path="tag/basic" title="预设状态 / 三档尺寸 / 可关闭" :desc="['`color` 传预设状态，对齐 antd：default / processing / success / warning / error（`primary` 保留为同色别名）。', '`processing` 自动带旋转加载图标。', '三档尺寸：sm / md / lg，左右内边距依次 12 / 16 / 20。', '`round` 胶囊；`closable` 点击 X 触发 `close`（受控移除由业务处理）。']" />

<Demo path="tag/variants" title="外观变体" :desc="['`variant` 决定外观：`filled` 浅底描边（默认）、`outlined` 透明底实线、`dashed` 透明底虚线、`borderless` 无边框浅底、`text` 无底无框。', '每种外观都可叠加任意语义色。', '本演示未设 `clickable`，因此只有展示态；交互反馈见「clickable 交互标签」。']" />

<Demo path="tag/interactive" title="clickable 交互标签" desc="只有 `clickable` 的标签才有交互：光标变手型、悬停出现反馈、按下加深；反馈样式随 variant 变化（含 text 变体）。标签默认禁用文字选择。" />

<Demo path="tag/colors" title="自定义颜色" :desc="['`color` 传 `#rgb` / `#rrggbb` 时自动推导背景、边框、文字三色，并按 `variant` 调整透明度。', '预设状态与十六进制共用同一个 `color`；`spin` 可让任意图标旋转。']" />

<Demo path="tag/icons" title="多图标 / 四向 / 插槽" :desc="['多种图标：勾选、星标、时钟、信息、警告、关闭，搭配不同预设色或十六进制色。', '`iconPosition` 支持 left / right / top / bottom；上下位置时高度自适应并允许换行。', '`#icon` 插槽优先于 `icon` prop；自定义图标可用 `spin` 旋转，`processing` 自动带加载图标。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| color | 预设状态名或十六进制色值 | `KTagColor`（`default / primary / processing / success / warning / error` 或 `#rgb` / `#rrggbb`） | `'default'` |
| variant | 外观 | `'filled' \| 'outlined' \| 'dashed' \| 'borderless' \| 'text'` | `'filled'` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| icon | 图标组件（也可用 `#icon` 插槽）；`processing` 缺省显示加载图标 | `Component` | — |
| spin | 图标旋转；缺省在 `processing` 时开启 | `boolean` | — |
| iconPosition | 图标位置 | `'left' \| 'right' \| 'top' \| 'bottom'` | `'left'` |
| clickable | 开启交互：hover / active 反馈 + 光标手型（不内置选中态） | `boolean` | `false` |
| closable | 显示关闭按钮 | `boolean` | `false` |
| round | 胶囊圆角 | `boolean` | `false` |
| classNames | 部件类名（`root / icon / content / close`） | `Partial<Record<Part, string>>` | — |
| styles | 部件内联样式（`root / icon / content / close`） | `Partial<Record<Part, CSSProperties>>` | — |

<CommonProps />

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 标签内容 |
| icon | 图标内容（优先于 `icon` prop） |
| render | 自定义渲染作用域插槽（整件替换） |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| close | 点击关闭按钮 | `MouseEvent` |

### 部件变量

| 变量 | 说明 |
| --- | --- |
| `--k-tag-height` / `--k-tag-padding-x` | 高度与左右内边距（sm / md / lg = 12 / 16 / 20） |
| `--k-tag-line-height` | 文字行高（默认 1.4，容纳 g / j / p 下伸部） |
| `--k-tag-base-bg` / `--k-tag-base-border` / `--k-tag-base-color` | 语义基准色，`type` 或 `color` 负责声明 |
| `--k-tag-bg` / `--k-tag-border` / `--k-tag-color` | 最终外观色，由 `variant` 从基准色推导 |

## 注意事项

- 关闭按钮带 `aria-label="关闭标签"`；业务侧移除标签后请把焦点落到相邻标签或列表容器。
- `closable` 只发事件，不自行隐藏；受控列表请从数据源删除。
- **外观与语义分离**：`color` 同时承担预设状态与十六进制色值，`variant` 决定外观（filled / outlined / dashed / borderless）；`primary` 保留为 `processing` 的同色别名。
- **自定义颜色**：`color` 传 `#rgb` / `#rrggbb` 时按 `variant` 推导；按 `variant` 推导三色——filled 背景 12% / 边框 30%，outlined 与 dashed 透明底 + 55% 描边，borderless 背景 10% 无边框；文字用原色，浅色模式下自动加深保证对比度。
- **图标四向**：上下位置时根节点改为纵向排列、高度自适应并允许换行；图标节点带 `aria-hidden`，语义由文本承担。
- **旋转**：`processing` 缺省渲染加载图标并旋转；自定义图标可传 `spin`，系统开启「减少动态效果」时不旋转。
- **clickable**：开关交互（hover/active + pointer）；普通标签保持 `default` 光标、无交互反馈。所有标签默认禁用文字选择（`user-select: none`）。
- **交互反馈只对 `clickable` 生效**，具体反馈按 variant 区分：filled / borderless 悬停加深底色、按下再深一档；outlined / dashed 悬停加深描边并铺一层语义浅底；text 默认无底，悬停才出现浅底。未设 `clickable` 的标签是纯展示：无光标变化、无 hover/active 反馈。
- **text 变体**：默认无底无边框，悬停使用语义浅底（`--k-color-N-bg`）、按下更深一档（`-bg-hover`）；`clickable` 只开启交互（hover/active + pointer + 禁选），不提供选中态，需要选中样式时由业务加类或换 `filled`。