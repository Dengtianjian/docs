<template>
  <div class="wrap">
    <KListbox
      v-model="selected"
      multiple
      :options="options"
      :max-height="220"
      aria-label="权限选择"
    >
      <template #header>已选 {{ selected.length }} 项权限</template>
      <template #footer>↑ / ↓ 移动，Enter 或空格切换勾选</template>
    </KListbox>
    <p class="tip">输出：{{ selected.join('、') || '（空）' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KListbox from 'kit/vue/ui/components/Listbox/Listbox.vue'
import type { KListboxOption } from 'kit/vue/ui/components/Listbox/Listbox.vue'

const selected = ref<unknown[]>(['read'])
const options: KListboxOption[] = [
  { label: '查看数据', value: 'read' },
  { label: '编辑内容', value: 'write' },
  { label: '发布上线', value: 'publish' },
  { label: '成员管理', value: 'member' },
  { label: '账单与用量', value: 'billing' },
]
</script>

<style scoped>
.wrap {
  max-width: 360px;
}
.tip {
  margin: 10px 0 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>