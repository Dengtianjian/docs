<template>
  <KDateRangePicker ref="picker" v-model="range" clearable style="width: 320px">
    <template #header>
      <div class="slot-row">
        <span>统计区间</span>
        <span class="slot-muted">header</span>
      </div>
    </template>
    <template #footer>
      <div class="slot-row">
        <span class="slot-muted">footer 追加在内置操作行之后</span>
        <button type="button" class="slot-link" @click="pickRecentWeek">近 7 天</button>
      </div>
    </template>
  </KDateRangePicker>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KDateRangePicker from 'kit/vue/ui/components/data-entry/DateRangePicker/DateRangePicker.vue'

const range = ref<[number, number] | null>(null)
const picker = ref<{ close: () => void } | null>(null)

function pickRecentWeek() {
  const end = Date.now()
  range.value = [end - 6 * 86400000, end]
  picker.value?.close()
}
</script>

<style scoped>
.slot-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.slot-muted {
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-sm);
}
.slot-link {
  padding: 0;
  border: 0;
  background: none;
  color: var(--k-color-primary);
  font: inherit;
  font-size: var(--k-font-size-sm);
  cursor: pointer;
}
</style>