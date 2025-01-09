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
    tags: string
    excerpt: string
  }[]>
}>
</script>

<template>
  <section v-if="fm?.featuredArticles" p="y-60px" class="oceanus-section oceanus-featured-articles">
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

      <ul m="t-50px <lg:mt-40px" flex="~ <lg:wrap">
        <li
          v-for="(article, index) in fm.featuredArticles?.articles" :key="index"
          p="1.5px" h="auto" class="<lg:basis-50% <md:basis-full" flex="[0_0_33%]"
        >
          <a class="section-list-item-card relative block overflow-hidden rounded-7px transition-all-400 hover:translate-y--2 hover:shadow-xl" h="full" w="max-full">
            <img h="full" w="full" class="absolute inset-0 animate-keyframes-fade-out-up-big object-cover object-center-bottom" :src="article?.cover">
            <div h="full" z="3" p="25px <lg:15px" class="relative" flex="~ col justify-between">
              <h2 class="text-#fff dark:text-#1d1d1f" style="font: 500 44px / 1.2 var(--oceanus-font)">
                {{ article?.title }}
              </h2>
              <p m="t-150px b-20px" class="max-w-93% whitespace-pre-wrap text-[hsla(0,0%,100%,0.85)] dark:text-[hsla(0,0%,0%,0.85)]" style="font: 400 16px / 1.2 var(--oceanus-font);">{{ article?.excerpt }}</p>
              <ul v-if="article?.tags" p="t-20px" m="x--2px" class="border-t border-#fff dark:border-#000" flex="~ wrap">
                <li v-for="(tag, i) in article.tags" :key="i" p="[2px_14.5px_3px]" class="rounded-40px bg-[hsla(0,0%,100%,0.4)] text-#fff dark:bg-[hsla(0,0%,0%,0.4)] dark:text-#1d1d1f" m="2px" style="font: 500 14px / 1.25 var(--oceanus-font);">
                  {{ tag }}
                </li>
              </ul>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.oceanus-featured-articles {
  .description {
    margin-top: 23px;
  }
}
</style>
