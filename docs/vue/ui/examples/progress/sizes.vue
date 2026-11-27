<template>
  <div class="size-demo">
    <div v-for="item in rows" :key="item.size" class="size-row">
      <span class="size-name">{{ item.label }}</span>
      <KProgress :size="item.size" :percent="60" />
      <div class="size-circle">
        <KProgress type="circle" :size="item.size" :percent="60" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import KProgress from 'kit/vue/ui/components/feedback/Progress/Progress.vue'

const rows = [
  { size: 'xs', label: '超小' },
  { size: 'sm', label: '小' },
  { size: 'md', label: '中' },
  { size: 'lg', label: '大' },
] as const
</script>

<style scoped>
.size-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}
.size-row {
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr) 160px;
  align-items: center;
  gap: 20px;
}
.size-circle {
  display: flex;
  justify-content: center;
}
.size-name {
  font-size: var(--k-font-size-sm);
  color: var(--k-color-text-tertiary);
}
</style>