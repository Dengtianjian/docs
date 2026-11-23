<template>
  <div class="grid-demo">
    <KGrid><KGridItem :span="24"><div class="cell">24</div></KGridItem></KGrid>
    <KGrid>
      <KGridItem :span="12"><div class="cell">12</div></KGridItem>
      <KGridItem :span="12"><div class="cell light">12</div></KGridItem>
    </KGrid>
    <KGrid>
      <KGridItem v-for="i in 3" :key="i" :span="8"><div :class="['cell', i === 2 && 'light']">8</div></KGridItem>
    </KGrid>
    <KGrid>
      <KGridItem v-for="i in 6" :key="i" :span="4"><div :class="['cell', i % 2 && 'light']">4</div></KGridItem>
    </KGrid>
  </div>
</template>

<script setup lang="ts">
import KGrid from 'kit/vue/ui/components/Grid/Grid.vue'
import KGridItem from 'kit/vue/ui/components/Grid/GridItem.vue'
</script>

<style scoped>
.grid-demo .cell,
.grid-demo .cell.light {
  height: 36px;
  line-height: 36px;
  text-align: center;
  color: #fff;
  font-size: var(--k-font-size-sm);
  border-radius: var(--k-border-radius);
}
.grid-demo .cell {
  background: var(--k-color-primary);
}
.grid-demo .cell.light {
  background: var(--k-color-primary-bg-hover);
  color: var(--k-color-primary);
}
.grid-demo > * + * {
  margin-top: 8px;
}
</style>