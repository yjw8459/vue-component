<template>
  <v-btn>Button3</v-btn>
  <v-btn>Button3</v-btn>
  <v-btn>Button3</v-btn>
  <v-btn>{{ btnTitle }}</v-btn>
  <v-btn>{{ btnTitle2 }}</v-btn>
</template>
<script setup lang="ts">
const btnTitle: string = "Button4";
const btnTitle2: string = "Button5";
</script>
