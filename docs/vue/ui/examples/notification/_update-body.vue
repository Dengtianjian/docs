<script setup lang="ts">
import { ref } from 'vue'
import { useKApp } from 'kit/vue/ui/composables/useKApp'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'

const { notification } = useKApp()!
const round = ref(0)

/** 同 key 原地更新：列表位置不变，内容/类型/计时从头开始（success + error 两分支轮流演示） */
function deploy() {
  const key = 'deploy-task'
  const ok = ++round.value % 2 === 1
  notification!.info({
    key,
    title: '发布开始',
    description: ok ? '正在推送构建产物……' : '第二轮演示：同样走三步。',
    duration: false,
  })
  setTimeout(
    () => notification!.warning({ key, title: '灰度 50%', description: '观察核心指标……', duration: false }),
    1200,
  )
  setTimeout(
    () =>
      ok
        ? notification!.success({ key, title: '发布完成', description: '全量上线，用时 3m12s。', duration: 4.5 })
        : notification!.error({ key, title: '发布回滚', description: '指标异常，已自动回滚。', duration: 4.5 }),
    2400,
  )
}
</script>

<template>
  <KSpace size="lg" wrap>
    <KButton type="primary" @click="deploy">同 key 三段式更新</KButton>
    <KButton variant="text" type="link" @click="notification!.destroyAll()">清空</KButton>
  </KSpace>
</template>
