<template>
  <KSpace direction="vertical" size="sm">
    <p class="tip">按 <kbd>⌘</kbd> / <kbd>Ctrl</kbd> + <kbd>K</kbd> 随时唤起；搜索支持子序列，例如 <code>kbt</code> 可命中 <code>KButton</code>。</p>
    <KCommandPalette v-model:open="open" :items="items" hotkey="mod+k">
      <template #item="{ item, active }">
        <span class="row" :class="{ 'is-active': active }">
          <strong>{{ item.label }}</strong>
          <span>{{ item.description }}</span>
        </span>
      </template>
      <template #footer="{ count }">
        <span>{{ count }} 个命令</span>
        <span>Esc 关闭</span>
      </template>
    </KCommandPalette>
    <KButton variant="outline" @click="open = true">也可以点这里打开</KButton>
  </KSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KCommandPalette from 'kit/vue/ui/components/CommandPalette/CommandPalette.vue'
import type { KCommandPaletteItem } from 'kit/vue/ui/components/CommandPalette/CommandPalette.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const open = ref(false)
const items: KCommandPaletteItem[] = [
  { key: 'button', label: 'KButton 按钮', description: '基础按钮与变体', group: '组件' },
  { key: 'input', label: 'KInput 输入框', description: '前后缀、计数与清空', group: '组件' },
  { key: 'table', label: 'KTable 表格', description: '固定列与虚拟滚动', group: '组件' },
]
</script>

<style scoped>
.tip {
  margin: 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
  line-height: 1.7;
}
.row {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  gap: 2px;
}
.row strong {
  font-weight: 500;
}
.row span {
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-sm);
}
kbd {
  padding: 1px 5px;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: 4px;
  background: var(--k-color-fill-quaternary);
  font-family: var(--k-font-family-mono);
  font-size: 11px;
}
</style>