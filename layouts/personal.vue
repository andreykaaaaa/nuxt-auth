<script setup lang="ts">

</script>

<template>
  <div class="personal">
    <block-navbar />
    <slot />
  </div>
</template>

<style scoped lang="scss">
.personal {
  min-height: 100%;
  background: radial-gradient(circle, #1a1a40, #000428);
  padding: 30px;
}
</style>
