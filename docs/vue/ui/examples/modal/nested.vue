<template>
  <KModal title="外层弹窗">
    <template #trigger><KButton type="primary">打开外层</KButton></template>
    <p style="margin: 0 0 12px">外层内容。打开内层后：Esc 只关最上层；焦点与滚动锁按栈顶生效。</p>
    <KButton @click="innerOpen = true">打开内层弹窗</KButton>

    <KModal v-model:open="innerOpen" title="内层弹窗" placement="center" :width="360">
      <p style="margin: 0">这是弹窗中的弹窗。按 Esc 或点「完成」只关闭内层，外层保持打开。</p>
      <template #footer>
        <KFlex justify="end" gap="sm">
          <KButton @click="innerOpen = false">完成</KButton>
        </KFlex>
      </template>
    </KModal>
  </KModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KModal from 'kit/vue/ui/components/feedback/Modal/Modal.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const innerOpen = ref(false)
</script>