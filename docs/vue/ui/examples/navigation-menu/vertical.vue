<template>
  <div class="panel">
    <KNavigationMenu
      v-model="active"
      :items="items"
      orientation="vertical"
      size="sm"
      @select="last = $event.label"
    />
  </div>
  <p class="tip">纵向菜单点击展开，ArrowRight 展开、ArrowLeft 收起，Esc 关闭。</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KNavigationMenu from 'kit/vue/ui/components/navigation/NavigationMenu/NavigationMenu.vue'
import type { KNavigationMenuItem } from 'kit/vue/ui/components/navigation/NavigationMenu/NavigationMenu.vue'

const active = ref<string | number | null>('overview')
const last = ref('')
const items: KNavigationMenuItem[] = [
  { key: 'overview', label: '概览' },
  {
    key: 'data',
    label: '数据',
    children: [
      { key: 'charts', label: '图表', description: '折线、柱状与饼图' },
      { key: 'tables', label: '表格', description: '大数据量表格' },
    ],
  },
  {
    key: 'settings',
    label: '设置',
    children: [
      { key: 'theme', label: '主题' },
      { key: 'members', label: '成员' },
    ],
  },
]
</script>

<style scoped>
.panel {
  max-width: 260px;
  padding: 8px;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: var(--k-border-radius);
  background: var(--k-color-bg-container);
}
.tip {
  margin: 12px 0 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>