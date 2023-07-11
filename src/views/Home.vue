<template>
  <v-layout>
    <Header />
    <Nav />
    <v-main
      class="d-flex align-center justify-center"
      style="min-height: 300px"
    >
      <router-view />
    </v-main>
  </v-layout>
</template>
<script setup lang="ts">
import Header from "@/layouts/Header.vue";
import Nav from "@/layouts/Nav.vue";
</script>
