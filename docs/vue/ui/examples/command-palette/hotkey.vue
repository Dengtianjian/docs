<template>
  <div class="demo">
    <KButton @click="open = true">搜索组件…</KButton>
    <KCommandPalette
      v-model:open="open"
      :items="items"
      placeholder="输入组件名，如 kbtn / table"
      empty-text="没有匹配的组件"
      hotkey="mod+k"
      @search="query = $event"
    >
      <template #footer>
        <span>搜索：{{ query || '—' }}</span>
        <span>{{ items.length }} 个组件</span>
      </template>
    </KCommandPalette>
    <p class="tip">支持子序列匹配：`kbtn` 可命中 `KButton`；按 ⌘ / Ctrl + K 随时打开。</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KCommandPalette from 'kit/vue/ui/components/CommandPalette/CommandPalette.vue'
import type { KCommandPaletteItem } from 'kit/vue/ui/components/CommandPalette/CommandPalette.vue'

const open = ref(false)
const query = ref('')
const items: KCommandPaletteItem[] = [
  { key: 'kbutton', label: 'KButton 按钮', group: '基础展示', description: '触发操作或提交表单', keywords: ['btn'] },
  { key: 'kcard', label: 'KCard 卡片', group: '基础展示', description: '承载内容的容器' },
  { key: 'ktable', label: 'KTable 表格', group: '数据展示', description: '排序、筛选、固定列与合并' },
  { key: 'kchart', label: 'KChart 图表', group: '数据展示', description: '折线、柱状、饼图与外部适配' },
  { key: 'kcalendar', label: 'KCalendar 日历', group: '数据与导航', description: '月历与年月选择' },
]
</script>

<style scoped>
.demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}
.tip {
  margin: 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>
