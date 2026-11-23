# K UI 组件库 · 文档总览

> kit 内 Vue 3 双端组件库（`packages/vue/ui/`）的全部规格，随如意技术库文档站维护。目录组织规则见文末「文档准入」。
>
> 侧边栏端侧标记：显示器图标 = PC 端可用；手机图标 = 移动端可用；显示器 + 手机组合图标 = 双端可用。

## 目录

```
/vue/ui/（本站）                # 对应 kit 仓库 packages/vue/ui/ 的实现
├── index.md                   # 本文：总方案决策 + 导航
├── headless.md                # headless 自定义渲染（跨组件机制：双通道/绑定包契约/覆盖表）
├── design/                    # 全局规格（跨组件）
│   ├── language.md            # 设计语言：纯视觉规则（色彩/布局/字体/图标/阴影/动效/数据格式）
│   └── theme-tokens.md        # 主题 token 规格：三层变量模型、CSS-first 派生管线、平台组
├── components/                # 逐组件规格（一组件一文件）
│   ├── index.md               # 全组件共同约定 + 交付顺序
│   ├── config-provider.md     # KConfigProvider 机制规格
│   ├── button.md              # KButton（全库样板，深度最高）
│   ├── icon.md                │ button 前置依赖
│   ├── flex.md                ├── divider.md
│   ├── grid.md (KGrid)        ├── layout.md    ├── typography.md
│   └── link.md
└── templates/                 # 模板：组合好的页面与区块（单文件可复制）
    ├── index.md               # 模板总览与复制约定
    ├── pages/                 # 完整页面（看板/成员/移动端订单）
    └── blocks/                # 页面区块（登录/定价/通知设置）
```

## 总方案决策速记（会话评审定稿，规格细节看各文档）

| 决策 | 结论 | 出处 |
| --- | --- | --- |
| 归属与形态 | `packages/vue/ui/`，源码直引、零构建，沿用 kit 的 `link:` + kitPlugin 模式 | — |
| 主题模型 | Seed→Map→Alias 三层 + 部件变量第四层，前缀 `--k-`；**CSS-first**：派生主路径是 `color-mix(in oklab)` / `light-dark()` / `calc()` 表达式图，JSON/JS 只是编译通道 | theme-tokens §1.0/§3 |
| 暗色 | `light-dark()` + `color-scheme`，天然支持**子树独立亮暗**（`KConfigProvider scheme`）；色 token 禁 `@property` 注册（会把计算值钉死在声明处） | theme-tokens §7、config-provider |
| 外观收敛 | 四轴 `type \| variant \| size \| shape`，缺省走合并链（prop > useKConfig defaults > token）；扩展轴须入表 | components/共同约定 |
| 双端策略 | 一套核心 + 平台标签；尺寸/圆角/动效差全走 mobile token 组（封闭清单）；交互形态不同 → 双形态组件（P2+，如 Select 弹层/抽屉）；组件源码内禁 `isMobile` 判断 | theme-tokens §8 |
| 灵活性 | 组件样式未分层（压过宿主 reset）+ 语义 DOM API（`classNames`/`styles` per-part + `data-part`）+ 部件变量逃逸口，三层递进；业务随时可用未分层样式覆盖 | components/共同约定 |
| headless | 全部视觉组件双通道（`#render` 插槽优先 / `render` prop），整件视觉替换、逻辑经绑定包散播继承；2026-11-18 三件试点后全量铺开 | [headless](./headless.md) |
| 自动导入 | unplugin-vue-components + `KResolver` **按需单文件**解析（永不指向 barrel）；`sideEffects: ["*.css"]` | — |
| Vue 基线 | Vue 3.5+：defineModel / defineOptions / props 解构响应式 / useId / useTemplateRef / defineSlots / 泛型组件优先 | — |
| 主题设计器 | 一个主色 hex → oklab 表达式图自动铺全库；JS antd 色板算法降级为导出辅助/`--static` 兜底/图表 API | theme-tokens §4.6 |
| 组件范围 | antd/naive-ui/vant/antd-mobile 除复杂件外全收录，分 P1（基础 10 组）→ P2（表单/反馈）→ P3（数据展示）→ P4（导航/复杂） | components/共同约定 |
| 模板（Templates） | `templates/` 放页面与区块级组合，单文件 SFC 可直接复制；不新增包导出或抽象层 | [模板总览](./templates/index.md) |

## 代码目录对应关系

```
packages/vue/ui/
├── index.ts          # 库入口（类型/无副作用导出；组件走 KResolver 单文件路径）
├── themes/           # token 的 JS 侧：seed 默认值、oklab 色阶、createTheme（差量注入）
├── css/              # theme.css（表达式图主载体）、reset.css、atoms.css、index.css 入口
└── components/
    └── <Name>/<Name>.vue [+ <name>.css 说明]  # SFC 样式（未分层）
```

## 文档准入

- 组件页 = **使用者文档（何时使用 + 在线示例 + API + 主题定制）+ 规格附录**，一组件一页（参考 antd/naive-ui/vant 结构）；
- 示例源码放 docs 仓库 `docs/vue/ui/examples/<comp>/<demo>.vue`（自包含 SFC，走按需单文件导入），页面内以 `<Demo path="<comp>/<demo>" title desc />` 挂载；
- Demo 代码区高亮（shiki `@shikijs/transformers`，VitePress 同款语法）：源码行尾 `<!-- [!code hl] -->` / `// [!code hl]` 标单行、`[!code focus]` 聚焦（其余行压暗），或 `<Demo lines="3,7-9" />` 属性给行区间；未展开代码前回退纯文本 pre；
- 新组件规格并入对应组件页附录；约定不重复写，链接 [components/index.md](./components/index.md)；
- 跨组件新机制（如响应式、弹层管理）= `design/` 新文件；
- 各文档只写规则与决策，过程讨论不进文档；决策变更在文内「待定项/偏离登记」表更新状态，不另开文档。
