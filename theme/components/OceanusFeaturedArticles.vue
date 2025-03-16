<script setup lang="ts">
import { useFrontmatter } from 'valaxy'

const fm = useFrontmatter<{ featuredArticles: FeaturedArticles }>()

export type FeaturedArticles = Partial<{
  title: string
  subtitle: string
  description: string
  text: string

  articles: Partial<{
    title: string
    cover: string
    tags: string[]
    excerpt: string
    path: string
  }[]>
}>
</script>

<template>
  <section v-if="fm?.featuredArticles" p="y-80px" class="oceanus-section oceanus-featured-articles">
    <div class="oceanus-home-container">
      <h3 class="subtitle">
        {{ fm.featuredArticles?.subtitle }}
      </h3>

      <h2 class="title">
        <span>{{ fm.featuredArticles?.title }}</span>
      </h2>

      <div class="description">
        <p>
          {{ fm.featuredArticles?.description }}
        </p>
      </div>

      <ul m="t-64px <lg:mt-56px" class="featured-articles-grid">
        <li
          v-for="(article, index) in fm.featuredArticles?.articles" :key="index"
          p="1.5px" h="auto" class="featured-article-item"
        >
          <AppLink
            :to="article?.path"
            class="section-list-item-card relative block overflow-hidden rounded-20px transition-all-400 hover:translate-y--2 hover:shadow-xl"
            :class="[{ 'no-cover': !article?.cover }]"
            h="full"
            w="full"
          >
            <div v-if="article?.cover" class="card-image-container">
              <img h="full" w="full" class="card-image absolute inset-0 object-cover object-center-bottom" :src="article.cover">
            </div>
            <div h="full" z="3" p="32px <lg:24px" class="card-content relative" flex="~ col justify-between">
              <h2 class="card-title" :class="[{ 'text-#fff dark:text-#1d1d1f': article?.cover, 'text-#1d1d1f dark:text-#fff': !article?.cover }]">
                {{ article?.title }}
              </h2>
              <p m="t-150px b-28px" class="card-excerpt max-w-93% whitespace-pre-wrap" :class="[{ 'text-[hsla(0,0%,100%,0.92)] dark:text-[hsla(0,0%,0%,0.92)]': article?.cover, 'text-[hsla(0,0%,0%,0.92)] dark:text-[hsla(0,0%,100%,0.92)]': !article?.cover }]">
                {{ article?.excerpt }}
              </p>
              <ul v-if="article?.tags" p="t-20px" m="x--2px" class="card-tags border-t" :class="[{ 'border-[rgba(255,255,255,0.15)] dark:border-[rgba(0,0,0,0.15)]': article?.cover, 'border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)]': !article?.cover }]" flex="~ wrap">
                <li v-for="(tag, i) in article.tags" :key="i" p="[3px_16px_4px]" class="rounded-full" :class="[{ 'bg-[hsla(0,0%,100%,0.2)] text-#fff dark:bg-[hsla(0,0%,0%,0.2)] dark:text-#f5f5f7': article?.cover, 'bg-[hsla(0,0%,0%,0.05)] text-#1d1d1f dark:bg-[hsla(0,0%,100%,0.1)] dark:text-#f5f5f7': !article?.cover }]" m="2px">
                  {{ tag }}
                </li>
              </ul>
            </div>
          </AppLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.oceanus-featured-articles {
  .subtitle {
    font-size: 1.125rem;
    font-weight: 500;
    letter-spacing: -0.01em;
    color: var(--oceanus-c-brand);
    margin-bottom: 0.75rem;
  }

  .title {
    font-size: 2.75rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.1;
    color: var(--oceanus-c-text-deep);

    @media (max-width: 768px) {
      font-size: 2.25rem;
    }
  }

  .description {
    margin-top: 24px;
    max-width: 650px;
    font-size: 1.125rem;
    line-height: 1.5;
    color: var(--oceanus-c-text-muted);
    font-weight: 400;
    letter-spacing: -0.01em;
  }

  .featured-articles-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 28px;

    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .featured-article-item {
    width: 100%;
  }

  .section-list-item-card {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
    transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);

    &.no-cover {
      background-color: var(--oceanus-c-bg-soft);
      border: 1px solid var(--oceanus-c-divider);
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(
          to bottom right,
          rgba(var(--oceanus-c-brand-rgb), 0.02),
          rgba(var(--oceanus-c-brand-rgb), 0.05),
          rgba(var(--oceanus-c-brand-rgb), 0.02)
        );
        transform: rotate(30deg);
        z-index: 1;
      }

      .card-content {
        z-index: 2;
        background: transparent;
      }
    }

    &:hover {
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);

      .card-image {
        transform: scale(1.03);
      }

      &.no-cover {
        background-color: var(--oceanus-c-bg-soft);
        border-color: var(--oceanus-c-brand-light);
      }
    }
  }

  .card-image-container {
    position: absolute;
    inset: 0;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.5));
      z-index: 2;
    }
  }

  .card-image {
    transition: transform 1.5s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .card-title {
    font-weight: 500;
    font-size: 1.875rem;
    line-height: 1.2;
    letter-spacing: -0.02em;

    @media (max-width: 768px) {
      font-size: 1.625rem;
    }
  }

  .card-excerpt {
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.5;
    letter-spacing: -0.01em;
  }

  .card-tags li {
    font-weight: 450;
    font-size: 0.85rem;
    line-height: 1.25;
    letter-spacing: -0.01em;
    transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);

    &:hover {
      transform: translateY(-1px);
    }
  }
}
</style>
