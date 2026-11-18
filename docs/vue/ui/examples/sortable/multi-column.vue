<script setup lang="ts">
import { ref } from 'vue'
import KSortable from 'kit/vue/ui/components/Sortable/Sortable.vue'

interface Card {
  id: string
  title: string
  tag: string
}

interface Column {
  key: string
  title: string
  items: Card[]
}

const columns = ref<Column[]>([
  {
    key: 'todo',
    title: '待处理',
    items: [
      { id: 'a1', title: '需求梳理', tag: 'P1' },
      { id: 'a2', title: '接口评审', tag: 'P2' },
    ],
  },
  {
    key: 'doing',
    title: '进行中',
    items: [{ id: 'b1', title: '列表虚拟滚动', tag: 'P0' }],
  },
  {
    key: 'done',
    title: '已完成',
    items: [{ id: 'c1', title: '主题变量迁移', tag: '—' }],
  },
])
const last = ref('')

function onAdd(item: Card, index: number) {
  last.value = `加入「${item.title}」到第 ${index + 1} 位`
}
function onRemove(item: Card) {
  last.value = `从原列取出「${item.title}」`
}
</script>

<template>
  <div style="max-width: 620px">
    <div class="board">
      <div v-for="column in columns" :key="column.key" class="column">
        <p class="column-title">{{ column.title }}</p>
        <KSortable
          v-model="column.items"
          item-key="id"
          group="board"
          pointer
          :styles="{ root: { minHeight: '120px' } }"
          @add="onAdd"
          @remove="onRemove"
        >
          <template #default="{ item }">
            <div class="card">
              <strong>{{ item.title }}</strong>
              <span>{{ item.tag }}</span>
            </div>
          </template>
        </KSortable>
      </div>
    </div>
    <p class="hint">同 group 实例之间可互相拖入/拖出（pointer 模式，支持触屏），各自维护 v-model；add / remove 事件回传落点与源位置。{{ last }}</p>
  </div>
</template>

<style scoped>
.board {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}
.column {
  flex: 1;
  min-width: 0;
  padding: 10px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: #f8fafc;
}
.column-title {
  margin: 0 0 8px;
  font-size: 13px;
  font-weight: 600;
  color: #555;
}
.card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 10px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  font-size: 13px;
}
.card span {
  font-size: 12px;
  color: #9ca3af;
}
.hint {
  margin: 8px 0 0;
  font-size: 12px;
  color: #888;
}
</style>