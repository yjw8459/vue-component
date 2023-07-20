<template>
  <LayoutTestComponent>
    <template #content>
      <h1>Test Content</h1>
    </template>
    <template #footer>
      <h1>Test Footer</h1>
    </template>
    <template v-slot:[dynamicComponentName1]>
      <h1>Dynamic1</h1>
    </template>
    <template #[dynamicComponentName2]>
      <h1>Dynamic2</h1>
    </template>
  </LayoutTestComponent>
</template>
<script setup lang="ts">
import LayoutTestComponent from "./test/layout/LayoutMainTestComponent.vue";
const dynamicComponentName1: string = "dynamic1";
const dynamicComponentName2: string = "dynamic2";
</script>
<style></style>
