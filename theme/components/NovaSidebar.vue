<script lang="ts" setup>
import type { Post } from 'valaxy'
import { usePageList, useSidebar } from 'valaxy'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSplitPathSegments } from '../composables'
import { AUTO_SIDEBAR_FLAT, useAutoSidebarGroups } from '../composables/sidebar'

const route = useRoute()
const routerPath = computed(() => route.path)
const pathSegments = useSplitPathSegments(routerPath)
const currentPath = computed(() => pathSegments.value[0])
const { hasSidebar } = useSidebar()

const allPages = usePageList()
const sidebarGroups = useAutoSidebarGroups()

function getPagesInGroup(group: string): Post[] {
  const base = currentPath.value
  if (!base)
    return []

  if (group === AUTO_SIDEBAR_FLAT) {
    const prefix = `${base}/`
    return allPages.value
      .filter((p) => {
        if (!p.path?.startsWith(prefix))
          return false
        const rel = p.path.slice(prefix.length)
        return rel.length > 0 && !rel.includes('/')
      })
      .sort((a, b) => (b.top || 0) - (a.top || 0))
  }

  const prefix = `${base}/${group}/`
  return allPages.value
    .filter(p => p.path?.startsWith(prefix))
    .sort((a, b) => (b.top || 0) - (a.top || 0))
}
</script>

<template>
  <aside v-if="hasSidebar" class="nova-aside" @click.stop>
    <template v-for="(name, i) in sidebarGroups" :key="i">
      <NovaSidebarCategory
        :name
        :pages="getPagesInGroup(name)"
        :level="0"
      />
    </template>
  </aside>
</template>

<style lang="scss" scoped>
.nova-aside {
  // position: sticky;
  top: var(--nova-nav-height);
  padding-bottom: 2rem;
  padding-top: var(--nova-aside-pt);
  width: 100%;
  min-width: calc(var(--nova-aside-width) / 3);
  // max-height: calc(100vh - var(--nova-nav-height));
  transition:
    box-shadow var(--va-transition-duration),
    background-color var(--va-transition-duration),
    opacity 0.25s,
    transform var(--va-transition-duration) cubic-bezier(0.19, 1, 0.22, 1),
    top var(--va-transition-duration);
}

// .nova-aside > :not(:first-child) {
//   margin-top: 16px;
// }
</style>
