<script setup lang="ts">
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
</script>

<template>
  <KSpace separator>
    <KButton variant="quiet">编辑</KButton>
    <KButton variant="quiet">复制</KButton>
    <KButton type="danger" variant="quiet">删除</KButton>
  </KSpace>
</template>
