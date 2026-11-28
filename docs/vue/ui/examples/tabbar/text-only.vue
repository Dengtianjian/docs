<template>
  <div>
    <div class="phone-frame">
      <div class="phone-body">
        <p>不传 icon 时只显示文案，适合二级频道切换。</p>
        <p>当前：{{ active }}</p>
      </div>
      <KTabBar v-model:active="active" :items="items" :fixed="false" />
    </div>
    <div class="tab-tip">标签文字单行省略，条目等分</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KTabBar from 'kit/vue/ui/components/navigation/TabBar/TabBar.vue'
import type { KTabBarItem } from 'kit/vue/ui'

const active = ref('recommend')
const items: KTabBarItem[] = [
  { key: 'recommend', title: '推荐' },
  { key: 'follow', title: '关注' },
  { key: 'video', title: '视频' },
  { key: 'profile', title: '我的' },
]
</script>

<style scoped>
.phone-frame {
  display: flex;
  flex-direction: column;
  width: 375px;
  height: 220px;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: 18px;
  overflow: hidden;
  background: var(--k-color-bg-layout);
}
.phone-body {
  flex: 1;
  padding: 16px;
}
.phone-body p {
  margin: 0 0 8px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
  line-height: 1.7;
}
.tab-tip {
  margin-top: 12px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>