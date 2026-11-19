<template>
  <KSpace direction="vertical" size="lg">
    <KSpace size="lg" align="center">
      <KBadge :count="5">
        <KButton>消息</KButton>
      </KBadge>
      <KBadge :count="120">
        <KButton>99+</KButton>
      </KBadge>
      <KBadge dot>
        <KButton>圆点</KButton>
      </KBadge>
      <KBadge :count="0" show-zero>
        <KButton>显示 0</KButton>
      </KBadge>
    </KSpace>
    <KSpace size="lg" align="center">
      <KBadge color="success" text="已完成" />
      <KBadge color="processing" text="进行中" />
      <KBadge color="warning" text="待确认" />
      <KBadge color="error" text="失败" />
      <KBadge color="default" text="默认" />
    </KSpace>
    <KSpace size="lg" align="center">
      <KBadge count="NEW" color="#722ed1" />
      <KBadge :count="8" color="success" />
      <KBadge color="#722ed1" text="自定义色" />
      <KBadge color="success" />
      <KBadge :count="9" :offset="[6, -2]">
        <span class="avatar">头像</span>
      </KBadge>
    </KSpace>
  </KSpace>
</template>

<script setup lang="ts">
import KBadge from 'kit/vue/ui/components/Badge/Badge.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
</script>

<style scoped>
.avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: var(--k-color-fill-secondary);
  color: var(--k-color-text-secondary);
  font-size: 12px;
}
</style>