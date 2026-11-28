<template>
  <KGrid :columns="24" :gap="[16, 16]">
    <template #render="ctx">
      <div v-bind="ctx.rootAttrs" class="hl-grid">
        <KGridItem v-for="n in 3" :key="n" :span="8">
          <template #render="item">
            <div v-bind="item.rootAttrs" class="hl-grid__box">
              span={{ item.span }} · columns={{ ctx.columns }} · gap={{ ctx.gap.join(' / ') }}
            </div>
          </template>
        </KGridItem>
      </div>
    </template>
  </KGrid>
</template>

<script setup lang="ts">
import KGrid from 'kit/vue/ui/components/layouts/Grid/Grid.vue'
import KGridItem from 'kit/vue/ui/components/layouts/Grid/GridItem.vue'
</script>

<style scoped>
.hl-grid {
  display: grid;
}
.hl-grid__box {
  padding: 12px;
  border-radius: 8px;
  background: var(--k-color-primary-bg);
  color: var(--k-color-primary);
  font-size: 12px;
  font-family: var(--k-font-family-code);
  text-align: center;
}
</style>