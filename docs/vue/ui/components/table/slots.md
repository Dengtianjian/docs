# KTable · 插槽

> 列头、页眉、页脚、汇总行与工具条插槽。展开内容、行操作、卡片等其他插槽见对应分类页。


### 最小用法

```vue
<KTable row-key="id" :columns="columns" :data-source="rows">
  <template #summary="{ rows }">共 {{ rows.length }} 条</template>
</KTable>
```

### 列头插槽

<Demo :title-level="4" path="table/slots-header" title="插槽 · 自定义列头" :desc="['`#columnHeader` 同时作用于分组列与叶子列，可补单位、列数等说明。', '自定义内容仍在排序按钮内部，点击排序、筛选面板与 `aria-sort` 不受影响。']" />

### 页眉与页脚

<Demo :title-level="4" path="table/slots-footer" title="插槽 · 表格页眉与页脚" :desc="['`#header` / `#footer` 渲染在表格上下，独立于表体；插槽本身不带内边距、颜色等样式，保持纯净。', '参数与 `#summary` 一致（`columns` / `rows`），间距与布局由插槽内容自己控制。', '组合限制：页眉页脚在横向滚动容器外，不跟随表体横向滚动；需要与列对齐的合计请用 `#summary`。']" />

### 汇总行

<Demo :title-level="4" path="table/slots-summary" title="插槽 · 自定义汇总行" :desc="['`#summary` 收到当前展示的 `rows` 与可见叶子列 `columns`，合计、计数都按当前结果计算。', '汇总行沿用表格最低一行的留白与分隔线；表头沉底时汇总行排在表头上方。']" />

### 工具条

<Demo :title-level="4" path="table/slots-toolbar" title="插槽 · 工具条筛选与操作区" :desc="['`#filter` 放左侧筛选区，`#toolbar` 放右侧操作区，位于内置列设置按钮之前。', '工具条搜索仍用 `searchable` + `v-model:global-filter`；自定义筛选可自行驱动 `dataSource`，再叠加搜索。', '组合限制：插槽只负责布局，筛选与导出逻辑由业务实现；卡片模式下工具条仍可用，但列设置入口隐藏表头时无意义。']" />

## API

<!--@include: /vue/ui/components/table/_api/slots-layout.md-->
<!--@include: /vue/ui/components/table/_api/slots-columns.md-->
<!--@include: /vue/ui/components/table/_api/slots-toolbar.md-->
<!--@include: /vue/ui/components/table/_api/slots-rows.md-->
<!--@include: /vue/ui/components/table/_api/slots-actions.md-->
<!--@include: /vue/ui/components/table/_api/slots-card.md-->

## 注意事项

- 页眉/页脚插槽在横向滚动容器外，不跟随表体横向滚动；需要随列对齐的合计请用 `#summary`。
- 汇总行使用中性灰底并加粗；表头沉底时排在表头上方。
- 其他插槽演示：展开内容见「展开与树形」，行操作见「操作与编辑」，卡片替换见「响应式卡片」。
