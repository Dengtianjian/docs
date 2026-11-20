# KTable · 响应式卡片

> 断点卡片、卡片树、卡片虚拟滚动、自定义卡片与展开内容。


### 最小用法

```vue
<!-- 手动切卡片 -->
<KTable stacked row-key="id" :columns="columns" :data-source="rows" />

<!-- 或按断点自动切换 -->
<KTable stack-breakpoint="md" row-key="id" :columns="columns" :data-source="rows" />
```

### 基础卡片

<Demo :title-level="4" path="table/stacked" title="响应式卡片堆叠" :desc="['`stackBreakpoint` 按视口断点自动切卡片（档位或像素），`stacked` 可手动强制。', '卡片字段自动生成：第一个非副标题列作标题，其余「标签：值」；列上 `stack: false` 隐藏、`stack: title / subtitle` 指定标题与副标题。', '选择、展开详情、行操作、单元格编辑与 `rowClick` 在卡片内继续可用；展开内容渲染在卡片内部；`#card` 插槽可整体替换卡片主体。', '组合限制：卡片模式不渲染表头，列筛选收进工具条「筛选」；列宽 / 列拖拽、行拖拽、单元格合并在卡片下不适用，固定行按普通卡片显示；`virtual` 可用（需 `scroll.y` 形成内部滚动）。']" />

<Demo :title-level="4" path="table/stacked-custom" title="卡片 · 自定义内容" :desc="['`#card` 插槽整体替换卡片主体，可自由排版金额、状态与操作。', '选择与展开控件由表格渲染在插槽上方，交互状态与表格模式共用。']" />

### 卡片树与虚拟

<Demo :title-level="4" path="table/stacked-virtual" title="卡片 · 大列表虚拟化" :desc="['400 张卡片同时开启 `stacked` 与 `virtual`：按实测卡片高度做前缀和，只渲染可视窗口。', '卡片高度差异来自备注换行；测量后自动锚定滚动位置，长短卡片混排不跳动。', '工具条「筛选」汇总所有可筛选列，卡片模式无需表头即可筛选。', '组合限制：同样需要 `scroll.y` 形成固定高度容器；阈值沿用 `virtualThreshold`，固定行按普通卡片参与窗口。']" />

<Demo :title-level="4" path="table/stacked-tree" title="卡片 · 树形" :desc="['树形与卡片叠加：箭头保留在标题里，子行展开后以卡片接在父卡片下方，子卡按层级缩进。', '组合限制：固定带子节点的行、按固定行数合并仍不适用，与表格模式的树形限制一致。']" />

### 卡片展开

<Demo :title-level="4" path="table/stacked-expanded" title="卡片 · 展开自定义详情" :desc="['`expandedRender` 返回自定义组件，展开区渲染商品明细、收货地址与交互按钮。', '展开内容在卡片内部、字段之后、操作之前；组件内部状态随该卡片的展开实例保留。', '组合限制：自定义内容高度按内容自适应并计入卡片实测高度，超长内容建议自控高度。']" />

## API

<!--@include: /vue/ui/components/table/_api/props-stacked.md-->
<!--@include: /vue/ui/components/table/_api/slots-card.md-->

## 注意事项

<!--@include: /vue/ui/components/table/_api/notes-stacked.md-->
