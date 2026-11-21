<template>
  <KSpace direction="vertical" size="lg">
    <KUser
      name="林小满"
      description="产品设计 · 杭州"
      avatar-text="林"
      status="online"
    />
    <KUser
      name="周既白"
      description="前端工程师"
      avatar-text="周"
      status="busy"
      clickable
      @click="active = '周既白'"
    />
    <KUser name="K UI" description="设计系统" avatar-text="K" size="sm" status="away" />
    <p class="tip">当前选中：{{ active || '（未选择）' }}</p>
  </KSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
import KUser from 'kit/vue/ui/components/User/User.vue'

const active = ref('')
</script>

<style scoped>
.tip {
  margin: 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>