<template>
  <div class="frame">
    <KSplitter v-model="sizes" direction="vertical" :panels="panels">
      <template #panel="{ index }">
        <div class="row" :class="`row-${index}`">
          <span>区域 {{ index + 1 }}</span>
          <span class="value">{{ Math.round(sizes[index] ?? 0) }}%</span>
        </div>
      </template>
    </KSplitter>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KSplitter from 'kit/vue/ui/components/Splitter/Splitter.vue'
import type { KSplitterPanel } from 'kit/vue/ui/components/Splitter/Splitter.vue'

const sizes = ref([50, 28, 22])
const panels: KSplitterPanel[] = [
  { key: 'top', min: 20 },
  { key: 'middle', min: 15 },
  { key: 'bottom', min: 10, max: 40 },
]
</script>

<style scoped>
.frame {
  height: 240px;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: var(--k-border-radius);
  overflow: hidden;
}
.row {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
.row-0 { background: var(--k-color-fill-tertiary); }
.row-1 { background: var(--k-color-bg-container); }
.row-2 { background: var(--k-color-fill-quaternary); }
.value {
  color: var(--k-color-text-tertiary);
  font-family: var(--k-font-family-mono);
  font-size: 12px;
}
</style>