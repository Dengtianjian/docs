<template>
  <KFlex vertical gap="md">
    <KFlex align="center" wrap>
      <KButton type="primary" @click="level1 = true">打开弹层</KButton>
      <span class="popup-tip">当前层：{{ level3 ? 3 : level2 ? 2 : level1 ? 1 : 0 }}</span>
    </KFlex>

    <KPopup v-model:open="level1" title="第 1 层 · 选择类型" closeable>
      <KFlex vertical gap="sm">
        <button type="button" class="popup-row" @click="level2 = true">
          <span>继续查看详情</span>
          <span class="popup-row__hint">→</span>
        </button>
        <p class="popup-p">底部弹层是第一层；打开下一层时它仍保持显示。</p>
      </KFlex>
      <template #footer>
        <KButton block @click="level1 = false">关闭</KButton>
      </template>
    </KPopup>

    <KPopup v-model:open="level2" placement="right" title="第 2 层 · 详情">
      <KFlex vertical gap="sm">
        <p class="popup-p">右侧弹层叠加在底部弹层之上，遮罩逐层加深。</p>
        <p class="popup-p">Esc 或点击遮罩只关闭最上层。</p>
        <KButton block @click="level3 = true">继续：保存确认</KButton>
      </KFlex>
      <template #footer>
        <KButton block variant="outline" @click="level2 = false">返回</KButton>
      </template>
    </KPopup>

    <KCenterPopup v-model:open="level3" title="第 3 层 · 保存确认" closeable>
      <p class="popup-p">确认后关闭全部弹层；全部关闭前页面滚动保持锁定，滚动条宽度已补偿。</p>
      <template #footer>
        <div class="popup-actions">
          <KButton size="sm" variant="outline" @click="level3 = false">取消</KButton>
          <KButton size="sm" type="primary" @click="closeAll">确定</KButton>
        </div>
      </template>
    </KCenterPopup>
  </KFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KCenterPopup from 'kit/vue/ui/components/overlay/CenterPopup/CenterPopup.vue'
import KPopup from 'kit/vue/ui/components/overlay/Popup/Popup.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'

const level1 = ref(false)
const level2 = ref(false)
const level3 = ref(false)

function closeAll() {
  level3.value = false
  level2.value = false
  level1.value = false
}
</script>

<style scoped>
.popup-tip {
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
}
.popup-row {
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
.popup-row:hover {
  border-color: var(--k-color-primary);
}
.popup-row__hint {
  color: var(--k-color-text-tertiary);
}
.popup-p {
  margin: 0;
  color: var(--k-color-text-secondary);
  font-size: var(--k-font-size-sm);
  line-height: 1.7;
}
.popup-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>