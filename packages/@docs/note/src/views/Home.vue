<template>
  <v-layout>
    <Header />
  </v-layout>
  <v-layout>
    <Nav />
    <v-main class="d-flex align-center justify-center" style="min-height: 300px">
      <router-view />
    </v-main>
  </v-layout>
</template>
<script setup lang="ts">
import { Header } from '@/layouts';
import { Nav } from '@/layouts';
</script>
