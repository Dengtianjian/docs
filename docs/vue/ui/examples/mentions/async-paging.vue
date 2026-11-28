<template>
  <KMentions
    v-model="text"
    :options="options"
    :loading="loading"
    virtual
    :rows="3"
    placeholder="输入 @ 检索 1200 位成员（异步 + 分页 + 虚拟滚动）"
    @search="onSearch"
    @reach-bottom="loadMore"
  >
    <template #header>
      <span class="mentions-async-paging__title">成员检索</span>
      <span class="mentions-async-paging__count">
        {{ loading && !options.length ? '正在检索…' : `已加载 ${options.length}${total ? ` / ${total}` : ''}` }}
      </span>
    </template>
    <template #footer>
      <span class="mentions-async-paging__status">
        {{ done ? `已全部加载（${total} 人）` : loading ? (options.length ? '加载中…' : '正在检索…') : '滚动到底部加载更多' }}
      </span>
    </template>
  </KMentions>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import KMentions from 'kit/vue/ui/components/data-entry/Mentions/Mentions.vue'
import type { KMentionsOption } from 'kit/vue/ui/components/data-entry/Mentions/Mentions.vue'

const PAGE_SIZE = 40
const SEARCH_DELAY = 300
const FETCH_DELAY = 400

const all: KMentionsOption[] = Array.from({ length: 1200 }, (_, i) => ({
  label: `成员 ${String(i + 1).padStart(4, '0')}`,
  value: `user-${i + 1}`
}))

const text = ref('请 @')
const options = ref<KMentionsOption[]>([])
const total = ref(0)
const loading = ref(false)
const done = computed(() => total.value > 0 && options.value.length >= total.value)

let query = ''
let page = 0
let requestId = 0
let timer: ReturnType<typeof setTimeout> | null = null

function serverSearch(pattern: string, pageIndex: number) {
  const q = pattern.toLowerCase()
  const matched = all.filter(
    (item) => !q || item.label.toLowerCase().includes(q) || item.value.includes(q)
  )
  return {
    list: matched.slice(pageIndex * PAGE_SIZE, (pageIndex + 1) * PAGE_SIZE),
    total: matched.length
  }
}

function onSearch(pattern: string) {
  if (timer) clearTimeout(timer)
  const id = ++requestId
  query = pattern
  page = 0
  options.value = []
  total.value = 0
  loading.value = true
  timer = setTimeout(async () => {
    await new Promise((resolve) => setTimeout(resolve, FETCH_DELAY))
    if (id !== requestId) return
    const result = serverSearch(query, page)
    options.value = result.list
    total.value = result.total
    loading.value = false
  }, SEARCH_DELAY)
}

async function loadMore() {
  if (loading.value || done.value) return
  const id = requestId
  loading.value = true
  await new Promise((resolve) => setTimeout(resolve, FETCH_DELAY))
  if (id !== requestId) return
  page += 1
  options.value = [...options.value, ...serverSearch(query, page).list]
  loading.value = false
}

onBeforeUnmount(() => {
  requestId += 1
  if (timer) clearTimeout(timer)
})
</script>

<style scoped>
.mentions-async-paging__title {
  color: var(--k-color-text);
}
.mentions-async-paging__count {
  margin-inline-start: 8px;
  color: var(--k-color-text-tertiary);
}
.mentions-async-paging__status {
  color: var(--k-color-text-tertiary);
}
</style>