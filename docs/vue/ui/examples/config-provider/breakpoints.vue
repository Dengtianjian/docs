<template>
  <KConfigProvider scoped :theme="custom">
    <BpProbe label="自定义 md=1600（整组升序）" />
  </KConfigProvider>
  <BpProbe label="默认断点" style="margin-top: 12px" />
</template>

<script setup lang="ts">
import KConfigProvider from 'kit/vue/ui/components/general/ConfigProvider/ConfigProvider.vue'
import BpProbe from './breakpoints-probe.vue'

const custom = {
  breakpoints: { sm: 576, md: 1600, lg: 1700, xl: 1800, xxl: 1920 },
}
</script>