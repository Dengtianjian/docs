# 组件矩阵页（playground）

> P1 交付欠账（[共同约定 §交付顺序](../components/index.md)）：四轴全组合 × 亮暗 × 视口的回归基线。**本页当前为 R1+R2+R3**：主矩阵（type×variant）+ 亮暗双列 + antd 静态参考 tooltip + WCAG 2.x 对比度徽章（三态可切：静置读渲染值；hover/active 走 CSSOM 表达式探针——库内状态规则只重声明 `--k-button-bg/--k-button-text-color`，探针继承现值让 color-mix 真实求值，与手算对照一致）+ 徽章取字色叠底色（≥4.5 绿 / ≥3 黄 / <3 红）+ size×shape 子表（文字钮 4×2 + icon-only 4×2，亮暗列各带一组）+ mobile 375 视口（iframe 走 [matrix-embed](matrix-embed.md) 无 chrome 载体页，kit mobile @media 按真实宽度生效）；**R4 已完成（2026-11-17）**：三态徽章实测全矩阵 → 暗色 seed 提亮 15%→8%（待定项 #4 关闭，结论见 [§4.1/§12](../design/theme-tokens.md)），hover/active 系数维持。**R4b（同日，低评分「只治 A」拍板）**：浅底彩字走 Button `--k-button-c-text`（text-strong 深档，[§4.1](../design/theme-tokens.md)）——复检 light 静置彩字格全 ≥4.5（独立探针与徽章零分歧），hover 4.3~4.4 黄档留存（WCAG 只约束静置）；剩余 light 红线 5 格 = 彩底白字 B 类（success/warning/danger×outlined 系）。**R4c（2026-11-17 当日撤销）**：B 类曾翻深字修红线，用户观感否决（「太丑了；主题色是用户定的，拿不准没有 100% 满分」）→ 已整体回滚，实底 10 格恢复恒白字；本页继续如实显示这些格的低分——**徽章是暴露问题的尺子，不是打分表演**，彩底白字属 seed 用户定的固有暴露面。
>
> mobile 视口边界：宽度类 token（controlHeight 44 / radius 8）iframe 内即生效；`hover:none` 按压形态跟随设备而非窗口，桌面浏览器不切换，属真机/DevTools 模拟项。

<MatrixPlayground />

## antd 对照表说明（静态表 + tooltip）

鼠标悬停矩阵格可见 antd 值。规则与边界：

- **只收可映射组合**：antd v5.21+ `variant`（outlined/dashed/solid/filled/text/link）× `color`（default/primary/danger…）能对上我们的 outlined/filled/dashed/text/ghost/link；**tonal/quiet/soft/plain/border 自创档无对照**（antd 无对应外观机制），tooltip 明说「无对照」；
- **近似（approx）**= 机制不同仅数值可参：如我们 `text` 彩色档走字色跟随语义色，antd text 只有灰字 + 灰底；`filled` 我们分语义淡底档、antd filled 恒灰；
- 数值抄自 ant-design master `components/button/style/{token,variant}.ts` + `themes/{seed,dark/colors}.ts`（2026-11-17），亮档 seed #1677ff；**暗档（R4 已补）= `@ant-design/colors` generate(seed, {theme:'dark'}) 按 dark/colors.ts 换位映射**（token6 静置=colors[5]、token5 hover=colors[6]、token7 active=colors[4]），tooltip 按所在列自动切亮/暗表。修表时发现并更正一处首轮抄录错误：warning 亮档 active `#d89614` → `#d48806`（前者是暗档 p6，串行）；
- tooltip 三元顺序 = 静置 → hover → active；`—`/`transparent` 表示该通道不适用。

系数校准流程（R4 首轮已按此走完）：在本页逐行扫观感 + 三态徽章对照，结论回写 theme-tokens §4.1，改 CSS 系数后必须跑 `pnpm ui:drift-check` 防双源漂移。
