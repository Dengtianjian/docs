<template>
  <KList :items="items" @item-click="onClick">
    <template #header>今日任务</template>
    <template #footer>共 {{ items.length }} 条</template>
  </KList>
  <p class="hint">点击行：{{ clicked || '未点击' }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KList from 'kit/vue/ui/components/data-display/List/List.vue'

const items = [
  { key: 1, title: '完善 KAvatar', description: '补齐图片回退与分组', extra: '进行中' },
  { key: 2, title: 'KTree 勾选', description: '级联与严格模式', extra: '待处理' },
  { key: 3, title: '文档验收', description: '桌面与移动端截图', extra: '已完成' },
]
const clicked = ref('')

function onClick(item: { title?: string }) {
  clicked.value = item.title ?? ''
}
</script>

<style scoped>
.hint {
  margin: 12px 0 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>