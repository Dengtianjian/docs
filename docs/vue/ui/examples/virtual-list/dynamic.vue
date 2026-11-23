<template>
  <div class="dynamic-demo">
    <div class="toolbar">
      <KButton size="sm" @click="list?.scrollToTop()">回到顶部</KButton>
      <KButton size="sm" @click="list?.scrollToIndex(1500, 'center')">跳到第 1501 条</KButton>
      <KButton size="sm" @click="toggleAll">{{ allExpanded ? '全部收起' : '全部展开' }}</KButton>
    </div>
    <KVirtualList
      ref="list"
      :items="items"
      :estimated-item-height="56"
      :height="400"
      item-key="id"
      class="frame"
    >
      <template #default="{ item }">
        <div class="note">
          <div class="note-head">
            <span class="note-author">{{ item.author }}</span>
            <span class="note-time">{{ item.time }}</span>
          </div>
          <p class="note-text" :class="{ 'is-clamped': !expanded.has(item.id) }">{{ item.text }}</p>
          <button v-if="item.long" type="button" class="note-toggle" @click="toggle(item.id)">
            {{ expanded.has(item.id) ? '收起' : '展开全文' }}
          </button>
        </div>
      </template>
    </KVirtualList>
    <div class="hint">3000 条 · 行高由内容决定，展开/收起后自动重新测量</div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import KVirtualList from 'kit/vue/ui/components/VirtualList/VirtualList.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'

const authors = ['林晚', '周野', '苏念', '顾清明', '许知远', '沈星河', '陆小凤', '唐棠']
const sentences = [
  '今天的联调已经通过，移动端和桌面端都验证过了。',
  '接口返回里少了一个字段，我把兼容逻辑加在了业务侧。',
  '这个交互建议再收一收：展开后列表会变长，需要重新测量行高。',
  '下午三点线上会，同步一下本周的排期和风险项。',
  '缓存命中率从 82% 提到了 96%，主要是把重复请求合并了。',
  '空状态文案统一成「暂无数据」，和设计稿保持一致。',
  '长文本会被截断成两行，点开后按真实高度重新布局。',
]

const items = Array.from({ length: 3000 }, (_, index) => {
  const lineCount = (index % 5) + 1
  const text = Array.from({ length: lineCount }, (_, i) => sentences[(index + i) % sentences.length]).join('')
  const hour = 9 + (index % 10)
  const minute = (index * 7) % 60
  return {
    id: index + 1,
    author: authors[index % authors.length],
    time: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
    text,
    long: text.length > 46,
  }
})

const list = ref<InstanceType<typeof KVirtualList> | null>(null)
const expanded = ref(new Set<number>())
const longItems = items.filter(item => item.long)
const allExpanded = computed(() => longItems.every(item => expanded.value.has(item.id)))

function toggle(id: number) {
  const next = new Set(expanded.value)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  expanded.value = next
}

function toggleAll() {
  expanded.value = allExpanded.value ? new Set() : new Set(longItems.map(item => item.id))
}
</script>

<style scoped>
.dynamic-demo {
  max-width: 560px;
}
.toolbar {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}
.frame {
  border: 1px solid var(--k-color-border);
  border-radius: var(--k-border-radius);
  background: var(--k-color-bg-container);
}
.note {
  padding: 10px 12px;
  border-bottom: 1px solid var(--k-color-border-secondary);
}
.note-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}
.note-author {
  color: var(--k-color-text);
  font-size: var(--k-font-size-md);
  font-weight: var(--k-font-weight-strong);
}
.note-time {
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-xs);
}
.note-text {
  margin: 4px 0 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
  line-height: 20px;
}
.note-text.is-clamped {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.note-toggle {
  margin-top: 2px;
  padding: 0;
  border: 0;
  background: none;
  color: var(--k-color-primary);
  font-size: var(--k-font-size-sm);
  cursor: pointer;
}
.hint {
  margin-top: 8px;
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-xs);
}
</style>