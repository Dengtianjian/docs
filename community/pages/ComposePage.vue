<template>
  <div class="compose">
    <header class="compose__head">
      <h1 class="compose__title" :style="{ fontSize: titleSize }">发布新主题</h1>
      <p class="compose__desc">清晰的标题 + 可复现的描述，能让讨论更快进入正题。</p>
    </header>

    <KRow gutter="xs:0 md:16,24 lg:24,24">
      <KCol :span="{ xs: 24, md: 17 }">
        <KCard :bordered="true">
          <KAlert
            v-if="error"
            type="error"
            closable
            message="标题和正文都需要填写后再发布。"
            @close="error = false"
          />

          <KForm
            class="compose-form"
            :model="model"
            layout="xs:vertical md:horizontal"
            label-width="xs:72 md:96"
            label-align="xs:left md:right"
            colon="xs:false md:true"
          >
            <KFormItem label="标题" name="title" required extra="最多 60 字，建议包含具体场景或报错关键词">
              <KInput v-model="model.title" maxlength="60" show-count placeholder="例如：KTable 合并单元格在虚拟滚动下错位" />
            </KFormItem>

            <KFormItem label="板块" name="board" required>
              <KSelect v-model="model.board" :options="boardOptions" placeholder="选择板块" />
            </KFormItem>

            <KFormItem label="标签" name="tags" extra="最多选择 3 个，便于同类问题聚合">
              <KSelect
                v-model="model.tags"
                mode="multiple"
                :options="tagOptions"
                placeholder="选择标签"
                :styles="{ root: { maxWidth: '420px' } }"
              />
            </KFormItem>

            <KFormItem label="正文" name="body" required>
              <KInput
                v-model="model.body"
                type="textarea"
                :autosize="{ minRows: 8, maxRows: 18 }"
                placeholder="环境与版本：&#10;期望结果：&#10;实际结果：&#10;最小复现："
              />
            </KFormItem>

            <KFormItem label="选项" name="options">
              <div class="options">
                <KSwitch v-model="model.allowComment" label="允许评论" label-position="right" />
                <KSwitch v-model="model.syncTimeline" label="同步到社区动态" label-position="right" />
              </div>
            </KFormItem>
          </KForm>

          <div class="compose__actions">
            <span class="compose__count">草稿自动保存在本地</span>
            <KSpace size="xs:sm md:md" wrap>
              <KButton size="xs:md md:md" @click="navigate('/')">取消</KButton>
              <KButton size="xs:md md:md" @click="reset">清空</KButton>
              <KButton type="primary" size="xs:md md:md" :disabled="!canPublish" @click="publish">发布主题</KButton>
            </KSpace>
          </div>
        </KCard>
      </KCol>

      <KCol :span="{ xs: 24, md: 7 }">
        <div class="aside">
          <KCard title="发帖建议" size="md">
            <ul class="tips">
              <li>标题写清现象与组件，避免“求助！”这类泛化标题。</li>
              <li>正文附环境、版本与最小复现，最好能贴代码片段。</li>
              <li>已解决的帖子记得标记答案，方便后来的人检索。</li>
              <li>分享类内容请说明适用场景与已知限制。</li>
            </ul>
          </KCard>

          <KCard title="热门标签" size="md">
            <div class="tag-cloud">
              <KTag
                v-for="tag in tagCloud"
                :key="tag.label"
                :color="tag.color"
                :variant="model.tags.includes(tag.label) ? 'filled' : 'outlined'"
                clickable
                @click="toggleTag(tag.label)"
              >{{ tag.label }}</KTag>
            </div>
          </KCard>
        </div>
      </KCol>
    </KRow>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KCard from 'kit/vue/ui/components/Card/Card.vue'
import KRow from 'kit/vue/ui/components/Grid/Row.vue'
import KCol from 'kit/vue/ui/components/Grid/Col.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
import KTag from 'kit/vue/ui/components/Tag/Tag.vue'
import KAlert from 'kit/vue/ui/components/Alert/Alert.vue'
import KForm from 'kit/vue/ui/components/Form/Form.vue'
import KFormItem from 'kit/vue/ui/components/Form/FormItem.vue'
import KInput from 'kit/vue/ui/components/Input/Input.vue'
import KSelect from 'kit/vue/ui/components/Select/Select.vue'
import KSwitch from 'kit/vue/ui/components/Switch/Switch.vue'
import { useResponsiveValue } from 'kit/vue/ui'
import { addPost, searchQuery, tagCloud } from '../data'
import { navigate } from '../router'

const titleSize = useResponsiveValue<string>(() => 'xs:20px sm:22px md:24px')

const model = reactive({
  title: '',
  board: 'frontend',
  tags: [] as string[],
  body: '',
  allowComment: true,
  syncTimeline: true,
})

const boardOptions = [
  { label: '前端开发', value: 'frontend' },
  { label: '组件库', value: 'components' },
  { label: 'PHP / Discuz', value: 'php' },
  { label: '小程序', value: 'miniapp' },
  { label: '闲聊与活动', value: 'chat' },
]
const tagOptions = tagCloud.map(tag => ({ label: tag.label, value: tag.label }))

const error = ref(false)
const canPublish = computed(() => model.title.trim().length > 0 && model.body.trim().length > 0)

function toggleTag(label: string) {
  if (model.tags.includes(label)) {
    model.tags = model.tags.filter(tag => tag !== label)
    return
  }
  if (model.tags.length < 3) model.tags = [...model.tags, label]
}

function reset() {
  model.title = ''
  model.tags = []
  model.body = ''
  error.value = false
}

function publish() {
  if (!canPublish.value) {
    error.value = true
    return
  }
  const tags = model.tags.map(label => {
    const preset = tagCloud.find(tag => tag.label === label)
    return { label, color: preset?.color ?? 'default' }
  })
  const id = addPost(model.title.trim(), model.body.trim(), tags)
  searchQuery.value = ''
  navigate(`/post/${id}`)
}
</script>

<style scoped>
.compose__head {
  margin-bottom: 16px;
}
.compose__title {
  margin: 0 0 6px;
  font-weight: 700;
}
.compose__desc {
  margin: 0;
  color: var(--k-color-text-secondary, #666);
}
.compose-form {
  margin-top: 8px;
}
.options {
  display: flex;
  flex-wrap: wrap;
  gap: 16px 24px;
}
.compose__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid var(--k-color-border, #e5e5e5);
  margin-top: 8px;
}
.compose__count {
  font-size: 12px;
  color: var(--k-color-text-secondary, #666);
}
.aside {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.tips {
  margin: 0;
  padding-left: 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 13px;
  color: var(--k-color-text-secondary, #666);
}
.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
@media (min-width: 992px) {
  .aside {
    position: sticky;
    top: 84px;
  }
}
</style>