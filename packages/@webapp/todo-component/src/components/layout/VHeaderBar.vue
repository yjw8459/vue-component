<template>
  <v-app-bar :elevation="props.elevation">
    <v-app-bar-title>
      <!-- <v-icon icon="mdi-circle-slice-6" />
      Vuetify -->
      <slot></slot>
    </v-app-bar-title>
    <v-btn v-for="(header, index) in headers" :key="index" @click="handleClick($event)">
      {{ header.itemTitle }}
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import type { HeaderBarProps, ButtonClickEvent } from '@/types';
import { ButtonValue } from '../../types';
const props = defineProps<HeaderBarProps>();
const emit = defineEmits(['click']);
const headers = props.items;

const handleClick: ButtonClickEvent = (event: Event, value: ButtonValue) => {
  emit('click', { event, value });
};
</script>
