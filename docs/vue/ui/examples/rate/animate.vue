<template>
  <KFlex vertical gap="md">
    <KRate :key="nonce" v-model="score" :animate="animate" size="lg" />
    <div class="rate-animate-bar">
      <KSwitch v-model="animate" size="sm" />
      <span>首次渲染动画</span>
      <KButton size="sm" @click="nonce++">重新播放</KButton>
    </div>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KRate from 'kit/vue/ui/components/data-entry/Rate/Rate.vue'
import KSwitch from 'kit/vue/ui/components/data-entry/Switch/Switch.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const score = ref(4)
const animate = ref(true)
const nonce = ref(0)
</script>

<style scoped>
.rate-animate-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--k-font-size-sm);
  color: var(--k-color-text-tertiary);
}
</style>