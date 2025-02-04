<script setup lang="ts">
const stars = ref<number[]>([]);
onMounted(() => {
  const numStars = 100;
  stars.value = Array.from({ length: numStars }, () => Math.random());
});
</script>

<template>
  <div class="auth-layout">
    <slot />
    <div class="stars">
      <div
        v-for="(star, index) in stars"
        :key="index"
        class="star"
        :style="{
          width: `${Math.random() * 3 + 1}px`,
          height: `${Math.random() * 3 + 1}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 5 + 3}s`,
          animationDelay: `${Math.random() * 10}s`,
          opacity: Math.random() * 0.7 + 0.3
        }"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.auth-layout {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  background: radial-gradient(circle, #1a1a40, #000428);
  position: relative;
  overflow: hidden;
  & > div {
    flex-basis: 100%;
  }
}
.stars {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.star {
  position: absolute;
  background-color: white;
  border-radius: 50%;
  opacity: 0;
  animation: fall linear infinite, fadeIn 1s forwards;
}

@keyframes fall {
  0% {
    transform: translateY(-100px);
  }
  100% {
    transform: translateY(100vh);
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.8;
  }
}
</style>
