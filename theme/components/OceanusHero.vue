<script setup lang="ts">
import { useAppStore } from 'valaxy'
import { computed } from 'vue'
import { useThemeConfig } from '../composables'

const appStore = useAppStore()
const themeConfig = useThemeConfig()

const heroImg = computed(() => {
  const img = themeConfig.value.hero.img
  if (typeof img === 'string')
    return img
  else if (typeof img === 'object')
    return appStore.isDark ? img.dark : img.light

  console.error('Invalid favicon type, check ThemeConfig.hero.img config')
  return ''
})
</script>

<template>
  <div class="oceanus-hero" :class="heroImg && 'has-img'" :style="{ backgroundImage: `url(${heroImg})` }">
    <div class="hero-content">
      <p class="hero-title">
        <slot name="intro-text">
          {{ themeConfig.hero.title }}
        </slot>
      </p>

      <p class="hero-motto">
        <slot name="muted-text">
          {{ themeConfig.hero.motto }}
        </slot>
      </p>
    </div>
  </div>
</template>

<style lang="scss">
.oceanus-hero {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - var(--oceanus-nav-height));
  padding: 0 2rem;
  position: relative;
  overflow: hidden;

  background-size: cover;
  background-position: center;
  background-attachment: fixed;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
  }

  .hero-content {
    position: relative;
    z-index: 1;
    // max-width: 800px;
    padding: 2rem 1rem;
    text-align: center;
    color: var(--oceanus-c-text-deeper);
    animation: fade-in 1.5s ease-in-out;
  }

  &.has-img .hero-content {
    color: #fff;
  }

  .hero-title {
    font-size: 3rem;
    letter-spacing: 1rem;
    // font-size: clamp(2.5rem, 5vw, 4rem);
    // font-size: clamp(2rem, 4vw, 3.5rem);
    font-weight: 600;
    // letter-spacing: -0.02em;
    margin-bottom: 1rem;
  }

  .hero-motto {
    // font-size: clamp(1rem, 2.5vw, 1.5rem);
    // font-size: clamp(0.9rem, 2vw, 1.2rem);
    font-size: 1rem;
    // font-weight: 400;
    font-weight: 300;
    letter-spacing: 0.3rem;
    opacity: 0.6;
    margin-bottom: 2rem;
    // color: rgba(255, 255, 255, 0.85);
  }

  .hero-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>
