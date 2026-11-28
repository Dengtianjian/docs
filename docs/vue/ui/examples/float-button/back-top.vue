<template>
  <div>
    <div class="float-backtop-demo">
      <div ref="scrollEl" class="float-backtop-scroll">
        <h3>滚动区域</h3>
        <p v-for="index in 18" :key="index">
          第 {{ index }} 段内容：滚动超过阈值后，右下角出现回到顶部按钮。
        </p>
      </div>

      <KFloatButtonGroup
        :offset="[16, 16]"
        :safe-area="false"
        :teleport="false"
        :styles="{ root: { position: 'absolute' } }"
      >
        <KFloatButton type="default" tooltip="帮助" aria-label="帮助" @click="help += 1">
          <template #icon>
            <span class="help-icon">?</span>
          </template>
        </KFloatButton>

        <KFloatButtonBackTop
          :target="() => scrollEl"
          :visibility-height="80"
          @click="clicks += 1"
        />
      </KFloatButtonGroup>
    </div>

    <div class="float-backtop-tip">回顶点击 {{ clicks }} 次；帮助点击 {{ help }} 次</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KFloatButton from 'kit/vue/ui/components/other/FloatButton/FloatButton.vue'
import KFloatButtonGroup from 'kit/vue/ui/components/other/FloatButton/FloatButtonGroup.vue'
import KFloatButtonBackTop from 'kit/vue/ui/components/other/FloatButton/FloatButtonBackTop.vue'

const scrollEl = ref<HTMLElement | null>(null)
const clicks = ref(0)
const help = ref(0)
</script>

<style scoped>
.float-backtop-demo {
  position: relative;
  height: 260px;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: var(--k-border-radius);
  overflow: hidden;
}
.float-backtop-scroll {
  height: 100%;
  padding: 16px;
  overflow: auto;
}
.float-backtop-scroll h3 {
  margin: 0 0 8px;
  font-size: var(--k-font-size);
}
.float-backtop-scroll p {
  margin: 0 0 10px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
  line-height: 1.7;
}
.help-icon {
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
}
.float-backtop-tip {
  margin-top: 12px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>