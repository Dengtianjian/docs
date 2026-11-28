<template>
  <div class="layout">
    <KSideBar v-model="active" :items="items" @change="onChange" />
    <div class="main">
      <strong>{{ current?.title }}</strong>
      <p>{{ current?.copy }}</p>
      <span>{{ current?.badge ?? '' }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import KSideBar from 'kit/vue/ui/components/navigation/SideBar/SideBar.vue'
import type { KSideBarItem } from 'kit/vue/ui/components/navigation/SideBar/SideBar.vue'

const active = ref('recommend')
const items: KSideBarItem[] = [
  { key: 'recommend', title: '推荐', badge: 3 },
  { key: 'follow', title: '关注', badge: true },
  { key: 'nearby', title: '附近' },
  { key: 'hot', title: '热榜' },
]
const copyMap: Record<string, string> = {
  recommend: '根据你的收藏与浏览记录生成。',
  follow: '你关注的作者有 2 条新动态。',
  nearby: '3 公里内的活动与门店。',
  hot: '过去 24 小时热度最高的内容。',
}
const current = computed(() => items.find(item => item.key === active.value))

function onChange(key: string | number) {
  active.value = key
}
</script>

<style scoped>
.layout {
  display: flex;
  height: 260px;
  overflow: hidden;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: var(--k-border-radius);
}
.main {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 6px;
  padding: 20px 18px;
  background: var(--k-color-bg-container);
}
.main strong { font-size: var(--k-font-size-lg); }
.main p {
  margin: 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
  line-height: 1.6;
}
</style>