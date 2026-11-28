<template>
  <div class="phone">
    <KPullToRefresh :loading="loading" @refresh="onRefresh">
      <div class="list">
        <div v-for="item in items" :key="item" class="row">
          <span class="avatar">{{ item.slice(0, 1) }}</span>
          <span>
            <strong>{{ item }}</strong>
            <small>下拉刷新第 {{ round }} 批数据</small>
          </span>
        </div>
      </div>
    </KPullToRefresh>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KPullToRefresh from 'kit/vue/ui/components/overlay/PullToRefresh/PullToRefresh.vue'

const loading = ref(false)
const round = ref(1)
const items = ref(['林小满', '周既白', '沈知微', '许清和', '顾南舟', '江照影'])

function onRefresh() {
  loading.value = true
  setTimeout(() => {
    round.value += 1
    items.value = [...items.value].sort(() => Math.random() - 0.5)
    loading.value = false
  }, 800)
}
</script>

<style scoped>
.phone {
  height: 300px;
  overflow: hidden;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: var(--k-border-radius-lg);
  background: var(--k-color-bg-container);
}
.list {
  padding: 10px 14px;
}
.row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid var(--k-color-border-secondary);
}
.row:last-child { border-bottom: none; }
.row strong {
  display: block;
  font-size: var(--k-font-size);
}
.row small {
  color: var(--k-color-text-tertiary);
  font-size: 11px;
}
.avatar {
  display: inline-flex;
  width: 34px;
  height: 34px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--k-color-fill-secondary);
  font-size: var(--k-font-size-sm);
}
</style>