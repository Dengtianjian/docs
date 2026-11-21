# KTable · 边界与组合

> 合并降级、特殊展开形态、综合大表与高级表头/卡片变体。普通业务先看分类页，这里用于排查边界。

### 合并边界

<Demo :title-level="4" path="table/span-cross-region" title="合并 · 跨固定区（退回粘性）" :desc="['合并起点在左固定列、覆盖到中区时，一张浮层表无法承载跨表单元格。', '整表退回粘性单元格模式并在 dev 告警。', '组合限制：这是降级路径，不做浮层桥接；快速横滚可能轻微抖动/漏光，需要稳定吸边时请把合并限制在同一固定区。']" />

> 展开内容按组件/插槽/混用三种形态的演示见[合并 · 展开（按行混用）](/vue/ui/components/table/merge)。

### 综合虚拟示例

<Demo :title-level="4" path="table/combined" title="综合 · 全能力叠加" :desc="['80 行、每 4 行一组：部门/组号固定左侧，状态/风险固定右侧，中间 9 列。', '部门 rowSpan + 组尾里程碑 colSpan、多级表头、顶/底固定行、虚拟滚动与吸顶表头同时开启。', '组号排序保持整组相邻，进度/评分为组内排序，部门筛选按整组过滤。', '组合限制：跨固定区合并会整表退回粘性；展开内容追加到组尾并计入虚拟窗口。']" />

<Demo :title-level="4" path="table/tree-combined" title="综合 · 树形 × 固定列 / 合并 / 虚拟" :desc="['88 行三级树 + 顶/底固定汇总行：固定列、多级表头、吸顶表头与虚拟滚动照常工作。', '「批次」列 rowSpan 按当前可见行实时计算（团队行 + 已展开成员），收起团队或筛选「状态」后合并同步重算。', '里程碑行横向合并任务与备注。', '组合限制：固定行只放扁平汇总行；固定带子节点的行会导致子树不展示。']" />

### 高级表头 / 列拖拽

<Demo :title-level="4" path="table/header-bottom-combo" title="表头沉底 · 交互与组合" :desc="['底部表头叠加多级表头、左右固定列、选择/展开列、固定行、汇总行、排序/筛选与列拖宽。', '筛选面板在底部表头下改为向上展开；选择/展开列的整组表头贴住容器底部。', '组合限制：固定列的表头在浮层里拖拽可用，拖宽把手仍只在主表表头；卡片模式不渲染表头。']" />

<Demo :title-level="4" path="table/column-layout-group" title="列拖拽 · 固定列与跨分组" :desc="['左/右固定列的表头在浮层里也能拖，`columnDraggable` 在两侧都对抓手生效。', '把列拖到其它分组的列旁会并入该分组，拖到顶层列旁则回到顶层；拖拽时目标分组表头加深，落到顶层时目标列头顶部出现落点线。', '分组归属走 `v-model:columnGroups`（叶子 key → 分组 key 路径）。', '组合限制：固定侧不同的列不能互换；分组只剩空壳时自动消失。']" />


## 相关 API

- 合并：[单元格合并](/vue/ui/components/table/merge)
- 虚拟滚动：[虚拟滚动](/vue/ui/components/table/virtual)
- 表头位置：[表头位置与滚动](/vue/ui/components/table/sticky-scroll)
- 列拖拽：[列设置与拖拽](/vue/ui/components/table/columns)
- 卡片：[响应式卡片](/vue/ui/components/table/stacked)
