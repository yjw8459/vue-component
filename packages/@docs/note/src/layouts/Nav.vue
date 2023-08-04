<template>
  <SideBar v-bind="mainMenu" />
</template>
<script setup lang="ts">
import { SideBar } from '@webapp/component';
import type { SideBarProps } from '@webapp/component';
import { reactive } from 'vue';
const mainMenu = reactive<SideBarProps>({
  expandMode: 'single',
  items: [
    { title: 'My Page ', content: 'Content1' },
    { title: 'Orders', content: 'Content2' },
    { title: 'Help', content: 'Content3' },
    { title: 'Help2', content: 'Content4' },
    { title: 'Help3', content: 'Content5' },
    { title: 'Help4', content: 'Content6' }
  ]
});
</script>
