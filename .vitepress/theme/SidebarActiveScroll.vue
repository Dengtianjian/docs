<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()
let first = true

/** 目录首页（/a/b/）在默认主题里匹配不到 /a/b.html 侧栏项，按 href 兜底找当前项。 */
function normalize(path: string) {
  return decodeURI(path).replace(/\.html$/, '').replace(/\/$/, '')
}

function findCurrent(sidebar: HTMLElement) {
  const active = sidebar.querySelector<HTMLElement>('.VPSidebarItem.is-active')
  if (active) return active
  const current = normalize(route.path)
  const link = [...sidebar.querySelectorAll<HTMLAnchorElement>('.VPSidebarItem a')]
    .find(a => normalize(a.getAttribute('href') ?? '') === current)
  return link?.closest<HTMLElement>('.VPSidebarItem') ?? null
}

/** 侧栏很长且默认全部展开，路由切换后把当前项滚进可视区（已在可视区则不动）。 */
function revealActive(behavior: ScrollBehavior) {
  const sidebar = document.querySelector<HTMLElement>('.VPSidebar')
  if (!sidebar) return
  const current = findCurrent(sidebar)
  if (!current) return

  const curtain = sidebar.querySelector<HTMLElement>('.curtain')
  const covered = curtain?.offsetHeight ?? 0
  const margin = 16
  const itemTop = current.getBoundingClientRect().top - sidebar.getBoundingClientRect().top + sidebar.scrollTop
  const itemBottom = itemTop + current.offsetHeight
  const viewTop = sidebar.scrollTop + covered + margin
  const viewBottom = sidebar.scrollTop + sidebar.clientHeight - margin

  if (itemTop >= viewTop && itemBottom <= viewBottom) return

  // 超出可视区才滚：居中放置，并避开顶部固定的 nav 遮罩
  const maxTop = sidebar.scrollHeight - sidebar.clientHeight
  const centered = itemTop - (sidebar.clientHeight - covered - current.offsetHeight) / 2
  const top = Math.min(maxTop, Math.max(covered + margin, centered))
  sidebar.scrollTo({ top: Math.max(0, top), behavior })
}

function schedule() {
  requestAnimationFrame(() => {
    revealActive(first ? 'auto' : 'smooth')
    first = false
  })
}

watch(() => route.path, schedule, { flush: 'post' })
onMounted(schedule)
</script>

<template>
  <span hidden />
</template>