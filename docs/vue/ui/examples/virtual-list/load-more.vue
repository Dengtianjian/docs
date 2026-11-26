<template>
  <div class="load-demo">
    <div class="load-hint">已加载 {{ items.length.toLocaleString('zh-CN') }} / {{ TOTAL.toLocaleString('zh-CN') }} 条</div>
    <KVirtualList
      ref="list"
      :items="items"
      :item-height="44"
      :height="360"
      item-key="id"
      class="frame"
      @scroll="onScroll"
    >
      <template #default="{ item, index }">
        <div class="row" :class="{ odd: index % 2 === 0 }">
          <span class="index">#{{ item.id }}</span>
          <span class="label">{{ item.label }}</span>
        </div>
      </template>
    </KVirtualList>
    <div class="status">
      <KSpin v-if="loading" size="sm" />
      <span v-if="loading">加载中…</span>
      <span v-else-if="!hasMore">已全部加载</span>
      <span v-else>继续向下滚动，自动加载更多</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import KVirtualList from 'kit/vue/ui/components/data-display/VirtualList/VirtualList.vue'
import KSpin from 'kit/vue/ui/components/feedback/Spin/Spin.vue'

const TOTAL = 20000
const PAGE_SIZE = 200
const list = ref<InstanceType<typeof KVirtualList> | null>(null)
const items = ref(createItems(0, 300))
const loading = ref(false)
const hasMore = computed(() => items.value.length < TOTAL)
let timer: number | undefined

function createItems(start: number, count: number) {
  return Array.from({ length: Math.min(count, TOTAL - start) }, (_, offset) => {
    const id = start + offset + 1
    return { id, label: `第 ${id} 条动态数据` }
  })
}

function onScroll(scrollTop: number) {
  if (loading.value || !hasMore.value) return
  const viewport = list.value?.viewportEl?.clientHeight ?? 360
  const distanceToBottom = items.value.length * 44 - (scrollTop + viewport)
  if (distanceToBottom > 120) return
  loading.value = true
  timer = window.setTimeout(() => {
    items.value.push(...createItems(items.value.length, PAGE_SIZE))
    loading.value = false
  }, 500)
}

onBeforeUnmount(() => {
  if (timer) window.clearTimeout(timer)
})
</script>

<style scoped>
.load-demo {
  max-width: 520px;
}
.load-hint {
  margin-bottom: 8px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
  font-variant-numeric: tabular-nums;
}
.frame {
  border: 1px solid var(--k-color-border);
  border-radius: var(--k-border-radius);
  background: var(--k-color-bg-container);
}
.row {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 44px;
  padding: 0 12px;
  font-size: var(--k-font-size-sm);
}
.row.odd {
  background: var(--k-color-fill-quaternary);
}
.index {
  width: 64px;
  flex: none;
  color: var(--k-color-text-tertiary);
  font-variant-numeric: tabular-nums;
}
.label {
  color: var(--k-color-text);
}
.status {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>