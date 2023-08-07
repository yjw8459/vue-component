<template>
  <div class="testViewBox">
    <Test v-bind="bindDummyData">
      <template #test="{ props }">
        <v-btn>{{ props.title }}</v-btn>
        <v-btn>Test Button1</v-btn>
        <v-btn>Test Button2</v-btn>
        <v-btn>Test Button3</v-btn>
        <v-btn>Test Button4</v-btn>
        <v-btn>Test Button5</v-btn>
      </template>
    </Test>
  </div>
</template>

<script setup lang="ts">
import { Test } from '@/components/exercise/ex2';
import type { HeaderTestProps } from '@/types/service/exercise';

const bindDummyData: HeaderTestProps = {
  slot: 'test',
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
  background-color: red;
}
</style>
