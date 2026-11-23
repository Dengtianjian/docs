<template>
  <KFlex vertical gap="md">
    <KFlex align="center" wrap>
      <KKbd value="Ctrl + C" size="sm" />
      <KKbd value="Ctrl + V" size="md" />
      <KKbd value="Ctrl + S" size="lg" />
    </KFlex>
    <KFlex align="center" wrap>
      <KKbd value="Ctrl + K" variant="outline" />
      <KKbd value="Ctrl + K" variant="filled" />
      <KKbd value="Ctrl + K" variant="ghost" />
      <KKbd value="Ctrl + K" disabled />
    </KFlex>
  </KFlex>
</template>

<script setup lang="ts">
import KKbd from 'kit/vue/ui/components/Kbd/Kbd.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'
</script>