<template>
  <v-input @change="handleChange" :name="name" :value="value"> </v-input>
</template>

<script setup lang="ts">
import { InputChangeEvent, InputProps } from '../../types/input/VInput';

const props = defineProps<InputProps>();
console.log(props);

const emit = defineEmits(['change']);

const handleChange: InputChangeEvent = (event: any, value: any) => {
  emit('change', { event: event, value: value });
};
</script>

<style scoped lang="scss"></style>
