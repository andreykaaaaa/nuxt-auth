<script setup lang="ts">
</script>

<template>
  <div class="auth-layout">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.auth-layout {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #1d243d;
  transition: .3s;

  & > div {
    flex-basis: 100%;
  }
}
</style>