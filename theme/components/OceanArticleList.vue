<script setup lang="ts">
import type { Post } from 'valaxy'
import { usePostList } from 'valaxy'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  type?: string
  posts?: Post[]
  curPage?: number
}>(), {
  curPage: 1,
})

const routes = usePostList({ type: props.type || '' })
const posts = computed(() => props.posts || routes.value)
</script>

<template>
  <div class="article-list">
    <template v-for="post in posts" :key="post.path">
      <Transition name="fade">
        <RouterLink :to="post.path || ''">
          <OceanArticleCard :post="post" />
        </RouterLink>
      </Transition>
    </template>
  </div>
</template>
