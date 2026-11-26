<template>
  <KFlex separator>
    <KButton variant="quiet">编辑</KButton>
    <KButton variant="quiet">复制</KButton>
    <KButton type="danger" variant="quiet">删除</KButton>
  </KFlex>
</template>

<script setup lang="ts">
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
</script>
