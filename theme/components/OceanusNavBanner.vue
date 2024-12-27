<template>
  <div class="oceanus-nav-toolbar">
    <div class="h-full flex items-center" />
  </div>
</template>

<style lang="scss">
.oceanus-nav-toolbar {
  position: fixed;
  padding: 0 60px;
  height: auto;
  width: 100%;
  min-height: 24px;
  color: #fff;
  background-color: #000;
  z-index: 5;
  display: flex;
  justify-content: space-between;

  &-text,
  a {
    font-size: 12px;
    font-weight: 500;
    color: #fff;
  }

  &-select-lang {
    padding-right: 7px;
    font-size: 11px;
    font-weight: 500;
    line-height: 24px;
  }
}

.p-select-overlay {
  --p-select-overlay-background: #fff;
  --p-select-overlay-border-radius: 20px;
}

.p-select-list-container {
  border-radius: 20px;
  padding: 4px 0;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.p-select-option-label {
  min-width: 192px;
  padding: 0 16px;
  font-size: 14px;
  font-weight: 400;
  line-height: 40px;
}

.p-select-open .p-select-dropdown {
  transform: rotate(-180deg);
}

.p-select-dropdown {
  margin-left: 4px;
}
</style>
