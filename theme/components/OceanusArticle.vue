<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useMatchingNavItems, useThemeConfig } from '../composables'
import { useOceanusAppStore } from '../stores'

const themeConfig = useThemeConfig()
const oceanusApp = useOceanusAppStore()
const route = useRoute()

const routerPath = computed(() => route.path)
const matchingNavItems = useMatchingNavItems(routerPath)
const firstNavItems = computed(() => matchingNavItems.value.firstNavItems)
const secondNavItems = computed(() => matchingNavItems.value.secondNavItems)
const sidebar = computed(() => secondNavItems.value?.sidebar || firstNavItems.value?.sidebar || themeConfig.value.sidebar)
</script>

<template>
  <div class="oceanus-article oceanus-safe-padding mx-auto">
    <aside class="article-left-aside" :class="[oceanusApp.isSideOpen && 'is-open', oceanusApp.isSideOpen && sidebar.length !== 0 && 'has-aside']">
      <slot name="sidebar">
        <OceanusSidebar :sidebar />
      </slot>
    </aside>

    <article class="article-container" flex="~ col" w="full" min-w-0 min-h="[calc(100vh-var(--oceanus-nav-height))]">
      <OceanusArticleHeader />

      <div flex="~" h="full">
        <slot />

        <slot name="toc">
          <div class="border-l-1px border-$oceanus-c-border-line">
            <OceanusToc />
          </div>
        </slot>
      </div>
    </article>
  </div>
</template>

<style lang="scss">
@use 'valaxy/client/styles/mixins/index.scss' as *;

.oceanus-article {
  // grid-template-columns: 0 1fr;
  // display: grid;
  // grid-template-rows: 1fr;
  display: flex;

  .article-container {
    border-right: 1px solid rgba(0, 0, 0, 0.04);
  }

  .article-left-aside {
    border-left: 1px solid rgba(0, 0, 0, 0.04);
    width: 0;
    visibility: hidden;
    // overflow: hidden;
    // contain: paint;
    overflow: clip;
    transition:
      width 0.56s cubic-bezier(0.52, 0.16, 0.24, 1),
      visibility 0s linear 1s;

    &.is-open {
      width: var(--oceanus-aside-width);
      visibility: visible;
      transition:
        width 0.56s cubic-bezier(0.52, 0.16, 0.24, 1),
        visibility 0s linear 0s;
    }

    &.has-aside {
      border-right: 1px solid var(--oceanus-c-border-line);
    }
    &:not(.has-aside) {
      width: 0;
    }
  }

  .oceanus-toc {
    overflow: hidden;
    width: 0;
    visibility: hidden;
    transition:
      width 0.56s cubic-bezier(0.52, 0.16, 0.24, 1),
      visibility 0s linear 1s;

    @include screen('xl') {
      overflow-y: auto;
      visibility: visible;
      width: var(--oceanus-aside-width);
      transition:
        width 0.56s cubic-bezier(0.52, 0.16, 0.24, 1),
        visibility 0s linear 0s;
    }
  }
}
</style>
