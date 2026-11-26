<template>
  <div class="k-doc-placements">
    <KPopover v-for="p in placements" :key="p" :title="`= ${p}`" :placement="p" trigger="click" content="12 方位与 Tooltip 同一套基座（utils/overlay），点空白或 Esc 关闭。">
      <template #trigger><KButton size="sm">{{ p }}</KButton></template>
    </KPopover>
  </div>
</template>

<script setup lang="ts">
import KPopover from 'kit/vue/ui/components/overlay/Popover/Popover.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'

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
