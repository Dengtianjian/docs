<template>
  <div class="chat-demo">
    <KVirtualList :items="items" :item-height="64" :height="400" item-key="id" class="frame">
      <template #default="{ item }">
        <div class="msg">
          <KAvatar size="md" :text="item.avatar" :style="{ background: item.color, '--k-avatar-color': '#fff' }" />
          <div class="msg-main">
            <div class="msg-top">
              <span class="msg-name">{{ item.name }}</span>
              <span class="msg-time">{{ item.time }}</span>
            </div>
            <div class="msg-preview">{{ item.preview }}</div>
          </div>
          <span v-if="item.unread" class="msg-unread">{{ item.unread > 99 ? '99+' : item.unread }}</span>
        </div>
      </template>
    </KVirtualList>
  </div>
</template>

<script setup lang="ts">
import KVirtualList from 'kit/vue/ui/components/VirtualList/VirtualList.vue'
import KAvatar from 'kit/vue/ui/components/Avatar/Avatar.vue'

const names = ['陈一舟', '林晚', '周野', '苏念', '顾清明', '许知远', '沈星河', '陆小凤', '唐棠', '江照']
const colors = [
  'var(--k-color-primary)',
  'var(--k-color-success)',
  'var(--k-color-warning)',
  'var(--k-color-error)',
  '#8b5cf6',
]
const previews = [
  '[图片] 这是本周的排期，麻烦确认一下',
  '收到，我下午整理完发你',
  '方案已经同步到文档，第 3 节有改动',
  '好的 👌',
  '明天的评审改到 10:30 可以吗？',
  '这个接口的返回字段少了一个状态位',
]

const items = Array.from({ length: 8000 }, (_, index) => {
  const name = names[index % names.length]!
  const hour = 9 + (index % 12)
  const minute = (index * 7) % 60
  return {
    id: index + 1,
    name,
    avatar: name.slice(0, 1),
    color: colors[index % colors.length],
    preview: previews[index % previews.length],
    time: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
    unread: index % 4 === 0 ? (index % 37) + 1 : 0,
  }
})
</script>

<style scoped>
.chat-demo {
  max-width: 520px;
}
.frame {
  border: 1px solid var(--k-color-border);
  border-radius: var(--k-border-radius);
  background: var(--k-color-bg-container);
}
.msg {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 64px;
  padding: 0 12px;
  border-bottom: 1px solid var(--k-color-border-secondary);
}
.msg-main {
  flex: 1;
  min-width: 0;
}
.msg-top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}
.msg-name {
  color: var(--k-color-text);
  font-size: var(--k-font-size-md);
  font-weight: var(--k-font-weight-strong);
}
.msg-time {
  flex: none;
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-xs);
}
.msg-preview {
  margin-top: 2px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.msg-unread {
  flex: none;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  display: inline-grid;
  place-items: center;
  border-radius: 9px;
  background: var(--k-color-error);
  color: #fff;
  font-size: 11px;
  font-variant-numeric: tabular-nums;
}
</style>