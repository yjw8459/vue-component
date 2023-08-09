<template>
  <v-container>
    <main>
      <v-btn>VFormWrapper</v-btn>
      <slot name="form" :props="props"></slot>
    </main>
  </v-container>
</template>

<script setup lang="ts">
import type { FormWrapperProps } from '@webapp/component';
const props = defineProps<FormWrapperProps>();
console.log('VFormWrapper');
console.log(props);
</script>

<style scoped lang="scss"></style>
