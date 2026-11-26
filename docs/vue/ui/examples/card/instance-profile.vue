<template>
  <KCard title="用户信息" style="width: 320px">
    <template #extra>编辑</template>
    <div class="profile">
      <span class="avatar">李</span>
      <div>
        <div class="name">李小明</div>
        <div class="meta">产品设计师 · 杭州</div>
      </div>
    </div>
    <template #footer>最近登录：2 小时前</template>
  </KCard>
</template>

<script setup lang="ts">
import KCard from 'kit/vue/ui/components/layouts/Card/Card.vue'
</script>

<style scoped>
.profile {
  display: flex;
  align-items: center;
  gap: var(--k-size-sm);
}
.avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--k-color-primary-bg);
  color: var(--k-color-primary-text-strong);
  font-weight: var(--k-font-weight-strong);
}
.name {
  color: var(--k-color-text);
  font-size: var(--k-font-size-lg);
}
.meta {
  margin-top: var(--k-size-xxs);
  font-size: var(--k-font-size-sm);
}
</style>