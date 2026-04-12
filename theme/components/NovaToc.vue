<script lang="ts" setup>
import { useFrontmatter } from 'valaxy'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const { viewScroll = false } = defineProps<{
  viewScroll?: boolean
}>()

const frontmatter = useFrontmatter()
const { t } = useI18n()
const route = useRoute()

const isIndex = computed(() => route.path.replace(/index.html$/, '') === '/')
</script>

<template>
  <!-- Note: The outer div ensures that sticky positioning works -->
  <div v-if="isIndex ? frontmatter.toc === true : frontmatter.toc !== false" class="nova-toc">
    <div class="toc-container">
      <h2 font="black">
        {{ t('sidebar.toc') }}
      </h2>
      <div class="custom-container">
        <slot>
          <NovaOutline :view-scroll="viewScroll" />
        </slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss"  scoped>
.toc-btn {
  color: var(--va-c-primary);
  background-color: white;
  z-index: var(--yun-z-toc-btn);
}

.nova-toc {
  position: sticky;
  top: var(--nova-nav-height);
  // height: 100%;

  .toc-container {
    padding-left: 16px;
    padding-top: var(--nova-aside-pt);
    min-width: var(--nova-aside-width);
    overflow: hidden;
  }
}
</style>
