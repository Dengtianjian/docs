<template>
  <div style="max-width: 420px">
    <KSortable v-model="rows" item-key="id">
      <template #handle>
        <span class="grip" aria-label="拖拽排序">⠿</span>
      </template>
      <template #default="{ item }">
        <div class="row">
          <a :href="item.url" @click.prevent>{{ item.name }}</a>
          <span class="row-hint">链接可正常点击，不会误拖</span>
        </div>
      </template>
    </KSortable>
    <p class="hint">提供 #handle 后只有把手能起拖，行内链接/按钮不再被拖动拦截。</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KSortable from 'kit/vue/ui/components/Sortable/Sortable.vue'

interface RowItem {
  id: number
  name: string
  url: string
}

const rows = ref<RowItem[]>([
  { id: 1, name: '工作台', url: '#workbench' },
  { id: 2, name: '订单中心', url: '#orders' },
  { id: 3, name: '客户档案', url: '#customers' },
])
</script>

<style scoped>
.grip {
  padding: 0 6px;
  font-size: 16px;
  color: #9ca3af;
  cursor: grab;
  user-select: none;
}
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
}
.row a {
  color: #2f54eb;
}
.row-hint {
  font-size: 12px;
  color: #9ca3af;
}
.hint {
  margin: 8px 0 0;
  font-size: 12px;
  color: #888;
}
</style>
