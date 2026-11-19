<template>
  <KSpace align="start">
    <div class="box">
      <KButton type="primary">浅色区</KButton>
      <KText type="secondary">页面亮暗不变</KText>
    </div>
    <KConfigProvider scoped scheme="dark">
      <div class="box dark">
        <KButton type="primary">子树独立暗色</KButton>
        <KText type="secondary">light-dark() 就近解析</KText>
      </div>
    </KConfigProvider>
  </KSpace>
</template>

<script setup lang="ts">
import KConfigProvider from 'kit/vue/ui/components/ConfigProvider/ConfigProvider.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KText from 'kit/vue/ui/components/Typography/Text.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
</script>

<style scoped>
.box {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  padding: 16px;
  border: 1px dashed var(--k-color-border);
  border-radius: var(--k-border-radius);
}
.box.dark {
  background: var(--k-color-bg-container);
  border-color: var(--k-color-border);
}
</style>
