<template>
  <KFlex wrap align="center">
    <KModal
      v-for="size in sizes"
      :key="size"
      v-model:open="open[size]"
      :size="size"
      :title="`${size} 尺寸弹窗`"
      :width="360"
    >
      <template #trigger>
        <KButton :size="size">{{ size.toUpperCase() }}</KButton>
      </template>
      <p style="margin: 0">标题、正文、header/body/footer 边距与关闭钮随尺寸同步缩放。</p>
      <template #footer>
        <KButton :size="size === 'sm' ? 'xs' : size" @click="open[size] = false">关闭</KButton>
      </template>
    </KModal>
  </KFlex>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KModal from 'kit/vue/ui/components/feedback/Modal/Modal.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
import type { KModalSize } from 'kit/vue/ui'

const sizes: KModalSize[] = ['sm', 'md', 'lg']
const open = reactive<Record<KModalSize, boolean>>({ sm: false, md: false, lg: false })
</script>