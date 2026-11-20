<template>
  <div class="home">
    <section class="hero">
      <div class="hero__content">
        <KTag color="primary" variant="filled" round>开发者社区</KTag>
        <h1 class="hero__title" :style="{ fontSize: heroTitleSize }">
          和 3,206 位伙伴一起，<br class="hero__br" />把复杂的事聊简单。
        </h1>
        <p class="hero__desc">
          Vue、组件库、Discuz
          迁移与小程序实践。提问、分享、共建，好的讨论值得被看见。
        </p>
        <KSpace size="xs:sm md:md" wrap>
          <KButton
            type="primary"
            size="xs:md lg:lg"
            @click="navigate('/publish')"
            >发布主题</KButton
          >
          <KButton size="xs:md lg:lg" @click="scrollToFeed">浏览板块</KButton>
        </KSpace>
      </div>
      <div class="hero__stats">
        <KRow gutter="xs:8,8 sm:12,12 md:16,12">
          <KCol
            v-for="item in stats"
            :key="item.label"
            :span="{ xs: 12, md: 6 }"
          >
            <div class="stat">
              <strong :style="{ fontSize: statSize }">{{ item.value }}</strong>
              <span>{{ item.label }}</span>
            </div>
          </KCol>
        </KRow>
      </div>
    </section>

    <KRow ref="feedRow" class="content" gutter="xs:0 sm:12 md:16,20 lg:24,24">
      <KCol :span="{ xs: 24, lg: 17 }">
        <KCard :bordered="true">
          <template #header>
            <div class="feed-head">
              <KControlGroup>
                <KButton
                  v-for="item in tabs"
                  :key="item.key"
                  :type="tab === item.key ? 'primary' : 'default'"
                  size="xs:sm md:md"
                  @click="tab = item.key"
                  >{{ item.label }}</KButton
                >
              </KControlGroup>
              <KSelect
                v-model="sort"
                size="sm"
                :options="sortOptions"
                :styles="{ root: { width: '128px', flex: 'none' } }"
              />
            </div>
          </template>

          <div v-if="activeTag || searchQuery" class="filter-bar">
            <span>筛选：</span>
            <KTag
              v-if="activeTag"
              color="primary"
              closable
              @close="activeTag = ''"
              >{{ activeTag }}</KTag
            >
            <KTag v-if="searchQuery" closable @close="searchQuery = ''"
              >“{{ searchQuery }}”</KTag
            >
            <button class="text-btn" type="button" @click="clearFilters">
              清空
            </button>
          </div>

          <div v-if="paged.length" class="posts">
            <template v-for="(post, index) in paged" :key="post.id">
              <KDivider v-if="index > 0" />
              <article class="post">
                <button
                  v-if="!isMobile"
                  type="button"
                  class="vote"
                  :class="{ 'is-voted': post.voted }"
                  :aria-pressed="post.voted"
                  :aria-label="`赞同 ${post.votes}`"
                  @click="toggleVote(post)"
                >
                  <span class="vote__arrow" aria-hidden="true">▲</span>
                  <span class="vote__count">{{ post.votes }}</span>
                </button>

                <div class="post__body">
                  <div class="post__title-row">
                    <KTag v-if="post.pinned" color="error" size="sm">置顶</KTag>
                    <KTag v-else-if="post.featured" color="warning" size="sm"
                      >精华</KTag
                    >
                    <h3 class="post__title">
                      <a
                        :href="`#/post/${post.id}`"
                        @click.prevent="navigate(`/post/${post.id}`)"
                        >{{ post.title }}</a
                      >
                    </h3>
                    <KTag
                      v-if="post.solved"
                      color="success"
                      size="sm"
                      variant="outlined"
                      >已解决</KTag
                    >
                  </div>
                  <p class="post__excerpt">{{ post.excerpt }}</p>

                  <div class="post__meta">
                    <span
                      class="avatar avatar--sm"
                      :style="{ background: post.color }"
                      >{{ post.author.slice(-1) }}</span
                    >
                    <span class="post__author">{{ post.author }}</span>
                    <span class="post__dot">·</span>
                    <span>{{ post.time }}</span>
                    <span class="post__spacer" />
                    <span class="post__tags">
                      <KTag
                        v-for="tag in post.tags"
                        :key="tag.label"
                        :color="tag.color"
                        size="sm"
                        variant="borderless"
                        clickable
                        @click="activeTag = tag.label"
                        >{{ tag.label }}</KTag
                      >
                    </span>
                    <span class="post__count"
                      >{{ formatNum(post.replies) }} 回复</span
                    >
                    <span class="post__count"
                      >{{ formatNum(post.views) }} 浏览</span
                    >
                  </div>
                </div>
              </article>
            </template>
          </div>

          <div v-else class="feed-empty">
            <KEmpty description="没有匹配的主题，换个关键词或清空筛选试试" />
            <KButton size="sm" @click="clearFilters">清空筛选</KButton>
          </div>

          <template #footer>
            <div class="feed-foot">
              <span class="feed-foot__total"
                >共 {{ filtered.length }} 个主题</span
              >
              <KPagination
                v-model:current="page"
                :total="filtered.length"
                :page-size="pageSize"
                size="sm"
                hide-on-single-page
              />
            </div>
          </template>
        </KCard>
      </KCol>

      <KCol :span="{ xs: 24, lg: 7 }">
        <div class="aside">
          <KCard title="社区公告" size="md">
            <KAlert
              type="info"
              message="本周六 20:00 组件库线上答疑，欢迎带着问题来。"
            />
            <p class="aside-text">
              发帖前请先搜索；求助帖附最小复现，能更快得到回复。
            </p>
            <a class="text-link" href="#" @click.prevent>查看社区准则 →</a>
          </KCard>

          <KCard title="热门话题" size="md">
            <ol class="rank-list">
              <li v-for="(topic, index) in hotTopics" :key="topic.title">
                <span class="rank" :class="{ 'rank--top': index < 3 }">{{
                  index + 1
                }}</span>
                <a href="#" class="rank__title" @click.prevent>{{
                  topic.title
                }}</a>
                <span class="rank__heat">{{ topic.heat }}</span>
              </li>
            </ol>
          </KCard>

          <KCard title="活跃成员" size="md">
            <ul class="member-list">
              <li v-for="member in members" :key="member.name">
                <span class="avatar" :style="{ background: member.color }">{{
                  member.name.slice(-1)
                }}</span>
                <span class="member__meta">
                  <strong>{{ member.name }}</strong>
                  <span>{{ member.role }}</span>
                </span>
                <KButton
                  size="sm"
                  :type="member.followed ? 'default' : 'primary'"
                  @click="member.followed = !member.followed"
                  >{{ member.followed ? "已关注" : "关注" }}</KButton
                >
              </li>
            </ul>
          </KCard>

          <KCard title="热门标签" size="md">
            <div class="tag-cloud">
              <KTag
                v-for="tag in tagCloud"
                :key="tag.label"
                :color="tag.color"
                :variant="activeTag === tag.label ? 'filled' : 'outlined'"
                clickable
                @click="activeTag = activeTag === tag.label ? '' : tag.label"
                >{{ tag.label }}</KTag
              >
            </div>
          </KCard>
        </div>
      </KCol>
    </KRow>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import KButton from "kit/vue/ui/components/Button/Button.vue";
import KControlGroup from "kit/vue/ui/components/ControlGroup/ControlGroup.vue";
import KSelect from "kit/vue/ui/components/Select/Select.vue";
import KCard from "kit/vue/ui/components/Card/Card.vue";
import KRow from "kit/vue/ui/components/Grid/Row.vue";
import KCol from "kit/vue/ui/components/Grid/Col.vue";
import KSpace from "kit/vue/ui/components/Space/Space.vue";
import KTag from "kit/vue/ui/components/Tag/Tag.vue";
import KDivider from "kit/vue/ui/components/Divider/Divider.vue";
import KEmpty from "kit/vue/ui/components/Empty/Empty.vue";
import KAlert from "kit/vue/ui/components/Alert/Alert.vue";
import KPagination from "kit/vue/ui/components/Pagination/Pagination.vue";
import { getSharedBreakpoint, useResponsiveValue } from "kit/vue/ui";
import {
  formatNum,
  hotTopics,
  members,
  posts,
  searchQuery,
  stats,
  tagCloud,
  type Post,
} from "../data";
import { navigate } from "../router";

const { isMobile } = getSharedBreakpoint();
const heroTitleSize = useResponsiveValue<string>(
  () => "xs:22px sm:26px md:30px lg:34px",
);
const statSize = useResponsiveValue<string>(() => "xs:18px md:22px lg:26px");

const tabs = [
  { key: "latest", label: "最新" },
  { key: "hot", label: "热门" },
  { key: "featured", label: "精华" },
  { key: "following", label: "关注" },
];
const tab = ref("latest");
const sort = ref("recent");
const sortOptions = [
  { label: "最近回复", value: "recent" },
  { label: "最新发布", value: "new" },
  { label: "最多浏览", value: "views" },
];
const activeTag = ref("");
const page = ref(1);
const pageSize = 5;
const feedRow = ref<InstanceType<typeof KRow> | null>(null);

const filtered = computed(() => {
  let list = posts.value;
  if (tab.value === "featured") list = list.filter((post) => post.featured);
  if (tab.value === "following") list = list.filter((post) => post.following);
  if (activeTag.value)
    list = list.filter((post) =>
      post.tags.some((tag) => tag.label === activeTag.value),
    );
  const keyword = searchQuery.value.trim().toLowerCase();
  if (keyword) {
    list = list.filter((post) =>
      [
        post.title,
        post.excerpt,
        post.author,
        ...post.tags.map((tag) => tag.label),
      ].some((text) => text.toLowerCase().includes(keyword)),
    );
  }
  if (sort.value === "new") list = [...list].sort((a, b) => b.id - a.id);
  if (sort.value === "views")
    list = [...list].sort((a, b) => b.views - a.views);
  if (sort.value === "recent" && tab.value === "hot")
    list = [...list].sort((a, b) => b.votes - a.votes);
  return list;
});

const paged = computed(() =>
  filtered.value.slice((page.value - 1) * pageSize, page.value * pageSize),
);

watch([tab, sort, searchQuery, activeTag], () => {
  page.value = 1;
});

function toggleVote(post: Post) {
  post.voted = !post.voted;
  post.votes += post.voted ? 1 : -1;
}

function clearFilters() {
  activeTag.value = "";
  searchQuery.value = "";
  tab.value = "latest";
  sort.value = "recent";
}

function scrollToFeed() {
  feedRow.value?.$el?.scrollIntoView({ behavior: "smooth", block: "start" });
}
</script>

<style scoped>
.hero {
  display: grid;
  gap: 20px;
  padding: 32px 28px;
  border: 1px solid var(--k-color-border, #e5e5e5);
  border-radius: 16px;
  background:
    radial-gradient(
      1200px 240px at 0% 0%,
      var(--k-color-primary-bg, #e6f4ff),
      transparent 70%
    ),
    var(--k-color-bg-container, #fff);
}
.hero__content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
}
.hero__title {
  margin: 4px 0 0;
  line-height: 1.3;
  font-weight: 700;
  letter-spacing: -0.01em;
}
.hero__desc {
  margin: 0;
  max-width: 560px;
  color: var(--k-color-text-secondary, #666);
}
.hero__stats {
  border-top: 1px dashed var(--k-color-border, #e5e5e5);
  padding-top: 16px;
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
.content {
  margin-top: 20px;
  scroll-margin-top: 84px;
}
.feed-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin: 4px 0 12px;
  font-size: 13px;
  color: var(--k-color-text-secondary, #666);
}
.posts {
  display: flex;
  flex-direction: column;
}
.post {
  display: flex;
  gap: 14px;
  padding: 14px 0;
}
.vote {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  flex: 0 0 46px;
  height: 58px;
  border: 1px solid var(--k-color-border, #e5e5e5);
  border-radius: 10px;
  background: var(--k-color-bg-container, #fff);
  color: var(--k-color-text-secondary, #666);
  cursor: pointer;
  transition:
    border-color 0.15s ease,
    color 0.15s ease,
    background-color 0.15s ease;
}
.vote:hover {
  border-color: var(--k-color-primary, #1677ff);
  color: var(--k-color-primary, #1677ff);
}
.vote.is-voted {
  border-color: var(--k-color-primary, #1677ff);
  background: var(--k-color-primary-bg, #e6f4ff);
  color: var(--k-color-primary, #1677ff);
}
.vote__arrow {
  font-size: 12px;
  line-height: 1;
}
.vote__count {
  font-size: 13px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.post__body {
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.post__title-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}
.post__title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.45;
}
.post__title:hover {
  color: var(--k-color-primary, #1677ff);
}
.post__excerpt {
  margin: 0;
  color: var(--k-color-text-secondary, #666);
  font-size: 13px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.post__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
  font-size: 12px;
  color: var(--k-color-text-secondary, #666);
}
.post__author {
  color: var(--k-color-text, #1f1f1f);
}
.post__dot {
  opacity: 0.6;
}
.post__spacer {
  flex: 1;
}
.post__tags {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 6px;
}
.post__count {
  font-variant-numeric: tabular-nums;
}
.feed-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 24px 0;
}
.feed-foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
}
.feed-foot__total {
  font-size: 12px;
  color: var(--k-color-text-secondary, #666);
}
.aside {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.aside-text {
  margin: 12px 0 8px;
  font-size: 13px;
  color: var(--k-color-text-secondary, #666);
}
.text-link {
  font-size: 13px;
  color: var(--k-color-primary, #1677ff);
}
.rank-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.rank-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
}
.rank {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 6px;
  background: var(--k-color-fill, #f2f3f5);
  color: var(--k-color-text-secondary, #666);
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
}
.rank--top {
  background: var(--k-color-primary-bg, #e6f4ff);
  color: var(--k-color-primary, #1677ff);
}
.rank__title {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.rank__title:hover {
  color: var(--k-color-primary, #1677ff);
}
.rank__heat {
  font-size: 12px;
  color: var(--k-color-text-secondary, #666);
  font-variant-numeric: tabular-nums;
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
.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
@media (min-width: 576px) {
  .hero {
    padding: 36px 32px;
  }
}
@media (min-width: 768px) {
  .hero {
    grid-template-columns: minmax(0, 1.4fr) minmax(280px, 1fr);
    align-items: center;
  }
  .hero__stats {
    border-top: 0;
    padding-top: 0;
  }
}
@media (min-width: 992px) {
  .aside {
    position: sticky;
    top: 84px;
  }
  .post__title {
    font-size: 17px;
  }
}
@media (max-width: 767px) {
  .hero__br {
    display: none;
  }
}
</style>
