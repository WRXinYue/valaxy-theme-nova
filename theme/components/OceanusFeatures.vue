<script setup lang="ts">
import { useFrontmatter } from 'valaxy'

const fm = useFrontmatter<{ features: Features }>()

export type Features = Partial<{
  title: string
  subtitle: string
  text: string

  cards: Partial<{
    num: string
    title: string
    icon: string
    details: string
  }[]>
}>
</script>

<template>
  <section v-if="fm?.features" class="oceanus-section oceanus-features" p="b-120px">
    <div class="oceanus-home-container">
      <div p="t-60px" flex="~ justify-between">
        <div class="features-header">
          <h3 class="subtitle">
            {{ fm.features?.subtitle }}
          </h3>
          <h2 class="title">
            <span>{{ fm.features?.title }}</span>
          </h2>
          <div class="text">
            <p>
              {{ fm.features?.text }}
            </p>
          </div>
        </div>
      </div>

      <div m="t-80px">
        <ul class="features-grid">
          <li v-for="(card, i) in fm.features?.cards" :key="i" class="feature-item">
            <div class="feature-item-inner">
              <div class="feature-card-wrapper">
                <div class="feature-card">
                  <div v-if="card?.icon || card?.num" class="feature-card-header">
                    <span class="feature-icon" :class="card?.icon" />
                    <span class="feature-num">
                      {{ card?.num }}
                    </span>
                  </div>
                  <h3 class="feature-title">
                    {{ card?.title }}
                  </h3>
                  <p class="feature-details">
                    {{ card?.details }}
                  </p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.oceanus-features {
  .features-header {
    max-width: 650px;

    .subtitle {
      font-size: 1.125rem;
      font-weight: 500;
      letter-spacing: -0.01em;
      color: var(--oceanus-c-brand);
      margin-bottom: 0.75rem;
    }

    .title {
      font-size: 2.75rem;
      font-weight: 600;
      letter-spacing: -0.02em;
      line-height: 1.1;
      color: var(--oceanus-c-text-deep);

      @media (max-width: 768px) {
        font-size: 2.25rem;
      }
    }

    .text {
      margin-top: 24px;
      font-size: 1.125rem;
      line-height: 1.5;
      color: var(--oceanus-c-text-muted);
      font-weight: 400;
      letter-spacing: -0.01em;
    }
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 32px;

    @media (min-width: 640px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 960px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .feature-item {
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);

    &:hover {
      transform: translateY(-3px);
    }
  }

  .feature-item-inner {
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  .feature-card-wrapper {
    height: 100%;
    overflow: hidden;
    transition: padding 0.3s;
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    @media (max-width: 768px) {
      &:hover {
        cursor: pointer;
        padding: 6px;
      }
    }
  }

  .feature-card {
    height: 100%;
    width: 100%;
    padding: 40px;
    margin: 8px;
    border-radius: 20px;
    background-color: var(--oceanus-c-card-bg);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    backdrop-filter: blur(5px);
    border: 1px solid rgba(var(--oceanus-c-card-bg-rgb, 255, 255, 255), 0.05);

    @media (min-width: 768px) {
      margin: 12px;
    }

    &:hover {
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
      transform: scale(1.01);
    }
  }

  .feature-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 60px;
    transition: margin 0.3s;

    @media (min-width: 768px) {
      margin-bottom: 55px;
    }
  }

  .feature-icon {
    display: inline-block;
    width: 48px;
    height: 48px;
    opacity: 0.9;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);

    .feature-card:hover & {
      transform: scale(1.05);
    }
  }

  .feature-num {
    font-size: 1.1rem;
    font-weight: 500;
    line-height: 1;
    letter-spacing: -0.01em;
    color: var(--oceanus-c-text-muted);
  }

  .feature-title {
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: var(--oceanus-c-text-deep);

    @media (max-width: 768px) {
      font-size: 1.25rem;
    }
  }

  .feature-details {
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    margin-top: 16px;
    color: var(--oceanus-c-text-muted);
    letter-spacing: -0.01em;
  }
}
</style>
