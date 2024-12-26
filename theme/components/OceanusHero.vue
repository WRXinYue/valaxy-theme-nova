<script setup lang="ts">
import { useThemeConfig } from '../composables'

const themeConfig = useThemeConfig()
</script>

<template>
  <div class="oceanus-hero" :style="{ backgroundImage: `url(${themeConfig.hero.img})` }">
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

      <!-- CTA Buttons -->
      <!-- <div class="hero-buttons">
        <button class="cta-primary">
          Get Started
        </button>
        <button class="cta-secondary">
          Learn More
        </button>
      </div> -->
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
    color: #fff;
    animation: fade-in 1.5s ease-in-out;
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

  .cta-primary,
  .cta-secondary {
    padding: 0.75rem 2rem;
    border-radius: 24px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }

  .cta-primary {
    background-color: #0071e3;
    color: white;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);

    &:hover {
      background-color: #005bb5;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    }
  }

  .cta-secondary {
    background-color: transparent;
    border: 1px solid #ffffff;
    color: white;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
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
