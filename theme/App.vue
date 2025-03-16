<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useLocale } from './composables'

const { lang } = useLocale()

useHead({
  meta: [
    {
      name: 'google',
      content: 'notranslate',
    },
    {
      'http-equiv': 'Content-Language',
      'content': lang,
    },
  ],
})
</script>
