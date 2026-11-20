# KTable 表格

> 共同约定见 [共同约定](./index.md)。P3 数据展示批核心件。列驱动表格：排序、筛选、行选择、固定列、粘性表头与分页。

## 何时使用

- 结构化数据展示与轻量交互（排序、筛选、选择）；
- 需要固定首尾列、横向滚动或粘性表头。

## 代码演示

<Demo path="table/basic" title="基础表格" :desc="['`columns` + `data-source` + `row-key` 即可渲染。', '默认按 `dataIndex` 取值展示；`align` 只作用于表体，表头统一左对齐。']" />

<Demo path="table/sizes" title="三种尺寸" :desc="['`size` 三档：sm 紧凑（8×12）、md 默认（12×16）、lg 宽松（16×20）。', '只影响单元格密度，不影响分页器与空态尺寸。']" />

<Demo path="table/header-group" title="表头分组" :desc="['列的 `children` 生成多级表头：分组列 `colspan` 覆盖叶子数量，叶子列 `rowspan` 补齐层高。', '排序与筛选只挂在叶子列上。', '组合限制：分组跨固定与非固定边界时整组不参与吸边，需把分组整体放在同侧固定区。']" />

<Demo path="table/header-group-sort" title="分组表头 + 排序/筛选 + 滚动" :desc="['多级表头里同时放可排序列与带筛选项的列。', '配合横向滚动、粘性表头、左右固定列观察图标与吸附稳定性。', '组合限制：固定列必须连续；分组跨边界时该组退回非吸边。']" />

<Demo path="table/slots-header" title="插槽 · 自定义列头" :desc="['`#columnHeader` 同时作用于分组列与叶子列，可补单位、列数等说明。', '自定义内容仍在排序按钮内部，点击排序、筛选面板与 `aria-sort` 不受影响。']" />

<Demo path="table/expandable" title="可展开行" :desc="['配合 `#expanded` 插槽出现 44px 展开列。', '`v-model:expandedRowKeys` 受控，`defaultExpandAll` 默认全展开，`rowExpandable` 指定可展开行。', '组合限制：固定行不显示展开按钮；树形模式改用首列箭头，不再占独立展开列。']" />

<Demo path="table/expand-component" title="行展开 · 组件渲染" :desc="['`expandedRender` 返回 `h(组件)`：展开内容是真实组件实例，带 props 与本地状态。', '示例点「标记关注」在组件内部计数。', '某行返回 `undefined` 时回退 `#expanded` 插槽。']" />

<Demo path="table/expand-slot" title="行展开 · 插槽渲染" :desc="['`#expanded` 插槽拿到 `{ row, index, rowKey }`，可直接用模板写结构化内容。', '与 `expandedRender` 可按行混用：函数优先，`undefined` 回退插槽，`null` 视为空内容。']" />

<Demo path="table/nested" title="嵌套子表格" :desc="['展开行里再放一张 KTable：子表拥有自己的列、排序、选中态与汇总行。', '父子表的排序与状态互不影响；展开行高度按子表实际内容自适应。', '组合限制：父表启用 `spanMethod` 时展开内容会挂到合并组末尾，子表仍按原始行数据渲染。', '组合限制：子表若再用固定列或虚拟滚动，需要自己的数字 `scroll.x` / `scroll.y`，不要复用父表容器高度。']" />

<Demo path="table/tree" title="树形数据" :desc="['`tree` 把 `children` 展开为子行：缩进与箭头在首个可见数据列，不再单独占 44px 展开列。', '展开状态与行详情共用 `expandedRowKeys`；筛选保留命中行祖先链并强制展开。', '组合限制：不与 `spanMethod` 的固定行数合并混用，rowSpan 必须按当前展开后的可见行计算；层级列通常无需纵向合并。', '组合限制：`rowPinning` 只能固定顶层扁平行，固定带子节点的行后子树不再展示；分页切的是可见扁平行，父子可能跨页。']" />

<Demo path="table/tree-virtual" title="树形 + 虚拟滚动" :desc="['1060 行三级数据同时开启 `tree` 与 `virtual`。', '展开/收起只改变窗口行并重建前缀和，快速滚动主体与固定列不会错行。', '组合限制：同样避开固定行数合并与固定带子节点的行；合并需按可见行计算。']" />

<Demo path="table/span" title="单元格合并" :desc="['`spanMethod` 按行与列返回 `rowSpan` / `colSpan`，覆盖格自动不再渲染。', '左右固定列浮层与主表共用同一份合并计划。', '组合限制：合并跨越左/右固定区与中区时无法用浮层承载，整表退回粘性单元格模式并在 dev 告警。']" />

<Demo path="table/span-basic" title="合并 · 纵向" :desc="['只有 rowSpan：部门列按连续相同值合并。', '其余列逐行显示，用于检查行高、行分隔线与斑马纹。', '组合限制：rowSpan 必须按当前可见行计算，与树形展开、筛选、分页组合时不能写死行数。']" />

<Demo path="table/span-colspan" title="合并 · 横向" :desc="['只有 colSpan：里程碑行把两列合成一个说明格。', '不改变行高，可与虚拟滚动、变量行高叠加。']" />

<Demo path="table/span-cross-region" title="合并 · 跨固定区（退回粘性）" :desc="['合并起点在左固定列、覆盖到中区时，一张浮层表无法承载跨表单元格。', '整表退回粘性单元格模式并在 dev 告警。', '组合限制：这是降级路径，不推荐混用；固定列的抗抖动与性能会相应回退。']" />

<Demo path="table/span-expand-bottom" title="合并 · 展开内容挂在组尾" :desc="['`expanded-placement` 设为 `bottom`：展开内容追加到所属合并组的末尾整行（跨全部列），不是整表底部。', '同一组多行展开按展示顺序追加，部门合并保持生效。', '组合限制：未传 `spanMethod` 时 `bottom` 回退 `inline` 并 dev 告警。']" />

<Demo path="table/span-expand-component" title="合并 · 展开（组件渲染）" :desc="['合并 + `expandedRender` 返回 `h(组件)`。', '同组成员 2、3 都展开时，内容按行序追加到研发部组尾。', '「标记完成」切换组件内部状态。']" />

<Demo path="table/span-expand-slot" title="合并 · 展开（插槽渲染）" :desc="['合并 + `#expanded` 插槽，未显式传 `expandedPlacement`。', '检测到 rowSpan 时自动按组尾追加；插槽作用域仍是原始行数据。']" />

<Demo path="table/span-expand-mixed" title="合并 · 展开（按行混用）" :desc="['同一张表按行选择渲染方式：成员 2 由 `expandedRender` 返回 `h()` 节点，成员 3 返回组件，成员 5 返回 `undefined` 回退插槽。', '三块内容各自追加到所属合并组尾部。']" />

<Demo path="table/span-virtual" title="合并 · 虚拟滚动（colSpan）" :desc="['400 行 + 虚拟滚动 + 横向合并（colSpan）。', 'colSpan 不改变行高，虚拟窗口保持生效。']" />

<Demo path="table/span-states" title="合并 · 斑马纹 / 边框 / 固定行" :desc="['合并与斑马纹、外框/行线/列线、固定行同时出现。', '固定行不参与合并；合并格底色跟随起始行，被覆盖行 hover 不点亮合并格。']" />

<Demo path="table/column-visibility" title="列显隐" :desc="['`columnSetting` 显示内置「列设置」按钮。', '`v-model:columnVisibility` 可受控；`hidden` 静态隐藏，`hideable: false` 锁定列。', '组合限制：分组列不可单独隐藏；至少保留一列可见。']" />

<Demo path="table/column-layout" title="列拖拽 / 列宽拖拽" :desc="['拖动表头左侧抓手换位；拖动右边缘改列宽：左拖缩窄、右拖挤右邻列，末列拖动让表格变宽。', '`v-model:columnOrder` / `v-model:columnWidths` 受控；双击表头或右缘把手按容器宽度重新分配列宽（填满表格、消除空隙）；`columnResizable` 会切为固定布局。', '组合限制：不跨固定侧换位，左/右浮层列只在各自一侧内移动。']" />

<Demo path="table/column-layout-group" title="列拖拽 · 固定列与跨分组" :desc="['左/右固定列的表头在浮层里也能拖，`columnDraggable` 在两侧都对抓手生效。', '把列拖到其它分组的列旁会并入该分组，拖到顶层列旁则回到顶层；拖拽时目标分组表头加深，落到顶层时目标列头顶部出现落点线。', '分组归属走 `v-model:columnGroups`（叶子 key → 分组 key 路径）。', '组合限制：固定侧不同的列不能互换；分组只剩空壳时自动消失。']" />

<Demo path="table/bottom-scrollbar" title="吸底横向滚动条" :desc="['`bottomScrollbar` 在表格下方渲染常驻横向滚动条，拖动条或滚动表体双向同步。', '页面继续下滚时滚动条贴在视口底部，宽表不用滚到表尾才能横向拖动；固定列与浮层照常工作。', '组合限制：只在表格真实横向溢出时出现；卡片模式不渲染；设了 `scroll.y` 时不额外渲染，使用容器底部的原生横向条。']" />

<Demo path="table/header-position" title="表头位置 · 顶部 / 底部" :desc="['`headerPosition` 控制表头渲染在数据行上方还是下方；表头在底部时汇总行仍在其上方。', '`sticky` 跟随位置：表头在底部时吸在滚动容器底部，多级表头整块悬浮。', '组合限制：卡片模式不渲染表头；表头沉底依赖表格行组渲染顺序，分页器仍固定在表格外。']" />

<Demo path="table/header-bottom-combo" title="表头沉底 · 交互与组合" :desc="['底部表头叠加多级表头、左右固定列、选择/展开列、固定行、汇总行、排序/筛选与列拖宽。', '筛选面板在底部表头下改为向上展开；选择/展开列的整组表头贴住容器底部。', '组合限制：固定列的表头在浮层里拖拽可用，拖宽把手仍只在主表表头；卡片模式不渲染表头。']" />

<Demo path="table/page-sticky" title="页面级吸顶表头" :desc="['`pageSticky` 在页面滚动时把表头吸在视口顶部，不需要 `scroll.y`。', '`pageStickyOffset` 可避开站点顶栏；多级表头整块吸顶。', '组合限制：依赖 CSS sticky，表头到页面根之间若有 `overflow: hidden` 祖先会被阻断（`overflow: clip` 不阻断；自定义滚动容器则吸在该容器顶部）；检测到 `scroll.x` / `scroll.y` 时忽略并 dev 告警（`scroll.y` 请用 `sticky`）。']" />

<Demo path="table/page-sticky-bottom" title="页面级悬浮 · 底部表头" :desc="['表头沉底后再开 `pageSticky`：页面滚动时表头贴在视口最底部，默认不留间距；需要间距时用 `pageStickyOffset`（按底边计算）。', '不需要 `scroll.y`；多级表头整块悬浮，汇总行保留在表头上方。', '组合限制：与顶部吸顶相同，要求没有 `scroll.x` / `scroll.y`；祖先 `overflow: hidden` 会阻断。']" />

<Demo path="table/load-more" title="滚动到底加载" :desc="['滚动到距底部 `reachEndThreshold`（默认 40）时发一次 `reachEnd`，离开阈值两倍后重新武装。', '`loadingMore` 为 true 时不再触发，加载指示以胶囊悬浮在表格内部底边上方，与底边保留间距；数据追加后自动重新武装。', '组合限制：需要 `scroll.y` 形成内部滚动；卡片模式与无内部滚动时不会触发。']" />

<Demo path="table/stacked" title="响应式卡片堆叠" :desc="['`stackBreakpoint` 按视口断点自动切卡片（档位或像素），`stacked` 可手动强制。', '卡片字段自动生成：第一个非副标题列作标题，其余「标签：值」；列上 `stack: false` 隐藏、`stack: title / subtitle` 指定标题与副标题。', '选择、展开详情、行操作、单元格编辑与 `rowClick` 在卡片内继续可用；展开内容渲染在卡片内部；`#card` 插槽可整体替换卡片主体。', '组合限制：卡片模式不渲染表头，列筛选收进工具条「筛选」；列宽 / 列拖拽、行拖拽、单元格合并在卡片下不适用，固定行按普通卡片显示；`virtual` 可用（需 `scroll.y` 形成内部滚动）。']" />

<Demo path="table/stacked-virtual" title="卡片 · 大列表虚拟化" :desc="['400 张卡片同时开启 `stacked` 与 `virtual`：按实测卡片高度做前缀和，只渲染可视窗口。', '卡片高度差异来自备注换行；测量后自动锚定滚动位置，长短卡片混排不跳动。', '工具条「筛选」汇总所有可筛选列，卡片模式无需表头即可筛选。', '组合限制：同样需要 `scroll.y` 形成固定高度容器；阈值沿用 `virtualThreshold`，固定行按普通卡片参与窗口。']" />

<Demo path="table/stacked-tree" title="卡片 · 树形" :desc="['树形与卡片叠加：箭头保留在标题里，子行展开后以卡片接在父卡片下方，子卡按层级缩进。', '组合限制：固定带子节点的行、按固定行数合并仍不适用，与表格模式的树形限制一致。']" />

<Demo path="table/stacked-tree-nested" title="卡片 · 多级子树" :desc="['四级子树演示：每层子卡按 16 / 32 / 48px 递进缩进，箭头保留在标题内。', '收起中间层会隐藏整棵子树；展开/收起只重建卡片列表，不影响其他分支。', '组合限制：子树走同一份卡片虚拟窗口（需 `scroll.y`），超大子树仍建议配合分页或按层懒加载。']" />

<Demo path="table/stacked-expanded" title="卡片 · 展开自定义详情" :desc="['`expandedRender` 返回自定义组件，展开区渲染商品明细、收货地址与交互按钮。', '展开内容在卡片内部、字段之后、操作之前；组件内部状态随该卡片的展开实例保留。', '组合限制：自定义内容高度按内容自适应并计入卡片实测高度，超长内容建议自控高度。']" />

<Demo path="table/stacked-custom" title="卡片 · 自定义内容" :desc="['`#card` 插槽整体替换卡片主体，可自由排版金额、状态与操作。', '选择与展开控件由表格渲染在插槽上方，交互状态与表格模式共用。']" />

<Demo path="table/ellipsis" title="省略与提示" :desc="['`ellipsis` 单行截断。', '加 `ellipsisTooltip` 后仅在真实溢出时用 KTooltip 显示全文。', '组合限制：存在省略列时表格自动切换为固定布局，建议同时给列宽。']" />

<Demo path="table/sort-filter" title="排序与筛选" :desc="['列 `sortable` 点击循环：升序 → 降序 → 取消。', '`filters` 在表头展开多选面板，`filterMultiple=false` 为单选。', '排序与筛选可叠加；树形下排序只作用于同级。']" />

<Demo path="table/global-filter" title="全局搜索" :desc="['工具条搜索框绑定 `v-model:global-filter`，默认按可见叶子列的文本包含匹配。', '与列筛选、排序、分页叠加；树形下命中行的祖先链同样保留并展开。', '组合限制：自定义匹配用 `globalFilterMethod`；默认文本单元格高亮命中片段，自定义 `render` 不处理。']" />

<Demo path="table/slots-toolbar" title="插槽 · 工具条筛选与操作区" :desc="['`#filter` 放左侧筛选区，`#toolbar` 放右侧操作区，位于内置列设置按钮之前。', '工具条搜索仍用 `searchable` + `v-model:global-filter`；自定义筛选可自行驱动 `dataSource`，再叠加搜索。', '组合限制：插槽只负责布局，筛选与导出逻辑由业务实现；卡片模式下工具条仍可用，但列设置入口隐藏表头时无意义。']" />

<Demo path="table/selection" title="多选" :desc="['`rowSelection` 默认 checkbox 多选，开启当前页全选。', '`getCheckboxProps` 禁用不可选行，`selectionChange` 回传 keys 与行数据。', '翻页不会清掉已选 key；需要表头一次选完所有页时用 `selectAllScope: all`，见「跨页选择」。', '组合限制：默认全选只作用于当前页；树形选择不级联。']" />

<Demo path="table/selection-single" title="单选" :desc="['`rowSelection.type` 设为 `radio` 切换单选：表头不再出现全选。', '点击只保留一个 key，禁用行同样通过 `getCheckboxProps` 控制。']" />

<Demo path="table/selection-cross-page" title="跨页选择" :desc="['`rowSelection.selectAllScope` 设为 `all` 后，表头全选覆盖当前筛选/排序结果的**所有分页**，表头勾选态与半选态按全局计算。', '翻页、改每页条数都会保留已选 key；本演示用受控 `selectedRowKeys`，勾选几行后翻页仍在。', '全选后再取消单行，表头转半选；「清空」只重置受控数组。', '组合限制：`rowPinning` 固定行不参与表头全选；树形不级联；被筛选掉的行仍保留在已选 keys 中。']" />

<Demo path="table/row-actions" title="行操作" :desc="['列配 `actions` 生成图标按钮，超出 `maxActions` 的收进竖向点下拉菜单；`icon` 内置 view / edit / copy / remove / more。', '`#actions` 插槽渲染在按钮之前，与按钮同一 flex 行垂直居中，可放状态标签等。', '`danger`、`disabled`（布尔或按行函数）与 `onClick`；点击不会触发 `rowClick`。', '组合限制：操作列是普通列，固定、宽度、分组规则与其他列一致。']" />

<Demo path="table/row-drag" title="行拖拽" :desc="['按住第一列行抓手拖动，浮层副本跟随指针，蓝色线条标示落位，不插入占位行。', '松手发 `rowReorder`（`from` / `to` 为当前页展示序），业务按需重排 `dataSource`，组件不改数据。', '组合限制：固定行不可拖动；分页 / 排序 / 筛选后按当前展示序返回。']" />

<Demo path="table/cell-edit" title="单元格编辑" :desc="['列配 `editable`，`editTrigger` 决定单击 / 双击 / 手动进入，编辑态走 `v-model:editingCell`。', '默认渲染 KInput：Enter / blur 提交、Esc 取消；提交只发 `cellEdit`，不直接改数据。', '自定义控件用列的 `editRender`；同一时间只编辑一个单元格，固定列浮层与主表共用同一编辑态。']" />

<Demo path="table/cell-edit-height" title="编辑 · 自定义控件行高" :desc="['备注列用两行 textarea + 按钮作为 `editRender`，列上 `editHeight: 104` 让可编辑行提前按较高控件预留。', '进入 / 退出编辑行高不变，表格不会上下跳；⌘/Ctrl+Enter 或「提交」写回，Esc 或「取消」放弃。', '组合限制：`editHeight` 只影响有 `editable` 列的行；多个可编辑列取最大预留值。']" />

<Demo path="table/fixed" title="固定列 + 粘性表头" :desc="['`fixed` 取 `left` / `right`，需配合数字 `width`。', '`scroll.x` 横向滚动，`scroll.y` 限制高度并让表头吸顶。', '组合限制：固定列需与数字 `scroll.x` 搭配，同侧固定列必须连续。']" />

<Demo path="table/fixed-stacked" title="堆叠固定列" :desc="['同侧多列按 `width` 依次累加偏移。', '选择列 44px 自动计入左侧偏移。', '组合限制：固定列需连续，分组不能同时跨固定与非固定边界。']" />

<Demo path="table/pinned-rows" title="固定行堆叠 × 固定列堆叠" :desc="['`rowPinning` 指定 top / bottom 行，可与左右固定列同时存在。', '固定行不受筛选、排序与分页影响，并从分页总数剔除。', '组合限制：树形下只能固定顶层行，固定带子节点的行后子树不再展示。']" />

<Demo path="table/slots-summary" title="插槽 · 自定义汇总行" :desc="['`#summary` 收到当前展示的 `rows` 与可见叶子列 `columns`，合计、计数都按当前结果计算。', '汇总行沿用表格最低一行的留白与分隔线；表头沉底时汇总行排在表头上方。']" />

<Demo path="table/slots-footer" title="插槽 · 表格页眉与页脚" :desc="['`#header` / `#footer` 渲染在表格上下，独立于表体；插槽本身不带内边距、颜色等样式，保持纯净。', '参数与 `#summary` 一致（`columns` / `rows`），间距与布局由插槽内容自己控制。', '组合限制：页眉页脚在横向滚动容器外，不跟随表体横向滚动；需要与列对齐的合计请用 `#summary`。']" />

<Demo path="table/virtual" title="虚拟滚动（千行）" :desc="['`virtual` 开启后只渲染可视窗口，主体与左右固定列浮层共用同一窗口。', '行高按实测缓存写入前缀和；展开行同样计入窗口与占位高度。', '组合限制：需要 `scroll.y` 形成固定高度容器；固定行始终渲染、不参与窗口裁剪。']" />

<Demo path="table/virtual-variable" title="虚拟滚动 · 不定高" :desc="['1000 行里混有多行摘要，行高按实测缓存写入前缀和。', '未测量行用 `virtualRowHeight` 估算，测量后自动滚动锚定。', '组合限制：不传 `virtualRowHeight` 时取已测行平均值，滚动条总高随测量逐步收敛。']" />

<Demo path="table/virtual-span" title="虚拟滚动 · 跨行合并" :desc="['1000 行按 4 行一组纵向合并部门列。', '窗口自动上探合并起始行、下探覆盖末行，滚到组中间也不会空白。', '组合限制：合并组越大，单窗口渲染行越多（实测 24–32 行）。']" />

<Demo path="table/virtual-mixed" title="虚拟滚动 · 不定高 + 合并" :desc="['每组 8 行：部门 rowSpan、会议行 colSpan，同时含单行与多行内容。', '变量行高与合并窗口扩张同时生效。']" />

<Demo path="table/virtual-fixed" title="虚拟滚动 + 固定行 / 固定列 / 吸顶表头" :desc="['千行数据使用虚拟滚动，同时开启 `rowPinning`、左右固定列与吸顶表头。', '固定行始终渲染并计入上下占位，主体与浮层共用同一窗口。']" />

<Demo path="table/virtual-expand" title="虚拟滚动 + 展开行" :desc="['千行数据里展开多行详情，展开行高度单独测量后计入虚拟偏移。', '展开/收起重建前缀和；快速滚动时主体与固定列不会错行。', '组合限制：窗口外的展开行按已测平均高度估算。']" />

<Demo path="table/combined" title="综合 · 全能力叠加" :desc="['80 行、每 4 行一组：部门/组号固定左侧，状态/风险固定右侧，中间 9 列。', '部门 rowSpan + 组尾里程碑 colSpan、多级表头、顶/底固定行、虚拟滚动与吸顶表头同时开启。', '组号排序保持整组相邻，进度/评分为组内排序，部门筛选按整组过滤。', '组合限制：跨固定区合并会整表退回粘性；展开内容追加到组尾并计入虚拟窗口。']" />

<Demo path="table/tree-combined" title="综合 · 树形 × 固定列 / 合并 / 虚拟" :desc="['88 行三级树 + 顶/底固定汇总行：固定列、多级表头、吸顶表头与虚拟滚动照常工作。', '「批次」列 rowSpan 按当前可见行实时计算（团队行 + 已展开成员），收起团队或筛选「状态」后合并同步重算。', '里程碑行横向合并任务与备注。', '组合限制：固定行只放扁平汇总行；固定带子节点的行会导致子树不展示。']" />

<Demo path="table/pagination" title="分页" :desc="['`pagination` 传对象开启底部 KPagination（可配每页条数、跳转、总数）。', '`v-model:current` / `v-model:page-size` 可受控。', '组合限制：分页切片作用于当前可见行，树形下父子可能被切到两页。']" />

<Demo path="table/pagination-position" title="分页位置" :desc="['`paginationPosition` 六选一：左上 / 中上 / 右上 / 左下 / 中下 / 右下，默认右下。', '`both` 上下各渲染一份并统一右下对齐。']" />

<Demo path="table/states" title="加载 / 空态 / 斑马纹 / 汇总" :desc="['`loading` 遮罩、`empty-text` 与 `#empty`。', '`striped`、`bordered`、汇总行均可用开关切换。', '`#summary` 渲染表尾汇总。']" />

<Demo path="table/empty" title="自定义空态" :desc="['`#empty` 插槽接收 `columns`，通常放 KEmpty。', '用 `#actions` 提供引导操作。']" />

<Demo path="table/borders" title="边框开关" :desc="['`bordered` 控制外框，`row-borders` 控制行分隔线，`column-borders` 控制列分隔线。', '不传 `column-borders` 时跟随 `bordered`，可组合出仅横向、仅纵向或无边框样式。']" />

## API

### Props

基础渲染、边框、尺寸与工具条部件。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 列定义 | `KTableColumn<T>[]` | — |
| dataSource | 数据 | `T[]` | — |
| rowKey | 行 key：字段名或函数 | `string \| (row, index) => string \| number` | `'id'` |
| size | 密度 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| bordered | 外框与圆角 | `boolean` | `true` |
| rowBorders | 行分隔线 | `boolean` | `true` |
| columnBorders | 列分隔线；不传时跟随 `bordered` | `boolean` | `bordered` |
| striped | 斑马纹 | `boolean` | `false` |
| sticky | 表头吸顶（需配合 `scroll.y`） | `boolean` | `false` |
| loading | 加载遮罩 | `boolean` | `false` |
| emptyText | 空态文案 | `string` | `'暂无数据'` |
| scroll | `{ x, y }` 横向滚动宽度 / 纵向高度 | `{ x?: number \| string; y?: number \| string }` | — |
| rowDraggable | 行拖拽排序（发 `rowReorder`，不改数据） | `boolean` | `false` |
| columnDragMode | 列拖拽触发：`handle` 仅抓手 / `press` 表头任意处 | `'handle' \| 'press'` | `'handle'` |
| rowDragMode | 行拖拽触发：`handle` 仅行抓手 / `press` 按住行任意处 | `'handle' \| 'press'` | `'handle'` |
| classNames | 部件类名<br>（`root / header / toolbar / columnSetting / wrap / fixedLayer / row / filterPanel / loading / stack / scrollbar / loadMore / footer / pagination`） | `Partial<Record<Part, string>>` | — |
| styles | 部件内联样式<br>（`root / toolbar / columnSetting / wrap / fixedLayer / row / filterPanel / loading / stack / scrollbar / loadMore / pagination`） | `Partial<Record<Part, CSSProperties>>` | — |

<CommonProps />

#### 行选择

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| rowSelection | 行选择配置，详见下方 `KTableRowSelection` | `KTableRowSelection<T>` | — |

#### 排序与筛选

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| sortState | 受控排序；不传走内部状态 | `KTableSortState \| null` | — |
| filters | 受控筛选；不传走内部状态 | `KTableFilterState` | — |
| searchable | 工具条显示全局搜索框 | `boolean` | `false` |
| searchPlaceholder | 搜索框占位文案 | `string` | `'搜索'` |
| v-model:globalFilter | 全局搜索关键字；不传走内部状态 | `string` | `''` |
| globalFilterMethod | 自定义全局匹配 `(row, keyword) => boolean`；缺省按可见叶子列文本包含匹配 | `(row, keyword) => boolean` | — |
| globalFilterHighlight | 全局搜索命中时高亮默认文本单元格；自定义 `render` 内容不处理 | `boolean` | `true` |

#### 列设置与显隐

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columnSetting | 显示内置「列设置」按钮 | `boolean` | `false` |
| v-model:columnVisibility | 列显隐受控表 `{ 列key: boolean }` | `Record<string, boolean>` | `{}` |
| v-model:columnOrder | 列顺序（叶子 key 数组）；不传走内部状态 | `string[]` | `[]` |
| v-model:columnGroups | 跨分组换位（叶子 key → 分组 key 路径）；缺省沿用列定义 | `Record<string, string[]>` | `{}` |
| v-model:columnWidths | 列宽覆盖（叶子 key → px，最小 56）；不传走内部状态 | `Record<string, number>` | `{}` |
| columnDraggable | 拖动表头调整列顺序（可跨分组换位） | `boolean` | `false` |
| columnResizable | 拖动表头右边缘调整列宽 | `boolean` | `false` |

#### 响应式卡片

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| stacked | 强制卡片模式，优先级高于断点 | `boolean` | `false` |
| stackBreakpoint | 视口低于该断点时自动切卡片：<br>档位（`xs / sm / md / lg / xl / xxl`）或像素值 | `KBreakpoint \| number` | — |

#### 展开行

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| expandable | 行展开开关；需配合 `#expanded` 插槽 | `boolean` | `true` |
| defaultExpandAll | 首次挂载时展开全部可展开行 | `boolean` | `false` |
| rowExpandable | 指定行是否可展开 | `(row) => boolean` | — |
| expandedPlacement | 展开内容位置：<br>`inline` 紧随该行；<br>`bottom` 追加到所属合并组的末尾整行（跨全部列）。<br>`bottom` 仅在传 `spanMethod` 时生效；检测到 rowSpan 时自动按组尾追加 | `'inline' \| 'bottom'` | `'inline'` |
| expandedRender | 展开内容渲染函数，返回 VNodeChild（组件 / `h()` / VNode 均可）；<br>对某行返回 `undefined` 时回退 `#expanded` 插槽，返回 `null` 视为空内容 | `(ctx: { row, index, rowKey })<br>=> VNodeChild \| undefined` | — |
| v-model:expandedRowKeys | 展开行 / 树节点受控 keys | `KTableRowKey[]` | `[]` |

#### 树形数据

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| tree | 树形数据：`true` 或 `{ childrenKey, indent }`；<br>展开箭头在首列，展开状态与行详情共用 `expandedRowKeys`。<br>与固定行数合并、固定带子节点的行不兼容，见注意事项 | `boolean \|<br>{ childrenKey?: string; indent?: number }` | `false` |

#### 单元格合并

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| spanMethod | 单元格合并：按行与列返回 `{ rowSpan, colSpan }`；<br>`rowIndex` 为当前页展示序，`columnIndex` 为可见叶子列序号 | `KTableSpanMethod<T>` | — |

#### 固定行与固定列

固定列的 `fixed` / `width` 是列级字段（见 `KTableColumn`），需配合数字 `scroll.x`。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model:rowPinning | 固定行受控 `{ top: keys[], bottom: keys[] }` | `{ top?: KTableRowKey[];<br>bottom?: KTableRowKey[] }` | `{}` |

#### 吸底横向滚动条

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| bottomScrollbar | 表格下方常驻横向滚动条：<br>与表体双向同步，页面滚动时吸在视口底部 | `boolean` | `false` |

#### 表头位置

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| headerPosition | 表头渲染在数据行上方还是下方；<br>底部表头配合 `sticky` / `pageSticky` 悬浮在底部，<br>筛选面板改为向上展开 | `'top' \| 'bottom'` | `'top'` |

#### 页面级吸顶

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| pageSticky | 页面滚动时表头吸顶；表头在底部时改为吸在视口底部；<br>要求没有 `scroll.x` / `scroll.y` | `boolean` | `false` |
| pageStickyOffset | 吸附偏移：数字按 px，字符串原样；<br>可避开站点顶栏或底栏 | `number \| string` | `0` |

#### 触底加载

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| reachEndThreshold | 距底部多少 px 触发 `reachEnd` | `number` | `40` |
| loadingMore | 加载中：不再触发 `reachEnd`，并在表格内部底边上方悬浮加载指示 | `boolean` | `false` |

#### 虚拟滚动

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| virtual | 虚拟滚动（支持变量行高、单元格合并与展开行；卡片模式按卡片高度虚拟化） | `boolean` | `false` |
| virtualThreshold | 启用虚拟滚动的行数阈值 | `number` | `40` |
| virtualOverscan | 窗口上下各预渲染的行数 | `number` | `6` |
| virtualBuffer | 滚出当前窗口多少行后才重算窗口 | `number` | `3` |
| virtualRowHeight | 未测量行的估算行高（px）；<br>实测后按真实高度计算 | `number` | — |

#### 单元格编辑

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| editTrigger | 进入编辑的方式：单击 / 双击 / 手动（只能通过 `v-model:editingCell`） | `'click' \| 'dblclick' \| 'manual'` | `'click'` |
| v-model:editingCell | 当前编辑单元格 `{ rowKey, columnKey }`；同一时间只编辑一格 | `{ rowKey: KTableRowKey; columnKey: string } \| null` | `null` |

#### 分页

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| pagination | `false` 不分页；对象开启分页器<br>（`size` 可单独指定分页器尺寸） | `false \| KTablePaginationConfig` | `false` |
| paginationPosition | 分页器位置，六个角位 + `both` | `'top-left' \| 'top-center' \| 'top-right' \|<br>'bottom-left' \| 'bottom-center' \| 'bottom-right' \| 'both'` | `'bottom-right'` |
| v-model:current | 受控当前页 | `number` | `1` |
| v-model:page-size | 受控每页条数 | `number` | `10` |

### KTableColumn

| 字段 | 说明 |
| --- | --- |
| `key` | 列唯一键（缺省用 `dataIndex`） |
| `title` | 表头文本（`#columnHeader` 插槽优先） |
| `dataIndex` | 取值路径，支持 `a.b` |
| `width` | 列宽；<br>固定列必须为数字 `width` |
| `minWidth` | 最小列宽 |
| `align` | `left / center / right` |
| `fixed` | `'left' \| 'right'` 固定列 |
| `sortable` | `true` 默认比较，或自定义比较函数 |
| `filters` | 筛选项 `{ label, value }[]` |
| `filterMultiple` | 是否多选（默认 `true`） |
| `filterMethod` | 自定义筛选 `(value, row) => boolean` |
| `children` | 分组表头子列；<br>有 `children` 的列不渲染数据单元格 |
| `hidden` | 默认隐藏；<br>仍可在列设置中勾选打开（永久隐藏请配合 `hideable: false`） |
| `hideable` | 是否允许在列设置中切换，默认 `true`；<br>`false` 锁定 |
| `ellipsis` | 单元格单行省略<br>（表格自动切为固定布局） |
| `ellipsisTooltip` | 只在真实溢出时用 KTooltip 显示全文 |
| `render` | 单元格渲染 `({ row, value, index, column }) => VNodeChild` |
| `editable` | 允许进入单元格编辑 |
| `editHeight` | 自定义编辑控件高度（px）：可编辑行按它与默认控件取大预留，避免进入编辑撑高行 |
| `editRender` | 自定义编辑控件 `({ row, value, index, column, commit, cancel }) => VNodeChild`；缺省渲染 KInput |
| `actions` | 操作列图标按钮 `{ label, icon?, danger?, disabled?, onClick }[]`；点击不触发 `rowClick` |
| `maxActions` | 直排按钮数量，超出收进下拉菜单，默认 `3` |
| `stack` | 卡片模式字段：`false` 隐藏；<br>`'title'` / `'subtitle'` 指定标题与副标题；<br>缺省第一个非副标题列作标题、其余为键值字段 | `false \| 'title' \| 'subtitle'` |
| `classNames` | 列级表头/单元格类名，类型 `Partial<Record<Part, string>>` |
| `styles` | 列级表头/单元格内联样式，类型 `Partial<Record<Part, CSSProperties>>` |

### KTableRowSelection

| 字段 | 说明 |
| --- | --- |
| `type` | `'checkbox'`（默认，多选 + 全选）或 `'radio'`（单选） |
| `selectedRowKeys` | 受控选中 keys；单选模式长度保持 ≤ 1 |
| `onChange` | `(keys, rows) => void` |
| `getCheckboxProps` | `(row) => ({ disabled? })`，多选/单选共用 |
| `selectAllScope` | `'page'`（默认，全选只增删当前页）或 `'all'`（表头全选覆盖当前筛选/排序结果的所有分页） |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| header | 表格上方页眉区（不带内边距/样式，内容自控） | `{ columns, rows }` |
| columnHeader | 列头内容（分组列与叶子列都会触发） | `{ column, index }` |
| empty | 空态内容 | `{ columns }` |
| summary | 表尾汇总行 | `{ columns, rows }` |
| footer | 表格下方页脚区（在分页器上方，不带内边距/样式） | `{ columns, rows }` |
| expanded | 展开行内容 | `{ row, index, rowKey }` |
| filter | 工具条左侧筛选区 | `{ columns, visibility }`，`columns` 为叶子列（含 `key`） |
| toolbar | 工具条右侧操作区（位于内置列设置按钮前） | `{ columns }` |
| actions | 操作列前置内容，与图标按钮同一行垂直居中 | `{ row, index, column }` |
| card | 卡片模式下整体替换卡片主体（选择、展开控件仍由表格渲染） | `{ row, index, entry, columns }` |

### Events

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| sortChange | 排序变化 | `sorter: KTableSortState \| null` |
| filterChange | 筛选变化 | `filters: KTableFilterState` |
| selectionChange | 选择变化 | `keys, rows` |
| rowClick | 行点击 | `row, index, event` |
| pageChange | 分页变化 | `page, pageSize` |
| expandChange | 行展开变化 | `keys, row, expanded` |
| cellEdit | 单元格提交（不直接改数据） | `{ row, column, value, previousValue, rowIndex }` |
| rowReorder | 行拖拽落位（当前页展示序） | `{ row, from, to }` |
| reachEnd | 内部滚动接近底部（阈值内只触发一次） | `distance: number` |
| update:current | 当前页受控模型更新 | `number` |
| update:pageSize | 每页条数受控模型更新 | `number` |

## 注意事项

- **固定列**依赖数值 `width` 并配合数字 `scroll.x`；
  - 左右固定列渲染在**独立的粘性浮层**里（浮层与主表逐行同步高度），横向滚动时固定列不参与重绘。
  - 浮层用滚动驱动动画（`animation-timeline: scroll()`）做平移吸附并独立合成，快速滚动也不会抖动；不支持滚动驱动动画的浏览器退回 `position: sticky`。
  - 有左侧固定列时，展开/选择列也一并放进左浮层（主表不再保留粘性单元格），没有左侧固定列时仍按 sticky 吸边；分组跨固定与非固定边界时退回单元格 sticky。
  - 列宽与偏移会冻结为**整数像素**，容器尺寸或列显隐变化时自动重新分配，百分比列宽不参与冻结。
- **表头沉底**：`headerPosition="bottom"` 时整组表头渲染在数据行之后，汇总行排在其上方；`sticky` 让表头吸在容器底部并按行补 `bottom` 偏移，选择/展开列跨整组表头直接贴底；筛选面板自动向上展开；固定行底部堆叠会让出表头高度，加载指示也会抬到表头上方。
- **粘性表头**：`sticky` 只在 `scroll.y` 形成内部滚动时生效；`headerPosition="bottom"` 时改为吸在容器底部，固定行自动让出表头高度。页面滚动吸顶改用 `pageSticky`（要求没有 `scroll.x` / `scroll.y`，偏移用 `pageStickyOffset`，底部表头则吸在视口底部），检测到内部滚动会忽略并 dev 告警；祖先若是 `overflow: hidden` 会阻断吸顶（改成 `overflow: clip` 可保留裁剪又不阻断）；存在自定义滚动容器时吸在该容器边缘。
- 排序为单列、客户端排序；筛选默认取单元格值与选项相等，复杂条件用 `filterMethod`。
- 行选择默认作用于**当前页**；已选 key 会跨页保留，翻页与切换每页条数都不清空；`rowSelection.selectAllScope="all"` 让表头全选覆盖当前筛选/排序结果的所有分页，勾选态与半选态按全局计算。固定行不参与全选；单选模式表头无全选，`selectedRowKeys` 始终只保留最后一个选中项。
- 表头排序使用真实按钮，`th` 输出 `aria-sort`；加载态表格 `aria-busy`，空态由 KEmpty 提供描述。
- 表头文字统一左对齐；列 `align` 只影响表体单元格（如数值列右对齐），表头不会跟着偏移。
- 边框三层独立控制：`bordered` 管外框/圆角，`rowBorders` 管横向分隔线，`columnBorders` 管纵向分隔线；`columnBorders` 缺省跟随 `bordered` 保持旧行为。
- 表格根节点与滚动容器不带外边距；分页器与表格之间保留 16px 间距，可经 `--k-table-pagination-gap` 调整（设 0 即贴紧）。
- **触底加载**：设置 `scroll.y` 后，滚动到距底部 `reachEndThreshold`（默认 40px）发一次 `reachEnd`，离开阈值两倍后重新武装；`loadingMore` 为 true 时不再触发，加载指示悬浮在表格内部底边上方（与底边留 12px 间距，底部表头悬浮时自动让位）；`dataSource` 追加后自动重新武装。
- **分页位置**按 `paginationPosition` 显式对齐，小屏不再强制居中；`both` 上下两份分页共用同一页状态。
- **分页器尺寸**跟随表格 `size`：sm→sm、md→md、lg→lg；可用 `pagination.size` 单独覆盖。
- **可展开行**：展开列固定在最左 44px，选择列自动后移；展开内容整行跨列。固定行不显示展开按钮（固定行与展开暂不组合）；树形模式下改为首列内箭头，不再占独立列。
  - 无合并（不传 `spanMethod`）时保持 `inline`：内容紧随展开行；
  - 有合并时：`expandedPlacement="bottom"`（或检测到 `rowSpan` 时自动）把展开内容追加到**所属合并组的末尾整行**（跨全部列），不是整表底部，合并不受影响；同一组多行展开依次追加，分页切换后只保留当前页行的展开内容；
  - `bottom` 在未传 `spanMethod` 时按 `inline` 渲染（dev 告警），非合并表格行为不变；
  - 展开内容可用 `expandedRender`（返回组件 / `h()` / VNode）或 `#expanded` 插槽；渲染函数逐行优先，某行返回 `undefined` 时回退插槽（`null` 视为空内容），可在同一张表里按行混用；两种位置共用同一份内容。
  - 展开内容可以嵌套完整 KTable（见「嵌套子表格」）：父表按子表实际高度测量；子表若再用固定列 / 虚拟滚动，需自带数字 `scroll` 配置，不要复用父表容器高度。
  - 展开行也纳入虚拟窗口：高度按展开项单独测量并计入所属行的偏移；展开/收起会重建前缀和，窗口外的展开行用已测平均高度估算。
- **树形数据**：`tree` 读取每行的 `children`（可用 `{ childrenKey, indent }` 改字段与缩进，默认 16px）。
  - 展开箭头与缩进在**首个可见数据列**，树形模式不再渲染 44px 展开列；行详情仍可用 `#expanded`/`expandedRender`，叶子行会显示详情箭头。
  - 展开状态沿用 `expandedRowKeys`（与行详情共用）；`defaultExpandAll` 展开所有含子节点的层级。
  - 筛选为树内过滤：命中行与祖先链保留，祖先强制展开；排序只在**同级**内进行，子树跟随父节点移动。
  - 其余特性可正常叠加：固定列、吸顶表头、多级表头、虚拟滚动、列显隐、行详情（共用 `expandedRowKeys`）。
  - **不能混用的组合**：
    - `spanMethod` 的固定行数合并：`rowSpan` 会按固定行数跨过收起后的分组、吞掉相邻行（实测会丢失下一分组的单元格）。必须按**当前展开后的可见行**计算合并跨度，且层级列通常不需要纵向合并；写法见「综合 · 树形」演示。
    - `rowPinning` 固定带子节点的行：固定后该节点的子树不再展示（只剩顶层行）。只能固定扁平汇总行或叶子节点。
    - 按固定行数分页：分页切的是展开后的可见扁平行，父子会被切到两页；需要整棵树翻页时先在业务侧对顶层节点分页。
  - 选择不级联（父节点勾选不会带上子节点），全选默认只作用于当前页可见行（`selectAllScope: all` 时覆盖全部分页）；排序只作用于同级。
- **固定行**：`rowPinning` 的行始终按 `dataSource` 顺序展示，不受筛选、排序与分页影响，也从分页总数中剔除；
  - top 从表头下方、bottom 从容器底部按实测行高依次堆叠。
  - 固定行与固定列可同时使用，交叉单元格同时 sticky 两个方向，行堆叠与列堆叠互不影响。
- **阴影随位置消失**：固定列只在 `scrollLeft > 0` / 未到最右时显示边缘阴影；固定行只在顶部/底部仍有滚动余量时显示分隔阴影，回到原位即消失。
- **分组表头**只支持叶子列排序/筛选；分组跨固定与非固定边界时整组不参与吸边，需把分组整体放在同侧固定区内。
- **全局搜索**：`searchable` 在工具条显示搜索框，关键字走 `v-model:globalFilter`；
  - 默认匹配可见叶子列的文本（大小写不敏感），可用 `globalFilterMethod` 自定义；
  - 默认文本单元格把命中片段（全部出现，大小写不敏感）包成 `<mark class="k-table__mark">`，`globalFilterHighlight="false"` 关闭；列 `render` 或行操作等自定义内容不处理；
  - 与列筛选、排序、分页叠加，树形下命中行的祖先链保留并强制展开；搜索变化会重置到第 1 页。
- **列顺序与列宽**：`columnOrder` 是叶子 key 数组，按叶子排序后分组跟随首个叶子移动；`columnDragMode` 缺省只允许拖表头抓手（`press` 为表头任意处），拖拽可跨分组换位。
  - 跨分组落位写回 `columnGroups`（叶子 key → 目标分组 key 路径，顶层为空数组），未记录的分组归属保持不变；固定侧不同的列拒绝换位；
  - `columnWidths` 是叶子 key → px（最小 56），拖动右缘时当前列与右邻列互补，末列拖动让表格变宽；双击表头/把手按容器重新分配列宽；`columnResizable` 开启后表格切为固定布局；
  - 固定列渲染在浮层表头里，拖拽可用（同侧内换位）；拖宽把手仍只在主表表头。
- **单元格编辑**：列配 `editable` 后按 `editTrigger` 进入编辑（click / dblclick / manual），编辑态走 `v-model:editingCell`。
  - 默认控件是 KInput：Enter 或失焦提交、Esc 取消；`editRender` 可换成 KSelect 等任意控件，通过 `commit` / `cancel` 结束；
  - 提交只发 `cellEdit({ row, column, value, previousValue, rowIndex })`，不会直接修改 `dataSource`，由业务回写；
  - 同一时间只编辑一个单元格，固定列浮层与主表共用同一编辑态；
  - 存在 `editable` 列时，表体行最低高度统一按默认编辑控件（KInput sm，跟随 `--k-control-height-sm`）加单元格上下 padding 预留，进入/退出编辑不改变行高；自定义 `editRender` 高于默认控件时给列设 `editHeight`（px），行高按最大者预留。
- **行操作**：列的 `actions` 生成图标按钮（`icon` 内置 view / edit / copy / remove / more），`maxActions` 之外的收进竖向点下拉菜单；`danger` 用危险色，`disabled` 支持布尔或按行函数。
  - `#actions` 插槽渲染在按钮之前，与按钮同一 flex 行垂直居中，可放状态标签；
  - 点击操作会阻止冒泡，不触发 `rowClick`；操作列是普通列，固定、宽度与分组规则与其他列一致。
- **行拖拽**：`rowDraggable` 拖行首列抓手（`rowDragMode="press"` 可改为按住行任意处），浮层副本跟随指针、蓝色线条标示落位，不插入占位行。
  - 松手发 `rowReorder({ row, from, to })`，索引是当前页展示序，组件不改 `dataSource`；
  - 固定行不可拖动；表格中有按钮/输入/展开箭头等交互元素时，从这些元素上按下不会开始拖拽。
- **吸底横向滚动条**：`bottomScrollbar` 在表格下方渲染一条独立轨道与拖拽拇指，仅在真实横向溢出时出现；拖动拇指、点击轨道或滚动表体都会双向同步。
  - 表格跨越视口时改为 `position: fixed` 固定在视口底部，整表进入视口后回到表格下方；固定列浮层与主表同步滑动。
  - 仅在未设 `scroll.y`、且真实横向溢出时渲染，并用 `scrollbar-width: none` 隐藏原生滚动条；设了 `scroll.y` 时原生条本来就固定在容器底，不再额外渲染；卡片模式不渲染该条。
- **响应式卡片**：`stackBreakpoint` 按视口断点自动切换（档位或像素），`stacked` 可强制开启，二者同时存在时以 `stacked` 为准。
  - 卡片字段由可见叶子列生成：第一个非副标题列作标题，其余列按「标签：值」网格排列；树形子卡按层级缩进，标题内不再重复缩进；`stack: false` 隐藏、`stack: 'title'` / `'subtitle'` 指定标题与副标题，树形首列即使被隐藏也会回到标题以保留展开箭头；
  - 选择、展开详情、行操作、单元格编辑与 `rowClick` 在卡片内继续可用；展开内容追加在所属卡片内部，`#card="{ row, index, entry, columns }"` 可整体替换卡片主体（展开内容仍追加在插槽之后），选择与展开控件仍由表格渲染；
  - 卡片下不渲染表头，列筛选改走工具条「筛选」弹层（汇总所有配了 `filters` 的可见列，状态与表格模式共用）；列宽/列拖拽、行拖拽、单元格合并不适用，固定行按普通卡片显示，分页照常切片；
  - `virtual` 在卡片下同样生效：卡片高度单独测量缓存（含展开内容与自定义卡片），只渲染可视窗口，测量后自动锚定滚动；需 `scroll.y` 形成内部滚动，阈值复用 `virtualThreshold`。
- **隐藏列**不会丢失已有排序与筛选状态；
  - `columnVisibility` 缺省为 `{}`，可见性按列 `hidden` 默认值；
  - 显式 `columnVisibility[key]` 优先，可把默认隐藏的列重新打开。
  - 要永久隐藏，用 `hidden: true` + `hideable: false`。
- **省略**依赖 `table-layout: fixed`，表格中存在任一 `ellipsis` 列时自动切换；未给列宽时浏览器会平均分配剩余宽度。
- **列设置**至少在保一列可见：只剩一列时其余可见列的勾选禁用；`hideable: false` 的列仍列出但禁用，分组列本身不出现在列表中（只列叶子）。
- **虚拟滚动**：`virtual` 开启后主体与左右固定列浮层共用同一窗口，只渲染可视行 + 缓冲行；
  - 支持**变量行高**：渲染后测量真实行高写入缓存，按行 key 存储，排序/筛选/换页不失效；测量后做滚动锚定，避免内容跳动；
  - 未测量行的估算高度：显式传 `virtualRowHeight` 时用它；不传时取已测行的平均高度（至少 8 行样本），滚动条总高随测量逐步收敛；
  - 支持**单元格合并**：窗口会自动上探到跨窗口合并格的起始行、下探到覆盖末行，合并格不会因窗口裁切出现空白；
  - **展开行纳入窗口**：内联展开行与合并组尾展开行都作为窗口项渲染，高度单独测量后计入所属行偏移；展开/收起会重建前缀和；
  - `virtualThreshold`（默认 40）、`virtualOverscan`（默认 6）、`virtualBuffer`（默认 3 行）可调；固定行始终渲染、不受窗口影响；
  - 卡片模式下按整卡高度独立测量（含展开内容、自定义 `#card`），滚动锚定与阈值规则同上；
  - 列宽测量带缓存：表宽、列定义与列宽覆盖不变时跳过表头宽度读取，虚拟换窗与行高变化不再触发整表强制排版；字体就绪或视口变化会自动重测；
  - 千行数据 DOM 行数从 O(n) 降到约 20 行/表。
- **单元格合并**：`spanMethod` 返回 `{ rowSpan, colSpan }`，起点之外被覆盖的单元格不再渲染；`rowIndex` 是当前页展示序（排序/筛选后），`columnIndex` 只数可见叶子列（展开/选择列不计）。
  - 合并只在同一固定区内有效；跨左右固定区与中区时整表退回粘性单元格模式（dev 告警），固定列的抗抖动与性能相应回退。
  - 与虚拟滚动可同时使用：`rowSpan` 合并格会参与窗口扩张，起始行总在渲染范围内。
  - 有展开行时内容挂到所属合并组末尾，合并不受影响；固定行不参与合并；合并只在当前页内计算，不跨页。
  - 斑马纹下跨行单元格使用起始行底色，被覆盖行的 hover 不会点亮合并格。
