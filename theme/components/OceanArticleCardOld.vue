<script lang="ts" setup>
import type { Post } from 'valaxy'

defineProps<{
  post: Post
}>()
</script>

<template>
  <article class="max-h-40 flex justify-between overflow-hidden">
    <div class="mr-10 w-full flex flex-col">
      <div class="flex items-center">
        <img
          class="mr-5 inline-block rounded-full"
          style="width: 30px; height: 30px"
          alt="logo"
          src="/avatar.jpg"
        >
        <span class="mr-5">
          WRXinYue
        </span>
        <span class="mx-2 text-base text-gray-500 font-medium leading-6">·</span>
        <OceanDate :date="post.date" />
      </div>
      <div class="h-full flex flex-col justify-between space-y-1">
        <RouterLink class="oceanus-text" :to="post.path || ''">
          <h2 class="text-xl font-bold leading-8 tracking-tight">
            {{ post.title }}
          </h2>
          <div
            v-if="post.excerpt"
            class="line-clamp-2 max-w-none text-sm text-gray-500 tracking-wide prose"
            v-html="post.excerpt"
          />
        </RouterLink>
        <div class="flex justify-between pb-2 text-sm font-medium">
          <div>
            <span class="rounded-xl bg-gray-200 p-2">
              {{ post.categories }}
            </span>
            <span>
              3 min read
            </span>
            <span>
              Selected for you
            </span>
          </div>
          <div>
            <span class="mr-3 inline-block" i-tabler-bookmark-plus />
            <span class="inline-block" i-tabler-dots />
          </div>
        </div>
      </div>
    </div>
    <img
      class="flex-none object-cover"
      style="max-width: 100%; max-height: 100%;"
      alt="logo"
      src="/avatar.jpg"
    >
  </article>
</template>
