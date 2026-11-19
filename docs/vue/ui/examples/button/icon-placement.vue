<template>
  <KSpace wrap>
    <KButton type="primary" :icon="Download">缺省 start</KButton>
    <KButton type="primary" :icon="Download" icon-placement="end">文字在左图标在右</KButton> <!-- [!code hl] -->
    <KButton :icon="Search" icon-placement="end">搜索</KButton>
    <KButton type="primary" loading icon-placement="end">loading 占图标位</KButton> <!-- [!code focus] -->
  </KSpace>
</template>

<script setup lang="ts">
import { Download, Search } from '@vicons/tabler'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
</script>
