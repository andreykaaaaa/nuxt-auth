<script setup lang="ts">
defineProps({
  title: String
});
</script>

<template>
  <div class="profile-frame">
    <h2>{{ title }}</h2>
    <slot />
  </div>
</template>

<style scoped lang="scss">
.profile-frame {
  flex: 1;
  background: #232746;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  color: #e5e7eb;
  & h2 {
    margin-top: 0;
    padding-bottom: 10px;
  }
}
</style>
