<template>
  <div class="testViewBox">
    <v-btn> TestButton@@ </v-btn>
    <Test v-bind="bindDummyData">
      <template #header="{ props }">
        <v-btn>Test Button</v-btn>
        {{ props }}
      </template>
    </Test>
    <!-- <Test2 v-bind="bindDummyData">
      <template #header="{ props }">
        <v-btn>Test Button</v-btn>
      </template>
    </Test2> -->
  </div>
</template>

<script setup lang="ts">
import { Test, Test2, Test3 } from '@/components/';
import type { HeaderTestProps } from '@/types';

const bindDummyData: HeaderTestProps = {
  title: '타이틀',
  class: '클래스',
  header: 'header',
  items: [
    { id: 1, name: '첫번째', header: 'header', title: '타이틀1' },
    { id: 2, name: '두번째', header: 'header', title: '타이틀2' },
    { id: 3, name: '세번쨰', header: 'header', title: '타이틀3' },
    { id: 4, name: '네번째', header: 'header', title: '타이틀4' }
  ]
};
</script>

<style>
.testViewBox {
  width: 600px;
  height: 600px;
  background-color: beige;
}
</style>
