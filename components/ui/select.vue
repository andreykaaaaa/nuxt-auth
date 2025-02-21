<script setup lang="ts">
export type TypeOptions = {
  value: string;
  name: string;
};
type Props = {
  modelValue: string;
  options: TypeOptions[];
};
type Emits = {
  (e: 'update:modelValue', value: any): void;
};
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  options: () => []
});
const emit = defineEmits<Emits>();

const currentValue = ref('');
watch(() => props.modelValue, (newValue) => {
  currentValue.value = newValue;
  console.log(newValue);
});
function changeOption(event: any) {
  emit('update:modelValue', event.target.value);
}
</script>

<template>
  <div class="select">
    <select v-model="currentValue">
      <option
        disabled
        value=""
        @change="changeOption"
      >
        Выберите из списка
      </option>
      <option
        v-for="option in props.options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<style scoped lang="scss">

</style>
