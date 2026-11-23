# 组件规格 · 共同约定与交付顺序

> 上游：[../design/theme-tokens.md](../design/theme-tokens.md)（部件变量机制 §1.1/§9）、[config-provider.md](./config-provider.md)（轴默认值合并链）、[../design/language.md](../design/language.md)（视觉规则）。
> 本文件是 K UI 组件总览与共同约定。P1–P9 共 120 个组件已落地，各批次清单见文末；组件与参考库的权威对照表见 `kit/.ai/COMPONENTS.md`。

## 全组件共同约定（一次性写死，各组件不再重复）

- **命名**：组件 `KXxx`，类名 `k-xxx`，根节点带 `k-xxx k-xxx--{type} k-xxx--{variant} k-xxx--{size}`，状态 `is-disabled / is-loading`；
- **四轴**：`type | variant | size | shape`，值缺省走合并链（prop > useKConfig defaults > token）；
- **尺寸枚举**：全组件统一 `xs | sm | md | lg`（`KSize`，组件按需支持子集），不再使用 `small / medium / large`；间距轴 `KSpaceSize` 例外，额外含 `xxs` 与数字；
- **语义 DOM API**：每组件 props 含 `classNames?: Partial<Record<Part, string>>`、`styles?: Partial<Record<Part, CSSProperties>>`；
  所有部件带 `data-part="…"`，部件清单 = 各组件文档「部件」小节，**DOM 结构即公开 API**；
- **部件变量**：`--k-<comp>-<part?>-<prop>`，初值引用 alias，状态类局部重声明（token 规格 §1.1）；
- **弹层布局**：容器统一四边 `4px` 内容边距；选项左右 `8px`、md 行高 `32px`（sm/lg = 28/36）；日期/时间/颜色面板保留各自单元格规格；Popover/Popconfirm 卡片内边距 `12px`；
- **标题 / 描述**：同时存在时，标题 `14px / 600`，描述 `12px / 次要色`，不再出现同字号同字重；
- **反馈/弹层尺寸**：Tooltip、Popover、Popconfirm、Modal、Message、Notification、Alert 统一 `sm / md / lg`；字号、内边距、标题/描述与内置按钮/关闭钮必须同步缩放；
- **样式文件**：组件样式不包 `@layer`（未分层才压得过宿主未分层 reset，见主题 Token 规格 §12）；
  - 根节点 `box-sizing`、字体、颜色一律从变量来，禁止裸值；
- **a11y 基线**：可交互部件四态齐备（hover/active/focus-visible/disabled）；focus 环 = `box-shadow: 0 0 0 controlOutlineWidth controlOutline`；
  禁用用 `disabled` 属性（原生件）或 `aria-disabled`（合成件）；
- **双端**：组件源码内**零平台判断**（尺寸/圆角/动效差全走 token mobile 组；形态差属 P2+ 双形态组件，P1 没有）；
- **测试基线**：props 快照 + 状态类切换 + 部件变量覆盖生效（引 `--k-button-bg: red` 断言计算样式）+ 亮暗交叉态截图。

## 组件清单（P1）

| 文件 | 组件 | 状态 |
| --- | --- | --- |
| [button.md](./button.md) | KButton | 规格定稿，样板已落地 |
| [icon.md](./icon.md) | KIcon | 规格定稿，已落地（图标集 = **@vicons/tabler**，2026-11-17 Q1 定稿；`component` 注入模式仍可换任意方案） |
| [space.md](./space.md) | KSpace | 规格定稿，已落地 |
| [flex.md](./flex.md) | KFlex | 规格定稿，已落地 |
| [divider.md](./divider.md) | KDivider | 规格定稿，已落地 |
| [grid.md](./grid.md) | KRow / KCol | 规格定稿，已落地（列宽矩阵 `css/grid.css` 由 `css/gen-grid.mjs` 预编译；gutter 响应式 = JS 闭环例外） |
| [layout.md](./layout.md) | KLayout 组 | 规格定稿，已落地（Layout/Header/Sider/Content/Footer） |
| [typography.md](./typography.md) | KTitle / KParagraph / KText | 规格定稿，已落地（省略/可复制等增强行为留 P2） |
| [link.md](./link.md) | KLink | 规格定稿，已落地（静态依赖 vue-router peer，未装 router 的业务全量引入 barrel 时需留意向量） |
| [config-provider.md](./config-provider.md) | KConfigProvider | 规格定稿，已落地（①主题注入 ③scheme ④defaults/popupContainer；弹层组件消费 popupContainer 契约待 P2 验证） |
| [app.md](./app.md) | KApp | 已落地（2026-11-17，对标 antd App：文字 token 继承 + `useKApp().root` 宿主；message/notification/modal 实例随 P2 反馈批接线） |

> 2026-11-17：**P2a 表单批开工**（三拍板）：
>   - DatePicker/Upload 出批留 P2.5
>   - KForm 校验内置 = async-validator 进 dependencies（kit 首个运行时依赖，KForm 落地时声明）
>   - 反馈件只走 useKApp 实例
>
> 首件 **KInput 已落地**：[input.md](./input.md)：
>   - 四轴 size×variant×status×clearable/count/前后缀
>   - iOS 16px 防缩放走根级 `--k-input-font-size` 只消费不重声明
>   - App 端按压遮罩显式豁免

> 2026-11-17：**P2a 表单批收官**（六件全落地，浏览器逐件实测）：
>   - [input-number.md](./input-number.md)：组合 KInput，步进/限幅/精度，文本态数值态分离
>   - [select.md](./select.md)：**首个弹层消费者，popupContainer 契约首验通过**
>     - fixed 定位 + 上翻 + scoped 出口带 scopeClass
>     - 多选标签回显 + Backspace
>   - [checkbox.md](./checkbox.md) / [radio.md](./radio.md)：options/插槽双形态 context 同源
>     - radio button 形态
>     - 半选
>   - [switch.md](./switch.md)：原生 button[role=switch]，on=主色路数
>   - [form.md](./form.md)：**async-validator@4.2.5 已进 dependencies**，装到包级 `packages/vue/ui/node_modules`
>     - 校验下沉 FormItem、Input 族 status 自动下发、validateTrigger blur/change
>
> 表单级 disabled/size、showSearch、warningOnly 语义等留批项见各页规格附录。

## 组件清单（P2a）

| 文件 | 组件 | 状态 |
| --- | --- | --- |
| [input.md](./input.md) | KInput | 已落地（P2a-1） |
| [input-number.md](./input-number.md) | KInputNumber | 已落地（P2a-2，组合件） |
| [select.md](./select.md) | KSelect | 已落地（P2a-3，弹层首消费者） |
| [checkbox.md](./checkbox.md) | KCheckbox / KCheckboxGroup | 已落地（P2a-4） |
| [radio.md](./radio.md) | KRadio / KRadioGroup | 已落地（P2a-4） |
| [switch.md](./switch.md) | KSwitch | 已落地（P2a-4） |
| [form.md](./form.md) | KForm / KFormItem | 已落地（P2a-5，运行时依赖 async-validator） |

> 2026-11-17：**P2b 反馈批开工**（静态件范围拍板 = KAlert + KSpin）：
>   - 弹层定位基座落地（`utils/overlay.ts` 纯函数 12 方位 + 翻转、`composables/usePopup.ts` 定位/出口/外点三合一套件），KTooltip/KPopover/KPopconfirm 为首批消费者
>   - KSelect 后续也已并入同一基座
>   - KModal 双形态（声明式 + `useKApp().modal.confirm`，onOk Promise 语义）
>   - message/notification 实例 API 挂进 KApp context（队列 Holder 常驻 KApp，计时随卸载清理）
>   - 内建图标依赖评估定案：反馈件走内联 SVG（`utils/icons.ts`），不引图标库

## 组件清单（P2b）

| 文件 | 组件 | 状态 |
| --- | --- | --- |
| [tooltip.md](./tooltip.md) | KTooltip | 已落地（P2b-1，弹层基座首消费者） |
| [popover.md](./popover.md) | KPopover | 已落地（P2b-1） |
| [popconfirm.md](./popconfirm.md) | KPopconfirm | 已落地（P2b-1，内嵌 KButton） |
| [modal.md](./modal.md) | KModal + `useKApp().modal` | 已落地（P2b-2，声明式 + 实例双形态） |
| [message.md](./message.md) | `useKApp().message` | 已落地（P2b-3，无模板组件） |
| [notification.md](./notification.md) | `KNotification` + `useKApp().notification` | 已落地（P2b-3，antd v6 对齐：actions/closable/showProgress/pauseOnHover/maxCount/六方位/滚动列） |
| [alert.md](./alert.md) | KAlert | 已落地（P2b-4，静态件拍板范围） |
| [spin.md](./spin.md) | KSpin | 已落地（P2b-4） |

## 组件清单（P3 数据展示）

| 文件 | 组件 | 状态 |
| --- | --- | --- |
| [table.md](./table.md) | KTable | 已落地（P3，排序/筛选/选择/固定列/粘性表头/分页） |
| [pagination.md](./pagination.md) | KPagination | 已落地（P3，Table 内置消费） |
| [virtual-list.md](./virtual-list.md) | KVirtualList | 已落地（P3，固定行高虚拟滚动） |
| [tag.md](./tag.md) | KTag | 已落地（P3） |
| [badge.md](./badge.md) | KBadge | 已落地（P3） |
| [card.md](./card.md) | KCard | 已落地（P3） |
| [empty.md](./empty.md) | KEmpty | 已落地（P3，Table 空态复用） |
| [skeleton.md](./skeleton.md) | KSkeleton | 已落地（P3，Card 加载复用） |

## 组件清单（P4 导航）

| 文件 | 组件 | 状态 |
| --- | --- | --- |
| [breadcrumb.md](./breadcrumb.md) | KBreadcrumb / KBreadcrumbItem | 已落地（P4a） |
| [steps.md](./steps.md) | KSteps / KStep | 已落地（P4a） |
| [tabs.md](./tabs.md) | KTabs / KTabPane | 已落地（P4a） |
| [dropdown.md](./dropdown.md) | KDropdown | 已落地（P4b） |
| [menu.md](./menu.md) | KMenu | 已落地（P4c，含 Sider 折叠联动） |
| [anchor.md](./anchor.md) | KAnchor | 已落地（P4d） |
| [back-top.md](./back-top.md) | KBackTop | 已落地（P4d） |
| [affix.md](./affix.md) | KAffix | 已落地（P4d） |
| [drawer.md](./drawer.md) | KDrawer + `useKApp().drawer` | 已落地（P4e） |
| [navbar.md](./navbar.md) | KNavBar | 已落地（P4f） |
| [tabbar.md](./tabbar.md) | KTabBar | 已落地（P4f） |

> 2026-11-19：**P4 导航批开工**（用户拍板：核心 + 锚点辅助 + Drawer + 移动导航；小件先行；Menu 完整首版）。
> P4a 落地 Breadcrumb / Steps / Tabs；P4b 落地 Dropdown（单层菜单，多级子菜单随 Menu 批补齐）；P4c 落地 Menu（items 递归树、三种模式、Sider 折叠联动、路由）；P4d 落地 Anchor / BackTop / Affix；P4e 落地 Drawer（组件 + 实例 API）；P4f 落地 NavBar / TabBar，P4 导航批全部组件完成。

## 组件清单（P5 补充）

| 文件 | 组件 | 状态 |
| --- | --- | --- |
| [progress.md](./progress.md) | KProgress | 已落地（P5，line/circle/dashboard/steps） |
| [result.md](./result.md) | KResult | 已落地（P5，预设状态 + extra） |
| [rate.md](./rate.md) | KRate | 已落地（P5，半星/清除/自定义字符） |
| [slider.md](./slider.md) | KSlider | 已落地（P5，单值/范围/刻度/垂直） |
| [mentions.md](./mentions.md) | KMentions | 已落地（P5，触发字符/候选过滤） |
| [autocomplete.md](./autocomplete.md) | KAutoComplete | 已落地（P5，本地/异步建议） |
| [timepicker.md](./timepicker.md) | KTimePicker | 已落地（P5，单值/范围/步进） |
| [cascader.md](./cascader.md) | KCascader | 已落地（P5，多级/搜索/多选） |
| [treeselect.md](./treeselect.md) | KTreeSelect | 已落地（P5，搜索/多选级联） |
| [transfer.md](./transfer.md) | KTransfer | 已落地（P5，搜索/全选/移动） |
| [colorpicker.md](./colorpicker.md) | KColorPicker | 已落地（P5，hex/rgb/hsl/透明度） |

> 2026-11-20：**P5 补充批落地**（反馈完整首版 + 高频录入标准完整；移动端沿用现有浮层）。反馈件 Progress / Result；录入件 Rate / Slider / Mentions / AutoComplete / TimePicker / Cascader / TreeSelect / Transfer / ColorPicker。新增纯函数 `utils/time.ts`、`utils/tree.ts`、`utils/color.ts` 并纳入 `pnpm test`。

## 组件清单（P6 基础补齐）

| 文件 | 组件 | 状态 |
| --- | --- | --- |
| [avatar.md](./avatar.md) | KAvatar / KAvatarGroup | 已落地（P6） |
| [list.md](./list.md) | KList / KListItem（KCellGroup / KCell 别名） | 已落地（P6） |
| [collapse.md](./collapse.md) | KCollapse / KCollapseItem | 已落地（P6） |
| [descriptions.md](./descriptions.md) | KDescriptions / KDescriptionsItem | 已落地（P6） |
| [segmented.md](./segmented.md) | KSegmented（ToggleGroup 语义） | 已落地（P6） |
| [field-group.md](./field-group.md) | KFieldGroup | 已落地（P6） |
| [tree.md](./tree.md) | KTree | 已落地（P6） |
| [input-tags.md](./input-tags.md) | KInputTags | 已落地（P6） |

> 2026-11-21：**P6 基础补齐批落地**。新增 8 个组件页与 19 个演示；全部导出接入 barrel 与 KResolver，新增 8 个 DOM 回归测试，合计 DOM 测试 23 个。组件缺口权威表见 `kit/.ai/COMPONENTS.md`。

## 组件清单（P7 数据与导航）

| 文件 | 组件 | 状态 |
| --- | --- | --- |
| [timeline.md](./timeline.md) | KTimeline / KTimelineItem | 已落地（P7，left/right/alternate） |
| [statistic.md](./statistic.md) | KStatistic | 已落地（P7，千分位 + countUp） |
| [image.md](./image.md) | KImage | 已落地（P7，懒加载/失败兜底/复用 KPreview） |
| [chart.md](./chart.md) | KChart | 已落地（P7，零依赖 SVG + `#chart` 插槽） |
| [calendar.md](./calendar.md) | KCalendar | 已落地（P7，date/month + 键盘导航） |
| [carousel.md](./carousel.md) | KCarousel | 已落地（P7，slide/fade + 拖拽/自动播放） |
| [pin-input.md](./pin-input.md) | KPinInput / KPasscodeInput / KPasswordInput | 已落地（P7，粘贴分发/OTP/分组 + 密码预设） |
| [command-palette.md](./command-palette.md) | KCommandPalette | 已落地（P7，模糊搜索 + 热键 + combobox ARIA） |
| [navigation-menu.md](./navigation-menu.md) | KNavigationMenu | 已落地（P7，水平下拉/垂直折叠） |

> 2026-11-21：**P7 数据与导航重新落地**。新增 9 个组件页与 20 个演示；全部导出接入 barrel 与 KResolver，新增 9 个 DOM 回归测试。

## 组件清单（P8 增强件）

| 文件 | 组件 | 状态 |
| --- | --- | --- |
| [context-menu.md](./context-menu.md) | KContextMenu | 已落地（P8，视口夹取 + 键盘导航） |
| [scroll-area.md](./scroll-area.md) | KScrollArea | 已落地（P8，细滚动条 + 阴影） |
| [kbd.md](./kbd.md) | KKbd | 已落地（P8，组合键与平台修饰键） |
| [user.md](./user.md) | KUser | 已落地（P8，头像 + 状态角标） |
| [banner.md](./banner.md) | KBanner | 已落地（P8，四语义 + 操作区） |
| [marquee.md](./marquee.md) | KMarquee | 已落地（P8，无缝循环 + reduced-motion） |
| [splitter.md](./splitter.md) | KSplitter | 已落地（P8，拖拽 + 键盘 + min/max） |
| [qrcode.md](./qrcode.md) | KQRCode | 已落地（P8，零依赖 SVG + Vision 实测解码） |
| [watermark.md](./watermark.md) | KWatermark | 已落地（P8，Canvas 平铺） |
| [masonry.md](./masonry.md) | KMasonry | 已落地（P8，CSS columns 自适应） |
| [tour.md](./tour.md) | KTour | 已落地（P8，高亮 + 自动避让） |
| [float-button.md](./float-button.md) | KFloatButton | 已落地（P8，四角定位 + 菜单） |
| [border-beam.md](./border-beam.md) | KBorderBeam | 已落地（P8，mask 光束） |
| [listbox.md](./listbox.md) | KListbox | 已落地（P8，单选/多选 + 键盘） |

> 2026-11-21：**P8 增强件批落地**。新增 14 个组件页与 28 个演示；全部组件接入 barrel；新增 14 个 DOM 回归测试。KQRCode 为零依赖实现，并用 macOS Vision 对版本 2–8、L/M/Q/H 与中文内容实测解码。

> 2026-11-19：**P3 数据展示批开工**：
>   - 表格基座抽纯函数到 `utils/table.ts`（取值/排序/筛选/分页/固定列偏移），分页序列 `utils/pagination.ts`、虚拟窗口 `utils/virtual.ts` 同步纳入 `pnpm test`
>   - KTable 首版支持排序、筛选、行选择、固定列、粘性表头、客户端分页、空态/加载与 summary 插槽
>   - KVirtualList 独立承接固定行高虚拟滚动，暂不并入 Table

## 交付顺序与依赖

```
themes 全套 + css/theme(reset/layer/utility) → KIcon → KButton（样板，验证部件变量机制）
  → KSpace/KFlex/KDivider（低风险批）→ Typography/KLink → KRow/KCol → KLayout → KConfigProvider(①③④)
```

> 2026-11-17：矩阵页 **R1~R4 全收官**（[playground/matrix](../playground/matrix.md)）：
>   - type×variant 主矩阵 + 亮暗双列 + antd 亮暗双表 tooltip + WCAG 2.x 三态徽章 + size×shape 子表 + mobile 375 iframe
>   - R4 校准结论：dark seed 提亮 15%→8%，其余系数维持，见 theme-tokens §4.1/§12

> 2026-11-17：**KModal API 精简（破坏性，用户拍板）**：弹窗**不预设按钮**——
>   - footer 改纯 `#footer` 插槽驱动（不传插槽不渲染页脚），删除内置确定/取消钮及 `okText/cancelText/okType/okCancel/confirmLoading/footer` props
>   - **去掉 `onOk`/`ok` 事件**（含 Promise loading 语义 `runModalOk`）
>   - **`cancel`→`close`**（声明式 `close` 事件、实例 `onClose`，与 `open` 对称）
>   - **移除 `confirm` 方法**，实例 API 留 `open + info/success/error/warning`
>   - 功能型弹窗 `closable/maskClosable` 默认开，关闭统一 X/蒙层/Esc
>
> 需要操作钮由业务在 footer 插槽或 content 自绘（`handle.destroy()` 关）。[modal.md](./modal.md) 与演示同步（confirm 演示改名 functional）。

> 2026-11-17：**反馈批缺陷修**：
>   - KTooltip 补 `content` prop / `#content` 插槽（`title` 保留 antd 别名，优先级 content > title，四通道皆空不弹泡）
>   - KNotification 修长列表压扁且不可滚——flex 列子项 `flex-shrink: 0` 钉自然高度，Holder 逐列溢出检测加 `is-scrollable`（细轨滚动条 + 整列恢复交互，未溢出列仍 pointer-events:none 不挡页面）

> 2026-11-17：**KModal 九宫格改判（破坏性，用户拍板）**：九宫格语义 = **屏幕落位**而非动画原点——
>   - 新增 `placement` 九值（缺省 top；wrap flex 九宫格对齐，缘距上/下 80、左/右 24、center 20，中排限高 100vh−40）
>   - **删 `centered`**（并入 `placement='center'`）
>   - **删 `transformOrigin` prop**（原请求口误误建；zoom 动画原点留 source > 自动 pointer > 中心链 + `--k-modal-transform-origin` CSS 通道，与落位互不干涉）
>   - 类型导出 `KModalTransformOrigin`→`KModalPlacement`
>   - origin 演示改名 placement

> 2026-11-17：**KSelect 增强批 + popupContainer 契约改判（用户拍板）**：Select 七项——
>   - 选项行高改判**触发器 −4**（尺寸变量随 Teleport 弹层注入，修 38px 行压 32px 触发器）
>   - 展开动画改**顶→底 scaleY** 并补离场（上翻镜像）
>   - **popupContainer 改判 antd getPopupContainer 同款**：指定容器 = 弹层 absolute 进容器文档流（随内容滚/被裁切/static 自动补 relative），缺省 body 保持 fixed+跟随，**Select/Tooltip/Popover/Popconfirm 四件同改**（`usePopupFrame` 基座）
>   - 新增 filterable/filter/tag/maxTagCount(number+responsive)/hideSelected/分组 options/七插槽（prefix/suffix/label/option/header/footer/empty）/search+scroll 事件
>   - 类型补 `KSelectGroup`

> 2026-11-18：**弹层插槽语义改判（破坏性，用户拍板 naive 同款）**：
>   - Tooltip/Popover/Popconfirm/Modal 四件统一 **`#trigger` 包触发元素、默认插槽 = 显示内容**（三弹层旧「默认插槽 = 触发器」用法失效，demo/文档全同步）
>   - 删 Tooltip `#content`/`#title`、Popover `#content` 纯别名插槽，`content`/`title`/`description` prop 保留兜底（默认插槽优先），Popover `#title`、Popconfirm `#title`/`#description` 部件插槽保留（Popconfirm 默认插槽 = 文案整块覆盖）
>   - **KModal 补自管开合**：不传 `open` = 组件自管（trigger 点击开、X/蒙层/Esc 关），传 `open` = 受控照旧
>   - Select 溢出 +N 的内部 Tooltip 用法同步迁移

> 2026-11-18：**headless 自定义渲染试点（Divider/Tooltip/Select 三件）**：
>   - `#render` 作用域插槽（优先）+ `render` 闭包 prop 双通道，提供任一即**整件视觉输出替换**（Teleport/Transition/包裹层自绘），script 逻辑照跑、**绑定包（attrs/on/ref）散播才继承**
>   - scope 类型 `KDividerRenderScope`/`KTooltipRenderScope`/`KSelectRenderScope` 与 `KRenderFn`/`onProps`（h() 事件包转 onXxx）入口导出
>   - Select `dropAttrs` 不含视觉壳类（作用域类/主题/定位随包走）
>
> 验证后再铺其余组件。

验收：playground「组件矩阵页」（四轴全组合 × 亮暗 × pc/mobile 视口）+ 主题设计器最小版（改 seed 全页联动）——
矩阵页即后续所有批次的回归基线，P1 建成是硬要求。

## 组件清单（P9 移动端专项）

| 文件 | 组件 | 状态 |
| --- | --- | --- |
| [action-sheet.md](./action-sheet.md) | KActionSheet / KShareSheet | 已落地（P9，列表 + 宫格） |
| [picker.md](./picker.md) | KPicker / KPickerView | 已落地（P9，滚轮吸附 + 键盘） |
| [pull-to-refresh.md](./pull-to-refresh.md) | KPullToRefresh | 已落地（P9，触摸/鼠标下拉） |
| [infinite-scroll.md](./infinite-scroll.md) | KInfiniteScroll | 已落地（P9，IntersectionObserver） |
| [swipe-cell.md](./swipe-cell.md) | KSwipeCell / KSwipeAction | 已落地（P9，左右滑操作） |
| [search-bar.md](./search-bar.md) | KSearchBar | 已落地（P9，清空/取消/回车） |
| [notice-bar.md](./notice-bar.md) | KNoticeBar | 已落地（P9，滚动/关闭/链接） |
| [index-bar.md](./index-bar.md) | KIndexBar / KIndexAnchor | 已落地（P9，锚点 + 气泡） |
| [side-bar.md](./side-bar.md) | KSideBar | 已落地（P9，角标 + 键盘） |
| [number-keyboard.md](./number-keyboard.md) | KNumberKeyboard | 已落地（P9，自绘数字键盘） |
| [floating.md](./floating.md) | KFloatingBubble / KFloatingPanel | 已落地（P9，吸附与悬浮面板） |
| [submit-bar.md](./submit-bar.md) | KSubmitBar / KActionBar | 已落地（P9，底部操作条） |
| [count-down.md](./count-down.md) | KCountDown / KRollingText | 已落地（P9，倒计时 + 滚动数字） |
| [popup.md](./popup.md) | KPopup / KCenterPopup | 已落地（P9，五向弹层） |
| [safe-area.md](./safe-area.md) | KSafeArea | 已落地（P9，env 安全区） |
| [signature.md](./signature.md) | KSignature | 已落地（P9，Canvas 签名） |

> 2026-11-21：**P9 移动端专项落地**。新增 16 个文档页与 22 个演示，26 个组件 / 子组件接入 barrel 与 KResolver；新增 20 个 DOM 回归测试。移动端专属项在侧边栏带手机图标。

