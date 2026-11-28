<template>
  <KFlex vertical gap="lg" style="width: 100%">
    <KSlider
      v-model="tiers"
      addable
      :disabled-values="[50]"
      :marks="{ 0: '0', 50: '50（锁定）', 100: '100' }"
    />
    <div style="display: flex; gap: 12px; align-items: center">
      <KButton size="sm" :disabled="tiers.length <= 2" @click="removeTier">移除节点</KButton>
      <span class="slider-multi-text">点击轨道添加节点，节点：{{ tiers.join(' / ') }}</span>
    </div>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KSlider from 'kit/vue/ui/components/data-entry/Slider/Slider.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const tiers = ref<number[]>([10, 50, 90])

function removeTier() {
  const list = [...tiers.value].sort((a, b) => a - b)
  if (list.length <= 2) return
  list.splice(Math.floor((list.length - 1) / 2), 1)
  tiers.value = list
}
</script>

<style scoped>
.slider-multi-text {
  color: var(--k-color-text-secondary);
}
</style>