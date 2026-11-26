<template>
  <div class="gradient-demo">
    <section>
      <div class="gradient-demo__label">预设：primary 跟随语义色，其它为固定多色组</div>
      <KFlex wrap>
        <KButton type="primary" gradient>primary</KButton>
        <KButton type="success" gradient>success</KButton>
        <KButton type="danger" gradient="sunset">sunset</KButton>
        <KButton type="primary" gradient="ocean">ocean</KButton>
        <KButton type="primary" gradient="aurora">aurora</KButton>
        <KButton type="primary" gradient="candy">candy</KButton>
      </KFlex>
    </section>

    <section>
      <div class="gradient-demo__label">自定义 from / to / angle</div>
      <KFlex wrap>
        <KButton type="primary" :gradient="{ from: '#0ea5e9', to: '#6366f1', angle: 120 }">
          from / to / angle
        </KButton>
        <KButton type="primary" :gradient="{ to: '#111827' }">只改终点</KButton>
      </KFlex>
    </section>

    <section>
      <div class="gradient-demo__label">形态与状态</div>
      <KFlex wrap align="center">
        <KButton type="primary" gradient round>round</KButton>
        <KButton type="primary" gradient disabled>disabled</KButton>
        <KButton type="primary" gradient loading>loading</KButton>
      </KFlex>
    </section>
  </div>
</template>

<script setup lang="ts">
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
</script>

<style scoped>
.gradient-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.gradient-demo__label {
  margin-bottom: 8px;
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-sm);
}
</style>