# KTable · 虚拟滚动

> 大数据量窗口化、变量行高、合并/展开/固定行组合与触底加载。

### 基础虚拟

<Demo :title-level="4" path="table/virtual" title="虚拟滚动（千行）" :desc="['`virtual` 开启后只渲染可视窗口，主体与左右固定列浮层共用同一窗口。', '行高按实测缓存写入前缀和；展开行同样计入窗口与占位高度。', '组合限制：需要 `scroll.y` 形成固定高度容器；固定行始终渲染、不参与窗口裁剪。']" />

<Demo :title-level="4" path="table/virtual-variable" title="虚拟滚动 · 不定高" :desc="['1000 行里混有多行摘要，行高按实测缓存写入前缀和。', '未测量行用 `virtualRowHeight` 估算，测量后自动滚动锚定。', '组合限制：不传 `virtualRowHeight` 时取已测行平均值，滚动条总高随测量逐步收敛。']" />

### 合并与展开

<Demo :title-level="4" path="table/virtual-span" title="虚拟滚动 · 跨行合并" :desc="['1000 行按 4 行一组纵向合并部门列。', '窗口自动上探合并起始行、下探覆盖末行，滚到组中间也不会空白。', '组合限制：合并组越大，单窗口渲染行越多（实测 24–32 行）。']" />

<Demo :title-level="4" path="table/virtual-mixed" title="虚拟滚动 · 不定高 + 合并" :desc="['每组 8 行：部门 rowSpan、会议行 colSpan，同时含单行与多行内容。', '变量行高与合并窗口扩张同时生效。']" />

<Demo :title-level="4" path="table/virtual-expand" title="虚拟滚动 + 展开行" :desc="['千行数据里展开多行详情，展开行高度单独测量后计入虚拟偏移。', '展开/收起重建前缀和；快速滚动时主体与固定列不会错行。', '组合限制：窗口外的展开行按已测平均高度估算。']" />

### 固定行与综合

<Demo :title-level="4" path="table/virtual-fixed" title="虚拟滚动 + 固定行 / 固定列 / 吸顶表头" :desc="['千行数据使用虚拟滚动，同时开启 `rowPinning`、左右固定列与吸顶表头。', '固定行始终渲染并计入上下占位，主体与浮层共用同一窗口。']" />

<Demo :title-level="4" path="table/combined" title="综合 · 全能力叠加" :desc="['80 行、每 4 行一组：部门/组号固定左侧，状态/风险固定右侧，中间 9 列。', '部门 rowSpan + 组尾里程碑 colSpan、多级表头、顶/底固定行、虚拟滚动与吸顶表头同时开启。', '组号排序保持整组相邻，进度/评分为组内排序，部门筛选按整组过滤。', '组合限制：跨固定区合并会整表退回粘性；展开内容追加到组尾并计入虚拟窗口。']" />

<Demo :title-level="4" path="table/tree-combined" title="综合 · 树形 × 固定列 / 合并 / 虚拟" :desc="['88 行三级树 + 顶/底固定汇总行：固定列、多级表头、吸顶表头与虚拟滚动照常工作。', '「批次」列 rowSpan 按当前可见行实时计算（团队行 + 已展开成员），收起团队或筛选「状态」后合并同步重算。', '里程碑行横向合并任务与备注。', '组合限制：固定行只放扁平汇总行；固定带子节点的行会导致子树不展示。']" />

### 触底加载

<Demo :title-level="4" path="table/load-more" title="滚动到底加载" :desc="['滚动到距底部 `reachEndThreshold`（默认 40）时发一次 `reachEnd`，离开阈值两倍后重新武装。', '`loadingMore` 为 true 时不再触发，加载指示以胶囊悬浮在表格内部底边上方，与底边保留间距；数据追加后自动重新武装。', '组合限制：需要 `scroll.y` 形成内部滚动；卡片模式与无内部滚动时不会触发。']" />

## API

<!--@include: /vue/ui/components/table/_api/props-virtual.md-->
<!--@include: /vue/ui/components/table/_api/events-virtual.md-->

## 注意事项

<!--@include: /vue/ui/components/table/_api/notes-virtual.md-->
