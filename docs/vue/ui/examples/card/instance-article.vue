<template>
  <KCard segmented title="把复杂留给自己" style="width: 360px">
    <template #extra>前端</template>
    <template #cover>
      <div class="cover">封面</div>
    </template>
    从设计 token 到组件收敛：一次关于组件库边界与取舍的实践记录。
    <template #footer>李小明 · 5 分钟阅读</template>
    <template #actions>
      <KCardAction>阅读全文</KCardAction>
      <KCardAction>分享</KCardAction>
    </template>
  </KCard>
</template>

<script setup lang="ts">
import KCard from "kit/vue/ui/components/Card/Card.vue";
import KCardAction from "kit/vue/ui/components/Card/CardAction.vue";
</script>

<style scoped>
.cover {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 160px;
  background: linear-gradient(
    135deg,
    var(--k-color-primary-bg),
    var(--k-color-fill-secondary)
  );
  color: var(--k-color-primary-text-strong);
  font-size: var(--k-font-size-lg);
}
</style>
