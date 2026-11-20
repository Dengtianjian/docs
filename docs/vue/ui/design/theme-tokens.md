# K UI 主题 Token 规格（themes/ 设计文档）

> 状态：纸面规格 v0.4，未落地。范围 = `packages/vue/ui/themes/` 包的全部数据与算法；
> 组件清单、自动导入、平台策略见总体方案（对话定稿），此处不重复。
> v0.2 变更：**派生图从 JS 搬进 CSS**——状态色/中性色/暗色切换全部用 `color-mix(in oklab)` 表达式表达，
> 覆盖一个种子变量即全链联动；JS 算法（antd 色板）降级为编译/导出/审计工具。
> v0.3 变更：确立 **「CSS 优先」为设计原则**（§1.0）——主题的第一公民是 CSS 变量文件，
> `KConfigProvider`/`createTheme` 改为可选件，暗色基线改用 `light-dark()` 表达，
> JSON/JS 通道重新定义为「编译到 CSS 的前端」与「CSS 物理不可为的兜底」。
> 所有「默认值」都是库的**初始值**，用户可经三级通道覆盖（见 §10），算法本身不硬编码任何色值。

---

## 1.0 设计原则：CSS 优先

1. **主题的真相源是 CSS 变量表**。默认主题、dark、mobile 断点块全部预编译进基础 CSS 文件，
   业务 `import 'kit/vue/ui/css/theme.css'` 即获得完整可切换主题，**零 JS 参与**；
2. **能用 CSS 表达的一律不写 JS**：色彩派生（color-mix）、模式切换（`light-dark()` + `color-scheme`）、
   平台差异（默认断点 `@media` 块）、组件级覆盖（`.k-button { --k-button-radius: … }`）全部是 CSS 能力；
3. **JSON 是配置序列化，JS 是编译器与兜底**：
   `theme.json` / `createTheme()` 的产物就是同一张 CSS 变量表（构建期 CLI 或运行时 Provider 注入）；
   运行时 JS 只保留两件 CSS 物理上做不到的事——**自定义断点值**（`@media` 条件不可读变量）与**动态换肤注入**；
4. 行为判断不算主题：组件按断点选形态（抽屉/下拉）用 `useBreakpoint()`，属交互层，不受本原则约束；
5. 三通道（§10）依然全开，但文档引导顺序固定：**CSS → JSON → JS**。

---

## 1. 命名与分层规则

### 1.1 变量命名

- 全局前缀 `--k-`；token 名 camelCase → CSS 变量 kebab-case：
  - `colorPrimary` → `--k-color-primary`
  - 色板序号追加：`colorPalettePrimary[7]` → `--k-color-primary-p7`（仅静态/导出场景出现）
  - `fontSizeHeading2` → `--k-font-size-heading-2`
- 组件变量：`--k-<组件 kebab>-<部件?>-<属性>`，如 `--k-button-height`、`--k-button-icon-gap`；
- 状态**不进变量名**（无 `--k-button-hover-bg` 这种），hover/active/disabled 由状态类在
  局部作用域**重新声明同一批变量**，样式表达式只写一次（vant/antd-mobile 模式）：

```css
/* 组件样式不分层（未分层才能赢过宿主未分层 reset，见 §12 落地状态） */
.k-button { background: var(--k-button-bg); color: var(--k-button-text-color); }
.k-button:hover:not(.k-button--disabled) { --k-button-bg: var(--k-color-primary-hover); }
.k-button--disabled { --k-button-bg: var(--k-color-fill-secondary); }
```

### 1.2 四级变量与「表达式图」

| 层 | 归属 | 输出位置 |
| --- | --- | --- |
| Seed | 用户可配的原子输入 | `:root` 原值输出（`--k-color-primary: #1677ff`） |
| Mix 基线 | 派生方向基准（§4.0），light/dark 只换这组 | `:root` / `[data-k-theme="dark"]` |
| Map | 派生数据。尺寸/字号/动效为实值；**颜色类以 color-mix 表达式为定义** | `:root` |
| Alias | 语义层，**组件样式唯一合法消费对象**，同样允许表达式 | `:root` |
| Component | 部件级变量，初值回落到 Alias | 组件自身选择器内声明 |

核心原则：**派生关系用 CSS 变量表达式表达，而非 JS 算完写死**。
自定义属性惰性求值 → 在任意祖先作用域覆盖 seed 或任一 alias，其下游在该作用域全部自动重算，
「一变百变」与局部换肤由级联本身保证，不依赖 Provider 重注入。

优先级链（总体方案已定）：内置默认 CSS < 主题 CSS 文件 < `KConfigProvider` 作用域变量 < 实例行内 style。

---

## 2. Seed 全表（唯一输入面）

| Token | 默认值 | 说明 |
| --- | --- | --- |
| `colorPrimary` | `#1677ff` | 主色，派生整条主色链路（CSS 内实时联动） |
| `colorSuccess` | `#52c41a` | 成功语义色 |
| `colorWarning` | `#faad14` | 警告语义色 |
| `colorError` | `#ff4d4f` | 错误语义色（含 danger） |
| `colorInfo` | `var(--k-color-primary)` | 信息语义色，未设则跟随主色（CSS 级联实现） |
| `colorLink` | `var(--k-color-primary)` | 链接色，同上 |
| `colorTextBase` | `#000000` | 文字基准色 |
| `colorBgBase` | `#ffffff` | 容器基准底色（dark 下为 `#141414`） |
| `neutralTint` | `0.02` | 中性色染色比（§4.3），0 = 纯灰 |
| `fontFamily` | `system-ui, -apple-system, "Segoe UI", Roboto, "PingFang SC", "Microsoft YaHei", sans-serif` | 直接透传 |
| `fontFamilyCode` | `"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace` | 直接透传 |
| `fontSize` | `14` | 基准字号（px），派生全部字号/行高阶梯 |
| `lineHeight` | `1.5714` | 基准行高倍率 |
| `borderRadius` | `6` | 基准圆角，派生圆角阶梯 |
| `lineWidth` | `1` | 基准描边宽 |
| `sizeUnit` | `4` | 间距基数（px），派生 size/padding/margin 阶梯 |
| `sizeStep` | `4` | 间距步长系数 |
| `controlHeight` | `34` | 基准控件高，派生高度阶梯 |
| `motionUnit` | `0.1` | 动效时长基数（s），派生 fast/mid/slow |
| `zIndexPopupBase` | `1000` | 浮层层级基数 |

Seed 不含平台维度：同一份 Seed 经 §8 平台覆盖 + §7 暗色基线产出 4 组合（light-pc / light-mobile / dark-pc / dark-mobile），其中颜色部分**公式全模式共用，只换 Mix 基线**。

---

## 3. 派生管线

```
主路径（CSS，覆盖 99% 场景）：
  theme.css（构建期生成的变量表达式图：:root 默认 + light-dark 基线 + 默认断点 @media 块）
    → 业务 import → 级联/覆盖 → 浏览器惰性求值 → 计算样式
  ——颜色计算、模式切换、平台差异全程无运行时 JS——

配置路径（JSON/JS = 编译器前端，产物仍是 CSS）：
  theme.json / createTheme(输入任意子集)
    ↓ 构建期：kit theme build → <brand>.theme.css（推荐，静态可审查）
    ↓ 运行时：<KConfigProvider> 注入 <style id="k-theme">（仅动态换肤场景需要）

必须 JS 的例外（穷举，新增须评审）：
  ① 自定义断点值 → 生成 @media 块注入（条件值无法用变量）
  ② 运行时动态换肤 → 即 ①的同一注入器
  ③ 行为层：useBreakpoint()/matchMedia、色板导出 getColorPalette()、设计器求值预览
```

themes/ 包的 JS 部分保持纯函数、无副作用、可单测：同输入必同输出；零 vue 依赖，设计器/CLI/Provider 共用同一份。

---

## 4. 颜色派生：Mix 基线与表达式

### 4.0 Mix 基线（暗色适配的支点）

light/dark **不各写一套公式**，只换三个方向变量：

```css
:root {
  --k-mix-onto: var(--k-color-bg-base);                     /* 淡出方向：融进背景（bg/border 类用），两模式自动正确 */
  --k-mix-up:   #ffffff;                                    /* 提亮方向：hover 恒提亮 */
  --k-mix-down: light-dark(#000000, #ffffff);               /* 压暗方向：暗色下改为提亮（§7） */
}
```

约束（验收规则）：

- 核心派生只允许 `color-mix(in oklab, ...)` 与变量引用；**禁止组件样式使用 `oklch(from …)` 相对颜色语法**
  （Chrome 119/Safari 16.4 起可用，门槛更高），相对色语法仅限可选特性包（辅助色和谐色生成）；
- **颜色类 token 一律禁止 `@property` 注册**（`syntax: <color>` 会把 `light-dark()/color-mix` 的计算值钉死在声明处，
  静默破坏子树级亮暗切换，见 §7；尺寸类无此问题可注册）；
- 派生链深度 ≤ 3（seed → 基线/一级派生 → alias 消费），禁止表达式套表达式超过三层，保证求值性能与可调试性；
- 浏览器基线：`color-mix` 按 Baseline 2023（Chrome/Edge 111、Safari 16.2、Firefox 113）；
  更低环境走 §10 静态产物出口。

### 4.1 语义状态色组（每语义色 × 11 变量，全模式同式）

`N ∈ {primary, success, warning, error, info, link}`，`c = var(--k-color-N)`：

| Token | 表达式 | 说明 |
| --- | --- | --- |
| `color<N>` | `c` | 基准 |
| `color<N>Hover` | `color-mix(in oklab, c 90%, var(--k-mix-up))` | 提亮 10% |
| `color<N>Active` | `color-mix(in oklab, c 75%, var(--k-mix-down))` | 压暗 25%（按压可见度校准 2026-11-17，原 85%） |
| `color<N>Bg` | `color-mix(in oklab, c 10%, var(--k-mix-onto))` | Alert/Tag 浅底 |
| `color<N>BgHover` | `color-mix(in oklab, c 16%, var(--k-mix-onto))` | |
| `color<N>Border` | `color-mix(in oklab, c 30%, var(--k-mix-onto))` | |
| `color<N>BorderHover` | `color-mix(in oklab, c 45%, var(--k-mix-onto))` | |
| `color<N>Text` | `color-mix(in oklab, c 90%, var(--k-mix-onto))` | 彩色浅底上的文字 |
| `color<N>TextHover` | `color-mix(in oklab, c 75%, var(--k-mix-onto))` | |
| `color<N>TextActive` | `color-mix(in oklab, c 100%, var(--k-mix-down) 0%)` → 简化为 `color-mix(in oklab, c 92%, var(--k-mix-down))` | |
| `color<N>TextStrong` | `light-dark(color-mix(in oklab, c P%, #000000), c)`，P = primary/info/link 90、success 70、warning 65、error 80 | **R4b（2026-11-17）彩字深档**：白底彩字过 WCAG 4.5 的专用深档；light 压黑取够最低档余量（白底/filled/tonal 浅底全语境 ≥4.3），dark 直接复用 c（seed 已按 §7 提亮，本身达标）。消费方 = Button 文字通道（`--k-button-c-text`），非 hover/active 状态链 |

百分比为**初值**，落地时跑一轮与 antd 色板（§4.6）的观感对照校准，校准结论固化回本表。
**已校准**：Active 85%→75%（2026-11-17，按钮按住反馈偏弱）；`palette.ts` 导出色板 p7 同步 0.15→0.25。**R4 收官（2026-11-17，矩阵页三态徽章全矩阵 122 格×静置/hover/active 实测）**：hover 90%up / active 75%down 维持——light 侧 active 变深反而提升白字对比（primary outlined 4.6→7.7），红线集中在 light success/warning 彩字本身（antd 同病，登记为语义色固有妥协不动）；**唯一改档 = 暗色 seed 提亮 15%→8%**（§7 表达式 + `palette.darkSeedVariant`，15% 时 dark 实底链白字 hover/active 共 13 格红线，降档后向 antd dark #1668dc 同档靠拢，新终值 #3284ff；`pnpm ui:drift-check` 7/7 绿）。待定项 #1 关闭。**R4b 补充（2026-11-17，低评分三分类只治 A 类拍板）**：A 类「浅底彩字」不再登记为妥协——新增 `color<N>TextStrong` 深档别名（见上表），Button 文字通道全量改接 `--k-button-c-text`；矩阵页复检：light 静置彩字格（filled/text/quiet/dashed/ghost/plain/soft/border/link）全部 ≥4.5，hover 态 4.3~4.4 黄档保留（WCAG 只约束静置）；B 类彩底白字（success/warning/danger×outlined 等 5 格）、C 类 hover 微降不在本轮范围。**R4c（2026-11-17 当日撤销）**：曾按「只翻红线格字色」落地（<3 格翻深字 `colorTextOnBright`，danger 分模式 `light-dark()`），用户验收否决——「撤销深字，太丑了；正常主题色是用户定的，我们也拿不准，没有 100% 满分的」。定论：**B 类彩底白字 = seed 由用户定的固有暴露面，库不硬修**，实底字色恒 `colorTextLightSolid`；矩阵页红线格继续如实显示低分（工具职责是暴露不是粉饰）。深字机制（部件变量 + 别名）整体回滚，无残留。

### 4.2 文本 / 填充 / 遮罩（透明通道组，同样全模式同式）

```
colorText          = color-mix(in oklab, var(--k-color-text-base), transparent 12%)   /* ≈α0.88 */
colorTextSecondary = … transparent 35%
colorTextTertiary  = … transparent 55%
colorTextQuaternary= … transparent 75%
colorFill          = … transparent 85% | Secondary 94% | Tertiary 96% | Quaternary 98%
colorBgMask        = color-mix(in oklab, #000, transparent 45%)
colorBgSpotlight   = color-mix(in oklab, #000, transparent 15%)
colorTextLightSolid= #fff（dark 下由 §7 换为压暗方向字色；实底彩底字色恒此值——R4c 定论：B 类低对比随用户 seed 暴露，不硬修）
```

文本/填充基于 `colorTextBase`，dark 只换该 seed（→`#fff` 系），公式不变。

### 4.3 Tinted Neutral（本库特色，纯 CSS 实现）

```
--k-gray-N  = 静态灰阶 10 级（按模式定义，公式 = color-mix(in oklab, text-base, bg-base, 阶梯%)）
--k-neutral-N = color-mix(in oklab, var(--k-color-primary) calc(var(--k-neutral-tint) * 100%), var(--k-gray-N))
```

消费方：`colorBgLayout = neutral-2`、`colorBorder = neutral-4`、`colorBorderSecondary = neutral-3`、滚动条/分割线。
2026-11-20 低段调浅：gray-1..4 = 1% / 2% / 4% / 8%（原 3% / 5% / 7% / 15%），`neutralTint` 0.04→0.02，分割线 α0.08→0.06。
改主色 → 全页灰调联动；`neutralTint: 0` 回到 antd 纯灰观感。

### 4.4 主色光晕 / 投影

```
boxShadowPrimary = 0 0 0 var(--k-control-outline-width) color-mix(in oklab, var(--k-color-primary), transparent 84%)
controlOutline   = color-mix(in oklab, var(--k-color-primary), transparent 85%)
boxShadow 三档 = 基于 colorBgMask 的固定阴影模板（非彩色，不走 mix 图）
```

### 4.5 辅助/强调色（可选特性包，主题设计器消费）

和谐色用 `oklch(from var(--k-color-primary) l c calc(h + 30deg))` 等相对色语法生成
`--k-color-accent-1..3`（类似色 ±30° / 三角 120° / 互补 180° 三档可选）。
**独立可选**：核心库不引用，低端浏览器整包缺席不影响组件；设计器「一键辅助色」按钮的产物。

### 4.6 JS 色板算法（保留，角色收窄）

移植 `@ant-design/colors` v7 `generate()`（输入基准色 → 10 级色板；hue/饱和度/明度曲线常量随源码逐值搬移 + 快照单测）：

```
hue     = [245, 239, 231, 217, 202, 187, 173, 162, 154, 150]
vDark   = [0.98, 0.84, 0.70, 0.50, 0.30, 0.20, 0.10, 0.05, 0.03, 0.00]
vLight  = reverse(vDark 取正序) = [0.10 … 1.00]
sDark   = [0.18, 0.15, 0.13, 0.12, 0.11, 0.10, 0.08, 0.06, 0.04, 0.02]
sLight  = reverse(sDark)
（red 系饱和修正保留源码实现）
```

仅用于：① 主题设计器展示与导出 `--k-color-primary-pN` 静态色板；② CLI 静态产物（`--static`）中替代表达式的终值来源；③ 图表/第三方取色 API `getColorPalette(primary)`。
运行时组件**不消费**色板序号。

现实现为 `palette.ts` oklab 色阶（antd v7 精确算法未引入，上表仅兼容位）。**档位与 §4.1 状态系数同源**（2026-11-17 修正，此前 p1~p3 用 8/15/28% 与 CSS 10/16/30% 漂移 Δ2~4）：
`p1=bg(白90) p2=bg-hover(白84) p3=border(白70) p4=border-hover(白55) p5=hover(白10) p6=主色 p7=active(黑25)`，p8~p10 为深端延伸（黑30/45/65，CSS 无对应）。
双源同步由 `themes/drift-check.mjs` 锁定（`pnpm ui:drift-check`）：真相源=theme.css 表达式，脚本解析系数重建期望色与 `generateRamp` 逐项比对，不一致即非零退出；负例（改 CSS 不改 JS）已实测红。

---

## 5. 非颜色 Map 层算法

### 5.1 字号与行高

```
fontSizeSM      = max(12, fontSize - 2)
fontSizeLG      = fontSize + 2
fontSizeXL      = fontSize + 6
headingRatio    = [2.714, 2.142, 1.714, 1.428, 1.142, 1]        // H1~H6
fontSizeHeadingN = ceil(fontSize × ratioN)                       // 14 → 38/30/24/20/16/14
lineHeightHeadingN = N≤3 ? 1.25 : 1.35
fontHeight      = round(fontSize × lineHeight)                   // 控件文字基准高
```

### 5.2 圆角

```
borderRadiusNone = 0
borderRadiusXS   = max(2, round(borderRadius × 0.5))
borderRadiusSM   = max(2, round(borderRadius × 0.75))
borderRadiusBase = borderRadius
borderRadiusLG   = borderRadius × 2
borderRadiusExtraLarge = borderRadius × 3
borderRadiusFull = 999px
```

### 5.3 间距阶梯

`step = sizeUnit × sizeStep / 4 = 4px`：
`sizeXXS 4 | sizeXS 8 | sizeSM 12 | size 16 | sizeMD 20 | sizeLG 24 | sizeXL 32 | sizeXXL 48`。
Alias 同名映射 `padding*` / `margin*`；`wireframe` 预留模式下 XXS→2、XS→4。

弹层统一契约（2026-11-20，参考 Radix Select / Dropdown）：`--k-popup-padding = 4px`、`--k-popup-item-height-sm/md/lg = 28/32/36px`、`--k-popup-item-padding-x = 8px`；标题 `14px / 600`、描述 `12px / 次要色`。

### 5.4 控件高度

```
controlHeightXS = max(20, controlHeight - 8)   controlHeightSM = max(24, controlHeight - 4)
controlHeightBase = controlHeight              controlHeightLG = controlHeight + 4
// 桌面 seed = 34 → xs26 / sm30 / md34 / lg38；移动端 md=44、lg 保留 52
```

### 5.5 动效与 zIndex

```
motionDurationFast/Mid/Slow = max(0.1/0.2/0.3, motionUnit × 1/2/3)
motionDurationWave = 0.6s | motionEaseWave = (0.08,0.82,0.16,1)   // 点击波纹（2026-11-17 调参：用户「太快」，由 antd 同值 0.4s 放慢到 0.6s）
缓动预设：easeInOutCubic (0.645,0.045,0.355,1) | easeOutQuint (0.23,1,0.32,1) 弹出
        | easeInQuint (0.755,0.05,0.855,0.06) 收起 | easeOutBack (0.12,0.4,0.29,1.46) 备用（库内不消费，业务二开可选）
zIndex: base 0 | divider 1 | segment 2 | affix 10 | popup 1000(seed)
        dropdown +100 | sticky +200 | mask +300 | modal/drawer +400 | popover +500 | message +910 | notification +990
```

---

## 6. Alias 层全表（组件消费面）

- 颜色组：§4.1 六语义 × 11 变量 + §4.2 文本/填充/背景组 + §4.3 neutral 消费位 + §4.4 光晕/投影；
- 非颜色组：字号行高、圆角、`padding*/margin*`、`lineWidth/lineType`、动效、`controlHeight*`、
  `controlOutlineWidth (2)/controlOutline`、`zIndex*`、`screenXS~XXL`（§8）。

体积预算：alias ~150 + map ~120 + 组件层，首屏 CSS 变量总量 ≤ 400（表达式形态，未压缩 ~14KB）。

---

## 7. Dark 模式（CSS 原生：`light-dark()` + `color-scheme`）

双模式基线写在**同一批变量**里，用 `light-dark(亮值, 暗值)` 表达（Baseline 2024：Chrome 123 / Safari 15.4 / FF 120）：

```css
:root {
  color-scheme: light dark;                       /* 默认跟随系统 prefers-color-scheme */
  --k-seed-text-base: #000000;                    /* seed 变量（§2），CSS 用户直接覆盖这两个 */
  --k-seed-text-base-dark: #f5f5f5;
  --k-seed-bg-base: #ffffff;
  --k-seed-bg-base-dark: #141414;
  --k-color-text-base: light-dark(var(--k-seed-text-base), var(--k-seed-text-base-dark));
  --k-color-bg-base:   light-dark(var(--k-seed-bg-base), var(--k-seed-bg-base-dark));
  --k-mix-down:        light-dark(#000000, #ffffff);   /* active：亮色压暗 / 暗色提亮 */
  --k-color-primary:   light-dark(var(--k-seed-primary), color-mix(in oklab, var(--k-seed-primary) 92%, #fff));
  --k-color-bg-elevated: light-dark(#ffffff, color-mix(in oklab, #fff 6%, var(--k-color-bg-base)));
}
/* 手动切换 = 翻一个属性/变量，无需第二份覆盖块 */
[data-k-theme="dark"] { color-scheme: dark; }
```

- **子树级亮暗（已定稿接受）**：`color-scheme` 是可继承属性，`light-dark()` 在使用变量的元素处求值，
  因此任意节点声明 `color-scheme: dark|light` 即整棵子树自动翻转，支持嵌套回拨（暗中亮、亮中暗），
  零额外变量、零 JS。前提是默认 CSS 保持表达式形态（§12-2）且颜色 token 不注册 @property（§4.0）。
  暴露方式 = `KConfigProvider scheme="auto|light|dark"`（全局与子树同一语义，见 [config-provider.md](../components/config-provider.md)）；
  Teleport 出口必须携带来源子树的 scope class 与 scheme（否则局部暗区的弹层按亮色渲染）；
- 开关方式三选一，全 CSS 可达：跟随系统（默认）、`[data-k-theme]` 属性、直接写 `color-scheme`；JS 只负责改属性这一个动作；
- **`color-scheme: light dark` 缺省只声明在 `:root`，scope 容器块（`.k-config-provider`）不抄这条（2026-11-17 修复）**：
  `light dark` 的 used 值跟随**系统**而非祖先——宿主强开暗色（`[data-k-theme="dark"]` 在 html）+ 系统亮色时，
  容器重抄会把子树拉回亮档解析（`--k-mix-down`=#000 → 暗色按压变压暗、primary 不提亮）。
  auto = 不声明、继承根的生效值；显式 light/dark 一律走 `[data-k-theme]` 属性块；
- §4.1/§4.2 全部公式基于 `colorTextBase / colorBgBase / mix 基线`，**暗色零新增公式**；
- 补充规则：文本 α 组、fill 组随 `color-text-base` 自动翻转；`colorBgMask` 暗色下 α 上调一档（同样 `light-dark()`）；
- **验收**：亮/暗两态全部文本/状态色组合跑 WCAG 对比度单测（文本 ≥4.5:1、大字号/UI 组件 ≥3:1），
  不达标项在基线处打 `light-dark()` 补丁，**不改组件公式**。
- 兼容：`light-dark()` 不可用的旧环境由 `--static` 产物展开为两态终值 + 属性覆盖块（同 v0.2 方案作 fallback）。

---

## 8. 平台层（断点 + mobile 覆盖组）

### 8.1 断点（seed 级配置，默认 antd 值）

```
xs <576 | sm ≥576 | md ≥768 | lg ≥992 | xl ≥1200 | xxl ≥1600
```

「mobile 平台」判定 = `width < md`。断点是**唯一必须 JS 参与**的主题维度（`@media` 条件读不了变量）：
默认断点块预编译进基础 CSS（首屏零 JS 正确）；自定义断点由 Provider 生成 `<style id="k-theme">` 注入，
`useBreakpoint()` 用同一份数值建 `matchMedia`，表现与行为同源。

### 8.2 mobile 覆盖组（`@media (max-width: 767px)` 下重新声明）

| Token | pc → mobile | 理由 |
| --- | --- | --- |
| `controlHeight*` | 34 → **44**（xs36/sm40/lg52） | 触达最小尺寸 44px |
| `inputFontSize` | 新增 alias = **16** | iOS 聚焦防自动缩放 |
| `padding` / `paddingLG` | 16→12 / 24→16 | 屏宽收窄密度 |
| `borderRadius` | 6 → 8 | 移动端观感 |
| `motionDurationMid` | 0.2 → 0.3 | 跟手动画偏慢更稳 |
| `motionEaseOut` | ~~→ `easeOutBack`~~ 已撤销 | 企业级基调不做回弹；曲线 token 保留，业务二开可自行覆盖 |
| `sizePopupBase` | 新增 = `min(94vw, 680px)` | 双形态组件弹层宽度基准 |
| `paddingSafeArea*` | 新增，绑定 `env(safe-area-inset-*)` | 刘海屏 |

此表是「平台 token 差异」的**封闭清单**——新增差异必须先入表再实现，禁止组件内 `isMobile` 硬改样式。

非 token 的平台**形态差异**（如 Button App 端按压遮罩，2026-11-17 拍板走 antd-mobile 实况）：不进本表，落组件 CSS 的平台媒体查询块（真触屏判定用 `@media (hover: none)`，不是视口宽——桌面窄窗保持桌面形态），并在 §13 台账登记；组件 JS 不出现任何平台判断。

---

## 9. 组件变量层规范

每个组件目录附机器可读的 `tokens.ts`（供文档站与设计器消费），结构 = 四轴矩阵：

```ts
// components/Button/tokens.ts（示意）
export const buttonTokens = {
  vars: {
    '--k-button-height':     { fallback: 'var(--k-control-height)', bySize: { xs: '…', sm: '…', md: null, lg: '…' } },
    '--k-button-padding-x':  { fallback: 'var(--k-padding-horizontal)' },
    '--k-button-radius':     { fallback: 'var(--k-border-radius)' },
    '--k-button-bg':         { byTypeVariantMatrix: '见下' },
    '--k-button-text-color': { /* … */ }, '--k-button-border-color': { /* … */ }, '--k-button-icon-gap': { /* … */ },
  },
}
```

`--k-button-bg` 的 type × variant 矩阵（状态列由状态类重声明变量，§1.1）；等级四档 = 基础 outlined / 次要 filled / 次次要 tonal / 次次次要 text（2026-11-17 增 tonal，抄 naive 等级区分；值名当日由 tertiary 改 tonal，避与 fill 阶梯撞名）；同日第四批再增 ghost / plain / soft / border（ghost 跟 naive 透明底档；plain/soft 白底两式——plain 有框、交互变边框+文字，soft 无边框、交互背景 tint+文字；border 隐框、交互现边框+文字色）；同日 text/quiet 拆分——text = 纯文字交互永不落底（naive 路数），quiet = 原 text 灰底交互改名继承：

| | outlined | filled | tonal | text | quiet | dashed | ghost | plain | soft | border |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **default** | `transparent` + 边框 `colorBorder` | `colorFillSecondary` | `colorFillTertiary`（无边框；hover/active 破格 8%/12%） | `transparent`；交互只变文字色（c=primary 浅/深档），**无底** | 静置同 text；hover/active 灰底 `fill-tertiary/secondary`（原 text） | `transparent`（当日改判去灰底）+ 虚线框 | 同 outlined（中性边 + 正文字，naive 同款） | `bgContainer` + 中性边/字 | 静置同 plain 但**无边框**；hover/active 底 tint（c 10%/16%）+ 字变色 | 透明边框占位 + 正文字；交互现边框色+文字色（c 90%up/75%down，与 plain 同公式），底恒静置 |
| **primary** | `colorPrimary` | `colorPrimaryBg` | `colorFillTertiary` 底 + `colorPrimary` 字 | `colorPrimary`（字色）；交互只变文字色，无底 | 静置同 text；灰底 + 字变色 | 同 outlined 虚线 | `transparent` + `colorPrimary` 边/字 | `bgContainer` + `colorPrimary` 边/字 | 静置同 plain（无边框） | 透明边框占位 + `colorPrimary` 字；交互现 `colorPrimary` 边 |
| **danger/success/warning/info** | 与 primary 同构，取对应语义组 | 〃 | 〃 | 〃 | 〃 | 〃 | 〃 | 〃 | 〃 | 〃 |

（`link` 是独立 type 而非 variant：语义是导航，不占按钮矩阵。ghost/plain/soft 状态档 = `--k-button-c` color-mix 惯例（hover 90% up / active 75% down），default 档 c=primary 同式。）

命名规约：`<prop>` 用 CSS 属性连字符名（`bg`、`text-color`、`border-color`、`padding-x`、`icon-gap`、`gap`）；
部件前缀用部件名（`--k-button-icon-size`）；组件不得引用另一组件的组件变量。

---

## 10. 配置 Schema 与三通道

### 10.1 theme JSON Schema（规范模型的序列化形态）

```jsonc
{
  "$schema": "./theme.schema.json",
  "name": "brand",
  "extend": "k:default",                      // 可继承另一份主题文件
  "seed":      { "colorPrimary": "#0a7" },    // 任一层均可省略；纯 CSS 用户只改 --k-color-primary 即全链联动（v0.2 起）
  "map":       { "colorSuccess": "#2e7d32" }, // 钉住派生输入
  "alias":     { "colorBgLayout": "#f6f8fa" },// 手动赢表达式（在引用处覆盖）
  "breakpoints": { "md": 840 },
  "platform":  { "mobile": { "alias": { "borderRadius": 10 } } },
  "dark":      { "seed": {}, "alias": {} },
  "components": { "KButton": { "radius": 8 } } // 键 = 组件变量名（无 --k- 前缀）
}
```

### 10.2 三通道能力矩阵（v0.3：CSS 优先，引导顺序 CSS → JSON → JS）

| 通道 | 定位 | 能力 | 备注 |
| --- | --- | --- | --- |
| **CSS** | **第一公民，默认推荐** | 全色彩派生联动、light/dark（`color-scheme`）、组件级变量覆盖、作用域嵌套 | 唯一做不了：自定义断点条件值 |
| **JSON** | 配置序列化 | 全量 schema（含断点）；经 CLI 编译成主题 CSS 文件 | 主题资产化：设计器导出、多品牌共享、静态可审查 |
| **JS/TS** | 编译器 + 兜底 | `createTheme()` 同 schema 类型版；Provider 运行时注入（动态换肤 / 自定义断点） | **不装 Provider 主题功能完整**；动态场景才引入 |

- **CLI**：`kit theme build brand.theme.json -o brand.theme.css [--static]`
  —— 默认输出表达式形态；`--static` 用 §4.6 算法 + 求值器把全部派生落成终值（并展开 `light-dark()`），
  供 `color-mix` 不可用的旧 WebView（小程序场景），代价是失去实时联动；
  `kit theme diff a.json b.json` 供设计器对照。

### 10.3 产物格式

```css
@layer kui-theme {
  :root { color-scheme: light dark;
          --k-color-primary: light-dark(#1677ff, color-mix(in oklab, #1677ff 85%, #fff));
          --k-color-primary-hover: color-mix(in oklab, var(--k-color-primary) 90%, var(--k-mix-up));
          /* …表达式图… */ }
  [data-k-theme="dark"] { color-scheme: dark; }
  @media (max-width: 767px) { :root { --k-control-height: 44px; } }
}
```

作用域模式（局部主题）：CSS 用户直接在容器选择器上写变量覆盖，表达式图自动在子树重算；
`KConfigProvider` 是这一规则的运行时件，实现为「哈希 scope class + `<style>` 注入」（非行内变量，因 Teleport 断链，
且 `scheme` 子树翻转也走同一载体）——规格见 [config-provider.md](../components/config-provider.md)。

> **前提修订（2026-11-17）**：自定义属性在**声明处**计算，后代继承的是已算完的值——
> 只在 scope 容器覆盖 seed、而表达式图仅声明在 `:root` 时，下游 Alias **不会**重算（scoped 换肤全失效的根因）。
> 因此 theme.css 每个图块选择器都是 `:root, .k-config-provider` 并列：scoped Provider 容器自身重算整图，
> 注入差量用 `.k-config-provider.k-scope-xxx`（特异度压过同名 seed 缺省，不依赖样式先后）。
> 纯 CSS 用户同理：覆盖 seed 的容器必须同时是图的声明处（或直接把 alias 终值写在容器上）。

---

## 11. 落地顺序（themes/ 包内部）

> 实际落地与本节有一处结构偏离（theme.css 手工真相源、无构建脚本），见 §13。

1. `seed.ts`（类型 + 默认值）→ 2. `mix.ts`（§4.0 基线 + 表达式模板）→ 3. `color-static.ts`（antd 色板移植，快照单测）→
4. `neutral.ts` / `text-alpha.ts` → 5. `map.ts`（§5 尺寸/字号/动效/zIndex）→ 6. `alias.ts`（表达式图组装）→
7. `dark.ts` / `platform.ts`（基线覆盖 + mobile 组）→ 8. `createTheme()` + `cssText()/json()` + 对比度单测 →
9. `default.css` 构建脚本（产物进 git）→ 10. token 清单导出（喂文档站/设计器/组件 tokens.ts 生成器）。

## 12. 待定项

| # | 问题 | 倾向 / 状态 |
| --- | --- | --- |
| 1 | §4.1 mix 百分比与 antd 观感的差距 | **已关闭（2026-11-17 R4）**：Active 85→75（按压可见度）；矩阵页三态徽章全矩阵实测后 hover 90up/active 75down 维持，唯一改档见 #4。R4b（2026-11-17）追加：语义彩字低对比不再挂账——A 类浅底彩字走 `color<N>TextStrong` 深档别名修复（§4.1 表）。R4c（2026-11-17 当日撤销）：B 类彩底白字曾翻深字被用户观感否决——定论「seed 用户定的，库不硬修」，维持妥协登记，机制已回滚 |
| 2 | 默认 `default.css` 发表达式还是终值 | **已定：表达式**（子树级亮暗与局部联动的前提，§7）；`--static` 仅作旧环境兼容出口 |
| 3 | tinted neutral 默认 `neutralTint` | 0.02 |
| 4 | 暗色基准色提亮幅度（§7-1 的 85%） | **已定（2026-11-17 R4）：85%→92%（白 15%→8%）**，对比度矩阵页单测实锤：15% 时 dark 实底链白字 hover/active 13 格红线（<3），8% 向 antd dark 同档；darkSeedVariant/drift-check 同步 |
| 5 | `lg` 断点 992（antd）vs 1024（naive-ui） | 992 |
| 6 | 组件变量是否公开承诺稳定 | 承诺稳定，改算 API break，逐组件版本化 |
| 7 | `color-mix` 的 oklab vs oklch 插值空间 | oklab（无色相旋转问题）；辅助色包用 oklch |
| 8 | 子树级亮暗的视觉回归成本（亮×暗交叉态矩阵） | **已定：接受**，playground 组件矩阵页覆盖（v0.3） |

## 13. 落地状态（2026-11-16 首批）

**与 §11 的偏离：`css/theme.css` 为手工真相源，无生成脚本。** 理由：kit 零构建哲学（源码直引）；
表达式图稳定、可审查；JS 侧只做差量声明（createTheme 从不展开派生链），不构成双源。
双源仅剩「theme.css Seed 区 ↔ themes/seed.ts 字面量」一处，按 §2 表逐值对齐，待测试运行器落地后补一致性单测。

| 产物 | 路径（packages/vue/ui/） | 状态 |
| --- | --- | --- |
| 表达式图（Seed→Base→Map→Alias + dark 属性块 + §8.2 mobile 清单） | `css/theme.css` | ✅ 236 变量，花括号/命名检查通过 |
| 层次入口 / 极小 reset / utility | `css/index.css` `reset.css` `utilities.css` | ✅ `@layer kui-theme < kui-base`；**组件与 utility 不分层**（偏离 v0.3 设计：未分层样式压过任何层，组件若进层会被宿主未分层 reset——tailwind preflight / vitepress base 的 `button{background-color:transparent}`——整条抹掉） |
| themes JS 侧 | `themes/seed.ts` `types.ts` `palette.ts` `create-theme.ts` | ✅ createTheme 冒烟通过（差量声明、键序稳定、SSR 可比对） |
| 色板导出 | `themes/palette.ts` | ✅ oklab 同构实现（p1~p5/p7 比例 = §4.1 系数同源，2026-11-17 修漂 + `drift-check.mjs` 锁定）；`@ant-design/colors` 精确算法未引入，保留为 §4.6 兼容位 |
| 首批组件 | `components/Icon` `Button` `Space` | ✅ KButton 全矩阵样板（部件变量 + 状态局部重声明 + `:is()` 语义同构） |
| 入口与按需 | `index.ts` `resolver.ts`；根 package.json 增 `./vue/ui` 导出 + `sideEffects: ["*.css"]` | ✅ |

落地暴露的待办：
① theme.css ↔ seed.ts 一致性单测（待测试运行器）；② SFC 编译验证未跑（本机 `node_modules` 无 vue，需先修 root 属主再 `npm install`）；
③ WCAG 对比度单测（§7 验收）未跑；④ KResolver 未进业务工程实测；⑤ KConfigProvider 消费弹层组件的 popupContainer 契约验证（随 P2 弹层类组件）；
⑥ 待定项 #1（mix 比例观感校准）需要 playground 矩阵页作为对照载体。

### 13.1 第二批（2026-11-16，P1 组件收官）

| 产物 | 路径（packages/vue/ui/） | 状态 |
| --- | --- | --- |
| 低风险批 | `components/Flex` `Divider` | ✅ Flex 与 CSS 一对一映射；Divider 文本模式用 `::before/::after` 线（无幽灵 DOM），`role="separator"` |
| 文字批 | `components/Typography/{Title,Paragraph,Text}` `Link` | ✅ 字重走新增 `--k-font-weight-base/strong/heading` 别名（theme.css §5）；KText mark 用 `--k-color-warning-bg`，无裸色值 |
| 栅格批 | `css/grid.css`（302 行预编译矩阵）+ `css/gen-grid.mjs`（生成脚本存档）+ `components/Grid/{Row,Col}` | ✅ 列宽 CSS-first；gutter 响应式对象是唯一 JS 运行时展开（useBreakpoint/matchMedia，登记为 §10 例外） |
| 布局批 | `components/Layout/{Layout,Header,Sider,Content,Footer}` | ✅ 尺寸缺省在 CSS（`var(--k-layout-header-height, 64px)` 式回退），prop 显式才落内联，createTheme components 令牌可覆盖 |
| Provider | `components/ConfigProvider/ConfigProvider.vue` + `composables/useKConfig.ts` | ✅ 主题差量经 `<Teleport to="head">` 的 `<style>` 注入（hash 作用域类，绝不内联变量）；合并链 `prop > defaults > token`；`useProps(name, prop, pick)` |
| 入口 | `index.ts`（17 组件 barrel）+ `resolver.ts`（GROUP_FILE 多文件目录映射） | ✅ 语法核对通过；编译验证仍受②阻塞 |

本批新增 token：`--k-font-weight-base(400)/strong(500)/heading(600)`（§5 字重阶梯，供 Typography/Divider 引用）。

### 13.2 第三批（2026-11-17，按压反馈 + 点击波纹 + KApp）

| 产物 | 路径（packages/vue/ui/） | 状态 |
| --- | --- | --- |
| 按压加深校准 | `css/theme.css` 六组 `color<N>-active` 85%→75%；`Button.vue` 各 variant active 同步；default×filled active 原等于基线色（零反馈）→ 20% 破格灰 | ✅（§4.1 校准结论已回写） |
| 点击波纹（antd v5 Wave 对齐→同日调参放慢+跟色） | `Button.vue`：波纹色跟主题（2026-11-17 用户「filled/tonal 波纹与按钮不一致」改判）= 实底/灰底/浅底档 `color-mix(--k-button-bg 60%)` var 间接即时解析换底自动跟随、透明底档 `--k-button-c 24%`；`k-button--waving` box-shadow 0→4px（35% 保持帧）→6.4px 扩散（同日两调：放慢后用户「宽度有点大」再缩 80%）；`theme.css` 新增 `--k-motion-duration-wave(0.6s，用户「太快」由 antd 同值 0.4s 放慢)/--k-motion-ease-wave` | ✅ `prefers-reduced-motion` 关闭；disabled/loading 不触发 |
| KApp 应用根容器 | `components/App/App.vue` + `composables/useKApp.ts`（root 注入，P3 全局反馈宿主打底） | ✅ barrel 已导出；resolver 机械规则覆盖 |
| 导出色板一致性 | `themes/palette.ts` p7 黑比 0.15→0.25（与 active 75% 同构） | ✅ |
| 分割线色切换（用户拍板） | `css/theme.css` `--k-color-split` α0.06→0.15→**0.08 定稿**（独立 token 破格档，不并入 fill ladder） | ✅ |
| 图标集选型（Q1 定稿） | 推荐集 = `@vicons/tabler`（vicons/Tabler，MIT，1518 图标），示例页已换真图标；KIcon 注入模式不变 | ✅ |
| 亮暗联动修复（按压变压暗事故） | `theme.css` `color-scheme` 缺省收回 `:root` 单点声明；ConfigProvider `scheme=auto` 不再抹宿主 `data-k-theme` | ✅ §7 两条硬规则已登记 |

### 13.3 第四批（2026-11-17，演示调优 + KLink 五态 + Button 等级档 + Button 扩展批）

| 产物 | 路径 | 状态 |
| --- | --- | --- |
| KText 渐变调参 | `Typography/Text.vue`：默认色标 `primary-hover→primary-active`（Δ10%→19%）；`gradient` 扩 `boolean \| string` 自定义色标 | ✅ docs 示例加双色/完整 gradient() 组 |
| Button icon-only 居中 | `Button.vue`：空 default 插槽不落 `__content` span（原空项+gap 挤偏图标半格），gap 属性保留 | ✅ 实测 dx/dy=0 |
| KLink 取色五态（自有设计） | `Link/Link.vue`：`type = link/subtle/primary/subtle-primary` + `color` 自定义；subtle 系静置 = 正文字色、hover 进链（同日改判：原 browser 档 UA `revert` 色废弃，机制结论留档 link.md 附录）；类型链双类名修复旧 default/secondary 被 `.k-link:is(a)` 压死的历史 bug | ✅ 实测静置/hover 链全部正确 |
| Button 等级四档 | `Button.vue`：variant 增 `tonal`（4% 灰底、hover/active 破格 8%/12%、语义档灰底彩字；当日由 tertiary 更名，避与 fill 阶梯撞名）；演示收进 variants 矩阵、levels 独立演示删除；映射表见 §9 | ✅ naive 等级区分落地 |
| Button variant 扩 ghost/plain/soft | `Button.vue`：ghost = 透明底档（default×ghost 跟 naive 中性边+正文字）；plain/soft 白底描边族同静置（`bgContainer`），plain 交互变边框+文字、soft 交互底 tint（c 10%/16%）+字变色、边框不动；三家对照拍板（antd ghost 布尔/白边反色、vant plain 按压 tint 均未照抄），进 variant 轴避免组合爆炸 | ✅ 矩阵见 §9；当日再拍板 soft 去边框（见下行） |
| Button border 档 + soft 去边框 | `Button.vue`：新 variant `border` = 透明边框占位、hover/active 现边框色（c 90%/75%，底/字恒静置）；soft 静置边框改 transparent（与有框 plain 分工）；演示矩阵扩九值 | ✅ |
| Button text/quiet 拆分 + dashed 去底 | `Button.vue`：`text` 改纯文字交互（hover/active 只变文字色永不落底，naive 路数，**兼容破坏**：旧灰底观感改名 `quiet` 继承）；default×dashed 静置灰底作废改透明底；演示矩阵扩十值 | ✅ |
| KButtonGroup | `Button/ButtonGroup.vue` + `groupContext.ts`：接壤 -1px 叠边、首尾外侧半径、hover/focus z-index 抬升；size provide/inject 下发（子级自传优先，size 缺省解析链 `props → 组 → md`）、vertical；resolver GROUP_FILE 与 index.ts 出口已登记 | ✅ naive 路线（antd 弃用方案未采） |
| Button props 增量 | `Button.vue`：`iconPlacement start/end`（order 后移，loading 占图标位）、`target`（href 场景透传）；不搬清单理由见 button.md 规格附录 | ✅ |
| Button 波纹开关（antd wave 同款） | `useKConfig.ts` + `ConfigProvider.vue` + `Button.vue`：Provider `:wave="{ disabled: true }"` 全局关（antd ConfigProvider.wave 同款形态，嵌套级联子覆盖父）+ 实例 `wave` prop 强制开/关；合并链 `wave prop > defaults.KButton.wave > !wave.disabled > 开`；波纹形态第三批已落地，同日调参放慢（见上行） | ✅ 事件派发实测 |
| border 文字跟交互 + 波纹跟主题色 | `Button.vue`：border hover/active 补 `--k-button-text-color` 公式（c 90%up/75%down，与 plain 同式）；`--k-button-wave-color` 实底/灰底/浅底档（filled/tonal/soft/quiet）改走 `color-mix(--k-button-bg 60%)` var 间接引用随状态自动跟随，透明底档仍 c 24% | ✅ CSSOM 规则 + computed 链实测 |
| App 端按压形态 = antd-mobile 遮罩（用户拍板「移动端按 antd-mobile 的走」） | `Button.vue` 新增 `@media (hover: none)` 块：波纹 `animation: none` + `::before` 全铺 #000、`:active` 时 opacity .08（0.15s ease，radius inherit）；真触屏判定用 hover:none 而非视口宽；wave 开关在触屏下形同虚设（平台形态豁免）；源码查证：antd-mobile/vant 均为 ::before 遮罩（黑8%/灰10%），「antd-mobile 降 opacity」说法作废 | ⏳ CSSOM 规则实测；触屏按住观感待用户真机确认 |
| 双源防漂移（palette.ts ↔ theme.css，首例漂移当场抓获） | 实测发现 `generateRamp` p1~p3（c 8/15/28%）与 CSS 状态系数 bg/bg-hover/border（10/16/30%）差 Δ2~4，且 palette 注释声称同源——`LIGHT_WHITE_RATIO` 改 [0.9,0.84,0.7,0.55,0.1,0]（p1~p5 与状态系数逐档对齐，p4/p7 原已对）；新增 `themes/drift-check.mjs`（零依赖 Node：解析 theme.css 系数→mixOklab 重建期望色→与色阶逐项比对，含 dark seed 85%↔darkSeedVariant 0.15；kit `pnpm ui:drift-check`）；浏览器 canvas 取色互证 + 负例注入（CSS 12%）红/回滚绿闭环 | ✅ 7/7 绿 + 负例红 |
| R4 矩阵页校准轮收官（待定项 #1/#4 关闭） | 三态徽章（静置渲染值 / hover·active CSSOM 表达式探针，与手算 ±0.04 内吻合）全矩阵 122 格×3 态实测 → **暗色 seed 提亮 15%→8%**（theme.css 六行 85%→92%、`darkSeedVariant` 0.15→0.08，dark 实底链 13 格红线主因；新终值 #3284ff）；hover 90up/active 75down 维持；antd 暗档对照表补入矩阵 tooltip（@ant-design/colors generate dark 换位映射，顺带更正 warning 亮档 active 误抄 #d89614→#d48806） | ✅ drift-check 7/7 绿；dark 列三态复检见矩阵页 |
| R4b 低评分治 A 类：text-strong 彩字深档（用户拍板「只治 A」） | `theme.css` 别名层新增 6 个 `--k-color-N-text-strong`（light 压黑 c 90/70/65/80%，dark 复用 c；比例按 oklab 最低档余量手算）；`Button.vue` 增设部件变量 `--k-button-c-text`（type 块 + default 基线声明，link 型走 link-text-strong），文字通道静态 9 处 + hover/active 表达式 18 处 + default×outlined/dashed 2 处全量改接（边框/底色通道不动） | ✅ 矩阵页独立探针复检：light 静置彩字格全 ≥4.5（badgeMismatch 0），hover 4.3~4.4 黄档留存；dark 列 5 低分格与 R4 后持平（未受影响）；drift-check 7/7 |
| R4c B 类彩底白字「只翻红线格」→ **当日撤销** | 曾落地：`theme.css` `--k-color-text-on-bright` + `Button.vue` `--k-button-c-solid-text`（success/warning 两模式翻深字、danger `light-dark(白,深字)` 分模式），复检红线清零；**用户验收否决「太丑了；主题色是用户定的，拿不准没有 100% 满分」**→ 代码整体回滚（探针复检：实底 10 格回到恒白字原值、mismatch 0、drift-check 7/7） | ⛔ 已撤销，B 类重新登记妥协（见 §4.1/§12#1） |
| 全组件内边距放宽批（用户「内边距显得小气」） | 各组件 padding 统一升一档（+4px，约 25~50%），**只动 padding 不动 gap/margin token 语义、控件高度不变**：Button xs/sm/md/lg = 12/16/20/20（md 缺省改走 `--k-padding-md`，弃 padding-horizontal 15）；Input/Select 触发器 xs/sm·md/lg = 12/16/20，Select 弹层列表上下 4→8、选项/空态横档随触发器；Modal padding 24→28、横 16→24、body 底/footer 顶 16→20、wrap 留白 64/16→80/24（居中 16→20），**限高公式联动** `100vh−size*10`（居中 `100vh−size-md*2`）；Alert 8/12→12/16；Notification/Popover/Popconfirm 12→16；Tooltip 4/12→8/16；Message 8/12→12/16；Radio button 段 12→16。不动：Layout 头脚（已 padding-lg 24）、Typography code/mark（行内语义）、Switch 内部机械 padding、Divider 文字留白、Select tag chip | ✅ 浏览器逐件 computed 实测 + docs 变量表同步 |
