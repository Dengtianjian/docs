<template>
  <KSpace :size="24" wrap align="center">
    <div class="item">
      <KQRCode value="https://ruyi.dev" :size="144" />
      <span>默认 M 级</span>
    </div>
    <div class="item">
      <KQRCode value="https://ruyi.dev" :size="144" level="H" dark-color="#0f172a" light-color="#f8fafc" :margin="2" />
      <span>H 级 / 自定义颜色</span>
    </div>
    <div class="item">
      <KQRCode :value="'K UI P8 二维码 · 中文内容'" :size="144" level="Q" />
      <span>UTF-8 中文</span>
    </div>
  </KSpace>
</template>

<script setup lang="ts">
import KQRCode from 'kit/vue/ui/components/QRCode/QRCode.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
</script>

<style scoped>
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-sm);
}
</style>