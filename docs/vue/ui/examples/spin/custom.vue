<template>
  <KFlex vertical gap="lg" align="start">
    <KFlex gap="lg" align="center" wrap>
      <KSpin>
        <template #indicator>
          <span class="hl-spin-dots" aria-hidden="true"><i /><i /><i /></span>
        </template>
      </KSpin>

      <KSpin size="lg">
        <template #indicator>
          <span class="hl-spin-bars" aria-hidden="true"><i /><i /><i /><i /></span>
        </template>
      </KSpin>

      <KSpin :tip="richTip" />
    </KFlex>

    <KSpin tip="正在生成报表，请稍候…">
      <div style="width: 280px; height: 120px; border-radius: 8px; background: var(--k-color-fill-tertiary)"></div>
    </KSpin>
  </KFlex>
</template>

<script setup lang="ts">
import { h } from 'vue'
import KSpin from 'kit/vue/ui/components/feedback/Spin/Spin.vue'
import KTag from 'kit/vue/ui/components/data-display/Tag/Tag.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const richTip = h('span', { style: 'display: inline-flex; align-items: center; gap: 6px' }, [
    h(KTag, { size: 'sm', color: 'primary', variant: 'filled' }, () => '同步中'),
  '3 / 12 个文件',
])
</script>

<style>
.hl-spin-dots {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 24px;
}
.hl-spin-dots i {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--k-color-primary);
  animation: hl-spin-bounce 0.9s infinite ease-in-out;
}
.hl-spin-dots i:nth-child(2) { animation-delay: 0.15s; }
.hl-spin-dots i:nth-child(3) { animation-delay: 0.3s; }
@keyframes hl-spin-bounce {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; }
  40% { transform: scale(1); opacity: 1; }
}

.hl-spin-bars {
  display: inline-flex;
  align-items: flex-end;
  gap: 4px;
  height: 28px;
}
.hl-spin-bars i {
  width: 5px;
  height: 100%;
  border-radius: 2px;
  background: var(--k-color-primary);
  transform-origin: bottom;
  animation: hl-spin-stretch 0.9s infinite ease-in-out;
}
.hl-spin-bars i:nth-child(2) { animation-delay: 0.12s; }
.hl-spin-bars i:nth-child(3) { animation-delay: 0.24s; }
.hl-spin-bars i:nth-child(4) { animation-delay: 0.36s; }
@keyframes hl-spin-stretch {
  0%, 100% { transform: scaleY(0.35); opacity: 0.5; }
  50% { transform: scaleY(1); opacity: 1; }
}
</style>