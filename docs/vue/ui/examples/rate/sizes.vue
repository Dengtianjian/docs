<template>
  <div class="rate-sizes">
    <div v-for="item in sizes" :key="item.size" class="rate-sizes__row">
      <span class="rate-sizes__label">{{ item.label }}</span>
      <KRate v-model="score" :size="item.size" show-text />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KRate from 'kit/vue/ui/components/data-entry/Rate/Rate.vue'

const score = ref(3)
const sizes = [
  { size: 'xs', label: 'xs · 16px' },
  { size: 'sm', label: 'sm · 20px' },
  { size: 'md', label: 'md · 24px' },
  { size: 'lg', label: 'lg · 32px' }
] as const
</script>

<style scoped>
.rate-sizes {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.rate-sizes__row {
  display: flex;
  align-items: center;
  gap: 16px;
}

.rate-sizes__label {
  width: 84px;
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-sm);
}
</style>