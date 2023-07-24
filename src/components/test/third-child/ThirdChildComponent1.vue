<template>
  <div>
    <v-btn @click="injectValue++">{{ injectValue }}</v-btn>
  </div>
</template>
<script setup lang="ts">
import { inject } from "vue";

const injectValue: number = inject("thirdChild1", 0);
</script>
