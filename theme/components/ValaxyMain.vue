<script lang="ts" setup>
import type { PageData, Post } from 'valaxy'
import { useSiteConfig } from 'valaxy'

defineProps<{
  frontmatter: Post
  data?: PageData
}>()

const siteConfig = useSiteConfig()
</script>

<template>
  <main class="oceanus-main" w="full" min-w-0 p="b-16 xl:b-20">
    <slot name="main">
      <div class="oceanus-container" w="full">
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
