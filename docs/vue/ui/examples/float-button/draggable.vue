<template>
  <div class="bar">
    <KSwitch v-model="magnetic" size="sm">磁吸左右边缘</KSwitch>
    <KButton size="sm" @click="floatRef?.reset()">复位</KButton>
  </div>
  <p class="tip">
    坐标：{{ coordinate ? `${Math.round(coordinate.x)}, ${Math.round(coordinate.y)}` : '四角定位' }}
    · 点击 {{ clicks }} 次
  </p>

  <KFloatButton
    ref="floatRef"
    v-model:coordinate="coordinate"
    draggable
    position="left-bottom"
    :magnetic="magnetic"
    :offset="[24, 24]"
    badge="1"
    aria-label="联系客服"
    @click="clicks += 1"
  >
    <template #icon>
      <span class="bubble-label">客服</span>
    </template>
  </KFloatButton>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KFloatButton from 'kit/vue/ui/components/FloatButton/FloatButton.vue'
import KSwitch from 'kit/vue/ui/components/Switch/Switch.vue'
import type { KFloatButtonCoordinate } from 'kit/vue/ui/components/FloatButton/FloatButton.vue'

const coordinate = ref<KFloatButtonCoordinate | null>(null)
const magnetic = ref(true)
const clicks = ref(0)
const floatRef = ref<{ reset: () => void } | null>(null)
</script>

<style scoped>
.bar {
  display: flex;
  align-items: center;
  gap: 12px;
}
.bubble-label {
  font-size: var(--k-font-size-sm);
  font-weight: 600;
}
.tip {
  margin: 10px 0 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>