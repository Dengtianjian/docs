<template>
  <KFlex vertical gap="md">
    <KFlex align="center" wrap>
      <KButton type="primary" @click="level1 = true">打开用户列表</KButton>
      <span class="nested-tip">当前层：{{ level3 ? 3 : level2 ? 2 : level1 ? 1 : 0 }}</span>
    </KFlex>

    <KDrawer v-model:open="level1" title="用户列表（第 1 层）" @after-close="closeFromLevel1">
      <KFlex vertical gap="sm">
        <button
          v-for="user in users"
          :key="user"
          type="button"
          class="nested-row"
          @click="openDetail(user)"
        >
          <span>{{ user }}</span>
          <span class="nested-row__hint">查看详情 →</span>
        </button>
      </KFlex>
      <template #footer>
        <KButton size="sm" @click="level1 = false">关闭</KButton>
      </template>
    </KDrawer>

    <KDrawer
      v-model:open="level2"
      :title="`${selected} · 详情（第 2 层）`"
      size="lg"
      @after-close="level3 = false"
    >
      <KFlex vertical gap="sm">
        <p class="nested-p">姓名：{{ selected }}</p>
        <p class="nested-p">邮箱：{{ selected }}@example.com</p>
        <p class="nested-p">父层抽屉保持打开，子层从右侧叠加在上方；Esc 或遮罩只关闭最上层。</p>
      </KFlex>
      <template #footer>
        <KButton size="sm" @click="level2 = false">返回列表</KButton>
        <KButton size="sm" type="primary" @click="level3 = true">编辑资料</KButton>
      </template>
    </KDrawer>

    <KDrawer v-model:open="level3" :title="`${selected} · 编辑（第 3 层）`" size="sm">
      <KFlex vertical gap="sm">
        <label class="nested-field">
          <span>姓名</span>
          <KInput v-model="draftName" placeholder="请输入姓名" />
        </label>
        <label class="nested-field">
          <span>邮箱</span>
          <KInput v-model="draftEmail" placeholder="请输入邮箱" />
        </label>
      </KFlex>
      <template #footer>
        <KButton size="sm" @click="level3 = false">取消</KButton>
        <KButton size="sm" type="primary" @click="level3 = false">保存</KButton>
      </template>
    </KDrawer>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KDrawer from 'kit/vue/ui/components/feedback/Drawer/Drawer.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
import KInput from 'kit/vue/ui/components/data-entry/Input/Input.vue'

const users = ['张三', '李四', '王五']

const level1 = ref(false)
const level2 = ref(false)
const level3 = ref(false)
const selected = ref('张三')
const draftName = ref('张三')
const draftEmail = ref('zhangsan@example.com')

function openDetail(user: string) {
  selected.value = user
  draftName.value = user
  draftEmail.value = `${user === '张三' ? 'zhangsan' : 'user'}@example.com`
  level2.value = true
}

function closeFromLevel1() {
  level2.value = false
  level3.value = false
}
</script>

<style scoped>
.nested-tip {
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
.nested-row {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 12px;
  border: 1px solid var(--k-color-border-secondary);
  border-radius: var(--k-border-radius);
  background: var(--k-color-bg-elevated);
  color: var(--k-color-text);
  font-family: inherit;
  font-size: var(--k-font-size-sm);
  text-align: left;
  cursor: pointer;
}
.nested-row:hover {
  border-color: var(--k-color-primary);
}
.nested-row__hint {
  color: var(--k-color-text-tertiary);
}
.nested-p {
  margin: 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
  line-height: 1.7;
}
.nested-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
</style>