<template>
  <KCard hover-shadow style="width: 240px">
    <template #cover>
      <div class="cover">商品图</div>
    </template>
    <template #title>轻量双肩包</template>
    <template #extra>
      <KTag color="success">现货</KTag>
    </template>
    <div class="price">¥ 299</div>
    <div class="desc">防泼水面料，15 英寸电脑仓。</div>
    <template #actions>
      <KCardAction>收藏</KCardAction>
      <KCardAction>加入购物车</KCardAction>
    </template>
  </KCard>
</template>

<script setup lang="ts">
import KCard from 'kit/vue/ui/components/layouts/Card/Card.vue'
import KCardAction from 'kit/vue/ui/components/layouts/Card/CardAction.vue'
import KTag from 'kit/vue/ui/components/data-display/Tag/Tag.vue'
</script>

<style scoped>
.cover {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 140px;
  background: linear-gradient(135deg, var(--k-color-primary-bg), var(--k-color-fill-tertiary));
  color: var(--k-color-primary-text-strong);
}
.price {
  color: var(--k-color-error);
  font-size: var(--k-font-size-lg);
  font-weight: var(--k-font-weight-strong);
}
.desc {
  margin-top: var(--k-size-xxs);
  font-size: var(--k-font-size-sm);
}
</style>