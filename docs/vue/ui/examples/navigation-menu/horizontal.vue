<template>
  <KNavigationMenu v-model="active" :items="items" @select="onSelect" />
  <p class="tip">当前：{{ active || '（未选择）' }} · 最近：{{ last || '（无）' }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KNavigationMenu from 'kit/vue/ui/components/navigation/NavigationMenu/NavigationMenu.vue'
import type { KNavigationMenuItem } from 'kit/vue/ui/components/navigation/NavigationMenu/NavigationMenu.vue'

const active = ref<string | number | null>('dashboard')
const last = ref('')
const items: KNavigationMenuItem[] = [
  { key: 'dashboard', label: '工作台' },
  {
    key: 'design',
    label: '设计',
    children: [
      { key: 'tokens', label: '主题 Token', description: '色彩、圆角与阴影' },
      { key: 'language', label: '设计语言', description: '排版与间距规则' },
      { key: 'responsive', label: '响应式', description: '断点与取值策略' },
    ],
  },
  {
    key: 'components',
    label: '组件',
    children: [
      { key: 'basic', label: '基础展示', description: 'Button、Tag、Badge' },
      { key: 'table', label: '数据展示', description: 'Table、List、Tree' },
    ],
  },
  { key: 'docs', label: '文档' },
]

function onSelect(item: KNavigationMenuItem) {
  last.value = item.label
}
</script>

<style scoped>
.tip {
  margin: 12px 0 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>