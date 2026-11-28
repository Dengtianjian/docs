<template>
  <KMasonry :items="cards" :columns="3" :gap="14" @item-click="active = $event.title">
    <template #item="{ item }">
      <article class="card" :style="{ minHeight: `${item.height}px` }">
        <h4>{{ item.title }}</h4>
        <p>{{ item.description }}</p>
      </article>
    </template>
  </KMasonry>
  <p class="tip">最近查看：{{ active || '（未选择）' }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KMasonry from 'kit/vue/ui/components/data-display/Masonry/Masonry.vue'

const active = ref('')
const cards = [
  { title: '设计语言', description: '色彩、字号、间距与圆角的基础规则。', height: 96 },
  { title: '主题 token', description: '一套变量同时服务亮色与暗色。', height: 140 },
  { title: '组件目录', description: '按场景划分 80+ 组件入口。', height: 80 },
  { title: '可访问性', description: '键盘、焦点环与 ARIA 的基线约定。', height: 120 },
  { title: '表格', description: '固定列、展开行与虚拟滚动。', height: 160 },
  { title: '表单', description: '组合校验、异步校验与字段组。', height: 100 },
]
</script>

<style scoped>
.card {
  padding: 14px;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: var(--k-border-radius);
  background: var(--k-color-bg-container);
}
.card h4 {
  margin: 0 0 6px;
  font-size: var(--k-font-size);
}
.card p {
  margin: 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
  line-height: 1.55;
}
.tip {
  margin: 14px 0 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>