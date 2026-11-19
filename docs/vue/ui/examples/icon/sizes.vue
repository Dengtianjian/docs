<template>
  <span style="display: inline-flex; align-items: center; gap: 16px">
    <KIcon :component="Star" label="xs" size="xs" />
    <KIcon :component="Star" label="sm" size="sm" />
    <KIcon :component="Star" label="md" size="md" />
    <KIcon :component="Star" label="lg" size="lg" />
    <KIcon :component="Star" label="40px" :size="40" />
    <span style="color: var(--k-color-warning); font-size: 24px">
      <KIcon :component="Star" label="继承 currentColor" />
    </span>
  </span>
</template>

<script setup lang="ts">
// 图标集 = @vicons/tabler（Tabler 经 vicons 编译的 Vue3 组件，Q1 选型 2026-11-17 定稿）
import { Star } from '@vicons/tabler'
import KIcon from 'kit/vue/ui/components/Icon/Icon.vue'
</script>
