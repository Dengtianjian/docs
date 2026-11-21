<template>
  <div class="phone">
    <div class="body">选择要执行的操作，底部操作条会固定展示。</div>
    <KActionBar :items="items" @select="last = $event.text">
      <template #left>
        <span class="count">已选 3 项</span>
      </template>
    </KActionBar>
  </div>
  <p class="tip">最近操作：{{ last || '（无）' }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KActionBar from 'kit/vue/ui/components/ActionBar/ActionBar.vue'
import type { KActionBarItem } from 'kit/vue/ui/components/ActionBar/ActionBar.vue'

const last = ref('')
const items: KActionBarItem[] = [
  { key: 'cancel', text: '取消' },
  { key: 'save', text: '暂存' },
  { key: 'ok', text: '确认', type: 'primary' },
]
</script>

<style scoped>
.phone {
  max-width: 420px;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: var(--k-border-radius-lg);
  overflow: hidden;
}
.body {
  padding: 24px 16px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
.count {
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
.tip {
  margin: 12px 0 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>