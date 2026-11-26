<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <KFlex>
      <KButton type="primary">默认圆角/高度</KButton>
      <KButton>Default</KButton>
    </KFlex>
    <KConfigProvider scoped :theme="pill">
      <KFlex>
        <KButton type="primary">components 覆盖：胶囊 + 40px</KButton>
        <KButton>Default</KButton>
      </KFlex>
    </KConfigProvider>
  </div>
</template>

<script setup lang="ts">
import KConfigProvider from 'kit/vue/ui/components/general/ConfigProvider/ConfigProvider.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

// components 层 = 组件级部件变量差量（键 = 变量去掉 `--k-button-` 前缀，数字自动加 px）
const pill = {
  components: {
    KButton: { radius: 999, height: 40 },
  },
}
</script>
