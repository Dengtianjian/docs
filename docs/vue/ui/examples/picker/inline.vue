<template>
  <div class="box">
    <KPickerView v-model="values" :columns="columns" :visible-count="5" />
  </div>
  <p class="tip">内联值：{{ values.join(' / ') }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KPickerView from 'kit/vue/ui/components/data-entry/Picker/PickerView.vue'
import type { KPickerColumn, KPickerValue } from 'kit/vue/ui/components/data-entry/Picker/PickerView.vue'

const values = ref<KPickerValue[]>([2, '月'])
const columns: KPickerColumn[] = [
  {
    options: Array.from({ length: 12 }, (_, index) => ({ label: `${index + 1}`, value: index + 1 })),
  },
  {
    options: ['月', '周', '日'].map(value => ({ label: value, value })),
  },
]
</script>

<style scoped>
.box {
  max-width: 300px;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: var(--k-border-radius-lg);
  overflow: hidden;
}
.tip {
  margin: 12px 0 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>