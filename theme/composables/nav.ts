import type { MaybeRefOrGetter } from 'vue'
import type { NavItem, SubNavItem } from '../types'
import { computed, toValue } from 'vue'
import { useThemeConfig } from '../composables'

// export function splitPathSegments(path: string) {
//   const pathSegments = path.split('/').filter(Boolean)
//   const [firstSegment, secondSegment] = pathSegments

//   const firstSegmentPath = firstSegment && `/${firstSegment}`
//   const secondSegmentPath = secondSegment && `/${firstSegment}/${secondSegment}`

//   return [firstSegmentPath, secondSegmentPath].filter(Boolean) || ['/']
// }

export function useSplitPathSegments(path: MaybeRefOrGetter<string>) {
  const pathSegments = computed(() => {
    const _path = toValue(path)
    const pathParts = _path.split('/').filter(Boolean)
    const [firstSegment, secondSegment] = pathParts

    const firstSegmentPath = firstSegment && `/${firstSegment}`
    const secondSegmentPath = secondSegment && `/${firstSegment}/${secondSegment}`

    return [firstSegmentPath, secondSegmentPath].filter(Boolean) || ['/']
  })

  return pathSegments
}

/**
 * Resolves a navigation item or sub-navigation item based on a given path
 *
 * @param path - The current path to match against the links in the navigation items
 * @returns The matching `NavItem` or `SubNavItem` if a match is found; otherwise, returns `undefined`
 */
export function useMatchingNavItems(path: MaybeRefOrGetter<string>) {
  const themeConfig = useThemeConfig()
  const navItems = themeConfig.value.nav!

  return computed(() => {
    const matchingNavItems: {
      firstNavItems?: NavItem
      secondNavItems?: SubNavItem
    } = {}

    const _path = toValue(path)
    const pathSegments = useSplitPathSegments(_path)
    const [firstSegmentPath, secondSegmentPath] = pathSegments.value

    if (pathSegments.value.length === 0)
      return matchingNavItems

    const firstSegmentMatch = firstSegmentPath && navItems.find(item => item.link.includes(firstSegmentPath))
    const secondSegmentMatch = secondSegmentPath && navItems
      .map(item => item.subNav?.find(subItem => subItem.link.includes(secondSegmentPath)))
      .find(subItem => subItem !== undefined)

    if (firstSegmentMatch)
      matchingNavItems.firstNavItems = firstSegmentMatch
    if (secondSegmentMatch)
      matchingNavItems.secondNavItems = secondSegmentMatch

    return matchingNavItems
  })
}
