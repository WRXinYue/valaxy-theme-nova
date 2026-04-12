<script setup lang="ts">
import { useFrontmatter } from 'valaxy'

const fm = useFrontmatter<{ features: Features }>()

export type Features = Partial<{
  title: string
  subtitle: string
  text: string

  cards: Partial<{
    title: string
    icon: string
    details: string
  }[]>
}>
</script>

<template>
  <section v-if="fm?.features" class="oceanus-section oceanus-features" p="b-120px">
    <div class="oceanus-home-container">
      <header class="features-header" p="t-60px">
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
      </header>

      <div class="features-grid-wrap">
        <ul class="features-grid">
          <li v-for="(card, i) in fm.features?.cards" :key="i" class="feature-item">
            <div class="feature-item-inner">
              <div class="feature-card-wrapper">
                <div class="feature-card">
                  <div v-if="card?.icon || card?.title" class="feature-card-top">
                    <span v-if="card?.icon" class="feature-icon-well">
                      <span class="feature-icon" :class="card.icon" />
                    </span>
                    <h3 v-if="card?.title" class="feature-title">
                      {{ card.title }}
                    </h3>
                  </div>
                  <p v-if="card?.details" class="feature-details">
                    {{ card.details }}
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
    max-width: 42rem;

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
      margin-top: 1.25rem;
      font-size: 1.125rem;
      line-height: 1.55;
      color: var(--oceanus-c-text-muted);
      font-weight: 400;
      letter-spacing: -0.01em;
    }
  }

  .features-grid-wrap {
    margin-top: clamp(3rem, 6vw, 4.5rem);
  }

  .features-grid {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: 1fr;
    gap: clamp(1.25rem, 3vw, 2rem);
    align-items: stretch;

    @media (min-width: 640px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (min-width: 960px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  .feature-item {
    min-width: 0;
  }

  .feature-item-inner {
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  .feature-card-wrapper {
    height: 100%;
    overflow: visible;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    min-width: 0;
  }

  .feature-card {
    height: 100%;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: clamp(1.5rem, 3.5vw, 2.25rem);
    margin: 0;
    border-radius: 22px;
    background-color: var(--oceanus-c-card-bg);
    box-shadow:
      0 1px 0 hsla(0, 0%, 0%, 0.04),
      0 8px 24px hsla(0, 0%, 0%, 0.04);
    transition:
      box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1),
      transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
      border-color 0.35s ease;
    backdrop-filter: blur(8px);
    border: 1px solid hsla(var(--oceanus-c-card-bg-h), var(--oceanus-c-card-bg-s), var(--oceanus-c-card-bg-l), 0.06);

    &:hover {
      box-shadow:
        0 1px 0 hsla(0, 0%, 0%, 0.05),
        0 14px 40px hsla(0, 0%, 0%, 0.07);
      transform: translateY(-4px);
      border-color: hsla(var(--oceanus-c-brand-h), var(--oceanus-c-brand-s), var(--oceanus-c-brand-l), 0.18);
    }
  }

  .feature-card-top {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.75rem;
    flex-shrink: 0;
    min-width: 0;
  }

  .feature-icon-well {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.25rem;
    height: 3.25rem;
    flex-shrink: 0;
    border-radius: 14px;
    background: hsla(var(--oceanus-c-brand-h), var(--oceanus-c-brand-s), var(--oceanus-c-brand-l), 0.1);
    color: var(--oceanus-c-brand);
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);

    .feature-card:hover & {
      transform: scale(1.04);
    }
  }

  .feature-icon {
    display: block;
    width: 1.5rem;
    height: 1.5rem;
    flex-shrink: 0;
    opacity: 0.95;
  }

  .feature-title {
    margin: 0;
    flex: 1;
    min-width: 0;
    font-size: 1.375rem;
    font-weight: 600;
    line-height: 1.3;
    letter-spacing: -0.02em;
    color: var(--oceanus-c-text-deep);

    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
  }

  .feature-details {
    font-size: 0.9375rem;
    font-weight: 400;
    line-height: 1.55;
    margin-top: 0;
    padding-top: 0;
    color: var(--oceanus-c-text-muted);
    letter-spacing: -0.01em;
    flex-grow: 1;
    margin-bottom: 0;
  }
}
</style>
