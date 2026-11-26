<template>
  <KTransfer
    v-model="keys"
    :data-source="data"
    :show-select-all="false"
    :list-height="180"
  >
    <template #item="{ item }">
      <span class="custom-item">
        <strong>{{ item.label }}</strong>
        <span>{{ item.description }}</span>
      </span>
    </template>
    <template #footer="{ direction }">
      <span>{{ direction === 'source' ? '带 * 为必选' : '已选目标' }}</span>
    </template>
  </KTransfer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KTransfer from 'kit/vue/ui/components/data-entry/Transfer/Transfer.vue'
import type { KTransferItem } from 'kit/vue/ui/components/data-entry/Transfer/Transfer.vue'

const keys = ref<(string | number)[]>([])
const data: KTransferItem[] = [
  { key: 1, label: '权限 A', description: '查看' },
  { key: 2, label: '权限 B', description: '编辑' },
  { key: 3, label: '权限 C', description: '导出' },
  { key: 4, label: '权限 D', description: '删除' }
]
</script>

<style scoped>
.custom-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.custom-item span {
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-sm);
}
</style>