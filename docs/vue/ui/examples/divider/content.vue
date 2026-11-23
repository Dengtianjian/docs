<template>
  <div class="divider-demo">
    <p>分区标题可以组合图标、标签与辅助信息：</p>
    <KDivider orientation="start">
      <span class="divider-head">
        <KIcon :component="Settings" />
        <span>基础设置</span>
        <KTag color="primary" variant="outlined" size="sm" round>3</KTag>
        <KText type="secondary">最近更新 10:24</KText>
      </span>
    </KDivider>

    <p>分割线内放操作与状态：</p>
    <KDivider>
      <KFlex align="center" gap="sm">
        <KTag color="success" variant="outlined" size="sm" round>已发布</KTag>
        <KButton size="sm" variant="text" type="primary" :icon="ArrowUpRight">查看详情</KButton>
      </KFlex>
    </KDivider>

    <p>虚线 + 状态点：</p>
    <KDivider dashed>
      <span class="divider-status">
        <KBadge text="服务运行中" color="success" pulse />
        <KText type="secondary">可用性 99.98%</KText>
      </span>
    </KDivider>

    <p>纵向分割线适合操作列：</p>
    <div class="divider-actions">
      <KFlex align="center" gap="sm">
        <KButton variant="text" type="primary" :icon="Pencil">编辑</KButton>
        <KDivider type="vertical" />
        <KButton variant="text" :icon="Copy">复制</KButton>
        <KDivider type="vertical" />
        <KButton variant="text" type="danger" :icon="Trash">删除</KButton>
      </KFlex>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowUpRight, Copy, Pencil, Settings, Trash } from '@vicons/tabler'
import KDivider from 'kit/vue/ui/components/Divider/Divider.vue'
import KIcon from 'kit/vue/ui/components/Icon/Icon.vue'
import KTag from 'kit/vue/ui/components/Tag/Tag.vue'
import KText from 'kit/vue/ui/components/Typography/Text.vue'
import KBadge from 'kit/vue/ui/components/Badge/Badge.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'
</script>

<style scoped>
.divider-demo {
  max-width: 560px;
}
.divider-demo p {
  margin: 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
.divider-head,
.divider-status {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}
.divider-head :deep(.k-icon) {
  color: var(--k-color-primary);
}
.divider-actions :deep(.k-divider--vertical) {
  --k-divider-vertical-height: 18px;
}
</style>