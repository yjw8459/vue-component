<template>
  <VHeaderBar v-bind="vHeaderProps">
    <template>
      <v-icon icon="mdi-circle-slice-6" />
      YJW Project
    </template>
  </VHeaderBar>
</template>
<script setup lang="ts">
import type { VHeaderBarProps } from '@webapp/component';
import { VHeaderBar } from '@webapp/component';
import { reactive } from 'vue';

const vHeaderProps = reactive<VHeaderBarProps>({
  title: 'testTile',
  elevation: 2,
  items: [
    { itemTitle: 'test1' },
    { itemTitle: 'test2' },
    { itemTitle: 'test3' }
    // {
    //   clickEvent: (event, value) => {
    //     console.log(event);
    //     console.log(value);
    //     alert('test1');
    //   }
    // },
    // {
    //   clickEvent: (event, value) => {
    //     console.log(event);
    //     console.log(value);
    //     alert('test2');
    //   }
    // }
  ]
});
</script>
