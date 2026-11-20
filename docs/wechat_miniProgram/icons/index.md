# 图标
采用的是谷歌字体的[字体图标](https://fonts.google.com/icons){target=_blank} [指南](https://developers.google.com/fonts/docs/material_symbols?hl=zh-cn){target=_blank}

<script setup>
import { defineClientComponent } from 'vitepress'

// naive-ui 的浮层组件依赖 document；该页直接挂载，SSR 阶段延迟到客户端
const Icons = defineClientComponent(() => import('./Icons.vue'))
</script>

<Icons />
