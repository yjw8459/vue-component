<template>
  <v-container>
    <v-btn>TEst</v-btn>
    <slot name="form"></slot>
  </v-container>
</template>

<script setup lang="ts">
import type { FormWrapperProps } from '@webapp/component';
console.log('VFormWrapper');
console.log(defineProps<FormWrapperProps>());
</script>

<style scoped lang="scss"></style>
