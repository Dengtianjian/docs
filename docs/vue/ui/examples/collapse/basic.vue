<template>
  <KCollapse v-model:active-key="active">
    <KCollapseItem item-key="account" title="账号信息">
      登录邮箱、手机号与安全设置。
    </KCollapseItem>
    <KCollapseItem item-key="notice" title="通知偏好">
      控制站内信、邮件与移动推送。
    </KCollapseItem>
    <KCollapseItem item-key="advanced" title="高级设置">
      数据导出、API Key 与 Webhook。
    </KCollapseItem>
  </KCollapse>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KCollapse from 'kit/vue/ui/components/Collapse/Collapse.vue'
import KCollapseItem from 'kit/vue/ui/components/Collapse/CollapseItem.vue'

const active = ref<(string | number)[]>(['account'])
</script>