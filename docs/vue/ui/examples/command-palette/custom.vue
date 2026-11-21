<template>
  <div class="demo">
    <KButton @click="open = true">自定义命令项</KButton>
    <KCommandPalette v-model:open="open" :items="items">
      <template #item="{ item, active }">
        <span class="emoji" :class="{ active }">{{ item.emoji }}</span>
        <span class="main">
          <strong>{{ item.label }}</strong>
          <small>{{ item.description }}</small>
        </span>
        <kbd v-if="item.shortcut">{{ item.shortcut }}</kbd>
      </template>
      <template #empty>
        <span>换个关键词试试，例如「导出」</span>
      </template>
    </KCommandPalette>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KCommandPalette from 'kit/vue/ui/components/CommandPalette/CommandPalette.vue'
import type { KCommandPaletteItem } from 'kit/vue/ui/components/CommandPalette/CommandPalette.vue'

const open = ref(false)
const items = [
  { key: 'export', label: '导出数据', group: '数据', description: '导出为 CSV', emoji: '⤓', shortcut: 'E' },
  { key: 'import', label: '导入数据', group: '数据', description: '从文件导入', emoji: '⤒' },
  { key: 'share', label: '分享链接', group: '协作', description: '生成只读链接', emoji: '↗' },
] as (KCommandPaletteItem & { emoji: string })[]
</script>

<style scoped>
.demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.emoji {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: var(--k-border-radius-sm);
  background: var(--k-color-fill-secondary);
  font-size: 15px;
}
.emoji.active {
  background: var(--k-color-primary-bg);
}
.main {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.main small {
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-sm);
}
kbd {
  padding: 1px 5px;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: var(--k-border-radius-sm);
  color: var(--k-color-text-tertiary);
  font-size: 11px;
}
</style>
