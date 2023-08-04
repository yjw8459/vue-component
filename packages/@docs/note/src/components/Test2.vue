<template>
  <div class="testBox">
    <v-btn> TTTTT</v-btn>
    <slot name="header"> </slot>
  </div>
</template>

<script setup lang="ts">
import type { HeaderTestProps } from '@/types/service/exercise';
const props = defineProps<HeaderTestProps>();
console.log(props);
const getHeaders = ['header'];
</script>

<style>
.testBox {
  width: 400px;
  height: 400px;
  background-color: skyblue;
}
</style>
