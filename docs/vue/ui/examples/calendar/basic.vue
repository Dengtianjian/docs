<template>
  <div class="demo">
    <KCalendar v-model="value" :fullscreen="false" />
    <p class="tip">当前选择：{{ label }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import KCalendar from 'kit/vue/ui/components/Calendar/Calendar.vue'

const value = ref<number | null>(Date.now())
const label = computed(() =>
  value.value == null
    ? '未选择'
    : new Date(value.value).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }),
)
</script>

<style scoped>
.demo {
  max-width: 380px;
}
.tip {
  margin: 12px 0 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>
