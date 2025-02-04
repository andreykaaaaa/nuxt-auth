<script setup lang="ts">
import { Icon } from '@iconify/vue';
import icons, { type IconsType } from '~/app/icons';

type Props = {
  icon: IconsType;
  size?: string;
};

const props = defineProps<Props>();

const iconValue = computed(() => icons[props.icon]);
const iconSize = computed(() => {
  const size = props.size ?? '1.4em';
  if (String(Number(size)) === size) return `${size}px`;
  else return size;
});
</script>

<template>
  <Icon
    class="icon"
    :icon="iconValue"
    :width="iconSize"
    :height="iconSize"
  />
</template>

<style scoped>
.icon {
  display: inline-block;
  vertical-align: middle;
}
</style>
