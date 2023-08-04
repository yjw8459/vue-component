<template>
  <v-navigation-drawer>
    <v-list>
      <v-list-item>5</v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script setup lang="ts">
import type { SideBarProps } from '@/types';
const props = defineProps<SideBarProps>();
console.log(props.items);
</script>
