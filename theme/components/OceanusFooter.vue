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
  color: var(--oceanus-c-text);
  padding: 3rem 0 2rem;
  font-family: var(--oceanus-font);

  .footer-content {
    /* Using oceanus-home-container styles */
  }

  .footer-columns {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 2rem;
    margin-bottom: 2.5rem;
  }

  .footer-column {
    width: unset;
    float: unset;
    flex-basis: 25%;
    min-width: 200px;

    .footer-nav-title {
      font-size: 12px;
      font-weight: 600;
      line-height: 1.33337;
      letter-spacing: -0.01em;
      color: var(--oceanus-c-text-deep);
      margin-bottom: 0.8em;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      .footer-list-item {
        display: flex;
        pointer-events: auto;
        margin-bottom: 0.8em;
        list-style: none;
        font-size: 12px;
        line-height: 1.33337;
        font-weight: 400;
        color: var(--oceanus-c-text-muted);

        a {
          letter-spacing: -0.01em;
          color: inherit;
          text-decoration: none;
          transition: color 0.2s ease;

          &:hover {
            color: var(--oceanus-c-text-deeper);
            text-decoration: none;
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
    gap: 1rem;
    border-top: 1px solid var(--oceanus-c-footer-border);
    padding-top: 1rem;
    font-size: 12px;
    line-height: 1.33337;
    font-weight: 400;
    letter-spacing: -0.01em;
    color: var(--oceanus-c-text-muted);

    a {
      color: var(--oceanus-c-text-muted);
      text-decoration: none;
      transition: color 0.2s ease;

      &:hover {
        color: var(--oceanus-c-text-deeper);
        text-decoration: none;
      }
    }
  }

  @media (max-width: 767px) {
    padding: 2rem 0 1.5rem;

    .footer-columns {
      flex-direction: column;
      gap: 1.5rem;
    }

    .footer-column {
      flex-basis: 100%;
    }

    .footer-bottom {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.75rem;
    }
  }
}
</style>

    }
