<template>
  <div class="mentions-demo">
    <KMentions
      v-model="text"
      :options="options"
      :rows="4"
      placeholder="输入 @ 提及成员，输入 # 提及标签"
      @select="onSelect"
    />
    <div class="mentions-demo__preview">
      <div class="mentions-demo__label">当前内容</div>
      <pre>{{ text || '（空）' }}</pre>
      <div class="mentions-demo__label">最后一次选择</div>
      <code>{{ lastSelected || '（未选择）' }}</code>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KMentions from 'kit/vue/ui/components/data-entry/Mentions/Mentions.vue'
import type { KMentionsOption } from 'kit/vue/ui/components/data-entry/Mentions/Mentions.vue'

const text = ref('请 @')
const lastSelected = ref('')
const options: KMentionsOption[] = [
  { label: '张三', value: 'zhangsan' },
  { label: '李四', value: 'lisi' },
  { label: '王五', value: 'wangwu', disabled: true },
  { label: '产品组', value: 'product' },
  { label: '设计组', value: 'design' }
]

function onSelect(option: KMentionsOption) {
  lastSelected.value = `${option.label} (${option.value})`
}
</script>

<style scoped>
.mentions-demo {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(220px, 1fr);
  gap: 24px;
}
.mentions-demo__preview {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}
.mentions-demo__label {
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
.mentions-demo__preview pre {
  min-height: 96px;
  margin: 0;
  padding: 12px;
  border-radius: var(--k-border-radius);
  background: var(--k-color-fill-quaternary);
  white-space: pre-wrap;
}
@media (max-width: 640px) {
  .mentions-demo {
    grid-template-columns: 1fr;
  }
}
</style>