<template>
  <div class="wrap">
    <KListbox
      v-model="value"
      :options="options"
      :max-height="240"
      aria-label="触底加载选择"
      @reach-bottom="onReachBottom"
    />
    <p class="tip">当前：{{ value }} · 已加载 {{ options.length }} 条 · {{ bottomCount ? `触底 ${bottomCount} 次` : '滚动至底部会继续加载' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import KListbox from 'kit/vue/ui/components/data-display/Listbox/Listbox.vue'
import type { KListboxOption } from 'kit/vue/ui/components/data-display/Listbox/Listbox.vue'

const value = ref()
const bottomCount = ref(0)

const options = reactive<KListboxOption[]>([])
for (let i = 1; i <= 200; i++) {
  options.push({ label: `选项 ${i}`, value: i, key: i })
}

function onReachBottom() {
  if (options.length >= 500) return
  bottomCount.value += 1
  const start = options.length + 1
  const end = Math.min(options.length + 100, 500)
  const next: KListboxOption[] = []
  for (let i = start; i <= end; i++) {
    next.push({ label: `选项 ${i}`, value: i, key: i })
  }
  options.push(...next)
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