<template>
  <div class="ellipsis-demo">
    <section>
      <div class="ellipsis-demo__label">单行省略</div>
      <KText ellipsis style="display: inline-block; width: 280px">
        K UI 的排版组件支持单行省略，超出容器宽度后自动截断并显示省略号。
      </KText>
    </section>

    <section>
      <div class="ellipsis-demo__label">多行省略 + 展开 / 收起</div>
      <KParagraph :ellipsis="{ rows: 2, expandable: true }" style="max-width: 420px">
        Typography 的省略能力来自 antd 的 ellipsis 设计：单行用 text-overflow，多行用
        line-clamp；开启 expandable 后会显示展开操作。点击「展开」可以看到完整内容，
        再次点击「收起」恢复截断。内容很长时会保持行数上限，不会撑破卡片布局。
      </KParagraph>
    </section>

    <section>
      <div class="ellipsis-demo__label">点击文字展开，展开后可正常选择文字</div>
      <KParagraph :ellipsis="{ rows: 1, expandable: true }" style="max-width: 420px">
        单行省略时点击文字或箭头都能展开；展开后点击文字不会再次收起，需要点右上角的收起箭头。
        这样展开后的内容可以正常选中、复制或点击其中的链接。
      </KParagraph>
    </section>

    <section>
      <div class="ellipsis-demo__label">自定义展开操作插槽</div>
      <KParagraph :ellipsis="{ rows: 1, expandable: true }" style="max-width: 320px">
        <template #expand="{ expanded }">{{ expanded ? '收起内容' : '查看更多' }}</template>
        展开操作可以通过插槽自定义，按钮的点击行为与无障碍状态仍由组件维护。
      </KParagraph>
    </section>

    <section>
      <div class="ellipsis-demo__label">自定义操作文案</div>
      <KParagraph
        :ellipsis="{
          rows: 1,
          expandable: true,
          symbol: (isOpen) => (isOpen ? '收起全文' : '展开全文'),
        }"
        style="max-width: 320px"
      >
        自定义 symbol 可以按展开状态返回不同文案，适合「展开全文 / 收起全文」这类场景。
      </KParagraph>
    </section>

    <section>
      <div class="ellipsis-demo__label">受控展开：expanded = {{ expanded }}</div>
      <KParagraph
        :ellipsis="{ rows: 2, expandable: true, expanded, onExpand: (v) => (expanded = v) }"
        style="max-width: 420px"
      >
        受控模式由外部状态驱动：点击文本后的操作或下方按钮都会更新 expanded，
        组件本身不再维护内部展开态。适合需要与路由、弹窗或埋点联动的场景。
      </KParagraph>
      <KButton size="sm" style="margin-top: 8px" @click="expanded = !expanded">
        切换受控展开
      </KButton>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KParagraph from 'kit/vue/ui/components/general/Typography/Paragraph.vue'
import KText from 'kit/vue/ui/components/general/Typography/Text.vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'

const expanded = ref(false)
</script>

<style scoped>
.ellipsis-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.ellipsis-demo__label {
  margin-bottom: 8px;
  color: var(--k-color-text-tertiary);
  font-size: var(--k-font-size-sm);
}
</style>