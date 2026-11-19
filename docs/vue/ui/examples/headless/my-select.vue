<template>
  <div class="hl-my-panel">
    <div class="hl-my-panel__row">
      <div class="hl-my-field">
        <span class="hl-my-field__label">部署地域</span>
        <MySelect v-model="region" :options="regions" placeholder="选择地域" />
      </div>
      <div class="hl-my-field">
        <span class="hl-my-field__label">目标环境</span>
        <MySelect v-model="env" :options="envs" accent="var(--k-color-warning)" placeholder="选择环境" />
      </div>
      <div class="hl-my-field">
        <span class="hl-my-field__label">锁定实例</span>
        <MySelect :model-value="'hz'" :options="regions" disabled />
      </div>
    </div>
    <div class="hl-my-panel__foot">
      <KButton size="sm" type="primary" @click="deploy">发布</KButton>
      <span class="hl-my-panel__echo">{{ deployed || `发布目标：${target}` }}</span>
    </div>
    <p class="hl-my-panel__note">
      三个实例都是同一个自有组件 MySelect（源码见 examples/headless/_MySelect.vue）：内部消费 KSelect
      headless 绑定包，对外只暴露自己的 props / 事件。↑↓ / Enter / Esc / 点外关闭 / 定位翻转全部继承， accent 换色即换肤。
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import MySelect from './_MySelect.vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'

const regions = [
  { label: '杭州 · 华东 1', value: 'hz' },
  { label: '北京 · 华北 2', value: 'bj' },
  { label: '深圳 · 华南 1', value: 'sz' },
  { label: '成都 · 西南 1', value: 'cd' },
]
const envs = [
  { label: '开发环境', value: 'dev' },
  { label: '预发环境', value: 'staging' },
  { label: '生产环境', value: 'prod' },
]

const region = ref<string | number | null>('hz')
const env = ref<string | number | null>('staging')
const deployed = ref('')

const labelOf = (opts: { label: string; value: string }[], v: string | number | null) =>
  opts.find((o) => o.value === v)?.label ?? '未选择'

const target = computed(() => `${labelOf(regions, region.value)} / ${labelOf(envs, env.value)}`)

function deploy() {
  deployed.value = `已发布到 ${target.value}`
}
</script>

<style>
.hl-my-panel {
  display: flex;
  flex-direction: column;
  gap: 18px;
  max-width: 640px;
}
.hl-my-panel__row {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  align-items: flex-end;
}
.hl-my-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.hl-my-field__label {
  font-size: 12px;
  color: var(--k-color-text-tertiary);
}
.hl-my-panel__foot {
  display: flex;
  align-items: center;
  gap: 14px;
}
.hl-my-panel__echo {
  font-size: 13px;
  color: var(--k-color-text-secondary);
}
.hl-my-panel__note {
  margin: 0;
  font-size: 12px;
  line-height: 1.7;
  color: var(--k-color-text-quaternary);
}
</style>
