<script setup lang="ts">
</script>

<template>
  <button class="btn">
    <slot />
  </button>
</template>

<style scoped lang="scss">
.btn {
  align-items: center;
  background-image: linear-gradient(144deg,#AF40FF, #5B42F3 50%,#00DDEB);
  background-size: 300% 300%;
  animation: gradient-animation 3s ease-in-out infinite;
  border: 0;
  border-radius: 8px;
  box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
  box-sizing: border-box;
  color: #FFFFFF;
  font-family: Phantomsans, sans-serif;
  font-size: 20px;
  justify-content: center;
  line-height: 1em;
  padding: 19px 24px;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  cursor: pointer;
  margin-bottom: 10px;
  text-align: center;
  &:hover {
    outline: 0;
  }
}
@keyframes gradient-animation {
  0% {
    background-position: 0 50%;
  }
  25% {
    background-position: 50% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  75% {
    background-position: 50% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
</style>
