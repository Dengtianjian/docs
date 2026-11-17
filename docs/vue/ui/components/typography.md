# Typography 组（KTitle / KParagraph / KText）

> 共同约定见 [共同约定](./index.md)。文字语义三件套：标题、段落、行内文本。

## 何时使用

- 一切文字渲染走这组组件，**禁止业务直接写色/写字重**——颜色只取文本 α 四级、字重只取 base/strong/heading 三档，全由 token 驱动；确需自定义色值时用 KText 的 `color`/`gradient` 属性，不要在业务里裸写内联样式；
- copyable/ellipsis/editable 等高级交互本批**不做**（P2 后评估），单行省略先行以 utility 类 `.k-ellipsis` 提供。

## 代码演示

<Demo path="typography/title" title="标题与段落" desc="`level` 1~5 直接映射 `h1~h5`；字号走 heading 阶（seed fontSize × 固定倍率），改 seed 全档联动。" />

<Demo path="typography/text-types" title="文本层级" desc="`type` 即层级语义：default/secondary/tertiary/disabled 对应文本不透明度 88/65/45/25% 四级。" />

<Demo path="typography/text-marks" title="行内标记" desc="strong/code/mark/delete/underline 各自映射语义元素（b/code/mark/del/u），可组合嵌套。" />

<Demo path="typography/text-color" title="文字颜色与渐变" desc="`color` 收任意 CSS 色值（内联生效，压过 type 层级色）；`gradient` 缺省为主色浅→深渐变（hover→active 档），传字符串可自定义色标。" />

<Demo path="typography/render" title="自定义渲染（headless）" desc="Title 派生标签（h3）继承、Text 渐变解析随 rootStyle 继承（background-clip 自绘）、Paragraph 语义继承；默认插槽内容经 `ctx.slots.default` 取回。" />

## API

### KTitle Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| level | 标题层级（渲染对应 `h1~h5`） | `1 \| 2 \| 3 \| 4 \| 5` | 必填 |
| classNames / styles | 语义化结构 class/style | `Partial<Record<'root', …>>` | — |
| render | 自定义渲染闭包（`#render` 插槽优先）；提供时整件视觉输出被替换（三件各自支持） | `(scope: 对应 RenderScope) => VNodeChild` | — |

### KParagraph

无专属 props（`p` + 1em 下间距），支持 `classNames/styles`。

### KText Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 文本层级 | `'default' \| 'secondary' \| 'tertiary' \| 'disabled'` | `'default'` |
| color | 自定义文字颜色（任意 CSS 色值，落内联 style；与 gradient 同传时 gradient 优先） | `string` | — |
| gradient | 渐变文字：`true` = token 默认渐变（`--k-color-primary-hover → --k-color-primary-active` 横向）；`string` = 自定义色标（逗号分隔 CSS 色值，或完整 `gradient()`），`background-clip: text` 实现 | `boolean \| string` | `false` |
| strong | 加重（font-weight 500，渲染 `b`） | `boolean` | `false` |
| code | 行内代码（渲染 `code`，等宽字体 + 0.9em + quaternary 底） | `boolean` | `false` |
| mark | 标记底色（渲染 `mark`，warning-bg） | `boolean` | `false` |
| delete | 删除线（渲染 `del`） | `boolean` | `false` |
| underline | 下划线（渲染 `u`） | `boolean` | `false` |

语义元素选择优先级：code > mark > delete > underline > strong，全 false = `span`。

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 三件（KTitle / KParagraph / KText）均为默认插槽放文字内容 |
| render | 自定义渲染作用域插槽（三件各自支持），scope 见文末「自定义渲染」节；提供时整件替换 |

无事件（零行为纯样式件）。

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

## 自定义渲染（headless）

双通道 `#render` 插槽（优先）/ `render` prop，通用契约见 [headless 自定义渲染](../headless.md)。三件各有 scope（入口导出），均含 `rootAttrs` 与 `slots`（默认插槽内容经 `ctx.slots.default` 取回）。零行为纯样式件，无 ref / 动作组；各 scope 逐字段如下（接口没有的组不列）：

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
