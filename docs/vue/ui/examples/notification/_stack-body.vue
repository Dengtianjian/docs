<script setup lang="ts">
import { ref } from 'vue'
import { useKApp } from 'kit/vue/ui/composables/useKApp'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
import KText from 'kit/vue/ui/components/Typography/Text.vue'

const { notification } = useKApp()!
const globalPause = ref(notification!.getConfig().pauseOnHover !== false)

function openTimed(pause: boolean) {
  notification!.open({
    title: pause ? '悬停暂停 5s' : '悬停不暂停 5s',
    description: `pauseOnHover=${pause}`,
    duration: 5,
    showProgress: true,
    pauseOnHover: pause,
  })
}

function setGlobalPause(on: boolean) {
  globalPause.value = on
  notification!.config({ pauseOnHover: on })
}

function toggleGlobalPause() {
  setGlobalPause(!globalPause.value)
}

function openOne() {
  notification!.config({ stackLimit: 3 })
  notification!.open({
    title: '逐条通知',
    description: '逐条追加，用于观察超过 3 条时的收起动画。',
    duration: 30,
  })
}

function burst(n: number, stackLimit = 3) {
  notification!.config({ stackLimit })
  Array.from({ length: n }).forEach(() => {
    notification!.open({
      title: '堆叠通知',
      description: '超过 3 张时自动堆叠，悬停整列展开。',
      duration: 30,
    })
  })
}
</script>

<template>
  <KSpace direction="vertical" size="lg">
    <KSpace direction="vertical" size="sm">
      <KText type="secondary">堆叠与数量</KText>
      <KSpace size="lg" wrap>
        <KButton type="primary" @click="burst(6)">弹 6 条（默认 stackLimit=3）</KButton>
        <KButton @click="openOne">逐条追加</KButton>
        <KButton @click="burst(6, 0)">stackLimit=0（平铺/滚动）</KButton>
        <KButton @click="notification!.config({ stackLimit: 3 })">恢复 stackLimit=3</KButton>
        <KButton variant="text" type="link" @click="notification!.destroyAll()">清空</KButton>
      </KSpace>
    </KSpace>
    <KSpace direction="vertical" size="sm">
      <KText type="secondary">悬停暂停</KText>
      <KSpace size="lg" wrap align="center">
        <KButton @click="openTimed(true)">悬停暂停 5s</KButton>
        <KButton @click="openTimed(false)">悬停不暂停 5s</KButton>
      </KSpace>
      <KSpace size="sm" align="center">
        <span :style="{ color: globalPause ? 'var(--k-color-success)' : 'var(--k-color-text-tertiary)' }">
          全局暂停：{{ globalPause ? '开' : '关' }}
        </span>
        <KButton size="xs" @click="toggleGlobalPause">
          {{ globalPause ? '关闭全局暂停' : '开启全局暂停' }}
        </KButton>
      </KSpace>
    </KSpace>
    <KText type="secondary">
      同一方位的通知共用一个列表，默认每列最多堆叠 3 张，较旧卡片藏在后面；鼠标进入列表展开全部（离开 160ms 后收回）。`stackLimit: 0` 可关闭堆叠回退为平铺 + 列内滚动。单条 `pauseOnHover: false` 始终不暂停（不跟全局走）；单条 `true` 随全局开关实时联动，全局关闭时暂停也会失效。
    </KText>
  </KSpace>
</template>
