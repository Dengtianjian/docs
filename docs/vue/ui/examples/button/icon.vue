<template>
  <KFlex wrap>
    <!-- icon prop：注入图标组件（示例 = 推荐的 @vicons/tabler） -->
    <KButton type="primary" :icon="Download">下载</KButton>
    <!-- #icon 插槽：直接放 svg / 字体图标 -->
    <KButton>
      <template #icon>
        <component :is="Download" />
      </template>
      插槽图标
    </KButton>
    <!-- 自定义 loading 指示 -->
    <KButton type="primary" loading>
      <template #loading>…</template>
      自定义 Loading
    </KButton>
  </KFlex>
</template>

<script setup lang="ts">
import { Download } from '@vicons/tabler'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
</script>
