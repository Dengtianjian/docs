<template>
  <KFlex vertical gap="sm">
    <KButton @click="open = true">打开命令面板</KButton>
    <p class="tip">最近执行：{{ last || '（无）' }}</p>
    <KCommandPalette v-model:open="open" :items="items" @select="onSelect" />
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KCommandPalette from 'kit/vue/ui/components/overlay/CommandPalette/CommandPalette.vue'
import type { KCommandPaletteItem } from 'kit/vue/ui/components/overlay/CommandPalette/CommandPalette.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const open = ref(false)
const last = ref('')
const items: KCommandPaletteItem[] = [
  { key: 'dashboard', label: '工作台', group: '页面', description: '回到总览', shortcut: 'G D' },
  { key: 'projects', label: '项目列表', group: '页面', description: '查看全部项目', shortcut: 'G P' },
  { key: 'settings', label: '偏好设置', group: '页面', description: '主题、语言与快捷键' },
  { key: 'create', label: '新建项目', group: '操作', description: '创建一个空白项目', keywords: ['create', 'add'], shortcut: 'N' },
  { key: 'theme', label: '切换主题', group: '操作', description: '在亮色与暗色之间切换' },
]

function onSelect(item: KCommandPaletteItem) {
  last.value = `${item.group} / ${item.label}`
}
</script>

<style scoped>
.tip {
  margin: 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>