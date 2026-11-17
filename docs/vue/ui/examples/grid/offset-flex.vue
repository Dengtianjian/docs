<script setup lang="ts">
import KRow from 'kit/vue/ui/components/Grid/Row.vue'
import KCol from 'kit/vue/ui/components/Grid/Col.vue'
</script>

<template>
  <div class="grid-demo">
    <KRow>
      <KCol :span="6"><div class="cell">span 6</div></KCol>
      <KCol :span="6" :offset="6"><div class="cell light">span 6 + offset 6</div></KCol>
    </KRow>
    <!-- flex 模式：数字 = flex-grow，字符串透传 -->
    <KRow :gutter="8">
      <KCol :flex="2"><div class="cell">flex=2</div></KCol>
      <KCol :flex="3"><div class="cell light">flex=3</div></KCol>
      <KCol flex="120px"><div class="cell">flex='120px'（字符串透传 CSS flex）</div></KCol>
    </KRow>
  </div>
</template>

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
