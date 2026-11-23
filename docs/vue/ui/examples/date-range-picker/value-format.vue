<template>
  <KFlex gap="md" vertical style="width: 380px">
    <KDateRangePicker
      v-model="range"
      value-format="YYYY-MM-DD"
      format="YYYY年M月D日"
      clearable
    />
    <KDateRangePicker
      v-model="rangeTime"
      value-format="YYYY-MM-DD HH:mm"
      show-time
      clearable
    />
    <pre class="value">{{ JSON.stringify(range) }}
{{ JSON.stringify(rangeTime) }}</pre>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KDateRangePicker from 'kit/vue/ui/components/DateRangePicker/DateRangePicker.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'

const range = ref<[string, string] | null>(['2026-11-01', '2026-11-05'])
const rangeTime = ref<[string, string] | null>(['2026-11-01 09:00', '2026-11-05 18:00'])
</script>

<style scoped>
.value {
  margin: 0;
  color: var(--k-color-text-tertiary);
  font-size: 12px;
  white-space: pre-wrap;
}
</style>