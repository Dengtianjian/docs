<script setup lang="ts">
import KInput from 'kit/vue/ui/components/Input/Input.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
</script>

<template>
  <KSpace size="md" direction="vertical" style="width: 260px">
    <KInput size="xs" placeholder="size=xs" />
    <KInput size="sm" placeholder="size=sm" />
    <KInput placeholder="size=md（缺省）" />
    <KInput size="lg" placeholder="size=lg" />
    <KInput variant="filled" placeholder="variant=filled" />
    <KInput variant="borderless" placeholder="variant=borderless" />
    <KInput variant="underlined" placeholder="variant=underlined" />
  </KSpace>
</template>
