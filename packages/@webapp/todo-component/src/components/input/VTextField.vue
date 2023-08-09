<template>
  <v-text-field
    :loading="loading"
    :disabled="disabled"
    :color="color"
    :rules="rules"
    :label="label"
    :success-message="message"
  ></v-text-field>
</template>

<script setup lang="ts">
import { TextFieldProps } from '../../types/input/VTextField';

const props = defineProps<TextFieldProps>();
console.log(props);
</script>

<style scoped lang="scss"></style>
