<template>
  <KFlex vertical gap="lg" style="width: 100%">
    <KFlex gap="lg" align="center" wrap>
      <label class="field">
        <span class="field-label">线宽</span>
        <KInputNumber v-model="band" :min="4" :max="20" :step="1" style="width: 96px" />
      </label>
      <label class="field">
        <span class="field-label">间距</span>
        <KInputNumber v-model="gap" :min="0" :max="20" :step="1" style="width: 96px" />
      </label>
      <KSwitch v-model="showTrack" size="sm" label="轨道" />
      <span class="hint">
        当前线宽 {{ bandValue }}px · 间距 {{ gapValue }}px（第二个环固定 16px；缩到 0 只相切）
      </span>
    </KFlex>

    <KFlex align="center" gap="lg" wrap>
      <KProgressGroup
        :size="176"
        :stroke-width="bandValue"
        :gap="gapValue"
        :show-track="showTrack"
      >
        <template #content>
          <span class="center">
            <strong class="g-blue">78%</strong>
            <strong class="g-green">56%</strong>
            <strong class="g-orange">32%</strong>
          </span>
        </template>
        <KProgress :percent="78" stroke-color="#0a84ff" />
        <KProgress :percent="56" stroke-color="#30d158" :stroke-width="16" />
        <KProgress :percent="32" stroke-color="#ff9f0a" />
      </KProgressGroup>
      <div class="legend">
        <span class="legend-item"><i class="dot dot-blue" />步数 78%</span>
        <span class="legend-item"><i class="dot dot-green" />卡路里 56%</span>
        <span class="legend-item"><i class="dot dot-orange" />锻炼 32%</span>
        <span class="legend-note">
          #content 不注入排版样式，中心内容由使用方自行布局；子项统一按环形绘制（line / steps / dashboard 也会转成 circle）。
        </span>
      </div>
    </KFlex>

    <KFlex align="center" gap="lg" wrap style="margin-top: 8px">
      <KProgressGroup
        :size="128"
        :stroke-width="bandValue"
        :gap="gapValue"
        :show-track="showTrack"
      >
        <KProgress :segments="12" :percent="70" />
        <KProgress :segments="12" :percent="45" stroke-color="#30d158" />
      </KProgressGroup>
      <span class="hint">子项仍可使用 segments、strokeColor、status 等能力。</span>
    </KFlex>
  </KFlex>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import KProgress from 'kit/vue/ui/components/feedback/Progress/Progress.vue'
import KProgressGroup from 'kit/vue/ui/components/feedback/Progress/Group.vue'
import KInputNumber from 'kit/vue/ui/components/data-entry/InputNumber/InputNumber.vue'
import KSwitch from 'kit/vue/ui/components/data-entry/Switch/Switch.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const band = ref<number | null>(10)
const gap = ref<number | null>(8)
const showTrack = ref(true)
const bandValue = computed(() => Math.min(20, Math.max(4, band.value ?? 10)))
const gapValue = computed(() => Math.min(20, Math.max(0, gap.value ?? 8)))
</script>

<style scoped>
.field {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: var(--k-font-size-sm);
  color: var(--k-color-text-secondary);
}
.hint {
  font-size: var(--k-font-size-sm);
  color: var(--k-color-text-tertiary);
}
.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  line-height: 1.2;
}
.g-blue,
.g-green,
.g-orange {
  font-size: var(--k-font-size-sm);
  font-variant-numeric: tabular-nums;
}
.g-blue {
  color: #0a84ff;
}
.g-green {
  color: #30d158;
}
.g-orange {
  color: #ff9f0a;
}
.legend {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: var(--k-font-size-sm);
  color: var(--k-color-text-secondary);
}
.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}
.dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.dot-blue {
  background: #0a84ff;
}
.dot-green {
  background: #30d158;
}
.dot-orange {
  background: #ff9f0a;
}
.legend-note {
  max-width: 240px;
  font-size: var(--k-font-size-sm);
  color: var(--k-color-text-tertiary);
}
</style>