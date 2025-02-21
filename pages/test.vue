<script setup lang="ts">
import type { TypeOptions } from '~/components/ui/select.vue';

const testData: TypeOptions[] = [
  {
    value: 'title',
    name: 'По названию'
  },
  {
    value: 'body',
    name: 'По содержимому'
  }
];
const selectOptions = ref('');
watch(selectOptions, value => console.log(value));
</script>

<template>
  <div class="test">
    <ui-select
      :options="testData"
      v-model="selectOptions"
    />
  </div>
</template>

<style scoped lang="scss">
.test {
  padding: 40px;
}
</style>
