<template>
  <KFlex vertical gap="md">
    <KTabs v-model:active="active" @close="close">
      <KTabPane
        v-for="tab in tabs"
        :key="tab.name"
        :name="tab.name"
        :label="tab.label"
        :disabled="tab.disabled"
        closable
      >
        {{ tab.content }}
      </KTabPane>
    </KTabs>
    <div class="tabs-tip">当前页签：{{ active }}</div>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KTabs from 'kit/vue/ui/components/Tabs/Tabs.vue'
import KTabPane from 'kit/vue/ui/components/Tabs/TabPane.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'

const active = ref<string | number>('profile')
const tabs = ref([
  { name: 'profile', label: '账号资料', content: '账号资料内容：头像、昵称、邮箱。' },
  { name: 'security', label: '安全设置', content: '安全设置内容：密码、两步验证。' },
  { name: 'billing', label: '账单', content: '账单内容。', disabled: true },
  { name: 'notice', label: '通知', content: '通知偏好设置。' },
])

function close(name: string | number) {
  const index = tabs.value.findIndex(tab => tab.name === name)
  if (index >= 0) tabs.value.splice(index, 1)
}
</script>

<style scoped>
.tabs-tip {
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>