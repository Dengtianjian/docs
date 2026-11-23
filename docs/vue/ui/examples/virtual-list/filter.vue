<template>
  <div class="member-demo">
    <div class="toolbar">
      <KInput v-model="keyword" type="search" clearable placeholder="搜索会员姓名 / 手机号" class="search" />
      <span class="count">匹配 {{ filtered.length.toLocaleString('zh-CN') }} 人</span>
    </div>
    <div class="frame">
      <KVirtualList
        v-if="filtered.length"
        ref="list"
        :items="filtered"
        :item-height="56"
        :height="320"
        item-key="id"
        @scroll="onScroll"
      >
        <template #default="{ item }">
          <div class="member">
            <KAvatar size="sm" :text="item.name.slice(0, 1)" :style="{ background: item.color, '--k-avatar-color': '#fff' }" />
            <div class="member-main">
              <div class="member-name">{{ item.name }}</div>
              <div class="member-phone">{{ item.phone }}</div>
            </div>
            <KTag size="sm" :color="item.levelColor">{{ item.level }}</KTag>
          </div>
        </template>
      </KVirtualList>
      <div v-else class="empty">
        <KEmpty size="sm" :description="keyword.trim() ? `没有匹配「${keyword.trim()}」的会员` : '暂无会员'" />
      </div>
    </div>
    <div class="status">滚动位置 {{ Math.round(scrollTop) }} px</div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import KVirtualList from 'kit/vue/ui/components/VirtualList/VirtualList.vue'
import KInput from 'kit/vue/ui/components/Input/Input.vue'
import KAvatar from 'kit/vue/ui/components/Avatar/Avatar.vue'
import KTag from 'kit/vue/ui/components/Tag/Tag.vue'
import KEmpty from 'kit/vue/ui/components/Empty/Empty.vue'

const surnames = ['陈', '林', '周', '苏', '顾', '许', '沈', '陆', '唐', '江']
const givens = ['一舟', '晚', '野', '念', '清明', '知远', '星河', '小凤', '棠', '照']
const levels = [
  { level: '金卡', color: 'primary' as const, avatar: 'var(--k-color-primary)' },
  { level: '银卡', color: 'default' as const, avatar: 'var(--k-color-text-tertiary)' },
  { level: '黑卡', color: 'warning' as const, avatar: 'var(--k-color-text)' },
]

const members = Array.from({ length: 8000 }, (_, index) => {
  const name = `${surnames[index % surnames.length]}${givens[Math.floor(index / surnames.length) % givens.length]}`
  const level = levels[index % levels.length]!
  return {
    id: index + 1,
    name,
    color: level.avatar,
    phone: `138${String(10000000 + index * 137).slice(-8)}`,
    level: level.level,
    levelColor: level.color,
  }
})

const keyword = ref('')
const scrollTop = ref(0)
const list = ref<InstanceType<typeof KVirtualList> | null>(null)

const filtered = computed(() => {
  const kw = keyword.value.trim()
  if (!kw) return members
  return members.filter(item => item.name.includes(kw) || item.phone.includes(kw))
})

watch(filtered, async () => {
  scrollTop.value = 0
  await nextTick()
  list.value?.scrollToTop()
})

function onScroll(top: number) {
  scrollTop.value = top
}
</script>

<style scoped>
.member-demo {
  max-width: 520px;
}
.toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}
.search {
  flex: 1;
  min-width: 0;
}
.count {
  flex: none;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
  font-variant-numeric: tabular-nums;
}
.frame {
  border: 1px solid var(--k-color-border);
  border-radius: var(--k-border-radius);
  background: var(--k-color-bg-container);
  overflow: hidden;
}
.member {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 56px;
  padding: 0 12px;
  border-bottom: 1px solid var(--k-color-border-secondary);
}
.member-main {
  flex: 1;
  min-width: 0;
}
.member-name {
  color: var(--k-color-text);
  font-size: var(--k-font-size-md);
  font-weight: var(--k-font-weight-strong);
}
.member-phone {
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-xs);
  font-variant-numeric: tabular-nums;
}
.empty {
  height: 320px;
  display: grid;
  place-items: center;
}
.status {
  margin-top: 8px;
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-xs);
  font-variant-numeric: tabular-nums;
}
</style>