<template>
  <KButton @click="show = true">显示悬浮气泡</KButton>
  <p class="tip">气泡可拖动，松手会自动吸附左右边缘；点击空白按钮不会误触。</p>
  <KFloatingBubble
    v-if="show"
    v-model:position="position"
    badge="2"
    aria-label="联系客服"
    @click="count += 1"
  >
    <span class="bubble-text">客服</span>
  </KFloatingBubble>
  <p class="tip">点击次数：{{ count }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KFloatingBubble from 'kit/vue/ui/components/other/FloatingBubble/FloatingBubble.vue'
import type { KFloatingBubblePosition } from 'kit/vue/ui/components/other/FloatingBubble/FloatingBubble.vue'

const show = ref(true)
const count = ref(0)
const position = ref<KFloatingBubblePosition | null>(null)
</script>

<style scoped>
.bubble-text {
  font-size: var(--k-font-size-sm);
  font-weight: 600;
}
.tip {
  margin: 10px 0 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>