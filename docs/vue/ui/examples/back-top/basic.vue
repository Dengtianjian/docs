<template>
  <div>
    <div class="backtop-demo">
      <div ref="scrollEl" class="backtop-scroll">
        <h3>滚动区域</h3>
        <p v-for="index in 18" :key="index">
          第 {{ index }} 段内容：滚动超过 visibilityHeight 后，右下角出现返回顶部按钮。
        </p>
      </div>
      <KBackTop
        :target="() => scrollEl"
        :visibility-height="80"
        :right="16"
        :bottom="16"
        :styles="{ root: { position: 'absolute' } }"
        @click="clicks += 1"
      />
    </div>
    <div class="backtop-tip">点击次数：{{ clicks }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KBackTop from 'kit/vue/ui/components/layouts/BackTop/BackTop.vue'

const scrollEl = ref<HTMLElement | null>(null)
const clicks = ref(0)
</script>

<style scoped>
.backtop-demo {
  position: relative;
  height: 260px;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: var(--k-border-radius);
  overflow: hidden;
}
.backtop-scroll {
  height: 100%;
  padding: 16px;
  overflow: auto;
}
.backtop-scroll h3 {
  margin: 0 0 8px;
  font-size: var(--k-font-size);
}
.backtop-scroll p {
  margin: 0 0 10px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
  line-height: 1.7;
}
.backtop-tip {
  margin-top: 12px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>