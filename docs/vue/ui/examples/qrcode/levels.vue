<template>
  <KFlex :gap="24" wrap align="center">
    <KQRCode
      v-for="level in levels"
      :key="level"
      :value="payload"
      :level="level"
      :size="128"
    />
  </KFlex>
  <p class="tip">同一内容在不同容错等级下的矩阵规模会不同；等级越高，可恢复的遮挡越多。</p>
</template>

<script setup lang="ts">
import KQRCode from 'kit/vue/ui/components/QRCode/QRCode.vue'
import type { KQRCodeLevel } from 'kit/vue/ui/components/QRCode/QRCode.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'

const payload = 'K UI QRCode / error correction levels'
const levels: KQRCodeLevel[] = ['L', 'M', 'Q', 'H']
</script>

<style scoped>
.tip {
  margin: 14px 0 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
  line-height: 1.6;
}
</style>