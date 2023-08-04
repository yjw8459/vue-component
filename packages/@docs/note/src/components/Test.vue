<template>
  <div class="testBox">
    <InTest v-bind="props">
      <template v-for="(header, index) in getHeaders" :key="index" #[header]="{ props }">
        <slot name="header" :props="props" v-bind="props"> </slot>
      </template>
    </InTest>
  </div>
</template>

<script setup lang="ts">
import { InTest } from '@/components';
import type { HeaderTestProps } from '@/types/service/exercise';
import { computed } from 'vue';

// bindDummyData
const props = defineProps<HeaderTestProps>();
console.log('Test');
console.log(props);
const items = ['header', 'header', 'header'];
// const getHeaders = computed(() => ['header']);
const getHeaders = ['header'];
</script>

<style>
.testBox {
  width: 400px;
  height: 400px;
  background-color: skyblue;
}
</style>
