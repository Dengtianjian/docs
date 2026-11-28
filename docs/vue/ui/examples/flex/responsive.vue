<template>
  <div class="responsive-demo">
    <div class="responsive-demo__meta">
      当前断点 <b>{{ current }}</b>
      <span>字符串 gap <code>{{ stringGap }}</code></span>
      <span>对象 gap <code>{{ objectGap }}</code></span>
    </div>

    <section>
      <div class="responsive-demo__label">字符串：<code>xs:8 md:sm lg:lg</code></div>
      <div ref="stringWrap">
        <KFlex gap="xs:8 md:sm lg:lg" wrap>
          <span v-for="i in 4" :key="i" class="chip">{{ i }}</span>
        </KFlex>
      </div>
    </section>

    <section>
      <div class="responsive-demo__label">对象：<code>{ xs: 'xs', md: 'md' }</code></div>
      <div ref="objectWrap">
        <KFlex :gap="{ xs: 'xs', md: 'md' }" wrap>
          <span v-for="i in 4" :key="i" class="chip chip--soft">{{ i }}</span>
        </KFlex>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import { useBreakpoint } from 'kit/vue/ui'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const { current } = useBreakpoint()
const stringWrap = ref<HTMLElement>()
const objectWrap = ref<HTMLElement>()
const stringGap = ref('—')
const objectGap = ref('—')

function readGaps() {
  const s = stringWrap.value?.querySelector('.k-flex')
  const o = objectWrap.value?.querySelector('.k-flex')
  if (s) stringGap.value = getComputedStyle(s).gap
  if (o) objectGap.value = getComputedStyle(o).gap
}

onMounted(readGaps)
watch(current, () => nextTick(readGaps))
</script>

<style scoped>
.responsive-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.responsive-demo__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 16px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
.responsive-demo__meta b {
  color: var(--k-color-primary);
}
.responsive-demo__meta code,
.responsive-demo__label code {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}
.responsive-demo__label {
  margin-bottom: 8px;
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-sm);
}
.chip {
  display: grid;
  place-items: center;
  width: 64px;
  height: 32px;
  border: 1px solid var(--k-color-primary-border);
  border-radius: var(--k-border-radius);
  background: var(--k-color-primary-bg);
  color: var(--k-color-primary);
  font-size: var(--k-font-size-sm);
}
.chip--soft {
  border-color: var(--k-color-border);
  background: var(--k-color-fill-tertiary);
  color: var(--k-color-text-secondary);
}
</style>