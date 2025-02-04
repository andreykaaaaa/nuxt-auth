<script setup lang="ts">
useHead({
  script: [
    {
      src: 'https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-token-with-polyfills-latest.js',
      onload: () => window.YaSendSuggestToken('http://localhost/')
    }
  ]
});
</script>

<template>
  <div />
</template>

<style scoped>

</style>
