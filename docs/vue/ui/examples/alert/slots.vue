<template>
  <KFlex vertical gap="md" style="width: 100%">
    <KAlert type="success">
      <template #icon>
        <svg viewBox="0 0 16 16" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
          <path d="M8 1.8l1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.6l-3.8 2 .7-4.3-3.1-3 4.3-.6z" />
        </svg>
      </template>
      <template #title>
        构建完成
        <KTag size="sm" color="success" variant="filled">v2.4.0</KTag>
      </template>
      <template #description>
        产物已上传 CDN，用时 42s。<span style="color: var(--k-color-primary)">查看运行日志</span>
      </template>
      <template #action>
        <KButton size="xs" type="success" variant="outlined">复制链接</KButton>
        <KButton size="xs" variant="text">忽略</KButton>
      </template>
    </KAlert>

    <KAlert
      type="warning"
      variant="tonal"
      message="message prop 会被 title 插槽覆盖"
      description="description prop 也会被插槽替换。"
    >
      <template #title>维护窗口 · 今晚 22:00</template>
      <template #description>影响范围：<b>全部 API</b>，预计 30 分钟。</template>
    </KAlert>

    <KAlert type="info" variant="text" :show-icon="false">
      <template #title>只提供 title 插槽</template>
      <template #action>
        <KButton size="xs" type="link" variant="text">了解</KButton>
      </template>
    </KAlert>
  </KFlex>
</template>

<script setup lang="ts">
import KAlert from 'kit/vue/ui/components/feedback/Alert/Alert.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KTag from 'kit/vue/ui/components/data-display/Tag/Tag.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
</script>