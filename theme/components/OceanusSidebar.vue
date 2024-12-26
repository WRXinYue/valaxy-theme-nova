<script lang="ts" setup>
import type { SidebarMulti } from '../types'
import { removeItemFromCategory, useSidebar } from 'valaxy'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCategories, usePostList, useSplitPathSegments } from '../composables'

defineProps<{
  sidebar?: SidebarMulti
}>()

const route = useRoute()

const routerPath = computed(() => route.path)

const pathSegments = useSplitPathSegments(routerPath)

const currentPath = computed(() => pathSegments.value[0])
// const currentPath = computed(() => pathSegments.value[1] || pathSegments.value[0])

const post = usePostList({ path: currentPath })
const cs = useCategories('', post)
const { hasSidebar } = useSidebar()

const categories = computed(() => {
  const cList = cs.value
  removeItemFromCategory(cList, 'Uncategorized')

  // const sidebar = themeConfig.value.sidebar
  // if (sidebar) {
  //   cList.children.forEach((item) => {
  //     if (!themeConfig.value.sidebar.includes(item.name))
  //       removeItemFromCategory(cList, item.name)
  //   })
  // }

  return cList
})
</script>

<template>
  <aside v-if="hasSidebar" class="oceanus-aside" @click.stop>
    <ol v-for="(item, i) in sidebar" :key="i" text="left">
      <template v-if="typeof item === 'string'">
        <OceanusSidebarCategoryByName :categories :item />
      </template>
      <OceanusSidebarItem v-else :item :depth="0" />
    </ol>
  </aside>
</template>

<style lang="scss" scoped>
.oceanus-aside {
  position: sticky;
  top: var(--oceanus-nav-height);
  padding-bottom: 2rem;
  padding-top: var(--oceanus-aside-pt);
  width: 100%;
  min-width: var(--oceanus-aside-width);
  max-height: calc(100vh - var(--oceanus-nav-height));
  transition:
    box-shadow var(--va-transition-duration),
    background-color var(--va-transition-duration),
    opacity 0.25s,
    transform var(--va-transition-duration) cubic-bezier(0.19, 1, 0.22, 1),
    top var(--va-transition-duration);
}

// .oceanus-aside > :not(:first-child) {
//   margin-top: 16px;
// }
</style>
