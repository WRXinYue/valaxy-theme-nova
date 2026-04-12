<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useMatchingNavItems, useThemeConfig } from '../composables'
import { useNovaAppStore } from '../stores'

const themeConfig = useThemeConfig()
const novaApp = useNovaAppStore()
const route = useRoute()

const routerPath = computed(() => route.path)
const matchingNavItems = useMatchingNavItems(routerPath)
const firstNavItems = computed(() => matchingNavItems.value.firstNavItems)
const secondNavItems = computed(() => matchingNavItems.value.secondNavItems)
const sidebar = computed(() => secondNavItems.value?.sidebar || firstNavItems.value?.sidebar || themeConfig.value.sidebar)
</script>

<template>
  <div class="nova-article nova-safe-padding mx-auto">
    <aside class="article-left-aside" :class="[novaApp.isSideOpen && 'is-open', novaApp.isSideOpen && sidebar.length !== 0 && 'has-aside']">
      <div class="overflow-clip">
        <slot name="sidebar">
          <NovaSidebar :sidebar />
        </slot>
      </div>
    </aside>

    <article class="article-container" flex="~ col" w="full" min-w-0 min-h="[calc(100vh-var(--nova-nav-height))]">
      <NovaArticleHeader />

      <div flex="~" h="full">
        <slot />

        <slot name="toc">
          <div class="toc border-l-1px border-$nova-c-border-line">
            <NovaToc />
          </div>
        </slot>
      </div>
    </article>
  </div>
</template>

<style lang="scss">
@use 'valaxy/client/styles/mixins/index.scss' as *;

.nova-article {
  display: flex;

  .article-container {
    border-right: 1px solid var(--nova-c-divider);
  }

  .article-left-aside {
    position: sticky;
    top: var(--nova-nav-height);
    overflow-y: auto;
    max-height: calc(100vh - var(--nova-nav-height));
    border-left: 1px solid var(--nova-c-divider);
    width: 0;
    min-width: 0;
    visibility: hidden;
    transition:
      width 0.56s cubic-bezier(0.52, 0.16, 0.24, 1),
      visibility 0s linear 1s;

    &.is-open {
      width: var(--nova-aside-width);
      min-width: var(--nova-aside-width);
      visibility: visible;
      transition:
        width 0.56s cubic-bezier(0.52, 0.16, 0.24, 1),
        min-width 0.56s cubic-bezier(0.52, 0.16, 0.24, 1),
        visibility 0s linear 0s;
    }

    &.has-aside {
      border-right: 1px solid var(--nova-c-border-line);
    }
    &:not(.has-aside) {
      width: 0;
    }
  }

  .nova-toc {
    overflow: hidden;
    width: 0;
    visibility: hidden;
    transition:
      width 0.56s cubic-bezier(0.52, 0.16, 0.24, 1),
      visibility 0s linear 1s;

    @include screen('xl') {
      overflow-y: auto;
      visibility: visible;
      width: var(--nova-aside-width);
      transition:
        width 0.56s cubic-bezier(0.52, 0.16, 0.24, 1),
        visibility 0s linear 0s;
    }
  }
}
</style>
