<script setup lang="ts">
import KRow from 'kit/vue/ui/components/Grid/Row.vue'
import KCol from 'kit/vue/ui/components/Grid/Col.vue'
</script>

<template>
  <!-- 拖动浏览器宽度看列宽切换：列宽是预生成断点 class（CSS-first），
       gutter 字符串/对象由共享断点解析成当前档定值（列宽流动、gutter 不流动） -->
  <KRow gutter="xs:8,4 sm:12,8 md:16,12 lg:24,16">
    <KCol :span="{ xs: 24, sm: 12, md: 8, lg: 6 }"><div class="cell">xs24 / sm12 / md8 / lg6</div></KCol>
    <KCol :span="{ xs: 24, sm: 12, md: 8, lg: 6 }"><div class="cell">xs24 / sm12 / md8 / lg6</div></KCol>
    <KCol :span="{ xs: 24, sm: 12, md: 8, lg: 6 }"><div class="cell">xs24 / sm12 / md8 / lg6</div></KCol>
    <KCol :span="{ xs: 24, sm: 12, md: 8, lg: 6 }"><div class="cell">xs24 / sm12 / md8 / lg6</div></KCol>
  </KRow>
</template>

<style scoped>
.cell {
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: var(--k-font-size-sm);
  color: #fff;
  background: var(--k-color-primary);
  border-radius: var(--k-border-radius);
}
</style>
