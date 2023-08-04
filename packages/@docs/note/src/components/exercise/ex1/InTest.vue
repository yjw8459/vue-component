<template>
  <div class="inTestBox">
    <v-btn>InTestButton</v-btn>
    <slot name="header"> </slot>
  </div>
</template>

<script setup lang="ts">
import { HeaderTestProps } from '@/types/service/exercise';

const props = defineProps<HeaderTestProps>();
console.log('inTest');
console.log(props);
</script>

<style>
.inTestBox {
  width: 200px;
  height: 200px;
  background-color: pink;
}
</style>
