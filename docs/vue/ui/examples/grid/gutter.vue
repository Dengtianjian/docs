<template>
  <div class="grid-demo">
    <KGrid :gap="16">
      <KGridItem v-for="i in 4" :key="i" :span="6"><div class="cell">6</div></KGridItem>
    </KGrid>
    <KGrid :gap="[16, 8]">
      <KGridItem v-for="i in 6" :key="i" :span="8"><div class="cell">{{ 8 }}</div></KGridItem>
    </KGrid>
  </div>
</template>

<script setup lang="ts">
import KGrid from 'kit/vue/ui/components/Grid/Grid.vue'
import KGridItem from 'kit/vue/ui/components/Grid/GridItem.vue'
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
.grid-demo > * + * {
  margin-top: 8px;
}
</style>