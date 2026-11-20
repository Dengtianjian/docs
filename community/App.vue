<template>
  <div class="site" :style="{ '--shell-pad': shellPad }">
    <header class="site-header">
      <div class="shell header-inner">
        <a class="brand" href="#/" @click.prevent="navigate('/')">
          <span class="brand__mark">译</span>
          <span class="brand__name">如译社区</span>
        </a>

        <nav class="nav" aria-label="主导航">
          <a
            v-for="item in navItems"
            :key="item.key"
            :href="`#${item.to}`"
            class="nav__link"
            :class="{ 'is-active': page === item.key }"
            @click.prevent="navigate(item.to)"
          >{{ item.label }}</a>
        </nav>

        <div class="header-actions">
          <KInput
            v-if="showSearch"
            v-model="searchQuery"
            class="header-search"
            :style="{ width: searchWidth }"
            type="search"
            size="md"
            clearable
            :placeholder="searchPlaceholder"
            @input="onSearchInput"
          >
            <template #prefix>
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
                <circle cx="7" cy="7" r="4.5" />
                <path d="M10.5 10.5L14 14" />
              </svg>
            </template>
          </KInput>
          <KButton v-if="showAuth" type="primary" size="md" @click="navigate('/publish')">发帖</KButton>
          <button v-if="showAuth" type="button" class="user-chip" @click="navigate('/me')">
            <span class="avatar avatar--sm" :style="{ background: currentUser.color }">{{ currentUser.name.slice(-1) }}</span>
            <span class="user-chip__name">{{ currentUser.name }}</span>
          </button>
          <KButton class="menu-btn" size="sm" @click="drawerOpen = true">菜单</KButton>
        </div>
      </div>
    </header>

    <main class="shell main">
      <HomePage v-if="page === 'home'" />
      <PostPage v-else-if="page === 'post'" :post-id="postId" />
      <ComposePage v-else-if="page === 'publish'" />
      <ProfilePage v-else-if="page === 'me'" />
    </main>

    <footer class="site-footer">
      <div class="shell footer-inner">
        <span>如译社区 · 演示站点</span>
        <span class="footer-bp">当前断点 <code>{{ current }}</code> · 视口 {{ viewport }}px</span>
      </div>
    </footer>

    <KDrawer v-model:open="drawerOpen" title="导航" placement="right" width="280">
      <div class="drawer">
        <KInput
          v-model="searchQuery"
          type="search"
          clearable
          placeholder="搜索主题、标签或作者"
          @input="onSearchInput"
          @keyup.enter="drawerOpen = false"
        />
        <nav class="drawer__nav">
          <a
            v-for="item in navItems"
            :key="item.key"
            href="#"
            :class="{ 'is-active': page === item.key }"
            @click.prevent="goFromDrawer(item.to)"
          >{{ item.label }}</a>
        </nav>
        <div class="drawer__actions">
          <KButton block type="primary" @click="goFromDrawer('/publish')">发布主题</KButton>
          <KButton block @click="goFromDrawer('/me')">我的资料</KButton>
          <KButton block @click="goFromDrawer('/')">返回首页</KButton>
        </div>
      </div>
    </KDrawer>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KInput from 'kit/vue/ui/components/Input/Input.vue'
import KDrawer from 'kit/vue/ui/components/Drawer/Drawer.vue'
import { getSharedBreakpoint, useResponsiveValue } from 'kit/vue/ui'
import HomePage from './pages/HomePage.vue'
import PostPage from './pages/PostPage.vue'
import ComposePage from './pages/ComposePage.vue'
import ProfilePage from './pages/ProfilePage.vue'
import { currentUser, navItems, searchQuery } from './data'
import { navigate, useRoute } from './router'

const { current, isMobile } = getSharedBreakpoint()
const showSearch = computed(() => !isMobile.value)
const showAuth = computed(() => current.value !== 'xs' && current.value !== 'sm')
const shellPad = useResponsiveValue<string>(() => 'xs:12px sm:24px lg:32px')
const searchWidth = useResponsiveValue<string>(() => 'md:200px lg:260px')
const searchPlaceholder = computed(() => (current.value === 'md' ? '搜索主题' : '搜索主题、标签或作者'))

const route = useRoute()
const page = computed(() => {
  const segment = route.value.split('/')[1] || ''
  return segment === 'post' || segment === 'publish' || segment === 'me' ? segment : 'home'
})
const postId = computed(() => Number(route.value.split('/')[2] || 7))

const viewport = ref(0)
const drawerOpen = ref(false)
function onResize() {
  viewport.value = window.innerWidth
}
onMounted(() => {
  onResize()
  window.addEventListener('resize', onResize)
  window.visualViewport?.addEventListener('resize', onResize)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
  window.visualViewport?.removeEventListener('resize', onResize)
})
watch(current, () => requestAnimationFrame(onResize))

function onSearchInput() {
  if (page.value !== 'home') navigate('/')
}

function goFromDrawer(to: string) {
  drawerOpen.value = false
  navigate(to)
}
</script>

<style scoped>
.site {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.shell {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: var(--shell-pad, 24px);
  padding-right: var(--shell-pad, 24px);
  box-sizing: border-box;
}
.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  background: color-mix(in srgb, var(--k-color-bg-container, #fff) 88%, transparent);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--k-color-border, #e5e5e5);
}
.header-inner {
  display: flex;
  align-items: center;
  gap: 16px;
  height: 64px;
}
.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}
.brand__mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 9px;
  background: var(--k-color-primary, #1677ff);
  color: #fff;
  font-weight: 700;
}
.brand__name {
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.02em;
}
.nav {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 8px;
}
.nav__link {
  padding: 6px 12px;
  border-radius: 8px;
  color: var(--k-color-text-secondary, #666);
  font-size: 14px;
  transition: color 0.15s ease, background-color 0.15s ease;
}
.nav__link:hover {
  background: var(--k-color-fill, #f2f3f5);
  color: var(--k-color-text, #1f1f1f);
}
.nav__link.is-active {
  color: var(--k-color-primary, #1677ff);
  font-weight: 600;
  background: var(--k-color-primary-bg, #e6f4ff);
}
.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
}
.user-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 0;
  padding: 3px 8px 3px 3px;
  border-radius: 999px;
  background: var(--k-color-fill, #f2f3f5);
  color: var(--k-color-text, #1f1f1f);
  font-size: 13px;
  cursor: pointer;
}
.user-chip__name {
  max-width: 64px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.main {
  flex: 1;
  padding-top: 24px;
  padding-bottom: 48px;
}
.site-footer {
  border-top: 1px solid var(--k-color-border, #e5e5e5);
  background: var(--k-color-bg-container, #fff);
}
.footer-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding-top: 18px;
  padding-bottom: 18px;
  font-size: 12px;
  color: var(--k-color-text-secondary, #666);
}
.footer-bp code {
  padding: 1px 6px;
  border-radius: 4px;
  background: var(--k-color-fill, #f2f3f5);
  color: var(--k-color-text, #1f1f1f);
}
.drawer {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.drawer__nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.drawer__nav a {
  padding: 10px 12px;
  border-radius: 8px;
  color: var(--k-color-text-secondary, #666);
}
.drawer__nav a.is-active {
  background: var(--k-color-primary-bg, #e6f4ff);
  color: var(--k-color-primary, #1677ff);
  font-weight: 600;
}
.drawer__actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.menu-btn {
  display: inline-flex;
}
@media (min-width: 992px) {
  .menu-btn {
    display: none !important;
  }
}
@media (max-width: 991px) {
  .nav {
    display: none;
  }
}
</style>