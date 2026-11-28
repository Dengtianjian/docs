<template>
  <KFlex align="center" wrap>
    <KButton v-for="s in sizes" :key="s" type="primary" :size="s">{{ s }}</KButton>
  </KFlex>
</template>

<script setup lang="ts">
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const sizes = ['xs', 'sm', 'md', 'lg'] as const
</script>
