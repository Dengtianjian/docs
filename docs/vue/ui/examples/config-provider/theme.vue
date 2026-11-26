<template>
  <KFlex align="start">
    <div class="box">
      <KButton type="primary">默认主题</KButton>
      <KButton>Default</KButton>
    </div>
    <KConfigProvider scoped :theme="teal">
      <div class="box custom">
        <KButton type="primary">青色系 seed</KButton>
        <KButton>Default</KButton>
      </div>
    </KConfigProvider>
  </KFlex>
</template>

<script setup lang="ts">
import KConfigProvider from 'kit/vue/ui/components/general/ConfigProvider/ConfigProvider.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

// 只写 seed，Map/Alias 全由 CSS 表达式图派生 —— 这就是「一变百变」
const teal = { seed: { colorPrimary: '#13c2c2', borderRadius: 10 } }
</script>

<style scoped>
.box {
  display: flex;
  gap: 8px;
  padding: 16px;
  border: 1px dashed var(--k-color-border);
  border-radius: var(--k-border-radius);
}
.box.custom {
  background: var(--k-color-primary-bg);
}
</style>
