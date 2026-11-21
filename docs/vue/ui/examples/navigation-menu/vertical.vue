<template>
  <div class="demo">
    <KNavigationMenu orientation="vertical" :items="items" size="sm" />
  </div>
</template>

<script setup lang="ts">
import KNavigationMenu from 'kit/vue/ui/components/NavigationMenu/NavigationMenu.vue'
import type { KNavigationMenuItem } from 'kit/vue/ui/components/NavigationMenu/NavigationMenu.vue'

const items: KNavigationMenuItem[] = [
  {
    key: 'basic',
    label: '基础展示',
    children: [
      { key: 'button', label: 'Button 按钮' },
      { key: 'tag', label: 'Tag 标签' },
      { key: 'avatar', label: 'Avatar 头像' },
    ],
  },
  {
    key: 'data',
    label: '数据与导航',
    children: [
      { key: 'timeline', label: 'Timeline 时间轴' },
      { key: 'calendar', label: 'Calendar 日历' },
      { key: 'chart', label: 'Chart 图表' },
    ],
  },
  { key: 'about', label: '关于 K UI' },
]
</script>

<style scoped>
.demo {
  max-width: 280px;
  padding: 8px 12px;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: var(--k-border-radius);
}
</style>
