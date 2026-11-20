# KLink 链接

> 共同约定见 [共同约定](./index.md)。文字形态的导航元素。
> 与 [KButton](./button.md)（type=link）的边界（写死的判据）：**导航用 KLink，触发动作用 KButton**。

## 何时使用

- 站内跳转（`to`，走 vue-router）、外链（`href` + `external`）；
- 需要在文案流里嵌入可点击目标时；成片的操作按钮请回 KButton。

## 代码演示

<Demo path="link/basic" title="类型与下划线" :desc="['`underline` 支持 always/hover/never。', '`disabled` 渲染为 span + aria-disabled。']" />

<Demo path="link/colors" title="取色五态" desc="链接链 / 正文字色→链接色 / 主色链 / 正文字色→主色 / 自定义 `color`（hover/active 自动派生），每态交互都变色。" />

<Demo path="link/external" title="外链" desc="`external` 自动补 `target=_blank` + `rel=noopener noreferrer`，不依赖调用方自觉。" />

<Demo path="link/render" title="自定义渲染（headless）" :desc="['双通道：`#render` 自绘墨线链接（派生 tag + href/aria-disabled 语义继承，disabled→span 照常生效）。', '`render` prop 自绘外链胶囊（external rel/target + color 三态变量继承）。']" />

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| to | 路由目标（渲染 `RouterLink`；需应用已安装 vue-router） | `string \| RouteLocationRaw` | — |
| href | 原生链接地址 | `string` | — |
| type | 取色链：`link` 链接色链；`primary` 主色链；`subtle` / `subtle-primary` 常态正文字色、hover 分别进链接/主色链；`default` / `secondary` 文本层级色（default 的 hover 为主色浅档） | `'link' \| 'primary' \| 'subtle' \| 'subtle-primary' \| 'default' \| 'secondary'` | `'link'` |
| color | 自定义静置色；hover/active 按 color-mix 惯例派生（90% 提亮 / 75% 压暗），只落变量不落 color 本身 | `string` | — |
| underline | 下划线时机 | `'always' \| 'hover' \| 'never'` | `'hover'` |
| external | 外链（自动 noopener noreferrer） | `boolean` | `false` |
| disabled | 禁用（渲染 `span`，`aria-disabled`） | `boolean` | `false` |

<CommonProps />

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 链接文字 |
| render | 自定义渲染作用域插槽，scope 见文末「自定义渲染」节；提供时整件替换 |

无事件（导航走 `to`/`href` 原生行为，不派发 click；需埋点请用 KButton type=link）。

## 主题定制（部件变量）

| 变量 | 缺省 | 说明 |
| --- | --- | --- |
| `--k-link-color` | `var(--k-color-link)` | 静置色（type 类局部重声明） |
| `--k-link-color-hover` | `var(--k-color-link-hover)` | 悬停色 |
| `--k-link-color-active` | `var(--k-color-link-active)` | 按下色 |

## 注意事项

- `to` 依赖应用装好 vue-router（peer）；文档这类无 router 环境用 `href`；
- 无任何链接属性时渲染裸 `a`（无 href），可配合点击事件用，但优先考虑 KButton(type=link);
- `color` 传值时三态（静置/hover/active）全部由该色派生，与 `type` 同传时 `color` 覆盖静置色、hover 档仍按派生值。

## 自定义渲染（headless）

双通道 `#render` 插槽（优先）/ `render` prop，提供时**整件视觉输出被替换**（标签、色链、下划线时机全自绘）；script 逻辑照跑，**绑定包散播到自绘节点才继承**。通用契约见 [headless 自定义渲染](../headless.md)。

scope = `KLinkRenderScope`（入口导出），字段分组逐项如下（本件无状态动作——导航走 `to`/`href` 原生行为，不派发 click，故无动作组）。

#### 状态（只读快照）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| type | `LinkType` | 取色链档位（`'link' \| 'primary' \| 'subtle' \| 'subtle-primary' \| 'default' \| 'secondary'`，缺省 `'link'`）；默认渲染据此落 `.k-link--{type}` 类，自绘需自挂该类或自行映射色链变量 |
| color | `string \| undefined` | 自定义静置色原值（未传为 undefined）；实际三态派生结果在 colorVars，本字段仅供自绘逻辑判断/回显 |
| underline | `'always' \| 'hover' \| 'never'` | 下划线时机（缺省 `'hover'`）；默认渲染落 `.k-link--underline-{值}` 类实现，自绘需自挂类或自行实现 hover 时机 |
| external | `boolean` | 外链标记（缺省 false）；决定 rootAttrs 是否补 `target="_blank"` + `rel="noopener noreferrer"`，自绘无需重复处理 |
| disabled | `boolean` | 禁用（缺省 false）；tag 派生为 `span`、rootAttrs 带 `aria-disabled=true` 且不含 href；置灰（text-quaternary）与 `not-allowed` 光标属默认视觉，自绘自理 |
| to | `RouteLocationRaw \| string \| undefined` | 路由目标原值；非空且非禁用时 tag = RouterLink，此分支 rootAttrs 不含 to/href，自绘须 `:to="ctx.to"` 自绑（需应用已装 vue-router） |
| href | `string \| undefined` | 原生链接地址原值；非 RouterLink、非禁用分支已并入 rootAttrs，一般无需单独消费 |

#### ref 与出口

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| tag | `typeof tag.value` | 派生标签出口：disabled → `'span'`，有 to → `RouterLink` 组件，否则 `'a'`；自绘可 `<component :is="ctx.tag">` 直接消费；不消费则需自行复刻「禁用降级 span」的可访问性语义 |
| colorVars | `CSSProperties` | 自定义色三态 inline 变量出口：color 传值时含 `--k-link-color`（原色）、`--k-link-color-hover`（`color-mix(in oklab, {color} 90%, var(--k-mix-up))` 提亮）、`--k-link-color-active`（`color-mix(in oklab, {color} 75%, var(--k-mix-down))` 压暗）；未传为空对象 `{}`。绑到自绘根 `:style`，不绑则丢自定义色三态派生；只落变量不落 color 本身（inline color 会压死 hover/active 状态规则）。默认渲染在其后还合并 `styles.root`，headless 通道需自行合并 |

#### 绑定包（spread 到自绘节点才继承）

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| rootAttrs | `Record<string, unknown>` | 根节点语义包，按优先级四分支：① to 且非禁用：仅 `data-part="root"`（href 由 RouterLink 自产，`:to` 自绑）；② disabled：`data-part="root"` + `aria-disabled=true`（无 href）；③ external：`data-part="root"` + `href` + `target="_blank"` + `rel="noopener noreferrer"`；④ 其余：`data-part="root"` + `href`。**不含任何视觉类与事件**——`.k-link` 基线（色链变量缺省/cursor/color 过渡）、type 类、underline 类、`is-disabled` 置灰全自绘；无事件包，导航走原生行为，需埋点请用 KButton(type=link) |

另有 `slots`（`ReturnType<typeof useSlots>`）：默认渲染的插槽集合（default = 链接文字），自绘时可按需取用，如 `ctx.slots.default?.()`。

---

## 规格附录（实现决策，面向贡献者）

- 取色五态为自有设计（2026-11-17 增强）：`link/subtle/primary/subtle-primary/color`，每态 hover/active 均有变色；
- 三变量 `--k-link-color/-hover/-active` 承载全部档位，纯变量实现；`color` prop 只 inline 落三变量（不落 color 本身，否则压死状态类规则）；
- 改判记录：browser 两档（静置 `color: revert` 走 UA 色）当日废弃——用户拍板静置改正文字色（subtle 系）。
  - 留档备用结论：CSS 宽关键字 `revert` 经 `var()` 代入在 WebKit 按无效值处理（实测落继承色而非 UA 蓝），若再需要 UA 色须直接声明 + `:not()` 让位清单（防复合特异度压死交互态）；
- 类型链覆盖须双类名 `.k-link.k-link--xxx`（0,2,0）：基线 `.k-link:is(a)` = (0,1,1) 压过单类名——旧 `default/secondary` 在 `<a>` 上不生效即此因，已一并修复；
- 兼容变更：旧 `type=primary`（= 链接色链）语义由缺省值 `link` 承载；`primary` 改为主色链——缺省主题 seed link = 主色，两链同值，旧写法观感不变；
- 色链只开三档（color/hover/active），语义全在 link 色系（seed 缺省 = 主色，可独立于按钮改链接色）；
- 判定顺序：disabled→span；to→RouterLink；其余→a（external 附加 rel/target）。
