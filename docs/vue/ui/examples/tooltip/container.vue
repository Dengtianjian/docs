<script setup lang="ts">
import { ref } from 'vue'
import KTooltip from 'kit/vue/ui/components/Tooltip/Tooltip.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KConfigProvider from 'kit/vue/ui/components/ConfigProvider/ConfigProvider.vue'

const box = ref<HTMLElement | null>(null)
</script>

<template>
  <KConfigProvider :popup-container="() => box!">
    <div
      ref="box"
      style="position: relative; height: 140px; overflow: auto; border: 1px dashed #bbb; border-radius: 8px; padding: 8px; width: 260px"
    >
      <KTooltip content="气泡进本盒文档流：随内容滚、被盒边界裁切" placement="bottom">
        <template #trigger><KButton>悬停我（容器内气泡）</KButton></template>
      </KTooltip>
      <p style="height: 220px; margin: 8px 0 0; font-size: 12px; color: #888">
        滚动本盒观察气泡跟随与裁切（popupContainer 契约，四弹层组件同语义）。
      </p>
    </div>
  </KConfigProvider>
</template>