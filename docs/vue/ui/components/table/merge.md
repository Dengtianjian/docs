# KTable · 单元格合并

> 行/列合并、固定区内合并、与展开/虚拟滚动的组合，以及跨固定区降级。


### 最小用法

```vue
function spanMethod({ row, columnIndex }) {
  if (row.groupStart && columnIndex === 0) return { rowSpan: row.groupSize }
}

<KTable row-key="id" :columns="columns" :data-source="rows" :span-method="spanMethod" />
```

### 基础合并

<Demo :title-level="4" path="table/span" title="单元格合并" :desc="['`spanMethod` 按行与列返回 `rowSpan` / `colSpan`，覆盖格自动不再渲染。', '左右固定列浮层与主表共用同一份合并计划。', '组合限制：合并跨越左/右固定区与中区时无法用浮层承载，整表退回粘性单元格模式并在 dev 告警。']" />

<Demo :title-level="4" path="table/span-basic" title="合并 · 纵向" :desc="['只有 rowSpan：部门列按连续相同值合并。', '其余列逐行显示，用于检查行高、行分隔线与斑马纹。', '组合限制：rowSpan 必须按当前可见行计算，与树形展开、筛选、分页组合时不能写死行数。']" />

<Demo :title-level="4" path="table/span-colspan" title="合并 · 横向" :desc="['只有 colSpan：里程碑行把两列合成一个说明格。', '不改变行高，可与虚拟滚动、变量行高叠加。']" />

<Demo :title-level="4" path="table/span-fixed-inner" title="合并 · 固定列内横向" :desc="['左固定「部门 + 成员」在同一固定区内 colSpan，同一行中区再合并「任务 + 负责人」。', '合并未跨固定区，整表继续走固定列浮层；横滚时合并格随左固定区一起平移。', '组合限制：合并仍不能跨左右固定区与中区，跨区会退回粘性（见下一条）。']" />

### 合并与展开

<Demo :title-level="4" path="table/span-expand-bottom" title="合并 · 展开内容挂在组尾" :desc="['`expanded-placement` 设为 `bottom`：展开内容追加到所属合并组的末尾整行（跨全部列），不是整表底部。', '同一组多行展开按展示顺序追加，部门合并保持生效。', '组合限制：未传 `spanMethod` 时 `bottom` 回退 `inline` 并 dev 告警。']" />

<Demo :title-level="4" path="table/span-expand-mixed" title="合并 · 展开（按行混用）" :desc="['同一张表按行选择渲染方式：成员 2 由 `expandedRender` 返回 `h()` 节点，成员 3 返回组件，成员 5 返回 `undefined` 回退插槽。', '三块内容各自追加到所属合并组尾部。']" />

### 合并与虚拟 / 状态

<Demo :title-level="4" path="table/span-virtual" title="合并 · 虚拟滚动（colSpan）" :desc="['400 行 + 虚拟滚动 + 横向合并（colSpan）。', 'colSpan 不改变行高，虚拟窗口保持生效。']" />

<Demo :title-level="4" path="table/span-states" title="合并 · 斑马纹 / 边框 / 固定行" :desc="['合并与斑马纹、外框/行线/列线、固定行同时出现。', '固定行不参与合并；合并格底色跟随起始行，被覆盖行 hover 不点亮合并格。']" />

## API

<!--@include: /vue/ui/components/table/_api/props-span.md-->

## 注意事项

<!--@include: /vue/ui/components/table/_api/notes-span.md-->
