<template>
  <v-btn v-bind="props" @click="onClick($event, value)">
    <slot> {{ text }} </slot>
  </v-btn>
</template>

<script setup lang="ts">
import type { ButtonProps, ButtonClickEvent, ButtonValue } from '@/types';

const props = defineProps<ButtonProps>();
console.log(props);
const emit = defineEmits(['click']);

const onClick: ButtonClickEvent = (event: any, value: ButtonValue) => {
  emit('click', { event, value });
};
</script>

<style lang="scss" scoped></style>
