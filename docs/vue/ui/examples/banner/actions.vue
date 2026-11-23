<template>
  <KFlex vertical gap="md">
    <KBanner
      v-model:open="visible"
      type="info"
      title="开启新版工作台？"
      description="新版将默认启用活动流与快捷搜索，可随时在设置中关闭。"
      closable
      @close="closed = true"
    >
      <template #actions>
        <KButton size="sm" @click="visible = false">立即体验</KButton>
        <KButton size="sm" variant="text" @click="visible = false">稍后再说</KButton>
      </template>
    </KBanner>
    <KButton v-if="!visible" size="sm" variant="outline" @click="visible = true">重新显示公告</KButton>
    <p class="tip">{{ closed ? '公告已关闭' : '等待操作' }}</p>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KBanner from 'kit/vue/ui/components/Banner/Banner.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'

const visible = ref(true)
const closed = ref(false)
</script>

<style scoped>
.tip {
  margin: 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>