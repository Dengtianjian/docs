<template>
  <div class="mentions-async">
    <KMentions
      v-model="text"
      :fetch-options="fetchOptions"
      :debounce="300"
      :rows="3"
      placeholder="输入 @ 搜索成员（模拟远程请求 500ms）"
      @select="onSelect"
    />
    <div class="mentions-async__preview">
      <div class="mentions-async__label">当前内容</div>
      <pre>{{ text || '（空）' }}</pre>
      <div class="mentions-async__label">最后一次选择</div>
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

const members: KMentionsOption[] = [
  { label: '张三', value: 'zhangsan' },
  { label: '李四', value: 'lisi' },
  { label: '王五', value: 'wangwu' },
  { label: '赵六', value: 'zhaoliu' },
  { label: '产品组', value: 'product' },
  { label: '设计组', value: 'design' },
  { label: '研发组', value: 'dev' },
  { label: '测试组', value: 'qa' }
]

async function fetchOptions(pattern: string): Promise<KMentionsOption[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const query = pattern.trim().toLowerCase()
  return members.filter(
    (item) => !query || item.label.toLowerCase().includes(query) || item.value.includes(query)
  )
}

function onSelect(option: KMentionsOption) {
  lastSelected.value = `${option.label} (${option.value})`
}
</script>

<style scoped>
.mentions-async {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(220px, 1fr);
  gap: 24px;
}
.mentions-async__preview {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}
.mentions-async__label {
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
.mentions-async__preview pre {
  min-height: 96px;
  margin: 0;
  padding: 12px;
  border-radius: var(--k-border-radius);
  background: var(--k-color-fill-quaternary);
  white-space: pre-wrap;
}
@media (max-width: 640px) {
  .mentions-async {
    grid-template-columns: 1fr;
  }
}
</style>