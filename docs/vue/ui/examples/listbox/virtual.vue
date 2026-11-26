<template>
  <div class="wrap">
    <KListbox
      v-model="value"
      :options="options"
      virtual
      :max-height="320"
      aria-label="虚拟列表选择"
    />
    <p class="tip">共 {{ options.length.toLocaleString('zh-CN') }} 条 · 当前：{{ value ?? '未选择' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KListbox from 'kit/vue/ui/components/data-display/Listbox/Listbox.vue'
import type { KListboxOption } from 'kit/vue/ui/components/data-display/Listbox/Listbox.vue'

const value = ref()

const options: KListboxOption[] = Array.from({ length: 10000 }, (_, index) => ({
  label: `选项 ${index + 1}`,
  value: index + 1,
  key: index + 1,
}))
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