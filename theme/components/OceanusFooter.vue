<script lang="ts" setup>
import { useSiteConfig, useValaxyConfig } from 'valaxy'
import pkg from 'valaxy/package.json'
import { computed } from 'vue'
import { useThemeConfig } from '../composables'

const config = useValaxyConfig()
const siteConfig = useSiteConfig()
const themeConfig = useThemeConfig()

const year = new Date().getFullYear()

const isThisYear = computed(() => {
  return year === themeConfig.value.footer.since
})
</script>

<template>
  <footer class="oceanus-footer">
    <div class="oceanus-home-container footer-content">
      <div class="footer-columns">
        <template v-for="(nav, index) in themeConfig.nav">
          <div v-if="nav.subNav?.length" :key="index" class="footer-column">
            <h4 class="footer-nav-title">
              {{ nav.text }}
            </h4>
            <ul>
              <li v-for="subNav in nav.subNav" :key="subNav.text" class="footer-list-item">
                <AppLink :to="subNav.link">
                  {{ subNav.text }}
                </AppLink>
              </li>
            </ul>
          </div>
        </template>
      </div>

      <div class="footer-bottom">
        <span class="copyright footer-copyright">
          &copy;
          <template v-if="!isThisYear">
            {{ themeConfig.footer.since }} -
          </template>
          {{ year }}
          <a class="oceanus-text" target="_blank" :href="siteConfig.author.link">
            {{ siteConfig.author.name }}
          </a>
        </span>

        <span v-if="themeConfig.footer.powered" class="powered">
          Powered by
          <span>
            <a class="oceanus-text" :href="pkg.repository.url" target="_blank" rel="noopener"> valaxy </a> v{{ pkg.version }}
          </span> | Theme
          <span>
            <a class="oceanus-text" :href="themeConfig.pkg.homepage" target="_blank" rel="noopener"> {{ config.theme }}</a> v{{ themeConfig.pkg.version }}
          </span>
        </span>

        <div v-if="themeConfig.footer.icp" class="icp" v-html="themeConfig.footer.icp" />
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
.oceanus-footer {
  background-color: var(--oceanus-c-footer-bg);
  color: #333;
  padding-block: 2rem;

  // .footer-content {
  //   max-width: 1200px;
  //   margin: 0 auto;
  // }

  .footer-columns {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .footer-column {
    width: unset;
    float: unset;
    flex-basis: 25%;

    .footer-nav-title {
      font: 600 16px / 1.2 var(--oceanus-font);
      // color: #333;
      color: var(--oceanus-c-text-deep);
      letter-spacing: -0.01em;
      margin-bottom: 1.2em;
    }

    ul {
      list-style: none;
      padding: 0;

      .footer-list-item {
        display: flex;
        pointer-events: auto;
        margin-bottom: 1.2em;
        list-style: none;
        font: 400 12px / 1.2 Inter;
        // color: #64686a;
        // color: #515154;
        color: var(--oceanus-c-text-muted);

        a {
          letter-spacing: -0.01em;
          color: inherit;
          text-decoration: none;

          &:hover {
            // color: #000;
            color: var(--oceanus-c-text-deeper);
            text-decoration: underline;
          }
        }
      }
    }
  }

  .social-links i {
    margin-right: 0.5rem;
  }

  .footer-bottom {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    border-top: 1px solid var(--oceanus-c-footer-border);
    padding-top: 1rem;
    // font-size: 0.875rem;
    font: 500 12px / 1.2 var(--oceanus-font);
    // font-family: 'Inter', 'Noto Sans CJK', 'Microsoft YaHei', sans-serif;
    // color: #64686a;
    // letter-spacing: -0.02em;

    // font: 500 14px / 1.2 Sequel Sans;
    letter-spacing: 0.03em;
    // color: rgba(0, 0, 0, 0.4);
    color: var(--oceanus-c-text-muted);

    a {
      // color: #555;
      // text-decoration: none;

      padding-bottom: 3px;
      font-weight: 500;
      color: var(--oceanus-c-text-deep);

      &:hover {
        color: var(--oceanus-c-text-deeper);
        border-bottom: 1px solid var(--oceanus-c-text-deep);
      }
    }
  }
}
</style>
