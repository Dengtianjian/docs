<template>
  <KSpace direction="vertical" size="md">
    <KButton @click="active = !active">
      {{ active ? '关闭全屏水印' : '开启全屏水印' }}
    </KButton>
    <KWatermark
      v-if="active"
      text="K UI · 全屏预览"
      fullscreen
      :z-index="2000"
      :gap="[140, 110]"
      :font-size="13"
      color="rgba(79, 140, 255, 0.22)"
    >
      <p class="hint">水印层铺满整个视口，页面内容与按钮仍可正常操作。</p>
    </KWatermark>
    <p class="tip">开启后水印会覆盖浏览器视口，再次点击按钮即可关闭。</p>
  </KSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
import KWatermark from 'kit/vue/ui/components/Watermark/Watermark.vue'

const active = ref(false)
</script>

<style scoped>
.hint {
  margin: 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
.tip {
  margin: 0;
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-sm);
}
</style>