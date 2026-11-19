<template>
  <KSpace size="lg" align="start" wrap>
    <KCard title="基础卡片" style="width: 300px">
      <template #extra>更多</template>
      卡片内容区域，支持任意内容与插槽。
        <template #actions>
          <KCardAction aria-label="编辑卡片" @click="reset">编辑</KCardAction>
          <KCardAction @click="reset">分享</KCardAction>
        </template>
    </KCard>
    <KCard hoverable style="width: 300px">
      <template #cover>
        <div class="cover">封面</div>
      </template>
      <template #title>带封面</template>
      <template #extra><KTag color="primary">新</KTag></template>
      悬浮时边框与阴影变化，封面与操作区均可插槽定制。
    </KCard>
    <KCard title="按钮属性" style="width: 300px">
      `KCardAction` 的属性直接透传到 button。
      <template #actions>
        <KCardAction @click="reset">编辑</KCardAction>
        <KCardAction disabled>删除</KCardAction>
      </template>
    </KCard>
    <KCard title="加载中" loading style="width: 300px" />
  </KSpace>
</template>

<script setup lang="ts">
import KCard from 'kit/vue/ui/components/Card/Card.vue'
import KCardAction from 'kit/vue/ui/components/Card/CardAction.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
import KTag from 'kit/vue/ui/components/Tag/Tag.vue'
</script>

<style scoped>
.cover {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  background: linear-gradient(135deg, var(--k-color-primary-bg), var(--k-color-fill-tertiary));
  color: var(--k-color-primary-text-strong);
}
</style>