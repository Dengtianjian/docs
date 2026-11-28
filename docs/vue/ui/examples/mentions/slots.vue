<template>
  <KMentions v-model="text" :options="options" :rows="3" placeholder="输入 @ 选择成员">
    <template #header>
      <span class="mentions-slots__title">选择成员</span>
      <span class="mentions-slots__count">共 {{ options.length }} 人</span>
    </template>
    <template #footer>
      <span class="mentions-slots__hint">↑↓ 切换 · Enter / Tab 选中 · Esc 关闭</span>
    </template>
  </KMentions>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KMentions from 'kit/vue/ui/components/data-entry/Mentions/Mentions.vue'
import type { KMentionsOption } from 'kit/vue/ui/components/data-entry/Mentions/Mentions.vue'

const text = ref('请 @')
const options: KMentionsOption[] = [
  { label: '张三', value: 'zhangsan' },
  { label: '李四', value: 'lisi' },
  { label: '王五', value: 'wangwu', disabled: true },
  { label: '产品组', value: 'product' },
  { label: '设计组', value: 'design' }
]
</script>

<style scoped>
.mentions-slots__title {
  color: var(--k-color-text);
}
.mentions-slots__count {
  margin-inline-start: 8px;
  color: var(--k-color-text-tertiary);
}
.mentions-slots__hint {
  color: var(--k-color-text-tertiary);
}
</style>