<template>
  <div class="transfer-demo">
    <KTransfer
      v-model="targetKeys"
      :data-source="data"
      :titles="['可选成员', '已选成员']"
      @change="onChange"
    />
    <div class="transfer-demo__status">
      已选 {{ targetKeys.length }} 人
      <span v-if="lastMove">· 最近移动：{{ lastMove }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KTransfer from 'kit/vue/ui/components/data-entry/Transfer/Transfer.vue'
import type { KTransferItem } from 'kit/vue/ui/components/data-entry/Transfer/Transfer.vue'

const targetKeys = ref<(string | number)[]>(['u2'])
const lastMove = ref('')
const data: KTransferItem[] = [
  { key: 'u1', label: '张三', description: '产品经理' },
  { key: 'u2', label: '李四', description: '前端工程师' },
  { key: 'u3', label: '王五', description: '设计师' },
  { key: 'u4', label: '赵六', description: '测试工程师', disabled: true },
  { key: 'u5', label: '钱七', description: '后端工程师' }
]

function onChange(keys: (string | number)[], direction: string, moved: (string | number)[]) {
  lastMove.value = `${direction === 'right' ? '移入' : '移回'} ${moved.length} 人`
  console.log(keys)
}
</script>

<style scoped>
.transfer-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.transfer-demo__status {
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>