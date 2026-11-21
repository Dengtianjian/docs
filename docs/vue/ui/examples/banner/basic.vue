<template>
  <KSpace direction="vertical" size="md">
    <KBanner type="info" title="版本更新" description="K UI P8 增强件已发布，包含 14 个新组件。" />
    <KBanner type="success" title="部署成功" description="生产环境已于 18:20 完成发布。" />
    <KBanner type="warning" title="维护通知" description="今晚 22:00–22:30 进行数据库维护。" />
    <KBanner type="error" title="构建失败" description="packages/vue/ui 存在类型错误，请查看流水线日志。" />
  </KSpace>
</template>

<script setup lang="ts">
import KBanner from 'kit/vue/ui/components/Banner/Banner.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
</script>