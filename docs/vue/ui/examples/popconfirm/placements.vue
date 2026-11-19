<template>
  <div class="k-doc-placements">
    <KPopconfirm v-for="p in placements" :key="p" :placement="p" title="确认删除？" :description="`= ${p}`">
      <template #trigger><KButton size="sm">{{ p }}</KButton></template>
    </KPopconfirm>
  </div>
</template>

<script setup lang="ts">
import KPopconfirm from 'kit/vue/ui/components/Popconfirm/Popconfirm.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'

const placements = [
  'topLeft', 'top', 'topRight',
  'leftTop', 'left', 'leftBottom',
  'rightTop', 'right', 'rightBottom',
  'bottomLeft', 'bottom', 'bottomRight',
] as const
</script>

<style scoped>
.k-doc-placements :deep(.k-button) {
  width: 100px; /* 等宽格位：箭头偏移差异只来自方位，不来自按钮宽窄 */
}
.k-doc-placements {
  display: grid;
  grid-template-columns: repeat(3, max-content);
  gap: 48px 56px;
  justify-content: center;
  padding: 72px 0;
}
</style>
