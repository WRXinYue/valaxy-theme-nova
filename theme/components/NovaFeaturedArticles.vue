<script setup lang="ts">
import type { FmLocaleString } from '../composables'
import { useFrontmatter } from 'valaxy'
import { ref } from 'vue'
import { useFmLocaleString, useHomeSectionReveal } from '../composables'

const fm = useFrontmatter<{ featuredArticles: FeaturedArticles }>()
const { fmT } = useFmLocaleString()
const sectionRef = ref<HTMLElement | null>(null)
const { isRevealed } = useHomeSectionReveal(sectionRef)

export type FeaturedArticles = Partial<{
  title: FmLocaleString
  subtitle: FmLocaleString
  description: FmLocaleString
  text: FmLocaleString

  articles: Partial<{
    title: FmLocaleString
    cover: string
    tags: FmLocaleString[]
    excerpt: FmLocaleString
    path: string
  }[]>
}>
</script>

<template>
  <section
    v-if="fm?.featuredArticles"
    ref="sectionRef"
    p="y-80px"
    class="nova-section nova-featured-articles nova-home-below-hero"
    :class="{ 'nova-home-below-hero--in-view': isRevealed }"
    style="--nova-home-section-i: 0"
  >
    <div class="nova-home-container">
      <h3 class="subtitle">
        {{ fmT(fm.featuredArticles?.subtitle) }}
      </h3>

      <h2 class="title">
        <span>{{ fmT(fm.featuredArticles?.title) }}</span>
      </h2>

      <div class="description">
        <p>
          {{ fmT(fm.featuredArticles?.description) }}
        </p>
      </div>

      <ul m="t-64px <lg:mt-56px" class="featured-articles-grid nova-home-below-hero__block">
        <li
          v-for="(article, index) in fm.featuredArticles?.articles" :key="index"
          p="1.5px"
          h="full min-h-0"
          class="featured-article-item nova-home-card-conic-shell relative"
          style="--nova-home-card-br: 20px"
        >
          <AppLink
            :to="article?.path"
            class="section-list-item-card nova-home-card-hover relative block overflow-hidden rounded-20px transition-all-400"
            h="full min-h-0"
            w="full"
            flex="~ col"
            :class="[
              {
                'no-cover': !article?.cover,
                'nova-home-card-surface': !article?.cover,
                'hover:shadow-xl': article?.cover,
                'min-h-280px <lg:min-h-240px': article?.cover,
              },
            ]"
          >
            <div v-if="article?.cover" class="card-image-container">
              <img h="full" w="full" class="card-image absolute inset-0 object-cover object-center-bottom" :src="article.cover">
            </div>
            <div
              z="3"
              p="32px <lg:24px"
              class="card-content relative min-h-0"
              flex="~ col flex-1 gap-4"
            >
              <h2 class="card-title shrink-0" :class="[{ 'text-[hsla(0,0%,100%,1)] dark:text-[hsla(240,2%,12%,1)]': article?.cover, 'text-[hsla(240,2%,12%,1)] dark:text-[hsla(0,0%,100%,1)]': !article?.cover }]">
                {{ fmT(article?.title) }}
              </h2>
              <p
                m="b-28px"
                class="card-excerpt max-w-93% min-h-0 flex-1 whitespace-pre-wrap"
                :class="[
                  { 'text-[hsla(0,0%,100%,0.92)] dark:text-[hsla(0,0%,0%,0.92)]': article?.cover, 'text-[hsla(0,0%,0%,0.92)] dark:text-[hsla(0,0%,100%,0.92)]': !article?.cover },
                ]"
              >
                {{ fmT(article?.excerpt) }}
              </p>
              <ul v-if="article?.tags" p="t-20px" m="x--2px mt-auto" class="card-tags shrink-0 border-t" :class="[{ 'border-[hsla(0,0%,100%,0.15)] dark:border-[hsla(0,0%,0%,0.15)]': article?.cover, 'border-[hsla(0,0%,0%,0.08)] dark:border-[hsla(0,0%,100%,0.08)]': !article?.cover }]" flex="~ wrap">
                <li v-for="(tag, i) in article.tags" :key="i" p="[3px_16px_4px]" class="rounded-full" :class="[{ 'bg-[hsla(0,0%,100%,0.2)] text-[hsla(0,0%,100%,1)] dark:bg-[hsla(0,0%,0%,0.2)] dark:text-[hsla(240,4%,96%,1)]': article?.cover, 'bg-[hsla(0,0%,0%,0.05)] text-[hsla(240,2%,12%,1)] dark:bg-[hsla(0,0%,100%,0.1)] dark:text-[hsla(240,4%,96%,1)]': !article?.cover }]" m="2px">
                  {{ fmT(tag) }}
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
.nova-featured-articles {
  .subtitle {
    font-size: 1.125rem;
    font-weight: 500;
    letter-spacing: -0.01em;
    color: var(--va-c-primary);
    margin-bottom: 0.75rem;
  }

  .title {
    font-size: 2.75rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.1;
    color: var(--nova-c-text-deep);

    @media (max-width: 768px) {
      font-size: 2.25rem;
    }
  }

  .description {
    margin-top: 24px;
    max-width: 650px;
    font-size: 1.125rem;
    line-height: 1.5;
    color: var(--nova-c-text-muted);
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
    min-height: 0;
  }

  .section-list-item-card {
    box-shadow: 0 4px 16px hsla(0, 0%, 0%, 0.06);
    transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);

    &:hover {
      box-shadow: 0 8px 24px hsla(0, 0%, 0%, 0.08);

      .card-image {
        transform: scale(1.03);
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
      background: linear-gradient(to bottom, hsla(0, 0%, 0%, 0.05), hsla(0, 0%, 0%, 0.5));
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
