<template>
  <KMentions
    v-model="text"
    :options="options"
    :rows="3"
    placeholder="输入 @ 后滚动列表，触底加载更多"
    @reach-bottom="loadMore"
  >
    <template #footer>
      <span class="mentions-paging__status">
        {{ done ? `已全部加载（${all.length} 人）` : loading ? '加载中…' : '滚动到底部加载更多' }}
      </span>
    </template>
  </KMentions>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import KMentions from 'kit/vue/ui/components/data-entry/Mentions/Mentions.vue'
import type { KMentionsOption } from 'kit/vue/ui/components/data-entry/Mentions/Mentions.vue'

const PAGE_SIZE = 30
const all: KMentionsOption[] = Array.from({ length: 200 }, (_, i) => ({
  label: `成员 ${String(i + 1).padStart(3, '0')}`,
  value: `user-${i + 1}`
}))

const text = ref('请 @')
const options = ref(all.slice(0, PAGE_SIZE))
const loading = ref(false)
const done = computed(() => options.value.length >= all.length)

async function loadMore() {
  if (loading.value || done.value) return
  loading.value = true
  await new Promise((resolve) => setTimeout(resolve, 400))
  options.value = all.slice(0, options.value.length + PAGE_SIZE)
  loading.value = false
}
</script>

<style scoped>
.mentions-paging__status {
  color: var(--k-color-text-tertiary);
}
</style>