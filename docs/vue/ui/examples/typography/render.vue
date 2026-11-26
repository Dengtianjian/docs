<template>
  <div>
    <!-- tag 派生逻辑继承（h3）；字阶视觉自绘；默认插槽内容经 slots.default 取回 -->
    <KTitle :level="3">
      <template #render="ctx">
        <component :is="ctx.tag" v-bind="ctx.rootAttrs" class="hl-title">
          <component :is="ctx.slots.default" />
        </component>
      </template>
      自定义标题
    </KTitle>

    <!-- 渐变解析逻辑随 rootStyle 继承；background-clip 视觉自绘 -->
    <KText gradient="#1677ff, #722ed1, #eb2f96">
      <template #render="ctx">
        <span v-bind="ctx.rootAttrs" :style="ctx.rootStyle" class="hl-gradient-text">渐变文字自绘</span>
      </template>
    </KText>

    <KParagraph>
      <template #render="ctx">
        <p v-bind="ctx.rootAttrs" class="hl-para"><component :is="ctx.slots.default" /></p>
      </template>
      段落逻辑件：语义标签与 data-part 继承，排版视觉自绘。
    </KParagraph>
  </div>
</template>

<script setup lang="ts">
import KTitle from 'kit/vue/ui/components/general/Typography/Title.vue'
import KText from 'kit/vue/ui/components/general/Typography/Text.vue'
import KParagraph from 'kit/vue/ui/components/general/Typography/Paragraph.vue'
</script>

<style scoped>
.hl-title {
  margin: 0 0 8px;
  font-size: 20px;
  color: var(--k-color-primary);
  border-bottom: 2px solid var(--k-color-primary);
  display: inline-block;
}
.hl-gradient-text {
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  font-weight: 600;
}
.hl-para {
  margin: 8px 0 0;
  font-size: 13px;
  color: var(--k-color-text-secondary);
}
</style>
