<template>
  <v-btn @click="emitTest($event)"> Emit Test </v-btn>
</template>

<script setup lang="ts">
const emit = defineEmits(['click']);

const emitTest: (event: Event) => void = event => {
  emit('click', { event: event, value: 'emitTest' });
};
</script>

<style scoped lang="scss"></style>
