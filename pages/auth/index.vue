<script setup lang="ts">
definePageMeta({
  layout: 'auth'
});
</script>

<template>
  <div class="auth">
    <block-auth-logo />
    <block-auth-form />
  </div>
</template>

<style scoped lang="scss">
.auth {
  .auth-logo {
    margin-bottom: 50px;
  }
}
</style>
