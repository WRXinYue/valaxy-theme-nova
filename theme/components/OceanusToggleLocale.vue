<script lang="ts" setup>
import type { DropdownItem } from '../components/OceanusDropdownItem.vue'
import { useLocale } from '../composables'

const { toggleLocales } = useLocale()

const locales: DropdownItem[] = [
  { label: '简体中文', onClick: () => toggleLocales('zh-CN') },
  { label: 'English', onClick: () => toggleLocales('en') },
]
</script>

<template>
  <OceanusDropdownItem icon="i-ri-translate-2" class="inherit text-icon oceanus-nav-toolbar-select-lang" :items="locales" />
</template>
