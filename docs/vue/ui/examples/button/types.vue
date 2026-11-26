<template>
  <KFlex wrap>
    <KButton v-for="t in types" :key="t" :type="t">{{ t }}</KButton>
  </KFlex>
</template>

<script setup lang="ts">
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const types = ['default', 'primary', 'info', 'success', 'warning', 'danger', 'link'] as const
</script>
