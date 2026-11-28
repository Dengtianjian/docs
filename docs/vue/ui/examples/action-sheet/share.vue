<template>
  <KButton @click="open = true">分享内容</KButton>
  <p class="tip">最近渠道：{{ last || '（无）' }}</p>
  <KShareSheet v-model:open="open" :actions="actions" @select="onSelect">
    <template #icon="{ action }">
      <span class="share-icon" :style="{ background: action.color }">{{ action.label.slice(0, 1) }}</span>
    </template>
  </KShareSheet>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KShareSheet from 'kit/vue/ui/components/overlay/ShareSheet/ShareSheet.vue'
import type { KActionSheetAction } from 'kit/vue/ui/components/overlay/ActionSheet/ActionSheet.vue'

const open = ref(false)
const last = ref('')
const actions: KActionSheetAction[] = [
  { key: 'wechat', label: '微信', color: '#16a34a' },
  { key: 'moments', label: '朋友圈', color: '#2563eb' },
  { key: 'link', label: '复制链接', color: '#7c3aed' },
  { key: 'poster', label: '生成海报', color: '#f97316' },
]

function onSelect(action: KActionSheetAction) {
  last.value = action.label
  open.value = false
}
</script>

<style scoped>
.share-icon {
  display: inline-flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
}
.tip {
  margin: 10px 0 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>