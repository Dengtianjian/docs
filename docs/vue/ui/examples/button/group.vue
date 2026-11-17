<script setup lang="ts">
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KButtonGroup from 'kit/vue/ui/components/Button/ButtonGroup.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
</script>

<template>
  <KSpace direction="vertical" size="lg">
    <KButtonGroup>
      <KButton>左</KButton>
      <KButton type="primary">中</KButton>
      <KButton>右</KButton>
    </KButtonGroup>
    <KButtonGroup vertical size="sm">
      <KButton type="primary">上</KButton>
      <KButton>中</KButton>
      <KButton>下（size 统一下发 sm）</KButton>
    </KButtonGroup>
    <KButtonGroup size="sm">
      <KButton>组下发 sm</KButton>
      <KButton size="lg">自传 lg 优先</KButton>
    </KButtonGroup>
  </KSpace>
</template>
