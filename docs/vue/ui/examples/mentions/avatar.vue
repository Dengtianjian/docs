<template>
  <KMentions v-model="text" :options="options" :rows="3" placeholder="输入 @ 选择同事">
    <template #option="{ option }">
      <span class="mentions-avatar__item">
        <span class="mentions-avatar__avatar" :style="{ background: String(option.avatar), color: String(option.avatarText) }">
          {{ option.label.slice(0, 1) }}
        </span>
        <span class="mentions-avatar__text">
          <span class="mentions-avatar__name">{{ option.label }}</span>
          <span class="mentions-avatar__mail">{{ option.value }}</span>
        </span>
      </span>
    </template>
  </KMentions>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KMentions from 'kit/vue/ui/components/data-entry/Mentions/Mentions.vue'
import type { KMentionsOption } from 'kit/vue/ui/components/data-entry/Mentions/Mentions.vue'

const text = ref('请 @')
const options: KMentionsOption[] = [
  { label: '张三', value: 'zhangsan@example.com', avatar: 'var(--k-color-primary-bg)', avatarText: 'var(--k-color-primary)' },
  { label: '李四', value: 'lisi@example.com', avatar: 'var(--k-color-success-bg)', avatarText: 'var(--k-color-success)' },
  { label: '王五', value: 'wangwu@example.com', avatar: 'var(--k-color-warning-bg)', avatarText: 'var(--k-color-warning)' },
  { label: '赵六', value: 'zhaoliu@example.com', avatar: 'var(--k-color-error-bg)', avatarText: 'var(--k-color-error)' },
  { label: '产品组', value: 'product@example.com', avatar: 'var(--k-color-fill-secondary)', avatarText: 'var(--k-color-text-secondary)' },
  { label: '设计组', value: 'design@example.com', avatar: 'var(--k-color-fill-secondary)', avatarText: 'var(--k-color-text-secondary)' }
]
</script>

<style scoped>
.mentions-avatar__item {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: auto;
  min-width: 0;
}
.mentions-avatar__avatar {
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  font-size: 12px;
  line-height: 1;
}
.mentions-avatar__text {
  display: flex;
  flex-direction: column;
  min-width: 0;
  line-height: 1.25;
}
.mentions-avatar__name {
  color: var(--k-color-text);
}
.mentions-avatar__mail {
  overflow: hidden;
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-sm);
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>