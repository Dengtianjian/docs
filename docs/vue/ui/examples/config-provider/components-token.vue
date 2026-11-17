<script setup lang="ts">
import KConfigProvider from 'kit/vue/ui/components/ConfigProvider/ConfigProvider.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

// components 层 = 组件级部件变量差量（键 = 变量去掉 `--k-button-` 前缀，数字自动加 px）
const pill = {
  components: {
    KButton: { radius: 999, height: 40 },
  },
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <KSpace>
      <KButton type="primary">默认圆角/高度</KButton>
      <KButton>Default</KButton>
    </KSpace>
    <KConfigProvider scoped :theme="pill">
      <KSpace>
        <KButton type="primary">components 覆盖：胶囊 + 40px</KButton>
        <KButton>Default</KButton>
      </KSpace>
    </KConfigProvider>
  </div>
</template>
