<template>
  <KSpace direction="vertical" size="md">
    <KSpace align="center">
      <KButton type="primary" @click="openDrawer">实例打开</KButton>
      <KButton @click="destroyAll">销毁全部</KButton>
    </KSpace>
    <div class="drawer-tip">状态：{{ status }}</div>
  </KSpace>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
import { useKApp } from 'kit/vue/ui'
import type { KDrawerHandle } from 'kit/vue/ui'

const app = useKApp()
const status = ref('—')
let handle: KDrawerHandle | null = null

function openDrawer() {
  handle = app?.drawer?.open({
    title: '实例抽屉',
    placement: 'right',
    size: 'md',
    content: h('div', [
      h('p', '由 useKApp().drawer.open() 创建，宿主队列随 KApp 生命周期存活。'),
      h('p', '点击遮罩 / Esc / X 关闭；afterClose 在退场动画结束后触发。'),
    ]),
    footer: h(
      KButton,
      { size: 'sm', onClick: () => handle?.destroy() },
      () => '关闭',
    ),
    onClose: () => {
      status.value = 'onClose'
    },
    afterClose: () => {
      status.value = 'afterClose'
      handle = null
    },
  })
}

function destroyAll() {
  app?.drawer?.destroyAll()
  status.value = 'destroyAll'
}
</script>

<style scoped>
.drawer-tip {
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
:deep(.k-drawer__body p) {
  margin: 0 0 8px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
  line-height: 1.7;
}
</style>