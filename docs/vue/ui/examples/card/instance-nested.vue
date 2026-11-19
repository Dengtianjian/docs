<template>
  <KCard title="订单详情" style="width: 360px">
    <KCard inner variant="filled" size="sm" title="商品信息">
      <div class="row">
        <span>轻量双肩包</span>
        <span>× 1</span>
      </div>
      <div class="row">
        <span>收纳袋</span>
        <span>× 2</span>
      </div>
      <template #footer>共 3 件商品</template>
    </KCard>
    <template #footer>inner 只缩圆角与内边距，浅底来自 `variant="filled"`。</template>
  </KCard>
</template>

<script setup lang="ts">
import KCard from 'kit/vue/ui/components/Card/Card.vue'
</script>

<style scoped>
.row {
  display: flex;
  justify-content: space-between;
  padding: var(--k-size-xxs) 0;
}
</style>