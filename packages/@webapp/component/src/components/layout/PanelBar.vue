<template>
  <v-navigation-drawer>
    <v-list>
      <v-list-item v-for="(prop, index) in props" :key="index" :title="prop">1</v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script setup lang="ts">
import { PanelBarProps } from '@/types';
// const props = defineProps<>();
const props = defineProps<PanelBarProps>();
</script>
