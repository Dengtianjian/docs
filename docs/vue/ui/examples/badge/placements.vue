<template>
  <KFlex vertical gap="lg">
    <div class="grid">
      <div v-for="item in placements" :key="item.placement" class="cell">
        <KBadge :count="5" :placement="item.placement">
          <span class="box">{{ item.label }}</span>
        </KBadge>
      </div>
    </div>
    <KFlex align="center">
      <KBadge :count="5" placement="top-start" :offset="[-4, -4]">
        <span class="box">偏移 -4,-4</span>
      </KBadge>
      <KBadge :count="5" placement="bottom-end" :offset="[6, 4]">
        <span class="box">偏移 +6,+4</span>
      </KBadge>
      <KBadge dot placement="start">
        <span class="box">圆点 start</span>
      </KBadge>
    </KFlex>
  </KFlex>
</template>

<script setup lang="ts">
import KBadge from 'kit/vue/ui/components/data-display/Badge/Badge.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
import type { KBadgePlacement } from 'kit/vue/ui'

const placements: { placement: KBadgePlacement; label: string }[] = [
  { placement: 'top-start', label: 'top-start' },
  { placement: 'top', label: 'top' },
  { placement: 'top-end', label: 'top-end' },
  { placement: 'start', label: 'start' },
  { placement: 'center', label: 'center' },
  { placement: 'end', label: 'end' },
  { placement: 'bottom-start', label: 'bottom-start' },
  { placement: 'bottom', label: 'bottom' },
  { placement: 'bottom-end', label: 'bottom-end' },
]
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, max-content);
  gap: 24px 28px;
}
.cell {
  display: flex;
  justify-content: center;
}
.box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 104px;
  height: 44px;
  padding: 0 12px;
  border-radius: 8px;
  background: var(--k-color-fill-secondary);
  color: var(--k-color-text-secondary);
  font-size: 12px;
}
</style>
