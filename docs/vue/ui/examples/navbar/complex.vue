<template>
  <div>
    <div class="phone-frame">
      <KNavBar
        title="项目详情"
        subtitle="12 位成员 · 进行中"
        :class-names="{ root: 'nav-complex' }"
      >
        <template #left>
          <span class="nav-avatar">林</span>
        </template>
        <template #right>
          <KDropdown :items="menu" trigger="click" @select="last = String($event)">
            <template #trigger>
              <KButton variant="text">更多</KButton>
            </template>
          </KDropdown>
        </template>
      </KNavBar>
      <div class="phone-body">
        <p>返回键 + 左侧头像 + 标题/副标题 + 右侧下拉菜单。</p>
        <p>高度自定 56px，其余部件保持默认。</p>
      </div>
    </div>
    <div class="nav-tip">最近操作：{{ last || '—' }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KDropdown from 'kit/vue/ui/components/navigation/Dropdown/Dropdown.vue'
import KNavBar from 'kit/vue/ui/components/navigation/NavBar/NavBar.vue'
import type { KDropdownItem } from 'kit/vue/ui'

const last = ref('')
const menu: KDropdownItem[] = [
  { key: 'edit', label: '编辑项目' },
  { key: 'member', label: '管理成员' },
  { key: 'archive', label: '归档', divided: true },
]
</script>

<style scoped>
.phone-frame {
  width: 320px;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: 18px;
  overflow: hidden;
  background: var(--k-color-bg-layout);
}
.phone-body {
  min-height: 120px;
  padding: 16px;
}
.phone-body p {
  margin: 0 0 8px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
  line-height: 1.7;
}
.nav-tip {
  margin-top: 12px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
.nav-complex {
  --k-navbar-height: 56px;
}
.nav-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--k-color-primary-bg);
  color: var(--k-color-primary);
  font-size: var(--k-font-size-sm);
}
</style>