<script setup lang="ts">
import Select from 'primevue/select'
import { useAppStore } from 'valaxy'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const appStore = useAppStore()

const cities = ([
  { label: '简体中文', code: 'zh-CN' },
  { label: 'English', code: 'en' },
])

const selectedLanguage = ref(cities.find(city => city.code === locale.value))
</script>

<template>
  <div class="oceanus-nav-toolbar">
    <div />
    <div class="h-full flex items-center">
      <Select v-model="selectedLanguage" :options="cities" option-label="label" class="oceanus-nav-toolbar-select-lang">
        <template #dropdownicon>
          <span i-tabler-caret-down-filled class="inline-block" />
        </template>
      </Select>

      <div class="oceanus-nav-toolbar-text ml-6">
        <a href="/" class="lan2g"> Github </a>
      </div>

      <div class="oceanus-nav-toolbar-text ml-2 w-25vw flex items-center justify-between">
        <button type="button" aria-label="Toggle Dark Mode" @click="appStore.toggleDarkWithTransition">
          <div v-if="!appStore.isDark" i-ri-sun-line />
          <div v-else i-ri-moon-line />
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.oceanus-nav-toolbar {
  padding: 0 60px;
  height: auto;
  min-height: 24px;
  color: #fff;
  background-color: #000;
  z-index: 5;
  display: flex;
  justify-content: space-between;

  &-text,
  a {
    font-size: 12px;
    font-weight: 500;
    color: #fff;
  }

  &-select-lang {
    padding-right: 7px;
    font-size: 11px;
    font-weight: 500;
    line-height: 24px;
  }
}

.p-select-overlay {
  --p-select-overlay-background: #fff;
  --p-select-overlay-border-radius: 20px;
}

.p-select-list-container {
  border-radius: 20px;
  padding: 4px 0;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.p-select-option-label {
  min-width: 192px;
  padding: 0 16px;
  font-size: 14px;
  font-weight: 400;
  line-height: 40px;
}

.p-select-open .p-select-dropdown {
  transform: rotate(-180deg);
}

.p-select-dropdown {
  margin-left: 4px;
}
</style>
