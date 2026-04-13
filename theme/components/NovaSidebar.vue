<script lang="ts" setup>
import type { Post } from 'valaxy'
import type { SidebarMulti } from '../types'
import { usePageList, useSidebar } from 'valaxy'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSplitPathSegments } from '../composables'

defineProps<{
  sidebar?: SidebarMulti
}>()

const route = useRoute()
const routerPath = computed(() => route.path)
const pathSegments = useSplitPathSegments(routerPath)
const currentPath = computed(() => pathSegments.value[0])
const { hasSidebar } = useSidebar()

const allPages = usePageList()

function getPagesInGroup(group: string): Post[] {
  const base = currentPath.value
  if (!base)
    return []
  const prefix = `${base}/${group}/`
  return allPages.value
    .filter(p => p.path?.startsWith(prefix))
    .sort((a, b) => (b.top || 0) - (a.top || 0))
}
</script>

<template>
  <aside v-if="hasSidebar" class="nova-aside" @click.stop>
    <template v-for="(item, i) in sidebar" :key="i">
      <NovaSidebarCategory
        v-if="typeof item === 'string'"
        :name="item"
        :pages="getPagesInGroup(item)"
        :level="0"
      />
      <NovaSidebarItem v-else :item :depth="0" />
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
