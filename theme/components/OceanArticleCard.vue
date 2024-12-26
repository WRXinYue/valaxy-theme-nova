<script lang="ts" setup>
import type { Post } from 'valaxy'

defineProps<{
  post: Post
}>()
</script>

<template>
  <article class="article-card md:flex" flex="~ <md:col" :class="{ 'dark-mode': post.mode === 'dark' }">
    <div class="article-card-content" w="md:31%" h="full">
      <div class="article-card-title">
        {{ post.subtitle }}
      </div>
      <div class="article-card-excerpt">
        {{ post.content }}
      </div>
    </div>
    <div class="article-card-img" w="md:69%" h="full">
      <img v-if="post.cover" :src="post.cover[0]" :alt="post.cover[0]">
    </div>
  </article>
</template>

<style lang="scss" scoped>
.article-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 501px;
  text-decoration: none;
  color: black;
  background-color: #fff;
  transition: background-color 400ms cubic-bezier(0.4, 0, 0.25, 1);
  // margin: 1em 0;
  overflow: hidden;

  &:hover {
    background: #f5f5f5;
  }

  .article-card-title {
    font-size: 18px;
    font-weight: 700;
    line-height: 21.48px;
  }

  .article-card-excerpt {
    color: inherit;
    font-size: 14px;
    font-weight: 400;
    line-height: 19.09px;
    margin-top: 10px;
  }

  .article-card-content {
    padding-left: 9.3%;
    padding-top: 10vw;
    padding-bottom: 10vw;
  }

  .article-card-img {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: brightness(1);
      transition:
        transform 400ms cubic-bezier(0.4, 0, 0.25, 1),
        filter 400ms cubic-bezier(0.4, 0, 0.25, 1);

      &:hover {
        transform: scale(1.03);
        filter: brightness(0.85);
      }
    }
  }

  &.dark-mode {
    color: #fff;
    background-color: #000;

    &:hover {
      background: #201f1e;
    }
  }
}
</style>
