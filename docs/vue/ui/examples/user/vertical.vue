<template>
  <KFlex :gap="32" wrap>
    <KUser
      v-for="member in members"
      :key="member.name"
      orientation="vertical"
      :name="member.name"
      :description="member.role"
      :avatar-text="member.name.slice(0, 1)"
      :status="member.status"
      size="lg"
    />
  </KFlex>
</template>

<script setup lang="ts">
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
import KUser from 'kit/vue/ui/components/data-display/User/User.vue'
import type { KUserStatus } from 'kit/vue/ui/components/data-display/User/User.vue'

const members: Array<{ name: string; role: string; status: KUserStatus }> = [
  { name: '林小满', role: '产品设计', status: 'online' },
  { name: '周既白', role: '前端工程师', status: 'busy' },
  { name: '沈知微', role: '质量保障', status: 'away' },
  { name: '许清和', role: '后端工程师', status: 'offline' },
]
</script>