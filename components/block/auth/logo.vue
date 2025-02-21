<script setup lang="ts">
defineProps<{
  size?: number;
}>();
</script>

<template>
  <div class="auth-logo">
    <h1 :style="{ fontSize: size ? `${size}px` : '72px' }">
      Phorenz
    </h1>
  </div>
</template>

<style scoped lang="scss">
.auth-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  user-select: none;
  & h1 {
    text-shadow: 15px 15px 40px #2101ec,
    -15px -15px 40px #8a31e9;
    -webkit-text-stroke: 2px #fc65ff;
    -webkit-text-fill-color: transparent;

    font-weight: bold;
    text-align: center;
    font-style: italic;
    text-transform: uppercase;
  }
}
</style>
