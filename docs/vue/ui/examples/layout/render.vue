<template>
  <!-- 五子件各自 headless：高度/宽度变量随 rootAttrs 注入，骨架视觉全自绘 -->
  <KLayout>
    <template #render="ctx">
      <section v-bind="ctx.rootAttrs" class="hl-layout">
        <KLayoutHeader :height="48">
          <template #render="h">
            <header v-bind="h.rootAttrs" class="hl-layout__header">Header · height={{ h.height }}</header>
          </template>
        </KLayoutHeader>
        <KLayout has-sider>
          <template #render="inner">
            <section v-bind="inner.rootAttrs" class="hl-layout hl-layout--row">
              <KLayoutSider :width="120">
                <template #render="s">
                  <aside v-bind="s.rootAttrs" class="hl-layout__sider">Sider {{ s.width }}</aside>
                </template>
              </KLayoutSider>
              <KLayoutContent>
                <template #render="c">
                  <main v-bind="c.rootAttrs" class="hl-layout__content">Content</main>
                </template>
              </KLayoutContent>
            </section>
          </template>
        </KLayout>
        <KLayoutFooter :height="40">
          <template #render="f">
            <footer v-bind="f.rootAttrs" class="hl-layout__footer">Footer · height={{ f.height }}</footer>
          </template>
        </KLayoutFooter>
      </section>
    </template>
  </KLayout>
</template>

<script setup lang="ts">
import KLayout from 'kit/vue/ui/components/layouts/Layout/Layout.vue'
import KLayoutHeader from 'kit/vue/ui/components/layouts/Layout/Header.vue'
import KLayoutSider from 'kit/vue/ui/components/layouts/Layout/Sider.vue'
import KLayoutContent from 'kit/vue/ui/components/layouts/Layout/Content.vue'
import KLayoutFooter from 'kit/vue/ui/components/layouts/Layout/Footer.vue'
</script>

<style scoped>
.hl-layout {
  display: flex;
  flex-direction: column;
  min-height: 0;
  border: 1px solid var(--k-color-border);
  border-radius: 10px;
  overflow: hidden;
  font-size: 12px;
  font-family: var(--k-font-family-code);
}
.hl-layout--row {
  flex-direction: row;
  border: none;
  border-radius: 0;
}
.hl-layout__header,
.hl-layout__footer {
  display: flex;
  align-items: center;
  flex: none;
  height: var(--k-layout-header-height, 64px);
  padding-inline: 14px;
  background: var(--k-color-primary-bg);
  color: var(--k-color-primary);
}
.hl-layout__footer {
  height: var(--k-layout-footer-height, 64px);
}
.hl-layout__sider {
  flex: none;
  width: var(--k-layout-sider-width, 208px);
  padding: 14px;
  background: var(--k-color-fill-quaternary);
}
.hl-layout__content {
  flex: auto;
  min-height: 80px;
  padding: 14px;
}
</style>
