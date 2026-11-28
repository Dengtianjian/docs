<template>
  <div style="max-width: 560px">
    <table class="demo-table">
      <thead>
        <tr>
          <th
            v-for="col in columns"
            :key="col.key"
            draggable="true"
            :data-col-over="overColumn === col.key ? (dropBefore ? 'before' : 'after') : undefined"
            :data-col-dragging="dragColumn === col.key || undefined"
            @dragstart="onColDragStart(col, $event)"
            @dragover="onColDragOver(col, $event)"
            @drop="onColDrop(col, $event)"
            @dragend="resetColumnDrag"
          >
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <KSortable v-model="rows" item-key="id" root-tag="tbody" item-tag="tr" :columns="3">
        <template #default="{ item }">
          <td v-for="col in columns" :key="col.key">{{ item[col.key] }}</td>
        </template>
      </KSortable>
    </table>
    <p class="hint">
      rootTag="tbody" + itemTag="tr"：表格自动走 pointer 拖拽（克隆浮层跟随、无原生拖影，免闪烁），拖拽时行内让位、占位整行覆盖；表头列可拖拽换列序（与行排序互不影响）。
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KSortable from 'kit/vue/ui/components/data-entry/Sortable/Sortable.vue'

type ColumnKey = 'name' | 'owner' | 'status'

interface Row {
  id: number
  name: string
  owner: string
  status: string
}

interface Column {
  key: ColumnKey
  label: string
}

const columns = ref<Column[]>([
  { key: 'name', label: '任务' },
  { key: 'owner', label: '负责' },
  { key: 'status', label: '状态' },
])

const rows = ref<Row[]>([
  { id: 1, name: '导航栏重构', owner: '设计组', status: '进行中' },
  { id: 2, name: '权限中心', owner: '后端组', status: '待评审' },
  { id: 3, name: '报表导出', owner: '数据组', status: '已完成' },
  { id: 4, name: '消息中心', owner: '前端组', status: '排队中' },
])

const dragColumn = ref<ColumnKey | null>(null)
const overColumn = ref<ColumnKey | null>(null)
const dropBefore = ref(true)

function onColDragStart(col: Column, e: DragEvent) {
  dragColumn.value = col.key
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', col.key)
  }
}

function onColDragOver(col: Column, e: DragEvent) {
  if (!dragColumn.value || dragColumn.value === col.key) return
  e.preventDefault()
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  overColumn.value = col.key
  dropBefore.value = e.clientX < rect.left + rect.width / 2
}

function onColDrop(col: Column, e: DragEvent) {
  e.preventDefault()
  const from = dragColumn.value
  if (!from || from === col.key) {
    resetColumnDrag()
    return
  }
  const next = [...columns.value]
  const fromIdx = next.findIndex((c) => c.key === from)
  const [moved] = next.splice(fromIdx, 1)
  const toIdx = next.findIndex((c) => c.key === col.key)
  next.splice(dropBefore.value ? toIdx : toIdx + 1, 0, moved)
  columns.value = next
  resetColumnDrag()
}

function resetColumnDrag() {
  dragColumn.value = null
  overColumn.value = null
}
</script>

<style scoped>
.demo-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 8px;
  font-size: 13px;
}
.demo-table thead th {
  padding: 6px 12px;
  text-align: left;
  font-weight: 600;
  color: #6b7280;
  cursor: grab;
  user-select: none;
  position: relative;
}
.demo-table thead th[data-col-dragging] {
  opacity: 0.5;
}
.demo-table thead th[data-col-over='before'] {
  box-shadow: inset 2px 0 0 #2f54eb;
}
.demo-table thead th[data-col-over='after'] {
  box-shadow: inset -2px 0 0 #2f54eb;
}
.demo-table :deep(.k-sortable__item) {
  background: #fff;
}
.demo-table :deep(.k-sortable__item td) {
  padding: 10px 12px;
  border-top: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
}
.demo-table :deep(.k-sortable__item td:first-child) {
  border-left: 1px solid #e5e7eb;
  border-radius: 8px 0 0 8px;
}
.demo-table :deep(.k-sortable__item td:last-child) {
  border-right: 1px solid #e5e7eb;
  border-radius: 0 8px 8px 0;
}
.hint {
  margin: 8px 0 0;
  font-size: 12px;
  color: #888;
}
</style>
