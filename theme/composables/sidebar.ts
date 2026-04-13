import type { ComputedRef, Ref } from 'vue'
import type { SidebarItem } from '../types'

import { isClient, useResizeObserver } from '@vueuse/core'

import { removeItemFromCategory, usePageList } from 'valaxy'
import {
  computed,

  nextTick,
  onMounted,

  onUnmounted,

  ref,
  watch,
  watchEffect,
  watchPostEffect,
} from 'vue'

import { useRoute } from 'vue-router'
import { useCategories, usePostList, useSplitPathSegments } from '../composables'

export interface SidebarControl {
  collapsed: Ref<boolean>
  collapsible: ComputedRef<boolean>
  isLink: ComputedRef<boolean>
  isActiveLink: Ref<boolean>
  hasActiveLink: ComputedRef<boolean>
  hasChildren: ComputedRef<boolean>
  toggle: () => void
}

export const HASH_RE = /#.*$/
export const EXT_RE = /(index)?\.(md|html)$/
export function normalize(path: string): string {
  return decodeURI(path).replace(HASH_RE, '').replace(EXT_RE, '')
}

export function isActive(
  currentPath: string,
  matchPath?: string,
  asRegex: boolean = false,
): boolean {
  if (matchPath === undefined)
    return false

  currentPath = normalize(`/${currentPath}`)

  if (asRegex)
    return new RegExp(matchPath).test(currentPath)

  if (normalize(matchPath) !== currentPath)
    return false

  const hashMatch = matchPath.match(HASH_RE)

  if (hashMatch)
    return (isClient ? location.hash : '') === hashMatch[0]

  return true
}

/**
 * a11y: cache the element that opened the Sidebar (the menu button) then
 * focus that button again when Menu is closed with Escape key.
 */
export function useCloseSidebarOnEscape(
  isOpen: Ref<boolean>,
  close: () => void,
) {
  let triggerElement: HTMLButtonElement | undefined

  watchEffect(() => {
    triggerElement = isOpen.value
      ? (document.activeElement as HTMLButtonElement)
      : undefined
  })

  onMounted(() => {
    window.addEventListener('keyup', onEscape)
  })

  onUnmounted(() => {
    window.removeEventListener('keyup', onEscape)
  })

  function onEscape(e: KeyboardEvent) {
    if (e.key === 'Escape' && isOpen.value) {
      close()
      triggerElement?.focus()
    }
  }
}

const hashRef = ref(isClient ? location.hash : '')
if (isClient) {
  window.addEventListener('hashchange', () => {
    hashRef.value = location.hash
  })
}

/**
 * Check if the given sidebar item contains any active link.
 */
export function containsActiveLink(
  path: string,
  items: SidebarItem | SidebarItem[],
): boolean {
  if (Array.isArray(items))
    return items.some(item => containsActiveLink(path, item))

  return isActive(path, items.link)
    ? true
    : items.items
      ? containsActiveLink(path, items.items)
      : false
}

export function useSidebarControl(item: ComputedRef<SidebarItem>): SidebarControl {
  const collapsed = ref(false)

  const collapsible = computed(() => {
    return item.value.collapsed != null
  })

  const isLink = computed(() => {
    return !!item.value.link
  })

  const isActiveLink = ref(false)
  const route = useRoute()
  const updateIsActiveLink = () => {
    isActiveLink.value = route.path === item.value.link
  }

  watch([route, item, hashRef], updateIsActiveLink)
  onMounted(updateIsActiveLink)

  const hasActiveLink = computed(() => {
    if (isActiveLink.value)
      return true

    return item.value.items
      ? containsActiveLink(route.path, item.value.items)
      : false
  })

  const hasChildren = computed(() => {
    return !!(item.value.items && item.value.items.length)
  })

  watchEffect(() => {
    collapsed.value = !!(collapsible.value && item.value.collapsed)
  })

  watchPostEffect(() => (isActiveLink.value || hasActiveLink.value) && (collapsed.value = false))

  function toggle() {
    if (collapsible.value)
      collapsed.value = !collapsed.value
  }

  return {
    collapsed,
    collapsible,
    isLink,
    isActiveLink,
    hasActiveLink,
    hasChildren,
    toggle,
  }
}

export function useSidebarItems() {
  const route = useRoute()

  const routerPath = computed(() => route.path)

  const pathSegments = useSplitPathSegments(routerPath)

  const currentPath = computed(() => pathSegments.value[1] || pathSegments.value[0])

  const post = usePostList({ path: currentPath })
  const cs = useCategories('', post)

  const categories = computed(() => {
    const cList = cs.value
    removeItemFromCategory(cList, 'Uncategorized')

    return cList
  })

  return categories
}

/** Pages directly under `/{section}/` (no subfolder) are grouped under this key; no category heading is shown. */
export const AUTO_SIDEBAR_FLAT = '__flat__'

/**
 * Sidebar sections under the current route’s first path segment, inferred from `pages/`:
 * each subfolder becomes a group; single-segment paths (e.g. `/reference/site-config`) use {@link AUTO_SIDEBAR_FLAT}.
 */
export function useAutoSidebarGroups() {
  const route = useRoute()
  const allPages = usePageList()
  const routerPath = computed(() => route.path)
  const pathSegments = useSplitPathSegments(routerPath)
  const base = computed(() => pathSegments.value[0] ?? '/')

  return computed(() => {
    const b = base.value
    if (!b || b === '/')
      return []

    const prefix = `${b}/`
    const groups = new Set<string>()

    for (const p of allPages.value) {
      const path = p.path
      if (!path || path === b || !path.startsWith(prefix))
        continue
      const rel = path.slice(prefix.length)
      const parts = rel.split('/').filter(Boolean)
      if (parts.length === 0)
        continue
      if (parts.length === 1)
        groups.add(AUTO_SIDEBAR_FLAT)
      else
        groups.add(parts[0])
    }

    const arr = [...groups]
    arr.sort((a, b) => {
      if (a === AUTO_SIDEBAR_FLAT)
        return -1
      if (b === AUTO_SIDEBAR_FLAT)
        return 1
      return a.localeCompare(b)
    })
    return arr
  })
}

/**
 * Sliding background pill for the active link in a sidebar list (animated top/height).
 */
export function useSidebarSectionIndicator(
  sectionRef: Ref<HTMLElement | null>,
  collapsed?: Ref<boolean>,
) {
  const route = useRoute()
  const top = ref(0)
  const height = ref(0)
  const visible = ref(false)

  function measure() {
    if (!isClient)
      return
    const root = sectionRef.value
    if (!root) {
      visible.value = false
      return
    }
    const cs = window.getComputedStyle(root)
    if (cs.display === 'none') {
      visible.value = false
      return
    }
    const active = root.querySelector(
      'a.router-link-exact-active',
    ) ?? root.querySelector('a.router-link-active')
    if (!active) {
      visible.value = false
      return
    }
    const anchor = active as HTMLElement
    const rootRect = root.getBoundingClientRect()
    const elRect = anchor.getBoundingClientRect()
    top.value = elRect.top - rootRect.top + root.scrollTop
    height.value = elRect.height
    visible.value = true
  }

  function measureSoon() {
    nextTick(() => {
      requestAnimationFrame(() => measure())
    })
  }

  const sectionStyle = computed(() => ({
    '--indicator-top': `${top.value}px`,
    '--indicator-height': `${height.value}px`,
    '--indicator-opacity': visible.value ? 1 : 0,
  }))

  useResizeObserver(sectionRef, () => measureSoon())

  watch(() => route.fullPath, () => measureSoon())
  if (collapsed)
    watch(collapsed, () => measureSoon())

  onMounted(() => measureSoon())

  return { sectionStyle, measure: measureSoon }
}
