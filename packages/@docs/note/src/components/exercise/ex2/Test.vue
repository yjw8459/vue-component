<template>
  <div class="testBox">
    <main>
      <!-- <slot #[slot]="{ props }" /> -->
      <slot name="test" :props="props"></slot>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { HeaderTestProps } from '@/types/service/exercise';

const props = {
  title: 'title',
  count: 1,
  id: 999
};

// bindDummyData
const defineProp = defineProps<HeaderTestProps>();
console.log('Test');
console.log(defineProp);
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
