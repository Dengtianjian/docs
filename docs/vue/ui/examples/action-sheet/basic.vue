<template>
  <KButton @click="open = true">打开操作面板</KButton>
  <p class="tip">最近操作：{{ last || '（无）' }}</p>
  <KActionSheet
    v-model:open="open"
    title="更多操作"
    description="选择后续动作"
    :actions="actions"
    @select="onSelect"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KActionSheet from 'kit/vue/ui/components/overlay/ActionSheet/ActionSheet.vue'
import type { KActionSheetAction } from 'kit/vue/ui/components/overlay/ActionSheet/ActionSheet.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'

const open = ref(false)
const last = ref('')
const actions: KActionSheetAction[] = [
  { key: 'share', label: '分享链接' },
  { key: 'copy', label: '复制内容' },
  { key: 'report', label: '举报', description: '将在 24 小时内处理' },
  { key: 'delete', label: '删除', color: 'var(--k-color-error)' },
]

function onSelect(action: KActionSheetAction) {
  last.value = action.label
  open.value = false
}
</script>

<style scoped>
.tip {
  margin: 10px 0 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>