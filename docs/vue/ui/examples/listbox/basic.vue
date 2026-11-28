<template>
  <div class="wrap">
    <KListbox
      v-model="value"
      :options="options"
      aria-label="环境选择"
      @change="last = $event"
    />
    <p class="tip">当前环境：{{ value }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KListbox from 'kit/vue/ui/components/data-display/Listbox/Listbox.vue'
import type { KListboxOption } from 'kit/vue/ui/components/data-display/Listbox/Listbox.vue'

const value = ref('staging')
const last = ref('')
const options: KListboxOption[] = [
  { label: '本地开发', value: 'local', description: 'localhost:5173' },
  { label: '预发布', value: 'staging', description: 'staging.ruyi.dev' },
  { label: '生产环境', value: 'prod', description: '仅管理员可访问', disabled: true },
]
</script>

<style scoped>
.wrap {
  display: flex;
  max-width: 360px;
  flex-direction: column;
  gap: 10px;
}
.tip {
  margin: 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>