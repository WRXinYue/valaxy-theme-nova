<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <button class="oceanus-button">
    <span class="button-text">
      <span>
        {{ text }}
      </span>
      <span>
        {{ text }}
      </span>
    </span>
    <span class="button-icon">
      <div class="button-circle" />
    </span>
  </button>
</template>

<style lang="scss" scoped>
.oceanus-button {
  display: flex;
  align-items: center;
  padding: 12px 29px;
  background: #f1f1f1;
  border-radius: 21px;
  transition: opacity 0.15s ease-out;
  overflow: hidden;
  font: 500 16px / 1.2 var(--oceanus-font);
  letter-spacing: -0.03em;
  padding: 18px 29px;
  border-radius: 40px;

  .button-text {
    white-space: nowrap;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    display: flex;
    flex-direction: column;
    height: 1.2em;
    overflow: hidden;
    position: relative;
    z-index: 3;

    span {
      transition: transform 0.3s ease-in-out;
      transform: translateY(-100%);

      &:first-child {
        color: #242424;
      }

      &:last-child {
        color: #fff;
      }
    }
  }

  .button-icon {
    margin-left: 8px;
    position: relative;
    z-index: 1;
    color: #fff;

    .button-circle {
      transform: translate(-50%, -50%) scale(0);
      background: #242424;
      background: var(--va-c-primary);
      display: block;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 3;
      transform: translate(-50%, -50%) scale(120);
      transition: transform 0.4s ease-in-out;
    }
  }

  &:hover {
    .button-text span {
      transform: translateY(0);
    }

    .button-icon {
      .button-circle {
        transform: translate(-50%, -50%) scale(0);
      }
    }
  }
}
</style>
