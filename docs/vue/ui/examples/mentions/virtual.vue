<template>
  <KMentions
    v-model="text"
    :options="options"
    virtual
    :rows="3"
    placeholder="输入 @ 浏览 2000 个候选（虚拟滚动）"
  >
    <template #header>
      <span class="mentions-virtual__title">全部成员</span>
      <span class="mentions-virtual__count">{{ options.length }} 人 · 虚拟滚动</span>
    </template>
  </KMentions>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KMentions from 'kit/vue/ui/components/data-entry/Mentions/Mentions.vue'
import type { KMentionsOption } from 'kit/vue/ui/components/data-entry/Mentions/Mentions.vue'

const text = ref('请 @')
const options: KMentionsOption[] = Array.from({ length: 2000 }, (_, i) => ({
  label: `成员 ${String(i + 1).padStart(4, '0')}`,
  value: `user-${i + 1}`
}))
</script>

<style scoped>
.mentions-virtual__title {
  color: var(--k-color-text);
}
.mentions-virtual__count {
  margin-inline-start: 8px;
  color: var(--k-color-text-tertiary);
}
</style>