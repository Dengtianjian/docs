<template>
  <div class="mentions-trigger">
    <KMentions v-model="text" :options="options" :rows="3">
      <template #trigger>
        <KInput
          v-model="text"
          type="textarea"
          :rows="3"
          variant="filled"
          placeholder="自定义触发器：KInput + 前缀图标，输入 @ 唤起候选"
        >
          <template #prefix>
            <span class="mentions-trigger__icon">@</span>
          </template>
        </KInput>
      </template>
    </KMentions>
    <div class="mentions-trigger__preview">
      <div class="mentions-trigger__label">当前内容</div>
      <pre>{{ text || '（空）' }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KMentions from 'kit/vue/ui/components/data-entry/Mentions/Mentions.vue'
import type { KMentionsOption } from 'kit/vue/ui/components/data-entry/Mentions/Mentions.vue'
import KInput from 'kit/vue/ui/components/data-entry/Input/Input.vue'

const text = ref('请 @')
const options: KMentionsOption[] = [
  { label: '张三', value: 'zhangsan' },
  { label: '李四', value: 'lisi' },
  { label: '王五', value: 'wangwu' },
  { label: '产品组', value: 'product' },
  { label: '设计组', value: 'design' }
]
</script>

<style scoped>
.mentions-trigger {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(220px, 1fr);
  gap: 24px;
}
.mentions-trigger__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--k-color-primary-bg);
  color: var(--k-color-primary);
  font-size: 12px;
  line-height: 1;
}
.mentions-trigger__preview {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}
.mentions-trigger__label {
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
.mentions-trigger__preview pre {
  min-height: 96px;
  margin: 0;
  padding: 12px;
  border-radius: var(--k-border-radius);
  background: var(--k-color-fill-quaternary);
  white-space: pre-wrap;
}
@media (max-width: 640px) {
  .mentions-trigger {
    grid-template-columns: 1fr;
  }
}
</style>