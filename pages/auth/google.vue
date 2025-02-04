<script setup lang="ts">
import axios from 'axios';

const route = useRoute();
async function getUserDataFromGoogle() {
  try {
    const response = await axios.post('http://localhost:8000/google/auth', {
      code: route.query.code
    });
    console.log('User Data:', response.data);
  } catch (error) {
    console.error('Error fetching user data', error);
  }
}
getUserDataFromGoogle();
</script>

<template>
  <h1>test</h1>
</template>

<style scoped lang="scss">

</style>
