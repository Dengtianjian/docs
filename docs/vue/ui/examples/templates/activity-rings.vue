<template>
  <div ref="stackRef" class="activity-stack">
    <section
      v-for="variant in variants"
      :key="variant.key"
      class="activity-card"
      :data-variant="variant.key"
    >
      <header class="activity-head">
        <div>
          <p class="eyebrow">ACTIVITY</p>
          <h3>{{ variant.title }}</h3>
        </div>
        <span class="date">周三 · 10:24</span>
      </header>

      <div class="activity-body">
        <div class="ring-stage">
          <KProgressGroup :size="240" :stroke-width="20" :gap="8">
            <KProgress
              v-for="(ring, index) in rings"
              :key="ring.key"
              :percent="displayPercent(variant, index)"
              :stroke-color="ring.colors"
              :trail-color="variant.gradientTrail ? trailGradientOf(ring) : 'rgba(255, 255, 255, 0.12)'"
            />
          </KProgressGroup>

          <template v-if="variant.bareIcons">
            <span
              v-for="(ring, index) in rings"
              :key="`top-icon-${ring.key}`"
              class="top-icon"
              :style="{ top: `${STAGE / 2 - ringRadii[index]}px` }"
            >
              <component :is="ring.icon" :size="14" :stroke-width="2" />
            </span>
          </template>
          <template v-else>
            <span
              v-for="(ring, index) in rings"
              :key="`badge-${ring.key}`"
              class="badge"
              :style="badgeStyle(variant, index)"
            >
              <component :is="ring.icon" :size="13" :stroke-width="2" />
            </span>
          </template>
        </div>

        <div class="legend">
          <div v-for="(ring, index) in rings" :key="ring.key" class="legend-row">
            <span class="dot" :style="{ background: ring.colors[0] }" />
            <div class="legend-meta">
              <span class="legend-label">{{ ring.label }}</span>
              <strong class="legend-value">{{ variant.values[index] }}</strong>
            </div>
            <span class="legend-percent">{{ variant.percents[index] }}%</span>
          </div>
          <p class="tip">{{ variant.tip }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { IconFlame, IconRun, IconWalk } from '@tabler/icons-vue'
import KProgress from 'kit/vue/ui/components/feedback/Progress/Progress.vue'
import KProgressGroup from 'kit/vue/ui/components/feedback/Progress/Group.vue'

const STAGE = 280
const GROUP_SIZE = 240
const RING_STROKE = 20
const RING_GAP = 8

const rings = [
  {
    key: 'move',
    label: '活动',
    icon: IconFlame,
    colors: ['#ff2d55', '#ff6482'],
  },
  {
    key: 'exercise',
    label: '锻炼',
    icon: IconRun,
    colors: ['#a8ff00', '#2ad158'],
  },
  {
    key: 'stand',
    label: '站立',
    icon: IconWalk,
    colors: ['#00d2ff', '#0a84ff'],
  },
]

const ringRadii = (() => {
  const radii: number[] = []
  let diameter = GROUP_SIZE
  for (let i = 0; i < rings.length; i++) {
    if (i > 0) diameter -= 2 * (RING_STROKE + RING_GAP)
    radii.push((diameter - RING_STROKE) / 2)
  }
  return radii
})()

interface ActivityVariant {
  key: string
  title: string
  gradientTrail: boolean
  bareIcons?: boolean
  animated?: boolean
  percents: number[]
  values: string[]
  tip: string
}

const variants: ActivityVariant[] = [
  {
    key: 'solid',
    title: '活动圆环',
    gradientTrail: false,
    percents: [72, 66, 60],
    values: ['420 / 500 千卡', '31 / 50 分钟', '6 / 12 小时'],
    tip: '同心环用 KProgressGroup 叠放；徽标贴着各环进度头部，位置由环径与 percent 推导。',
  },
  {
    key: 'gradient',
    title: '活动圆环 · 渐变轨道',
    gradientTrail: true,
    animated: true,
    percents: [72, 66, 60],
    values: ['420 / 500 千卡', '31 / 50 分钟', '6 / 12 小时'],
    tip: '渐变轨道同样来自环色：把数组首尾色降透明度后传给 trailColor；进入视口后用 1.2s 缓动把三个环从 0 长到目标值。',
  },
  {
    key: 'bare-icons',
    title: '活动圆环 · 顶部裸图标',
    gradientTrail: true,
    bareIcons: true,
    percents: [72, 66, 60],
    values: ['420 / 500 千卡', '31 / 50 分钟', '6 / 12 小时'],
    tip: '去掉徽标底色：三枚白色图标按各环半径落在 12 点方向的环中心线上。',
  },
]

const stackRef = ref<HTMLElement>()
/* 第二个演示的环从 0 缓动到目标值；其余卡片直接显示目标值 */
const animatedValues = ref([0, 0, 0])
let observer: IntersectionObserver | undefined
let timer: ReturnType<typeof setTimeout> | undefined
let raf = 0

function runGradientAnimation() {
  const target = variants.find(variant => variant.key === 'gradient')?.percents ?? []
  const duration = 1200
  const startTime = performance.now()
  const step = (now: number) => {
    const t = Math.min(1, (now - startTime) / duration)
    const eased = 1 - (1 - t) ** 3
    animatedValues.value = target.map(percent => +(percent * eased).toFixed(2))
    if (t < 1) raf = requestAnimationFrame(step)
  }
  raf = requestAnimationFrame(step)
}

onMounted(() => {
  const card = stackRef.value?.querySelector('[data-variant="gradient"]')
  if (!card || typeof IntersectionObserver === 'undefined') {
    runGradientAnimation()
    return
  }
  observer = new IntersectionObserver(
    entries => {
      if (!entries.some(entry => entry.isIntersecting)) return
      observer?.disconnect()
      timer = setTimeout(runGradientAnimation, 120)
    },
    { threshold: 0.35 },
  )
  observer.observe(card)
})
onBeforeUnmount(() => {
  observer?.disconnect()
  clearTimeout(timer)
  cancelAnimationFrame(raf)
})

type Variant = ActivityVariant

function displayPercent(variant: Variant, index: number) {
  return variant.animated ? animatedValues.value[index] : variant.percents[index]
}

function badgeStyle(variant: Variant, index: number) {
  const percent = displayPercent(variant, index)
  const rad = ((-90 + (360 * percent) / 100) * Math.PI) / 180
  const radius = ringRadii[index]
  return {
    left: `${STAGE / 2 + radius * Math.cos(rad)}px`,
    top: `${STAGE / 2 + radius * Math.sin(rad)}px`,
    background: rings[index].colors[0],
  }
}

function withAlpha(hex: string, alpha: number) {
  const value = hex.replace('#', '')
  const r = parseInt(value.slice(0, 2), 16)
  const g = parseInt(value.slice(2, 4), 16)
  const b = parseInt(value.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function trailGradientOf(ring: (typeof rings)[number]) {
  return [withAlpha(ring.colors[0], 0.34), withAlpha(ring.colors[1], 0.06)]
}
</script>

<style scoped>
.activity-stack {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}
.activity-card {
  box-sizing: border-box;
  width: 100%;
  max-width: 760px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  background:
    radial-gradient(120% 90% at 15% 0%, rgba(255, 255, 255, 0.12), transparent 55%),
    linear-gradient(160deg, #1c1c22 0%, #0d0d10 70%);
  color: #fff;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.28);
}
/* 动画卡由 rAF 逐帧驱动，关掉组件自带的 0.2s 过渡，避免环滞后于徽标 */
.activity-card[data-variant='gradient'] {
  --k-motion-duration-mid: 0s;
}
.activity-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}
.eyebrow {
  margin: 0 0 4px;
  font-size: 11px;
  letter-spacing: 0.18em;
  color: rgba(255, 255, 255, 0.44);
}
.activity-head h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}
.date {
  font-size: var(--k-font-size-sm);
  color: rgba(255, 255, 255, 0.5);
}
.activity-body {
  display: flex;
  align-items: center;
  gap: 32px;
  margin-top: 16px;
  flex-wrap: wrap;
}
.ring-stage {
  position: relative;
  display: grid;
  place-items: center;
  width: 280px;
  height: 280px;
  flex: none;
}
.badge {
  position: absolute;
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  color: #0b0b0f;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
  z-index: 2;
}
.top-icon {
  position: absolute;
  left: 50%;
  display: grid;
  place-items: center;
  transform: translate(-50%, -50%);
  color: #fff;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.35));
  pointer-events: none;
  z-index: 2;
}
.legend {
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-width: 220px;
  flex: 1;
}
.legend-row {
  display: flex;
  align-items: center;
  gap: 12px;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex: none;
}
.legend-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.legend-label {
  font-size: var(--k-font-size-sm);
  color: rgba(255, 255, 255, 0.56);
}
.legend-value {
  font-size: var(--k-font-size-lg);
  font-weight: 600;
  letter-spacing: -0.01em;
}
.legend-percent {
  margin-left: auto;
  font-size: var(--k-font-size-sm);
  color: rgba(255, 255, 255, 0.44);
  font-variant-numeric: tabular-nums;
}
.tip {
  margin: 4px 0 0;
  font-size: var(--k-font-size-sm);
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.36);
}
@media (max-width: 720px) {
  .activity-card {
    padding: 18px 16px;
    border-radius: 16px;
  }
  .activity-head {
    gap: 12px;
  }
  .activity-head h3 {
    font-size: 18px;
  }
  .date {
    flex: none;
    font-size: 12px;
  }
  .activity-body {
    flex-direction: column;
    align-items: stretch;
    gap: 18px;
    margin-top: 12px;
  }
  .ring-stage {
    align-self: center;
  }
  .legend {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    gap: 12px;
  }
  .legend-value {
    font-size: var(--k-font-size);
  }
  .tip {
    font-size: 12px;
  }
}
/* 环形按可用宽度整体缩放（zoom 影响布局，不会溢出卡片） */
@media (max-width: 480px) {
  .ring-stage {
    zoom: 0.86;
  }
}
@media (max-width: 380px) {
  .ring-stage {
    zoom: 0.78;
  }
}
@media (max-width: 340px) {
  .ring-stage {
    zoom: 0.68;
  }
}
</style>