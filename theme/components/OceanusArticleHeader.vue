<script setup lang="ts">
import type { PostFrontMatter } from 'valaxy/types'
import { useFrontmatter } from 'valaxy'
import { useI18n } from 'vue-i18n'

const frontmatter = useFrontmatter()
const { locale, t } = useI18n()

function getTitle(post: Partial<PostFrontMatter>) {
  const lang = locale.value
  const localeTitle = post[`title_${lang}`] || post[`title_${lang.split('-')[0]}`]
  return localeTitle || post.title
}
</script>

<template>
  <header
    class="header-container relative justify-center" flex="~" :class="frontmatter.cover && 'has-cover'"
    :style="`background-image: url(${frontmatter.cover});`"
  >
    <!-- <div class="absolute inset-0" style="background: linear-gradient(180deg, rgba(137, 129, 247, .16), rgba(137, 129, 247, .04) 100%);" /> -->
    <!-- <div class="absolute inset-0 from-black/40 to-black/10 bg-gradient-to-b" /> -->
    <!-- <div class="article-header-hero-bg absolute inset-0" /> -->

    <div class="article-header-hero-content oceanus-container">
      <div v-if="frontmatter.categories" class="eyebrow">
        {{ t(`category.${frontmatter.categories[0]}`) }}
      </div>
      <h1 class="header-title">
        {{ getTitle(frontmatter) }}
      </h1>
      <p class="header-date">
        <!-- <span>更新时间:</span> <OceanusDate class="inline-block" :date="frontmatter.date" /> -->
        <!-- <span>Last Updated:</span> <OceanusDate class="inline-block" :date="frontmatter.updated" /> -->
        <span>更新时间:</span> <OceanusDate class="inline-block" :date="frontmatter.updated" />
      </p>
    </div>
    <div style="width: var(--oceanus-aside-width);" class="<md:hidden" />
  </header>
</template>

<style scoped>
.eyebrow {
  font-size: 1.2352941176rem;
  line-height: 1.1904761905;
  font-weight: 500;
  letter-spacing: 0.011em;
  display: block;
  margin-bottom: 0.8823529412rem;
}
.article-header-hero-content {
  width: 100%;
  /* max-width: 820px; */
  /* margin-left: auto; */
  /* margin-right: auto; */
  /* padding-left: 80px;
  padding-right: 80px; */
  box-sizing: border-box;

  padding-top: 2.3529411765rem;
  padding-bottom: 2.3529411765rem;
  position: relative;
  z-index: 1;

  /* @media only screen and (max-width: 735px) {
    width: 87.5%;
    padding-left: 0;
    padding-right: 0;
  }

  @media only screen and (min-width: 1251px) {
    max-width: 980px;
  }

  @media only screen and (min-width: 1500px) {
    max-width: 1080px;
  } */
}

.header-container {
  min-height: 230px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: background 0.3s ease-in-out;
  color: var(--oceanus-c-text);

  &:is(.has-cover) {
    /* &::before {
      --accent-color: #06c;
      --color-figure-gray-secondary: #6e6e73;

      background: linear-gradient(
        var(--standard-accent-color, var(--accent-color, var(--color-figure-gray-secondary))),
        color-mix(
          in srgb,
          var(--standard-accent-color, var(--accent-color, var(--color-figure-gray-secondary))),
          transparent 100%
        )
      );

      content: '';
      position: absolute;
      inset: 0;
    } */

    &::after {
      background: var(--oceanus-c-bg-design);
      opacity: 0.75;
      position: absolute;
      content: '';
      inset: 0;
    }
  }

  &:not(.has-cover) {
    &::before {
      --accent-color: var(--va-c-primary);
      --color-figure-gray-secondary: #6e6e73;

      background: linear-gradient(
        var(--standard-accent-color, var(--accent-color, var(--color-figure-gray-secondary))),
        color-mix(
          in srgb,
          var(--standard-accent-color, var(--accent-color, var(--color-figure-gray-secondary))),
          transparent 70%
        )
      );

      content: '';
      position: absolute;
      inset: 0;
    }

    &::after {
      background: var(--oceanus-c-bg-design);
      opacity: 0.85;
      position: absolute;
      content: '';
      inset: 0;
    }
  }
}

.header-title {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 0.5rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.header-date {
  font-size: 1rem;
  font-weight: 400;
  opacity: 0.8;
}
</style>
