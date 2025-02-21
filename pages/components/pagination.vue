<script setup lang="ts">
import { ref } from 'vue';

const paginationType = ref<'page' | 'offset' | 'infinite-scroll'>('page');
</script>

<template>
  <div>
    <select v-model="paginationType">
      <option value="page">
        Пагинация по страницам
      </option>
      <option value="offset">
        Пагинация с offset
      </option>
      <option value="infinite-scroll">
        Бесконечный скролл
      </option>
    </select>
    <block-pagination :pagination-type="paginationType" />
  </div>
</template>

<style scoped lang="scss">
select {
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>
