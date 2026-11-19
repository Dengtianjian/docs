<template>
  <div class="grid-demo">
    <!-- 水平间距 -->
    <KRow :gutter="16">
      <KCol :span="6"><div class="cell">6</div></KCol>
      <KCol :span="6"><div class="cell">6</div></KCol>
      <KCol :span="6"><div class="cell">6</div></KCol>
      <KCol :span="6"><div class="cell">6</div></KCol>
    </KRow>
    <!-- [水平, 垂直] -->
    <KRow :gutter="[16, 8]">
      <KCol v-for="i in 6" :key="i" :span="8"><div class="cell">{{ 8 }}</div></KCol>
    </KRow>
  </div>
</template>

<script setup lang="ts">
import KRow from 'kit/vue/ui/components/Grid/Row.vue'
import KCol from 'kit/vue/ui/components/Grid/Col.vue'
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
