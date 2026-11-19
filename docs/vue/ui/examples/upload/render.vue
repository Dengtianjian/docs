<template>
  <div style="max-width: 460px">
    <!-- 整件自绘：暗色紧凑清单；选文件/拖放/状态机/删除/重试全由绑定包继承（inputEl 需绑定） -->
    <KUpload v-model:file-list="files" :upload="upload" sortable multiple>
      <template #render="ctx">
        <div :ref="ctx.rootEl" v-bind="ctx.rootAttrs" v-on="ctx.rootOn" class="hl-up">
          <input :ref="ctx.inputEl" v-bind="ctx.inputAttrs" v-on="ctx.inputOn" />
          <button
            type="button"
            v-bind="ctx.triggerAttrs"
            v-on="ctx.triggerOn"
            class="hl-up__btn"
          >+ 选择文件</button>
          <ul class="hl-up__list">
            <li
              v-for="f in ctx.fileList"
              :key="f.uid"
              v-bind="ctx.itemAttrs(f)"
              v-on="ctx.itemDragOn(f)"
              class="hl-up__item"
            >
              <img v-if="ctx.thumbOf(f)" :src="ctx.thumbOf(f)" class="hl-up__thumb" v-on="ctx.previewOn(f)" />
              <span v-else class="hl-up__ext">{{ ctx.extOf(f) }}</span>
              <span class="hl-up__name" v-on="ctx.previewOn(f)">{{ f.name }}</span>
              <i class="hl-up__bar"><i :style="{ width: `${f.percent ?? 0}%` }" /></i>
              <span class="hl-up__state">{{ f.status === 'uploading' ? `${f.percent ?? 0}%` : f.status }}</span>
              <button v-if="f.status === 'error'" type="button" class="hl-up__act" v-on="ctx.retryOn(f)">重试</button>
              <button type="button" class="hl-up__act" v-on="ctx.removeOn(f)">删除</button>
            </li>
          </ul>
        </div>
      </template>
    </KUpload>
    <p style="margin: 8px 0 0; font-size: 12px; color: #888">
      headless 自绘：暗色清单 + 进度条全部自定义；内置图片预览 Modal 被替换，preview 动作仍可自行接。
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import KUpload from 'kit/vue/ui/components/Upload/Upload.vue'
import type { KUploadFile } from 'kit/vue/ui/components/Upload/Upload.vue'
import { createMockRequest } from './_mock'

const files = ref<KUploadFile[]>([])
const upload = createMockRequest({ stepMs: 220 })
</script>

<style scoped>
.hl-up {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
  border-radius: 12px;
  background: #1f1f28;
  color: #e8e8ef;
}
.hl-up__btn {
  align-self: flex-start;
  padding: 6px 14px;
  border: 1px dashed rgb(255 255 255 / 0.28);
  border-radius: 8px;
  background: transparent;
  color: #ffd666;
  font-size: 13px;
  cursor: pointer;
}
.hl-up__btn:hover {
  border-color: #ffd666;
}
.hl-up__list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.hl-up__item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}
.hl-up__thumb {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  object-fit: cover;
  cursor: pointer;
}
.hl-up__ext {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: rgb(255 255 255 / 0.08);
  color: #9a9ab0;
  font-size: 9px;
}
.hl-up__name {
  flex: auto;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
}
.hl-up__name:hover {
  color: #ffd666;
}
.hl-up__bar {
  flex: none;
  width: 64px;
  height: 3px;
  border-radius: 2px;
  background: rgb(255 255 255 / 0.12);
  overflow: hidden;
}
.hl-up__bar i {
  display: block;
  height: 100%;
  background: #ffd666;
}
.hl-up__state {
  flex: none;
  width: 52px;
  color: #9a9ab0;
  text-align: right;
}
.hl-up__act {
  flex: none;
  border: none;
  background: none;
  color: #9a9ab0;
  font-size: 12px;
  cursor: pointer;
}
.hl-up__act:hover {
  color: #fff;
}
</style>
