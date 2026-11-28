<template>
  <div class="grid-demo">
    <KGrid>
      <KGridItem :span="6"><div class="cell">span 6</div></KGridItem>
      <KGridItem :span="6" :start="13"><div class="cell light">span 6 + start 13</div></KGridItem>
    </KGrid>
    <!-- 需要按比例分配时用 KFlex，而不是栅格 -->
    <KFlex :inline="false" gap="8">
      <div class="cell" style="flex: 2">flex: 2</div>
      <div class="cell light" style="flex: 3">flex: 3</div>
      <div class="cell" style="flex: 0 0 120px">120px</div>
    </KFlex>
  </div>
</template>

<script setup lang="ts">
import KGrid from 'kit/vue/ui/components/layouts/Grid/Grid.vue'
import KGridItem from 'kit/vue/ui/components/layouts/Grid/GridItem.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
</script>

<style scoped>
.grid-demo .cell {
  height: 36px;
  line-height: 36px;
  text-align: center;
  color: #fff;
  background: var(--k-color-primary);
  border-radius: var(--k-border-radius);
}
.grid-demo .cell.light {
  background: var(--k-color-primary-bg-hover);
  color: var(--k-color-primary);
}
.grid-demo > * + * {
  margin-top: 8px;
}
</style>