<template>
  <KFlex align="center" wrap>
    <KKbd value="Ctrl + K" />
    <KKbd value="mod + shift + P" />
    <KKbd :keys="['Esc']" />
    <KKbd value="↑ + ↑ + ↓ + ↓" />
  </KFlex>
</template>

<script setup lang="ts">
import KKbd from 'kit/vue/ui/components/Kbd/Kbd.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'
</script>