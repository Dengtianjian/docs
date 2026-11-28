<template>
  <KSignature
    ref="signature"
    :height="200"
    background-color="#ffffff"
    @change="latest = $event"
  >
    <template #footer="{ clear, save, isEmpty }">
      <KButton size="sm" variant="text" :disabled="isEmpty" @click="clear">清空</KButton>
      <KButton size="sm" @click="save">保存</KButton>
    </template>
  </KSignature>
  <p class="tip">{{ latest ? `最近签名数据长度：${latest.length}` : '在画板上拖动鼠标或手指签名' }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KSignature from 'kit/vue/ui/components/data-entry/Signature/Signature.vue'

const signature = ref<{ clear: () => void; save: () => string } | null>(null)
const latest = ref('')
</script>

<style scoped>
.tip {
  margin: 10px 0 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>