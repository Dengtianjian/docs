<template>
  <KDatePicker v-model="value" clearable style="width: 280px">
    <template #header>
      <div class="slot-row">
        <span>账单日期</span>
        <span class="slot-muted">header</span>
      </div>
    </template>
    <template #footer>
      <div class="slot-row">
        <span class="slot-muted">footer 追加在内置操作行之后</span>
        <button type="button" class="slot-link" @click="value = Date.now()">设为今天</button>
      </div>
    </template>
  </KDatePicker>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KDatePicker from 'kit/vue/ui/components/data-entry/DatePicker/DatePicker.vue'

const value = ref<number | null>(null)
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