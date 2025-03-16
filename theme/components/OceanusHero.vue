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
    backdrop-filter: blur(0px);
    transition: backdrop-filter 0.5s ease;
  }

  &:hover::before {
    backdrop-filter: blur(2px);
  }

  .hero-content {
    position: relative;
    z-index: 1;
    max-width: 1000px;
    padding: 2rem 1rem;
    text-align: center;
    color: var(--oceanus-c-text-deeper);
    animation: fade-in 1.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &.has-img .hero-content {
    color: #fff;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  }

  .hero-title {
    font-size: clamp(2.5rem, 5vw, 4.5rem);
    letter-spacing: -0.02em;
    font-weight: 600;
    margin-bottom: 1.5rem;
    line-height: 1.1;
  }

  .hero-motto {
    font-size: clamp(1.1rem, 2vw, 1.5rem);
    font-weight: 400;
    letter-spacing: 0.01em;
    opacity: 0.85;
    margin-bottom: 2.5rem;
    max-width: 80%;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.4;
  }

  .hero-buttons {
    display: flex;
    justify-content: center;
    gap: 1.2rem;
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>
