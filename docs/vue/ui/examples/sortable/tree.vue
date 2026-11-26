<template>
  <div style="max-width: 520px">
    <KSortable
      v-model="flat"
      item-key="id"
      :placeholder-inset="(projection?.depth ?? 0) * INDENT"
      @dragstart="onDragStart"
      @dragmove="onDragMove"
      @dragend="onDragEnd"
      @change="onChange"
    >
      <template #default="{ item, index }">
        <div class="tree-row" :style="{ marginLeft: `${item.depth * INDENT}px` }">
          <span class="tree-toggle">{{ hasChildren(index) ? '▾' : '•' }}</span>
          <span class="tree-name">{{ item.name }}</span>
        </div>
      </template>
    </KSortable>
    <p class="hint">
      参照 dnd-kit SortableTree：扁平列表按缩进表示层级。拖动时左右移动鼠标调整投影深度，
      拖到「设计」等空父级下方并右移即可成为其子级；落点仍用内置占位块，松手后按投影深度重挂。
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KSortable from 'kit/vue/ui/components/data-entry/Sortable/Sortable.vue'
import type { KSortableMoveInfo } from 'kit/vue/ui/components/data-entry/Sortable/types'

interface FlatNode {
  id: string
  name: string
  depth: number
}

/** 扁平树：只存 depth，父子关系由缩进推导（dnd-kit SortableTree 同款） */
const flat = ref<FlatNode[]>([
  { id: 'frontend', name: '前端', depth: 0 },
  { id: 'components', name: '组件库', depth: 1 },
  { id: 'button', name: 'Button', depth: 2 },
  { id: 'sortable', name: 'Sortable', depth: 2 },
  { id: 'docs', name: '文档站', depth: 1 },
  { id: 'backend', name: '后端', depth: 0 },
  { id: 'auth', name: '权限中心', depth: 1 },
  { id: 'gateway', name: '网关', depth: 1 },
  { id: 'design', name: '设计', depth: 0 },
])

const INDENT = 24
const draggingId = ref<string | null>(null)
const projection = ref<{ slot: number; depth: number } | null>(null)
let dragStartX = 0

function hasChildren(index: number): boolean {
  const depth = flat.value[index]?.depth ?? 0
  return (flat.value[index + 1]?.depth ?? -1) > depth
}

function clearDrag() {
  draggingId.value = null
  projection.value = null
}

function onDragStart(info: { x: number; key: string | number; index: number }) {
  dragStartX = info.x
  draggingId.value = String(info.key)
  projection.value = null
}

function onDragMove(info: { x: number; slot: number; index: number }) {
  const arr = [...flat.value]
  const [moved] = arr.splice(info.index, 1)
  if (!moved) return
  const insertIdx = Math.min(info.slot > info.index ? info.slot - 1 : info.slot, arr.length)
  arr.splice(insertIdx, 0, moved)
  const prev = arr[insertIdx - 1]
  const next = arr[insertIdx + 1]
  // dnd-kit 投影：可嵌入深度 = 前一项 depth + 1；最小不低于后一项 depth；横向位移 / 缩进宽决定开口
  const maxDepth = (prev?.depth ?? -1) + 1
  const minDepth = next?.depth ?? 0
  const dragDepth = Math.round((info.x - dragStartX) / INDENT)
  const samePosition = insertIdx === info.index
  // 同位置横向调整层级时不受后一项 minDepth 限制（否则子级列表首项无法原地升降级）
  const depth = samePosition
    ? Math.max(0, Math.min(maxDepth, maxDepth + dragDepth))
    : Math.max(minDepth, Math.min(maxDepth, maxDepth + dragDepth))
  projection.value = { slot: insertIdx, depth }
}

function onDragEnd() {
  // 同位置只改层级（没有换序事件）：松手时单独应用投影深度，后续同级保持原父级
  const p = projection.value
  const id = draggingId.value
  if (p && id) {
    const next = flat.value.map((item) => ({ ...item }))
    const idx = next.findIndex((item) => item.id === id)
    if (idx >= 0 && next[idx].depth !== p.depth) {
      next[idx].depth = p.depth
      flat.value = next
    }
  }
  clearDrag()
}

function onChange(items: FlatNode[], _info: KSortableMoveInfo<FlatNode>) {
  const next = items.map((item) => ({ ...item }))
  const p = projection.value
  const id = draggingId.value
  if (id && p) {
    const idx = next.findIndex((item) => item.id === id)
    if (idx >= 0) next[idx].depth = p.depth
  }
  // 归一化：首项 0 深度，后续最多比前一项深 1，避免悬空父级
  for (let i = 0; i < next.length; i++) {
    next[i].depth = i === 0 ? 0 : Math.max(0, Math.min(next[i].depth, next[i - 1].depth + 1))
  }
  flat.value = next
  clearDrag()
}
</script>

<style scoped>
.hint {
  margin: 8px 0 0;
  font-size: 12px;
  color: #888;
}
</style>

<style>
.tree-row {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  font-size: 13px;
}
.tree-toggle {
  width: 16px;
  color: #94a3b8;
  text-align: center;
}
.tree-name {
  color: #111827;
}</style>
