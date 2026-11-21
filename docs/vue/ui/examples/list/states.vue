<template>
  <KSpace direction="vertical" size="lg">
    <KButton size="sm" @click="loading = !loading">{{ loading ? '结束加载' : '模拟加载' }}</KButton>
    <KList :items="items" :loading="loading" />
    <KList :items="[]" empty-text="还没有任务" />
  </KSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KList from 'kit/vue/ui/components/List/List.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const loading = ref(false)
const items = [
  { key: 1, title: '第一条', description: '加载中仍保留内容' },
  { key: 2, title: '第二条', description: '遮罩位于列表内部' },
]
</script>