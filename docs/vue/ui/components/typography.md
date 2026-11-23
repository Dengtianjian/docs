# Typography 组（KTitle / KParagraph / KText）

> 共同约定见 [共同约定](./index.md)。文字语义三件套：标题、段落、行内文本。

## 何时使用

- 一切文字渲染走这组组件，**禁止业务直接写色/写字重**——颜色只取文本 α 四级、字重只取 base/strong/heading 三档，全由 token 驱动；
  - 确需自定义色值时用 KText 的 `color`/`gradient` 属性，不要在业务里裸写内联样式；
- 需要复制、单行/多行省略、受控展开收起或 shimmer 流光提示时，直接用 `copyable` / `ellipsis` / `shimmer`，不再手写按钮或 CSS clamp。

## 代码演示

<Demo path="typography/title" title="标题与段落" :desc="['`level` 1~5 直接映射 `h1~h5`。', '字号走 heading 阶（seed fontSize × 固定倍率），改 seed 全档联动。']" />

<Demo path="typography/text-types" title="文本层级" desc="`type` 即层级语义：default/secondary/tertiary/disabled 对应文本不透明度 88/65/45/25% 四级。" />

<Demo path="typography/text-marks" title="行内标记" desc="strong/code/mark/delete/underline 各自映射语义元素（b/code/mark/del/u），可组合嵌套。" />

<Demo path="typography/text-color" title="文字颜色与渐变" :desc="['`color` 收任意 CSS 色值（内联生效，压过 type 层级色）。', '`gradient` 缺省为主色浅→深渐变（hover→active 档），传字符串可自定义色标。']" />

<Demo path="typography/copyable" title="可复制" :desc="['`copyable` 在内容右侧显示复制按钮，复制成功后切换为对勾；点击文字也能复制。', '对象形态可自定义复制文本、提示文案与 onCopy；`#copy` 插槽可替换操作内容。']" />

<Demo path="typography/affix" title="前后缀" :desc="['KText 的 `prefix` / `suffix` 可为字符串，也可用 `#prefix` / `#suffix` 插槽放标签、图标。', '前后缀不参与省略测量与复制内容。']" />

<Demo path="typography/ellipsis" title="省略与展开" :desc="['`ellipsis` 缺省单行；对象 `{ rows }` 控制多行截断。', '`expandable` 显示文字 + 箭头；点击文字也能展开，展开后文字可正常选中。', '`expanded` + `onExpand` 受控；`#expand` 插槽可替换操作内容。']" />

<Demo path="typography/shimmer" title="闪烁文字（shimmer）" desc="`shimmer` 使用 antd v6 同款渐变扫光，提示进行中/思考中状态；系统减弱动态效果时自动关闭。" />

<Demo path="typography/render" title="自定义渲染（headless）" :desc="['Title 派生标签（h3）继承、Text 渐变解析随 rootStyle 继承（background-clip 自绘）、Paragraph 语义继承。', '默认插槽内容经 `ctx.slots.default` 取回。']" />

## API

### KTitle Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| level | 标题层级（渲染对应 `h1~h5`） | `1 \| 2 \| 3 \| 4 \| 5` | 必填 |
| copyable | 可复制 | `boolean \| object` | `false` |
| ellipsis | 省略；对象可设 rows / expandable / expanded | `boolean \| object` | `false` |
| shimmer | 流光扫光（antd shimmer） | `boolean` | `false` |

<CommonProps />

### KParagraph Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| copyable | 可复制 | `boolean \| object` | `false` |
| ellipsis | 省略；对象可设 rows / expandable / expanded | `boolean \| object` | `false` |
| shimmer | 流光扫光（antd shimmer） | `boolean` | `false` |

<CommonProps />

### KText Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 文本层级 | `'default' \| 'secondary' \| 'tertiary' \| 'disabled'` | `'default'` |
| color | 自定义文字颜色（任意 CSS 色值，落内联 style；与 gradient 同传时 gradient 优先） | `string` | — |
| prefix | 前置内容（也可用 `#prefix` 插槽） | `string \| number` | — |
| suffix | 后置内容（也可用 `#suffix` 插槽） | `string \| number` | — |
| gradient | 渐变文字：`true` = token 默认渐变（`--k-color-primary-hover → --k-color-primary-active` 横向）；`string` = 自定义色标（逗号分隔 CSS 色值，或完整 `gradient()`），`background-clip: text` 实现 | `boolean \| string` | `false` |
| strong | 加重（font-weight 500，渲染 `b`） | `boolean` | `false` |
| code | 行内代码（渲染 `code`，等宽字体 + 0.9em + quaternary 底） | `boolean` | `false` |
| mark | 标记底色（渲染 `mark`，warning-bg） | `boolean` | `false` |
| delete | 删除线（渲染 `del`） | `boolean` | `false` |
| underline | 下划线（渲染 `u`） | `boolean` | `false` |
| copyable | 可复制：true 或 `{ text?, trigger?, tooltips?, onCopy? }` | `boolean \| object` | `false` |
| ellipsis | 省略：true = 单行；对象 `{ rows?, expandable?, expanded?, defaultExpanded?, symbol?, onExpand? }` | `boolean \| object` | `false` |
| shimmer | 流光扫光（antd shimmer，减弱动态效果时关闭） | `boolean` | `false` |

语义元素选择优先级：code > mark > delete > underline > strong，全 false = `span`。

### copyable / ellipsis 对象

| 字段 | 说明 |
| --- | --- |
| copyable.text | 复制文本，缺省取内容区 `textContent` |
| copyable.trigger | 触发方式：`'icon'` 仅按钮 / `'text'` 仅点击文字 / `'both'` 两者（默认） |
| copyable.tooltips | `[复制提示, 已复制提示]`；`false` = 不显示 tooltip |
| copyable.onCopy | 复制成功回调 `(text) => void` |
| ellipsis.rows | 行数，缺省 1 |
| ellipsis.expandable | 显示展开/收起操作 |
| ellipsis.expanded | 受控展开态 |
| ellipsis.defaultExpanded | 非受控初始展开态 |
| ellipsis.symbol | 操作文案；函数按当前展开态返回 |
| ellipsis.onExpand | 展开态变化回调 `(expanded) => void` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 三件（KTitle / KParagraph / KText）均为默认插槽放文字内容 |
| prefix / suffix | KText：前后缀内容 |
| copy | 三件：复制按钮内容，scope `{ copied, copy }` |
| expand | 三件：展开按钮内容，scope `{ expanded, toggle }` |
| render | 自定义渲染作用域插槽（三件各自支持），scope 见文末「自定义渲染」节；提供时整件替换 |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| copy | 复制成功（三件均支持） | `text: string` |
| expand | 展开态变化（三件均支持） | `expanded: boolean` |

## 主题定制（相关全局 token）

| 变量 | 说明 |
| --- | --- |
| `--k-font-size-heading-1..5` | 标题字阶（seed fontSize × 倍率派生） |
| `--k-line-height-heading-1..5` | 标题行高（1.25/1.25/1.25/1.35/1.35） |
| `--k-font-weight-heading / strong / base` | 600 / 500 / 400 三档字重 |
| `--k-color-text / -secondary / -tertiary / -quaternary` | 文本 α 四级 |

## 注意事项

- `strong` 只有 500 一档，不提供 600+（中文排版原则）；要标题观感请用 KTitle；
- disabled 的 KText 复用 quaternary 色，本身不禁交互——禁要点按钮/链接。
- `gradient` 用 `background-clip: text` 实现，整块背景（含 code 底色、mark 高亮）都会被裁进字形——渐变与 code/mark 组合时只剩文字上色、无底色。
- `copyable` 依赖 Clipboard API，非安全上下文由 `execCommand` 兜底；默认复制内容区全文，`text` 可覆盖；`trigger` 可切按钮 / 点击文字 / 两者。
- `ellipsis` 需要容器约束宽度；单行省略在受限宽度下才生效。受控展开请同时传 `expanded` 与 `onExpand`（或监听 `expand` 事件）。
- `expandable` 时折叠态点击文字展开；展开后点击文字不再收起，需点箭头，保证内容可正常选中与操作。同时传 `copyable` 时，折叠态点击优先展开，展开后点击不触发复制。
- `shimmer` 使用 antd v6 同款渐变扫光，`prefers-reduced-motion: reduce` 下自动关闭；与 `gradient` 不要同时使用（都占 background 通道）。

## 自定义渲染（headless）

双通道 `#render` 插槽（优先）/ `render` prop，通用契约见 [headless 自定义渲染](../headless.md)。

三件各有 scope（入口导出），均含 `rootAttrs` 与 `slots`（默认插槽内容经 `ctx.slots.default` 取回）。三件均额外提供 `copyable / ellipsis / expanded / shimmer / contentRef / copy() / toggleEllipsis()`；下表只列各件专属字段。

**`KTitleRenderScope`**：

#### 状态（只读快照）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| level | `1 \| 2 \| 3 \| 4 \| 5` | 标题层级（必填 prop）；默认渲染映射 heading 字阶（`--k-font-size-heading-N` / `--k-line-height-heading-N`），自绘按值取字阶 token |
| tag | `string` | 派生标签名 `h1`…`h5`（= `h${level}`）；自绘可 `<component :is="ctx.tag">` 直接消费，保留标题语义 |

#### 绑定包（spread 到自绘节点才继承）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| rootAttrs | `Record<string, unknown>` | 根节点：仅 `data-part="root"`（静态对象，无 style）。**不含任何 class**——`k-title` 的 `margin: 0 0 0.5em`、`--k-color-text` 色、`--k-font-weight-heading` 字重与 `k-title-N` 字阶/行高类全不在包内，视觉自绘；`classNames`/`styles` 只作用于默认渲染 |

另有 `slots`（`ReturnType<typeof useSlots>`）：默认渲染的插槽集合（`default` = 标题文字），自绘时可按需取用，如 `ctx.slots.default?.()`。

**`KTextRenderScope`**：

#### 状态（只读快照）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| type | `TextType` | 文本层级（`TextType` = `'default' \| 'secondary' \| 'tertiary' \| 'disabled'`，缺省 `'default'`）；默认渲染映射文本 α 四级色类（disabled 复用 quaternary 色 + `cursor:not-allowed`，不禁交互），自绘按值取 `--k-color-text*` token |
| strong | `boolean` | 加重标记（scope 内已布尔化 `!!`）；默认渲染 `b` 标签 + `--k-font-weight-strong`（500 一档），自绘按值上字重 |
| code | `boolean` | 行内代码标记；默认渲染 `code` 标签 + 等宽字体 + 0.9em + quaternary 底，视觉自绘 |
| mark | `boolean` | 标记底色；默认渲染 `mark` 标签 + warning-bg 底，视觉自绘 |
| delete | `boolean` | 删除线标记；默认渲染 `del` 标签（浏览器原生删除线） |
| underline | `boolean` | 下划线标记；默认渲染 `u` 标签（浏览器原生下划线） |
| gradient | `boolean \| string` | 渐变文字原始 prop 值（缺省 `false`）：`true` = token 默认渐变（`--k-color-primary-hover → --k-color-primary-active` 横向，**由默认渲染的类名提供，不在 rootStyle 里**，自绘需自带渐变声明）；字符串 = 自定义色标，解析结果已进 rootStyle 的 `backgroundImage`。`background-clip:text` / 文字透明等裁切视觉一律自绘 |
| prefix / suffix | `string \| number \| undefined` | 前后缀原始值；默认渲染在内容两侧，不参与省略测量与复制内容 |
| tag | `string` | 派生语义标签：优先级 code > mark > del（delete）> u（underline）> b（strong），全 false = `span`；自绘可 `:is` 直接消费保留语义 |

#### ref 与出口

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| rootStyle | `CSSProperties` | color/gradient 解析后的**逻辑 style**（非 ref，纯值）：传了 `color` 且未开 gradient → `{ color }` 内联（压过 type 层级色）；gradient 为字符串 → `{ backgroundImage }`（含 `gradient(` 原样用，否则包成 `linear-gradient(90deg, …)`）；`gradient=true` 或未传 color/gradient → 空对象。绑到自绘根（可与自绘 style 数组合并）；**不含** `background-clip:text`、`-webkit-text-fill-color:transparent` 等裁切声明与 `styles?.root`（后者只进默认渲染）——渐变要可见须自绘补齐裁切三件 |

#### 绑定包（spread 到自绘节点才继承）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| rootAttrs | `Record<string, unknown>` | 根节点：仅 `data-part="root"`（静态对象，无 style——色彩逻辑在上面的 rootStyle 出口，须另行绑定）。**不含任何 class**——`k-text` 的字号/行高、type 层级色类、`k-text--gradient` 的 token 默认渐变 + clip、code/mark 底色与 b 字重规则全不在包内，视觉自绘；`classNames`/`styles` 只作用于默认渲染 |

另有 `slots`（`ReturnType<typeof useSlots>`）：默认渲染的插槽集合（`default` = 行内文字），自绘时可按需取用，如 `ctx.slots.default?.()`。

**`KParagraphRenderScope`**：

#### 绑定包（spread 到自绘节点才继承）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| rootAttrs | `Record<string, unknown>` | 根节点：仅 `data-part="root"`（静态对象，无 style；本件无专属 props，故 scope 无状态字段）。**不含任何 class**——`k-paragraph` 的 `margin: 0 0 1em` 下间距、`--k-color-text` 色与字号/行高全自绘；默认渲染根为 `p` 语义元素；`classNames`/`styles` 只作用于默认渲染 |

另有 `slots`（`ReturnType<typeof useSlots>`）：默认渲染的插槽集合（`default` = 段落文字），自绘时可按需取用，如 `ctx.slots.default?.()`。

---

## 规格附录（实现决策，面向贡献者）

- 三件都是**零行为纯样式件**：部件仅 root，不设组件级变量，直接消费 alias（少一层间接，观感校准在 token 层做）；
- copyable/ellipsis/editable 判定为 antd 高级件（含状态机与图标集依赖），P2 后评估；
- 字阶跳跃比例与视觉规则 §3 对齐。
