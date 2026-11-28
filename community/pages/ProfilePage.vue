<template>
  <div class="profile">
    <KCard :bordered="true">
      <div class="profile-head">
        <span class="avatar avatar--lg" :style="{ background: currentUser.color }">{{ currentUser.name.slice(-1) }}</span>
        <div class="profile-head__meta">
          <div class="profile-head__name">
            <h1 :style="{ fontSize: nameSize }">{{ currentUser.name }}</h1>
            <KTag color="primary" size="sm" variant="outlined">{{ currentUser.role }}</KTag>
          </div>
          <p class="profile-head__bio">{{ currentUser.bio }}</p>
          <span class="profile-head__joined">{{ currentUser.joined }}</span>
        </div>
        <KFlex gap="sm" wrap class="profile-head__actions">
          <KButton size="sm" @click="editing = !editing">{{ editing ? '收起编辑' : '编辑资料' }}</KButton>
          <KButton type="primary" size="sm">私信</KButton>
        </KFlex>
      </div>

      <KGrid class="profile-stats" gap="xs:8,8 sm:12,12 md:16,12">
        <KGridItem v-for="item in userStats" :key="item.label" :span="{ xs: 12, sm: 6 }">
          <div class="stat">
            <strong :style="{ fontSize: statSize }">{{ item.value }}</strong>
            <span>{{ item.label }}</span>
          </div>
        </KGridItem>
      </KGrid>

      <div v-if="editing" class="profile-edit">
        <KForm
          :model="editModel"
          layout="xs:vertical md:horizontal"
          label-width="xs:64 md:80"
          colon="xs:false md:true"
        >
          <KFormItem label="昵称" name="name">
            <KInput v-model="editModel.name" maxlength="20" show-count />
          </KFormItem>
          <KFormItem label="简介" name="bio">
            <KInput v-model="editModel.bio" type="textarea" :autosize="{ minRows: 3, maxRows: 6 }" maxlength="120" show-count />
          </KFormItem>
        </KForm>
        <div class="profile-edit__actions">
          <KButton size="sm" @click="editing = false">取消</KButton>
          <KButton type="primary" size="sm" @click="editing = false">保存资料</KButton>
        </div>
      </div>
    </KCard>

    <KGrid gap="xs:0 sm:12 md:16,20 lg:24,24">
      <KGridItem :span="{ xs: 24, lg: 17 }">
        <KCard :bordered="true">
          <template #header>
            <KControlGroup>
              <KButton
                v-for="item in sections"
                :key="item.key"
                :type="section === item.key ? 'primary' : 'default'"
                size="xs:sm md:md"
                @click="section = item.key"
              >{{ item.label }}</KButton>
            </KControlGroup>
          </template>

          <div v-if="section === 'topics'">
            <div v-if="myPosts.length" class="topic-list">
              <template v-for="(post, index) in myPosts" :key="post.id">
                <KDivider v-if="index > 0" />
                <button type="button" class="topic" @click="navigate(`/post/${post.id}`)">
                  <span class="topic__title">{{ post.title }}</span>
                  <span class="topic__meta">{{ post.time }} · {{ post.replies }} 回复 · {{ formatNum(post.views) }} 浏览</span>
                </button>
              </template>
            </div>
            <KEmpty v-else description="还没有发布过主题" />
          </div>

          <div v-else-if="section === 'bookmarks'">
            <div class="topic-list">
              <template v-for="(post, index) in bookmarkedPosts" :key="post.id">
                <KDivider v-if="index > 0" />
                <button type="button" class="topic" @click="navigate(`/post/${post.id}`)">
                  <span class="topic__title">{{ post.title }}</span>
                  <span class="topic__meta">来自 {{ post.author }} · {{ post.time }}</span>
                </button>
              </template>
            </div>
          </div>

          <div v-else class="settings">
            <KAlert v-if="saved" type="success" closable message="设置已保存。" @close="saved = false" />
            <div class="settings__row">
              <span class="settings__label">回复提醒</span>
              <KSwitch v-model="settings.reply" />
            </div>
            <KDivider />
            <div class="settings__row">
              <span class="settings__label">新粉丝通知</span>
              <KSwitch v-model="settings.follower" />
            </div>
            <KDivider />
            <div class="settings__row">
              <span class="settings__label">每周精选邮件</span>
              <KSwitch v-model="settings.weekly" />
            </div>
            <div class="settings__actions">
              <KButton type="primary" size="sm" @click="saved = true">保存设置</KButton>
            </div>
          </div>
        </KCard>
      </KGridItem>

      <KGridItem :span="{ xs: 24, lg: 7 }">
        <div class="aside">
          <KCard title="我的关注" size="md">
            <ul class="member-list">
              <li v-for="member in followedMembers" :key="member.name">
                <span class="avatar" :style="{ background: member.color }">{{ member.name.slice(-1) }}</span>
                <span class="member__meta">
                  <strong>{{ member.name }}</strong>
                  <span>{{ member.role }}</span>
                </span>
                <KButton size="sm" @click="member.followed = false">已关注</KButton>
              </li>
            </ul>
            <KEmpty v-if="!followedMembers.length" description="还没有关注任何成员" size="sm" />
          </KCard>

          <KCard title="最近动态" size="md">
            <ul class="activity">
              <li v-for="item in activity" :key="item.text">
                <span class="activity__dot" />
                <span class="activity__text">{{ item.text }}</span>
                <span class="activity__time">{{ item.time }}</span>
              </li>
            </ul>
          </KCard>
        </div>
      </KGridItem>
    </KGrid>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import KButton from 'kit/vue/ui/components/general/Button/Button.vue'
import KControlGroup from 'kit/vue/ui/components/data-entry/ControlGroup/ControlGroup.vue'
import KCard from 'kit/vue/ui/components/layouts/Card/Card.vue'
import KGrid from 'kit/vue/ui/components/layouts/Grid/Grid.vue'
import KGridItem from 'kit/vue/ui/components/layouts/Grid/GridItem.vue'
import KFlex from 'kit/vue/ui/components/layouts/Flex/Flex.vue'
import KTag from 'kit/vue/ui/components/data-display/Tag/Tag.vue'
import KDivider from 'kit/vue/ui/components/general/Divider/Divider.vue'
import KEmpty from 'kit/vue/ui/components/data-display/Empty/Empty.vue'
import KAlert from 'kit/vue/ui/components/feedback/Alert/Alert.vue'
import KForm from 'kit/vue/ui/components/data-entry/Form/Form.vue'
import KFormItem from 'kit/vue/ui/components/data-entry/Form/FormItem.vue'
import KInput from 'kit/vue/ui/components/data-entry/Input/Input.vue'
import KSwitch from 'kit/vue/ui/components/data-entry/Switch/Switch.vue'
import { useResponsiveValue } from 'kit/vue/ui'
import { currentUser, formatNum, members, posts } from '../data'
import { navigate } from '../router'

const nameSize = useResponsiveValue<string>(() => 'xs:18px md:22px')
const statSize = useResponsiveValue<string>(() => 'xs:18px md:22px lg:26px')

const sections = [
  { key: 'topics', label: '我的主题' },
  { key: 'bookmarks', label: '我的收藏' },
  { key: 'settings', label: '账号设置' },
]
const section = ref('topics')

const userStats = [
  { label: '主题', value: '1' },
  { label: '获赞', value: '186' },
  { label: '关注者', value: '47' },
  { label: '关注', value: '23' },
]

const myPosts = computed(() => posts.value.filter(post => post.author === currentUser.name))
const bookmarkedPosts = computed(() => posts.value.filter(post => [5, 1].includes(post.id)))

const editing = ref(false)
const editModel = reactive({ name: currentUser.name, bio: currentUser.bio })

const saved = ref(false)
const settings = reactive({ reply: true, follower: true, weekly: false })

const followedMembers = computed(() => members.value.filter(member => member.followed))

const activity = [
  { text: '关注了 徐小满', time: '2 天前' },
  { text: '发布了《Vue 3.5 响应式 props 在 1000 字段表单里的性能实测》', time: '25 分钟前' },
  { text: '回复了《kit 的 KTable 合并单元格…》', time: '40 分钟前' },
  { text: '收藏了《分享：用 KForm 断点字符串做后台移动端适配》', time: '昨天' },
]
</script>

<style scoped>
.profile {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.profile-head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 16px;
}
.profile-head__meta {
  flex: 1;
  min-width: 220px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.profile-head__name {
  display: flex;
  align-items: center;
  gap: 10px;
}
.profile-head__name h1 {
  margin: 0;
  font-weight: 700;
}
.profile-head__bio {
  margin: 0;
  color: var(--k-color-text-secondary, #666);
}
.profile-head__joined {
  font-size: 12px;
  color: var(--k-color-text-secondary, #666);
}
.profile-head__actions {
  margin-left: auto;
}
.profile-stats {
  margin-top: 18px;
  padding-top: 18px;
  border-top: 1px dashed var(--k-color-border, #e5e5e5);
}
.stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px 12px;
  border-radius: 10px;
  background: var(--k-color-bg-layout, #f5f5f5);
}
.stat strong {
  font-weight: 700;
  line-height: 1.1;
  font-variant-numeric: tabular-nums;
}
.stat span {
  font-size: 12px;
  color: var(--k-color-text-secondary, #666);
}
.profile-edit {
  margin-top: 18px;
  padding-top: 18px;
  border-top: 1px dashed var(--k-color-border, #e5e5e5);
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.profile-edit__actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
.topic-list {
  display: flex;
  flex-direction: column;
}
.topic {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 0;
  border: 0;
  background: none;
  text-align: left;
  cursor: pointer;
}
.topic:hover .topic__title {
  color: var(--k-color-primary, #1677ff);
}
.topic__title {
  font-size: 15px;
  font-weight: 600;
  line-height: 1.45;
}
.topic__meta {
  font-size: 12px;
  color: var(--k-color-text-secondary, #666);
}
.settings {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.settings__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.settings__label {
  font-size: 14px;
}
.settings__actions {
  display: flex;
  justify-content: flex-end;
  padding-top: 4px;
}
.aside {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.member-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.member-list li {
  display: flex;
  align-items: center;
  gap: 10px;
}
.member__meta {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  line-height: 1.35;
}
.member__meta strong {
  font-size: 13px;
  font-weight: 600;
}
.member__meta span {
  font-size: 12px;
  color: var(--k-color-text-secondary, #666);
}
.activity {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.activity li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
}
.activity__dot {
  width: 6px;
  height: 6px;
  margin-top: 7px;
  border-radius: 50%;
  background: var(--k-color-primary, #1677ff);
  flex-shrink: 0;
}
.activity__text {
  flex: 1;
  min-width: 0;
}
.activity__time {
  font-size: 12px;
  color: var(--k-color-text-secondary, #666);
  white-space: nowrap;
}
@media (min-width: 992px) {
  .aside {
    position: sticky;
    top: 84px;
  }
}
@media (max-width: 767px) {
  .profile-head__actions {
    margin-left: 0;
  }
}
</style>