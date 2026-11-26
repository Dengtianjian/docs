<template>
  <KFlex gap="lg" align="start" wrap>
    <KCard segmented title="分段卡片" extra="更多" style="width: 320px">
      内容区。开启 `segmented` 后，header 与 body、footer 之间出现分隔线。
      <template #footer>页脚说明文字，可放更新时间等信息。</template>
      <template #actions>
        <span>编辑</span>
        <span>分享</span>
      </template>
    </KCard>
    <KCard style="width: 320px">
      <template #header>
        <div class="custom-header">
          <span>自定义头部</span>
          <KTag color="success">运行中</KTag>
        </div>
      </template>
      传入 `#header` 时整体替换 title / extra。
      <template #footer>未开启分段：header、body、footer 仅靠间距区分。</template>
    </KCard>
  </KFlex>
</template>

<script setup lang="ts">
import KCard from 'kit/vue/ui/components/layouts/Card/Card.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
import KTag from 'kit/vue/ui/components/data-display/Tag/Tag.vue'
</script>

<style scoped>
.custom-header {
  display: flex;
  flex: auto;
  align-items: center;
  justify-content: space-between;
  gap: var(--k-size);
}
</style>