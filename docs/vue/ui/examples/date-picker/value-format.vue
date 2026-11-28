<template>
  <KFlex gap="md" vertical style="width: 280px">
    <KDatePicker
      v-model="date"
      value-format="YYYY-MM-DD"
      format="YYYY年M月D日"
      clearable
      placeholder="值 YYYY-MM-DD，显示中文"
    />
    <KDatePicker
      v-model="dateTime"
      value-format="YYYY-MM-DD HH:mm"
      show-time
      :minute-step="5"
      clearable
      placeholder="值 YYYY-MM-DD HH:mm"
    />
    <pre class="value">{{ date ?? 'null' }}
{{ dateTime ?? 'null' }}</pre>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KDatePicker from 'kit/vue/ui/components/data-entry/DatePicker/DatePicker.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const date = ref<string | null>('2026-11-01')
const dateTime = ref<string | null>('2026-11-01 09:30')
</script>

<style scoped>
.value {
  margin: 0;
  color: var(--k-color-text-tertiary);
  font-size: 12px;
  white-space: pre-wrap;
}
</style>