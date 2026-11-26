<template>
  <KMasonry :min-column-width="180" :gap="12">
    <div v-for="(note, index) in notes" :key="index" class="note" :style="{ minHeight: `${notes[index].height}px` }">
      <span class="index">0{{ index + 1 }}</span>
      <p>{{ note.text }}</p>
    </div>
  </KMasonry>
</template>

<script setup lang="ts">
import KMasonry from 'kit/vue/ui/components/data-display/Masonry/Masonry.vue'

const notes = [
  { text: '默认插槽按列瀑布流排列，子项自动避免跨列断行。', height: 90 },
  { text: '不传 columns 时使用 minColumnWidth 自适应列宽。', height: 120 },
  { text: '间距同时作用于列间与行间。', height: 70 },
  { text: '卡片可以包含图片、代码块或任意高度内容。', height: 140 },
  { text: '窄屏时列数自动减少。', height: 80 },
]
</script>

<style scoped>
.note {
  padding: 14px;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: var(--k-border-radius);
  background: var(--k-color-bg-container);
}
.index {
  color: var(--k-color-primary);
  font-family: var(--k-font-family-mono);
  font-size: 11px;
}
.note p {
  margin: 8px 0 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
  line-height: 1.6;
}
</style>