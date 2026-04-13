<script lang="ts" setup>
import { useFrontmatter, useOutline } from 'valaxy'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const { viewScroll = false } = defineProps<{
  viewScroll?: boolean
}>()

const frontmatter = useFrontmatter()
const { headers } = useOutline()
const { t } = useI18n()
const route = useRoute()

const INDEX_HTML_RE = /index.html$/
const isIndex = computed(() => route.path.replace(INDEX_HTML_RE, '') === '/')

const tocAllowed = computed(() =>
  isIndex.value ? frontmatter.value.toc === true : frontmatter.value.toc !== false,
)

/** No headings → hide TOC chrome (title + column is collapsed by parent). */
const showTocPanel = computed(() => tocAllowed.value && headers.value.length > 0)
</script>

<template>
  <!-- Note: The outer div ensures that sticky positioning works -->
  <div v-if="showTocPanel" class="nova-toc-inner">
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

.nova-toc-inner {
  .toc-container {
    padding-left: 16px;
    padding-top: var(--nova-aside-pt);
    min-width: var(--nova-aside-width);
    overflow: hidden;
  }
}
</style>
