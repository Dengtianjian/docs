<template>
  <KFlex align="center" gap="lg">
    <KAvatar :src="image" alt="如意" size="lg" />
    <KAvatar :src="image" alt="如意" shape="square" size="lg" />
    <KAvatar src="/not-found.png" alt="加载失败" size="lg" />
  </KFlex>
</template>

<script setup lang="ts">
import KAvatar from 'kit/vue/ui/components/Avatar/Avatar.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'

const image = `data:image/svg+xml,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="#7c5cff"/>
        <stop offset="1" stop-color="#39c5bb"/>
      </linearGradient>
    </defs>
    <rect width="96" height="96" fill="url(#g)"/>
    <circle cx="48" cy="38" r="17" fill="rgba(255,255,255,.88)"/>
    <path d="M18 90c4-20 17-30 30-30s26 10 30 30" fill="rgba(255,255,255,.88)"/>
  </svg>
`)}`
</script>