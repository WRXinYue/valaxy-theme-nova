import type { FmLocaleString } from '../types'
import { isLocaleKey, stripLocalePrefix, useValaxyI18n } from 'valaxy'
import { useI18n } from 'vue-i18n'

export type { FmLocaleString }

/**
 * Frontmatter / nav strings (see `FmLocaleString` in types):
 * - Plain string
 * - Per-locale map via `tObject`
 * - `$locale:…` → vue-i18n `t()`
 */
export function useFmLocaleString() {
  const { $tO } = useValaxyI18n()
  const { t } = useI18n()

  function fmT(data?: FmLocaleString | null): string {
    if (data == null || data === '')
      return ''
    const raw = $tO(data as string | Record<string, string>)
    const step = typeof raw === 'string' ? raw : String(raw ?? '')
    if (step && isLocaleKey(step))
      return t(stripLocalePrefix(step))
    return step
  }

  return { fmT }
}
