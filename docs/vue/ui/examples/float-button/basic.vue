<template>
  <KFloatButton
    :items="items"
    badge="3"
    tooltip="快捷操作"
    :offset="[24, 96]"
    aria-label="快捷操作"
    @select="onSelect"
  />
  <p class="tip">最近操作：{{ last || '（无）' }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KFloatButton from 'kit/vue/ui/components/other/FloatButton/FloatButton.vue'
import type { KFloatButtonItem } from 'kit/vue/ui/components/other/FloatButton/FloatButton.vue'

const last = ref('')
const items: KFloatButtonItem[] = [
  { key: 'new', label: '新建页面' },
  { key: 'import', label: '导入 JSON' },
  { key: 'share', label: '分享链接' },
]
function onSelect(item: KFloatButtonItem) {
  last.value = item.label
}
</script>

<style scoped>
.tip {
  margin: 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>