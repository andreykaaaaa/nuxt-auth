<script setup lang="ts">
type Props = {
  modelValue: string;
  type?: 'text' | 'password';
  placeholder?: string;
  icon?: string;
};

type Emits = {
  (e: 'update:modelValue', v: string): void;
};

const props = withDefaults(defineProps<Props>(), {
  type: 'text'
});
const emit = defineEmits<Emits>();
const innerValue = ref(props.modelValue);
watch(() => props.modelValue, (value) => {
  innerValue.value = value;
});
function updateModelValue(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
}
</script>

<template>
  <div class="input-wrapper">
    <ui-icon
      v-if="props.icon"
      :class="props.icon"
      class="input-icon"
      :icon="icon!"
    />
    <input
      class="is-input"
      :type="props.type"
      :placeholder="props.placeholder"
      v-model="innerValue"
      @input="updateModelValue"
    />
  </div>
</template>

<style scoped lang="scss">
.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.is-input {
  font-size: 16px;
  line-height: 16px;
  width: 100%;
  padding: 10px 14px;
  border: 0;
  border-radius: 6px;
  color: #d6d6d6;
  background-color: #262e49;
  overflow: visible;
  transition: outline .3s;

  &:focus {
    outline: 2px solid #808080;
  }
}

.input-icon {
  position: absolute;
  left: 0.5em;
  pointer-events: none;
  color: #444444;
  width: 28px;
  height: 28px;
}
</style>
