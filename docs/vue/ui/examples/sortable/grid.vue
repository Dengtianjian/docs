<template>
  <div style="max-width: 420px">
    <KSortable v-model="tiles" item-key="id" orientation="grid">
      <template #default="{ item }">
        <span class="tile" :style="{ background: item.tone }">{{ item.label }}</span>
      </template>
    </KSortable>
    <p class="hint">网格：按最近中心定位目标格，横向中点决定插前/插后；换行位置由容器宽度决定。</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KSortable from 'kit/vue/ui/components/Sortable/Sortable.vue'

interface Tile {
  id: string
  label: string
  tone: string
}

const tiles = ref<Tile[]>([
  { id: 'a', label: '概览', tone: '#eef2ff' },
  { id: 'b', label: '订单', tone: '#e6fffb' },
  { id: 'c', label: '库存', tone: '#fff7e6' },
  { id: 'd', label: '财务', tone: '#f9f0ff' },
  { id: 'e', label: '客服', tone: '#fff1f0' },
  { id: 'f', label: '报表', tone: '#f6ffed' },
])
</script>

<style scoped>
.tile {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 118px;
  height: 64px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 13px;
}
.hint {
  margin: 8px 0 0;
  font-size: 12px;
  color: #888;
}
</style>
