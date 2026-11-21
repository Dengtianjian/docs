<template>
  <div class="demo">
    <KNavigationMenu v-model:value="active" :items="items" @select="onSelect" />
    <p class="tip">当前选中：{{ active ?? '（无）' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KNavigationMenu from 'kit/vue/ui/components/NavigationMenu/NavigationMenu.vue'
import type { KNavigationMenuItem } from 'kit/vue/ui/components/NavigationMenu/NavigationMenu.vue'

const active = ref<string | number | null>('kbutton')
const items: KNavigationMenuItem[] = [
  {
    key: 'product',
    label: '产品',
    children: [
      { key: 'kbutton', label: 'KButton 按钮', description: '基础交互' },
      { key: 'ktable', label: 'KTable 表格', description: '数据展示与粘性列' },
      { key: 'kchart', label: 'KChart 图表', description: '零依赖 SVG 图表' },
    ],
  },
  {
    key: 'resources',
    label: '资源',
    children: [
      { key: 'docs', label: '使用文档', description: '快速上手与 API' },
      { key: 'examples', label: '示例中心', description: '可交互演示' },
      { key: 'changelog', label: '更新日志', description: '版本变更记录', badge: '新' },
    ],
  },
  { key: 'pricing', label: '定价', badge: 'Beta' },
]

function onSelect(item: KNavigationMenuItem) {
  console.log('select', item.label)
}
</script>

<style scoped>
.demo {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.tip {
  margin: 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>
