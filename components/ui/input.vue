<script setup lang="ts">
import { computed, ref } from 'vue';
import { TransitionExpand } from '@limonische/vue3-transition-expand';
import type { InputAutocomplete, InputType } from './types/input';

type Props = {
  id: string;
  type?: InputType;
  autocomplete?: InputAutocomplete;
  autofocus?: boolean;
  title?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  disabled?: boolean;
  isError?: boolean;
  modelValue: any;
  suggestions?: string[] | number[];
  maxHeight?: number;
};
type Emit = {
  (e: 'update:modelValue', v: any): void;
  (e: 'postIcon:click', v: HTMLInputElement): void;
  (e: 'select:suggestion', v: string): void;
};

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  suggestions: () => [],
  maxHeight: 100
});
const emit = defineEmits<Emit>();
const showSuggestions = ref(false);
const refHeader = ref<HTMLDivElement>();
const refList = ref<HTMLDivElement>();
const reversed = ref(false);
const listHeight = computed(() => {
  const height = props.suggestions.length * 32;
  return height > props.maxHeight ? props.maxHeight : height;
});
const childrenStyles = reactive({
  'maxHeight': `${props.maxHeight}px`,
  'left': '',
  'bottom': '',
  'top': '',
  '--width': ''
});
watch(showSuggestions, () => {
  nextTick(() => {
    const headerBounding = refHeader.value!.getBoundingClientRect();

    childrenStyles['--width'] = `${refHeader.value!.clientWidth}px`;
    childrenStyles.left = `${headerBounding.x}px`;

    if (reversed.value) {
      childrenStyles.top = '';
      childrenStyles.bottom = `${window.innerHeight - headerBounding.y}px`;
    } else {
      childrenStyles.bottom = '';
      childrenStyles.top = `${headerBounding.bottom}px`;
    }
  });
});
const innerValue = ref(props.modelValue ?? '');
const passwordVisible = ref(false);
const inputRef = ref<HTMLInputElement>();
const typeComputed = computed(() => {
  return props.type === 'password' ? (passwordVisible.value ? 'text' : 'password') : props.type;
});
watch(() => props.modelValue, value => innerValue.value = value ?? '');
watch(innerValue, value => emit('update:modelValue', value));

const classesInput = reactive({
  'l-input__input': true,
  '--is-text': computed(() => innerValue.value.length),
});
const filteredSuggestions = computed(() => {
  const input = innerValue.value.toString().toLowerCase();
  return props.suggestions
      ? props.suggestions.filter(suggestion =>
          suggestion.toString().toLowerCase().includes(input)
      )
      : [];
});

onMounted(() => {
  props.autofocus && inputRef.value?.focus();
});

function selectSuggestion(suggestion: any) {
  innerValue.value = suggestion;
  emit('select:suggestion', suggestion);
  showSuggestions.value = false;
}

function handleInput() {
  showSuggestions.value = true;
}
function calculateReversed(): void {
  const headerBounding = refHeader.value?.getBoundingClientRect();
  const bottomFreeSpace = window.innerHeight - (headerBounding?.bottom ?? 0);

  reversed.value = bottomFreeSpace < listHeight.value;
}
</script>

<template>
  <div
      class="l-input"
      :class="{ 'l-input--error': isError }"
      ref="refHeader"
      @mouseenter="calculateReversed"
  >
    <input
        :class="classesInput"
        :id="`input-${id}`"
        :type="typeComputed"
        :value="innerValue"
        :placeholder="placeholder"
        :autocomplete="autocomplete ?? 'off'"
        :disabled="disabled"
        :min="min"
        :max="max"
        ref="inputRef"
        v-model="innerValue"
        @input="handleInput"
        @blur="showSuggestions = false"
        @focus="showSuggestions = true"
    />
    <TransitionExpand>
      <ul
          v-if="showSuggestions && filteredSuggestions.length"
          class="l-input__suggestions-list"
          :style="childrenStyles"
          ref="refList"
      >
        <li
            v-for="suggestion in filteredSuggestions"
            :key="suggestion"
            @mousedown="selectSuggestion(suggestion)"
            class="l-input__suggestions-list__item"
        >
          {{ suggestion }}
        </li>
      </ul>
    </TransitionExpand>
    <label
        v-if="title"
        class="l-input__placeholder"
        :for="`input-${id}`"
    >
      {{ title }}
    </label>
    <label
        class="l-input__icon --pass"
        v-if="type === 'password'"
        :for="`input-${id}`"
        @click="passwordVisible = !passwordVisible"
    >
    </label>
  </div>
</template>

<style lang="scss">
.nuxt-icon svg {
  margin: 0 !important;
}
</style>

<style lang="scss" scoped>
.l-input {
  position: relative;
  width: 100%;

  &__input {
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

    &:disabled {
      color: var(--secondary-inverse-text-color);
    }
    &:focus {
      outline: 2px solid var(--primary-accent-color);
    }
    &.--icon {
      padding-left: 38px !important;

      & ~ .l-input__placeholder {
        left: 2.4rem;
      }
    }
    &.--post-icon {
      padding-right: 34px !important;
    }
  }
  &__placeholder {
    font-size: 12px;
    position: absolute;
    left: 6px;
    top: -6px;
    background-color: var(--tetriary-color);
    padding: 0 5px;
    margin-top: 0;
    pointer-events: none;
    user-select: none;
    transition: all .375s;
  }
  &__icon {
    position: absolute;
    top: calc(50% - 12px);
    font-size: 18px;
    height: 18px;
    color: var(--tetriary-inverse-text-color);
    user-select: none;

    &.--pass {
      right: 10px;
      cursor: pointer;
    }
    &.--post {
      right: 10px;
      cursor: pointer;
    }
    &.--type {
      left: 10px;
    }
  }

  &--error {
    .l-input__input {
      outline: 2px solid var(--secondary-accent-color);

      &:focus {
        outline: 2px solid var(--secondary-accent-color);
      }
    }
  }
  &__suggestions-list {
    position: fixed;
    z-index: 10;
    opacity: 1;
    width: var(--width);
    min-height: 5px;
    border-radius: 0 0 6px 6px;
    border: 1px solid var(--primary-border-color);
    background-color: var(--tetriary-color);
    overflow-y: auto;
    &__item {
      padding: 6px 10px;
      border-bottom: 1px solid var(--third-border-color);
      cursor: pointer;
      text-align: start;
      transition: .3s;
      &:last-child {
        border-bottom: 0;
      }
      &:hover {
        background-color: var(--tetriary-color-hover);
      }
    }
  }
}
</style>
