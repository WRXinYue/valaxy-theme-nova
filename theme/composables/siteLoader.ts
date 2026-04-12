import { useAppStore } from 'valaxy'

export const SITE_LOADER_SEEN_KEY = 'nova-site-loader-seen'

/**
 * Clears the “already seen” flag and shows the full site splash again.
 * Use before a heavy dynamic import or long async work (e.g. large chunk).
 */
export function useSiteLoader() {
  const appStore = useAppStore()
  return {
    showLongLoadSplash() {
      try {
        sessionStorage.removeItem(SITE_LOADER_SEEN_KEY)
      }
      catch {
        /* ignore private mode / quota */
      }
      appStore.showLoading = true
    },
  }
}
