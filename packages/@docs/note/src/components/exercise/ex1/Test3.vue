<template>
  <slot></slot>
</template>

<script setup lang="ts">
import type { HeaderTestProps } from '@/types/service/exercise';
const props = defineProps<HeaderTestProps>();
console.log('test3');
console.log(props);
</script>
