<template>
  <KList>
    <KListItem v-for="item in items" :key="item.id" clickable @click="selected = item.name">
      <template #avatar>
        <KAvatar :text="item.name.slice(0, 1)" size="sm" />
      </template>
      <template #title>{{ item.name }}</template>
      <template #description>{{ item.role }}</template>
      <template #extra>
        <KButton size="xs" variant="quiet" @click="removed.push(item.name)">移除</KButton>
      </template>
    </KListItem>
  </KList>
  <p class="hint">选中：{{ selected || '无' }}；已移除：{{ removed.join('、') || '无' }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KAvatar from 'kit/vue/ui/components/Avatar/Avatar.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KList from 'kit/vue/ui/components/List/List.vue'
import KListItem from 'kit/vue/ui/components/List/ListItem.vue'

const items = [
  { id: 1, name: '如意', role: '前端工程师' },
  { id: 2, name: '青柠', role: '设计师' },
  { id: 3, name: '山茶', role: '产品经理' },
]
const selected = ref('')
const removed = ref<string[]>([])
</script>

<style scoped>
.hint {
  margin: 12px 0 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>