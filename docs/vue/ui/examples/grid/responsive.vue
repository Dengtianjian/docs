<template>
  <div class="grid-responsive">
    <div class="grid-responsive__meta">
      当前断点 <b>{{ current }}</b>
      <span>字符串 gap <code>{{ stringGap }}</code></span>
      <span>对象 gap <code>{{ objectGap }}</code></span>
    </div>

    <KGrid :gap="16">
      <KGridItem v-for="i in 3" :key="i" :span="{ xs: 24, sm: 12, md: 8 }">
        <div class="cell">span xs24 / sm12 / md8</div>
      </KGridItem>
    </KGrid>

    <KGrid :gap="16">
      <KGridItem :span="{ xs: 24, md: 8 }"><div class="cell">span xs24 / md8</div></KGridItem>
      <KGridItem :span="{ xs: 24, md: 8 }" :start="{ xs: 1, md: 17 }">
        <div class="cell light">start xs1 / md17</div>
      </KGridItem>
    </KGrid>

    <div ref="stringWrap">
      <KGrid gap="xs:8 sm:16 md:24">
        <KGridItem v-for="i in 3" :key="i" :span="8"><div class="cell">字符串 gap</div></KGridItem>
      </KGrid>
    </div>

    <div ref="objectWrap">
      <KGrid :gap="{ xs: 8, md: 24 }">
        <KGridItem v-for="i in 3" :key="i" :span="8"><div class="cell light">对象 gap</div></KGridItem>
      </KGrid>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import { useBreakpoint } from 'kit/vue/ui'
import KGrid from 'kit/vue/ui/components/layouts/Grid/Grid.vue'
import KGridItem from 'kit/vue/ui/components/layouts/Grid/GridItem.vue'

const { current } = useBreakpoint()
const stringWrap = ref<HTMLElement>()
const objectWrap = ref<HTMLElement>()
const stringGap = ref('—')
const objectGap = ref('—')

function readGaps() {
  const s = stringWrap.value?.querySelector<HTMLElement>('.k-grid')
  const o = objectWrap.value?.querySelector<HTMLElement>('.k-grid')
  if (s) stringGap.value = getComputedStyle(s).gap
  if (o) objectGap.value = getComputedStyle(o).gap
}

onMounted(readGaps)
watch(current, () => nextTick(readGaps))
</script>

<style scoped>
.grid-responsive {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.grid-responsive__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 16px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
.grid-responsive__meta b {
  color: var(--k-color-primary);
}
.grid-responsive__meta code {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
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