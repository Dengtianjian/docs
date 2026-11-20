# KTable · 展开与树形

> 可展开行、自定义展开内容、嵌套子表格与树形数据。

### 最小用法

```vue
<KTable
  v-model:expanded-row-keys="expandedKeys"
  row-key="id"
  :columns="columns"
  :data-source="rows"
>
  <template #expanded="{ row }">展开内容：{{ row.note }}</template>
</KTable>
```

### 展开行

<Demo :title-level="4" path="table/expandable" title="可展开行" :desc="['配合 `#expanded` 插槽出现 44px 展开列。', '`v-model:expandedRowKeys` 受控，`rowExpandable` 指定可展开行；下方显示 `expandChange` 事件。', '组合限制：固定行不显示展开按钮；树形模式改用首列箭头，不再占独立展开列。']" />

<Demo :title-level="4" path="table/expand-forms" title="展开 · 内容形态" :desc="['`expandedRender` 返回组件（可带本地状态），返回 `undefined` 的行回退 `#expanded` 插槽。', '可在同一张表里按行混用两种形态；`null` 视为空内容。']" />

<Demo :title-level="4" path="table/expand-default" title="展开 · 默认全展开" :desc="['`default-expand-all` 首次挂载时展开全部可展开行。', '树形与行详情都适用；之后仍可用 `v-model:expandedRowKeys` 受控。']" />

<Demo :title-level="4" path="table/nested" title="嵌套子表格" :desc="['展开行里再放一张 KTable：子表拥有自己的列、排序、选中态与汇总行。', '父子表的排序与状态互不影响；展开行高度按子表实际内容自适应。', '组合限制：父表启用 `spanMethod` 时展开内容会挂到合并组末尾，子表仍按原始行数据渲染。', '组合限制：子表若再用固定列或虚拟滚动，需要自己的数字 `scroll.x` / `scroll.y`，不要复用父表容器高度。']" />

### 树形数据

<Demo :title-level="4" path="table/tree" title="树形数据" :desc="['`tree` 把 `children` 展开为子行：缩进与箭头在首个可见数据列，不再单独占 44px 展开列。', '展开状态与行详情共用 `expandedRowKeys`；筛选保留命中行祖先链并强制展开。', '组合限制：不与 `spanMethod` 的固定行数合并混用，rowSpan 必须按当前展开后的可见行计算；层级列通常无需纵向合并。', '组合限制：`rowPinning` 只能固定顶层扁平行，固定带子节点的行后子树不再展示；分页切的是可见扁平行，父子可能跨页。']" />

<Demo :title-level="4" path="table/tree-options" title="树形 · 自定义字段与缩进" :desc="['`tree={ childrenKey, indent }` 改用 `subs` 字段并加大层级缩进。']" />

<Demo :title-level="4" path="table/tree-virtual" title="树形 + 虚拟滚动" :desc="['1060 行三级数据同时开启 `tree` 与 `virtual`。', '展开/收起只改变窗口行并重建前缀和，快速滚动主体与固定列不会错行。', '组合限制：同样避开固定行数合并与固定带子节点的行；合并需按可见行计算。']" />

## API

<!--@include: ./_api/props-expand.md-->
<!--@include: ./_api/slots-rows.md-->
<!--@include: ./_api/events-rows.md-->

## 注意事项

<!--@include: ./_api/notes-rows.md-->
