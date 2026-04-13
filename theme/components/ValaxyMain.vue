<script lang="ts" setup>
import type { PageData, Post } from 'valaxy'
import { scrollTo, useSiteConfig } from 'valaxy'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { setupNovaMarkdownLinks } from '../utils/markdown-links'

defineProps<{
  frontmatter: Post
  data?: PageData
}>()

const siteConfig = useSiteConfig()
const route = useRoute()
const router = useRouter()

onMounted(() => {
  setupNovaMarkdownLinks(router)
  if (route.hash) {
    setTimeout(() => {
      scrollTo(document.body, route.hash, {
        smooth: true,
        targetPadding: -64,
      })
    }, 0)
  }
})
</script>

<template>
  <main class="nova-main" w="full" min-w-0 p="b-16 xl:b-20">
    <slot name="main">
      <div class="nova-container" w="full">
        <div class="content" flex="~ col" w="full">
          <slot name="main-header" />
          <slot name="main-header-after" />

          <slot name="main-content">
            <ValaxyMd class="min-w-0" :frontmatter="frontmatter">
              <div class="max-w-none prose">
                <slot name="main-content-md" />
              </div>
              <slot />
            </ValaxyMd>
            <slot name="main-content-after" />
          </slot>
        </div>

        <slot name="main-nav-before" />

        <slot name="main-nav" />

        <slot name="main-nav-after" />

        <slot v-if="siteConfig.comment.enable && frontmatter.comment !== false" name="comment" />

        <slot name="footer" />
      </div>
    </slot>
  </main>
</template>
