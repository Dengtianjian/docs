<template>
  <KConfigProvider :popup-container="getHost">
    <div class="popup-demo">
      <div ref="hostEl" class="popup-host">
        <div class="popup-host__inner">
          <p class="popup-host__text">弹层出口被限定在这个滚动容器：随内容滚动、超出边界被裁切。</p>
          <KFlex wrap align="center">
            <KSelect v-model="value" :options="options" placeholder="展开选项" style="width: 180px" />
            <KTooltip content="容器内 tooltip">
              <KButton>悬停提示</KButton>
            </KTooltip>
          </KFlex>
          <div class="popup-host__spacer">滚动区内容</div>
          <p class="popup-host__text">末尾：弹层始终留在这个容器里。</p>
        </div>
      </div>
      <p class="popup-demo__hint">
        对照：不传 popupContainer 时弹层挂 body（fixed），不受该容器滚动与裁切影响。
      </p>
    </div>
  </KConfigProvider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KConfigProvider from 'kit/vue/ui/components/ConfigProvider/ConfigProvider.vue'
import KSelect from 'kit/vue/ui/components/Select/Select.vue'
import KTooltip from 'kit/vue/ui/components/Tooltip/Tooltip.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KFlex from 'kit/vue/ui/components/Flex/Flex.vue'

const hostEl = ref<HTMLElement>()
const getHost = () => hostEl.value as HTMLElement
const value = ref<string>()
const options = [
  { label: '选项一', value: 'one' },
  { label: '选项二', value: 'two' },
  { label: '选项三', value: 'three' },
]
</script>

<style scoped>
.popup-demo {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.popup-host {
  position: relative;
  height: 220px;
  padding: 12px;
  overflow: auto;
  border: 1px dashed var(--k-color-border);
  border-radius: var(--k-border-radius);
}
.popup-host__inner {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 420px;
}
.popup-host__text {
  margin: 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
.popup-host__spacer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  border-radius: var(--k-border-radius);
  background: var(--k-color-fill-tertiary);
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-sm);
}
.popup-demo__hint {
  margin: 0;
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-sm);
}
</style>