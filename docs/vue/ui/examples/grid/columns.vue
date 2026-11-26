<template>
  <div class="grid-columns">
    <section>
      <div class="grid-columns__label">列数响应式：xs 1 列 / sm 2 列 / md 4 列</div>
      <KGrid :columns="{ xs: 1, sm: 2, md: 4 }" gap="md">
        <KGridItem v-for="i in 4" :key="i">
          <div class="cell">{{ i }}</div>
        </KGridItem>
      </KGrid>
    </section>

    <section>
      <div class="grid-columns__label">固定 3 列 + span 跨列</div>
      <KGrid :columns="3" gap="sm">
        <KGridItem :span="2"><div class="cell">跨 2 列</div></KGridItem>
        <KGridItem><div class="cell light">1 列</div></KGridItem>
        <KGridItem><div class="cell light">1 列</div></KGridItem>
        <KGridItem :span="2"><div class="cell light">跨 2 列</div></KGridItem>
      </KGrid>
    </section>

    <section>
      <div class="grid-columns__label">固定 4 列 + start 指定起点</div>
      <KGrid :columns="4" gap="sm">
        <KGridItem :start="2" :span="2"><div class="cell light">start=2 / span=2</div></KGridItem>
      </KGrid>
    </section>
  </div>
</template>

<script setup lang="ts">
import KGrid from 'kit/vue/ui/components/layouts/Grid/Grid.vue'
import KGridItem from 'kit/vue/ui/components/layouts/Grid/GridItem.vue'
</script>

<style scoped>
.grid-columns {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.grid-columns__label {
  margin-bottom: 8px;
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-sm);
}
.cell {
  height: 36px;
  padding: 0 8px;
  overflow: hidden;
  border-radius: var(--k-border-radius);
  background: var(--k-color-primary);
  color: #fff;
  font-size: var(--k-font-size-sm);
  line-height: 36px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cell.light {
  background: var(--k-color-primary-bg-hover);
  color: var(--k-color-primary);
}
</style>