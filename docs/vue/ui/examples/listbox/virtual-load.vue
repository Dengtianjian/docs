<template>
  <div class="wrap">
    <KListbox
      v-model="value"
      :options="options"
      virtual
      :max-height="320"
      aria-label="虚拟列表触底加载"
      @reach-bottom="onReachBottom"
    />
    <p class="tip">已加载 {{ options.length.toLocaleString('zh-CN') }} / {{ TOTAL.toLocaleString('zh-CN') }} 条 · 当前：{{ value ?? '未选择' }}</p>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import KListbox from 'kit/vue/ui/components/data-display/Listbox/Listbox.vue'
import type { KListboxOption } from 'kit/vue/ui/components/data-display/Listbox/Listbox.vue'

const TOTAL = 10000
const PAGE_SIZE = 300

const value = ref()

function create(start: number, count: number): KListboxOption[] {
  return Array.from({ length: Math.min(count, TOTAL - start) }, (_, offset) => {
    const item = start + offset + 1
    return { label: `选项 ${item}`, value: item, key: item }
  })
}

const options = reactive<KListboxOption[]>(create(0, PAGE_SIZE))

function onReachBottom() {
  if (options.length >= TOTAL) return
  options.push(...create(options.length, PAGE_SIZE))
}
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