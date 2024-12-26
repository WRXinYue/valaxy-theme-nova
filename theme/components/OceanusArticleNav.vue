<script setup lang="ts">
import type { PostFrontMatter } from 'valaxy/types'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { usePostList, useSplitPathSegments } from '../composables'

const route = useRoute()
const { locale } = useI18n()

const routerPath = computed(() => route.path)

const pathSegments = useSplitPathSegments(routerPath)

const currentPath = computed(() => pathSegments.value[0])

const posts = usePostList({ path: currentPath })

function findCurrentIndex() {
  return posts.value.findIndex(p => p.path === route.path)
}

const prevPost = computed(() => posts.value[findCurrentIndex() + 1])
const nextPost = computed(() => posts.value[findCurrentIndex() - 1])

function getTitle(post: Partial<PostFrontMatter>) {
  const lang = locale.value
  const localeTitle = post[`title_${lang}`] || post[`title_${lang.split('-')[0]}`]
  return localeTitle || post.title
}
</script>

<template>
  <footer>
    <nav class="prev-next">
      <span class="oceanus-visually-hidden">Pager</span>
      <div class="pager">
        <RouterLink v-if="prevPost?.path" :to="prevPost.path" class="link pager-link prev">
          <span class="desc">上一页</span>
          <span class="title">{{ getTitle(prevPost) }}</span>
        </RouterLink>
      </div>
      <div class="pager">
        <RouterLink v-if="nextPost?.path" :to="nextPost.path" class="link pager-link next">
          <span class="desc">下一页</span>
          <span class="title">{{ getTitle(nextPost) }}</span>
        </RouterLink>
      </div>
    </nav>
  </footer>
</template>

<style lang="scss" scoped>
.prev-next {
  border-top: 1px solid var(--oceanus-c-divider);
  padding-top: 24px;
  display: grid;
  grid-row-gap: 8px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 16px;
  }
}

.pager-link {
  display: block;
  border: 1px solid var(--oceanus-c-divider);
  border-radius: 8px;
  padding: 11px 16px 13px;
  width: 100%;
  height: 100%;
  transition: border-color 0.36s cubic-bezier(0.32, 0.08, 0.24, 1);

  &:hover {
    border-color: var(--va-c-primary);
  }
}

.desc {
  display: block;
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.title {
  display: block;
  line-height: 20px;
  font-size: 14px;
  font-weight: 500;
  color: var(--va-c-primary);
  transition: color 0.25s;
}

:where([dir='ltr']) .pager-link.next {
  margin-left: auto;
  text-align: right;
}

:where([dir='rtl']) .pager-link.next {
  margin-right: auto;
  text-align: left;
}
</style>
