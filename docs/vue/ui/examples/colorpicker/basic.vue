<template>
  <KFlex vertical gap="lg">
    <KColorPicker v-model="color" :presets="presets" />
    <KColorPicker v-model="rgb" format="rgb" alpha :presets="presets" />
    <KColorPicker v-model="hsl" format="hsl" allow-clear show-text />
    <div class="color-preview" :style="{ background: color }">
      <span>{{ color }}</span>
    </div>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KColorPicker from 'kit/vue/ui/components/ColorPicker/ColorPicker.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'

const color = ref('#1677ff')
const rgb = ref('rgba(82, 196, 26, 0.75)')
const hsl = ref('hsl(32, 100%, 50%)')
const presets = ['#1677ff', '#52c41a', '#faad14', '#ff4d4f', '#722ed1', '#13c2c2', '#eb2f96', '#000000', '#ffffff']
</script>

<style scoped>
.color-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 220px;
  height: 80px;
  border-radius: var(--k-border-radius);
  color: #fff;
  font-size: var(--k-font-size-sm);
  text-shadow: 0 1px 2px rgb(0 0 0 / 35%);
}
</style>