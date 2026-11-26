<template>
  <KBreadcrumb :items="items">
    <template #before>
      <span class="breadcrumb-slot">当前位置</span>
    </template>
    <template #after>
      <span class="breadcrumb-slot">P4</span>
    </template>
  </KBreadcrumb>
</template>

<script setup lang="ts">
import KBreadcrumb from 'kit/vue/ui/components/navigation/Breadcrumb/Breadcrumb.vue'
import type { KBreadcrumbItemOption } from 'kit/vue/ui'

const items: KBreadcrumbItemOption[] = [
  { label: '首页', href: '#api' },
  { label: '组件', href: '#api' },
  { label: '面包屑' },
]
</script>

<style scoped>
.breadcrumb-slot {
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 var(--k-size-xs);
  border-radius: var(--k-border-radius-full);
  background: var(--k-color-fill-secondary);
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-sm);
}
</style>