<template>
  <div v-if="post" class="post-page">
    <nav class="crumbs" aria-label="面包屑">
      <a href="#/" @click.prevent="navigate('/')">首页</a>
      <span class="crumbs__sep">/</span>
      <a href="#/" @click.prevent="navigate('/')">讨论</a>
      <span class="crumbs__sep">/</span>
      <span class="crumbs__current">{{ post.title }}</span>
    </nav>

    <KRow gutter="xs:0 sm:12 md:16,20 lg:24,24">
      <KCol :span="{ xs: 24, lg: 17 }">
        <KCard :bordered="true">
          <article class="article">
            <div class="article__tags">
              <KTag v-if="post.pinned" color="error" size="sm">置顶</KTag>
              <KTag v-else-if="post.featured" color="warning" size="sm">精华</KTag>
              <KTag
                v-for="tag in post.tags"
                :key="tag.label"
                :color="tag.color"
                size="sm"
                variant="outlined"
                clickable
                @click="navigate('/')"
              >{{ tag.label }}</KTag>
            </div>

            <h1 class="article__title" :style="{ fontSize: titleSize }">{{ post.title }}</h1>

            <div class="article__meta">
              <span class="avatar avatar--sm" :style="{ background: post.color }">{{ post.author.slice(-1) }}</span>
              <span class="article__author">{{ post.author }}</span>
              <span class="article__dot">·</span>
              <span>{{ post.time }}</span>
              <span class="article__dot">·</span>
              <span>{{ formatNum(post.views) }} 浏览</span>
              <span class="article__dot">·</span>
              <span>{{ post.replies }} 回复</span>
            </div>

            <div class="article__body">
              <p v-for="(paragraph, index) in body" :key="index">{{ paragraph }}</p>
            </div>

            <div class="article__actions">
              <button
                type="button"
                class="action action--vote"
                :class="{ 'is-active': post.voted }"
                :aria-pressed="post.voted"
                @click="toggleVote"
              >
                <span aria-hidden="true">▲</span> 赞同 {{ post.votes }}
              </button>
              <button type="button" class="action" :class="{ 'is-active': bookmarked }" @click="bookmarked = !bookmarked">
                {{ bookmarked ? '已收藏' : '收藏' }}
              </button>
              <button type="button" class="action" @click="share">分享</button>
            </div>
          </article>

          <KDivider />

          <section class="comments">
            <h2 class="comments__title">全部回复 <span>{{ commentList.length }}</span></h2>

            <div v-if="commentList.length" class="comment-list">
              <template v-for="(comment, index) in commentList" :key="comment.id">
                <KDivider v-if="index > 0" />
                <div class="comment">
                  <span class="avatar" :style="{ background: comment.color }">{{ comment.author.slice(-1) }}</span>
                  <div class="comment__body">
                    <div class="comment__head">
                      <strong>{{ comment.author }}</strong>
                      <span class="comment__time">{{ comment.time }}</span>
                      <span class="comment__floor">{{ index + 1 }} 楼</span>
                    </div>
                    <p class="comment__content">{{ comment.content }}</p>
                    <button
                      type="button"
                      class="comment__like"
                      :class="{ 'is-active': comment.liked }"
                      @click="toggleLike(comment)"
                    >▲ {{ comment.likes }}</button>
                  </div>
                </div>
              </template>
            </div>
            <KEmpty v-else description="还没有回复，来抢一楼" />

            <div class="reply">
              <KInput
                v-model="replyText"
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 8 }"
                placeholder="写下你的看法，附上环境与复现步骤会更快得到回复"
              />
              <div class="reply__actions">
                <span class="reply__hint">{{ replyText.length }}/2000</span>
                <KSpace size="sm">
                  <KButton size="xs:sm md:md" @click="replyText = ''">清空</KButton>
                  <KButton type="primary" size="xs:sm md:md" :disabled="!replyText.trim()" @click="submitReply">发布回复</KButton>
                </KSpace>
              </div>
            </div>
          </section>
        </KCard>
      </KCol>

      <KCol :span="{ xs: 24, lg: 7 }">
        <div class="aside">
          <KCard size="md">
            <div class="author-card">
              <span class="avatar avatar--lg" :style="{ background: post.color }">{{ post.author.slice(-1) }}</span>
              <div class="author-card__meta">
                <strong>{{ post.author }}</strong>
                <span>{{ authorRole }}</span>
              </div>
              <KButton
                size="sm"
                :type="authorFollowed ? 'default' : 'primary'"
                @click="authorFollowed = !authorFollowed"
              >{{ authorFollowed ? '已关注' : '关注' }}</KButton>
            </div>
            <p class="aside-text">{{ post.excerpt }}</p>
          </KCard>

          <KCard title="相关问题" size="md">
            <ul class="related">
              <li v-for="topic in hotTopics.slice(0, 4)" :key="topic.title">
                <a href="#" @click.prevent>{{ topic.title }}</a>
                <span>{{ topic.heat }}</span>
              </li>
            </ul>
          </KCard>

          <KCard title="社区公告" size="md">
            <KAlert type="warning" message="理性讨论：就事论事，不攻击个人；引用外部内容请附来源。" />
            <a class="text-link" href="#" @click.prevent="navigate('/')">返回社区首页 →</a>
          </KCard>
        </div>
      </KCol>
    </KRow>
  </div>

  <div v-else class="missing">
    <KEmpty description="这个主题不存在或已被删除" />
    <KButton size="sm" @click="navigate('/')">返回首页</KButton>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import KButton from 'kit/vue/ui/components/Button/Button.vue'
import KCard from 'kit/vue/ui/components/Card/Card.vue'
import KRow from 'kit/vue/ui/components/Grid/Row.vue'
import KCol from 'kit/vue/ui/components/Grid/Col.vue'
import KSpace from 'kit/vue/ui/components/Space/Space.vue'
import KTag from 'kit/vue/ui/components/Tag/Tag.vue'
import KDivider from 'kit/vue/ui/components/Divider/Divider.vue'
import KEmpty from 'kit/vue/ui/components/Empty/Empty.vue'
import KAlert from 'kit/vue/ui/components/Alert/Alert.vue'
import KInput from 'kit/vue/ui/components/Input/Input.vue'
import { useResponsiveValue } from 'kit/vue/ui'
import { comments, currentUser, findPost, formatNum, hotTopics, members, type Comment } from '../data'
import { navigate } from '../router'

const props = defineProps<{ postId: number }>()

const titleSize = useResponsiveValue<string>(() => 'xs:20px sm:22px md:24px lg:28px')
const post = computed(() => findPost(props.postId))
const body = computed(() => post.value?.body ?? (post.value ? [post.value.excerpt] : []))
const commentList = computed(() => comments.value.filter(comment => comment.postId === props.postId))
const authorRole = computed(() => members.value.find(member => member.name === post.value?.author)?.role ?? '社区成员')

const authorFollowed = ref(false)
const bookmarked = ref(false)
const replyText = ref('')

watch(() => props.postId, () => {
  authorFollowed.value = false
  bookmarked.value = false
  replyText.value = ''
})

function toggleVote() {
  if (!post.value) return
  post.value.voted = !post.value.voted
  post.value.votes += post.value.voted ? 1 : -1
}

function toggleLike(comment: Comment) {
  comment.liked = !comment.liked
  comment.likes += comment.liked ? 1 : -1
}

function submitReply() {
  if (!post.value || !replyText.value.trim()) return
  comments.value.push({
    id: Math.max(...comments.value.map(comment => comment.id), 0) + 1,
    postId: props.postId,
    author: currentUser.name,
    color: currentUser.color,
    time: '刚刚',
    content: replyText.value.trim(),
    likes: 0,
    liked: false,
  })
  post.value.replies += 1
  replyText.value = ''
}

function share() {
  navigator.clipboard?.writeText(window.location.href).catch(() => {})
}
</script>

<style scoped>
.crumbs {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
  font-size: 13px;
  color: var(--k-color-text-secondary, #666);
}
.crumbs a:hover {
  color: var(--k-color-primary, #1677ff);
}
.crumbs__sep {
  opacity: 0.5;
}
.crumbs__current {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.article {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.article__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.article__title {
  margin: 0;
  line-height: 1.4;
  font-weight: 700;
}
.article__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--k-color-text-secondary, #666);
}
.article__author {
  color: var(--k-color-text, #1f1f1f);
}
.article__dot {
  opacity: 0.6;
}
.article__body {
  font-size: 15px;
  line-height: 1.85;
}
.article__body p {
  margin: 0 0 14px;
}
.article__body p:last-child {
  margin-bottom: 0;
}
.article__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding-top: 4px;
}
.action {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 34px;
  padding: 0 14px;
  border: 1px solid var(--k-color-border, #e5e5e5);
  border-radius: 8px;
  background: var(--k-color-bg-container, #fff);
  color: var(--k-color-text-secondary, #666);
  font-size: 13px;
  cursor: pointer;
  transition: color 0.15s ease, border-color 0.15s ease, background-color 0.15s ease;
}
.action:hover {
  border-color: var(--k-color-primary, #1677ff);
  color: var(--k-color-primary, #1677ff);
}
.action.is-active {
  border-color: var(--k-color-primary, #1677ff);
  background: var(--k-color-primary-bg, #e6f4ff);
  color: var(--k-color-primary, #1677ff);
}
.comments {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.comments__title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}
.comments__title span {
  color: var(--k-color-text-secondary, #666);
  font-weight: 400;
}
.comment-list {
  display: flex;
  flex-direction: column;
}
.comment {
  display: flex;
  gap: 12px;
  padding: 12px 0;
}
.comment__body {
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.comment__head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 8px;
  font-size: 13px;
}
.comment__time,
.comment__floor {
  font-size: 12px;
  color: var(--k-color-text-secondary, #666);
}
.comment__content {
  margin: 0;
  font-size: 14px;
}
.comment__like {
  align-self: flex-start;
  border: 0;
  padding: 2px 6px;
  border-radius: 6px;
  background: none;
  color: var(--k-color-text-secondary, #666);
  font-size: 12px;
  cursor: pointer;
}
.comment__like:hover,
.comment__like.is-active {
  background: var(--k-color-fill, #f2f3f5);
  color: var(--k-color-primary, #1677ff);
}
.reply {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 4px;
}
.reply__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
.reply__hint {
  font-size: 12px;
  color: var(--k-color-text-secondary, #666);
}
.aside {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.author-card {
  display: flex;
  align-items: center;
  gap: 10px;
}
.author-card__meta {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  line-height: 1.35;
}
.author-card__meta strong {
  font-size: 14px;
}
.author-card__meta span {
  font-size: 12px;
  color: var(--k-color-text-secondary, #666);
}
.aside-text {
  margin: 12px 0 0;
  font-size: 13px;
  color: var(--k-color-text-secondary, #666);
}
.related {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.related li {
  display: flex;
  align-items: baseline;
  gap: 10px;
  font-size: 13px;
}
.related a {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.related a:hover {
  color: var(--k-color-primary, #1677ff);
}
.related span {
  font-size: 12px;
  color: var(--k-color-text-secondary, #666);
}
.text-link {
  display: inline-block;
  margin-top: 10px;
  font-size: 13px;
  color: var(--k-color-primary, #1677ff);
}
.missing {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 48px 0;
}
@media (min-width: 992px) {
  .aside {
    position: sticky;
    top: 84px;
  }
}
</style>