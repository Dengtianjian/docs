<template>
  <div>
    <div class="affix-demo">
      <div class="affix-scroll">
        <div class="affix-grid">
          <KAffix :offset-top="12" @change="affixed = $event">
            <div class="affix-card">
              <strong>侧栏</strong>
              <span>{{ affixed ? '已吸顶' : '跟随滚动' }}</span>
            </div>
          </KAffix>
          <div class="affix-body">
            <h3>吸顶内容</h3>
            <p v-for="index in 14" :key="index">
              第 {{ index }} 段：滚动容器内部滚动时，左侧卡片在距顶部 12px 处保持吸顶。
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="affix-tip">状态：{{ affixed ? '吸顶中' : '未吸顶' }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KAffix from 'kit/vue/ui/components/Affix/Affix.vue'

const affixed = ref(false)
</script>

<style scoped>
.affix-demo {
  height: 280px;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: var(--k-border-radius);
  overflow: hidden;
}
.affix-scroll {
  height: 100%;
  padding: 16px;
  overflow: auto;
}
.affix-grid {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 20px;
}
.affix-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: var(--k-border-radius);
  background: var(--k-color-bg-elevated);
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
.affix-card strong {
  color: var(--k-color-text);
}
.affix-body h3 {
  margin: 0 0 8px;
  font-size: var(--k-font-size);
}
.affix-body p {
  margin: 0 0 10px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
  line-height: 1.7;
}
.affix-tip {
  margin-top: 12px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>