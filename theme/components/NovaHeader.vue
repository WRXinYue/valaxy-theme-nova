<script setup lang="ts">
import type { FmLocaleString } from '../types'
import { useAppStore, useSiteConfig } from 'valaxy'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useFmLocaleString, useMatchingNavItems, useNavItemLabel, useThemeConfig } from '../composables'

const themeConfig = useThemeConfig()
const { fmT } = useFmLocaleString()
const navLabel = useNavItemLabel()
const siteConfig = useSiteConfig()
const route = useRoute()
const appStore = useAppStore()

const routePath = computed(() => route.path)

const matchingNavItems = useMatchingNavItems(routePath)

const nav = computed(() => themeConfig.value.nav)
const logo = computed(() => themeConfig.value.logo)

const navTitleResolved = computed(() => {
  const nt = themeConfig.value.navTitle
  if (nt === false)
    return false
  if (typeof nt === 'string' || (typeof nt === 'object' && nt !== null))
    return fmT(nt as FmLocaleString)
  return nt
})

const currentNavItem = computed(() => matchingNavItems.value.firstNavItems)

const subNavTitle = computed(() => navLabel(currentNavItem.value))

const showNavPlaceholder = computed(() => themeConfig.value.navPlaceholder !== false)

const navLogo = computed(() => {
  const lg = logo.value
  if (typeof lg === 'boolean')
    return lg === true ? siteConfig.value.favicon : ''
  else if (typeof lg === 'string')
    return lg
  else if (typeof lg === 'object')
    return appStore.isDark ? lg.dark : lg.light

  console.error('Invalid favicon type, check ThemeConfig.header.favicon config')
  return ''
})
</script>

<template>
  <!-- <NovaNavBanner /> -->
  <!-- <NovaNavToolbar /> -->
  <NovaNav :nav="nav" :favicon="navLogo" :title="navTitleResolved" :class="!currentNavItem?.subNav && 'fixed'" />
  <div
    v-if="showNavPlaceholder"
    :style="{ marginTop: currentNavItem?.subNav ? 0 : 'var(--nova-nav-height)' }"
    class="nav-placeholder"
  />
  <NovaSubNav v-if="currentNavItem?.subNav" :title="subNavTitle" :sub-nav="currentNavItem?.subNav" :class="currentNavItem?.subNav && 'sticky'" />
</template>
