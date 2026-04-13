<script lang="ts" setup>
import type { DropdownItem } from './NovaDropdownItem.vue'
import { useSiteConfig } from 'valaxy'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocale } from '../composables'

withDefaults(
  defineProps<{
    variant?: 'dropdown' | 'inline'
  }>(),
  { variant: 'dropdown' },
)

const { toggleLocales } = useLocale()
const { locale, messages, t } = useI18n()
const siteConfig = useSiteConfig()

/** BCP 47 codes from site config, or vue-i18n message keys, or current locale only */
const localeCodes = computed(() => {
  const fromSite = siteConfig.value?.languages as string[] | undefined
  if (fromSite?.length)
    return [...new Set(fromSite.map(c => c.replace(/_/g, '-')))]

  const keys = Object.keys(messages.value ?? {})
  if (keys.length)
    return [...new Set(keys)]

  return [locale.value]
})

function displayNameForLocale(code: string, uiLocale: string) {
  const normalized = code.replace(/_/g, '-')
  try {
    return new Intl.DisplayNames([uiLocale], { type: 'language' }).of(normalized) ?? code
  }
  catch {
    return code
  }
}

const localeOptions = computed(() =>
  localeCodes.value.map(code => ({
    code,
    label: displayNameForLocale(code, locale.value),
  })),
)

const dropdownItems = computed<DropdownItem[]>(() =>
  localeOptions.value.map(({ code, label }) => ({
    label,
    onClick: () => toggleLocales(code),
  })),
)

function onSelectChange(e: Event) {
  const v = (e.target as HTMLSelectElement).value
  toggleLocales(v)
}
</script>

<template>
  <div v-if="variant === 'inline'" class="nova-locale-inline w-full">
    <select
      id="nova-locale-select"
      class="nova-locale-select"
      :value="locale"
      :aria-label="t('nova.locale.selectLanguage')"
      @change="onSelectChange"
    >
      <option
        v-for="opt in localeOptions"
        :key="opt.code"
        :value="opt.code"
      >
        {{ opt.label }}
      </option>
    </select>
  </div>
  <NovaDropdownItem
    v-else
    icon="i-ri-translate-2"
    class="text-icon nova-nav-toolbar-select-lang inherit"
    :items="dropdownItems"
  />
</template>

<style scoped>
.nova-locale-inline {
  display: block;
}

.nova-locale-select {
  width: 100%;
  min-height: 44px;
  padding: 0 8px;
  padding-right: 1.75rem;
  box-sizing: border-box;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.3;
  color: var(--nova-c-text);
  background-color: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 4px center;
  background-size: 16px;
  -webkit-tap-highlight-color: transparent;
}

.nova-locale-select:focus,
.nova-locale-select:focus-visible,
.nova-locale-select:active {
  outline: none;
  box-shadow: none;
}

.nova-locale-select option {
  color: var(--nova-c-text);
  background-color: var(--nova-c-bg-design);
}
</style>
