<template>
  <div class="probe">
    <span class="probe__label">{{ label }}</span>
    <span>当前档：<b>{{ current }}</b></span>
    <span>isMobile：<b>{{ isMobile ? 'true' : 'false' }}</b></span>
    <KButton size="xs:sm md:lg">响应式按钮</KButton>
  </div>
</template>

<script setup lang="ts">
import { useBreakpoint } from 'kit/vue/ui'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'

defineProps<{ label: string }>()

const { current, isMobile } = useBreakpoint()
</script>

<style scoped>
.probe {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border: 1px dashed var(--k-color-border);
  border-radius: var(--k-border-radius);
  font-size: var(--k-font-size-sm);
}
.probe__label {
  color: var(--k-color-text-secondary);
}
</style>