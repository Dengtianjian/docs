<template>
  <KSpace direction="vertical" size="lg">
    <KSpace wrap align="center">
      <KButton type="primary" :icon="Pencil">Start</KButton>
      <KButton type="primary" :icon="ArrowRight" icon-placement="end">End</KButton>
      <KButton :icon="Search">Secondary Start</KButton>
      <KButton :icon="ArrowRight" icon-placement="end">Secondary End</KButton>
    </KSpace>

    <KSpace wrap align="center">
      <KButton :icon="Plus" icon-placement="top">Top</KButton>
      <KButton :icon="ArrowRight" icon-placement="bottom">Bottom</KButton>
      <KButton type="primary" :icon="Plus" icon-placement="top">新增</KButton>
      <KButton type="primary" :icon="ArrowRight" icon-placement="bottom">继续</KButton>
    </KSpace>

    <KSpace wrap align="center">
      <KButton shape="circle" :icon="Plus" aria-label="添加" />
      <KButton shape="square" :icon="Settings" aria-label="设置" />
      <KButton type="primary" shape="circle" :icon="Plus" aria-label="添加" />
      <KButton type="primary" shape="square" :icon="Settings" aria-label="设置" />
    </KSpace>

    <KSpace wrap align="center">
      <KButton type="primary" loading :icon="Download" icon-placement="end">
        loading 占图标位
      </KButton>
      <KButton loading :icon="Download">loading 在 start</KButton>
    </KSpace>
  </KSpace>
</template>

<script setup lang="ts">
import { ArrowRight, Download, Pencil, Plus, Search, Settings } from '@vicons/tabler'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
</script>