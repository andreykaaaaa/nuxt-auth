<script setup lang="ts">
type Fact = {
  fact: string;
  category: string;
};
defineProps<Fact>();
</script>

<template>
  <div class="card">
    <h3 class="card__fact">
      {{ fact }}
    </h3>
    <p class="card__category">
      Категория: {{ category }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.card {
  padding: 1rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: max-content;

  &__fact {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  &__category {
    font-size: 1rem;
    color: #777;
  }
}
</style>
