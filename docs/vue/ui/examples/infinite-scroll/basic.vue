<template>
  <div class="scroll">
    <KInfiniteScroll
      :loading="loading"
      :finished="finished"
      :immediate-check="false"
      @load="loadMore"
    >
      <div class="list">
        <div v-for="item in items" :key="item.id" class="row">
          <span class="index">{{ item.id }}</span>
          <span>{{ item.text }}</span>
        </div>
      </div>
    </KInfiniteScroll>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KInfiniteScroll from 'kit/vue/ui/components/overlay/InfiniteScroll/InfiniteScroll.vue'

const loading = ref(false)
const finished = ref(false)
const items = ref(
  Array.from({ length: 8 }, (_, index) => ({ id: index + 1, text: `第 ${index + 1} 条记录` })),
)

function loadMore() {
  if (loading.value || finished.value) return
  loading.value = true
  setTimeout(() => {
    const start = items.value.length
    items.value = [
      ...items.value,
      ...Array.from({ length: 4 }, (_, index) => ({
        id: start + index + 1,
        text: `第 ${start + index + 1} 条记录`,
      })),
    ]
    loading.value = false
    if (items.value.length >= 20) finished.value = true
  }, 600)
}
</script>

<style scoped>
.scroll {
  height: 260px;
  overflow-y: auto;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: var(--k-border-radius);
}
.list {
  padding: 8px 14px;
}
.row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid var(--k-color-border-secondary);
  font-size: var(--k-font-size-sm);
}
.index {
  display: inline-flex;
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--k-color-fill-secondary);
  color: var(--k-color-text-tertiary);
  font-size: 11px;
}
</style>