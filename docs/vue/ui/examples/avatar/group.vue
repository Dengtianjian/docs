<template>
  <KFlex vertical gap="lg">
    <KAvatarGroup :max-count="4" hover-expand>
      <KAvatar text="如" />
      <KAvatar text="意" color="#7c5cff" />
      <KAvatar text="技" color="#39c5bb" />
      <KAvatar text="术" color="#f08a4b" />
      <KAvatar text="库" />
      <KAvatar text="组" />
    </KAvatarGroup>
    <KAvatarGroup
      :max-count="3"
      size="sm"
      :gap="6"
      hover-expand
      expand-mode="peek"
      :hover-offset="3"
    >
      <KAvatar text="A" />
      <KAvatar text="B" />
      <KAvatar text="C" />
      <KAvatar text="D" />
    </KAvatarGroup>
  </KFlex>
</template>

<script setup lang="ts">
import KAvatar from 'kit/vue/ui/components/Avatar/Avatar.vue'
import KAvatarGroup from 'kit/vue/ui/components/Avatar/AvatarGroup.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'
</script>