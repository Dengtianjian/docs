<template>
  <KFlex gap="lg" align="start" wrap>
    <KCard title="基础卡片" style="width: 300px">
      <template #extra>更多</template>
      卡片内容区域，支持任意内容与插槽。
        <template #actions>
          <KCardAction aria-label="编辑卡片" @click="last = '编辑'">编辑</KCardAction>
          <KCardAction @click="last = '分享'">分享</KCardAction>
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
        <KCardAction @click="last = '编辑'">编辑</KCardAction>
        <KCardAction disabled>删除</KCardAction>
      </template>
    </KCard>
    <KCard title="加载中" loading style="width: 300px" />
  </KFlex>
  <p class="tip">最近操作：{{ last || '（无）' }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KCard from 'kit/vue/ui/components/Card/Card.vue'
import KCardAction from 'kit/vue/ui/components/Card/CardAction.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'
import KTag from 'kit/vue/ui/components/Tag/Tag.vue'

const last = ref('')
</script>

<style scoped>
.tip {
  margin: 12px 0 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
.cover {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  background: linear-gradient(135deg, var(--k-color-primary-bg), var(--k-color-fill-tertiary));
  color: var(--k-color-primary-text-strong);
}
</style>