<template>
  <div>
    <div class="backtop-single-demo">
      <div ref="scrollEl" class="backtop-single-scroll">
        <h3>滚动区域</h3>
        <p v-for="index in 18" :key="index">
          第 {{ index }} 段内容：滚动超过阈值后，右下角出现回到顶部按钮。
        </p>
      </div>

      <KFloatButtonBackTop
        :target="() => scrollEl"
        :visibility-height="80"
        :offset="[16, 16]"
        :safe-area="false"
        :teleport="false"
        :styles="{ root: { position: 'absolute' } }"
        @click="clicks += 1"
      />
    </div>
    <div class="backtop-single-tip">回顶点击 {{ clicks }} 次</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KFloatButtonBackTop from 'kit/vue/ui/components/other/FloatButton/FloatButtonBackTop.vue'

const scrollEl = ref<HTMLElement | null>(null)
const clicks = ref(0)
</script>

<style scoped>
.backtop-single-demo {
  position: relative;
  height: 260px;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: var(--k-border-radius);
  overflow: hidden;
}
.backtop-single-scroll {
  height: 100%;
  padding: 16px;
  overflow: auto;
}
.backtop-single-scroll h3 {
  margin: 0 0 8px;
  font-size: var(--k-font-size);
}
.backtop-single-scroll p {
  margin: 0 0 10px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
  line-height: 1.7;
}
.backtop-single-tip {
  margin-top: 12px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>