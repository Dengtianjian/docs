<template>
  <KFlex wrap align="center">
    <KButton v-for="size in sizes" :key="size" :size="size" @click="show(size)">
      {{ size.toUpperCase() }}
    </KButton>
  </KFlex>
</template>

<script setup lang="ts">
import { useKApp } from 'kit/vue/ui/composables/useKApp'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
import type { KMessageSize } from 'kit/vue/ui'

const sizes: KMessageSize[] = ['sm', 'md', 'lg']
const { message } = useKApp()!

function show(size: KMessageSize) {
  message!.info({ content: `${size} 尺寸消息`, size })
}
</script>