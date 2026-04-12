<script setup lang="ts">
import { useAppStore, useSiteConfig } from 'valaxy'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useMatchingNavItems, useThemeConfig } from '../composables'

const themeConfig = useThemeConfig()
const siteConfig = useSiteConfig()
const route = useRoute()
const appStore = useAppStore()

const routePath = computed(() => route.path)

const matchingNavItems = useMatchingNavItems(routePath)

const { logo, nav, navTitle } = themeConfig.value
const currentNavItem = computed(() => matchingNavItems.value.firstNavItems)

const showNavPlaceholder = computed(() => themeConfig.value.navPlaceholder !== false)

const navLogo = computed(() => {
  if (typeof logo === 'boolean')
    return logo === true ? siteConfig.value.favicon : ''
  else if (typeof logo === 'string')
    return logo
  else if (typeof logo === 'object')
    return appStore.isDark ? logo.dark : logo.light

  console.error('Invalid favicon type, check ThemeConfig.header.favicon config')
  return ''
})
</script>

<template>
  <!-- <NovaNavBanner /> -->
  <!-- <NovaNavToolbar /> -->
  <NovaNav :nav="nav" :favicon="navLogo" :title="navTitle" :class="!currentNavItem?.subNav && 'fixed'" />
  <div
    v-if="showNavPlaceholder"
    :style="{ marginTop: currentNavItem?.subNav ? 0 : 'var(--nova-nav-height)' }"
    class="nav-placeholder"
  />
  <NovaSubNav v-if="currentNavItem?.subNav" :title="currentNavItem?.text" :sub-nav="currentNavItem?.subNav" :class="currentNavItem?.subNav && 'sticky'" />
</template>
