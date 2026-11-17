<script setup lang="ts">
import KRow from 'kit/vue/ui/components/Grid/Row.vue'
import KCol from 'kit/vue/ui/components/Grid/Col.vue'
</script>

<template>
  <!-- gutter 逻辑双向继承：Row 负外边距 + provide 照跑，Col 内边距随 rootAttrs；列宽百分比由 span 自绘 -->
  <KRow :gutter="[16, 16]">
    <template #render="ctx">
      <div v-bind="ctx.rootAttrs" class="hl-row">
        <KCol v-for="n in 3" :key="n" :span="8">
          <template #render="col">
            <div
              v-bind="col.rootAttrs"
              class="hl-col"
              :style="{ width: `${(Number(col.span) / 24) * 100}%` }"
            >
              <div class="hl-col__box">span={{ col.span }} · gutter={{ col.gutter.join(',') }}</div>
            </div>
          </template>
        </KCol>
      </div>
    </template>
  </KRow>
</template>

<style scoped>
.hl-row {
  display: flex;
  flex-wrap: wrap;
}
.hl-col {
  box-sizing: border-box;
}
.hl-col__box {
  padding: 12px;
  border-radius: 8px;
  background: var(--k-color-primary-bg);
  color: var(--k-color-primary);
  font-size: 12px;
  font-family: var(--k-font-family-code);
  text-align: center;
}
</style>