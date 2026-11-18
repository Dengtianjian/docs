<script setup lang="ts">
import { ref } from 'vue'
import KSortable from 'kit/vue/ui/components/Sortable/Sortable.vue'

interface Task {
  id: number
  title: string
  desc: string
}

const tasks = ref<Task[]>(
  Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    title: `事项 ${i + 1}`,
    desc: i % 3 === 0 ? '一行说明，用来撑出不同高度' : '两行说明：容器定高后超出部分可滚动，拖到上下边缘会自动滚动。',
  })),
)
</script>

<template>
  <div style="max-width: 420px">
    <KSortable
      v-model="tasks"
      item-key="id"
      :styles="{ root: { maxHeight: '300px', overflow: 'auto', padding: '8px', border: '1px solid #e5e7eb', borderRadius: '10px' } }"
    >
      <template #default="{ item }">
        <div class="task">
          <strong>{{ item.title }}</strong>
          <span>{{ item.desc }}</span>
        </div>
      </template>
    </KSortable>
    <p class="hint">
      容器定高 + overflow:auto：拖到容器上/下边缘会自动滚动；滚动后按新位置重测布局，占位块与让位保持正确。
    </p>
  </div>
</template>

<style scoped>
.task {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
}
.task strong {
  font-size: 13px;
}
.task span {
  font-size: 12px;
  line-height: 18px;
  color: #888;
}
.hint {
  margin: 8px 0 0;
  font-size: 12px;
  color: #888;
}
</style>