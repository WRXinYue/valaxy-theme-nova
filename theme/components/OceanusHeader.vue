<script setup lang="ts">
import { useAppStore, useSiteConfig } from 'valaxy'
import { computed, toValue } from 'vue'
import { useRoute } from 'vue-router'
import { useMatchingNavItems, useThemeConfig } from '../composables'

const themeConfig = useThemeConfig()
const siteConfig = useSiteConfig()
const route = useRoute()
const appStore = useAppStore()

const routePath = computed(() => route.path)

const matchingNavItems = useMatchingNavItems(routePath)

const { favicon, nav, title } = toValue(themeConfig).header
const currentNavItem = computed(() => matchingNavItems.value.firstNavItems)

const navFavicon = computed(() => {
  if (typeof favicon === 'boolean')
    return favicon === true ? siteConfig.value.favicon : ''
  else if (typeof favicon === 'string')
    return favicon
  else if (typeof favicon === 'object')
    return appStore.isDark ? favicon.dark : favicon.light

  console.error('Invalid favicon type, check ThemeConfig.header.favicon config')
  return ''
})
</script>

<template>
  <!-- <OceanusNavBanner /> -->
  <!-- <OceanusNavToolbar /> -->
  <OceanusNav :nav="nav" :favicon="navFavicon" :title :class="!currentNavItem?.subNav && 'fixed'" />
  <div :style="{ marginTop: currentNavItem?.subNav ? 0 : 'var(--oceanus-nav-height)' }" class="nav-placeholder" />
  <OceanusSubNav v-if="currentNavItem?.subNav" :title="currentNavItem?.text" :sub-nav="currentNavItem?.subNav" :class="currentNavItem?.subNav && 'sticky'" />
</template>
