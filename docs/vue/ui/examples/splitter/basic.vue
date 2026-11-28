<template>
  <div class="frame">
    <KSplitter v-model="sizes" :panels="panels" :gutter-size="10">
      <template #panel="{ index }">
        <div class="pane" :class="`pane-${index}`">
          <strong>面板 {{ index + 1 }}</strong>
          <span>{{ Math.round(sizes[index] ?? 0) }}%</span>
        </div>
      </template>
    </KSplitter>
  </div>
  <p class="tip">拖动分隔条，或聚焦后使用 ← / → 调整；Shift 加速。</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KSplitter from 'kit/vue/ui/components/layouts/Splitter/Splitter.vue'
import type { KSplitterPanel } from 'kit/vue/ui/components/layouts/Splitter/Splitter.vue'

const sizes = ref([38, 62])
const panels: KSplitterPanel[] = [
  { key: 'nav', min: 20 },
  { key: 'content', min: 30 },
]
</script>

<style scoped>
.frame {
  height: 160px;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: var(--k-border-radius);
  overflow: hidden;
}
.pane {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
.pane strong {
  color: var(--k-color-text);
  font-size: var(--k-font-size);
}
.pane-0 { background: var(--k-color-fill-tertiary); }
.pane-1 { background: var(--k-color-bg-container); }
.tip {
  margin: 12px 0 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>